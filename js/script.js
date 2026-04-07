/* ============================================
   PM4SUCCESS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initAuthModals();
  initAuthState();
  initDropdowns();
  initAccordions();
  initTabs();
  initCarousels();
  initPasswordToggles();
  initProgressRings();
  initStarRating();
  initFileUploads();
  initCatalogueFilters();
  initFilterDropdowns();
  initCartInteractions();
  initCalendar();
  initSmoothScroll();
  initMobileCourseSidebar();
  initPromoCountdown();
  initHeroSlider();
  initProgramTabs();
  initValidation();
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
    if (mobileMenu) mobileMenu.classList.remove('show');
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

  toggle.addEventListener('click', function () {
    var isLoggedIn = document.body.classList.contains('is-logged-in');
    var isMobile = window.innerWidth <= 767;

    if (isLoggedIn && !isMobile) {
      openSwitchPanel();
    } else {
      openMobileMenu();
    }
  });

  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  if (switchOverlay) switchOverlay.addEventListener('click', closeSwitchPanel);

  // Verification banner close
  var verifyClose = document.querySelector('.verification-banner-close');
  if (verifyClose) {
    verifyClose.addEventListener('click', function () {
      var banner = this.closest('.verification-banner');
      if (banner) banner.style.display = 'none';
    });
  }

  // Set active nav link based on current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link, .mobile-menu-nav a').forEach(function (link) {
    var linkPage = link.getAttribute('href');
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
  document.querySelectorAll('[data-open-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      // Close mobile menu if open
      var mobileMenu = document.querySelector('.mobile-menu');
      var mobileOverlay = document.querySelector('.mobile-menu-overlay');
      if (mobileMenu) mobileMenu.classList.remove('show');
      if (mobileOverlay) mobileOverlay.classList.remove('show');

      // Close any open auth modal first
      document.querySelectorAll('.auth-modal-overlay.show').forEach(function (m) {
        m.classList.remove('show');
      });

      var modalId = this.getAttribute('data-open-modal');
      var modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal via X button
  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = this.closest('.auth-modal-overlay');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal via overlay click
  document.querySelectorAll('.auth-modal-overlay').forEach(function (overlay) {
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
  logoutLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.setItem('pm4s_logged_in', 'false');
      window.location.href = 'index.html';
    });
  });

  // Login handler (for demo) — validation runs first via initValidation
  const loginForms = document.querySelectorAll('[data-action="login"]');
  loginForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!Validator.validateForm(form)) return;
      localStorage.setItem('pm4s_logged_in', 'true');
      window.location.href = 'dashboard.html';
    });
  });

  // Signup handler (for demo) — validation runs first via initValidation
  const signupForms = document.querySelectorAll('[data-action="signup"]');
  signupForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!Validator.validateForm(form)) return;
      // Close signup modal and open OTP modal
      document.querySelectorAll('.auth-modal-overlay.show').forEach(function (m) {
        m.classList.remove('show');
      });
      var otpModal = document.getElementById('verifyOtpModal');
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

  avatarToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target) && !avatarToggle.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
}

/* ============================================
   4. Accordions
   ============================================ */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const parent = item.parentElement;
      const isActive = item.classList.contains('active');

      // Close siblings if single-open mode
      if (parent.hasAttribute('data-single-open')) {
        parent.querySelectorAll('.accordion-item.active').forEach(function (active) {
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

  moduleHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const module = this.closest('.module-item');
      module.classList.toggle('active');
    });
  });
}

/* ============================================
   5. Tabs
   ============================================ */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach(function (container) {
    const buttons = container.querySelectorAll('.tab-btn');
    const tabGroup = container.getAttribute('data-tabs');
    const contents = document.querySelectorAll('[data-tab-content="' + tabGroup + '"] .tab-content');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-tab');

        // Deactivate all
        buttons.forEach(function (b) { b.classList.remove('active'); });
        contents.forEach(function (c) { c.classList.remove('active'); });

        // Activate clicked
        this.classList.add('active');
        var targetContent = document.getElementById(target);
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

  carousels.forEach(function (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-btn-prev');
    const nextBtn = carousel.querySelector('.carousel-btn-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (!track) return;

    var isPageScroll = track.hasAttribute('data-scroll-page');

    if (isPageScroll) {
      // Transform-based page carousel (testimonials)
      // Find buttons and dots from section level (they live outside .carousel-wrapper)
      var section = carousel.closest('section');
      var currentPage = 0;

      function getVisibleCards() {
        var cards = track.children;
        var count = 0;
        for (var i = 0; i < cards.length; i++) {
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
        var totalPages = getTotalPages();
        if (page < 0) page = 0;
        if (page >= totalPages) page = totalPages - 1;
        currentPage = page;
        var gap = getGap();
        var cardsPerPage = getCardsPerPage();
        var firstCard = track.children[0];
        var cardWidth = firstCard ? firstCard.offsetWidth : carousel.offsetWidth;
        var offset = currentPage * cardsPerPage * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';

        // Update dots
        var dotsContainer = section.querySelector('.carousel-dots');
        if (dotsContainer) {
          var allDots = dotsContainer.querySelectorAll('.carousel-dot');
          allDots.forEach(function (d, i) {
            d.classList.toggle('active', i === currentPage);
          });
        }
      }

      // Recalculate on resize
      window.addEventListener('resize', function () {
        var totalPages = getTotalPages();
        if (currentPage >= totalPages) currentPage = totalPages - 1;
        goToPage(currentPage);
      });

      // Nav buttons (found from section since they're outside wrapper)
      var sectionPrev = section.querySelector('.carousel-btn-prev');
      var sectionNext = section.querySelector('.carousel-btn-next');

      if (sectionPrev) {
        sectionPrev.addEventListener('click', function (e) {
          e.stopImmediatePropagation();
          goToPage(currentPage - 1);
        });
      }

      if (sectionNext) {
        sectionNext.addEventListener('click', function (e) {
          e.stopImmediatePropagation();
          goToPage(currentPage + 1);
        });
      }

      // Dot clicks
      var dotsContainer = section.querySelector('.carousel-dots');
      if (dotsContainer) {
        dotsContainer.setAttribute('data-handled', 'true');
        var allDots = dotsContainer.querySelectorAll('.carousel-dot');
        allDots.forEach(function (dot, index) {
          dot.addEventListener('click', function () {
            goToPage(index);
          });
        });
      }

      // Mark buttons so standalone handler skips them
      if (sectionPrev) sectionPrev.setAttribute('data-handled', 'true');
      if (sectionNext) sectionNext.setAttribute('data-handled', 'true');

    } else {
      // Scroll-based carousel (default)
      var scrollAmount = 300;
      var firstChild = track.firstElementChild;
      if (firstChild) {
        scrollAmount = firstChild.offsetWidth + 20;
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }

      // Dot indicators
      if (dots.length > 0) {
        dots.forEach(function (dot, index) {
          dot.addEventListener('click', function () {
            var children = track.children;
            if (children[index]) {
              children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            }
            dots.forEach(function (d) { d.classList.remove('active'); });
            dot.classList.add('active');
          });
        });

        // Update active dot on scroll
        track.addEventListener('scroll', function () {
          var scrollLeft = track.scrollLeft;
          var childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 300;
          var activeIndex = Math.round(scrollLeft / childWidth);
          dots.forEach(function (d, i) {
            d.classList.toggle('active', i === activeIndex);
          });
        });
      }
    }
  });

  // Standalone carousel nav buttons with data-target (skip transform-based carousels)
  var standaloneNavBtns = document.querySelectorAll('.carousel-btn[data-target]');
  standaloneNavBtns.forEach(function (btn) {
    if (btn.hasAttribute('data-handled')) return;
    btn.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var track = document.getElementById(targetId);
      if (!track) return;

      var gap = window.innerWidth <= 575 ? 12 : 20;
      var childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + gap : 300;
      var itemsPerPage = 3;
      var pageWidth = childWidth * itemsPerPage;
      var direction = this.classList.contains('carousel-btn-prev') ? -1 : 1;
      var maxScroll = track.scrollWidth - track.clientWidth;
      var newScroll = track.scrollLeft + (direction * pageWidth);

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
  var standaloneDots = document.querySelectorAll('.carousel-dots');
  standaloneDots.forEach(function (dotsContainer) {
    if (dotsContainer.hasAttribute('data-handled')) return;
    var section = dotsContainer.closest('section');
    if (!section) return;
    var track = section.querySelector('.carousel-track');
    if (!track) return;
    var dots = dotsContainer.querySelectorAll('.carousel-dot');

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        var gap = window.innerWidth <= 575 ? 12 : 20;
        var itemsPerPage = 3;
        var childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + gap : 300;
        var scrollTo = index * itemsPerPage * childWidth;
        track.scrollTo({ left: scrollTo, behavior: 'smooth' });
        dots.forEach(function (d) { d.classList.remove('active'); });
        dot.classList.add('active');
      });
    });

    track.addEventListener('scroll', function () {
      var scrollLeft = track.scrollLeft;
      var gap = window.innerWidth <= 575 ? 12 : 20;
      var itemsPerPage = 3;
      var childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + gap : 300;
      var pageWidth = childWidth * itemsPerPage;
      var activeIndex = Math.round(scrollLeft / pageWidth);
      if (activeIndex >= dots.length) activeIndex = 0;
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === activeIndex);
      });
    });

    // Auto-loop: when scrolled to the end, jump back to start
    track.addEventListener('scrollend', function () {
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 5) {
        setTimeout(function () {
          track.scrollTo({ left: 0, behavior: 'smooth' });
          dots.forEach(function (d) { d.classList.remove('active'); });
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

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var targetId = this.getAttribute('data-toggle-password');
      var input = document.getElementById(targetId);
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

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var circle = entry.target;
        var percentage = parseFloat(circle.getAttribute('data-percentage')) || 0;
        var radius = circle.r.baseVal.value;
        var circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        // Trigger animation
        requestAnimationFrame(function () {
          var offset = circumference - (percentage / 100) * circumference;
          circle.style.strokeDashoffset = offset;
        });

        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.3 });

  rings.forEach(function (ring) {
    observer.observe(ring);
  });
}

/* ============================================
   9. Star Rating
   ============================================ */
function initStarRating() {
  const ratingContainers = document.querySelectorAll('.star-rating[data-interactive]');

  ratingContainers.forEach(function (container) {
    var stars = container.querySelectorAll('i');
    var input = container.querySelector('input[type="hidden"]');

    stars.forEach(function (star, index) {
      star.addEventListener('mouseenter', function () {
        highlightStars(stars, index);
      });

      star.addEventListener('click', function () {
        if (input) input.value = index + 1;
        stars.forEach(function (s, i) {
          s.setAttribute('data-selected', i <= index ? 'true' : 'false');
        });
        highlightStars(stars, index);
      });
    });

    container.addEventListener('mouseleave', function () {
      // Reset to selected state
      stars.forEach(function (s, i) {
        var isSelected = s.getAttribute('data-selected') === 'true';
        s.classList.toggle('active', isSelected);
      });
    });
  });

  function highlightStars(stars, upToIndex) {
    stars.forEach(function (s, i) {
      s.classList.toggle('active', i <= upToIndex);
    });
  }
}

/* ============================================
   10. File Uploads
   ============================================ */
function initFileUploads() {
  const uploaders = document.querySelectorAll('[data-file-upload]');

  uploaders.forEach(function (uploader) {
    var input = uploader.querySelector('input[type="file"]');
    var preview = uploader.querySelector('.upload-preview');
    var label = uploader.querySelector('.upload-label');

    if (!input) return;

    input.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        var file = this.files[0];

        if (label) {
          label.textContent = file.name;
        }

        if (preview && file.type.startsWith('image/')) {
          var reader = new FileReader();
          reader.onload = function (e) {
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
  var catalogueSidebar = document.querySelector('.catalogue-sidebar');
  if (!catalogueSidebar) return;

  var tabs = catalogueSidebar.querySelectorAll('.program-tab');
  var courseCards = document.querySelectorAll('.catalogue-course-list .course-card-h');

  var mobileToggles = document.querySelectorAll('.catalogue-accordion-toggle');

  if (!tabs.length) return;

  // Filter to active category on page load
  var activeTab = catalogueSidebar.querySelector('.program-tab.active');
  var initialCategory = activeTab ? activeTab.getAttribute('data-category') : 'popular';

  function filterCards(category) {
    courseCards.forEach(function (card) {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Shared active category — keeps desktop and mobile in sync
  var activeCategory = initialCategory;

  // Apply initial filter
  filterCards(activeCategory);

  // Helper: sync mobile accordions to a given category
  function syncMobile(category) {
    mobileToggles.forEach(function (t) {
      var c = t.nextElementSibling;
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
    tabs.forEach(function (t) {
      if (t.getAttribute('data-category') === category) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
    filterCards(category);
  }

  // Desktop sidebar tabs
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activeCategory = tab.getAttribute('data-category');
      syncDesktop(activeCategory);
    });
  });

  // Mobile accordion toggles
  mobileToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var content = toggle.nextElementSibling;
      var hasContent = content && content.classList.contains('catalogue-accordion-content');
      var isOpen = hasContent && content.classList.contains('open');

      // Close all accordions
      mobileToggles.forEach(function (t) {
        t.classList.remove('active');
        var c = t.nextElementSibling;
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
  window.addEventListener('resize', function () {
    syncDesktop(activeCategory);
    syncMobile(activeCategory);
  });

  // Mobile filter sidebar toggle
  var filterToggle = document.querySelector('[data-toggle="filter-sidebar"]');
  var filterSidebar = document.querySelector('.filter-sidebar');
  var filterOverlay = document.querySelector('.filter-overlay');

  if (filterToggle && filterSidebar) {
    filterToggle.addEventListener('click', function () {
      filterSidebar.classList.toggle('show');
      if (filterOverlay) filterOverlay.classList.toggle('show');
    });

    if (filterOverlay) {
      filterOverlay.addEventListener('click', function () {
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
  var wrappers = document.querySelectorAll('.filter-dropdown-wrapper');
  if (!wrappers.length) return;

  // Toggle dropdown on pill click
  wrappers.forEach(function (wrapper) {
    var btn = wrapper.querySelector('.filter-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = wrapper.classList.contains('open');

      // Close all dropdowns first
      wrappers.forEach(function (w) { w.classList.remove('open'); });

      // Toggle the clicked one
      if (!isOpen) {
        wrapper.classList.add('open');
        positionDropdown(wrapper);
      }
    });
  });

  // Position dropdown so it stays within viewport
  function positionDropdown(wrapper) {
    var panel = wrapper.querySelector('.filter-dropdown-panel');
    if (!panel) return;

    // Reset positioning
    panel.style.left = '0';
    panel.style.right = 'auto';

    // Check if it overflows right edge
    var rect = panel.getBoundingClientRect();
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
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.filter-dropdown-wrapper')) {
      wrappers.forEach(function (w) { w.classList.remove('open'); });
    }
  });

  // Prevent dropdown panel clicks from closing the panel
  document.querySelectorAll('.filter-dropdown-panel').forEach(function (panel) {
    panel.addEventListener('click', function (e) {
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

  removeButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var item = this.closest('.cart-item');
      if (item) {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.3s ease';
        setTimeout(function () {
          item.remove();
          updateCartTotal();
          checkCartEmpty();
        }, 300);
      }
    });
  });

  function updateCartTotal() {
    var items = document.querySelectorAll('.cart-item');
    var total = 0;
    items.forEach(function (item) {
      var priceEl = item.querySelector('.cart-item-price');
      if (priceEl) {
        var priceText = priceEl.textContent.replace(/[^0-9.]/g, '');
        total += parseFloat(priceText) || 0;
      }
    });
    var totalEl = document.querySelector('.cart-total-amount');
    if (totalEl) {
      totalEl.textContent = '\u20A6' + total.toLocaleString();
    }
  }

  function checkCartEmpty() {
    var items = document.querySelectorAll('.cart-item');
    var emptyState = document.querySelector('.cart-empty-state');
    var cartContent = document.querySelector('.cart-content');

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
  var calendar = document.querySelector('.calendar-widget');
  if (!calendar) return;

  var now = new Date();
  var currentMonth = now.getMonth();
  var currentYear = now.getFullYear();

  var monthLabel = calendar.querySelector('.calendar-month');
  var grid = calendar.querySelector('.calendar-grid');
  var prevBtn = calendar.querySelector('.calendar-prev');
  var nextBtn = calendar.querySelector('.calendar-next');

  if (!grid) return;

  // Example deadline dates (for demo)
  var deadlineDates = [10, 15, 22, 25];

  function renderCalendar(month, year) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    if (monthLabel) {
      monthLabel.textContent = monthNames[month] + ' ' + year;
    }

    // Clear non-header cells
    var existingDays = grid.querySelectorAll('.day');
    existingDays.forEach(function (d) { d.remove(); });

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var daysInPrevMonth = new Date(year, month, 0).getDate();

    // Previous month days
    for (var i = firstDay - 1; i >= 0; i--) {
      var dayEl = document.createElement('span');
      dayEl.className = 'day other-month';
      dayEl.textContent = daysInPrevMonth - i;
      grid.appendChild(dayEl);
    }

    // Current month days
    var today = new Date();
    for (var d = 1; d <= daysInMonth; d++) {
      var dayEl = document.createElement('span');
      dayEl.className = 'day';
      dayEl.textContent = d;

      if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayEl.classList.add('today');
      }

      if (deadlineDates.includes(d)) {
        dayEl.classList.add('has-event');
      }

      grid.appendChild(dayEl);
    }

    // Next month days
    var totalCells = firstDay + daysInMonth;
    var remaining = 7 - (totalCells % 7);
    if (remaining < 7) {
      for (var n = 1; n <= remaining; n++) {
        var dayEl = document.createElement('span');
        dayEl.className = 'day other-month';
        dayEl.textContent = n;
        grid.appendChild(dayEl);
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
    });
  }

  renderCalendar(currentMonth, currentYear);
}

/* ============================================
   14. Smooth Scroll (sidebar nav)
   ============================================ */
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('[data-scroll-to]');

  scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('data-scroll-to');
      var target = document.getElementById(targetId);
      if (target) {
        var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 72;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }

      // Update active state
      var siblings = this.closest('.sidebar-nav');
      if (siblings) {
        siblings.querySelectorAll('a').forEach(function (a) { a.classList.remove('active'); });
        this.classList.add('active');
      }
    });
  });
}

/* ============================================
   15. Mobile Course Sidebar
   ============================================ */
function initMobileCourseSidebar() {
  var toggleBtn = document.querySelector('[data-toggle="course-sidebar"]');
  var sidebar = document.querySelector('.course-sidebar-panel');
  var closeBtn = document.querySelector('.course-sidebar-close');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('show');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      sidebar.classList.remove('show');
    });
  }
}

/* ============================================
   Promo Countdown Timer
   ============================================ */
function initPromoCountdown() {
  var daysEl = document.getElementById('countdown-days');
  var hoursEl = document.getElementById('countdown-hours');
  var minsEl = document.getElementById('countdown-mins');
  var secsEl = document.getElementById('countdown-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  var DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days in ms
  var STORAGE_KEY = 'promoCountdownEnd';

  function getEndTime() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && Number(stored) > Date.now()) {
      return Number(stored);
    }
    var end = Date.now() + DURATION;
    localStorage.setItem(STORAGE_KEY, end);
    return end;
  }

  var endTime = getEndTime();

  function tick() {
    var remaining = endTime - Date.now();

    if (remaining <= 0) {
      // Restart the countdown
      endTime = Date.now() + DURATION;
      localStorage.setItem(STORAGE_KEY, endTime);
      remaining = DURATION;
    }

    var totalSecs = Math.floor(remaining / 1000);
    var d = Math.floor(totalSecs / 86400);
    var h = Math.floor((totalSecs % 86400) / 3600);
    var m = Math.floor((totalSecs % 3600) / 60);
    var s = totalSecs % 60;

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
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots = document.querySelectorAll('.hero-slider-dot');

  function goToHeroSlide(index) {
    heroSlides[heroCurrent].classList.remove('active');
    if (heroDots.length) heroDots[heroCurrent].classList.remove('active');
    heroCurrent = index;
    heroSlides[heroCurrent].classList.add('active');
    if (heroDots.length) heroDots[heroCurrent].classList.add('active');
  }

  if (heroSlides.length >= 2) {
    var heroCurrent = 0;

    heroDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var slideIndex = parseInt(this.getAttribute('data-slide'));
        goToHeroSlide(slideIndex);
      });
    });

    setInterval(function () {
      goToHeroSlide((heroCurrent + 1) % heroSlides.length);
    }, 30000);
  }

  var ctaSlides = document.querySelectorAll('.cta-teach-slide');
  var ctaDots = document.querySelectorAll('.cta-slider-dot');
  if (ctaSlides.length >= 2) {
    var ctaCurrent = 0;

    function goToCtaSlide(index) {
      ctaSlides[ctaCurrent].classList.remove('active');
      if (ctaDots.length) ctaDots[ctaCurrent].classList.remove('active');
      ctaCurrent = index;
      ctaSlides[ctaCurrent].classList.add('active');
      if (ctaDots.length) ctaDots[ctaCurrent].classList.add('active');
    }

    ctaDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var slideIndex = parseInt(this.getAttribute('data-cta-slide'));
        goToCtaSlide(slideIndex);
      });
    });

    setInterval(function () {
      goToCtaSlide((ctaCurrent + 1) % ctaSlides.length);
    }, 30000);
  }
}

/* ============================================
   Program Tabs
   ============================================ */
function initProgramTabs() {
  var sidebar = document.querySelector('.program-sidebar:not(.catalogue-sidebar)');
  if (!sidebar) return;

  var sidebarTabs = sidebar.querySelectorAll('.program-tab');
  var allGrids = document.querySelectorAll('.program-grid');
  var accordionToggles = document.querySelectorAll('.program-accordion-toggle');

  if (!sidebarTabs.length) return;

  /* Shared active category */
  var activeSidebarTab = sidebar.querySelector('.program-tab.active');
  var activeCategory = activeSidebarTab ? activeSidebarTab.getAttribute('data-category') : 'popular';

  /* Switch the visible grid to the given category */
  function showGrid(category) {
    allGrids.forEach(function (grid) {
      if (grid.getAttribute('data-category') === category) {
        grid.classList.add('active');
      } else {
        grid.classList.remove('active');
      }
    });
  }

  /* Sync desktop sidebar tabs to a category */
  function syncDesktop(category) {
    sidebarTabs.forEach(function (t) {
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
    accordionToggles.forEach(function (t) {
      var c = t.nextElementSibling;
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
  var popularTab = sidebar.querySelector('.program-tab[data-category="popular"]');

  sidebarTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var category = tab.getAttribute('data-category');
      var isMobile = window.innerWidth < 768;

      if (isMobile && category === 'popular') {
        /* On mobile, popular tab toggles the popular grid */
        var isActive = tab.classList.contains('active');

        /* Close any open accordion */
        accordionToggles.forEach(function (t) {
          t.classList.remove('active');
          t.nextElementSibling.classList.remove('open');
        });

        if (isActive) {
          /* Collapse popular */
          tab.classList.remove('active');
          allGrids.forEach(function (g) { g.classList.remove('active'); });
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
  accordionToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var content = toggle.nextElementSibling;
      var isOpen = content.classList.contains('open');

      /* Close all accordions */
      accordionToggles.forEach(function (t) {
        t.classList.remove('active');
        t.nextElementSibling.classList.remove('open');
      });

      /* Hide all grids and deactivate popular tab */
      allGrids.forEach(function (g) { g.classList.remove('active'); });
      if (popularTab) popularTab.classList.remove('active');

      /* If already open, do nothing */
      if (isOpen) return;

      toggle.classList.add('active');
      content.classList.add('open');
      activeCategory = toggle.getAttribute('data-category');
    });
  });

  /* On resize: keep both views in sync */
  window.addEventListener('resize', function () {
    var isMobile = window.innerWidth < 768;

    if (isMobile) {
      if (activeCategory === 'popular') {
        /* Show popular grid, activate popular tab, close accordions */
        if (popularTab) popularTab.classList.add('active');
        showGrid('popular');
        accordionToggles.forEach(function (t) {
          t.classList.remove('active');
          t.nextElementSibling.classList.remove('open');
        });
      } else {
        /* Hide grids, deactivate popular tab, open matching accordion */
        if (popularTab) popularTab.classList.remove('active');
        allGrids.forEach(function (g) { g.classList.remove('active'); });
        syncMobile(activeCategory);
      }
    } else {
      /* Desktop: sync tabs and grid, close all accordions */
      syncDesktop(activeCategory);
      accordionToggles.forEach(function (t) {
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
var Validator = (function () {

  /* ------------------------------------------
     Core Validators
     ------------------------------------------ */

  function validateRequired(value) {
    var trimmed = (value || '').trim();
    return {
      valid: trimmed.length > 0,
      message: 'This field is required'
    };
  }

  function validateEmail(value) {
    var trimmed = (value || '').trim();
    if (!trimmed) return { valid: false, message: 'Please enter your email address' };
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      valid: pattern.test(trimmed),
      message: 'Please enter a valid email address'
    };
  }

  function validatePassword(value) {
    var val = value || '';
    if (!val) return { valid: false, message: 'Please enter a password' };
    if (val.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
    if (!/[A-Z]/.test(val)) return { valid: false, message: 'Password must include at least 1 uppercase letter' };
    if (!/[a-z]/.test(val)) return { valid: false, message: 'Password must include at least 1 lowercase letter' };
    if (!/[0-9]/.test(val)) return { valid: false, message: 'Password must include at least 1 number' };
    return { valid: true, message: '' };
  }

  function validateMatch(value1, value2, fieldName) {
    var label = fieldName || 'Passwords';
    return {
      valid: value1 === value2 && value1 !== '',
      message: label + ' do not match'
    };
  }

  function validatePhone(value) {
    var trimmed = (value || '').trim();
    if (!trimmed) return { valid: false, message: 'Please enter your phone number' };
    var digits = trimmed.replace(/[\s\-\+\(\)]/g, '');
    if (!/^\d+$/.test(digits)) return { valid: false, message: 'Phone number must contain only numbers' };
    if (digits.length < 10 || digits.length > 15) return { valid: false, message: 'Phone number must be between 10 and 15 digits' };
    return { valid: true, message: '' };
  }

  function validateMinLength(value, min) {
    var trimmed = (value || '').trim();
    return {
      valid: trimmed.length >= min,
      message: 'Must be at least ' + min + ' characters'
    };
  }

  function validateMaxLength(value, max) {
    var trimmed = (value || '').trim();
    return {
      valid: trimmed.length <= max,
      message: 'Must be no more than ' + max + ' characters'
    };
  }

  function validateName(value) {
    var trimmed = (value || '').trim();
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
    var trimmed = (value || '').trim();
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
    var errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    errorEl.id = inputEl.id ? inputEl.id + '-error' : 'error-' + Date.now();

    // Link via aria-describedby
    inputEl.setAttribute('aria-describedby', errorEl.id);

    // Insert after the input's parent if it's an input-group, otherwise after input
    var parent = inputEl.closest('.input-group') || inputEl.closest('.file-upload-area');
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
    var describedBy = inputEl.getAttribute('aria-describedby');
    if (describedBy) {
      var errorEl = document.getElementById(describedBy);
      if (errorEl && errorEl.classList.contains('error-message')) {
        errorEl.remove();
      }
      inputEl.removeAttribute('aria-describedby');
    }

    // Also check for adjacent error messages (fallback)
    var parent = inputEl.closest('.input-group') || inputEl.closest('.file-upload-area');
    var nextEl = parent ? parent.nextElementSibling : inputEl.nextElementSibling;
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

    var fields = formEl.querySelectorAll('[data-validate]');
    var allValid = true;
    var firstInvalid = null;

    fields.forEach(function (field) {
      var isValid = validateField(field);
      if (!isValid && !firstInvalid) {
        firstInvalid = field;
      }
      if (!isValid) allValid = false;
    });

    if (!allValid) {
      // Add shake animation
      formEl.classList.add('form-shake');
      setTimeout(function () {
        formEl.classList.remove('form-shake');
      }, 500);

      // Scroll to and focus the first invalid field
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { firstInvalid.focus(); }, 300);
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
    var rules = (field.getAttribute('data-validate') || '').split('|');
    var value = field.value;
    var result = { valid: true, message: '' };

    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i].trim();
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
        var matchTargetId = rule.split(':')[1];
        var matchTarget = document.getElementById(matchTargetId);
        var matchValue = matchTarget ? matchTarget.value : '';
        result = validateMatch(value, matchValue, 'Passwords');
      } else if (rule.indexOf('minlength:') === 0) {
        var min = parseInt(rule.split(':')[1], 10);
        result = validateMinLength(value, min);
      } else if (rule.indexOf('maxlength:') === 0) {
        var max = parseInt(rule.split(':')[1], 10);
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
    field.addEventListener('blur', function () {
      validateField(field);
    });

    // Clear error on input (real-time correction)
    field.addEventListener('input', function () {
      if (field.classList.contains('input-error')) {
        validateField(field);
      }
    });

    // For selects, listen to change instead
    if (field.tagName === 'SELECT') {
      field.addEventListener('change', function () {
        validateField(field);
      });
    }
  }

  /**
   * wireForm — sets up blur/input/submit validation for an entire form
   */
  function wireForm(formEl) {
    if (!formEl) return;

    var fields = formEl.querySelectorAll('[data-validate]');
    fields.forEach(function (field) {
      wireField(field);
    });

    // Submit handler — only if form doesn't already have a data-action
    // (data-action forms handle submit in initAuthState)
    if (!formEl.hasAttribute('data-action')) {
      formEl.addEventListener('submit', function (e) {
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
  document.querySelectorAll('[data-action="login"]').forEach(function (form) {
    var emailInput = form.querySelector('#login-email, [type="email"]');
    var passwordInput = form.querySelector('#login-password, [type="password"]');
    if (emailInput) emailInput.setAttribute('data-validate', 'required|email');
    if (passwordInput) passwordInput.setAttribute('data-validate', 'required');
    Validator.wireForm(form);
  });

  // Signup forms
  document.querySelectorAll('[data-action="signup"]').forEach(function (form) {
    var nameInput = form.querySelector('#signup-name, [placeholder*="full name"]');
    var emailInput = form.querySelector('#signup-email, [type="email"]');
    var passwordInput = form.querySelector('#signup-password');
    var confirmInput = form.querySelector('#signup-confirm');

    if (nameInput) nameInput.setAttribute('data-validate', 'required|name');
    if (emailInput) emailInput.setAttribute('data-validate', 'required|email');
    if (passwordInput) passwordInput.setAttribute('data-validate', 'required|password');
    if (confirmInput) {
      var pwId = passwordInput ? passwordInput.id : 'signup-password';
      confirmInput.setAttribute('data-validate', 'required|match:' + pwId);
    }
    Validator.wireForm(form);
  });

  // Verify OTP forms (modal)
  document.querySelectorAll('[data-action="verify-otp"]').forEach(function (form) {
    var otpInput = form.querySelector('#otp-code, [placeholder*="OTP"]');
    if (otpInput) otpInput.setAttribute('data-validate', 'required|otp');
    Validator.wireForm(form);
  });

  // Forgot Password forms
  document.querySelectorAll('#forgotPasswordModal form').forEach(function (form) {
    if (form.hasAttribute('data-action')) return;
    var emailInput = form.querySelector('#forgot-email, [type="email"]');
    if (emailInput) emailInput.setAttribute('data-validate', 'required|email');
    Validator.wireForm(form);
  });

  /* ------------------------------------------
     Standalone OTP Page (verify-otp.html)
     ------------------------------------------ */
  var standaloneOtpForm = document.querySelector('form[action="#"]');
  if (standaloneOtpForm && standaloneOtpForm.querySelector('.otp-input')) {
    var otpField = standaloneOtpForm.querySelector('.otp-input');
    if (otpField) otpField.setAttribute('data-validate', 'required|otp');
    Validator.wireForm(standaloneOtpForm);
  }

  /* ------------------------------------------
     Contact Form (contact.html)
     ------------------------------------------ */
  var contactName = document.getElementById('contactName');
  var contactEmail = document.getElementById('contactEmail');
  var contactSubject = document.getElementById('contactSubject');
  var contactMessage = document.getElementById('contactMessage');

  if (contactName) {
    contactName.setAttribute('data-validate', 'required|name');
    var contactForm = contactName.closest('form');

    if (contactEmail) contactEmail.setAttribute('data-validate', 'required|email');
    if (contactMessage) contactMessage.setAttribute('data-validate', 'required|minlength:10');
    // Subject is optional — no validation needed

    if (contactForm) Validator.wireForm(contactForm);
  }

  /* ------------------------------------------
     Edit Profile — Personal Information
     ------------------------------------------ */
  var personalInfoSection = document.querySelector('.profile-card');
  if (personalInfoSection) {
    var personalForm = personalInfoSection.querySelector('form');
    if (personalForm) {
      var inputs = personalForm.querySelectorAll('input, select');
      inputs.forEach(function (input) {
        var type = input.type;
        var placeholder = (input.placeholder || '').toLowerCase();

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
  var verifySection = document.querySelector('.profile-card.mt-4');
  if (verifySection) {
    var verifyForms = document.querySelectorAll('.profile-card.mt-4 form');
    verifyForms.forEach(function (form) {
      // Check if this is the verification form (has ID type select)
      var idSelect = form.querySelector('select');
      var fileInput = form.querySelector('input[type="file"]');

      if (idSelect && fileInput) {
        // This is the account verification form
        var formInputs = form.querySelectorAll('input:not([type="file"]), select');
        formInputs.forEach(function (input) {
          var placeholder = (input.placeholder || '').toLowerCase();
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
        form.addEventListener('validSubmit', function () {
          if (fileInput && !fileInput.files.length) {
            var uploadArea = fileInput.closest('.file-upload-area');
            if (uploadArea) {
              uploadArea.classList.add('input-error');
              // Add error message if not already there
              var existing = uploadArea.parentNode.querySelector('.error-message');
              if (!existing) {
                var msg = document.createElement('span');
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
  var passwordCard = document.querySelector('.password-card');
  if (passwordCard) {
    var passwordForm = passwordCard.querySelector('form');
    if (passwordForm) {
      var pwInputs = passwordForm.querySelectorAll('input[type="password"]');
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
  var feedbackTextarea = document.querySelector('.star-rating[data-interactive]');
  if (feedbackTextarea) {
    var feedbackSection = feedbackTextarea.closest('.col-lg-7');
    if (feedbackSection) {
      var textarea = feedbackSection.querySelector('textarea');
      var ratingInput = feedbackSection.querySelector('input[type="hidden"][name="rating"]');
      var sendBtn = feedbackSection.querySelector('.btn-primary');

      if (textarea) textarea.setAttribute('data-validate', 'required|minlength:10');

      // Wire textarea blur/input
      if (textarea) Validator.wireField(textarea);

      // Send feedback button handler
      if (sendBtn) {
        sendBtn.addEventListener('click', function (e) {
          e.preventDefault();
          var allValid = true;

          // Validate textarea
          if (textarea) {
            var result = Validator.validateField(textarea);
            if (!result) allValid = false;
          }

          // Validate star rating
          if (ratingInput && (!ratingInput.value || ratingInput.value === '0')) {
            allValid = false;
            // Show error near stars
            var starContainer = feedbackSection.querySelector('.star-rating');
            var existingError = starContainer.parentNode.querySelector('.star-rating-error');
            if (!existingError) {
              var msg = document.createElement('span');
              msg.className = 'star-rating-error';
              msg.textContent = 'Please select a rating';
              starContainer.parentNode.insertBefore(msg, starContainer.nextSibling);
            }
          } else {
            // Clear star error
            var starError = feedbackSection.querySelector('.star-rating-error');
            if (starError) starError.remove();
          }

          if (!allValid) {
            feedbackSection.classList.add('form-shake');
            setTimeout(function () { feedbackSection.classList.remove('form-shake'); }, 500);
          }
        });
      }
    }
  }

  /* ------------------------------------------
     Cart — Coupon Input
     ------------------------------------------ */
  var promoInput = document.querySelector('.promo-input-group input');
  var promoBtn = document.querySelector('.promo-input-group button');
  if (promoInput && promoBtn) {
    promoBtn.addEventListener('click', function () {
      var value = promoInput.value.trim();
      if (!value) {
        promoInput.classList.add('input-error');
        promoInput.setAttribute('aria-invalid', 'true');
        // Add error message
        var existing = promoInput.parentNode.querySelector('.error-message');
        if (!existing) {
          var msg = document.createElement('span');
          msg.className = 'error-message';
          msg.textContent = 'Please enter a coupon code';
          promoInput.parentNode.appendChild(msg);
        }
      } else {
        promoInput.classList.remove('input-error');
        promoInput.setAttribute('aria-invalid', 'false');
        var err = promoInput.parentNode.querySelector('.error-message');
        if (err) err.remove();
      }
    });

    promoInput.addEventListener('input', function () {
      if (promoInput.classList.contains('input-error') && promoInput.value.trim()) {
        promoInput.classList.remove('input-error');
        promoInput.setAttribute('aria-invalid', 'false');
        var err = promoInput.parentNode.querySelector('.error-message');
        if (err) err.remove();
      }
    });
  }

  /* ------------------------------------------
     Checkout — Billing Form
     ------------------------------------------ */
  var billingForm = document.querySelector('.billing-form');
  if (billingForm) {
    billingForm.addEventListener('submit', function (e) {
      var paymentSelected = billingForm.querySelector('input[name="payment"]:checked');
      if (!paymentSelected) {
        e.preventDefault();
        var paymentMethods = billingForm.querySelector('.payment-methods');
        if (paymentMethods) {
          paymentMethods.classList.add('input-error');
          var existing = paymentMethods.parentNode.querySelector('.error-message');
          if (!existing) {
            var msg = document.createElement('span');
            msg.className = 'error-message';
            msg.textContent = 'Please select a payment method';
            paymentMethods.parentNode.insertBefore(msg, paymentMethods.nextSibling);
          }
        }
        billingForm.classList.add('form-shake');
        setTimeout(function () { billingForm.classList.remove('form-shake'); }, 500);
      }
    });

    // Clear payment error when a radio is selected
    billingForm.querySelectorAll('input[name="payment"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        var paymentMethods = billingForm.querySelector('.payment-methods');
        if (paymentMethods) {
          paymentMethods.classList.remove('input-error');
          var err = paymentMethods.parentNode.querySelector('.error-message');
          if (err) err.remove();
        }
      });
    });
  }

  /* ------------------------------------------
     Newsletter — Footer (all pages)
     ------------------------------------------ */
  document.querySelectorAll('.footer-newsletter').forEach(function (container) {
    var emailInput = container.querySelector('input[type="email"]');
    var subscribeBtn = container.querySelector('button');
    if (!emailInput || !subscribeBtn) return;

    subscribeBtn.addEventListener('click', function () {
      var result = Validator.validateEmail(emailInput.value);
      if (!result.valid) {
        emailInput.classList.add('input-error');
        emailInput.setAttribute('aria-invalid', 'true');
        var existing = container.querySelector('.error-message');
        if (!existing) {
          var msg = document.createElement('span');
          msg.className = 'error-message';
          msg.textContent = result.message;
          container.appendChild(msg);
        }
      } else {
        emailInput.classList.remove('input-error');
        emailInput.classList.add('input-success');
        emailInput.setAttribute('aria-invalid', 'false');
        var err = container.querySelector('.error-message');
        if (err) err.remove();
      }
    });

    emailInput.addEventListener('input', function () {
      if (emailInput.classList.contains('input-error')) {
        var result = Validator.validateEmail(emailInput.value);
        if (result.valid) {
          emailInput.classList.remove('input-error');
          emailInput.classList.add('input-success');
          emailInput.setAttribute('aria-invalid', 'false');
          var err = container.querySelector('.error-message');
          if (err) err.remove();
        }
      }
    });
  });

  /* ------------------------------------------
     Career Path Select (edit-profile.html)
     ------------------------------------------ */
  var careerSelect = document.querySelector('.profile-card.mt-4 > div > select.form-select');
  if (careerSelect && !careerSelect.hasAttribute('data-validate')) {
    // Career path is optional — no validation needed
  }
}
