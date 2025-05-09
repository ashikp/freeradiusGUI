#!/bin/bash

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root"
    exit 1
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting FreeRADIUS GUI Uninstallation...${NC}"

# Application directory
APP_DIR="/opt/freeradius-gui"

# Stop and disable services
echo "Stopping services..."
systemctl stop freeradius-gui
systemctl disable freeradius-gui

# Remove systemd service
echo "Removing systemd service..."
rm -f /etc/systemd/system/freeradius-gui.service
systemctl daemon-reload

# Remove Apache configuration
echo "Removing Apache configuration..."
a2dissite freeradius-gui.conf
rm -f /etc/apache2/sites-available/freeradius-gui.conf
systemctl restart apache2

# Remove application files
echo "Removing application files..."
if [ -d "$APP_DIR" ]; then
    # Backup database before removal
    if [ -f "$APP_DIR/database/database.sqlite" ]; then
        echo "Creating database backup..."
        BACKUP_DIR="/root/freeradius-gui-backup"
        mkdir -p $BACKUP_DIR
        cp "$APP_DIR/database/database.sqlite" "$BACKUP_DIR/database.sqlite.backup"
        echo -e "${GREEN}Database backed up to $BACKUP_DIR/database.sqlite.backup${NC}"
    fi

    # Remove application directory
    rm -rf $APP_DIR
fi

# Remove FreeRADIUS SQLite module if it was installed by this application
echo "Checking FreeRADIUS SQLite module..."
if dpkg -l | grep -q "freeradius-sqlite"; then
    echo -e "${YELLOW}Do you want to remove the FreeRADIUS SQLite module? (y/N)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        apt-get remove -y freeradius-sqlite
    fi
fi

# Remove PHP SQLite module if it was installed by this application
echo "Checking PHP SQLite module..."
if dpkg -l | grep -q "php-sqlite3"; then
    echo -e "${YELLOW}Do you want to remove the PHP SQLite module? (y/N)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        apt-get remove -y php-sqlite3
    fi
fi

# Clean up any remaining files
echo "Cleaning up remaining files..."
rm -f /var/log/apache2/freeradius-gui-*.log

# Remove composer cache for this project
if [ -d "/root/.composer/cache" ]; then
    echo "Cleaning composer cache..."
    rm -rf /root/.composer/cache/*
fi

echo -e "${GREEN}Uninstallation completed!${NC}"
echo -e "The following items have been removed:"
echo -e "- FreeRADIUS GUI application files"
echo -e "- Systemd service"
echo -e "- Apache configuration"
echo -e "- Application logs"
echo -e "\nA backup of your database has been created at:"
echo -e "$BACKUP_DIR/database.sqlite.backup"
echo -e "\nYou can restore your data from this backup if needed." 