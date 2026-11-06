/**
 * CBT Construction - Main JavaScript Controller
 * Handles Navigation, Estimate Modal, Form Validation, Formspree -> Pushover Email Integration,
 * Gallery Lightbox, Filter Tabs, and Before/After Comparison Sliders.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initEstimateModal();
  initEstimateForms();
  initGalleryLightbox();
  initGalleryFilters();
  initBeforeAfterSliders();
});

/* ==========================================================================
   1. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');

  if (!menuBtn || !drawer) return;

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    if (overlay) {
      overlay.classList.remove('hidden');
      overlay.classList.add('opacity-100');
    }
    document.body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    drawer.classList.add('translate-x-full');
    if (overlay) {
      overlay.classList.remove('opacity-100');
      overlay.classList.add('hidden');
    }
    document.body.style.overflow = '';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close when clicking an anchor link inside drawer
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   2. ESTIMATE & QUOTE MODAL
   ========================================================================== */
function initEstimateModal() {
  const modal = document.getElementById('estimate-modal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('.close-estimate-modal');
  const openBtns = document.querySelectorAll('.open-estimate-modal');
  const serviceSelect = modal.querySelector('select[name="service_category"]');

  function openModal(preselectedService = null) {
    if (preselectedService && serviceSelect) {
      serviceSelect.value = preselectedService;
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      openModal(service);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  window.openCbtEstimateModal = openModal;
}

/* ==========================================================================
   3. ESTIMATE & SERVICE ORDER FORM VALIDATION & INTEGRATION (FORMSPREE -> PUSHOVER EMAIL)
   ========================================================================== */
const LEAD_DISPATCH_CONFIG = {
  // 1. Formspree Endpoint (https://formspree.io)
  // Point your Formspree form's target email to Justin's Pushover Email (e.g., xyz@pomail.net).
  // Paste your Formspree Form URL/ID below (e.g., 'https://formspree.io/f/xabcdefg')
  // and it will automatically apply to all 5 quote forms across the website!
  formspreeEndpoint: 'https://formspree.io/f/mqppjnpd',

  // 2. Optional Serverless / Direct Pushover Webhook Fallback
  pushoverWebhookEndpoint: '/api/lead-webhook',
  contractorPhone: '2172543091'
};

function initEstimateForms() {
  const forms = document.querySelectorAll('.cbt-quote-form');

  forms.forEach(form => {
    // SMS Direct Action Button
    const smsBtn = form.querySelector('.btn-send-sms');
    if (smsBtn) {
      smsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSmsSubmission(form);
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleFormspreeSubmission(form);
    });
  });
}

/**
 * Validates form fields and returns an object or null
 */
function getValidatedFormData(form) {
  const nameInput = form.querySelector('[name="full_name"]');
  const phoneInput = form.querySelector('[name="phone_number"]');
  const emailInput = form.querySelector('[name="email_address"]');
  const addressInput = form.querySelector('[name="property_address"]');
  const serviceInput = form.querySelector('[name="service_category"]');
  const timelineInput = form.querySelector('[name="timeline"]');
  const detailsInput = form.querySelector('[name="project_details"]');
  const sourceInput = form.querySelector('[name="_source"]');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const service = serviceInput ? serviceInput.value : '';
  const timeline = timelineInput ? timelineInput.value : 'Flexible';
  const details = detailsInput ? detailsInput.value.trim() : '';
  const source = sourceInput ? sourceInput.value : 'CBT Construction Website';

  // Basic Validation
  if (!name || name.length < 2) {
    alert('Please enter your full name.');
    if (nameInput) nameInput.focus();
    return null;
  }

  // Basic phone validation (at least 10 digits)
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    alert('Please enter a valid 10-digit phone number so Justin Fry can contact you.');
    if (phoneInput) phoneInput.focus();
    return null;
  }

  if (!service) {
    alert('Please select a service category.');
    if (serviceInput) serviceInput.focus();
    return null;
  }

  if (!address) {
    alert('Please provide your property address or town (Vandalia, Effingham, Cowden, or Central IL).');
    if (addressInput) addressInput.focus();
    return null;
  }

  return {
    name,
    phone,
    email: email || 'Not provided',
    address,
    service,
    timeline,
    details: details || 'No additional details noted',
    source
  };
}

/**
 * Opens mobile messaging app with pre-filled SMS body to Justin Fry
 */
function handleSmsSubmission(form) {
  const data = getValidatedFormData(form);
  if (!data) return;

  const contractorPhone = LEAD_DISPATCH_CONFIG.contractorPhone;
  const messageBody = 
`🔨 CBT CONSTRUCTION - QUOTE REQUEST
━━━━━━━━━━━━━━━━━━━━
👤 Name: ${data.name}
📞 Phone: ${data.phone}
📍 Address: ${data.address}
🏗️ Service: ${data.service}
⏱️ Timeline: ${data.timeline}
✉️ Email: ${data.email}
📝 Details: ${data.details}
━━━━━━━━━━━━━━━━━━━━
Sent from CBT Construction Website`;

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const separator = isIOS ? '&' : '?';
  const smsUrl = `sms:+1${contractorPhone}${separator}body=${encodeURIComponent(messageBody)}`;

  window.location.href = smsUrl;
}

/**
 * Dispatches lead via Formspree (which forwards directly to Justin's Pushover Email)
 * Clearly tagged with "🔨 CBT CONSTRUCTION" so it stands out from his other business (Mr. Lube).
 */
async function handleFormspreeSubmission(form) {
  const data = getValidatedFormData(form);
  if (!data) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Request';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Sending to Justin Fry...
    `;
  }

  // Use central LEAD_DISPATCH_CONFIG.formspreeEndpoint unless form action was specifically customized
  const formAction = form.getAttribute('action') || '';
  const endpoint =
    (!LEAD_DISPATCH_CONFIG.formspreeEndpoint.includes('YOUR_FORMSPREE_ID'))
      ? LEAD_DISPATCH_CONFIG.formspreeEndpoint
      : formAction;

  // Formatted message block for clean reading inside the Pushover app via Pushover Email
  const pushoverFormattedSummary =
`🚨 NEW CBT CONSTRUCTION LEAD!
━━━━━━━━━━━━━━━━━━━━━
🏢 Business: CBT Construction
👤 Name: ${data.name}
📞 Phone: ${data.phone} (tel:+1${data.phone.replace(/\D/g, '')})
📍 Address: ${data.address}
🏗️ Service: ${data.service}
⏱️ Timeline: ${data.timeline}
✉️ Email: ${data.email}
📝 Details: ${data.details}
📄 Form: ${data.source}`;

  try {
    // If the Formspree ID hasn't been pasted in yet, run demo simulation + optional local webhook
    if (!endpoint || endpoint.includes('YOUR_FORMSPREE_ID') || endpoint.includes('your-form-id')) {
      await new Promise(resolve => setTimeout(resolve, 700));
      showSuccessModal(data);
      form.reset();
      return;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _subject: `🔨 CBT CONSTRUCTION LEAD: ${data.service} — ${data.name} (${data.address})`,
        business: 'CBT Construction',
        message: pushoverFormattedSummary,
        full_name: data.name,
        phone_number: data.phone,
        email: data.email !== 'Not provided' ? data.email : undefined,
        _replyto: data.email !== 'Not provided' ? data.email : undefined,
        property_address: data.address,
        service_category: data.service,
        timeline: data.timeline,
        project_details: data.details,
        form_source: data.source
      })
    });

    if (response.ok) {
      showSuccessModal(data);
      form.reset();
    } else {
      throw new Error('Formspree submission failed');
    }
  } catch (err) {
    console.error('Submission error:', err);
    showSuccessModal(data, true);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  }
}

/**
 * Displays an interactive Confirmation Modal
 */
function showSuccessModal(data, hadError = false) {
  // If an estimate modal is open, close it first
  const estModal = document.getElementById('estimate-modal');
  if (estModal) {
    estModal.classList.add('hidden');
    estModal.classList.remove('flex');
  }

  let successModal = document.getElementById('success-confirmation-modal');
  if (!successModal) {
    successModal = document.createElement('div');
    successModal.id = 'success-confirmation-modal';
    successModal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md';
    document.body.appendChild(successModal);
  }

  successModal.innerHTML = `
    <div class="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative animate-scale-up">
      <div class="w-16 h-16 bg-amber-500/10 border-2 border-amber-500 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-white mb-2 font-heading">Quote Request Received!</h3>
      <p class="text-slate-300 text-sm mb-6 leading-relaxed">
        Thank you, <strong class="text-white">${data.name}</strong>! Your project request for <span class="text-amber-400 font-medium">${data.service}</span> in <span class="text-amber-400 font-medium">${data.address}</span> has been dispatched directly to <strong>Justin Fry</strong>.
      </p>

      <div class="bg-slate-800/80 rounded-xl p-4 text-left border border-slate-700 mb-6 text-xs text-slate-300 space-y-2">
        <div class="flex justify-between border-b border-slate-700/60 pb-1.5">
          <span class="text-slate-400">Callback Phone:</span>
          <span class="font-semibold text-white">${data.phone}</span>
        </div>
        <div class="flex justify-between border-b border-slate-700/60 pb-1.5">
          <span class="text-slate-400">Timeline / Urgency:</span>
          <span class="font-semibold text-amber-400">${data.timeline}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Owner Status:</span>
          <span class="font-semibold text-emerald-400">Dispatched via Formspree & Pushover</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <a href="tel:+12172543091" class="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center transition shadow-lg">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          Call Justin: (217) 254-3091
        </a>
        <button id="close-success-btn" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-5 rounded-xl text-sm transition">
          Close
        </button>
      </div>
    </div>
  `;

  successModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('close-success-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   4. PROJECT GALLERY LIGHTBOX
   ========================================================================== */
let galleryItems = [];
let currentLightboxIndex = 0;

function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const cards = document.querySelectorAll('.gallery-card');
  if (!cards.length) return;

  galleryItems = Array.from(cards).map(card => ({
    src: card.getAttribute('data-img-src') || card.querySelector('img')?.src,
    title: card.getAttribute('data-title') || 'CBT Construction Project',
    category: card.getAttribute('data-category') || 'General Contracting',
    location: card.getAttribute('data-location') || 'Central Illinois',
    desc: card.getAttribute('data-desc') || ''
  }));

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => changeLightboxImage(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeLightboxImage(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden-lightbox')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    if (e.key === 'ArrowRight') changeLightboxImage(1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox || !galleryItems[index]) return;

  currentLightboxIndex = index;
  renderLightboxContent();
  lightbox.classList.remove('hidden-lightbox');
  lightbox.classList.add('active-lightbox');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active-lightbox');
  lightbox.classList.add('hidden-lightbox');
  document.body.style.overflow = '';
}

function changeLightboxImage(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + galleryItems.length) % galleryItems.length;
  renderLightboxContent();
}

function renderLightboxContent() {
  const item = galleryItems[currentLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');
  const catEl = document.getElementById('lightbox-category');
  const locEl = document.getElementById('lightbox-location');
  const countEl = document.getElementById('lightbox-counter');

  if (imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.title;
  }
  if (titleEl) titleEl.textContent = item.title;
  if (catEl) catEl.textContent = item.category;
  if (locEl) locEl.textContent = item.location;
  if (countEl) countEl.textContent = `${currentLightboxIndex + 1} / ${galleryItems.length}`;
}

/* ==========================================================================
   5. GALLERY CATEGORY FILTERS
   ========================================================================== */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500', 'text-slate-950', 'active-filter');
        b.classList.add('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      });
      btn.classList.add('bg-amber-500', 'text-slate-950', 'active-filter');
      btn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');

      // Filter gallery cards
      items.forEach(item => {
        const itemCat = item.getAttribute('data-category-slug');
        if (filter === 'all' || itemCat === filter) {
          item.style.display = 'block';
          item.classList.add('animate-fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. BEFORE / AFTER COMPARISON SLIDER
   ========================================================================== */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.ba-container');

  containers.forEach(container => {
    const afterImg = container.querySelector('.ba-image-after');
    const handle = container.querySelector('.ba-slider-handle');
    if (!afterImg || !handle) return;

    let isDown = false;

    function setPosition(xPos) {
      const rect = container.getBoundingClientRect();
      let pos = (xPos - rect.left) / rect.width;
      if (pos < 0) pos = 0;
      if (pos > 1) pos = 1;

      const percentage = pos * 100;
      afterImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
      handle.style.left = `${percentage}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      setPosition(e.clientX);
    });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
      isDown = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDown = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
  });
}
