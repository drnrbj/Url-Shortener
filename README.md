# URL Shortener

A simple URL shortener built with Laravel. Shorten long URLs, track visits, and share links with ease.

## Setup

1. **Clone the repository**
```bash
   git clone https://github.com/drnrbj/Url-Shortener.git
   cd shortlink
```

2. **Install PHP and Node dependencies**
```bash
   composer install
   npm install
```

3. **Configure environment**

```bash
   copy .env.example .env
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

1. **Run migrations**

```bash
   php artisan migrate
```

6. **Build assets**
```bash
   npm run dev
```

7. **Start the development server**
```bash
   php artisan serve
```

8. **Visit the application**

   - Open http://localhost:8000 in your browser.
