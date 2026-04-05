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
  initCartInteractions();
  initCalendar();
  initSmoothScroll();
  initMobileCourseSidebar();
  initPromoCountdown();
  initHeroSlider();
  initProgramTabs();
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

  // Login handler (for demo)
  const loginForms = document.querySelectorAll('[data-action="login"]');
  loginForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      localStorage.setItem('pm4s_logged_in', 'true');
      window.location.href = 'dashboard.html';
    });
  });

  // Signup handler (for demo)
  const signupForms = document.querySelectorAll('[data-action="signup"]');
  signupForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
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

  // Protected page redirect
  const protectedPages = [
    'dashboard.html', 'my-courses.html', 'learning-paths.html',
    'progress-report.html', 'purchases.html', 'accomplishments.html',
    'edit-profile.html', 'notifications.html', 'course-content.html',
    'cart.html', 'checkout.html'
  ];

  const currentPage = window.location.pathname.split('/').pop();
  if (protectedPages.includes(currentPage) && !isLoggedIn) {
    window.location.href = 'login.html';
  }
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
      var currentPage = 0;
      var totalChildren = track.children.length;
      var perPage = 3;
      var totalPages = Math.ceil(totalChildren / perPage);

      function goToPage(page) {
        if (page < 0) page = 0;
        if (page >= totalPages) page = totalPages - 1;
        currentPage = page;
        var pageWidth = carousel.offsetWidth;
        var gap = 20;
        var offset = currentPage * (pageWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
        // Update dots
        var dotsContainer = carousel.closest('section').querySelector('.carousel-dots');
        if (dotsContainer) {
          var allDots = dotsContainer.querySelectorAll('.carousel-dot');
          allDots.forEach(function (d, i) {
            d.classList.toggle('active', i === currentPage);
          });
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          goToPage(currentPage - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          goToPage(currentPage + 1);
        });
      }

      // Dot clicks
      var dotsContainer = carousel.closest('section').querySelector('.carousel-dots');
      if (dotsContainer) {
        var allDots = dotsContainer.querySelectorAll('.carousel-dot');
        allDots.forEach(function (dot, index) {
          dot.addEventListener('click', function () {
            goToPage(index);
          });
        });
      }

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

  // Standalone carousel nav buttons with data-target
  var standaloneNavBtns = document.querySelectorAll('.carousel-btn[data-target]');
  standaloneNavBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var track = document.getElementById(targetId);
      if (!track) return;

      var childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 300;
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

  // Standalone carousel dots (outside carousel-wrapper)
  var standaloneDots = document.querySelectorAll('.carousel-dots');
  standaloneDots.forEach(function (dotsContainer) {
    var section = dotsContainer.closest('section');
    if (!section) return;
    var track = section.querySelector('.carousel-track');
    if (!track) return;
    var dots = dotsContainer.querySelectorAll('.carousel-dot');
    var itemsPerPage = 3;

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        var childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 300;
        var scrollTo = index * itemsPerPage * childWidth;
        track.scrollTo({ left: scrollTo, behavior: 'smooth' });
        dots.forEach(function (d) { d.classList.remove('active'); });
        dot.classList.add('active');
      });
    });

    track.addEventListener('scroll', function () {
      var scrollLeft = track.scrollLeft;
      var childWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 300;
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
  // Category sidebar click
  const categoryItems = document.querySelectorAll('.category-sidebar-item');

  categoryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      categoryItems.forEach(function (i) { i.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // Filter buttons toggle
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  // Mobile filter sidebar toggle
  const filterToggle = document.querySelector('[data-toggle="filter-sidebar"]');
  const filterSidebar = document.querySelector('.filter-sidebar');
  const filterOverlay = document.querySelector('.filter-overlay');

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
  if (heroSlides.length >= 2) {
    var heroCurrent = 0;
    setInterval(function () {
      heroSlides[heroCurrent].classList.remove('active');
      heroCurrent = (heroCurrent + 1) % heroSlides.length;
      heroSlides[heroCurrent].classList.add('active');
    }, 30000);
  }

  var ctaSlides = document.querySelectorAll('.cta-teach-slide');
  if (ctaSlides.length >= 2) {
    var ctaCurrent = 0;
    setInterval(function () {
      ctaSlides[ctaCurrent].classList.remove('active');
      ctaCurrent = (ctaCurrent + 1) % ctaSlides.length;
      ctaSlides[ctaCurrent].classList.add('active');
    }, 30000);
  }
}

/* ============================================
   Program Tabs
   ============================================ */
function initProgramTabs() {
  var tabs = document.querySelectorAll('.program-tab');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });
}
