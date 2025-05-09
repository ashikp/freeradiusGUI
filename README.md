<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development/)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

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
