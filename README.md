<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>


## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

# FreeRADIUS GUI

A modern web interface for managing FreeRADIUS server configurations, built with Laravel and Vue.js.

## Features

### Authentication & Authorization
- Secure login system with Laravel Breeze
- User management with role-based access control
- Session management and security features

### FreeRADIUS Management
- Real-time FreeRADIUS service control (start/stop/restart)
- Service status monitoring
- Configuration file management
- Log viewing and monitoring

### Client Management
- Add, edit, and delete RADIUS clients
- Configure client settings (IP, secret, type)
- Automatic clients.conf generation
- Client status tracking

### Database Management
- Support for both SQLite and MySQL databases
- Database configuration management
- Automatic schema import
- Database backup and restore
- Configuration file generation for:
  - SQL module configuration
  - Default site configuration
  - Inner-tunnel configuration

### User Management
- User CRUD operations
- Group management
- User-group assignments
- Authentication method configuration

### Security Features
- Running as root for full FreeRADIUS access
- Apache configuration with security headers
- Protected configuration files
- Secure database handling
- File permission management

## Installation

### Prerequisites
- PHP 8.4
- Apache2
- FreeRADIUS 3.0
- Composer
- Node.js and npm

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/ashikp/freeradiusGUI.git
cd freeradiusGUI
```

2. Make the installation script executable:
```bash
chmod +x install.sh
```

3. Run the installation script as root:
```bash
sudo ./install.sh
```

The installation script will:
- Install required packages
- Configure Apache
- Set up the database
- Configure FreeRADIUS
- Set proper permissions
- Start required services

### Default Login
- Email: admin@example.com
- Password: password123

## Uninstallation

To uninstall the application:

1. Make the uninstall script executable:
```bash
chmod +x uninstall.sh
```

2. Run the uninstall script as root:
```bash
sudo ./uninstall.sh
```

The uninstall script will:
- Stop and disable services
- Remove configuration files
- Backup the database
- Clean up application files
- Remove optional components (if confirmed)

## Configuration

### Database
The application supports both SQLite and MySQL:
- SQLite: Database file stored in `/opt/freeradius-gui/database/database.sqlite`
- MySQL: Configurable through the web interface

### FreeRADIUS
- Configuration files in `/etc/freeradius/3.0`
- Automatic configuration generation
- Schema import for both SQLite and MySQL

### Apache
- Running on port 80
- PHP running as root for FreeRADIUS access
- Security headers enabled
- Protected configuration files

## Security Considerations

1. The application runs as root to manage FreeRADIUS configurations
2. Access is restricted to localhost only
3. All configuration files are protected
4. Database files have restricted permissions
5. Security headers are enabled in Apache
6. Sensitive operations require authentication

## Development

### Frontend
- Vue.js 3 with Composition API
- Tailwind CSS for styling
- Vite for build process

### Backend
- Laravel 10
- PHP 8.4
- SQLite/MySQL support
- FreeRADIUS integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
