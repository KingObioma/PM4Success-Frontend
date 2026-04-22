/* ============================================
   PM4SUCCESS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const inits = [
    initNavbar,
    initAuthModals,
    initAuthState,
    initDropdowns,
    initAccordions,
    initLearnShowMore,
    initSkillsShowMore,
    initInstructorBioShowMore,
    initHelpSupportSidebar,
    initMobileFaqAccordion,
    initTabs,
    initCarousels,
    initPasswordToggles,
    initProgressRings,
    initStarRating,
    initNumberRating,
    initFileUploads,
    initCatalogueFilters,
    initFilterDropdowns,
    initCartInteractions,
    initCalendar,
    initSmoothScroll,
    initMobileCourseSidebar,
    initPromoCountdown,
    initHeroSlider,
    initProgramTabs,
    initValidation,
    initMyCourses,
    initBlogCarousel,
    initPurchaseSummaryToggles,
    initHelpSupportFaq,
    initAchievementsCarousel,
    initUserProfileCurrentCourses,
    initAvatarUpload,
    initVerifyIdUpload,
    initEditDetailsModal,
    initCareerPath,
    initIdTypeDropdown,
    initDobPicker,
    initVideoModal,
    initCoursePlayer,
    initAssignmentPage,
    initAssignGradesAccordion,
    initNnpcPageTabs,
    initVideoThumbnailPlayer,
    initCustomVideoControls,
    initDiscussionForum,
  ];

  inits.forEach((fn) => {
    try { fn(); } catch (e) { console.error(`${fn.name} failed:`, e); }
  });
});

/* ============================================
   1. Navbar
   ============================================ */
function initNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const switchPanel = document.querySelector('.switch-account-panel');
  const switchOverlay = document.querySelector('.switch-account-overlay');

  if (!toggle) return;

  function openMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('show');
    if (mobileOverlay) mobileOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('show');
      mobileMenu.classList.remove('user-panel-open');
    }
    if (mobileOverlay) mobileOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openSwitchPanel() {
    if (switchPanel) switchPanel.classList.add('show');
    if (switchOverlay) switchOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSwitchPanel() {
    if (switchPanel) switchPanel.classList.remove('show');
    if (switchOverlay) switchOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isLoggedIn = document.body.classList.contains('is-logged-in');
    const isMobile = window.innerWidth <= 767;

    if (isLoggedIn && !isMobile) {
      openSwitchPanel();
    } else {
      openMobileMenu();
    }
  });

  // User sub-panel toggle
  const userMenuBtn = document.getElementById('mobileUserMenuBtn');
  const userPanelBack = document.getElementById('mobileUserPanelBack');

  if (userMenuBtn) {
    userMenuBtn.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('user-panel-open');
    });
  }

  if (userPanelBack) {
    userPanelBack.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('user-panel-open');
    });
  }

  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  if (switchOverlay) switchOverlay.addEventListener('click', closeSwitchPanel);

  // Verification banner close
  const verifyClose = document.querySelector('.verification-banner-close');
  if (verifyClose) {
    verifyClose.addEventListener('click', function () {
      const banner = this.closest('.verification-banner');
      if (banner) banner.style.display = 'none';
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link, .mobile-menu-nav a').forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ============================================
   1b. Auth Modals
   ============================================ */
function initAuthModals() {
  // Open modal
  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      // Close mobile menu if open
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileOverlay = document.querySelector('.mobile-menu-overlay');
      if (mobileMenu) mobileMenu.classList.remove('show');
      if (mobileOverlay) mobileOverlay.classList.remove('show');

      // Close any open modal first
      document.querySelectorAll('.auth-modal-overlay.show, .app-modal-overlay.show').forEach((m) => {
        m.classList.remove('show');
      });

      const modalId = this.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal via X button
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', function () {
      const modal = this.closest('.auth-modal-overlay, .app-modal-overlay');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal via overlay click
  document.querySelectorAll('.auth-modal-overlay, .app-modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ============================================
   2. Auth State
   ============================================ */
function initAuthState() {
  const isLoggedIn = localStorage.getItem('pm4s_logged_in') === 'true';

  if (isLoggedIn) {
    document.body.classList.add('is-logged-in');
  } else {
    document.body.classList.remove('is-logged-in');
  }

  // Logout handler
  const logoutLinks = document.querySelectorAll('[data-action="logout"]');
  logoutLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem('pm4s_logged_in', 'false');
      window.location.href = link.getAttribute('data-redirect') || 'index.html';
    });
  });

  // Login handler (for demo) — validation runs first via initValidation
  const loginForms = document.querySelectorAll('[data-action="login"]');
  loginForms.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!Validator.validateForm(form)) return;
      localStorage.setItem('pm4s_logged_in', 'true');
      window.location.href = 'user-profile.html';
    });
  });

  // Signup handler (for demo) — validation runs first via initValidation
  const signupForms = document.querySelectorAll('[data-action="signup"]');
  signupForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!Validator.validateForm(form)) return;
      // Close signup modal and open OTP modal
      document.querySelectorAll('.auth-modal-overlay.show').forEach((m) => {
        m.classList.remove('show');
      });
      const otpModal = document.getElementById('verifyOtpModal');
      if (otpModal) {
        otpModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

}

/* ============================================
   3. Dropdowns
   ============================================ */
function initDropdowns() {
  const avatarToggle = document.querySelector('.nav-avatar');
  const dropdown = document.querySelector('.user-dropdown');

  if (!avatarToggle || !dropdown) return;

  avatarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !avatarToggle.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
}

/* ============================================
   4. Accordions
   ============================================ */
function initHelpSupportSidebar() {
  const sidebarItems = document.querySelectorAll('.hs-faq-sidebar-item[data-faq-category]');
  const groups = document.querySelectorAll('.hs-faq-accordion-group[data-faq-category]');

  if (!sidebarItems.length || !groups.length) return;

  sidebarItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const category = this.getAttribute('data-faq-category');

      sidebarItems.forEach((s) => { s.classList.remove('active'); });
      this.classList.add('active');

      groups.forEach((g) => {
        if (g.getAttribute('data-faq-category') === category) {
          g.classList.add('active');
        } else {
          g.classList.remove('active');
          g.querySelectorAll('.accordion-item.active').forEach((ai) => {
            ai.classList.remove('active');
          });
        }
      });
    });
  });
}

function initMobileFaqAccordion() {
  const faqCard = document.querySelector('.hs-faq-card');
  if (!faqCard) return;

  const MOBILE_BP = 768;
  const panels = ['learners', 'course-creator'];

  const mobileWrap = document.createElement('div');
  mobileWrap.className = 'hs-faq-mobile-wrap';

  panels.forEach((panelName) => {
    const nav = faqCard.querySelector(`.hs-faq-panel-nav[data-panel="${panelName}"]`);
    const content = faqCard.querySelector(`.hs-faq-panel-content[data-panel="${panelName}"]`);
    if (!nav || !content) return;

    const panelWrap = document.createElement('div');
    panelWrap.className = 'hs-faq-mobile-panel' + (panelName === 'learners' ? ' active' : '');
    panelWrap.setAttribute('data-panel', panelName);

    const navItems = nav.querySelectorAll('.hs-faq-sidebar-item');
    navItems.forEach((item, idx) => {
      const cat = item.getAttribute('data-faq-category');
      const group = content.querySelector(`.hs-faq-accordion-group[data-faq-category="${cat}"]`);
      if (!group) return;

      const section = document.createElement('div');
      section.className = 'hs-faq-mobile-section' + (idx === 0 ? ' active' : '');

      const header = document.createElement('div');
      header.className = 'hs-faq-mobile-section-header';
      header.innerHTML = '<span>' + item.textContent.trim() + '</span><i class="bi bi-chevron-down"></i>';

      const body = document.createElement('div');
      body.className = 'hs-faq-mobile-section-body';
      const accordionClone = group.querySelector('.accordion').cloneNode(true);
      body.appendChild(accordionClone);

      section.appendChild(header);
      section.appendChild(body);
      panelWrap.appendChild(section);
    });

    mobileWrap.appendChild(panelWrap);
  });

  // Clone CTA row for mobile
  const ctaRow = faqCard.querySelector('.hs-cta-row');
  if (ctaRow) {
    const ctaClone = ctaRow.cloneNode(true);
    ctaClone.className = 'hs-cta-row hs-faq-mobile-cta';
    mobileWrap.appendChild(ctaClone);
  }

  const row = faqCard.querySelector('.row');
  row.after(mobileWrap);

  // Mobile section toggle (category expand/collapse)
  mobileWrap.querySelectorAll('.hs-faq-mobile-section-header').forEach((hdr) => {
    hdr.addEventListener('click', () => {
      const section = hdr.parentElement;
      const panel = section.parentElement;
      const isActive = section.classList.contains('active');

      panel.querySelectorAll('.hs-faq-mobile-section.active').forEach((s) => {
        s.classList.remove('active');
        s.querySelectorAll('.accordion-item.active').forEach((ai) => ai.classList.remove('active'));
      });

      if (!isActive) {
        section.classList.add('active');
      }
    });
  });

  // Sub-accordion toggles (question expand/collapse)
  mobileWrap.querySelectorAll('.accordion-header').forEach((hdr) => {
    hdr.addEventListener('click', () => {
      const item = hdr.closest('.accordion-item');
      const parent = item.parentElement;
      const isActive = item.classList.contains('active');

      if (parent.hasAttribute('data-single-open')) {
        parent.querySelectorAll('.accordion-item.active').forEach((a) => a.classList.remove('active'));
      }

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Tab switching for mobile panels
  document.querySelectorAll('.hs-faq-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const panel = tab.getAttribute('data-tab');
      mobileWrap.querySelectorAll('.hs-faq-mobile-panel').forEach((p) => {
        p.classList.toggle('active', p.getAttribute('data-panel') === panel);
      });
    });
  });
}

function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach((header) => {
    header.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const parent = item.parentElement;
      const isActive = item.classList.contains('active');

      // Close siblings if single-open mode
      if (parent.hasAttribute('data-single-open')) {
        parent.querySelectorAll('.accordion-item.active').forEach((active) => {
          active.classList.remove('active');
        });
      }

      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // Module accordions (course content)
  const moduleHeaders = document.querySelectorAll('.module-header');

  moduleHeaders.forEach((header) => {
    header.addEventListener('click', function () {
      const module = this.closest('.module-item');
      const isActive = module.classList.toggle('active');
      const icon = this.querySelector('i.bi-chevron-down, i.bi-chevron-up');
      if (icon) {
        icon.classList.toggle('bi-chevron-down', !isActive);
        icon.classList.toggle('bi-chevron-up', isActive);
      }
    });
  });
}

/* ============================================
   4b. Learn Show More Toggle
   ============================================ */
function initLearnShowMore() {
  const toggleBtns = document.querySelectorAll('.learn-show-more');
  if (!toggleBtns.length) return;

  toggleBtns.forEach((btn) => {
    const grid = btn.previousElementSibling;
    if (!grid) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.classList.contains('expanded');
      btn.classList.toggle('expanded');
      grid.setAttribute('data-collapsed', isExpanded ? 'true' : 'false');
      btn.innerHTML = isExpanded
        ? 'Show more <i class="bi bi-chevron-down"></i>'
        : 'Show less <i class="bi bi-chevron-down"></i>';
    });
  });
}

/* ============================================
   4c. Skills Show More Toggle
   ============================================ */
function initSkillsShowMore() {
  const toggleBtns = document.querySelectorAll('.skills-show-more');
  if (!toggleBtns.length) return;

  toggleBtns.forEach((btn) => {
    const grid = btn.previousElementSibling;
    if (!grid) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.classList.contains('expanded');
      btn.classList.toggle('expanded');
      grid.setAttribute('data-collapsed', isExpanded ? 'true' : 'false');
      btn.innerHTML = isExpanded
        ? 'Show more <i class="bi bi-chevron-down"></i>'
        : 'Show less <i class="bi bi-chevron-down"></i>';
    });
  });
}

/* ============================================
   4d. Instructor Bio Show More Toggle
   ============================================ */
function initInstructorBioShowMore() {
  const toggleBtns = document.querySelectorAll('.instructor-bio-show-more');
  if (!toggleBtns.length) return;

  toggleBtns.forEach((btn) => {
    const bioText = btn.previousElementSibling;
    if (!bioText) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.classList.contains('expanded');
      btn.classList.toggle('expanded');
      bioText.setAttribute('data-collapsed', isExpanded ? 'true' : 'false');
      btn.innerHTML = isExpanded
        ? 'Show more <i class="bi bi-chevron-down"></i>'
        : 'Show less <i class="bi bi-chevron-down"></i>';
    });
  });
}

/* ============================================
   5. Tabs
   ============================================ */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach((container) => {
    const buttons = container.querySelectorAll('.tab-btn');
    const tabGroup = container.getAttribute('data-tabs');
    const contents = document.querySelectorAll('[data-tab-content="' + tabGroup + '"] .tab-content');

    buttons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-tab');

        // Deactivate all
        buttons.forEach((b) => { b.classList.remove('active'); });
        contents.forEach((c) => { c.classList.remove('active'); });

        // Activate clicked
        this.classList.add('active');
        const targetContent = document.getElementById(target);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  });
}

/* ============================================
   6. Carousels
   ============================================ */
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel-wrapper');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-btn-prev');
    const nextBtn = carousel.querySelector('.carousel-btn-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (!track) return;

    const isPageScroll = track.hasAttribute('data-scroll-page');

    if (isPageScroll) {
      // Transform-based page carousel (testimonials)
      // Find buttons and dots from section level (they live outside .carousel-wrapper)
      const section = carousel.closest('section');
      let currentPage = 0;

      function getVisibleCards() {
        const cards = track.children;
        let count = 0;
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].offsetParent !== null) count++;
        }
        return count;
      }

      function getCardsPerPage() {
        if (window.innerWidth <= 767) return 1;
        return 3;
      }

      function getGap() {
        if (window.innerWidth <= 575) return 12;
        return 20;
      }

      function getTotalPages() {
        return Math.ceil(getVisibleCards() / getCardsPerPage());
      }

      function goToPage(page) {
        const totalPages = getTotalPages();
        if (page < 0) page = 0;
        if (page >= totalPages) page = totalPages - 1;
        currentPage = page;
        const gap = getGap();
        const cardsPerPage = getCardsPerPage();
        const firstCard = track.children[0];
        const cardWidth = firstCard ? firstCard.offsetWidth : carousel.offsetWidth;
        const offset = currentPage * cardsPerPage * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';

        // Update dots
        const dotsContainer = section.querySelector('.carousel-dots');
        if (dotsContainer) {
          const allDots = dotsContainer.querySelectorAll('.carousel-dot');
          allDots.forEach((d, i) => {
            d.classList.toggle('active', i === currentPage);
          });
        }
      }

      // Recalculate on resize
      window.addEventListener('resize', () => {
        const totalPages = getTotalPages();
        if (currentPage >= totalPages) currentPage = totalPages - 1;
        goToPage(currentPage);
      });

      // Nav buttons (found from section since they're outside wrapper)
      const sectionPrev = section.querySelector('.carousel-btn-prev');
      const sectionNext = section.querySelector('.carousel-btn-next');

      if (sectionPrev) {
        sectionPrev.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          goToPage(currentPage - 1);
        });
      }

      if (sectionNext) {
        sectionNext.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          goToPage(currentPage + 1);
        });
      }

      // Dot clicks
      const dotsContainer = section.querySelector('.carousel-dots');
      if (dotsContainer) {
        dotsContainer.setAttribute('data-handled', 'true');
        const allDots = dotsContainer.querySelectorAll('.carousel-dot');
        allDots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            goToPage(index);
          });
        });
      }

      // Mark buttons so standalone handler skips them
      if (sectionPrev) sectionPrev.setAttribute('data-handled', 'true');
      if (sectionNext) sectionNext.setAttribute('data-handled', 'true');

    } else {
      // Scroll-based carousel (default)
      let scrollAmount = 300;
      const firstChild = track.firstElementChild;
      if (firstChild) {
        scrollAmount = firstChild.offsetWidth + 20;
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }

      // Dot indicators
      if (dots.length > 0) {
        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            const children = track.children;
            if (children[index]) {
              children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            }
            dots.forEach((d) => { d.classList.remove('active'); });
            dot.classList.add('active');
          });
        });

        // Update active dot on scroll
        track.addEventListener('scroll', () => {
          const scrollLeft = track.scrollLeft;
          const childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 300;
          const activeIndex = Math.round(scrollLeft / childWidth);
          dots.forEach((d, i) => {
            d.classList.toggle('active', i === activeIndex);
          });
        });
      }
    }
  });

  // Standalone carousel nav buttons with data-target (skip transform-based carousels)
  const standaloneNavBtns = document.querySelectorAll('.carousel-btn[data-target]');
  standaloneNavBtns.forEach((btn) => {
    if (btn.hasAttribute('data-handled')) return;
    btn.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const track = document.getElementById(targetId);
      if (!track) return;

      const gap = window.innerWidth <= 575 ? 12 : 20;
      const childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + gap : 300;
      const itemsPerPage = 3;
      const pageWidth = childWidth * itemsPerPage;
      const direction = this.classList.contains('carousel-btn-prev') ? -1 : 1;
      const maxScroll = track.scrollWidth - track.clientWidth;
      let newScroll = track.scrollLeft + (direction * pageWidth);

      // Loop: if past the end go to start, if before start go to end
      if (newScroll > maxScroll) {
        newScroll = 0;
      } else if (newScroll < 0) {
        newScroll = maxScroll;
      }

      track.scrollTo({ left: newScroll, behavior: 'smooth' });
    });
  });

  // Standalone carousel dots (outside carousel-wrapper, skip transform-based carousels)
  const standaloneDots = document.querySelectorAll('.carousel-dots');
  standaloneDots.forEach((dotsContainer) => {
    if (dotsContainer.hasAttribute('data-handled')) return;
    const section = dotsContainer.closest('section');
    if (!section) return;
    const track = section.querySelector('.carousel-track');
    if (!track) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const gap = window.innerWidth <= 575 ? 12 : 20;
        const itemsPerPage = 3;
        const childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + gap : 300;
        const scrollTo = index * itemsPerPage * childWidth;
        track.scrollTo({ left: scrollTo, behavior: 'smooth' });
        dots.forEach((d) => { d.classList.remove('active'); });
        dot.classList.add('active');
      });
    });

    track.addEventListener('scroll', () => {
      const scrollLeft = track.scrollLeft;
      const gap = window.innerWidth <= 575 ? 12 : 20;
      const itemsPerPage = 3;
      const childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + gap : 300;
      const pageWidth = childWidth * itemsPerPage;
      let activeIndex = Math.round(scrollLeft / pageWidth);
      if (activeIndex >= dots.length) activeIndex = 0;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIndex);
      });
    });

    // Auto-loop: when scrolled to the end, jump back to start
    track.addEventListener('scrollend', () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 5) {
        setTimeout(() => {
          track.scrollTo({ left: 0, behavior: 'smooth' });
          dots.forEach((d) => { d.classList.remove('active'); });
          dots[0].classList.add('active');
        }, 2000);
      }
    });
  });
}

/* ============================================
   7. Password Toggles
   ============================================ */
function initPasswordToggles() {
  const toggles = document.querySelectorAll('[data-toggle-password]');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const targetId = this.getAttribute('data-toggle-password');
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        this.classList.remove('bi-eye');
        this.classList.add('bi-eye-slash');
      } else {
        input.type = 'password';
        this.classList.remove('bi-eye-slash');
        this.classList.add('bi-eye');
      }
    });
  });
}

/* ============================================
   8. Progress Rings
   ============================================ */
function initProgressRings() {
  const rings = document.querySelectorAll('.progress-ring-circle');

  if (rings.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const percentage = parseFloat(circle.getAttribute('data-percentage')) || 0;
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        // Trigger animation
        requestAnimationFrame(() => {
          const offset = circumference - (percentage / 100) * circumference;
          circle.style.strokeDashoffset = offset;
        });

        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.3 });

  rings.forEach((ring) => {
    observer.observe(ring);
  });
}

/* ============================================
   9. Star Rating
   ============================================ */
function initStarRating() {
  const ratingContainers = document.querySelectorAll('.star-rating[data-interactive]');

  ratingContainers.forEach((container) => {
    const stars = container.querySelectorAll('i');
    const input = container.querySelector('input[type="hidden"]');

    stars.forEach((star, index) => {
      star.addEventListener('mouseenter', () => {
        highlightStars(stars, index);
      });

      star.addEventListener('click', () => {
        if (input) input.value = index + 1;
        stars.forEach((s, i) => {
          s.setAttribute('data-selected', i <= index ? 'true' : 'false');
        });
        highlightStars(stars, index);
      });
    });

    container.addEventListener('mouseleave', () => {
      // Reset to selected state
      stars.forEach((s, i) => {
        const isSelected = s.getAttribute('data-selected') === 'true';
        s.classList.toggle('active', isSelected);
      });
    });
  });

  function highlightStars(stars, upToIndex) {
    stars.forEach((s, i) => {
      s.classList.toggle('active', i <= upToIndex);
    });
  }
}

/* ============================================
   9b. Number Rating (1–5 circle buttons)
   ============================================ */
function initNumberRating() {
  const containers = document.querySelectorAll('[data-number-rating]');

  containers.forEach((container) => {
    const buttons = container.querySelectorAll('.number-rating-btn');
    const input = container.querySelector('input[type="hidden"]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        if (input) input.value = value;
        buttons.forEach((b) => {
          b.classList.toggle('active', b === btn);
        });
      });
    });
  });
}

/* ============================================
   10. File Uploads
   ============================================ */
function initFileUploads() {
  const uploaders = document.querySelectorAll('[data-file-upload]');

  uploaders.forEach((uploader) => {
    const input = uploader.querySelector('input[type="file"]');
    const preview = uploader.querySelector('.upload-preview');
    const label = uploader.querySelector('.upload-label');

    if (!input) return;

    input.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        const file = this.files[0];

        if (label) {
          label.textContent = file.name;
        }

        if (preview && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            preview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    });
  });
}

/* ============================================
   11. Catalogue Filters
   ============================================ */
function initCatalogueFilters() {
  const catalogueSidebar = document.querySelector('.catalogue-sidebar');
  if (!catalogueSidebar) return;

  const tabs = catalogueSidebar.querySelectorAll('.program-tab');
  const courseCards = document.querySelectorAll('.catalogue-course-list .course-card-h');

  const mobileToggles = document.querySelectorAll('.catalogue-accordion-toggle');

  if (!tabs.length) return;

  // Filter to active category on page load
  const activeTab = catalogueSidebar.querySelector('.program-tab.active');
  const initialCategory = activeTab ? activeTab.getAttribute('data-category') : 'popular';

  function filterCards(category) {
    courseCards.forEach((card) => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Shared active category — keeps desktop and mobile in sync
  let activeCategory = initialCategory;

  // Apply initial filter
  filterCards(activeCategory);

  // Helper: sync mobile accordions to a given category
  function syncMobile(category) {
    mobileToggles.forEach((t) => {
      const c = t.nextElementSibling;
      if (t.getAttribute('data-category') === category) {
        t.classList.add('active');
        if (c && c.classList.contains('catalogue-accordion-content')) {
          c.classList.add('open');
        }
      } else {
        t.classList.remove('active');
        if (c && c.classList.contains('catalogue-accordion-content')) {
          c.classList.remove('open');
        }
      }
    });
  }

  // Helper: sync desktop tabs to a given category
  function syncDesktop(category) {
    tabs.forEach((t) => {
      if (t.getAttribute('data-category') === category) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
    filterCards(category);
  }

  // Desktop sidebar tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeCategory = tab.getAttribute('data-category');
      syncDesktop(activeCategory);
    });
  });

  // Mobile accordion toggles
  mobileToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const hasContent = content && content.classList.contains('catalogue-accordion-content');
      const isOpen = hasContent && content.classList.contains('open');

      // Close all accordions
      mobileToggles.forEach((t) => {
        t.classList.remove('active');
        const c = t.nextElementSibling;
        if (c && c.classList.contains('catalogue-accordion-content')) {
          c.classList.remove('open');
        }
      });

      // If already open, keep it closed
      if (isOpen) return;

      // Open clicked accordion
      toggle.classList.add('active');
      if (hasContent) content.classList.add('open');

      activeCategory = toggle.getAttribute('data-category');
    });
  });

  // On resize: always keep both views in sync
  window.addEventListener('resize', () => {
    syncDesktop(activeCategory);
    syncMobile(activeCategory);
  });

  // Mobile filter sidebar toggle
  const filterToggle = document.querySelector('[data-toggle="filter-sidebar"]');
  const filterSidebar = document.querySelector('.filter-sidebar');
  const filterOverlay = document.querySelector('.filter-overlay');

  if (filterToggle && filterSidebar) {
    filterToggle.addEventListener('click', () => {
      filterSidebar.classList.toggle('show');
      if (filterOverlay) filterOverlay.classList.toggle('show');
    });

    if (filterOverlay) {
      filterOverlay.addEventListener('click', () => {
        filterSidebar.classList.remove('show');
        filterOverlay.classList.remove('show');
      });
    }
  }
}

/* ============================================
   11b. Filter Dropdown Toggles
   ============================================ */
function initFilterDropdowns() {
  const wrappers = document.querySelectorAll('.filter-dropdown-wrapper');
  if (!wrappers.length) return;

  // Toggle dropdown on pill click
  wrappers.forEach((wrapper) => {
    const btn = wrapper.querySelector('.filter-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('open');

      // Close all dropdowns first
      wrappers.forEach((w) => { w.classList.remove('open'); });

      // Toggle the clicked one
      if (!isOpen) {
        wrapper.classList.add('open');
        positionDropdown(wrapper);
      }
    });
  });

  // Position dropdown so it stays within viewport
  function positionDropdown(wrapper) {
    const panel = wrapper.querySelector('.filter-dropdown-panel');
    if (!panel) return;

    // Reset positioning
    panel.style.left = '0';
    panel.style.right = 'auto';

    // Check if it overflows right edge
    let rect = panel.getBoundingClientRect();
    if (rect.right > window.innerWidth - 16) {
      panel.style.left = 'auto';
      panel.style.right = '0';

      // Check if it now overflows left edge
      rect = panel.getBoundingClientRect();
      if (rect.left < 16) {
        panel.style.right = 'auto';
        panel.style.left = -rect.left + 16 + 'px';
      }
    }
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-dropdown-wrapper')) {
      wrappers.forEach((w) => { w.classList.remove('open'); });
    }
  });

  // Prevent dropdown panel clicks from closing the panel
  document.querySelectorAll('.filter-dropdown-panel').forEach((panel) => {
    panel.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
}

/* ============================================
   12. Cart Interactions
   ============================================ */
function initCartInteractions() {
  // Remove item
  const removeButtons = document.querySelectorAll('[data-action="remove-cart-item"]');

  removeButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const item = this.closest('.cart-item');
      if (item) {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          item.remove();
          updateCartTotal();
          checkCartEmpty();
        }, 300);
      }
    });
  });

  function updateCartTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;
    items.forEach((item) => {
      const priceEl = item.querySelector('.cart-item-price');
      if (priceEl) {
        const priceText = priceEl.textContent.replace(/[^0-9.]/g, '');
        total += parseFloat(priceText) || 0;
      }
    });
    const totalEl = document.querySelector('.cart-total-amount');
    if (totalEl) {
      totalEl.textContent = '\u20A6' + total.toLocaleString();
    }
  }

  function checkCartEmpty() {
    const items = document.querySelectorAll('.cart-item');
    const emptyState = document.querySelector('.cart-empty-state');
    const cartContent = document.querySelector('.cart-content');

    if (items.length === 0 && emptyState && cartContent) {
      cartContent.style.display = 'none';
      emptyState.style.display = 'flex';
    }
  }
}

/* ============================================
   13. Calendar Widget
   ============================================ */
function initCalendar() {
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  document.querySelectorAll('[data-calendar]').forEach((calendar) => {
    const grid = calendar.querySelector('[data-calendar-grid]');
    const monthLabel = calendar.querySelector('[data-calendar-month-label]');
    const selectedLabel = calendar.querySelector('[data-calendar-label]');
    const prevBtn = calendar.querySelector('[data-calendar-prev]');
    const nextBtn = calendar.querySelector('[data-calendar-next]');
    const toggleBtn = calendar.querySelector('[data-calendar-toggle]');
    const picker = calendar.querySelector('[data-calendar-picker]');
    const pickerMonths = calendar.querySelector('[data-picker-months]');
    const pickerYearLabel = calendar.querySelector('[data-picker-year-label]');
    const pickerYearPrev = calendar.querySelector('[data-picker-year-prev]');
    const pickerYearNext = calendar.querySelector('[data-picker-year-next]');

    if (!grid) return;

    const initialYear = parseInt(calendar.getAttribute('data-initial-year'), 10);
    const initialMonth = parseInt(calendar.getAttribute('data-initial-month'), 10);
    const initialDay = parseInt(calendar.getAttribute('data-initial-day'), 10);
    const eventDates = (calendar.getAttribute('data-event-dates') || '')
      .split(',')
      .map((s) => { return parseInt(s.trim(), 10); })
      .filter((n) => { return !isNaN(n); });

    const today = new Date();
    let viewYear = isNaN(initialYear) ? today.getFullYear() : initialYear;
    let viewMonth = isNaN(initialMonth) ? today.getMonth() : initialMonth;
    let pickerYear = viewYear;
    let selected = {
      year: viewYear,
      month: viewMonth,
      day: isNaN(initialDay) ? today.getDate() : initialDay
    };

    function renderGrid() {
      if (monthLabel) {
        monthLabel.textContent = MONTH_NAMES[viewMonth] + ' ' + viewYear;
      }

      grid.querySelectorAll('.ud-day').forEach((el) => { el.remove(); });

      const firstDay = new Date(viewYear, viewMonth, 1).getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'ud-day ud-day-empty';
        grid.appendChild(empty);
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const dayEl = document.createElement('button');
        dayEl.type = 'button';
        dayEl.className = 'ud-day';
        dayEl.textContent = d;
        dayEl.setAttribute('data-day', d);

        if (eventDates.indexOf(d) !== -1) {
          dayEl.classList.add('ud-day-event');
        }
        if (d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
          dayEl.classList.add('ud-day-today');
        }
        if (selected.year === viewYear && selected.month === viewMonth && selected.day === d) {
          dayEl.classList.add('ud-day-selected');
        }

        dayEl.addEventListener('click', function () {
          selected = {
            year: viewYear,
            month: viewMonth,
            day: parseInt(this.getAttribute('data-day'), 10)
          };
          updateSelectedLabel();
          renderGrid();
        });

        grid.appendChild(dayEl);
      }
    }

    function updateSelectedLabel() {
      if (!selectedLabel) return;
      const date = new Date(selected.year, selected.month, selected.day);
      selectedLabel.textContent = DAY_SHORT[date.getDay()] + ', ' + MONTH_SHORT[selected.month] + ' ' + selected.day;
    }

    function shiftMonth(delta) {
      viewMonth += delta;
      while (viewMonth < 0) { viewMonth += 12; viewYear--; }
      while (viewMonth > 11) { viewMonth -= 12; viewYear++; }
      renderGrid();
    }

    function renderPicker() {
      if (!pickerMonths || !pickerYearLabel) return;
      pickerYearLabel.textContent = pickerYear;
      pickerMonths.innerHTML = '';
      MONTH_SHORT.forEach((name, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ud-month-option';
        btn.textContent = name;
        if (idx === viewMonth && pickerYear === viewYear) {
          btn.classList.add('is-active');
        }
        btn.addEventListener('click', () => {
          viewMonth = idx;
          viewYear = pickerYear;
          closePicker();
          renderGrid();
        });
        pickerMonths.appendChild(btn);
      });
    }

    function openPicker() {
      if (!picker) return;
      pickerYear = viewYear;
      renderPicker();
      picker.hidden = false;
      calendar.classList.add('is-picker-open');
    }

    function closePicker() {
      if (!picker) return;
      picker.hidden = true;
      calendar.classList.remove('is-picker-open');
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { shiftMonth(-1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { shiftMonth(1); });

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (picker && picker.hidden) { openPicker(); } else { closePicker(); }
      });
    }

    if (pickerYearPrev) {
      pickerYearPrev.addEventListener('click', () => {
        pickerYear--;
        renderPicker();
      });
    }
    if (pickerYearNext) {
      pickerYearNext.addEventListener('click', () => {
        pickerYear++;
        renderPicker();
      });
    }

    document.addEventListener('click', (e) => {
      if (!calendar.contains(e.target)) closePicker();
    });

    renderGrid();
    updateSelectedLabel();
  });
}

/* ============================================
   14. Smooth Scroll (sidebar nav)
   ============================================ */
function initSmoothScroll() {
  let scrollSpyPaused = false;
  const scrollLinks = document.querySelectorAll('[data-scroll-to]');

  scrollLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-scroll-to');
      const target = document.getElementById(targetId);

      // Update active state immediately
      const nav = this.closest('.sidebar-nav');
      if (nav) {
        nav.querySelectorAll('a').forEach((a) => { a.classList.remove('active'); });
        this.classList.add('active');
      }

      // Pause scroll-spy so it doesn't override the click
      scrollSpyPaused = true;
      setTimeout(() => { scrollSpyPaused = false; }, 800);

      if (target) {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 72;
        const extraOffset = window.innerWidth < 768 ? 120 : 40;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - extraOffset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // Scroll-spy: update active sidebar link on scroll
  const sidebarNav = document.querySelector('.terms-sidebar-nav');
  if (sidebarNav) {
    const sidebarLinks = sidebarNav.querySelectorAll('a[data-scroll-to]');
    const sections = [];
    sidebarLinks.forEach((link) => {
      const target = document.getElementById(link.getAttribute('data-scroll-to'));
      if (target) sections.push({ link: link, target: target });
    });

    if (sections.length) {
      window.addEventListener('scroll', () => {
        if (scrollSpyPaused) return;

        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 72;
        const extraOffset = window.innerWidth < 768 ? 120 : 40;
        const scrollPos = window.pageYOffset + navHeight + extraOffset;
        let current = sections[0];

        for (let i = 0; i < sections.length; i++) {
          if (sections[i].target.offsetTop <= scrollPos) {
            current = sections[i];
          }
        }

        sidebarLinks.forEach((link) => { link.classList.remove('active'); });
        current.link.classList.add('active');

        // On mobile, scroll active link into view in horizontal nav
        if (window.innerWidth < 768) {
          const nav = current.link.parentElement;
          const linkLeft = current.link.offsetLeft;
          const linkWidth = current.link.offsetWidth;
          const navWidth = nav.offsetWidth;
          nav.scrollLeft = linkLeft - (navWidth / 2) + (linkWidth / 2);
        }
      });
    }
  }
}

/* ============================================
   15. Mobile Course Sidebar
   ============================================ */
function initMobileCourseSidebar() {
  const toggleBtn = document.querySelector('[data-toggle="course-sidebar"]');
  const sidebar = document.querySelector('.course-sidebar-panel');
  const closeBtn = document.querySelector('.course-sidebar-close');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('show');
    });
  }
}

/* ============================================
   Promo Countdown Timer
   ============================================ */
function initPromoCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const countdownEl = document.querySelector('.promo-countdown') || document.querySelector('[data-countdown-duration]');
  const DURATION = (countdownEl && countdownEl.getAttribute('data-countdown-duration'))
    ? parseInt(countdownEl.getAttribute('data-countdown-duration')) * 24 * 60 * 60 * 1000
    : 3 * 24 * 60 * 60 * 1000; // default 3 days in ms
  const STORAGE_KEY = 'promoCountdownEnd';

  function getEndTime() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && Number(stored) > Date.now()) {
      return Number(stored);
    }
    const end = Date.now() + DURATION;
    localStorage.setItem(STORAGE_KEY, end);
    return end;
  }

  let endTime = getEndTime();

  function tick() {
    let remaining = endTime - Date.now();

    if (remaining <= 0) {
      // Restart the countdown
      endTime = Date.now() + DURATION;
      localStorage.setItem(STORAGE_KEY, endTime);
      remaining = DURATION;
    }

    const totalSecs = Math.floor(remaining / 1000);
    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    daysEl.textContent = d + 'd';
    hoursEl.textContent = h + 'h';
    minsEl.textContent = m + 'min';
    secsEl.textContent = s + 's';
  }

  tick();
  setInterval(tick, 1000);
}

/* ============================================
   Hero Slider
   ============================================ */
function initHeroSlider() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-slider-dot');

  if (heroSlides.length >= 2) {
    let heroCurrent = 0;

    function goToHeroSlide(index) {
      heroSlides[heroCurrent].classList.remove('active');
      if (heroDots.length) heroDots[heroCurrent].classList.remove('active');
      heroCurrent = index;
      heroSlides[heroCurrent].classList.add('active');
      if (heroDots.length) heroDots[heroCurrent].classList.add('active');
    }

    heroDots.forEach((dot) => {
      dot.addEventListener('click', function () {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        goToHeroSlide(slideIndex);
      });
    });

    setInterval(() => {
      goToHeroSlide((heroCurrent + 1) % heroSlides.length);
    }, 30000);
  }

  const ctaSlides = document.querySelectorAll('.cta-teach-slide');
  const ctaDots = document.querySelectorAll('.cta-slider-dot');
  if (ctaSlides.length >= 2) {
    let ctaCurrent = 0;

    function goToCtaSlide(index) {
      ctaSlides[ctaCurrent].classList.remove('active');
      if (ctaDots.length) ctaDots[ctaCurrent].classList.remove('active');
      ctaCurrent = index;
      ctaSlides[ctaCurrent].classList.add('active');
      if (ctaDots.length) ctaDots[ctaCurrent].classList.add('active');
    }

    ctaDots.forEach((dot) => {
      dot.addEventListener('click', function () {
        const slideIndex = parseInt(this.getAttribute('data-cta-slide'));
        goToCtaSlide(slideIndex);
      });
    });

    setInterval(() => {
      goToCtaSlide((ctaCurrent + 1) % ctaSlides.length);
    }, 30000);
  }
}

/* ============================================
   Program Tabs
   ============================================ */
function initProgramTabs() {
  const sidebar = document.querySelector('.program-sidebar:not(.catalogue-sidebar)');
  if (!sidebar) return;

  const sidebarTabs = sidebar.querySelectorAll('.program-tab');
  const allGrids = document.querySelectorAll('.program-grid');
  const accordionToggles = document.querySelectorAll('.program-accordion-toggle');

  if (!sidebarTabs.length) return;

  /* Shared active category */
  const activeSidebarTab = sidebar.querySelector('.program-tab.active');
  let activeCategory = activeSidebarTab ? activeSidebarTab.getAttribute('data-category') : 'popular';

  /* Switch the visible grid to the given category */
  function showGrid(category) {
    allGrids.forEach((grid) => {
      if (grid.getAttribute('data-category') === category) {
        grid.classList.add('active');
      } else {
        grid.classList.remove('active');
      }
    });
  }

  /* Sync desktop sidebar tabs to a category */
  function syncDesktop(category) {
    sidebarTabs.forEach((t) => {
      if (t.getAttribute('data-category') === category) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
    showGrid(category);
  }

  /* Sync mobile accordions to a category */
  function syncMobile(category) {
    accordionToggles.forEach((t) => {
      const c = t.nextElementSibling;
      if (t.getAttribute('data-category') === category) {
        t.classList.add('active');
        if (c) c.classList.add('open');
      } else {
        t.classList.remove('active');
        if (c) c.classList.remove('open');
      }
    });
  }

  /* Sidebar tabs */
  const popularTab = sidebar.querySelector('.program-tab[data-category="popular"]');

  sidebarTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');
      const isMobile = window.innerWidth < 768;

      if (isMobile && category === 'popular') {
        /* On mobile, popular tab toggles the popular grid */
        const isActive = tab.classList.contains('active');

        /* Close any open accordion */
        accordionToggles.forEach((t) => {
          t.classList.remove('active');
          t.nextElementSibling.classList.remove('open');
        });

        if (isActive) {
          /* Collapse popular */
          tab.classList.remove('active');
          allGrids.forEach((g) => { g.classList.remove('active'); });
        } else {
          /* Expand popular */
          tab.classList.add('active');
          showGrid('popular');
          activeCategory = 'popular';
        }
      } else {
        /* Desktop: just switch tabs */
        activeCategory = category;
        syncDesktop(activeCategory);
      }
    });
  });

  /* Mobile accordion toggles */
  accordionToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isOpen = content.classList.contains('open');

      /* Close all accordions */
      accordionToggles.forEach((t) => {
        t.classList.remove('active');
        t.nextElementSibling.classList.remove('open');
      });

      /* Hide all grids and deactivate popular tab */
      allGrids.forEach((g) => { g.classList.remove('active'); });
      if (popularTab) popularTab.classList.remove('active');

      /* If already open, do nothing */
      if (isOpen) return;

      toggle.classList.add('active');
      content.classList.add('open');
      activeCategory = toggle.getAttribute('data-category');
    });
  });

  /* On resize: keep both views in sync */
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      if (activeCategory === 'popular') {
        /* Show popular grid, activate popular tab, close accordions */
        if (popularTab) popularTab.classList.add('active');
        showGrid('popular');
        accordionToggles.forEach((t) => {
          t.classList.remove('active');
          t.nextElementSibling.classList.remove('open');
        });
      } else {
        /* Hide grids, deactivate popular tab, open matching accordion */
        if (popularTab) popularTab.classList.remove('active');
        allGrids.forEach((g) => { g.classList.remove('active'); });
        syncMobile(activeCategory);
      }
    } else {
      /* Desktop: sync tabs and grid, close all accordions */
      syncDesktop(activeCategory);
      accordionToggles.forEach((t) => {
        t.classList.remove('active');
        t.nextElementSibling.classList.remove('open');
      });
    }
  });
}

/* ============================================
   FORM VALIDATION MODULE
   ============================================ */

/**
 * Validator — reusable validation utilities
 * All validators return { valid: boolean, message: string }
 */
const Validator = (() => {

  /* ------------------------------------------
     Core Validators
     ------------------------------------------ */

  function validateRequired(value) {
    const trimmed = (value || '').trim();
    return {
      valid: trimmed.length > 0,
      message: 'This field is required'
    };
  }

  function validateEmail(value) {
    const trimmed = (value || '').trim();
    if (!trimmed) return { valid: false, message: 'Please enter your email address' };
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      valid: pattern.test(trimmed),
      message: 'Please enter a valid email address'
    };
  }

  function validatePassword(value) {
    const val = value || '';
    if (!val) return { valid: false, message: 'Please enter a password' };
    if (val.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
    if (!/[A-Z]/.test(val)) return { valid: false, message: 'Password must include at least 1 uppercase letter' };
    if (!/[a-z]/.test(val)) return { valid: false, message: 'Password must include at least 1 lowercase letter' };
    if (!/[0-9]/.test(val)) return { valid: false, message: 'Password must include at least 1 number' };
    return { valid: true, message: '' };
  }

  function validateMatch(value1, value2, fieldName) {
    const label = fieldName || 'Passwords';
    return {
      valid: value1 === value2 && value1 !== '',
      message: label + ' do not match'
    };
  }

  function validatePhone(value) {
    const trimmed = (value || '').trim();
    if (!trimmed) return { valid: false, message: 'Please enter your phone number' };
    const digits = trimmed.replace(/[\s\-\+\(\)]/g, '');
    if (!/^\d+$/.test(digits)) return { valid: false, message: 'Phone number must contain only numbers' };
    if (digits.length < 10 || digits.length > 15) return { valid: false, message: 'Phone number must be between 10 and 15 digits' };
    return { valid: true, message: '' };
  }

  function validateMinLength(value, min) {
    const trimmed = (value || '').trim();
    return {
      valid: trimmed.length >= min,
      message: 'Must be at least ' + min + ' characters'
    };
  }

  function validateMaxLength(value, max) {
    const trimmed = (value || '').trim();
    return {
      valid: trimmed.length <= max,
      message: 'Must be no more than ' + max + ' characters'
    };
  }

  function validateName(value) {
    const trimmed = (value || '').trim();
    if (!trimmed) return { valid: false, message: 'Please enter your name' };
    if (trimmed.length < 2) return { valid: false, message: 'Name must be at least 2 characters' };
    if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    return { valid: true, message: '' };
  }

  function validateSelect(value) {
    return {
      valid: value !== '' && value !== null && value !== undefined,
      message: 'Please select an option'
    };
  }

  function validateOTP(value) {
    const trimmed = (value || '').trim();
    if (!trimmed) return { valid: false, message: 'Please enter the OTP code' };
    if (!/^\d+$/.test(trimmed)) return { valid: false, message: 'OTP must contain only numbers' };
    if (trimmed.length < 4 || trimmed.length > 6) return { valid: false, message: 'OTP must be 4-6 digits' };
    return { valid: true, message: '' };
  }

  /* ------------------------------------------
     DOM Helpers
     ------------------------------------------ */

  function showError(inputEl, message) {
    if (!inputEl) return;
    clearError(inputEl);

    // Add error class to input
    inputEl.classList.add('input-error');
    inputEl.classList.remove('input-success');
    inputEl.setAttribute('aria-invalid', 'true');

    // Create error message element
    const errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    errorEl.id = inputEl.id ? inputEl.id + '-error' : 'error-' + Date.now();

    // Link via aria-describedby
    inputEl.setAttribute('aria-describedby', errorEl.id);

    // Insert after the input's parent if it's an input-group, otherwise after input
    const parent = inputEl.closest('.input-group') || inputEl.closest('.file-upload-area');
    if (parent) {
      parent.parentNode.insertBefore(errorEl, parent.nextSibling);
    } else {
      inputEl.parentNode.insertBefore(errorEl, inputEl.nextSibling);
    }
  }

  function clearError(inputEl) {
    if (!inputEl) return;

    inputEl.classList.remove('input-error');
    inputEl.setAttribute('aria-invalid', 'false');

    // Remove existing error message
    const describedBy = inputEl.getAttribute('aria-describedby');
    if (describedBy) {
      const errorEl = document.getElementById(describedBy);
      if (errorEl && errorEl.classList.contains('error-message')) {
        errorEl.remove();
      }
      inputEl.removeAttribute('aria-describedby');
    }

    // Also check for adjacent error messages (fallback)
    const parent = inputEl.closest('.input-group') || inputEl.closest('.file-upload-area');
    const nextEl = parent ? parent.nextElementSibling : inputEl.nextElementSibling;
    if (nextEl && nextEl.classList.contains('error-message')) {
      nextEl.remove();
    }
  }

  function showSuccess(inputEl) {
    if (!inputEl) return;
    clearError(inputEl);
    inputEl.classList.add('input-success');
    inputEl.setAttribute('aria-invalid', 'false');
  }

  /* ------------------------------------------
     Form-level Validation
     ------------------------------------------ */

  /**
   * validateForm — validates all registered fields in a form
   * Each form should have data-validate rules on its inputs,
   * or be handled by a custom config passed to wireForm.
   * Returns true if all fields pass, false otherwise.
   */
  function validateForm(formEl) {
    if (!formEl) return false;

    const fields = formEl.querySelectorAll('[data-validate]');
    let allValid = true;
    let firstInvalid = null;

    fields.forEach((field) => {
      const isValid = validateField(field);
      if (!isValid && !firstInvalid) {
        firstInvalid = field;
      }
      if (!isValid) allValid = false;
    });

    if (!allValid) {
      // Add shake animation
      formEl.classList.add('form-shake');
      setTimeout(() => {
        formEl.classList.remove('form-shake');
      }, 500);

      // Scroll to and focus the first invalid field
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { firstInvalid.focus(); }, 300);
      }
    }

    return allValid;
  }

  /**
   * validateField — validates a single field based on its data-validate attribute
   * data-validate can contain multiple rules separated by |
   * e.g. data-validate="required|email" or data-validate="required|password"
   */
  function validateField(field) {
    const rules = (field.getAttribute('data-validate') || '').split('|');
    const value = field.value;
    let result = { valid: true, message: '' };

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i].trim();
      if (!rule) continue;

      if (rule === 'required') {
        result = validateRequired(value);
      } else if (rule === 'email') {
        result = validateEmail(value);
      } else if (rule === 'password') {
        result = validatePassword(value);
      } else if (rule === 'name') {
        result = validateName(value);
      } else if (rule === 'phone') {
        result = validatePhone(value);
      } else if (rule === 'otp') {
        result = validateOTP(value);
      } else if (rule === 'select') {
        result = validateSelect(value);
      } else if (rule.indexOf('match:') === 0) {
        const matchTargetId = rule.split(':')[1];
        const matchTarget = document.getElementById(matchTargetId);
        const matchValue = matchTarget ? matchTarget.value : '';
        result = validateMatch(value, matchValue, 'Passwords');
      } else if (rule.indexOf('minlength:') === 0) {
        const min = parseInt(rule.split(':')[1], 10);
        result = validateMinLength(value, min);
      } else if (rule.indexOf('maxlength:') === 0) {
        const max = parseInt(rule.split(':')[1], 10);
        result = validateMaxLength(value, max);
      }

      if (!result.valid) break;
    }

    if (result.valid) {
      showSuccess(field);
    } else {
      showError(field, result.message);
    }

    return result.valid;
  }

  /**
   * wireField — attaches blur and input listeners to a field
   */
  function wireField(field) {
    // Validate on blur
    field.addEventListener('blur', () => {
      validateField(field);
    });

    // Clear error on input (real-time correction)
    field.addEventListener('input', () => {
      if (field.classList.contains('input-error')) {
        validateField(field);
      }
    });

    // For selects, listen to change instead
    if (field.tagName === 'SELECT') {
      field.addEventListener('change', () => {
        validateField(field);
      });
    }
  }

  /**
   * wireForm — sets up blur/input/submit validation for an entire form
   */
  function wireForm(formEl) {
    if (!formEl) return;

    const fields = formEl.querySelectorAll('[data-validate]');
    fields.forEach((field) => {
      wireField(field);
    });

    // Submit handler — only if form doesn't already have a data-action
    // (data-action forms handle submit in initAuthState)
    if (!formEl.hasAttribute('data-action')) {
      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(formEl)) {
          // Form is valid — for demo, show a success indication
          // In production, the backend engineer will handle actual submission
          formEl.dispatchEvent(new CustomEvent('validSubmit'));
        }
      });
    }
  }

  // Public API
  return {
    validateRequired: validateRequired,
    validateEmail: validateEmail,
    validatePassword: validatePassword,
    validateMatch: validateMatch,
    validatePhone: validatePhone,
    validateMinLength: validateMinLength,
    validateMaxLength: validateMaxLength,
    validateName: validateName,
    validateSelect: validateSelect,
    validateOTP: validateOTP,
    showError: showError,
    clearError: clearError,
    showSuccess: showSuccess,
    validateForm: validateForm,
    validateField: validateField,
    wireField: wireField,
    wireForm: wireForm
  };

})();

/* ============================================
   VALIDATION INITIALIZATION
   Wires up all forms across the site
   ============================================ */
function initValidation() {

  /* ------------------------------------------
     Auth Modal Forms (present on all pages)
     ------------------------------------------ */

  // Login forms
  document.querySelectorAll('[data-action="login"]').forEach((form) => {
    const emailInput = form.querySelector('#login-email, [type="email"]');
    const passwordInput = form.querySelector('#login-password, [type="password"]');
    if (emailInput) emailInput.setAttribute('data-validate', 'required|email');
    if (passwordInput) passwordInput.setAttribute('data-validate', 'required');
    Validator.wireForm(form);
  });

  // Signup forms
  document.querySelectorAll('[data-action="signup"]').forEach((form) => {
    const nameInput = form.querySelector('#signup-name, [placeholder*="full name"]');
    const emailInput = form.querySelector('#signup-email, [type="email"]');
    const passwordInput = form.querySelector('#signup-password');
    const confirmInput = form.querySelector('#signup-confirm');

    if (nameInput) nameInput.setAttribute('data-validate', 'required|name');
    if (emailInput) emailInput.setAttribute('data-validate', 'required|email');
    if (passwordInput) passwordInput.setAttribute('data-validate', 'required|password');
    if (confirmInput) {
      const pwId = passwordInput ? passwordInput.id : 'signup-password';
      confirmInput.setAttribute('data-validate', 'required|match:' + pwId);
    }
    Validator.wireForm(form);
  });

  // Verify OTP forms (modal)
  document.querySelectorAll('[data-action="verify-otp"]').forEach((form) => {
    const otpInput = form.querySelector('#otp-code, [placeholder*="OTP"]');
    if (otpInput) otpInput.setAttribute('data-validate', 'required|otp');
    Validator.wireForm(form);
  });

  // Forgot Password forms
  document.querySelectorAll('#forgotPasswordModal form').forEach((form) => {
    if (form.hasAttribute('data-action')) return;
    const emailInput = form.querySelector('#forgot-email, [type="email"]');
    if (emailInput) emailInput.setAttribute('data-validate', 'required|email');
    Validator.wireForm(form);
  });

  /* ------------------------------------------
     Standalone OTP Page (verify-otp.html)
     ------------------------------------------ */
  const standaloneOtpForm = document.querySelector('form[action="#"]');
  if (standaloneOtpForm && standaloneOtpForm.querySelector('.otp-input')) {
    const otpField = standaloneOtpForm.querySelector('.otp-input');
    if (otpField) otpField.setAttribute('data-validate', 'required|otp');
    Validator.wireForm(standaloneOtpForm);
  }

  /* ------------------------------------------
     Contact Form (contact.html)
     ------------------------------------------ */
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactSubject = document.getElementById('contactSubject');
  const contactMessage = document.getElementById('contactMessage');

  if (contactName) {
    contactName.setAttribute('data-validate', 'required|name');
    const contactForm = contactName.closest('form');

    if (contactEmail) contactEmail.setAttribute('data-validate', 'required|email');
    if (contactMessage) contactMessage.setAttribute('data-validate', 'required|minlength:10');
    // Subject is optional — no validation needed

    if (contactForm) Validator.wireForm(contactForm);
  }

  /* ------------------------------------------
     Edit Profile — Personal Information
     ------------------------------------------ */
  const personalInfoSection = document.querySelector('.profile-card');
  if (personalInfoSection) {
    const personalForm = personalInfoSection.querySelector('form');
    if (personalForm) {
      const inputs = personalForm.querySelectorAll('input, select');
      inputs.forEach((input) => {
        const type = input.type;
        const placeholder = (input.placeholder || '').toLowerCase();

        if (placeholder.indexOf('fullname') !== -1 || placeholder.indexOf('full name') !== -1) {
          input.setAttribute('data-validate', 'required|name');
        } else if (type === 'email') {
          input.setAttribute('data-validate', 'required|email');
        } else if (type === 'tel') {
          input.setAttribute('data-validate', 'required|phone');
        } else if (placeholder.indexOf('address') !== -1) {
          input.setAttribute('data-validate', 'required');
        } else if (type === 'date') {
          input.setAttribute('data-validate', 'required');
        } else if (input.tagName === 'SELECT') {
          input.setAttribute('data-validate', 'required|select');
        }
      });
      Validator.wireForm(personalForm);
    }
  }

  /* ------------------------------------------
     Edit Profile — Account Verification
     ------------------------------------------ */
  const verifySection = document.querySelector('.profile-card.mt-4');
  if (verifySection) {
    const verifyForms = document.querySelectorAll('.profile-card.mt-4 form');
    verifyForms.forEach(function (form) {
      // Check if this is the verification form (has ID type select)
      const idSelect = form.querySelector('select');
      const fileInput = form.querySelector('input[type="file"]');

      if (idSelect && fileInput) {
        // This is the account verification form
        const formInputs = form.querySelectorAll('input:not([type="file"]), select');
        formInputs.forEach((input) => {
          const placeholder = (input.placeholder || '').toLowerCase();
          if (placeholder.indexOf('fullname') !== -1) {
            input.setAttribute('data-validate', 'required|name');
          } else if (input.type === 'date') {
            input.setAttribute('data-validate', 'required');
          } else if (input.tagName === 'SELECT') {
            input.setAttribute('data-validate', 'required|select');
          }
        });
        Validator.wireForm(form);

        // Custom file validation on submit
        form.addEventListener('validSubmit', () => {
          if (fileInput && !fileInput.files.length) {
            const uploadArea = fileInput.closest('.file-upload-area');
            if (uploadArea) {
              uploadArea.classList.add('input-error');
              // Add error message if not already there
              const existing = uploadArea.parentNode.querySelector('.error-message');
              if (!existing) {
                const msg = document.createElement('span');
                msg.className = 'error-message';
                msg.textContent = 'Please upload your ID document';
                uploadArea.parentNode.insertBefore(msg, uploadArea.nextSibling);
              }
            }
          }
        });
      }
    });
  }

  /* ------------------------------------------
     Edit Profile — Change Password
     ------------------------------------------ */
  const passwordCard = document.querySelector('.password-card');
  if (passwordCard) {
    const passwordForm = passwordCard.querySelector('form');
    if (passwordForm) {
      const pwInputs = passwordForm.querySelectorAll('input[type="password"]');
      if (pwInputs.length === 3) {
        pwInputs[0].setAttribute('data-validate', 'required');
        pwInputs[0].id = pwInputs[0].id || 'current-password';

        pwInputs[1].setAttribute('data-validate', 'required|password');
        pwInputs[1].id = pwInputs[1].id || 'new-password';

        pwInputs[2].setAttribute('data-validate', 'required|match:' + pwInputs[1].id);
        pwInputs[2].id = pwInputs[2].id || 'confirm-new-password';
      }
      Validator.wireForm(passwordForm);
    }
  }

  /* ------------------------------------------
     Help & Support — Feedback Form
     ------------------------------------------ */
  const feedbackTextarea = document.querySelector('.star-rating[data-interactive]');
  if (feedbackTextarea) {
    const feedbackSection = feedbackTextarea.closest('.col-lg-7');
    if (feedbackSection) {
      const textarea = feedbackSection.querySelector('textarea');
      const ratingInput = feedbackSection.querySelector('input[type="hidden"][name="rating"]');
      const sendBtn = feedbackSection.querySelector('.btn-primary');

      if (textarea) textarea.setAttribute('data-validate', 'required|minlength:10');

      // Wire textarea blur/input
      if (textarea) Validator.wireField(textarea);

      // Send feedback button handler
      if (sendBtn) {
        sendBtn.addEventListener('click', (e) => {
          e.preventDefault();
          let allValid = true;

          // Validate textarea
          if (textarea) {
            const result = Validator.validateField(textarea);
            if (!result) allValid = false;
          }

          // Validate star rating
          if (ratingInput && (!ratingInput.value || ratingInput.value === '0')) {
            allValid = false;
            // Show error near stars
            const starContainer = feedbackSection.querySelector('.star-rating');
            const existingError = starContainer.parentNode.querySelector('.star-rating-error');
            if (!existingError) {
              const msg = document.createElement('span');
              msg.className = 'star-rating-error';
              msg.textContent = 'Please select a rating';
              starContainer.parentNode.insertBefore(msg, starContainer.nextSibling);
            }
          } else {
            // Clear star error
            const starError = feedbackSection.querySelector('.star-rating-error');
            if (starError) starError.remove();
          }

          if (!allValid) {
            feedbackSection.classList.add('form-shake');
            setTimeout(() => { feedbackSection.classList.remove('form-shake'); }, 500);
          }
        });
      }
    }
  }

  /* ------------------------------------------
     Cart — Coupon Input
     ------------------------------------------ */
  const promoInput = document.querySelector('.promo-input-group input');
  const promoBtn = document.querySelector('.promo-input-group button');
  if (promoInput && promoBtn) {
    promoBtn.addEventListener('click', () => {
      const value = promoInput.value.trim();
      if (!value) {
        promoInput.classList.add('input-error');
        promoInput.setAttribute('aria-invalid', 'true');
        // Add error message
        const existing = promoInput.parentNode.querySelector('.error-message');
        if (!existing) {
          const msg = document.createElement('span');
          msg.className = 'error-message';
          msg.textContent = 'Please enter a coupon code';
          promoInput.parentNode.appendChild(msg);
        }
      } else {
        promoInput.classList.remove('input-error');
        promoInput.setAttribute('aria-invalid', 'false');
        const err = promoInput.parentNode.querySelector('.error-message');
        if (err) err.remove();
      }
    });

    promoInput.addEventListener('input', () => {
      if (promoInput.classList.contains('input-error') && promoInput.value.trim()) {
        promoInput.classList.remove('input-error');
        promoInput.setAttribute('aria-invalid', 'false');
        const err = promoInput.parentNode.querySelector('.error-message');
        if (err) err.remove();
      }
    });
  }

  /* ------------------------------------------
     Checkout — Billing Form
     ------------------------------------------ */
  const billingForm = document.querySelector('.billing-form');
  if (billingForm) {
    billingForm.addEventListener('submit', (e) => {
      const paymentSelected = billingForm.querySelector('input[name="payment"]:checked');
      if (!paymentSelected) {
        e.preventDefault();
        const paymentMethods = billingForm.querySelector('.payment-methods');
        if (paymentMethods) {
          paymentMethods.classList.add('input-error');
          const existing = paymentMethods.parentNode.querySelector('.error-message');
          if (!existing) {
            const msg = document.createElement('span');
            msg.className = 'error-message';
            msg.textContent = 'Please select a payment method';
            paymentMethods.parentNode.insertBefore(msg, paymentMethods.nextSibling);
          }
        }
        billingForm.classList.add('form-shake');
        setTimeout(() => { billingForm.classList.remove('form-shake'); }, 500);
      }
    });

    // Clear payment error when a radio is selected
    billingForm.querySelectorAll('input[name="payment"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        const paymentMethods = billingForm.querySelector('.payment-methods');
        if (paymentMethods) {
          paymentMethods.classList.remove('input-error');
          const err = paymentMethods.parentNode.querySelector('.error-message');
          if (err) err.remove();
        }
      });
    });
  }

  /* ------------------------------------------
     Newsletter — Footer (all pages)
     ------------------------------------------ */
  document.querySelectorAll('.footer-newsletter').forEach((container) => {
    const emailInput = container.querySelector('input[type="email"]');
    const subscribeBtn = container.querySelector('button');
    if (!emailInput || !subscribeBtn) return;

    subscribeBtn.addEventListener('click', () => {
      const result = Validator.validateEmail(emailInput.value);
      if (!result.valid) {
        emailInput.classList.add('input-error');
        emailInput.setAttribute('aria-invalid', 'true');
        const existing = container.querySelector('.error-message');
        if (!existing) {
          const msg = document.createElement('span');
          msg.className = 'error-message';
          msg.textContent = result.message;
          container.appendChild(msg);
        }
      } else {
        emailInput.classList.remove('input-error');
        emailInput.classList.add('input-success');
        emailInput.setAttribute('aria-invalid', 'false');
        const err = container.querySelector('.error-message');
        if (err) err.remove();
      }
    });

    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('input-error')) {
        const result = Validator.validateEmail(emailInput.value);
        if (result.valid) {
          emailInput.classList.remove('input-error');
          emailInput.classList.add('input-success');
          emailInput.setAttribute('aria-invalid', 'false');
          const err = container.querySelector('.error-message');
          if (err) err.remove();
        }
      }
    });
  });

  /* ------------------------------------------
     Career Path Select (edit-profile.html)
     ------------------------------------------ */
  const careerSelect = document.querySelector('.profile-card.mt-4 > div > select.form-select');
  if (careerSelect && !careerSelect.hasAttribute('data-validate')) {
    // Career path is optional — no validation needed
  }

  /* ------------------------------------------
     Current Learning Paths - Mobile Carousel Dots
     ------------------------------------------ */
  const lpCurrentList = document.querySelector('.lp-current-list');
  const lpCurrentDots = document.querySelectorAll('.lp-current-dot');

  if (lpCurrentList && lpCurrentDots.length) {
    lpCurrentList.addEventListener('scroll', () => {
      const cards = lpCurrentList.querySelectorAll('.lp-current-card');
      const scrollLeft = lpCurrentList.scrollLeft;
      const maxScroll = lpCurrentList.scrollWidth - lpCurrentList.clientWidth;
      const cardWidth = cards[0].offsetWidth + 16;
      let activeIndex;

      if (maxScroll - scrollLeft < 10) {
        activeIndex = cards.length - 1;
      } else {
        activeIndex = Math.round(scrollLeft / cardWidth);
      }

      lpCurrentDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    });

    lpCurrentDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const cards = lpCurrentList.querySelectorAll('.lp-current-card');
        const cardWidth = cards[0].offsetWidth + 16;
        lpCurrentList.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
      });
    });
  }
}

/* ============================================
   My Courses — Tabs + Touch Carousel
   ============================================ */
function initMyCourses() {
  const tabs = document.querySelectorAll('.mc-tab');
  const contents = document.querySelectorAll('.mc-tab-content');

  if (!tabs.length) return;

  /* -- Tab switching -- */
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach((t) => { t.classList.remove('active'); });
      contents.forEach((c) => { c.classList.remove('active'); });

      tab.classList.add('active');
      const panel = document.querySelector('[data-tab-content="' + target + '"]');
      if (panel) panel.classList.add('active');

      /* Re-init carousels in newly visible tab */
      if (panel) {
        const carousels = panel.querySelectorAll('.mc-carousel');
        carousels.forEach((carousel) => {
          initMcCarousel(carousel);
        });
      }
    });
  });

  /* -- Init carousels in the default active tab -- */
  const activePanel = document.querySelector('.mc-tab-content.active');
  if (activePanel) {
    const carousels = activePanel.querySelectorAll('.mc-carousel');
    carousels.forEach((carousel) => {
      initMcCarousel(carousel);
    });
  }
}

function initMcCarousel(carousel) {
  const track = carousel.querySelector('.mc-carousel-track');
  const dotsContainer = carousel.querySelector('.mc-carousel-dots');

  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.mc-carousel-card');
  if (!cards.length) return;

  /* Build dots */
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'mc-carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.mc-carousel-dot');

  /* Update active dot on scroll */
  track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 16;
    const activeIndex = Math.round(scrollLeft / cardWidth);

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === activeIndex);
    });
  });

  /* Dot click scrolls to card */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 16;
      track.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    });
  });

  /* Touch swipe support */
  let startX = 0;
  let startScroll = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    startScroll = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].pageX;
    track.scrollLeft = startScroll + diff;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isDragging = false;
    /* Snap to nearest card */
    const cardWidth = cards[0].offsetWidth + 16;
    const index = Math.round(track.scrollLeft / cardWidth);
    track.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  });
}

/* ============================================
   Recent Blog Posts — Touch Carousel
   ============================================ */
function initBlogCarousel() {
  const carousel = document.querySelector('.rbp-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.rbp-carousel-track');
  const dotsContainer = carousel.querySelector('.rbp-carousel-dots');
  if (!track || !dotsContainer) return;

  const items = track.querySelectorAll('.rbp-item');
  if (!items.length) return;

  /* Build dots */
  dotsContainer.innerHTML = '';
  items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'rbp-carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.rbp-carousel-dot');

  /* Update active dot on scroll */
  track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    const cardWidth = items[0].offsetWidth + 16;
    const activeIndex = Math.round(scrollLeft / cardWidth);
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === activeIndex);
    });
  });

  /* Dot click */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const cardWidth = items[0].offsetWidth + 16;
      track.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    });
  });

  /* Touch swipe */
  let startX = 0;
  let startScroll = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    startScroll = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].pageX;
    track.scrollLeft = startScroll + diff;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isDragging = false;
    const cardWidth = items[0].offsetWidth + 16;
    const index = Math.round(track.scrollLeft / cardWidth);
    track.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  });
}

/* ============================================
   Purchase Summary Toggles (Mobile)
   ============================================ */
function initPurchaseSummaryToggles() {
  const toggles = document.querySelectorAll('.purchase-summary-toggle');
  if (!toggles.length) return;

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        content.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        content.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ============================================
   Help & Support — FAQ section
   ============================================ */
function initHelpSupportFaq() {
  // Tabs — switch Learners / Course Creator panels
  const tabButtons = document.querySelectorAll('.hs-faq-tab');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.getAttribute('data-tab');
      tabButtons.forEach((b) => { b.classList.remove('active'); });
      btn.classList.add('active');

      document.querySelectorAll('.hs-faq-panel-nav').forEach((nav) => {
        nav.classList.toggle('active', nav.getAttribute('data-panel') === panel);
      });
      document.querySelectorAll('.hs-faq-panel-content').forEach((content) => {
        content.classList.toggle('active', content.getAttribute('data-panel') === panel);
      });

      // Reset the active panel back to its first sidebar item + first accordion group
      const activeNav = document.querySelector('.hs-faq-panel-nav.active');
      if (activeNav) {
        const navItems = activeNav.querySelectorAll('.hs-faq-sidebar-item');
        navItems.forEach((i) => { i.classList.remove('active'); });
        if (navItems.length) navItems[0].classList.add('active');
      }
      const activeContent = document.querySelector('.hs-faq-panel-content.active');
      if (activeContent) {
        const groups = activeContent.querySelectorAll('.hs-faq-accordion-group');
        groups.forEach((g) => { g.classList.remove('active'); });
        if (groups.length) groups[0].classList.add('active');
      }

      // Collapse any open accordion items when switching tabs
      document.querySelectorAll('.hs-faq-accordion-group .accordion-item.active').forEach((ai) => {
        ai.classList.remove('active');
      });

      // Close mobile sidebar dropdown
      document.querySelectorAll('.hs-faq-sidebar.open').forEach((s) => {
        s.classList.remove('open');
      });
      const toggle = document.querySelector('.hs-faq-sidebar-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Sidebar items (active state)
  const sidebarItems = document.querySelectorAll('.hs-faq-sidebar-item');
  sidebarItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarItems.forEach((i) => { i.classList.remove('active'); });
      item.classList.add('active');

      const toggleLabel = document.querySelector('.hs-faq-sidebar-toggle span');
      if (toggleLabel) {
        toggleLabel.textContent = item.textContent.trim();
      }

      // Auto-close dropdown on mobile after selection
      const activeSidebar = document.querySelector('.hs-faq-panel-nav.active');
      const toggle = document.querySelector('.hs-faq-sidebar-toggle');
      if (activeSidebar && toggle && window.innerWidth < 768) {
        activeSidebar.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Mobile sidebar dropdown toggle — targets the currently visible panel nav
  const sidebarToggle = document.querySelector('.hs-faq-sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      const activeNav = document.querySelector('.hs-faq-panel-nav.active');
      if (!activeNav) return;
      const isOpen = sidebarToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        activeNav.classList.remove('open');
        sidebarToggle.setAttribute('aria-expanded', 'false');
      } else {
        activeNav.classList.add('open');
        sidebarToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }
}

/* ============================================
   Achievements Carousel (mobile only)
   ============================================ */
function initAchievementsCarousel() {
  const carousels = document.querySelectorAll('[data-achievements-carousel]');
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.profile-achievements-track');
    const dotsContainer = carousel.querySelector('.profile-achievements-dots');
    const cards = track ? track.querySelectorAll('.profile-achievement-card') : [];
    if (!track || !dotsContainer || !cards.length) return;

    // Build dot indicators
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'profile-achievement-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => {
        const card = cards[i];
        if (!card) return;
        track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.profile-achievement-dot');

    let scrollTimer = null;
    track.addEventListener('scroll', () => {
      if (scrollTimer) window.cancelAnimationFrame(scrollTimer);
      scrollTimer = window.requestAnimationFrame(() => {
        const trackLeft = track.scrollLeft;
        let nearestIndex = 0;
        let nearestDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.offsetLeft - track.offsetLeft - trackLeft);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestIndex = i;
          }
        });
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === nearestIndex);
        });
      });
    });
  });
}

/* ============================================
   User Profile — Current Courses Carousel
   ============================================ */
function initUserProfileCurrentCourses() {
  const section = document.querySelector('.up-cc-section');
  if (!section) return;

  /* -- Desktop arrow carousel -- */
  const track = section.querySelector('.up-cc-track');
  const prevBtn = section.querySelector('.up-cc-arrow-prev');
  const nextBtn = section.querySelector('.up-cc-arrow-next');

  if (track && prevBtn && nextBtn) {
    function getStep() {
      const card = track.querySelector('.mc-card');
      if (!card) return track.clientWidth;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      return card.offsetWidth + gap;
    }

    function updateArrows() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 1;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 1;
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();
  }

  /* -- Mobile mc-carousel (reuse existing init) -- */
  const mobileCarousel = section.querySelector('.up-cc-mobile-carousel');
  if (mobileCarousel && typeof initMcCarousel === 'function') {
    initMcCarousel(mobileCarousel);
  }
}

/* ============================================
   Edit Details Modal (edit-profile.html)
   ============================================ */
/* ============================================
   Avatar Upload Preview (edit-profile.html)
   ============================================ */
function initAvatarUpload() {
  const input = document.getElementById('avatar-upload');
  if (!input) return;

  const img = input.closest('.profile-avatar-upload').querySelector('img');
  const hintEl = input.closest('.profile-avatar-card').querySelector('.profile-avatar-size-hint');
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      hintEl.textContent = 'File exceeds 2MB. Please choose a smaller image.';
      hintEl.classList.add('upload-error');
      input.value = '';
      return;
    }

    hintEl.textContent = 'Maximum Size: 2MB';
    hintEl.classList.remove('upload-error');

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function initVerifyIdUpload() {
  const input = document.getElementById('verify-id-file');
  if (!input) return;

  const circle = input.closest('.verify-id-upload').querySelector('.verify-id-upload-circle');
  const preview = circle.querySelector('.verify-id-preview');
  const hintEl = input.closest('.verify-id-upload').querySelector('.verify-id-size-hint');
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      hintEl.textContent = 'File exceeds 2MB. Please choose a smaller image.';
      hintEl.classList.add('upload-error');
      input.value = '';
      return;
    }

    hintEl.textContent = 'Maximum Size: 2MB';
    hintEl.classList.remove('upload-error');

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      circle.classList.add('has-preview');
    };
    reader.readAsDataURL(file);
  });
}

function initEditDetailsModal() {
  const editBtn = document.querySelector('.profile-edit-btn');
  const overlay = document.getElementById('editDetailsModal');

  if (!editBtn || !overlay) return;

  const modal = overlay.querySelector('.edit-details-modal');
  const closeBtn = overlay.querySelector('.edit-details-close');

  // Field mappings: profile form → modal form
  const FIELD_MAP = [
    { source: 'profile-fullname', target: 'edit-fullname' },
    { source: 'profile-email', target: 'edit-email' },
    { source: 'profile-phone', target: 'edit-phone' },
    { source: 'profile-address', target: 'edit-address' },
    { source: 'profile-dob', target: 'edit-dob' },
    { source: 'profile-gender', target: 'edit-gender' }
  ];

  const openModal = () => {
    // Sync values from profile form into modal
    FIELD_MAP.forEach(({ source, target }) => {
      const sourceEl = document.getElementById(source);
      const targetEl = document.getElementById(target);
      if (sourceEl && targetEl) {
        targetEl.value = sourceEl.value;
      }
    });
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Save changes back to profile form
  const form = document.getElementById('edit-details-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      FIELD_MAP.forEach(({ source, target }) => {
        const sourceEl = document.getElementById(source);
        const targetEl = document.getElementById(target);
        if (sourceEl && targetEl) {
          sourceEl.value = targetEl.value;
        }
      });
      closeModal();
    });
  }
}

/* ============================================
   Career Path Select (edit-profile.html)
   ============================================ */
function initCareerPath() {
  const hiddenInput = document.getElementById('career-select');
  const tagWrap = document.querySelector('.career-tag-wrap');
  const selectedText = document.querySelector('.career-selected-text');
  const dropdown = document.querySelector('.career-select-wrap [data-id-type-dropdown]');

  if (!hiddenInput || !tagWrap || !selectedText || !dropdown) return;

  const options = dropdown.querySelectorAll('.id-type-dropdown-options li');
  const valueSpan = dropdown.querySelector('.id-type-dropdown-value');

  const updateDisplay = (value, label) => {
    if (value) {
      tagWrap.innerHTML = `<span class="career-tag">
        <button type="button" class="career-tag-remove" aria-label="Remove ${label}"><i class="bi bi-x-lg"></i></button>
        ${label}
      </span>`;
      selectedText.innerHTML = `Selected career: <strong>${label}</strong>`;
      tagWrap.style.display = '';
      selectedText.style.display = '';
      // Reset dropdown display
      valueSpan.textContent = 'Select career choice';
      valueSpan.classList.add('is-placeholder');
      options.forEach((o) => o.classList.remove('selected'));
      attachRemoveHandler();
    } else {
      tagWrap.style.display = 'none';
      selectedText.style.display = 'none';
    }
  };

  const attachRemoveHandler = () => {
    const removeBtn = tagWrap.querySelector('.career-tag-remove');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        hiddenInput.value = '';
        tagWrap.style.display = 'none';
        selectedText.style.display = 'none';
        valueSpan.textContent = 'Select career choice';
        valueSpan.classList.add('is-placeholder');
      });
    }
  };

  // Listen for option clicks within the career dropdown
  options.forEach((option) => {
    option.addEventListener('click', () => {
      const value = option.getAttribute('data-value');
      const label = option.textContent;
      hiddenInput.value = value;
      updateDisplay(value, label);
    });
  });

  attachRemoveHandler();
}

/* ============================================
   Custom Select Dropdowns
   ============================================ */
function initIdTypeDropdown() {
  const selects = document.querySelectorAll('[data-id-type-dropdown]');

  selects.forEach((wrapper) => {
    const trigger = wrapper.querySelector('.id-type-dropdown-trigger');
    const valueSpan = wrapper.querySelector('.id-type-dropdown-value');
    const options = wrapper.querySelectorAll('.id-type-dropdown-options li');
    const hiddenInput = wrapper.parentElement.querySelector('input[type="hidden"]');

    if (!trigger || !valueSpan || !options.length) return;

    valueSpan.classList.add('is-placeholder');

    trigger.addEventListener('click', () => {
      // Close all other custom selects
      document.querySelectorAll('[data-id-type-dropdown].open').forEach((other) => {
        if (other !== wrapper) other.classList.remove('open');
      });
      wrapper.classList.toggle('open');
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        const label = option.textContent;

        valueSpan.textContent = label;
        valueSpan.classList.remove('is-placeholder');
        if (hiddenInput) hiddenInput.value = value;

        options.forEach((o) => o.classList.remove('selected'));
        option.classList.add('selected');

        wrapper.classList.remove('open');
      });
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-id-type-dropdown]')) {
      document.querySelectorAll('[data-id-type-dropdown].open').forEach((s) => {
        s.classList.remove('open');
      });
    }
  });
}

/* ============================================
   Date of Birth Picker (edit-profile.html)
   ============================================ */
function initDobPicker() {
  const pickers = document.querySelectorAll('[data-dob-picker]');
  if (!pickers.length) return;

  const MONTHS = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' },
    { value: '05', label: 'May' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' }
  ];

  pickers.forEach((picker) => {
    const trigger = picker.querySelector('.dob-picker-trigger');
    const valueSpan = picker.querySelector('.dob-picker-value');
    const hiddenInput = picker.parentElement.querySelector('input[type="hidden"]');
    const dayList = picker.querySelector('[data-dob-day]');
    const monthList = picker.querySelector('[data-dob-month]');
    const yearList = picker.querySelector('[data-dob-year]');
    const doneBtn = picker.querySelector('.dob-picker-done');

    let selectedDay = '';
    let selectedMonth = '';
    let selectedYear = '';

    // Populate days
    for (let d = 1; d <= 31; d++) {
      const li = document.createElement('li');
      li.dataset.value = String(d).padStart(2, '0');
      li.textContent = d;
      dayList.appendChild(li);
    }

    // Populate months
    MONTHS.forEach((m) => {
      const li = document.createElement('li');
      li.dataset.value = m.value;
      li.textContent = m.label;
      monthList.appendChild(li);
    });

    // Populate years
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1930; y--) {
      const li = document.createElement('li');
      li.dataset.value = String(y);
      li.textContent = y;
      yearList.appendChild(li);
    }

    // Pre-select from existing hidden input value (YYYY-MM-DD)
    if (hiddenInput && hiddenInput.value) {
      const parts = hiddenInput.value.split('-');
      if (parts.length === 3) {
        selectedYear = parts[0];
        selectedMonth = parts[1];
        selectedDay = parts[2];

        dayList.querySelectorAll('li').forEach((li) => {
          if (li.dataset.value === selectedDay) li.classList.add('selected');
        });
        monthList.querySelectorAll('li').forEach((li) => {
          if (li.dataset.value === selectedMonth) li.classList.add('selected');
        });
        yearList.querySelectorAll('li').forEach((li) => {
          if (li.dataset.value === selectedYear) li.classList.add('selected');
        });
      }
    }

    // Click handler for list items
    const wireList = (list, onSelect) => {
      list.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        list.querySelectorAll('li').forEach((item) => item.classList.remove('selected'));
        li.classList.add('selected');
        onSelect(li.dataset.value);
      });
    };

    wireList(dayList, (val) => { selectedDay = val; });
    wireList(monthList, (val) => {
      selectedMonth = val;
      updateDays();
    });
    wireList(yearList, (val) => {
      selectedYear = val;
      updateDays();
    });

    // Update valid days based on month/year
    const updateDays = () => {
      const month = parseInt(selectedMonth, 10);
      const year = parseInt(selectedYear, 10);
      if (month && year) {
        const daysInMonth = new Date(year, month, 0).getDate();
        dayList.querySelectorAll('li').forEach((li) => {
          const dayNum = parseInt(li.dataset.value, 10);
          li.style.display = dayNum > daysInMonth ? 'none' : '';
        });
        if (parseInt(selectedDay, 10) > daysInMonth) {
          selectedDay = '';
          dayList.querySelectorAll('li').forEach((li) => li.classList.remove('selected'));
        }
      }
    };

    // Toggle panel
    trigger.addEventListener('click', () => {
      // Close all other pickers
      pickers.forEach((other) => {
        if (other !== picker) other.classList.remove('open');
      });
      picker.classList.toggle('open');
    });

    // Done button
    doneBtn.addEventListener('click', () => {
      if (selectedDay && selectedMonth && selectedYear) {
        const monthLabel = MONTHS.find((m) => m.value === selectedMonth).label;
        const formatted = `${selectedDay}-${monthLabel}-${selectedYear}`;
        valueSpan.textContent = formatted;
        valueSpan.classList.remove('is-placeholder');
        if (hiddenInput) hiddenInput.value = `${selectedYear}-${selectedMonth}-${selectedDay}`;
      }
      picker.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dob-picker]')) {
      pickers.forEach((p) => p.classList.remove('open'));
    }
  });
}

/* ============================================
   Video Preview Modal
   ============================================ */
function initVideoModal() {
  const overlay = document.getElementById('video-modal');
  if (!overlay) return;

  const video = document.getElementById('video-modal-player');
  const titleEl = overlay.querySelector('.video-modal-title');
  const closeBtn = overlay.querySelector('.video-modal-close');
  const playBtns = document.querySelectorAll('[data-video-src]');
  const thumbnail = document.getElementById('video-modal-thumbnail');
  const pauseOverlay = document.getElementById('video-modal-pause-overlay');

  if (!playBtns.length) return;

  let activePlayBtn = null;

  const showThumbnail = () => {
    if (thumbnail) thumbnail.classList.remove('hidden');
    if (pauseOverlay) pauseOverlay.classList.remove('visible');
  };

  const openModal = (src, title, btn) => {
    video.src = src;
    titleEl.textContent = title;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    activePlayBtn = btn;
    if (thumbnail) thumbnail.classList.add('hidden');
    if (pauseOverlay) pauseOverlay.classList.remove('visible');
    video.play();
  };

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    video.pause();
    video.currentTime = 0;
    video.removeAttribute('src');
    video.load();
    showThumbnail();
    if (activePlayBtn) {
      activePlayBtn = null;
    }
  };

  if (thumbnail) {
    thumbnail.addEventListener('click', () => {
      thumbnail.classList.add('hidden');
      video.play();
    });
  }

  if (pauseOverlay) {
    pauseOverlay.addEventListener('click', () => {
      video.play();
    });
  }

  video.addEventListener('pause', () => {
    if (!video.ended) pauseOverlay.classList.add('visible');
  });

  video.addEventListener('play', () => {
    pauseOverlay.classList.remove('visible');
  });

  playBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-video-src');
      const courseTitle = document.querySelector('.course-details-header h1');
      const title = courseTitle ? courseTitle.textContent : '';
      openModal(src, title, btn);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ============================================
   Course Player
   ============================================ */
function initCoursePlayer() {
  const playerPage = document.querySelector('.course-player-page');
  if (!playerPage) return;

  /* Clone sidebar modules into mobile Course Content tab */
  const mobileContentTab = document.getElementById('tab-mobile-course-content');
  const sidebarModules = document.querySelector('.course-sidebar-modules');

  if (mobileContentTab && sidebarModules) {
    const clone = sidebarModules.cloneNode(true);
    clone.classList.add('mobile-modules-wrap');
    const deadlinesInfo = mobileContentTab.querySelector('.course-info-sidebar');
    mobileContentTab.insertBefore(clone, deadlinesInfo || null);

    /* Wire up module accordion on cloned elements */
    clone.querySelectorAll('.module-header').forEach((header) => {
      header.addEventListener('click', () => {
        const moduleItem = header.closest('.module-item');
        moduleItem.classList.toggle('active');
      });
    });
  }

  /* Course Material header toggle */
  const sidebarToggleBtn = document.querySelector('.course-sidebar-toggle');
  if (sidebarToggleBtn && sidebarModules) {
    sidebarToggleBtn.addEventListener('click', () => {
      const isCollapsed = sidebarModules.classList.toggle('collapsed');
      const icon = sidebarToggleBtn.querySelector('i');
      icon.classList.toggle('bi-chevron-down', !isCollapsed);
      icon.classList.toggle('bi-chevron-up', isCollapsed);
      sidebarToggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
    });
  }

  /* Mirror lecture note content into mobile tab */
  const desktopLectureNote = document.getElementById('tab-lecture-note');
  const mobileLectureNote = document.getElementById('tab-mobile-lecture-note');

  if (desktopLectureNote && mobileLectureNote) {
    mobileLectureNote.innerHTML = desktopLectureNote.innerHTML;

    /* Re-wire file upload in cloned content */
    mobileLectureNote.querySelectorAll('.file-upload-btn input[type="file"]').forEach((input) => {
      input.addEventListener('change', (e) => {
        const fileName = e.target.files[0]?.name;
        if (fileName) {
          const label = input.closest('.file-upload-btn');
          label.textContent = fileName;
          label.appendChild(input);
        }
      });
    });
  }

  /* Mirror discussion content into mobile tab */
  const desktopDiscussion = document.getElementById('tab-discussion');
  const mobileDiscussion = document.getElementById('tab-mobile-discussion');

  if (desktopDiscussion && mobileDiscussion) {
    mobileDiscussion.innerHTML = desktopDiscussion.innerHTML;
  }

  /* Mirror achievements content into mobile tab */
  const desktopAchievements = document.getElementById('tab-achievements');
  const mobileAchievements = document.getElementById('tab-mobile-achievements');

  if (desktopAchievements && mobileAchievements) {
    mobileAchievements.innerHTML = desktopAchievements.innerHTML;
  }

  /* Tabs are handled by the generic initTabs() via data-tabs attributes */

  /* File upload display name */
  document.querySelectorAll('.file-upload-btn input[type="file"]').forEach((input) => {
    input.addEventListener('change', (e) => {
      const fileName = e.target.files[0]?.name;
      if (fileName) {
        const label = input.closest('.file-upload-btn');
        label.textContent = fileName;
        label.appendChild(input);
      }
    });
  });
}

/* ============================================
   Course Player — Assignment Page
   ============================================ */
function initAssignmentPage() {
  const assignmentOverview = document.querySelector('.assignment-overview');
  if (!assignmentOverview) return;

  /* Clone assignment overview content into mobile Assignment tab */
  const mobileAssignmentTab = document.getElementById('tab-mobile-assignment-main');

  if (mobileAssignmentTab) {
    const clone = assignmentOverview.cloneNode(true);
    mobileAssignmentTab.appendChild(clone);
  }

  /* Wire up module accordion on mobile sidebar modules */
  const mobileSidebarTab = document.getElementById('tab-mobile-assignment-sidebar');

  if (mobileSidebarTab) {
    mobileSidebarTab.querySelectorAll('.module-header').forEach((header) => {
      header.addEventListener('click', () => {
        const moduleItem = header.closest('.module-item');
        moduleItem.classList.toggle('active');
      });
    });
  }
}

/* ============================================
   Assignment Grades Accordion
   ============================================ */
function initAssignGradesAccordion() {
  const section = document.querySelector('.assign-grades-section');
  if (!section) return;

  section.addEventListener('click', (e) => {
    const header = e.target.closest('[data-toggle="assign-grade-expand"]');
    if (!header) return;

    /* Ignore clicks on the download button */
    if (e.target.closest('.assign-grades-download')) return;

    const card = header.closest('.assign-grades-card');
    const isActive = card.classList.contains('active');

    /* Close all cards */
    section.querySelectorAll('.assign-grades-card.active').forEach((c) => {
      c.classList.remove('active');
    });

    /* Toggle clicked card if it wasn't already open */
    if (!isActive) {
      card.classList.add('active');
    }
  });
}

/* ============================================
   NNPC Tech — Top-Level Page Tabs
   ============================================ */
function initNnpcPageTabs() {
  const tabs = document.querySelectorAll('.nnpc-page-tab');
  const panels = document.querySelectorAll('.nnpc-panel');

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const target = tab.getAttribute('data-nnpc-tab');

      tabs.forEach((t) => { t.classList.remove('active'); });
      panels.forEach((p) => { p.classList.remove('active'); });

      tab.classList.add('active');
      const panel = document.querySelector('[data-nnpc-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });
}

/* ============================================
   Course Video Thumbnail Player
   ============================================ */
function initVideoThumbnailPlayer() {
  const thumbnail = document.getElementById('video-thumbnail');
  const video = document.getElementById('course-video');
  const playBtn = document.getElementById('video-play-btn');
  const pauseOverlay = document.getElementById('video-pause-overlay');

  if (!thumbnail || !video || !playBtn || !pauseOverlay) return;

  const startVideo = () => {
    thumbnail.classList.add('hidden');
    video.classList.add('visible');
    video.play();
  };

  thumbnail.addEventListener('click', startVideo);

  video.addEventListener('pause', () => {
    if (!video.ended) pauseOverlay.classList.add('visible');
  });

  video.addEventListener('play', () => {
    pauseOverlay.classList.remove('visible');
  });

  pauseOverlay.addEventListener('click', () => {
    video.play();
  });
}

/* ============================================
   Custom Video Controls
   ============================================ */
function initCustomVideoControls() {
  const video = document.querySelector('[data-video="player"]');
  if (!video) return;

  const playBtn       = document.querySelector('[data-video-control="play"]');
  const rewindBtn     = document.querySelector('[data-video-control="rewind"]');
  const forwardBtn    = document.querySelector('[data-video-control="forward"]');
  const volumeBtn     = document.querySelector('[data-video-control="volume"]');
  const timeDisplay   = document.querySelector('[data-video-time]');
  const captionsBtn   = document.querySelector('[data-video-control="captions"]');
  const speedBtn      = document.querySelector('[data-video-control="speed"]');
  const speedMenu     = document.querySelector('[data-video-speed-menu]');
  const speedWrapper  = document.querySelector('[data-video-speed-wrapper]');
  const fullscreenBtn  = document.querySelector('[data-video-control="fullscreen"]');
  const settingsBtn    = document.querySelector('[data-video-control="settings"]');
  const settingsMenu   = document.querySelector('[data-video-settings-menu]');
  const settingsWrapper = document.querySelector('[data-video-settings-wrapper]');
  const loopIndicator  = document.querySelector('[data-video-loop-indicator]');
  const scrubberTrack = document.querySelector('[data-video-scrubber-track]');
  const scrubberFill  = document.querySelector('[data-video-scrubber-fill]');
  const scrubberThumb = document.querySelector('[data-video-scrubber-thumb]');
  const videoPlayer   = document.getElementById('course-video-player');

  if (!playBtn) return;

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const syncPlayIcon = () => {
    const icon = playBtn.querySelector('i');
    if (!icon) return;
    if (video.paused || video.ended) {
      icon.className = 'bi bi-play-fill';
      playBtn.setAttribute('aria-label', 'Play');
    } else {
      icon.className = 'bi bi-pause-fill';
      playBtn.setAttribute('aria-label', 'Pause');
    }
  };

  const updateScrubber = () => {
    if (!scrubberFill || !scrubberThumb || !video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    scrubberFill.style.width = `${pct}%`;
    scrubberThumb.style.left = `${pct}%`;
  };

  const updateTimeDisplay = () => {
    if (!timeDisplay) return;
    timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  };

  // All state driven from video events — keeps sync with initVideoThumbnailPlayer automatic
  video.addEventListener('play',  syncPlayIcon);
  video.addEventListener('pause', syncPlayIcon);
  video.addEventListener('ended', syncPlayIcon);

  // Click on video to toggle play/pause
  video.addEventListener('click', () => {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener('timeupdate', () => {
    updateScrubber();
    updateTimeDisplay();
  });

  video.addEventListener('loadedmetadata', updateTimeDisplay);

  document.addEventListener('fullscreenchange', () => {
    const icon = fullscreenBtn && fullscreenBtn.querySelector('i');
    if (!icon) return;
    if (document.fullscreenElement) {
      icon.className = 'bi bi-fullscreen-exit';
      fullscreenBtn.setAttribute('aria-label', 'Exit fullscreen');
    } else {
      icon.className = 'bi bi-fullscreen';
      fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen');
    }
  });

  // Play / Pause
  playBtn.addEventListener('click', () => {
    if (video.paused || video.ended) {
      const thumbnail = document.getElementById('video-thumbnail');
      if (thumbnail && !thumbnail.classList.contains('hidden')) {
        thumbnail.classList.add('hidden');
        video.classList.add('visible');
      }
      video.play();
    } else {
      video.pause();
    }
  });

  // Rewind 10s
  rewindBtn && rewindBtn.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
  });

  // Forward 10s
  forwardBtn && forwardBtn.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
  });

  // Volume toggle
  volumeBtn && volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    const icon = volumeBtn.querySelector('i');
    if (!icon) return;
    icon.className = video.muted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill';
    volumeBtn.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
  });

  // Speed dropdown toggle
  speedBtn && speedBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = speedMenu.classList.toggle('open');
    speedBtn.setAttribute('aria-expanded', String(isOpen));
  });

  speedMenu && speedMenu.querySelectorAll('[data-speed]').forEach((btn) => {
    btn.addEventListener('click', () => {
      video.playbackRate = parseFloat(btn.dataset.speed);
      speedMenu.querySelectorAll('[data-speed]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      speedMenu.classList.remove('open');
      speedBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (speedWrapper && !speedWrapper.contains(e.target)) {
      speedMenu && speedMenu.classList.remove('open');
      speedBtn && speedBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Captions toggle
  captionsBtn && captionsBtn.addEventListener('click', () => {
    const tracks = video.textTracks;
    if (!tracks || tracks.length === 0) return;
    const track = tracks[0];
    const icon = captionsBtn.querySelector('i');
    if (track.mode === 'showing') {
      track.mode = 'hidden';
      if (icon) icon.className = 'bi bi-eye-slash';
      captionsBtn.setAttribute('aria-label', 'Show captions');
    } else {
      track.mode = 'showing';
      if (icon) icon.className = 'bi bi-eye';
      captionsBtn.setAttribute('aria-label', 'Hide captions');
    }
  });

  // Settings dropdown toggle
  settingsBtn && settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = settingsMenu.classList.toggle('open');
    settingsBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Loop toggle
  const loopBtn = settingsMenu && settingsMenu.querySelector('[data-video-setting="loop"]');
  loopBtn && loopBtn.addEventListener('click', () => {
    video.loop = !video.loop;
    if (loopIndicator) {
      loopIndicator.textContent = video.loop ? 'On' : 'Off';
      loopIndicator.classList.toggle('on', video.loop);
    }
  });

  // Close settings menu on outside click
  document.addEventListener('click', (e) => {
    if (settingsWrapper && !settingsWrapper.contains(e.target)) {
      settingsMenu && settingsMenu.classList.remove('open');
      settingsBtn && settingsBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Fullscreen — on the container so custom controls stay in view
  fullscreenBtn && fullscreenBtn.addEventListener('click', () => {
    const container = videoPlayer || video.closest('.video-player');
    if (!document.fullscreenElement) {
      container && container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Scrubber — drag supported across mouse and touch
  let isScrubbing = false;

  const scrubToPosition = (e) => {
    if (!video.duration) return;
    const rect = scrubberTrack.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    video.currentTime = pct * video.duration;
    updateScrubber();
    updateTimeDisplay();
  };

  scrubberTrack && scrubberTrack.addEventListener('mousedown', (e) => {
    isScrubbing = true;
    scrubToPosition(e);
  });

  scrubberTrack && scrubberTrack.addEventListener('touchstart', (e) => {
    isScrubbing = true;
    scrubToPosition(e);
  }, { passive: true });

  document.addEventListener('mousemove', (e) => { if (isScrubbing) scrubToPosition(e); });
  document.addEventListener('touchmove', (e) => { if (isScrubbing) scrubToPosition(e); }, { passive: true });
  document.addEventListener('mouseup',  () => { isScrubbing = false; });
  document.addEventListener('touchend', () => { isScrubbing = false; });
}

/* ============================================
   Discussion Forum
   ============================================ */
function initDiscussionForum() {
  const forum = document.getElementById('tab-discussion');
  if (!forum) return;
  const mobileForum = document.getElementById('tab-mobile-discussion');

  const getCount = (btn) => parseInt(btn.lastChild.textContent.trim(), 10) || 0;
  const setCount = (btn, count) => { btn.lastChild.textContent = ` ${count}`; };

  const handleVoteClick = (btn) => {
    const actions = btn.closest('.discussion-actions');
    if (!actions) return;
    const [likeBtn, dislikeBtn] = actions.querySelectorAll('button');
    const isLike = btn === likeBtn;
    const activeBtn = isLike ? likeBtn : dislikeBtn;
    const otherBtn = isLike ? dislikeBtn : likeBtn;

    if (activeBtn.classList.contains('active')) {
      activeBtn.classList.remove('active');
      setCount(activeBtn, getCount(activeBtn) - 1);
    } else {
      activeBtn.classList.add('active');
      setCount(activeBtn, getCount(activeBtn) + 1);
      if (otherBtn.classList.contains('active')) {
        otherBtn.classList.remove('active');
        setCount(otherBtn, getCount(otherBtn) - 1);
      }
    }
  };

  const wireForumContainer = (container) => {
    // Event delegation covers existing posts and dynamically added ones
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.discussion-actions button');
      if (btn) handleVoteClick(btn);
    });

    const input = container.querySelector('.discussion-input input');
    const sendBtn = container.querySelector('.discussion-send-btn');
    if (!input || !sendBtn) return;

    const avatarSrc = container.querySelector('.discussion-input img')?.getAttribute('src') ?? '';

    const buildPost = (text) => {
      const post = document.createElement('div');
      post.className = 'discussion-post';
      post.innerHTML = `
        <div class="discussion-post-header">
          <img src="${avatarSrc}" alt="You">
          <div class="discussion-post-body">
            <h6>You</h6>
            <p>${text}</p>
            <div class="discussion-actions">
              <button aria-label="Like"><i class="bi bi-hand-thumbs-up-fill"></i> 0</button>
              <button aria-label="Dislike"><i class="bi bi-hand-thumbs-down-fill"></i> 0</button>
            </div>
          </div>
        </div>`;
      return post;
    };

    const submitQuestion = () => {
      const text = input.value.trim();
      if (!text) return;
      const firstPost = container.querySelector('.discussion-post');
      if (firstPost) firstPost.before(buildPost(text));
      input.value = '';
    };

    sendBtn.addEventListener('click', submitQuestion);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitQuestion();
    });
  };

  wireForumContainer(forum);
  if (mobileForum) wireForumContainer(mobileForum);
}
