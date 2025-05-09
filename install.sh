#!/bin/bash

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root"
    exit 1
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Starting FreeRADIUS GUI Installation...${NC}"

# Install required packages
echo "Installing required packages..."
apt-get update
apt-get install -y apache2 php8.4 libapache2-mod-php8.4 php8.4-sqlite3 php8.4-xml php8.4-curl php8.4-mbstring php8.4-zip unzip git composer

# Install FreeRADIUS if not already installed
if ! command -v freeradius &> /dev/null; then
    echo "Installing FreeRADIUS..."
    apt-get install -y freeradius freeradius-sqlite
fi

# Create application directory
APP_DIR="/opt/freeradius-gui"
echo "Creating application directory at $APP_DIR..."
mkdir -p $APP_DIR

# Clone the repository (if not already present)
if [ ! -d "$APP_DIR/.git" ]; then
    echo "Cloning repository..."
    git clone https://github.com/ashikp/freeradiusGUI.git $APP_DIR
fi

# Set up Laravel
echo "Setting up Laravel..."
cd $APP_DIR
composer install

# Create .env file if it doesn't exist
if [ ! -f "$APP_DIR/.env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    sed -i 's/APP_ENV=local/APP_ENV=production/' .env
    sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env
    sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/' .env
    # Remove MySQL specific settings
    sed -i '/DB_HOST/d' .env
    sed -i '/DB_PORT/d' .env
    sed -i '/DB_DATABASE/d' .env
    sed -i '/DB_USERNAME/d' .env
    sed -i '/DB_PASSWORD/d' .env
    echo "FREERADIUS_CONFIG_PATH=/etc/freeradius/3.0" >> .env
    echo "FREERADIUS_LOG_PATH=/var/log/freeradius" >> .env
fi

# Create SQLite database
echo "Setting up SQLite database..."
touch $APP_DIR/database/database.sqlite
chown root:root $APP_DIR/database/database.sqlite
chmod 644 $APP_DIR/database/database.sqlite

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force
php artisan db:seed

# Install and build frontend
echo "Installing frontend dependencies..."
cd $APP_DIR
npm install
echo "Building frontend assets..."
npm run build

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set up Apache to run as root
echo "Setting up Apache to run as root..."
cat > /etc/apache2/sites-available/freeradius-gui.conf << 'EOL'
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /opt/freeradius-gui/public

    <Directory /opt/freeradius-gui/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Run PHP as root
    <IfModule mod_php.c>
        php_admin_value user root
        php_admin_value group root
        php_admin_value disable_functions "exec,passthru,shell_exec,system"
        php_admin_flag allow_url_fopen off
        php_admin_flag allow_url_include off
    </IfModule>

    ErrorLog ${APACHE_LOG_DIR}/freeradius-gui-error.log
    CustomLog ${APACHE_LOG_DIR}/freeradius-gui-access.log combined

    # Security headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</VirtualHost>
EOL

# Enable required Apache modules
a2enmod rewrite
a2enmod headers
a2enmod php8.4

# Enable the site and disable default
a2ensite freeradius-gui.conf
a2dissite 000-default.conf

# Set proper permissions
echo "Setting permissions..."
chown -R root:root $APP_DIR
chmod -R 755 $APP_DIR
chmod -R 777 $APP_DIR/storage
chmod -R 777 $APP_DIR/bootstrap/cache
chmod 777 $APP_DIR/database

# Create .htaccess file for additional security
cat > $APP_DIR/public/.htaccess << 'EOL'
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]

    # Additional security headers
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Disable directory listing
    Options -Indexes
    
    # Protect sensitive files
    <FilesMatch "^\.">
        Order allow,deny
        Deny from all
    </FilesMatch>

    # Protect database file
    <FilesMatch "\.sqlite$">
        Order allow,deny
        Deny from all
    </FilesMatch>
</IfModule>
EOL

# Restart services
echo "Restarting services..."
systemctl restart apache2
systemctl restart freeradius

echo -e "${GREEN}Installation completed!${NC}"
echo -e "The FreeRADIUS GUI is now accessible at http://localhost"
echo -e "Default login credentials:"
echo -e "Username: admin@example.com"
echo -e "Password: password123"
echo -e "\nPlease change these credentials immediately after first login!" 