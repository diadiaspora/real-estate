/* ============================================
   Victoria Hale — Luxury Real Estate
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initListings();
  initTestimonials();
  initForms();
  initSmoothScroll();
});

/* ---------- Header scroll state ---------- */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Mobile navigation ---------- */
function initMobileNav() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Featured Listings (simulated IDX) ---------- */
const LISTINGS = [
  {
    id: 1,
    address: '1270 Benedict Canyon Drive',
    location: 'Beverly Hills',
    area: 'beverly-hills',
    price: '$18,500,000',
    beds: 6,
    baths: 8,
    sqft: '9,200',
    badge: 'New Listing',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'
  },
  {
    id: 2,
    address: '948 Bel Air Road',
    location: 'Bel-Air',
    area: 'bel-air',
    price: '$32,000,000',
    beds: 8,
    baths: 12,
    sqft: '14,500',
    badge: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
  },
  {
    id: 3,
    address: '23456 Malibu Colony Road',
    location: 'Malibu',
    area: 'malibu',
    price: '$24,750,000',
    beds: 5,
    baths: 6,
    sqft: '6,800',
    badge: 'Oceanfront',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
  },
  {
    id: 4,
    address: '610 N Alpine Drive',
    location: 'Beverly Hills',
    area: 'beverly-hills',
    price: '$11,200,000',
    beds: 5,
    baths: 6,
    sqft: '5,400',
    badge: null,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  },
  {
    id: 5,
    address: '3100 Mandeville Canyon Road',
    location: 'Brentwood',
    area: 'westside',
    price: '$8,950,000',
    beds: 6,
    baths: 7,
    sqft: '7,100',
    badge: 'Price Reduced',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
  },
  {
    id: 6,
    address: '17650 Pacific Coast Highway',
    location: 'Malibu',
    area: 'malibu',
    price: '$15,800,000',
    beds: 4,
    baths: 5,
    sqft: '4,900',
    badge: 'New Listing',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?w=800&q=80'
  }
];

function initListings() {
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;

  renderListings(LISTINGS);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter === 'all'
        ? LISTINGS
        : LISTINGS.filter(l => l.area === filter);
      renderListings(filtered);
    });
  });
}

function renderListings(items) {
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;

  grid.innerHTML = items.map(listing => `
    <article class="listing-card" data-area="${listing.area}">
      <div class="listing-image">
        <img src="${listing.image}" alt="${listing.address}" loading="lazy">
        ${listing.badge ? `<span class="listing-badge">${listing.badge}</span>` : ''}
        <span class="listing-price">${listing.price}</span>
      </div>
      <div class="listing-body">
        <h3 class="listing-address">${listing.address}</h3>
        <p class="listing-location">${listing.location}</p>
        <div class="listing-meta">
          <span>${listing.beds} Beds</span>
          <span>${listing.baths} Baths</span>
          <span>${listing.sqft} Sq Ft</span>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---------- Testimonials slider ---------- */
function initTestimonials() {
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-btn.prev');
  const nextBtn = document.querySelector('.testimonial-btn.next');
  if (!track || cards.length === 0) return;

  let current = 0;
  const total = cards.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance every 7 seconds
  setInterval(() => goTo(current + 1), 7000);
}

/* ---------- Forms ---------- */
function initForms() {
  const valuationForm = document.getElementById('valuationForm');
  const contactForm = document.getElementById('contactForm');

  if (valuationForm) {
    valuationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you. Your private CMA request has been received. Victoria will be in touch shortly.');
      valuationForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Your private enquiry has been sent. We look forward to speaking with you.');
      contactForm.reset();
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4200);
}

/* ---------- Smooth scroll for anchor links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
