document.addEventListener('DOMContentLoaded', () => {
    console.log('Corporate Web System Loaded');

    // Product Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        // Function to filter products
        const filterProducts = (category) => {
            // Update active button state
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Show/Hide products
            productCards.forEach(card => {
                const productCategory = card.dataset.category;
                if (category === 'all' || productCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        // Event listeners for buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                filterProducts(filter);

                // Update URL without reloading (optional, but good for UX)
                const url = new URL(window.location);
                url.searchParams.set('category', filter);
                window.history.pushState({}, '', url);
            });
        });

        // Check URL parameters on load
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');

        if (categoryParam) {
            // Validate if the category exists in our buttons to avoid errors
            const validCategory = [...filterButtons].some(btn => btn.dataset.filter === categoryParam);
            if (validCategory) {
                filterProducts(categoryParam);
            }
        }
    }
});
