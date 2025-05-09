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
apt-get install -y apache2 php libapache2-mod-php php-mysql php-xml php-curl php-mbstring php-zip unzip git composer

# Install FreeRADIUS if not already installed
if ! command -v freeradius &> /dev/null; then
    echo "Installing FreeRADIUS..."
    apt-get install -y freeradius freeradius-mysql
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
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create .env file if it doesn't exist
if [ ! -f "$APP_DIR/.env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    sed -i 's/APP_ENV=local/APP_ENV=production/' .env
    sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env
    sed -i 's/DB_DATABASE=laravel/DB_DATABASE=freeradius_gui/' .env
    sed -i 's/DB_USERNAME=root/DB_USERNAME=freeradius_gui/' .env
    sed -i 's/DB_PASSWORD=/DB_PASSWORD=freeradius_gui_password/' .env
    echo "FREERADIUS_CONFIG_PATH=/etc/freeradius/3.0" >> .env
    echo "FREERADIUS_LOG_PATH=/var/log/freeradius" >> .env
fi

# Set up database
echo "Setting up database..."
mysql -e "CREATE DATABASE IF NOT EXISTS freeradius_gui;"
mysql -e "CREATE USER IF NOT EXISTS 'freeradius_gui'@'localhost' IDENTIFIED BY 'freeradius_gui_password';"
mysql -e "GRANT ALL PRIVILEGES ON freeradius_gui.* TO 'freeradius_gui'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Run migrations
php artisan migrate --force

# Set up Apache
echo "Setting up Apache..."
cat > /etc/apache2/sites-available/freeradius-gui.conf << 'EOL'
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /opt/freeradius-gui/public

    <Directory /opt/freeradius-gui/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

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

# Enable the site and disable default
a2ensite freeradius-gui.conf
a2dissite 000-default.conf

# Set proper permissions
echo "Setting permissions..."
chown -R root:root $APP_DIR
chmod -R 755 $APP_DIR
chmod -R 777 $APP_DIR/storage
chmod -R 777 $APP_DIR/bootstrap/cache

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
</IfModule>
EOL

# Restart services
echo "Restarting services..."
systemctl restart apache2
systemctl restart freeradius

# Create systemd service for the application
echo "Creating systemd service..."
cat > /etc/systemd/system/freeradius-gui.service << 'EOL'
[Unit]
Description=FreeRADIUS GUI Service
After=network.target

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=/opt/freeradius-gui
ExecStart=/usr/bin/php artisan serve --host=127.0.0.1 --port=8000
Restart=always

[Install]
WantedBy=multi-user.target
EOL

# Enable and start the service
systemctl daemon-reload
systemctl enable freeradius-gui
systemctl start freeradius-gui

echo -e "${GREEN}Installation completed!${NC}"
echo -e "The FreeRADIUS GUI is now accessible at http://localhost"
echo -e "Default login credentials:"
echo -e "Username: admin@example.com"
echo -e "Password: password123"
echo -e "\nPlease change these credentials immediately after first login!" 