// Main JavaScript functionality for Nintendo website replica

// Image gallery functionality
function changeMainImage(src) {
    const mainImage = document.getElementById('main-game-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    mainImage.src = src;
    
    // Update active thumbnail
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) {
            thumb.classList.add('active');
        }
    });
}

// Download button functionality
function handleDownload() {
    const button = document.querySelector('.download-btn');
    const originalText = button.innerHTML;
    
    // Simulate download process
    button.innerHTML = '⏳ Processing...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.innerHTML = '✅ Added to Library';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.opacity = '1';
            button.style.background = '#E60012';
        }, 2000);
    }, 1500);
}

// Toggle description functionality
function toggleDescription() {
    const button = document.querySelector('.read-more-btn');
    const description = document.querySelector('.game-description');
    
    if (button.textContent.includes('Read more')) {
        // Add more content
        const additionalContent = document.createElement('div');
        additionalContent.className = 'additional-content';
        additionalContent.innerHTML = `
            <p>Build relationships with over 30 unique characters. Become part of the local community by participating in seasonal festivals and helping your neighbors. Discover the ancient mysteries hidden throughout Stardew Valley.</p>
            <p>Explore vast, mysterious caves, encountering dangerous monsters and valuable treasure. Delve into the mines to gather resources and discover rare materials for crafting and upgrading your tools.</p>
        `;
        description.appendChild(additionalContent);
        button.textContent = '- Show less';
    } else {
        // Remove additional content
        const additionalContent = description.querySelector('.additional-content');
        if (additionalContent) {
            additionalContent.remove();
        }
        button.textContent = '+ Read more';
    }
}

// Wishlist functionality
function toggleWishlist(button) {
    if (button.textContent === '♡') {
        button.textContent = '❤️';
        button.classList.add('active');
        showNotification('Added to wishlist!');
    } else {
        button.textContent = '♡';
        button.classList.remove('active');
        showNotification('Removed from wishlist');
    }
}

// Show notification
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Handle search
    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            showNotification(`Searching for "${query}"...`);
            // In a real implementation, this would trigger actual search
            setTimeout(() => {
                showNotification('Search feature coming soon!');
            }, 1000);
        }
    }
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Header button interactions
    const headerBtns = document.querySelectorAll('.header-btn');
    headerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text === 'Support') {
                showNotification('Support page coming soon!');
            } else if (text === 'Wish List') {
                showNotification('Wish List page coming soon!');
            } else if (text === 'Cart') {
                showNotification('Cart is empty');
            } else if (text === 'Log in / Sign up') {
                showNotification('Account page coming soon!');
            }
        });
    });
    
    // Navigation interactions
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            showNotification(`${text} section coming soon!`);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Nintendo Online learn more button
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            showNotification('Nintendo Switch Online info coming soon!');
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add hover effects to spec items
    const specItems = document.querySelectorAll('.spec-item');
    specItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Social media link handlers
    const socialLinks = document.querySelectorAll('.social-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const emoji = this.textContent;
            let platform = '';
            
            switch(emoji) {
                case '📘': platform = 'Facebook'; break;
                case '📷': platform = 'Instagram'; break;
                case '🐦': platform = 'Twitter'; break;
                case '📺': platform = 'YouTube'; break;
                default: platform = 'Social Media';
            }
            
            showNotification(`${platform} page coming soon!`);
        });
    });
    
    // Footer link handlers
    const footerLinks = document.querySelectorAll('.footer-column a, .footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent;
            showNotification(`${text} page coming soon!`);
        });
    });
});

// Add scroll effects
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any modal-like elements
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }
    
    // Arrow keys for thumbnail navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const activeThumbnail = document.querySelector('.thumbnail.active');
        const currentIndex = Array.from(thumbnails).indexOf(activeThumbnail);
        
        if (currentIndex !== -1) {
            let nextIndex;
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : thumbnails.length - 1;
            } else {
                nextIndex = currentIndex < thumbnails.length - 1 ? currentIndex + 1 : 0;
            }
            
            changeMainImage(thumbnails[nextIndex].src);
        }
    }
});

// Performance optimization: Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
        'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading when page loads
window.addEventListener('load', preloadImages);