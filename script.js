/**
 * Noureddine Khelfaoui - Portfolio Interactive Script
 * Production-ready, zero-dependency vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroCodeWindow();
  initProjectFilters();
  initModals();
  initGpaSimulator();
  initClipboardHandlers();
  initContactForm();
  initAntiGravityCardGlow();
});
const canvas = document.getElementById('spider-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const mouse = { x: null, y: null, radius: 140 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
  window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.fillStyle = 'rgba(255, 153, 0, 0.7)'; // Amazon Orange accent
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 75; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(255, 153, 0, ${1 - dist / 120})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Connect particles to mouse cursor
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / mouse.radius})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
/* ========================================================
   1. NAVIGATION & SCROLL SPY
   ======================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Toggle mobile drawer
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      mobileDrawer.setAttribute('aria-hidden', isOpen);
    });

    // Close drawer on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // Header scroll appearance & active section spy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.borderBottomColor = 'rgba(59, 130, 246, 0.3)';
    } else {
      header.style.borderBottomColor = 'var(--border-subtle)';
    }

    // Scroll spy for desktop nav
    let currentSection = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ========================================================
   2. HERO INTERACTIVE CODE WINDOW
   ======================================================== */
function initHeroCodeWindow() {
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const runManifestBtn = document.getElementById('runManifestBtn');
  const manifestOutput = document.getElementById('manifestOutput');

  // Copy code from profile_manifest.ts
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeToCopy = `const developer: DeveloperProfile = {
  name: "Noureddine Khelfaoui",
  role: "Junior Software Engineer",
  status: "3rd-Year CS Student",
  focus: [
    "Software Dev",
    "Data & Algorithms",
    "Systems Engineering"
  ],
  currentPondering: () => "Optimizing I/O latency"
};
developer.initialize();`;

      navigator.clipboard.writeText(codeToCopy).then(() => {
        showToast('profile_manifest.ts snippet copied to clipboard');
        const copyText = copyCodeBtn.querySelector('.copy-text');
        if (copyText) {
          const original = copyText.textContent;
          copyText.textContent = 'Copied!';
          setTimeout(() => {
            copyText.textContent = original;
          }, 2000);
        }
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  // Run manifest execution simulation
  if (runManifestBtn && manifestOutput) {
    runManifestBtn.addEventListener('click', () => {
      const isVisible = manifestOutput.classList.contains('open');
      if (!isVisible) {
        manifestOutput.classList.add('open');
        runManifestBtn.innerHTML = '<span>Hide Manifest</span> <span>▲</span>';
      } else {
        manifestOutput.classList.remove('open');
        runManifestBtn.innerHTML = '<span>Run Manifest</span> <span class="play-icon">▶</span>';
      }
    });
  }
}

/* ========================================================
   3. PROJECT FILTER TABS
   ======================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ========================================================
   4. MODALS & CASE STUDY SYSTEM
   ======================================================== */
function initModals() {
  // Modal triggers
  const resumeTriggerBtn = document.getElementById('resumeTriggerBtn');
  const mobileResumeBtn = document.getElementById('mobileResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  const caseStudyFPL = document.getElementById('caseStudyFPL');
  const closeCaseStudyBtn = document.getElementById('closeCaseStudyBtn');
  const fplCaseStudyTriggers = document.querySelectorAll('.btn-case-study');

  const gameSpecModal = document.getElementById('gameSpecModal');
  const closeGameSpecBtn = document.getElementById('closeGameSpecBtn');
  const gameSpecTriggers = document.querySelectorAll('.btn-game-spec');
  const jumpToJavaSpec = document.getElementById('jumpToJavaSpec');

  const gpaModal = document.getElementById('gpaModal');
  const openGpaDemoBtn = document.getElementById('openGpaDemoBtn');
  const closeGpaBtn = document.getElementById('closeGpaBtn');

  // Helper to open modal
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Helper to close modal
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Resume Modal
  [resumeTriggerBtn, mobileResumeBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', () => openModal(resumeModal));
  });
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', () => closeModal(resumeModal));
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // FPL Case Study Modal
  fplCaseStudyTriggers.forEach(btn => {
    btn.addEventListener('click', () => openModal(caseStudyFPL));
  });
  if (closeCaseStudyBtn) closeCaseStudyBtn.addEventListener('click', () => closeModal(caseStudyFPL));

  // Game Spec Modal
  gameSpecTriggers.forEach(btn => {
    btn.addEventListener('click', () => openModal(gameSpecModal));
  });
  if (closeGameSpecBtn) closeGameSpecBtn.addEventListener('click', () => closeModal(gameSpecModal));

  // Jump from FPL case study teaser to Java Architecture
  if (jumpToJavaSpec) {
    jumpToJavaSpec.addEventListener('click', () => {
      closeModal(caseStudyFPL);
      setTimeout(() => openModal(gameSpecModal), 250);
    });
  }

  // GPA Simulator Modal
  if (openGpaDemoBtn) {
    openGpaDemoBtn.addEventListener('click', () => openModal(gpaModal));
  }
  if (closeGpaBtn) closeGpaBtn.addEventListener('click', () => closeModal(gpaModal));

  // Close when clicking outside of modal container
  const allModals = [resumeModal, caseStudyFPL, gameSpecModal, gpaModal];
  allModals.forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Close active modal on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(m => {
        if (m && m.classList.contains('open')) {
          closeModal(m);
        }
      });
    }
  });

  // Case Study Code Tabs Switching
  const mcwTabs = document.querySelectorAll('.mcw-tab');
  mcwTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mcwTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const fileKey = tab.getAttribute('data-file');
      document.querySelectorAll('.mcw-body').forEach(body => {
        body.classList.remove('active-tab-content');
      });
      const activeContent = document.getElementById(`tab-${fileKey}`);
      if (activeContent) {
        activeContent.classList.add('active-tab-content');
      }
    });
  });

  // "Run Live Analysis ⚡" Simulator button in Case Study
  const runAnalysisLiveBtn = document.getElementById('runAnalysisLiveBtn');
  const mcwTerminal = document.getElementById('mcwTerminal');
  if (runAnalysisLiveBtn && mcwTerminal) {
    runAnalysisLiveBtn.addEventListener('click', () => {
      runAnalysisLiveBtn.disabled = true;
      runAnalysisLiveBtn.innerHTML = '<span>Executing Scrape...</span> <span class="pulse-indicator"></span>';

      setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        mcwTerminal.querySelector('.term-timer').textContent = `${timestamp} LIVE`;
        mcwTerminal.querySelector('.term-log').innerHTML = 
          `[GW Update] <span class="term-accent">Scrape completed in 0.81ms</span> | 618 vectors analyzed | Top ROI Differential: <span class="term-accent">C. Palmer (Score: 8.94)</span>`;
        
        runAnalysisLiveBtn.disabled = false;
        runAnalysisLiveBtn.innerHTML = '<span>Run Live Analysis</span> <span class="bolt-icon">⚡</span>';
        showToast('FPL scraper analysis batch calculated successfully!');
      }, 750);
    });
  }
}

/* ========================================================
   5. UNIVERSITY GPA SIMULATOR LOGIC
   ======================================================== */
function initGpaSimulator() {
  const inputs = document.querySelectorAll('.sim-input');
  if (!inputs.length) return;

  function calculate() {
    const td1 = parseFloat(document.getElementById('td1').value) || 0;
    const ex1 = parseFloat(document.getElementById('ex1').value) || 0;
    const td2 = parseFloat(document.getElementById('td2').value) || 0;
    const ex2 = parseFloat(document.getElementById('ex2').value) || 0;
    const td3 = parseFloat(document.getElementById('td3').value) || 0;
    const ex3 = parseFloat(document.getElementById('ex3').value) || 0;

    // Formulas: TD 40% + Exam 60%
    const avg1 = (td1 * 0.4) + (ex1 * 0.6);
    const avg2 = (td2 * 0.4) + (ex2 * 0.6);
    const avg3 = (td3 * 0.4) + (ex3 * 0.6);

    document.getElementById('avg1').textContent = `${avg1.toFixed(2)} / 20`;
    document.getElementById('avg2').textContent = `${avg2.toFixed(2)} / 20`;
    document.getElementById('avg3').textContent = `${avg3.toFixed(2)} / 20`;

    // Coefficients: CS201 (coeff 3), ISIL202 (coeff 3), CS304 (coeff 2) -> Total 8
    const totalWeighted = (avg1 * 3) + (avg2 * 3) + (avg3 * 2);
    const overallGpa = totalWeighted / 8;

    const totalGpaScore = document.getElementById('totalGpaScore');
    if (totalGpaScore) {
      totalGpaScore.textContent = `${overallGpa.toFixed(2)} / 20`;
    }

    const statusTag = document.querySelector('.res-status-tag');
    if (statusTag) {
      if (overallGpa >= 10.0) {
        statusTag.textContent = 'STATUS: ADMIS (COMPENSATION VALIDATED)';
        statusTag.style.color = 'var(--text-green)';
        statusTag.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        statusTag.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      } else {
        statusTag.textContent = 'STATUS: RATTRAPAGE REQUIRED (< 10.0)';
        statusTag.style.color = '#EF4444';
        statusTag.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        statusTag.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      }
    }
  }

  inputs.forEach(input => {
    input.addEventListener('input', calculate);
  });
}

/* ========================================================
   6. 1-CLICK CLIPBOARD COPY HANDLERS
   ======================================================== */
function initClipboardHandlers() {
  const copyTriggers = document.querySelectorAll('.copy-trigger');

  copyTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.backgroundColor = 'var(--accent-blue)';
        btn.style.color = '#FFFFFF';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 1800);
      }).catch(err => {
        console.error('Clipboard copy error:', err);
      });
    });
  });
}

/* ========================================================
   7. CONTACT TRANSMISSION FORM
   ======================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitMsgBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Please fill out all required transmission parameters.';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting...</span> <span class="pulse-indicator"></span>';
    }

    // Simulate sending transmission
    setTimeout(() => {
      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.textContent = `✓ Transmission received, ${name}. Direct handshake routed to noureddinekhelfaoui64@gmail.com!`;
      }
      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Message Dispatched ✓</span>';
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Dispatch Message</span> <span class="btn-arrow">➔</span>';
        }, 3000);
      }
      showToast('Transmission dispatched to Noureddine Khelfaoui');
    }, 800);
  });
}

/* ========================================================
   8. ANTI-GRAVITY TILT & MOUSE GLOW REFLECTION EFFECT
   ======================================================== */
function initAntiGravityCardGlow() {
  const cards = document.querySelectorAll('.anti-gravity-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ========================================================
   9. TOAST NOTIFICATION SYSTEM
   ======================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 20 20" fill="#3B82F6" width="16" height="16">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2800);
}
