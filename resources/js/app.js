import './bootstrap';

(function() {
    const form = document.getElementById('shortenForm');
    const originalUrlInput = document.getElementById('originalUrl');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const errorMessage = document.getElementById('errorMessage');
    const resultSection = document.getElementById('resultSection');
    const shortUrlLink = document.getElementById('shortUrlLink');
    const copyButton = document.getElementById('copyButton');
    const statsButton = document.getElementById('statsButton');
    const statsSection = document.getElementById('statsSection');
    const visitCount = document.getElementById('visitCount');
    const originalUrlDisplay = document.getElementById('originalUrlDisplay');

    let currentShortCode = null;
    let currentShortUrl = null;

    function setLoading(isLoading) {
        if (isLoading) {
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            submitBtn.disabled = true;
        } else {
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function resetResult() {
        resultSection.classList.add('hidden');
        statsSection.classList.add('hidden');
        shortUrlLink.textContent = '';
        shortUrlLink.href = '#';
        currentShortCode = null;
        currentShortUrl = null;
    }

    async function loadStats(code) {
        try {
            const response = await fetch(`/starts/${code}`);
            if (!response.ok) throw new Error('Stats not available');
            const data = await response.json();
            visitCount.textContent = data.visits || 0;
            originalUrlDisplay.textContent = data.original_url || '-';
            originalUrlDisplay.title = data.original_url || '';
            statsSection.classList.remove('hidden');
        } catch (err) {
            console.error('Stats error:', err);
            visitCount.textContent = '?';
            originalUrlDisplay.textContent = 'Error loading';
            statsSection.classList.remove('hidden');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        resetResult();

        const originalUrl = originalUrlInput.value.trim();
        if (!originalUrl) {
            showError('Please enter a valid URL.');
            return;
        }

        try {
            new URL(originalUrl);
        } catch (_) {
            showError('Please enter a valid absolute URL (e.g., https://example.com).');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/short-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ original_url: originalUrl })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to shorten URL. Please try again.');
            }

            const data = await response.json();
            currentShortUrl = data.short_url;
            
            const urlObj = new URL(currentShortUrl);
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            currentShortCode = pathParts[pathParts.length - 1] || '';

            shortUrlLink.href = currentShortUrl;
            shortUrlLink.textContent = currentShortUrl;
            resultSection.classList.remove('hidden');
            statsSection.classList.add('hidden');
            
            originalUrlInput.value = '';
            
        } catch (error) {
            showError(error.message || 'An unexpected error occurred.');
            resetResult();
        } finally {
            setLoading(false);
        }
    });

    copyButton.addEventListener('click', async () => {
        if (!currentShortUrl) return;
        try {
            await navigator.clipboard.writeText(currentShortUrl);
            const originalHTML = copyButton.innerHTML;
            copyButton.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
            setTimeout(() => {
                copyButton.innerHTML = originalHTML;
            }, 1500);
        } catch (err) {
            alert('Failed to copy URL. Please copy manually.');
        }
    });

    statsButton.addEventListener('click', () => {
        if (!currentShortCode) return;
        
        if (statsSection.classList.contains('hidden')) {
            loadStats(currentShortCode);
        } else {
            statsSection.classList.add('hidden');
        }
    });
})();