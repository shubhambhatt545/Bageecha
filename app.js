// Utility functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Global state
let isScrolled = false;
let socialRailDocked = false;
let currentPage = '/';

// Product data
const productData = {
  'indoor-plants': {
    name: 'Indoor Plants',
    description: 'Transform your indoor spaces with our beautiful collection of houseplants',
    products: [
      {
        name: 'Monstera Deliciosa',
        description: 'Large, glossy leaves with natural splits',
        image: 'monstera.jpg'
      },
      {
        name: 'Snake Plant',
        description: 'Low-maintenance air purifier',
        image: 'snake-plant.jpg'
      },
      {
        name: 'Peace Lily',
        description: 'Elegant white blooms and glossy foliage',
        image: 'peace-lily.jpg'
      },
      {
        name: 'Rubber Plant',
        description: 'Bold burgundy and green leaves',
        image: 'rubber-plant.jpg'
      },
      {
        name: 'Fiddle Leaf Fig',
        description: 'Statement plant with large violin-shaped leaves',
        image: 'fiddle-leaf-fig.jpg'
      },
      {
        name: 'Pothos',
        description: 'Trailing vine perfect for hanging baskets',
        image: 'pothos.jpg'
      }
    ]
  },
  'garden-tools': {
    name: 'Garden Tools',
    description: 'Professional-grade tools for every gardening need',
    products: [
      {
        name: 'Pruning Shears',
        description: 'Sharp, durable cutting for precise trimming',
        image: 'pruning-shears.jpg'
      },
      {
        name: 'Garden Spade',
        description: 'Heavy-duty digging and planting tool',
        image: 'garden-spade.jpg'
      },
      {
        name: 'Watering Can',
        description: 'Elegant copper watering can for indoor plants',
        image: 'watering-can.jpg'
      },
      {
        name: 'Garden Gloves',
        description: 'Durable protection for hands while gardening',
        image: 'garden-gloves.jpg'
      },
      {
        name: 'Hand Trowel Set',
        description: 'Essential tools for planting and transplanting',
        image: 'hand-trowel.jpg'
      },
      {
        name: 'Garden Rake',
        description: 'Perfect for soil preparation and leaf collection',
        image: 'garden-rake.jpg'
      }
    ]
  },
  'seeds-seedlings': {
    name: 'Seeds & Seedlings',
    description: 'Start your garden with premium quality seeds',
    products: [
      {
        name: 'Heirloom Tomatoes',
        description: 'Organic heritage variety seeds',
        image: 'tomato-seeds.jpg'
      },
      {
        name: 'Herb Garden Kit',
        description: 'Complete collection of culinary herbs',
        image: 'herb-kit.jpg'
      },
      {
        name: 'Flower Mix Seeds',
        description: 'Colorful wildflower seed collection',
        image: 'flower-seeds.jpg'
      },
      {
        name: 'Vegetable Starter Pack',
        description: 'Easy-to-grow vegetable seedlings',
        image: 'veggie-seedlings.jpg'
      }
    ]
  },
  'pots-planters': {
    name: 'Pots & Planters',
    description: 'Stylish containers for every plant',
    products: [
      {
        name: 'Ceramic Planter Set',
        description: 'Hand-glazed pots in earth tones',
        image: 'ceramic-planters.jpg'
      },
      {
        name: 'Hanging Baskets',
        description: 'Natural fiber baskets for trailing plants',
        image: 'hanging-baskets.jpg'
      },
      {
        name: 'Modern Concrete Planters',
        description: 'Minimalist design for contemporary spaces',
        image: 'concrete-planters.jpg'
      },
      {
        name: 'Decorative Plant Stands',
        description: 'Elegant stands to showcase your plants',
        image: 'plant-stands.jpg'
      }
    ]
  },
  'fertilizers': {
    name: 'Fertilizers',
    description: 'Organic nutrients for healthy growth',
    products: [
      {
        name: 'Organic Plant Food',
        description: 'Slow-release granules for all plants',
        image: 'plant-food.jpg'
      },
      {
        name: 'Liquid Fertilizer',
        description: 'Fast-acting nutrients for quick results',
        image: 'liquid-fertilizer.jpg'
      },
      {
        name: 'Compost Starter',
        description: 'Begin your own compost system',
        image: 'compost-starter.jpg'
      }
    ]
  },
  'outdoor-plants': {
    name: 'Outdoor Plants',
    description: 'Hardy varieties for gardens and landscapes',
    products: [
      {
        name: 'Rose Bushes',
        description: 'Fragrant blooming roses for gardens',
        image: 'rose-bushes.jpg'
      },
      {
        name: 'Perennial Flowers',
        description: 'Beautiful flowers that return each year',
        image: 'perennials.jpg'
      },
      {
        name: 'Ornamental Grasses',
        description: 'Low-maintenance landscape plants',
        image: 'ornamental-grasses.jpg'
      },
      {
        name: 'Fruit Trees',
        description: 'Dwarf varieties perfect for home gardens',
        image: 'fruit-trees.jpg'
      }
    ]
  }
};

// Service data
const serviceData = {
  'landscaping-designing': {
    name: 'Landscaping & Designing',
    shortDescription: 'Transform outdoor spaces into stunning landscapes',
    description: 'Transform your outdoor spaces into stunning landscapes with our expert design services. We create custom garden layouts that perfectly blend aesthetics with functionality, ensuring your outdoor space becomes a natural extension of your home.',
    features: [
      'Custom landscape design consultation',
      '3D visualization and planning',
      'Hardscaping and softscaping solutions',
      'Water features and lighting design',
      'Sustainable and eco-friendly designs',
      'Complete project execution and management'
    ],
    process: [
      'Initial consultation and site assessment',
      'Concept development and design proposal',
      '3D visualization and client approval',
      'Implementation and project execution',
      'Final walkthrough and maintenance guide'
    ]
  },
  'garden-maintenance': {
    name: 'Garden Maintenance',
    shortDescription: 'Keep your garden pristine year-round',
    description: 'Keep your garden looking pristine throughout the year with our comprehensive maintenance services. Our experienced team ensures your plants remain healthy, vibrant, and well-groomed with regular care and attention.',
    features: [
      'Regular pruning and trimming',
      'Lawn mowing and edging',
      'Fertilization and soil management',
      'Pest and disease control',
      'Seasonal planting and replanting',
      'Irrigation system maintenance',
      'Mulching and weed control'
    ],
    packages: [
      { name: 'Basic Care', description: 'Weekly visits for essential maintenance' },
      { name: 'Premium Care', description: 'Bi-weekly visits with comprehensive services' },
      { name: 'Custom Care', description: 'Tailored schedule based on your needs' }
    ]
  },
  'rent-a-mali': {
    name: 'Rent A Mali',
    shortDescription: 'Expert gardeners on-demand for your needs',
    description: 'Need expert gardening help on-demand? Our \'Rent A Mali\' service provides skilled gardeners whenever you need them. Whether it\'s for a one-time garden makeover or regular assistance, our trained professionals are ready to help.',
    features: [
      'One-time garden cleanup',
      'Seasonal planting assistance',
      'Pre-event garden preparation',
      'Emergency garden care',
      'Learning gardening techniques',
      'Supplementing your regular maintenance'
    ],
    bookingOptions: [
      { name: 'Hourly', description: 'Minimum 2 hours booking' },
      { name: 'Half Day', description: '4 hours of dedicated service' },
      { name: 'Full Day', description: '8 hours for major projects' }
    ],
    note: 'All tools and basic materials included. Our malis are trained, experienced, and background-verified.'
  },
  'kitchen-gardening': {
    name: 'Organic Kitchen Gardening',
    shortDescription: 'Grow fresh, organic produce at home',
    description: 'Grow your own fresh, organic vegetables and herbs right at home! We help you create productive kitchen gardens using 100% organic methods, ensuring healthy, chemical-free produce for your family throughout the year.',
    features: [
      'Site assessment and planning',
      'Raised bed or container setup',
      'Organic soil and compost preparation',
      'Selection of seasonal vegetables and herbs',
      'Organic pest management solutions',
      'Drip irrigation system installation',
      'Composting setup and training'
    ],
    crops: [
      { category: 'Leafy Greens', items: 'Spinach, Lettuce, Kale, Methi' },
      { category: 'Herbs', items: 'Basil, Mint, Coriander, Curry Leaves' },
      { category: 'Vegetables', items: 'Tomatoes, Chilies, Brinjal, Okra' },
      { category: 'Root Vegetables', items: 'Carrots, Radish, Beetroot, Onions' }
    ],
    support: 'We provide continuous guidance through WhatsApp groups, monthly workshops, and seasonal planting calendars to ensure your kitchen garden thrives year-round.'
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initScrollEffects();
  initSocialRail();
  initAnimations();
  // initCounters();
  // initVideoPlayer();
  initForms();
  initModal();
  initMobileMenu();
  initProductCards();
  initSmoothScrolling();
  initHeroCTA();
  initScrollToTop();
  initCategoryCards();
  // preloadResources();
});

// Router functionality
function initRouter() {
  // Handle initial page load
  const initialPath = window.location.pathname === '/' ? '/' : window.location.pathname;
  navigateToPage(initialPath);
  
  // Handle all navigation clicks with event delegation
  document.addEventListener('click', (e) => {
    // Check for navigation links
    const link = e.target.closest('a[data-route], button[data-route], .logo-link');
    
    if (link) {
      e.preventDefault();
      
      let route;
      if (link.classList.contains('logo-link')) {
        route = '/';
      } else {
        route = link.getAttribute('data-route') || link.getAttribute('href') || '/';
      }
      
      navigateToPage(route);
      return;
    }
    
    // Check for service cards first (they might also have category-card class)
    const serviceCard = e.target.closest('.service-card');
    if (serviceCard) {
      e.preventDefault();
      const serviceId = serviceCard.getAttribute('data-service');
      if (serviceId) {
        navigateToPage(`/service/${serviceId}`);
      }
      return;
    }

    // Check for category cards
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard) {
      e.preventDefault();
      const categoryId = categoryCard.getAttribute('data-category');
      if (categoryId) {
        navigateToPage(`/category/${categoryId}`);
      }
      return;
    }
  });
  
  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const path = window.location.pathname || '/';
    navigateToPage(path, false);
  });
}

function navigateToPage(path, pushState = true) {
  // Normalize path
  path = path || '/';
  
  // Update browser history
  if (pushState && path !== currentPage) {
    window.history.pushState({ path }, '', path);
  }
  
  currentPage = path;
  
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });
  
  // Update navigation active states
  updateNavigation(path);
  
  // Show appropriate page
  let pageToShow;
  
  if (path === '/' || path === '') {
    pageToShow = document.getElementById('home-page');
  } else if (path === '/our-story') {
    pageToShow = document.getElementById('our-story-page');
  } else if (path === '/our-products') {
    pageToShow = document.getElementById('our-products-page');
  } else if (path === '/our-services') {
    pageToShow = document.getElementById('our-services-page');
  } else if (path.startsWith('/category/')) {
    const categoryId = path.split('/')[2];
    if (productData[categoryId]) {
      showCategoryPage(categoryId);
      pageToShow = document.getElementById('category-page');
    } else {
      // Invalid category, go to products page
      pageToShow = document.getElementById('our-products-page');
    }
  } else if (path.startsWith('/service/')) {
    const serviceId = path.split('/')[2];
    if (serviceData[serviceId]) {
      showServiceDetailPage(serviceId);
      pageToShow = document.getElementById('service-detail-page');
    } else {
      // Invalid service, go to services page
      pageToShow = document.getElementById('our-services-page');
    }
  } else if (path === '/contact') {
    pageToShow = document.getElementById('contact-page');
  } else if (path === '/gallery') {
    // For now, redirect gallery to products
    pageToShow = document.getElementById('gallery-page');
    return;
  } else if (path === '/blog') {
    // For now, redirect blog to our story
    pageToShow = document.getElementById('blog-page');
    return;
  } else {
    // Default to home for unknown routes
    pageToShow = document.getElementById('home-page');
  }
  
  if (pageToShow) {
    pageToShow.style.display = 'block';
    pageToShow.classList.add('active');
    
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Initialize page-specific functionality
    setTimeout(() => {
      if (path === '/our-story') {
        initTimelineAnimation();
      }
      reinitializeAnimations();
    }, 100);
  }
}

function updateNavigation(path) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('data-route') || link.getAttribute('href');
    link.classList.remove('active');
    
    if (linkPath === path || (path === '/' && (linkPath === '/' || linkPath === ''))) {
      link.classList.add('active');
    }
    // Handle special cases for redirected routes
    // else if (path === '/our-products' && linkPath === '/gallery') {
    //   link.classList.add('active');
    // }
    // else if (path === '/our-story' && linkPath === '/blog') {
    //   link.classList.add('active');
    // }
  });
}

function showCategoryPage(categoryId) {
  const categoryData = productData[categoryId];
  if (!categoryData) return;
  
  // Update page content
  const titleElement = document.getElementById('category-title');
  const subtitleElement = document.getElementById('category-subtitle');
  const productsGrid = document.getElementById('category-products-grid');
  
  if (titleElement) titleElement.textContent = categoryData.name;
  if (subtitleElement) subtitleElement.textContent = categoryData.description;
  
  // Clear and populate products grid
  if (productsGrid) {
    productsGrid.innerHTML = '';
    categoryData.products.forEach((product, index) => {
      const productCard = createProductCard(product, index);
      productsGrid.appendChild(productCard);
    });
  }
  
  // Update breadcrumb
  const breadcrumb = document.querySelector('.current-category');
  if (breadcrumb) {
    breadcrumb.textContent = categoryData.name;
  }
}

function createProductCard(product, index) {
  const card = document.createElement('article');
  card.className = 'category-product-card';
  card.setAttribute('data-animate', 'fade-up');
  
  card.innerHTML = `
    <div class="category-product-image" role="img" aria-label="${product.name}"></div>
    <div class="category-product-content">
      <h3 class="category-product-title">${product.name}</h3>
      <p class="category-product-description">${product.description}</p>
    </div>
  `;
  
  return card;
}


// Service detail page functionality
function showServiceDetailPage(serviceId) {
  const service = serviceData[serviceId];
  if (!service) return;

  // Update page content
  const titleElement = document.getElementById('service-detail-title');
  const subtitleElement = document.getElementById('service-detail-subtitle');
  const contentElement = document.getElementById('service-detail-content');
  const breadcrumb = document.getElementById('current-service-name');

  if (titleElement) titleElement.textContent = service.name;
  if (subtitleElement) subtitleElement.textContent = service.description;
  if (breadcrumb) breadcrumb.textContent = service.name;

  // Build service detail content
  if (contentElement) {
    let contentHTML = '<div class="service-detail-grid">';

    // Main description
    contentHTML += `
      <div class="service-detail-section">
        <h2>About This Service</h2>
        <p class="service-detail-description">${service.description}</p>
      </div>
    `;

    // Features section
    if (service.features && service.features.length > 0) {
      contentHTML += `
        <div class="service-detail-section">
          <h2>What We Offer</h2>
          <ul class="service-feature-list">
            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Process section (for landscaping)
    if (service.process && service.process.length > 0) {
      contentHTML += `
        <div class="service-detail-section">
          <h2>Our Process</h2>
          <ol class="service-process-list">
            ${service.process.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // Packages section (for maintenance)
    if (service.packages && service.packages.length > 0) {
      contentHTML += `
        <div class="service-detail-section">
          <h2>Maintenance Packages</h2>
          <div class="service-packages-grid">
            ${service.packages.map(pkg => `
              <div class="service-package-card">
                <h3>${pkg.name}</h3>
                <p>${pkg.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Booking options (for rent-a-mali)
    if (service.bookingOptions && service.bookingOptions.length > 0) {
      contentHTML += `
        <div class="service-detail-section">
          <h2>Booking Options</h2>
          <div class="service-booking-grid">
            ${service.bookingOptions.map(option => `
              <div class="service-booking-card">
                <h3>${option.name}</h3>
                <p>${option.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Crops section (for kitchen gardening)
    if (service.crops && service.crops.length > 0) {
      contentHTML += `
        <div class="service-detail-section">
          <h2>What You Can Grow</h2>
          <div class="service-crops-grid">
            ${service.crops.map(crop => `
              <div class="service-crop-card">
                <h3>${crop.category}</h3>
                <p>${crop.items}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Support section
    if (service.support) {
      contentHTML += `
        <div class="service-detail-section">
          <h2>Ongoing Support</h2>
          <p>${service.support}</p>
        </div>
      `;
    }

    // Note section
    if (service.note) {
      contentHTML += `
        <div class="service-detail-section">
          <div class="service-note">
            <p>${service.note}</p>
          </div>
        </div>
      `;
    }

    // CTA section
    contentHTML += `
      <div class="service-detail-cta">
        <h2>Ready to Get Started?</h2>
        <p>Contact us today to discuss how this service can transform your space</p>
        <button class="btn btn-primary" data-route="/contact">Get a Quote</button>
      </div>
    `;

    contentHTML += '</div>';
    contentElement.innerHTML = contentHTML;
  }
}

// Category cards functionality
function initCategoryCards() {
  // This will be handled by the main click handler in initRouter
}

// Scroll to top functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (!scrollToTopBtn) return;
  
  // Show/hide button based on scroll position
  const handleScroll = debounce(() => {
    const shouldShow = window.scrollY > 300;
    scrollToTopBtn.classList.toggle('hidden', !shouldShow);
  }, 100);
  
  window.addEventListener('scroll', handleScroll);
  
  // Handle click
  scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (prefersReducedMotion) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
}

// Timeline animation for Our Story page
function initTimelineAnimation() {
  const timelineVine = document.getElementById('timeline-vine');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (!timelineVine || timelineItems.length === 0) return;
  
  // Reset vine animation
  timelineVine.classList.remove('growing');
  
  // Grow the vine
  setTimeout(() => {
    timelineVine.classList.add('growing');
  }, 500);
  
  // Animate timeline nodes with stagger
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Reset timeline items
  timelineItems.forEach((item) => {
    item.classList.remove('animate');
    timelineObserver.observe(item);
  });
}

// Reinitialize animations for page changes
function reinitializeAnimations() {
  const animatedElements = document.querySelectorAll('.page.active [data-animate]');
  
  // Reset animation classes
  animatedElements.forEach(element => {
    element.classList.remove('animate');
  });
  
  // Initialize intersection observer for new page
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        const element = entry.target;
        const animationType = element.dataset.animate;
        
        if (animationType === 'stagger-up') {
          const siblings = Array.from(element.parentElement.children).filter(
            child => child.dataset.animate === 'stagger-up'
          );
          const index = siblings.indexOf(element);
          
          setTimeout(() => {
            element.classList.add('animate');
          }, index * 120);
        } else {
          element.classList.add('animate');
        }
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Scroll effects and sticky navigation
function initScrollEffects() {
  const header = document.getElementById('header');
  const socialRail = document.getElementById('social-rail');
  const socialDock = document.getElementById('social-dock');
  
  const handleScroll = debounce(() => {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > 50;
    const shouldDockSocial = scrollY > 120;
    
    // Handle header scrolled state
    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      header.classList.toggle('scrolled', isScrolled);
    }
    
    // Handle social rail docking
    if (shouldDockSocial !== socialRailDocked) {
      socialRailDocked = shouldDockSocial;
      
      if (!prefersReducedMotion) {
        if (socialRailDocked) {
          // Move social icons to navbar
          socialRail.classList.add('docked');
          socialDock.classList.add('visible');
          
          // Clone and animate social icons
          const socialIcons = socialRail.querySelectorAll('.social-icon');
          socialIcons.forEach((icon, index) => {
            const clone = icon.cloneNode(true);
            clone.style.transform = 'rotate(360deg) scale(0.8)';
            clone.style.transition = 'all 500ms cubic-bezier(0.22, 1, 0.36, 1)';
            
            setTimeout(() => {
              socialDock.appendChild(clone);
              requestAnimationFrame(() => {
                clone.style.transform = 'rotate(0deg) scale(1)';
              });
            }, index * 100);
          });
        } else {
          // Return social icons to rail
          socialRail.classList.remove('docked');
          socialDock.classList.remove('visible');
          socialDock.innerHTML = '';
        }
      }
    }
    
    // Trigger scroll animations
    checkScrollAnimations();
  }, 10);
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
}

// Social rail initialization
function initSocialRail() {
  const socialIcons = document.querySelectorAll('#social-rail .social-icon');
  
  // Add hover effects and accessibility
  socialIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
      if (!prefersReducedMotion) {
        icon.style.transform = 'translateY(-2px) scale(1.05)';
      }
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
    });
    
    // Stagger initial animation
    if (!prefersReducedMotion) {
      icon.style.opacity = '0';
      icon.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        icon.style.transition = 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)';
        icon.style.opacity = '1';
        icon.style.transform = 'translateX(0)';
      }, 1000 + (index * 150));
    }
  });
}

// Intersection Observer for scroll animations
function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        const element = entry.target;
        const animationType = element.dataset.animate;
        
        if (animationType === 'stagger-up') {
          // Special handling for staggered animations
          const siblings = Array.from(element.parentElement.children).filter(
            child => child.dataset.animate === 'stagger-up'
          );
          const index = siblings.indexOf(element);
          
          setTimeout(() => {
            element.classList.add('animate');
          }, index * 120);
        } else {
          element.classList.add('animate');
        }
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Counter animations
function initCounters() {
  const counterElements = document.querySelectorAll('[data-animate="counter"]');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statItems = entry.target.parentElement.querySelectorAll('.stat-item');
        
        statItems.forEach((item, index) => {
          setTimeout(() => {
            animateCounter(item);
          }, index * 200);
        });
        
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  if (counterElements.length > 0) {
    counterObserver.observe(counterElements[0]);
  }
}

function animateCounter(statItem) {
  const numberElement = statItem.querySelector('.stat-number');
  const targetValue = parseInt(numberElement.dataset.count);
  const duration = prefersReducedMotion ? 100 : 2000;
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutCubic(progress);
    const currentValue = Math.floor(easeProgress * targetValue);
    
    numberElement.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // Add suffix if exists
      const suffix = statItem.querySelector('.stat-label').textContent.includes('+') ? '+' : '';
      numberElement.textContent = targetValue.toLocaleString() + suffix;
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Video player functionality
function initVideoPlayer() {
  const videoWrappers = document.querySelectorAll('.video-wrapper');
  
  videoWrappers.forEach(wrapper => {
    const playButton = wrapper.querySelector('.video-play-button');
    const videoId = wrapper.dataset.videoId;
    
    if (playButton && videoId) {
      playButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        loadYouTubeVideo(wrapper, videoId);
      });
    }
  });
}

function loadYouTubeVideo(wrapper, videoId) {
  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.className = 'video-iframe';
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
  iframe.setAttribute('frameborder', '0');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.borderRadius = 'inherit';
  
  // Clear wrapper and add iframe
  wrapper.innerHTML = '';
  wrapper.appendChild(iframe);
  
  // Add loading indicator
  wrapper.style.background = 'var(--color-forest)';
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'center';
  
  // Show loading text temporarily
  const loadingText = document.createElement('div');
  loadingText.textContent = 'Loading video...';
  loadingText.style.color = 'var(--color-cream)';
  loadingText.style.position = 'absolute';
  loadingText.style.zIndex = '1';
  wrapper.appendChild(loadingText);
  
  // Remove loading text after iframe loads
  iframe.addEventListener('load', () => {
    if (loadingText.parentNode) {
      loadingText.remove();
    }
    wrapper.style.background = 'transparent';
  });
}

// Form validation and submission
function initForms() {
  // const membershipForm = document.getElementById('membership-form');
  // const reviewForm = document.getElementById('review-form');
  const contactForm = document.getElementById('contact-form');
  const contactForm2 = document.getElementById('contact-form2');
  
  // if (membershipForm) {
  //   initMembershipForm(membershipForm);
  // }
  
  // if (reviewForm) {
  //   initReviewForm(reviewForm);
  // }
  
  if (contactForm) {
    initContactForm(contactForm);
  }
  if(contactForm2){
     initContactForm(contactForm2);
  }
}

function initContactForm(form) {
  const inputs = form.querySelectorAll('.form-control');
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isValid = validateContactForm(form);
    if (!isValid) {
      const firstError = form.querySelector('.form-control.error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }
    
    // Show loading state
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    
    buttonText.classList.add('hidden');
    buttonLoading.classList.remove('hidden');
    submitButton.disabled = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      showToast('Thank you for your message! We\'ll get back to you soon.');
      form.reset();
    } catch (error) {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      // Reset button state
      buttonText.classList.remove('hidden');
      buttonLoading.classList.add('hidden');
      submitButton.disabled = false;
    }
  });
}

function validateContactForm(form) {
  const inputs = form.querySelectorAll('.form-control');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// function initMembershipForm(form) {
//   const inputs = form.querySelectorAll('.form-control');
//   const submitButton = form.querySelector('button[type="submit"]');
  
//   // Real-time validation
//   inputs.forEach(input => {
//     input.addEventListener('blur', () => validateField(input));
//     input.addEventListener('input', () => {
//       if (input.classList.contains('error')) {
//         validateField(input);
//       }
//     });
//   });
  
//   // Form submission
//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const isValid = validateForm(form);
//     if (!isValid) {
//       // Focus on first error field
//       const firstError = form.querySelector('.form-control.error');
//       if (firstError) {
//         firstError.focus();
//       }
//       return;
//     }
    
//     // Show loading state
//     const buttonText = submitButton.querySelector('.button-text');
//     const buttonLoading = submitButton.querySelector('.button-loading');
    
//     buttonText.classList.add('hidden');
//     buttonLoading.classList.remove('hidden');
//     submitButton.disabled = true;
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Show success message
//       const formContainer = form.parentElement;
//       const successMessage = document.getElementById('form-success');
      
//       if (successMessage) {
//         formContainer.style.transition = 'all 300ms ease';
//         formContainer.style.opacity = '0';
//         formContainer.style.transform = 'translateY(-20px)';
        
//         setTimeout(() => {
//           formContainer.classList.add('hidden');
//           successMessage.classList.remove('hidden');
//           successMessage.style.opacity = '0';
//           successMessage.style.transform = 'translateY(20px)';
          
//           requestAnimationFrame(() => {
//             successMessage.style.transition = 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)';
//             successMessage.style.opacity = '1';
//             successMessage.style.transform = 'translateY(0)';
//           });
//         }, 300);
//       }
//     } catch (error) {
//       // Reset button state on error
//       buttonText.classList.remove('hidden');
//       buttonLoading.classList.add('hidden');
//       submitButton.disabled = false;
//       showToast('Something went wrong. Please try again.', 'error');
//     }
//   });
// }

function validateForm(form) {
  const inputs = form.querySelectorAll('.form-control');
  const checkbox = form.querySelector('input[type="checkbox"][required]');
  let isValid = true;
  
  // Validate all inputs
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  // Validate checkbox
  if (checkbox && !checkbox.checked) {
    showFieldError(checkbox, 'Please agree to receive gardening tips');
    isValid = false;
  } else if (checkbox) {
    clearFieldError(checkbox);
  }
  
  return isValid;
}

function validateField(input) {
  const value = input.value.trim();
  const fieldName = input.name;
  let isValid = true;
  let errorMessage = '';
  
  // Required field validation
  if (input.required && !value) {
    errorMessage = `${getFieldLabel(fieldName)} is required`;
    isValid = false;
  } else if (value) {
    // Email validation
    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      }
    }
    
    // Phone validation
    if (fieldName === 'phone') {
      const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
      }
    }
    
    // Message validation
    if (fieldName === 'message' && value.length < 10) {
      errorMessage = 'Message must be at least 10 characters long';
      isValid = false;
    }
  }
  
  if (isValid) {
    clearFieldError(input);
  } else {
    showFieldError(input, errorMessage);
  }
  
  return isValid;
}

function showFieldError(input, message) {
  input.classList.add('error');
  const errorElement = input.closest('.form-group').querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
}

function clearFieldError(input) {
  input.classList.remove('error');
  const errorElement = input.closest('.form-group').querySelector('.error-message');
  if (errorElement) {
    errorElement.classList.remove('visible');
    errorElement.textContent = '';
  }
}

function getFieldLabel(fieldName) {
  const labelMap = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    city: 'City',
    message: 'Message'
  };
  return labelMap[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
}

// Review form handling
// function initReviewForm(form) {
//   if (!form) return;
  
//   const ratingInputs = form.querySelectorAll('input[name="rating"]');
  
//   ratingInputs.forEach(input => {
//     input.addEventListener('change', () => {
//       updateStarDisplay(input);
//     });
//   });
  
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     submitReview(form);
//   });
// }

function updateStarDisplay(selectedInput) {
  const ratingContainer = selectedInput.closest('.rating-input');
  const labels = ratingContainer.querySelectorAll('.star-label');
  const selectedValue = parseInt(selectedInput.value);
  
  labels.forEach((label, index) => {
    const starValue = 5 - index;
    if (starValue <= selectedValue) {
      label.style.color = '#fbbf24';
    } else {
      label.style.color = '#d1d5db';
    }
  });
}

// function submitReview(form) {
//   const formData = new FormData(form);
//   const reviewData = {
//     name: formData.get('name'),
//     rating: formData.get('rating'),
//     comment: formData.get('comment')
//   };
  
//   // Validate review data
//   if (!reviewData.name || !reviewData.rating || !reviewData.comment) {
//     showToast('Please fill in all required fields.', 'error');
//     return;
//   }
  
//   // Here you would typically send the data to your backend
//   console.log('Review submitted:', reviewData);
  
//   // Close modal and show success message
//   closeModal();
//   showToast('Thank you for your review! It will be published after moderation.');
  
//   // Reset form
//   form.reset();
//   const starLabels = form.querySelectorAll('.star-label');
//   starLabels.forEach(label => {
//     label.style.color = '#d1d5db';
//   });
// }

// Modal functionality
function initModal() {
  const writeReviewBtn = document.getElementById('write-review-btn');
  const modal = document.getElementById('review-modal');
  
  if (!writeReviewBtn || !modal) {
    return;
  }
  
  const closeBtn = modal.querySelector('.modal-close');
  const cancelBtn = modal.querySelector('.modal-cancel');
  const overlay = modal.querySelector('.modal-overlay');
  
  // Event listeners
  writeReviewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function openModal() {
  const modal = document.getElementById('review-modal');
  if (!modal) return;
  
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  
  // Focus the first input
  const firstInput = modal.querySelector('input[type="text"]');
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('review-modal');
  if (!modal) return;
  
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  
  // Reset form
  const form = modal.querySelector('form');
  if (form) {
    form.reset();
    // Reset star display
    const starLabels = form.querySelectorAll('.star-label');
    starLabels.forEach(label => {
      label.style.color = '#d1d5db';
    });
  }
  
  // Restore body scrolling
  document.body.style.overflow = '';
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.mobile-nav-menu');
  if (!menuToggle && !navLinks) return;
  const lines = menuToggle.querySelectorAll('.hamburger-line');  
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    const willExpand = !isExpanded;
    menuToggle.setAttribute('aria-expanded', willExpand);
      // Animate hamburger lines
      if (willExpand) {
        lines[0].style.transform = 'rotate(45deg) translateY(6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translateY(-6px)';
      } else {
        lines.forEach(line => {
          line.style.transform = '';
          line.style.opacity = '';
        });
      }
    });

  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;

    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
      lines.forEach(line => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    }
  });
  
}

// Product card interactions
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const icons = card.querySelectorAll('.product-icon');
    
    icons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
          icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
      });
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        if (prefersReducedMotion) {
          window.scrollTo(0, targetPosition);
        } else {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Hero CTA functionality
function initHeroCTA() {
  const heroCTA = document.querySelector('.hero-cta');
  if (heroCTA) {
    heroCTA.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToPage('/contact');
    });
  }
}

// Toast notification system
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'var(--color-moss)' : '#dc2626'};
    color: var(--color-cream);
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    max-width: 300px;
    font-weight: 500;
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });
  
  // Remove after 4 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// Additional scroll animation checking
function checkScrollAnimations() {
  // This function can be extended for additional scroll-based animations
  // Currently handled by Intersection Observer
}

// Handle resize events
window.addEventListener('resize', debounce(() => {
  // Recalculate positions if needed
  if (socialRailDocked) {
    // Reset social rail position
    const socialRail = document.getElementById('social-rail');
    const socialDock = document.getElementById('social-dock');
    
    if (window.innerWidth < 768) {
      socialRail.classList.remove('docked');
      socialDock.classList.remove('visible');
      socialDock.innerHTML = '';
      socialRailDocked = false;
    }
  }
}, 250));

// Performance optimization: Preload critical resources
function preloadResources() {
  // Preconnect to YouTube for video loading
  const preconnectLink = document.createElement('link');
  preconnectLink.rel = 'preconnect';
  preconnectLink.href = 'https://www.youtube.com';
  document.head.appendChild(preconnectLink);
  
  const preconnectLink2 = document.createElement('link');
  preconnectLink2.rel = 'preconnect';
  preconnectLink2.href = 'https://www.youtube-nocookie.com';
  document.head.appendChild(preconnectLink2);
}

// Export functions for potential external use
window.Bageecha = {
  openModal: openModal,
  closeModal: closeModal,
  showToast: showToast,
  validateForm: validateForm,
  navigateToPage: navigateToPage
};