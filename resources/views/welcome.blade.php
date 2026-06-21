<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }} · URL Shortener</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Styles -->
    @vite(['resources/css/app.css'])
</head>

<body>

    <div class="card">
        <div class="brand">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            URL<span>Shortener</span>
        </div>

        <form id="shortenForm" class="input-group">
            <input type="url" id="originalUrl" class="url-input" placeholder="https://example.com/your-long-url"
                required autocomplete="off" />
            <button type="submit" class="btn" id="submitBtn">
                <span id="btnText">Shorten URL</span>
                <span id="btnLoader" class="loader hidden"></span>
            </button>
        </form>

        <div id="errorMessage" class="error-message hidden"></div>

        <div id="resultSection" class="hidden mt-4">
            <div class="result-box">
                <div class="action-row">
                    <a id="shortUrlLink" href="#" target="_blank" class="short-url"></a>
                    <button id="copyButton" class="copy-btn" title="Copy to clipboard">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    </button>
                </div>
                <button id="statsButton" class="btn btn-secondary text-sm">
                    View Stats
                </button>
            </div>

            <div id="statsSection" class="stats-container hidden">
                <div class="flex items-center gap-2 mb-2">
                    <span class="font-medium text-sm">Statistics</span>
                </div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span>👁️</span> Visits: <span id="visitCount">0</span>
                    </div>
                    <div class="stat-item">
                        <span>🔗</span>
                        <span>Original:</span>
                        <span id="originalUrlDisplay" class="opacity-70" title=""></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    @vite(['resources/js/app.js'])

</body>

</html>