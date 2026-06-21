# URL Shortener

A simple URL shortener built with Laravel. Shorten long URLs, track visits, and share links with ease.

## Setup

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd shortlink
```

2. **Install PHP dependencies**
```bash
composer install
```

3. **Configure environment**

```bash
cp .env.example .env
php artisan key:generate
```

4. **Set up database**

Update your .env file with database credentials:

```bash
env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shortlink
DB_USERNAME=root
DB_PASSWORD=
```

5. **Run migrations**

```bash
php artisan migrate
```

6. **Start the development server**
```bash
php artisan serve
```

7. **Visit the application**

Open http://localhost:8000 in your browser.