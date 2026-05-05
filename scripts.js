// ============================================================
// MAIN SCRIPT (originally first inline <script> block)
// ============================================================
// --- PDF.js setup ---------------------------------------------
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// --- PHT Clock -----------------------------------------------
function updateClock() {
  const now = new Date();
  const pht = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
  const h = pht.getHours(), m = pht.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  const mm = String(m).padStart(2, '0');
  document.getElementById('navTime').textContent = `PHT ${hh}:${mm} ${ampm}`;
}
updateClock();
setInterval(updateClock, 30000);

// --- Nav Active + Pill Indicator -----------------------------
const navLinks = document.querySelectorAll('.nav-links a');
const navPill = document.getElementById('navPill');
const navLinksList = document.querySelector('.nav-links');

function movePill(el) {
  const listRect = navLinksList.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  navPill.style.left = (elRect.left - listRect.left) + 'px';
  navPill.style.width = elRect.width + 'px';
  navPill.style.opacity = '1';
}

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => movePill(link));
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    movePill(link);
  });
});

navLinksList.addEventListener('mouseleave', () => {
  const active = document.querySelector('.nav-links a.active');
  if (active) movePill(active);
  else navPill.style.opacity = '0';
});

window.addEventListener('load', () => {
  const active = document.querySelector('.nav-links a.active');
  if (active) movePill(active);
});

// Scroll spy
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        if (l.getAttribute('href') === '#' + id) movePill(l);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// --- Scroll Fade-Up Animations -------------------------------
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => fadeObserver.observe(el));

// --- Tool Marquee ---------------------------------------------
const tools = [
  { file: 'assets/tool-logos/tool-logo-google-docs.png', label: 'Google Docs' },
  { file: 'assets/tool-logos/tool-logo-google-sheets.png', label: 'Google Sheets' },
  { file: 'assets/tool-logos/tool-logo-microsoft-excel.png', label: 'Microsoft Excel' },
  { file: 'assets/tool-logos/tool-logo-microsoft-word.png', label: 'Microsoft Word' },
  { file: 'assets/tool-logos/tool-logo-google-drive.png', label: 'Google Drive' },
  { file: 'assets/tool-logos/tool-logo-gmail.png', label: 'Gmail' },
  { file: 'assets/tool-logos/tool-logo-google-calendar.png', label: 'Google Calendar' },
  { file: 'assets/tool-logos/tool-logo-canva.png', label: 'Canva' },
  { file: 'assets/tool-logos/tool-logo-capcut.png', label: 'CapCut' },
  { file: 'assets/tool-logos/tool-logo-trello.png', label: 'Trello' },
  { file: 'assets/tool-logos/tool-logo-google-meet.png', label: 'Google Meet' },
  { file: 'assets/tool-logos/tool-logo-zoom.png', label: 'Zoom' },
  { file: 'assets/tool-logos/tool-logo-chatgpt.png', label: 'ChatGPT' },
  { file: 'assets/tool-logos/tool-logo-claude.png', label: 'Claude AI' },
  { file: 'assets/tool-logos/tool-logo-codex.png', label: 'Codex' },
  { file: 'assets/tool-logos/tool-logo-gemini.png', label: 'Gemini' },
  { file: 'assets/tool-logos/tool-logo-github.png', label: 'GitHub' },
  { file: 'assets/tool-logos/tool-logo-grammarly.png', label: 'Grammarly' },
  { file: 'assets/tool-logos/tool-logo-discord.png', label: 'Discord' },
  { file: 'assets/tool-logos/tool-logo-whatsapp.png', label: 'WhatsApp' },
  { file: 'assets/tool-logos/tool-logo-instagram.png', label: 'Instagram' },
  { file: 'assets/tool-logos/tool-logo-facebook.png', label: 'Facebook' },
  { file: 'assets/tool-logos/tool-logo-linkedin.png', label: 'LinkedIn' },
  { file: 'assets/tool-logos/tool-logo-youtube.png', label: 'YouTube' },
  { file: 'assets/tool-logos/tool-logo-pinterest.png', label: 'Pinterest' },
];

function buildMarquee() {
  const track = document.getElementById('marqueeTrack');
  const doubled = [...tools, ...tools];
  doubled.forEach(tool => {
    const bubble = document.createElement('div');
    bubble.className = 'tool-bubble';
    bubble.setAttribute('role', 'listitem');
    bubble.innerHTML = `<div class="tool-logo-wrap"><img src="${tool.file}" alt="${tool.label} logo" loading="lazy"></div><span class="tool-label">${tool.label}</span>`;
    track.appendChild(bubble);
  });
}
buildMarquee();

// --- Popup Helpers -------------------------------------------
function openPopup(id) {
  const el = document.getElementById(id);
  el.classList.add('active');
  document.body.style.overflow = 'hidden';
  el.addEventListener('click', function handler(e) {
    if (e.target === el) { closePopup(id); el.removeEventListener('click', handler); }
  });
}

function closePopup(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup-backdrop.active').forEach(p => p.classList.remove('active'));
    document.body.style.overflow = '';
  }
});

document.querySelectorAll('.work-card[role="button"]').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });
});

// --- Published Work ------------------------------------------
function openPublishedWork() { openPopup('publishedWorkPopup'); }

// --- Graphic Design ------------------------------------------
function openGraphicDesign() {
  closePopup('emailMarketingPopup');
  closePopup('graphicMockupsPopup');
  openPopup('graphicDesignPopup');
}

function openEmailMarketing() {
  closePopup('graphicDesignPopup');
  openPopup('emailMarketingPopup');
}

// Graphic Mockups carousel
const mockupImages = [
  { src: 'assets/samples/graphics/graphic-food-02-boba-flavors-poster.png', alt: 'Boba Flavors Poster' },
  { src: 'assets/samples/graphics/graphic-food-03-chocolate-chip-cookie-poster.png', alt: 'Chocolate Chip Cookie Poster' },
  { src: 'assets/samples/graphics/graphic-sst-13-combo-deals-poster.png', alt: 'SerendipiTea Combo Deals Poster' },
  { src: 'assets/samples/graphics/graphic-sst-14-launch-poster.png', alt: 'SerendipiTea Launch Poster' },
  { src: 'assets/samples/graphics/graphic-logo-01-sweet-serendipitea-gold-mark.png', alt: 'Sweet SerendipiTea Logo Mark' },
  { src: 'assets/samples/graphics/graphic-sst-05-crowd-favorites-poster.png', alt: 'Crowd Favorites Poster' },
];
let mockupIdx = 0;

function renderMockupDots() {
  const dotsEl = document.getElementById('mockupDots');
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  mockupImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'popup-dot' + (i === mockupIdx ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Image ${i+1}`);
    dot.onclick = () => { mockupIdx = i; updateMockup(); };
    dotsEl.appendChild(dot);
  });
  const el = document.getElementById('mockupProgressText');
  if (el) el.textContent = `${mockupIdx + 1} of ${mockupImages.length}`;
}

function updateMockup() {
  const img = document.getElementById('mockupImg');
  img.src = mockupImages[mockupIdx].src;
  img.alt = mockupImages[mockupIdx].alt;
  document.getElementById('mockupPrev').classList.toggle('hidden', mockupIdx === 0);
  document.getElementById('mockupNext').classList.toggle('hidden', mockupIdx === mockupImages.length - 1);
  renderMockupDots();
}

function mockupNav(dir) { mockupIdx = Math.max(0, Math.min(mockupImages.length-1, mockupIdx + dir)); updateMockup(); }

function openGraphicMockups() {
  closePopup('graphicDesignPopup');
  mockupIdx = 0;
  updateMockup();
  openPopup('graphicMockupsPopup');
}

// --- PDF.js Custom Viewer -------------------------------------
const twDocs = [
  { src: 'assets/samples/technical-writing/technical-writing-01-unesco-mun-master-rapporteur-log-page-01.jpg', title: 'UNESCO MUN Master Rapporteur Log' },
  { src: 'assets/samples/technical-writing/technical-writing-02-secure-client-onboarding-case-study-page-01.jpg', title: 'Secure Client Onboarding Case Study' },
];
let twDocIdx = 0;
let twPdfDoc = null;
let twCurrentPage = 1;
let twTotalPages = 1;
let twScale = 1.4;
let twRenderTask = null;

async function loadTWDoc(idx) {
  twDocIdx = idx;
  twCurrentPage = 1;
  twPdfDoc = null;

  // Update tabs
  document.querySelectorAll('.tw-tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
    t.setAttribute('aria-selected', i === idx);
  });

  // Update title
  const titleEl = document.getElementById('twDocTitle');
  if (titleEl) titleEl.textContent = twDocs[idx].title;

  const progEl = document.getElementById('twDocProgressText');
  if (progEl) progEl.textContent = `Document ${idx + 1} of ${twDocs.length}`;

  // Load PDF
  if (typeof pdfjsLib === 'undefined') {
    document.getElementById('twCanvasArea').innerHTML = '<div style="padding:40px; text-align:center; color:#999; font-family:var(--font-sans);">PDF viewer loading...</div>';
    return;
  }

  try {
    const loadingTask = pdfjsLib.getDocument(twDocs[idx].src);
    twPdfDoc = await loadingTask.promise;
    twTotalPages = twPdfDoc.numPages;
    await renderTWPage(1);
  } catch(e) {
    console.error('PDF load error:', e);
    document.getElementById('twCanvasArea').innerHTML = '<div style="padding:40px; text-align:center; color:#999; font-family:var(--font-sans);">Open the Technical Writing card to view the scrollable JPG page stack.</div>';
  }
}

async function renderTWPage(pageNum) {
  if (!twPdfDoc) return;
  twCurrentPage = Math.max(1, Math.min(twTotalPages, pageNum));

  // Update UI
  const pageInfo = document.getElementById('twPageInfo');
  if (pageInfo) pageInfo.textContent = `Page ${twCurrentPage} / ${twTotalPages}`;

  const prevBtn = document.getElementById('twPrevBtn');
  const nextBtn = document.getElementById('twNextBtn');
  if (prevBtn) prevBtn.disabled = twCurrentPage <= 1;
  if (nextBtn) nextBtn.disabled = twCurrentPage >= twTotalPages;

  // Progress fill
  const fill = document.getElementById('twProgressFill');
  if (fill) fill.style.width = ((twCurrentPage / twTotalPages) * 100) + '%';

  // Cancel any existing render
  if (twRenderTask) { try { twRenderTask.cancel(); } catch(e){} }

  const page = await twPdfDoc.getPage(twCurrentPage);
  const canvasArea = document.getElementById('twCanvasArea');
  const availWidth = Math.max(canvasArea.clientWidth - 32, 400);
  const viewport = page.getViewport({ scale: 1 });
  const scale = Math.min(twScale, availWidth / viewport.width);
  const scaledViewport = page.getViewport({ scale });

  const canvas = document.getElementById('twMainCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = scaledViewport.width;
  canvas.height = scaledViewport.height;
  canvas.style.width = scaledViewport.width + 'px';
  canvas.style.height = scaledViewport.height + 'px';

  const renderContext = { canvasContext: ctx, viewport: scaledViewport };
  twRenderTask = page.render(renderContext);

  try {
    await twRenderTask.promise;
    // Scroll to top on page change
    canvasArea.scrollTop = 0;
  } catch(e) {
    if (e.name !== 'RenderingCancelledException') console.error(e);
  }
}

async function renderTWPreviewCard() {
  // Render first page of first PDF for the card preview
  if (typeof pdfjsLib === 'undefined') return;
  try {
    const loadingTask = pdfjsLib.getDocument(twDocs[0].src);
    const pdfDoc = await loadingTask.promise;
    const page = await pdfDoc.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const targetH = 196;
    const scale = targetH / viewport.height;
    const scaledViewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    canvas.style.height = '100%';
    canvas.style.width = 'auto';
    canvas.style.maxWidth = '100%';
    canvas.style.borderRadius = '3px';
    canvas.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
    canvas.style.transition = 'transform 0.5s cubic-bezier(0.22,0.84,0.2,1)';
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    const wrap = document.getElementById('twCardPreview');
    if (wrap) {
      wrap.innerHTML = '';
      wrap.appendChild(canvas);
      // hover zoom
      const parentCard = wrap.closest('.work-card');
      if (parentCard) {
        parentCard.addEventListener('mouseenter', () => { canvas.style.transform = 'scale(1.04)'; });
        parentCard.addEventListener('mouseleave', () => { canvas.style.transform = 'scale(1)'; });
      }
    }
  } catch(e) {
    console.error('Card preview error:', e);
  }
}

function twPageNav(dir) {
  if (twPdfDoc) renderTWPage(twCurrentPage + dir);
}

function twZoom(delta) {
  twScale = Math.max(0.6, Math.min(3.0, twScale + delta));
  if (twPdfDoc) renderTWPage(twCurrentPage);
}

function twFitWidth() {
  twScale = 1.4;
  if (twPdfDoc) renderTWPage(twCurrentPage);
}

function switchTWTab(idx) { loadTWDoc(idx); }

function openTechnicalWriting() {
  openPopup('technicalWritingPopup');
  // Slight delay so popup is visible before PDF renders
  setTimeout(() => loadTWDoc(0), 80);
}

// --- Workflow ------------------------------------------------
const workflowImages = [
  { src: 'assets/samples/workflows/workflow-01-trello-board-overview.png', alt: 'Trello Social Media Management Hub' },
  { src: 'assets/samples/workflows/workflow-02-google-calendar-overview.png', alt: 'Google Calendar June 2026 Overview' },
];
let workflowIdx = 0;

function renderWorkflowDots() {
  const dotsEl = document.getElementById('workflowDots');
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  workflowImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'popup-dot' + (i === workflowIdx ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Workflow ${i+1}`);
    dot.onclick = () => { workflowIdx = i; updateWorkflow(); };
    dotsEl.appendChild(dot);
  });
  const el = document.getElementById('workflowProgressText');
  if (el) el.textContent = `View ${workflowIdx + 1} of ${workflowImages.length}`;
}

function updateWorkflow() {
  const img = document.getElementById('workflowImg');
  img.src = workflowImages[workflowIdx].src;
  img.alt = workflowImages[workflowIdx].alt;
  document.getElementById('workflowPrev').classList.toggle('hidden', workflowIdx === 0);
  document.getElementById('workflowNext').classList.toggle('hidden', workflowIdx === workflowImages.length - 1);
  renderWorkflowDots();
}

function workflowNav(dir) { workflowIdx = Math.max(0, Math.min(workflowImages.length-1, workflowIdx+dir)); updateWorkflow(); }

function openWorkflow() {
  workflowIdx = 0;
  updateWorkflow();
  openPopup('workflowPopup');
}

// --- Social Media Strategy -----------------------------------
const smsTabs = [
  { src: 'social-strategy-lucky-beauty-case-study.html', title: 'Lucky Beauty - Case Study' },
  { src: 'social-strategy-sweet-serendipitea-case-study.html', title: 'Sweet SerendipiTea - Case Study' },
];
let smsIdx = 0;

function switchSMSTab(idx) {
  smsIdx = idx;
  document.querySelectorAll('.sms-tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
    t.setAttribute('aria-selected', i === idx);
  });
  document.getElementById('smsFrame').src = smsTabs[idx].src;
  const titleEl = document.getElementById('smsTabTitle');
  if (titleEl) titleEl.textContent = smsTabs[idx].title;
  const prog = `Case Study ${idx + 1} of ${smsTabs.length}`;
  const p1 = document.getElementById('smsProgressText');
  const p2 = document.getElementById('smsToolbarProgress');
  if (p1) p1.textContent = prog;
  if (p2) p2.textContent = prog;
}

function openSocialStrategy() {
  smsIdx = 0;
  switchSMSTab(0);
  openPopup('socialStrategyPopup');
}

// --- Credential Popup ----------------------------------------
function openCredential(imgSrc, title) {
  document.getElementById('credPopupTitle').textContent = title;
  document.getElementById('credPopupImg').src = imgSrc;
  document.getElementById('credPopupImg').alt = title + ' credential certificate';
  openPopup('credentialPopup');
}

// --- Letter Popup --------------------------------------------
const letterPages = [
  { src: 'assets/samples/endorsements/endorsement-credential-letter-01.jpg', alt: 'Credential Letter Page 1' },
  { src: 'assets/samples/endorsements/endorsement-credential-letter-02.jpg', alt: 'Credential Letter Page 2' },
];
let letterIdx = 0;

function renderLetterDots() {
  const dotsEl = document.getElementById('letterDots');
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  letterPages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'popup-dot' + (i === letterIdx ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Page ${i+1}`);
    dot.onclick = () => { letterIdx = i; updateLetter(); };
    dotsEl.appendChild(dot);
  });
  const el = document.getElementById('letterProgressText');
  if (el) el.textContent = `Page ${letterIdx + 1} of ${letterPages.length}`;
}

function updateLetter() {
  const wrap = document.getElementById('letterImgWrap');
  const page = letterPages[letterIdx];
  const img = document.createElement('img');
  img.src = page.src;
  img.alt = page.alt;
  img.style.maxWidth = '480px';
  img.style.maxHeight = '620px';
  img.style.width = '100%';
  img.style.objectFit = 'contain';
  img.style.borderRadius = '12px';
  img.style.boxShadow = '0 4px 24px rgba(0,0,0,0.1)';
  img.onerror = function() {
    wrap.innerHTML = '<div class="letter-missing">Credential letter image will be available soon.</div>';
  };
  wrap.innerHTML = '';
  wrap.appendChild(img);
  document.getElementById('letterPrev').classList.toggle('hidden', letterIdx === 0);
  document.getElementById('letterNext').classList.toggle('hidden', letterIdx === letterPages.length - 1);
  renderLetterDots();
}

function letterNav(dir) { letterIdx = Math.max(0, Math.min(letterPages.length-1, letterIdx+dir)); updateLetter(); }

function openLetterPopup() {
  letterIdx = 0;
  updateLetter();
  openPopup('letterPopup');
}

// --- Init on load ---------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  renderMockupDots();
  renderWorkflowDots();
  renderLetterDots();
  // Render TW card preview using PDF.js
  if (typeof pdfjsLib !== 'undefined') {
    renderTWPreviewCard();
  }
  // Init progress texts
  const p1 = document.getElementById('smsProgressText');
  const p2 = document.getElementById('smsToolbarProgress');
  if (p1) p1.textContent = 'Case Study 1 of 2';
  if (p2) p2.textContent = 'Case Study 1 of 2';
});

// ============================================================
// CARD POPUPS (originally second inline <script> block)
// ============================================================
/* Final repair pass: fixes Claude's stale asset paths and viewer behavior. */
(function () {
  const $ = (id) => document.getElementById(id);
  const img = (src, alt) => ({ src, alt: alt || '' });

  const graphicGroups = [
    {
      key: 'email',
      label: 'Email Marketing Ads',
      note: '2 scrollable email campaign layouts',
      mode: 'scroll',
      items: [
        img('assets/samples/graphics/graphic-email-01-romand-gloss-moderne-layout.jpg', 'Romand Gloss Moderne email marketing layout'),
        img('assets/samples/graphics/graphic-email-02-international-model-united-nations-layout.jpg', 'International Model United Nations email marketing layout')
      ]
    },
    {
      key: 'promotional',
      label: 'Promotional Posters',
      note: '2 event and travel promotion posters',
      mode: 'spotlight',
      items: [
        img('assets/samples/graphics/graphic-promotional-01-imun-vietnam-poster.png', 'IMUN Vietnam promotional poster'),
        img('assets/samples/graphics/graphic-promotional-02-tripcom-world-tour-sale-poster.png', 'Trip.com world tour sale poster')
      ]
    },
    {
      key: 'beauty',
      label: 'Beauty Posters',
      note: '2 Lucky Beauty and care-line product posters',
      mode: 'spotlight',
      items: [
        img('assets/samples/graphics/graphic-beauty-01-lucky-beauty-product-poster.png', 'Lucky Beauty product poster'),
        img('assets/samples/graphics/graphic-beauty-02-care-line-product-poster.png', 'Careline product poster')
      ]
    },
    {
      key: 'food',
      label: 'Standalone Food Posters',
      note: '3 food and beverage poster concepts',
      mode: 'spotlight',
      items: [
        img('assets/samples/graphics/graphic-food-01-smokehouse-rib-platter.png', 'Smokehouse rib platter poster'),
        img('assets/samples/graphics/graphic-food-02-boba-flavors-poster.png', 'Boba flavors poster'),
        img('assets/samples/graphics/graphic-food-03-chocolate-chip-cookie-poster.png', 'Chocolate chip cookie poster')
      ]
    },
    {
      key: 'sst',
      label: 'Sweet SerendipiTea Designs',
      note: '14 brand, product, menu, and campaign visuals',
      mode: 'spotlight',
      items: [
        img('assets/samples/graphics/graphic-sst-01-menu-board.png', 'Sweet SerendipiTea menu board'),
        img('assets/samples/graphics/graphic-sst-02-menu-poster.png', 'Sweet SerendipiTea menu poster'),
        img('assets/samples/graphics/graphic-sst-03-holiday-treats-promo.png', 'Holiday treats promo'),
        img('assets/samples/graphics/graphic-sst-04-wintermelon-milktea-poster.png', 'Wintermelon milk tea poster'),
        img('assets/samples/graphics/graphic-sst-05-crowd-favorites-poster.png', 'Crowd favorites poster'),
        img('assets/samples/graphics/graphic-sst-06-brand-stationery-mockup.png', 'Brand stationery mockup'),
        img('assets/samples/graphics/graphic-sst-07-paper-bag-mockup.png', 'Paper bag mockup'),
        img('assets/samples/graphics/graphic-sst-08-limited-mugs-promo.png', 'Limited mugs promo'),
        img('assets/samples/graphics/graphic-sst-09-tumbler-promo.png', 'Tumbler promo'),
        img('assets/samples/graphics/graphic-sst-10-packaging-teaser.png', 'Packaging teaser'),
        img('assets/samples/graphics/graphic-sst-11-limited-mugs-model-promo.png', 'Limited mugs model promo'),
        img('assets/samples/graphics/graphic-sst-12-calendar-journal-promo.png', 'Calendar journal promo'),
        img('assets/samples/graphics/graphic-sst-13-combo-deals-poster.png', 'Combo deals poster'),
        img('assets/samples/graphics/graphic-sst-14-launch-poster.png', 'Launch poster')
      ]
    },
    {
      key: 'logos',
      label: 'Logos',
      note: '4 Sweet SerendipiTea logo mark variations',
      mode: 'spotlight',
      items: [
        img('assets/samples/graphics/graphic-logo-01-sweet-serendipitea-gold-mark.png', 'Sweet SerendipiTea gold logo mark'),
        img('assets/samples/graphics/graphic-logo-02-sweet-serendipitea-rose-mark.png', 'Sweet SerendipiTea rose logo mark'),
        img('assets/samples/graphics/graphic-logo-03-sweet-tea-logo-mark.png', 'Sweet Tea logo mark'),
        img('assets/samples/graphics/graphic-logo-04-sweet-serendipitea-dark-mark.png', 'Sweet SerendipiTea dark logo mark')
      ]
    },
    {
      key: 'book',
      label: 'Book Covers',
      note: '12 story-linked original and published fiction visuals',
      mode: 'spotlight',
      items: [
        img('assets/samples/graphics/graphic-book-cover-01-the-river-that-grants-wishes-cover.png', 'The River That Grants Wishes award-winning story cover'),
        img('assets/samples/graphics/graphic-book-cover-02-the-river-that-grants-wishes-book-display.png', 'The River That Grants Wishes book display'),
        img('assets/samples/graphics/graphic-book-cover-03-natures-wildest-creatures-cover.png', "Nature's Wildest Creatures award-winning story cover"),
        img('assets/samples/graphics/graphic-book-cover-04-natures-wildest-creatures-book-display.png', "Nature's Wildest Creatures book display"),
        img('assets/samples/graphics/graphic-book-cover-05-wretched-fate-cover.png', 'Wretched Fate original story cover'),
        img('assets/samples/graphics/graphic-book-cover-06-wretched-fate-book-display.png', 'Wretched Fate book display'),
        img('assets/samples/graphics/graphic-book-cover-07-clairvoyants-fate-cover.png', "Clairvoyant's Fate original story cover"),
        img('assets/samples/graphics/graphic-book-cover-08-clairvoyants-fate-book-display.png', "Clairvoyant's Fate book display"),
        img('assets/samples/graphics/graphic-book-cover-09-aurelian-secrets-of-selene-cover.png', 'Aurelian Secrets of Selene rebranded cover'),
        img('assets/samples/graphics/graphic-book-cover-10-aurelian-secrets-of-selene-book-display.png', 'Aurelian Secrets of Selene book display'),
        img('assets/samples/graphics/graphic-book-cover-11-aurelian-secrets-of-selene-full-wrap.png', 'Aurelian Secrets of Selene full wrap'),
        img('assets/samples/graphics/graphic-book-cover-12-clairvoyants-fate-full-wrap.png', "Clairvoyant's Fate full wrap")
      ]
    }
  ];

  const technicalDocs = [
    {
      label: 'UNESCO MUN Rapporteur Log',
      title: 'UNESCO MUN Master Rapporteur Log',
      pages: Array.from({ length: 10 }, (_, i) => img(`technical-writing-01-unesco-mun-master-rapporteur-log-page-${String(i + 1).padStart(2, '0')}.jpg`, `UNESCO MUN Rapporteur Log page ${i + 1}`))
    },
    {
      label: 'Secure Client Onboarding',
      title: 'Secure Client Onboarding Case Study',
      pages: Array.from({ length: 3 }, (_, i) => img(`technical-writing-02-secure-client-onboarding-case-study-page-${String(i + 1).padStart(2, '0')}.jpg`, `Secure Client Onboarding page ${i + 1}`))
    }
  ];

  const smsTabsFinal = [
    { src: 'social-strategy-lucky-beauty-case-study.html', title: 'Lucky Beauty - Case Study' },
    { src: 'social-strategy-sweet-serendipitea-case-study.html', title: 'Sweet SerendipiTea - Case Study' }
  ];

  const workflowFinal = [
    { src: 'assets/samples/workflows/workflow-01-trello-board-overview.png', title: 'Trello Workflow' },
    { src: 'assets/samples/workflows/workflow-02-google-calendar-overview.png', title: 'Google Calendar System' }
  ];

  const writingCerts = [
    img('assets/samples/writing-awards/writing-award-certificate-01-the-river-that-grants-wishes.jpg', 'Writing award certificate for The River That Grants Wishes'),
    img('assets/samples/writing-awards/writing-award-certificate-02-natures-wildest-creatures.jpg', "Writing award certificate for Nature's Wildest Creatures")
  ];

  const recognitionCerts = [
    img('assets/samples/endorsements/endorsement-certificate-recognition-01.jpg', 'Certificate of recognition 1'),
    img('assets/samples/endorsements/endorsement-certificate-recognition-02.jpg', 'Certificate of recognition 2')
  ];

  const behindScenes = [
    img('assets/samples/endorsements/endorsement-behind-scenes-philippines-02.jpg', 'Behind the scenes in the Philippines'),
    img('assets/samples/endorsements/endorsement-behind-scenes-vietnam-01.jpg', 'Behind the scenes in Vietnam')
  ];

  let graphicKey = 'email';
  let graphicIdx = 0;
  let smsIdxFinal = 0;
  let workflowIdxFinal = 0;
  let letterIdxFinal = 0;
  let writingCertIdx = 0;
  let recogIdx = 0;

  function setHTML(id, html) {
    const el = $(id);
    if (el) el.innerHTML = html;
  }

  function makeButtons(items, active, handlerName, className) {
    return items.map((item, i) => `<button class="${className} ${i === active ? 'active' : ''}" onclick="${handlerName}(${i})" role="tab" aria-selected="${i === active}">${item.label || item.title}</button>`).join('');
  }

  function imageError(el, message) {
    const wrap = el.parentElement;
    if (wrap) wrap.innerHTML = `<div class="repair-missing">${message || 'Asset missing. Please check the filename.'}</div>`;
  }

  function updateWorkCards() {
    const cards = document.querySelectorAll('.works-grid .work-card');
    if (cards[1]) {
      cards[1].setAttribute('aria-label', 'View Graphic Design samples - 39 visual samples');
      const badge = cards[1].querySelector('.work-card-badge');
      if (badge) badge.textContent = '39 Samples';
      const cat = cards[1].querySelector('.work-category');
      if (cat) cat.textContent = 'Design - Campaigns, Covers & Brand Visuals';
      const desc = cards[1].querySelector('.work-desc');
      if (desc) desc.textContent = 'A categorized visual library covering email ads, promotional posters, beauty posters, food posters, Sweet SerendipiTea designs, logos, and story-linked book covers.';
    }
    if (cards[2]) {
      const preview = $('twCardPreview');
      if (preview) preview.innerHTML = '<img src="assets/samples/technical-writing/technical-writing-01-unesco-mun-master-rapporteur-log-page-01.jpg" alt="Technical writing preview" style="height:100%; width:auto; max-width:100%; object-fit:contain; object-position:top; border-radius:3px; box-shadow:0 2px 12px rgba(0,0,0,0.10);">';
    }
    if (cards[4]) {
      cards[4].setAttribute('aria-label', 'View Social Media Strategy - 2 HTML case studies');
      const hiddenOld = cards[4].querySelector('img[src*="lily"]');
      if (hiddenOld) hiddenOld.remove();
      const preview = $('smsCardPreview');
      if (preview) preview.innerHTML = '<div class="case-study-fallback"><span>Lucky Beauty</span><strong>Case Study</strong><small>HTML Strategy Mock-Up</small></div>';
      const badge = cards[4].querySelector('.work-card-badge');
      if (badge) badge.textContent = '2 Case Studies';
      const desc = cards[4].querySelector('.work-desc');
      if (desc) desc.textContent = 'Two HTML strategy case studies only: Lucky Beauty and Sweet SerendipiTea, with posters kept under Graphic Design.';
    }
  }

  function rebuildPublishedPopup() {
    setHTML('publishedWorkPopup', `
      <div class="popup-shell" style="max-width:980px;">
        <button class="popup-close" onclick="closePopup('publishedWorkPopup')" aria-label="Close">&times;</button>
        <div class="popup-body">
          <p class="popup-category">Published Work & Writing Awards</p>
          <h3 class="popup-title">Published Fiction and Proof of Writing Awards</h3>
          <p class="popup-desc">A published Webnovel work paired with certificates for award-winning original story pieces.</p>
          <div class="repair-tabs">
            <button class="repair-pill active" onclick="showPublishedWork()">View Work</button>
            <button class="repair-pill" onclick="showWritingCertificates()">View Writing Certificates</button>
          </div>
          <div id="publishedDynamic"></div>
        </div>
      </div>`);
    showPublishedWork();
  }

  window.showPublishedWork = function () {
    document.querySelectorAll('#publishedWorkPopup .repair-pill').forEach((b, i) => b.classList.toggle('active', i === 0));
    setHTML('publishedDynamic', `
      <div class="published-work-display">
        <img src="assets/samples/published-work/published-work-sorel-the-destined-mortal-book-display.png" alt="Sorel: The Destined Mortal book display" loading="lazy">
        <a href="https://www.webnovel.com/book/sorel-the-destined-mortal-10000-b.c-ago_18953646406857505" target="_blank" rel="noopener" class="btn-view-sorel">Read on Webnovel</a>
      </div>
      <p class="repair-note">Sorel: The Destined Mortal is a published long-form fiction work, not a decorative mockup.</p>`);
  };

  window.showWritingCertificates = function () {
    document.querySelectorAll('#publishedWorkPopup .repair-pill').forEach((b, i) => b.classList.toggle('active', i === 1));
    writingCertIdx = 0;
    renderSimpleCarousel('publishedDynamic', writingCerts, writingCertIdx, 'writingCertNav', 'Writing certificate');
  };

  window.writingCertNav = function (dir) {
    writingCertIdx = Math.max(0, Math.min(writingCerts.length - 1, writingCertIdx + dir));
    renderSimpleCarousel('publishedDynamic', writingCerts, writingCertIdx, 'writingCertNav', 'Writing certificate');
  };

  function rebuildGraphicPopup() {
    setHTML('graphicDesignPopup', `
      <div class="popup-shell repair-large-shell">
        <button class="popup-close" onclick="closePopup('graphicDesignPopup')" aria-label="Close">&times;</button>
        <div class="popup-body">
          <p class="popup-category">Graphic Design</p>
          <h3 class="popup-title">Categorized Visual Samples</h3>
          <p class="popup-desc">A curated, non-crowded library grouped by context so the samples read as intentional work instead of random uploads.</p>
          <div class="repair-tabs repair-tabs-wrap" id="graphicCategoryTabs"></div>
          <div id="graphicDynamic"></div>
        </div>
      </div>`);
    selectGraphicCategory(0);
  }

  window.selectGraphicCategory = function (idx) {
    const group = graphicGroups[idx];
    graphicKey = group.key;
    graphicIdx = 0;
    setHTML('graphicCategoryTabs', graphicGroups.map((g, i) => `<button class="repair-pill ${i === idx ? 'active' : ''}" onclick="selectGraphicCategory(${i})">${g.label}</button>`).join(''));
    renderGraphicGroup(group);
  };

  function renderGraphicGroup(group) {
    if (group.mode === 'scroll') {
      setHTML('graphicDynamic', `
        <div class="repair-meta"><strong>${group.label}</strong><span>${group.note}</span></div>
        <div class="repair-scroll-row">
          ${group.items.map((it) => `<div class="repair-scroll-card"><img src="${it.src}" alt="${it.alt}" loading="lazy" onerror="imageError(this)"></div>`).join('')}
        </div>`);
      return;
    }
    renderGraphicSpotlight(group);
  }

  function renderGraphicSpotlight(group) {
    const item = group.items[graphicIdx];
    setHTML('graphicDynamic', `
      <div class="repair-meta"><strong>${group.label}</strong><span>${group.note} - ${graphicIdx + 1} of ${group.items.length}</span></div>
      <div class="repair-spotlight">
        <button class="popup-arrow prev ${graphicIdx === 0 ? 'hidden' : ''}" onclick="graphicSpotlightNav(-1)" aria-label="Previous image">&#8592;</button>
        <img src="${item.src}" alt="${item.alt}" loading="lazy" onerror="imageError(this)">
        <button class="popup-arrow next ${graphicIdx === group.items.length - 1 ? 'hidden' : ''}" onclick="graphicSpotlightNav(1)" aria-label="Next image">&#8594;</button>
      </div>
      ${group.key === 'book' ? '<p class="repair-note">These covers represent original written stories and published-fiction concepts, including award-winning pieces from senior high school and the Sorel/Aurelian rebrand.</p>' : ''}
      <div class="popup-dots">${group.items.map((_, i) => `<button class="popup-dot ${i === graphicIdx ? 'active' : ''}" onclick="graphicSpotlightGo(${i})" aria-label="Image ${i + 1}"></button>`).join('')}</div>`);
  }

  window.graphicSpotlightNav = function (dir) {
    const group = graphicGroups.find((g) => g.key === graphicKey);
    graphicIdx = Math.max(0, Math.min(group.items.length - 1, graphicIdx + dir));
    renderGraphicSpotlight(group);
  };

  window.graphicSpotlightGo = function (idx) {
    const group = graphicGroups.find((g) => g.key === graphicKey);
    graphicIdx = idx;
    renderGraphicSpotlight(group);
  };

  function rebuildTechnicalPopup() {
    setHTML('technicalWritingPopup', `
      <div class="popup-shell repair-large-shell">
        <button class="popup-close" onclick="closePopup('technicalWritingPopup')" aria-label="Close">&times;</button>
        <div class="popup-body">
          <p class="popup-category">Documentation Sample</p>
          <h3 class="popup-title">Technical Writing</h3>
          <p class="popup-desc">Two formal documents shown as vertical scrollable JPG page stacks. No PDF viewer, no page arrows.</p>
          <div class="repair-tabs">
            ${makeButtons(technicalDocs, 0, 'switchTWTab', 'repair-pill')}
          </div>
          <div class="repair-doc-toolbar">
            <span id="twDocTitle">${technicalDocs[0].title}</span>
            <span class="tw-view-only-badge">View Only</span>
          </div>
          <div id="twImageStack" class="repair-page-stack"></div>
        </div>
      </div>`);
    switchTWTab(0);
  }

  window.switchTWTab = function (idx) {
    document.querySelectorAll('#technicalWritingPopup .repair-pill').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      t.setAttribute('aria-selected', i === idx);
    });
    const doc = technicalDocs[idx];
    const title = $('twDocTitle');
    if (title) title.textContent = doc.title;
    setHTML('twImageStack', doc.pages.map((page, i) => `
      <figure class="repair-page">
        <img src="${page.src}" alt="${page.alt}" loading="lazy" onerror="imageError(this)">
        <figcaption>Page ${i + 1} of ${doc.pages.length}</figcaption>
      </figure>`).join(''));
  };

  window.openTechnicalWriting = function () {
    rebuildTechnicalPopup();
    openPopup('technicalWritingPopup');
  };

  function rebuildWorkflowPopup() {
    setHTML('workflowPopup', `
      <div class="popup-shell repair-large-shell">
        <button class="popup-close" onclick="closePopup('workflowPopup')" aria-label="Close">&times;</button>
        <div class="popup-body">
          <p class="popup-category">Workflow View</p>
          <h3 class="popup-title">Workflow Systems</h3>
          <p class="popup-desc">Task management and scheduling setups for real client work. Phase 2 can swap in the expanded admin sample set later.</p>
          <div class="repair-tabs">${makeButtons(workflowFinal, workflowIdxFinal, 'selectWorkflowFinal', 'repair-pill')}</div>
          <div id="workflowDynamic"></div>
        </div>
      </div>`);
    selectWorkflowFinal(0);
  }

  window.selectWorkflowFinal = function (idx) {
    workflowIdxFinal = idx;
    document.querySelectorAll('#workflowPopup .repair-pill').forEach((t, i) => t.classList.toggle('active', i === idx));
    const item = workflowFinal[idx];
    setHTML('workflowDynamic', `
      <div class="repair-meta"><strong>${item.title}</strong><span>View ${idx + 1} of ${workflowFinal.length}</span></div>
      <div class="repair-spotlight repair-workflow">
        <img src="${item.src}" alt="${item.title}" loading="lazy" onerror="imageError(this, 'Workflow screenshot not in this zip yet. Add it in Phase 2, or keep this as a coming-soon slot.')">
      </div>`);
  };

  window.openWorkflow = function () {
    rebuildWorkflowPopup();
    openPopup('workflowPopup');
  };

  function rebuildSocialPopup() {
    setHTML('socialStrategyPopup', `
      <div class="popup-shell repair-html-shell">
        <button class="popup-close" onclick="closePopup('socialStrategyPopup')" aria-label="Close">&times;</button>
        <div class="popup-body">
          <p class="popup-category">Strategy Mock-Up</p>
          <h3 class="popup-title">Social Media Strategy Mock-Up</h3>
          <p class="popup-desc">Two HTML case studies only. Graphic posters remain under Graphic Design.</p>
          <div class="repair-tabs">${makeButtons(smsTabsFinal, 0, 'switchSMSTab', 'repair-pill')}</div>
          <div class="repair-meta"><strong id="smsTabTitle">${smsTabsFinal[0].title}</strong><span id="smsProgressText">Case Study 1 of 2</span></div>
          <div class="repair-iframe-frame">
            <iframe id="smsFrame" src="${smsTabsFinal[0].src}" title="Social Media Strategy case study" sandbox="allow-scripts allow-same-origin"></iframe>
          </div>
        </div>
      </div>`);
  }

  window.switchSMSTab = function (idx) {
    smsIdxFinal = idx;
    document.querySelectorAll('#socialStrategyPopup .repair-pill').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      t.setAttribute('aria-selected', i === idx);
    });
    const tab = smsTabsFinal[idx];
    const frame = $('smsFrame');
    if (frame) frame.src = tab.src;
    const title = $('smsTabTitle');
    if (title) title.textContent = tab.title;
    const prog = $('smsProgressText');
    if (prog) prog.textContent = `Case Study ${idx + 1} of ${smsTabsFinal.length}`;
  };

  window.openSocialStrategy = function () {
    rebuildSocialPopup();
    openPopup('socialStrategyPopup');
  };

  function rebuildLetterPopup() {
    const buttons = document.querySelector('.endorse-card .btn-view-letter');
    if (buttons && !document.querySelector('.endorse-card .btn-view-certificates')) {
      buttons.insertAdjacentHTML('afterend', '<button class="btn-view-letter btn-view-certificates" onclick="openRecognitionPopup()" aria-label="View certificates">View Certificates</button>');
    }
    if (!$('recognitionPopup')) {
      document.body.insertAdjacentHTML('beforeend', `
        <div class="popup-backdrop" id="recognitionPopup" role="dialog" aria-modal="true" aria-label="Recognition certificates viewer">
          <div class="popup-shell repair-large-shell">
            <button class="popup-close" onclick="closePopup('recognitionPopup')" aria-label="Close">&times;</button>
            <div class="popup-body">
              <p class="popup-category">Executive Endorsement</p>
              <h3 class="popup-title">Recognition Certificates</h3>
              <p class="popup-desc">Certificate proof from Vietnam and Manila, with behind-the-scenes event documentation below.</p>
              <div id="recognitionDynamic"></div>
              <div class="bts-grid">${behindScenes.map((it) => `<img src="${it.src}" alt="${it.alt}" loading="lazy" onerror="imageError(this)">`).join('')}<div class="bts-empty">Third photo slot ready</div></div>
            </div>
          </div>
        </div>`);
    }
  }

  function renderSimpleCarousel(targetId, items, idx, navName, label) {
    const it = items[idx];
    setHTML(targetId, `
      <div class="repair-meta"><strong>${label}</strong><span>${idx + 1} of ${items.length}</span></div>
      <div class="repair-spotlight">
        <button class="popup-arrow prev ${idx === 0 ? 'hidden' : ''}" onclick="${navName}(-1)" aria-label="Previous">&#8592;</button>
        <img src="${it.src}" alt="${it.alt}" loading="lazy" onerror="imageError(this)">
        <button class="popup-arrow next ${idx === items.length - 1 ? 'hidden' : ''}" onclick="${navName}(1)" aria-label="Next">&#8594;</button>
      </div>
      <div class="popup-dots">${items.map((_, i) => `<button class="popup-dot ${i === idx ? 'active' : ''}" onclick="${navName}(${i - idx})" aria-label="${label} ${i + 1}"></button>`).join('')}</div>`);
  }

  window.openRecognitionPopup = function () {
    recogIdx = 0;
    renderSimpleCarousel('recognitionDynamic', recognitionCerts, recogIdx, 'recognitionNav', 'Recognition certificate');
    openPopup('recognitionPopup');
  };

  window.recognitionNav = function (dir) {
    recogIdx = Math.max(0, Math.min(recognitionCerts.length - 1, recogIdx + dir));
    renderSimpleCarousel('recognitionDynamic', recognitionCerts, recogIdx, 'recognitionNav', 'Recognition certificate');
  };

  window.imageError = imageError;

  function injectRepairStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .repair-large-shell{max-width:min(1120px,92vw)!important;max-height:88vh!important}
      .repair-html-shell{max-width:min(1240px,94vw)!important;max-height:92vh!important}
      .repair-tabs{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0 18px}
      .repair-tabs-wrap{max-height:126px;overflow:auto;padding-bottom:4px}
      .repair-pill{border:1px solid rgba(217,124,124,.25);background:#fff;border-radius:999px;padding:12px 18px;font:700 13px/1 var(--font-sans);color:#6d6666;cursor:pointer}
      .repair-pill.active{background:linear-gradient(135deg,#c95f63,#9c2d2f);color:#fff;border-color:transparent}
      .repair-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:10px 0 14px;color:#777;font-family:var(--font-sans)}
      .repair-meta strong{font-family:var(--font-serif);font-size:20px;color:#302929}
      .repair-scroll-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;max-height:62vh;overflow:auto;padding:4px 6px 8px}
      .repair-scroll-card{background:transparent;border:0;border-radius:0;padding:0;box-shadow:none}
      .repair-scroll-card img{width:100%;height:auto;display:block;border-radius:0}
      .repair-spotlight{position:relative;display:flex;align-items:center;justify-content:center;min-height:420px;background:transparent;border:0;border-radius:0;padding:18px 54px;overflow:visible}
      .repair-spotlight img{max-width:100%;max-height:68vh;width:auto;height:auto;object-fit:contain;border-radius:0;box-shadow:none;filter:contrast(1.02) saturate(1.02)}
      .repair-spotlight .popup-arrow{background:transparent!important;border:0!important;box-shadow:none!important}
      .repair-workflow{min-height:360px}
      .repair-page-stack{max-height:66vh;overflow-y:auto;background:transparent;border:0;border-radius:0;padding:0;display:flex;flex-direction:column;gap:18px}
      .repair-page{margin:0 auto;width:min(760px,100%);background:transparent;border-radius:0;padding:0;box-shadow:none}
      .repair-page img{width:100%;height:auto;display:block;border-radius:0}
      .repair-page figcaption{text-align:center;margin-top:8px;color:#8a7474;font:600 12px/1 var(--font-sans)}
      .repair-doc-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;background:#fffaf8;border:1px solid rgba(217,124,124,.16);border-radius:14px 14px 0 0;padding:13px 16px;font-family:var(--font-sans)}
      .repair-iframe-frame{height:min(72vh,760px);background:#16151d;border-radius:16px;overflow:hidden;border:1px solid rgba(217,124,124,.16)}
      .repair-iframe-frame iframe{width:100%;height:100%;border:0;background:#fff}
      .repair-note{margin:14px 0 0;color:#8a7474;font:500 14px/1.6 var(--font-sans)}
      .repair-missing{display:flex;align-items:center;justify-content:center;min-height:220px;width:100%;border:1px dashed rgba(217,124,124,.45);border-radius:14px;color:#9c5d5d;text-align:center;padding:22px;font:700 14px/1.45 var(--font-sans);background:#fff}
      .case-study-fallback{height:220px;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border-radius:18px;background:linear-gradient(135deg,#f7d9d2,#fff8f5);color:#9c2d2f;font-family:var(--font-sans);text-align:center}
      .case-study-fallback span{text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:800}
      .case-study-fallback strong{font-family:var(--font-serif);font-size:28px;color:#302929}
      .case-study-fallback small{font-weight:700;color:#8a7474}
      .bts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:18px}
      .bts-grid img,.bts-empty{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:14px;border:1px solid rgba(217,124,124,.16);background:#fffaf8}
      .bts-empty{display:flex;align-items:center;justify-content:center;color:#a98989;font:700 13px/1 var(--font-sans)}
      .btn-view-certificates{margin-top:12px}
      @media (max-width:720px){
        .repair-large-shell,.repair-html-shell{width:96vw!important;max-height:92vh!important;border-radius:24px!important}
        .repair-spotlight{min-height:320px;padding:18px 42px}
        .repair-scroll-row{grid-template-columns:1fr;max-height:60vh}
        .repair-iframe-frame{height:70vh}
        .repair-meta{align-items:flex-start;flex-direction:column}
        .repair-pill{padding:10px 13px;font-size:12px}
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectRepairStyles();
    updateWorkCards();
    rebuildPublishedPopup();
    rebuildGraphicPopup();
    rebuildTechnicalPopup();
    rebuildWorkflowPopup();
    rebuildSocialPopup();
    rebuildLetterPopup();
  });
})();

// ============================================================
// PHASE 2 FINAL SCRIPT (originally <script id="phase2-final-script">)
// ============================================================
(function () {
  const assetExists = {};
  const preloadedSampleSources = new Set();
  const safeText = value => String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const byId = id => document.getElementById(id);
  const pageRange = (basePath, prefix, count, ext = 'jpg') => Array.from({ length: count }, (_, i) => `${basePath}/${prefix}${String(i + 1).padStart(2, '0')}.${ext}`);

  const links = {
    email: 'https://docs.google.com/document/d/1kv3jln53RQT5lhusy8FmujWrNwqOy0c6Fi9iHB8mgGI/edit?usp=sharing',
    event: 'https://docs.google.com/spreadsheets/d/1w_33iE7gH_1k3TBaO4JGFUhxTSMlVjmp29ZDVc8rXkY/edit?usp=sharing',
    content: 'https://docs.google.com/spreadsheets/d/1O8uf8Vm3GrgNEhmUbBt0PWkY4GBMnlQbaCB1zmCN28s/edit?usp=sharing',
    onboarding: 'https://docs.google.com/spreadsheets/d/1thA4WbsaI0DMF8M-7fkQ_uCelqOJAvil-Wg4DY6QUug/edit?usp=sharing',
    weekly: 'https://docs.google.com/document/d/1xHYIRqm9YGYhnpdIWgYUmC2Skjso_ws4N9DQYQhSJwI/edit?usp=sharing'
  };

  const graphics = {
    email: {
      label: 'Email Marketing Ads',
      count: '2 scrollable email campaign layouts',
      mode: 'scroll',
      type: 'vertical',
      items: [
        { src: 'assets/samples/graphics/graphic-email-01-romand-gloss-moderne-layout.jpg', alt: 'Romand Gloss Moderne email marketing layout' },
        { src: 'assets/samples/graphics/graphic-email-02-international-model-united-nations-layout.jpg', alt: 'International Model United Nations email marketing layout' }
      ]
    },
    promo: {
      label: 'Promotional Posters',
      count: '2 event and travel promotion posters',
      mode: 'gallery',
      type: 'vertical',
      items: [
        { src: 'assets/samples/graphics/graphic-promotional-01-imun-vietnam-poster.png', alt: 'IMUN Vietnam promotional poster' },
        { src: 'assets/samples/graphics/graphic-promotional-02-tripcom-world-tour-sale-poster.png', alt: 'Trip.com world tour sale poster' }
      ]
    },
    beauty: {
      label: 'Beauty Posters',
      count: '2 beauty and product poster concepts',
      mode: 'gallery',
      type: 'vertical',
      items: [
        { src: 'assets/samples/graphics/graphic-beauty-01-lucky-beauty-product-poster.png', alt: 'Lucky Beauty product poster' },
        { src: 'assets/samples/graphics/graphic-beauty-02-care-line-product-poster.png', alt: 'Careline product poster' }
      ]
    },
    food: {
      label: 'Standalone Food Posters',
      count: '3 food and beverage poster concepts',
      mode: 'gallery',
      type: 'mixed',
      carouselOnly: true,
      items: [
        {
          layout: 'single',
          items: [
            { src: 'assets/samples/graphics/graphic-food-01-smokehouse-rib-platter.png', alt: 'Smokehouse rib platter food poster', shape: 'wide' }
          ]
        },
        {
          layout: 'pair',
          items: [
            { src: 'assets/samples/graphics/graphic-food-02-boba-flavors-poster.png', alt: 'Boba flavors poster', shape: 'vertical' },
            { src: 'assets/samples/graphics/graphic-food-03-chocolate-chip-cookie-poster.png', alt: 'Chocolate chip cookie poster', shape: 'vertical' }
          ]
        }
      ]
    },
    sst: {
      label: 'Sweet SerendipiTea Designs',
      count: '14 brand, product, menu, and campaign visuals',
      mode: 'gallery',
      type: 'mixed',
      carouselOnly: true,
      items: [
        {
          layout: 'single',
          items: [
            { src: 'assets/samples/graphics/graphic-sst-01-menu-board.png', alt: 'Sweet SerendipiTea gourmet menu board', shape: 'wide' }
          ]
        },
        {
          layout: 'pair',
          items: [
            { src: 'assets/samples/graphics/graphic-sst-02-menu-poster.png', alt: 'Sweet SerendipiTea menu poster', shape: 'vertical' },
            { src: 'assets/samples/graphics/graphic-sst-05-crowd-favorites-poster.png', alt: 'Crowd favorites poster', shape: 'wide' }
          ]
        },
        {
          layout: 'trio',
          items: [
            { src: 'assets/samples/graphics/graphic-sst-04-wintermelon-milktea-poster.png', alt: 'Wintermelon milktea poster', shape: 'vertical' },
            { src: 'assets/samples/graphics/graphic-sst-03-holiday-treats-promo.png', alt: 'Holiday treats promotional poster', shape: 'vertical' },
            { src: 'assets/samples/graphics/graphic-sst-13-combo-deals-poster.png', alt: 'Holiday bundle deals poster', shape: 'vertical' }
          ]
        },
        {
          layout: 'pair',
          items: [
            { src: 'assets/samples/graphics/graphic-sst-06-brand-stationery-mockup.png', alt: 'Business card and letterhead design mock-up', shape: 'wide' },
            { src: 'assets/samples/graphics/graphic-sst-14-launch-poster.png', alt: 'Sweet SerendipiTea launch poster', shape: 'vertical' }
          ]
        },
        {
          layout: 'pair',
          items: [
            { src: 'assets/samples/graphics/graphic-sst-07-paper-bag-mockup.png', alt: 'Paper bag branding mock-up', shape: 'vertical' },
            { src: 'assets/samples/graphics/graphic-sst-11-limited-mugs-model-promo.png', alt: 'Sweet SerendipiTea limited mugs model promo', shape: 'vertical' }
          ]
        },
        {
          layout: 'pair',
          items: [
            { src: 'assets/samples/graphics/graphic-sst-10-packaging-teaser.png', alt: 'Eco-friendly bag and cup teaser', shape: 'square' },
            { src: 'assets/samples/graphics/graphic-sst-12-calendar-journal-promo.png', alt: 'Calendar and journal planning promo', shape: 'square' }
          ]
        },
        {
          layout: 'pair',
          items: [
            { src: 'assets/samples/graphics/graphic-sst-08-limited-mugs-promo.png', alt: 'Limited mugs promotion without model', shape: 'vertical' },
            { src: 'assets/samples/graphics/graphic-sst-09-tumbler-promo.png', alt: 'Tumbler model promo poster', shape: 'vertical' }
          ]
        },
      ]
    },
    logos: {
      label: 'Logos',
      count: '4 logo marks and brand marks',
      mode: 'gallery',
      type: 'logo',
      items: [
        { src: 'assets/samples/graphics/graphic-logo-01-sweet-serendipitea-gold-mark.png', alt: 'Sweet SerendipiTea gold logo mark' },
        { src: 'assets/samples/graphics/graphic-logo-02-sweet-serendipitea-rose-mark.png', alt: 'Sweet SerendipiTea rose logo mark' },
        { src: 'assets/samples/graphics/graphic-logo-03-sweet-tea-logo-mark.png', alt: 'Sweet tea logo mark' },
        { src: 'assets/samples/graphics/graphic-logo-04-sweet-serendipitea-dark-mark.png', alt: 'Sweet SerendipiTea dark logo mark' }
      ]
    },
    books: {
      label: 'Book Covers',
      count: '12 story-linked original and published fiction visuals',
      mode: 'gallery',
      type: 'book',
      items: [
        { src: 'assets/samples/graphics/graphic-book-cover-01-the-river-that-grants-wishes-cover.png', alt: 'The River That Grants Wishes cover', shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-02-the-river-that-grants-wishes-book-display.png', alt: 'The River That Grants Wishes book display', shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-03-natures-wildest-creatures-cover.png', alt: "Nature's Wildest Creatures cover", shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-04-natures-wildest-creatures-book-display.png', alt: "Nature's Wildest Creatures book display", shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-05-wretched-fate-cover.png', alt: 'Wretched Fate cover', shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-06-wretched-fate-book-display.png', alt: 'Wretched Fate book display', shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-07-clairvoyants-fate-cover.png', alt: "Clairvoyant's Fate cover", shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-08-clairvoyants-fate-book-display.png', alt: "Clairvoyant's Fate book display", shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-09-aurelian-secrets-of-selene-cover.png', alt: 'Aurelian Secrets of Selene cover', shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-10-aurelian-secrets-of-selene-book-display.png', alt: 'Aurelian Secrets of Selene book display', shape: 'vertical' },
        { src: 'assets/samples/graphics/graphic-book-cover-11-aurelian-secrets-of-selene-full-wrap.png', alt: 'Aurelian Secrets of Selene full wrap cover', shape: 'wide', full: true },
        { src: 'assets/samples/graphics/graphic-book-cover-12-clairvoyants-fate-full-wrap.png', alt: "Clairvoyant's Fate full wrap cover", shape: 'wide', full: true }
      ],
      note: 'These are not random mockups: the featured covers are tied to original written stories. The River That Grants Wishes and Nature’s Wildest Creatures were award-winning senior high school writing pieces, while Aurelian Secrets of Selene continues the published Sorel story world.'
    }
  };

  const admin = {
    weekly: {
      label: 'Weekly Progress Report',
      count: '1 reporting template',
      link: links.weekly,
      linkText: 'View Source Doc',
      items: [{ src: 'assets/samples/admin/admin-01-weekly-progress-report.png', alt: 'Weekly progress report tracker' }]
    },
    email: {
      label: 'Email Templates',
      count: '18 client-ready email template pages',
      link: links.email,
      linkText: 'View Source Doc',
      items: pageRange('assets/samples/admin', 'admin-email-templates-page-', 18).map((src, i) => ({ src, alt: `Email templates page ${i + 1}` }))
    },
    event: {
      label: 'Event Planning',
      count: '10 event dashboard and planning pages',
      link: links.event,
      linkText: 'View Source Sheet',
      items: pageRange('assets/samples/admin', 'admin-event-planning-page-', 10).map((src, i) => ({ src, alt: `Event planning page ${i + 1}` }))
    },
    content: {
      label: 'Content Calendar & Strategy',
      count: '7 content planning and strategy pages',
      link: links.content,
      linkText: 'View Source Sheet',
      items: pageRange('assets/samples/admin', 'admin-content-calendar-strategy-page-', 7).map((src, i) => ({ src, alt: `Content calendar strategy page ${i + 1}` }))
    },
    onboarding: {
      label: 'Client Onboarding',
      count: '3 onboarding dashboard and checklist views',
      link: links.onboarding,
      linkText: 'View Source Sheet',
      items: [
        { src: 'assets/samples/admin/admin-onboarding-system-page-01-dashboard-overview.jpg', alt: 'Client onboarding dashboard overview' },
        { src: 'assets/samples/admin/admin-onboarding-system-page-02-checklist-top.jpg', alt: 'Client onboarding checklist top' },
        { src: 'assets/samples/admin/admin-onboarding-system-page-03-checklist-bottom.jpg', alt: 'Client onboarding checklist bottom' }
      ]
    },
    workflow: {
      label: 'Workflow Boards',
      count: '3 workflow and scheduling systems',
      items: [
        { src: 'assets/samples/workflows/workflow-01-sst-social-media-management-hub-board.png', alt: 'Sweet SerendipiTea Trello workflow board' },
        { src: 'assets/samples/workflows/workflow-02-event-planning-dashboard.png', alt: 'Event planning dashboard workflow' },
        { src: 'assets/samples/workflows/workflow-03-google-calendar-overview.png', alt: 'Google Calendar overview' }
      ]
    }
  };

  const socialCases = {
    lucky: {
      label: 'Lucky Beauty',
      src: 'social-strategy-lucky-beauty-case-study.html'
    },
    sst: {
      label: 'Sweet SerendipiTea',
      src: 'social-strategy-sweet-serendipitea-case-study.html'
    }
  };

  const credentials = [
    { title: 'Introduction to SEO', src: 'assets/accreditations/accreditation-01-introduction-to-seo.jpg' },
    { title: 'Digital Marketing Tools and Techniques', src: 'assets/accreditations/accreditation-02-digital-marketing-tools-and-techniques.jpg' },
    { title: 'Meta Business Suite for Beginners', src: 'assets/accreditations/accreditation-03-meta-business-suite-for-beginners.jpg' }
  ];

  const aiArchitectureProofs = [
    {
      label: 'Final Website Hero Page',
      src: 'assets/samples/ai-architecture/ai-architecture-00-final-hero-page.png',
      caption: 'Published hero page from the final portfolio website.'
    },
    {
      label: 'Before Version: Prompt + First Draft',
      src: 'assets/samples/ai-architecture/ai-architecture-01-before-draft-with-prompt.png',
      caption: 'Original prompt and first visible AI-generated website draft.'
    },
    {
      label: 'Before Version: Hero Page',
      src: 'assets/samples/ai-architecture/ai-architecture-02-before-hero-page.png',
      caption: 'Early hero-page direction before the final visual system was refined.'
    },
    {
      label: 'Before Version: HTML Code',
      src: 'assets/samples/ai-architecture/ai-architecture-03-before-html-code.png',
      caption: 'Early one-page HTML code generated during the first build direction.'
    },
    {
      label: 'Before Version: AI File History',
      src: 'assets/samples/ai-architecture/ai-architecture-04-before-ai-file-history.png',
      caption: 'Multiple AI-generated versions that were reviewed before the final direction.'
    },
    {
      label: 'After Version: Final HTML Code',
      src: 'assets/samples/ai-architecture/ai-architecture-05-after-final-html-code.png',
      caption: 'Final GitHub-ready HTML source after revision, cleanup, and organization.'
    },
    {
      label: 'Final Master Blueprint',
      src: 'assets/samples/ai-architecture/ai-architecture-02-blueprint-design-dna.png',
      caption: 'Design DNA from the final master blueprint: palette, typography, glass treatment, and consistency.'
    },
    {
      label: 'Final Master Blueprint: Layout Tokens',
      src: 'assets/samples/ai-architecture/ai-architecture-03-blueprint-layout-tokens.png',
      caption: 'Source-of-truth spacing, width, radius, and layout rhythm.'
    },
    {
      label: 'Final Master Blueprint: Navigation + Motion',
      src: 'assets/samples/ai-architecture/ai-architecture-04-blueprint-navigation-motion.png',
      caption: 'Navigation behavior and motion direction before implementation.'
    },
    {
      label: 'Final Master Blueprint: Accessibility + Motion',
      src: 'assets/samples/ai-architecture/ai-architecture-05-blueprint-accessibility.png',
      caption: 'Focus, contrast, touch-target, and reduced-motion requirements.'
    },
    {
      label: 'GitHub Repository Structure',
      src: 'assets/samples/ai-architecture/ai-architecture-06-github-repository.png',
      caption: 'Final organized repository with separated code and asset folders.'
    },
    {
      label: 'Revision Direction Log',
      src: 'assets/samples/ai-architecture/ai-architecture-07-codex-revision-log.png',
      caption: 'Curated proof of annotation-based revision direction.'
    },
    {
      label: 'Annotation Log: Asset + Reference Check',
      src: 'assets/samples/ai-architecture/ai-architecture-08-codex-asset-check.png',
      caption: 'Annotation-driven verification pass confirming organized asset references.'
    }
  ];

  const aiArchitectureCodeExcerpt = `<!-- Sample Works card -->
<div class="work-card fade-up"
     onclick="openAIArchitecture()"
     role="button"
     tabindex="0"
     aria-label="View AI-Assisted Architecture case study">
  <div class="work-thumb ai-architecture-thumb">
    <img src="assets/samples/ai-architecture/ai-architecture-06-github-repository.png"
         alt="GitHub repository structure for AI-assisted portfolio architecture">
    <div class="work-card-badge">Case Study</div>
  </div>
  <div class="work-info">
    <p class="work-category">AI Architecture</p>
    <h3 class="work-title">AI-Assisted Architecture</h3>
  </div>
</div>`;

  function ensureModal() {
    let modal = byId('phase2Modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'phase2Modal';
    modal.className = 'phase2-modal-backdrop';
    modal.innerHTML = '<div class="phase2-modal" role="dialog" aria-modal="true"><button class="phase2-close" type="button" aria-label="Close">×</button><div id="phase2ModalContent"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', event => {
      if (event.target === modal || event.target.classList.contains('phase2-close')) closePhase2Modal();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const zoom = byId('phase2PageZoom');
        if (zoom && zoom.classList.contains('active')) {
          closePhase2PageZoom();
        } else {
          closePhase2Modal();
        }
      }
    });
    return modal;
  }

  function openPhase2Modal(html, options = {}) {
    const modal = ensureModal();
    modal.querySelector('.phase2-modal').classList.toggle('phase2-html-modal', !!options.htmlWide);
    preloadImagesFromHTML(html);
    byId('phase2ModalContent').innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    primeVisiblePhase2Images();
  }

  function closePhase2Modal() {
    const modal = byId('phase2Modal');
    if (!modal) return;
    closePhase2PageZoom();
    modal.classList.remove('active');
    byId('phase2ModalContent').innerHTML = '';
    document.body.style.overflow = '';
  }

  function updatePhase2Content(html) {
    const target = byId('phase2ModalContent');
    if (!target) return;
    const currentHeight = target.getBoundingClientRect().height;
    if (currentHeight > 0) target.style.minHeight = `${currentHeight}px`;
    preloadImagesFromHTML(html);
    target.classList.add('phase2-content-swap');
    target.innerHTML = html;
    primeVisiblePhase2Images();
    window.requestAnimationFrame(() => target.classList.remove('phase2-content-swap'));
    window.clearTimeout(window.phase2ContentSettleTimer);
    window.phase2ContentSettleTimer = window.setTimeout(() => {
      target.style.minHeight = '';
    }, 140);
  }

  function header(kicker, title, desc, count) {
    return `<div class="phase2-head">
      <div>
        <p class="phase2-kicker">${safeText(kicker)}</p>
        <h3 class="phase2-title">${safeText(title)}</h3>
        ${desc ? `<p class="phase2-desc">${safeText(desc)}</p>` : ''}
      </div>
      ${count ? `<div class="phase2-count">${safeText(count)}</div>` : ''}
    </div>`;
  }

  function tabs(data, activeKey, fnName) {
    return `<div class="phase2-tabs">${Object.entries(data).map(([key, item]) =>
      `<button type="button" class="phase2-pill ${key === activeKey ? 'active' : ''}" onclick="${fnName}('${key}')">${safeText(item.label)}</button>`
    ).join('')}</div>`;
  }

  function imageTag(item) {
    const shape = item.shape || '';
    return `<figure class="phase2-item ${shape} ${item.full ? 'full' : ''}">
      <img src="${safeText(item.src)}" alt="${safeText(item.alt)}" loading="eager" decoding="async" fetchpriority="high">
    </figure>`;
  }

  function renderDesktopGrid(config) {
    const cls = config.type === 'vertical' ? 'is-vertical' : config.type === 'logo' ? 'is-logo' : config.type === 'book' ? 'is-book' : config.type === 'wide' ? 'is-wide' : 'is-mixed';
    return `<div class="phase2-grid phase2-desktop-grid ${cls}">${config.items.map(imageTag).join('')}</div>`;
  }

  function isPhase2Mobile() {
    return window.matchMedia && window.matchMedia('(max-width: 860px)').matches;
  }

  function getGraphicSlides(config) {
    if (!isPhase2Mobile() || !config.carouselOnly) return config.items;
    return config.items.flatMap((slide) => Array.isArray(slide.items)
      ? slide.items.map((item) => ({ layout: 'single', items: [item] }))
      : [slide]);
  }

  function renderMobileCarousel(config, active = 0, fnName = 'phase2GraphicMove') {
    const slides = getGraphicSlides(config);
    const slide = slides[active] || slides[0];
    const slideItems = Array.isArray(slide.items) ? slide.items : [slide];
    const layout = slide.layout || (slideItems.length === 3 ? 'trio' : slideItems.length === 2 ? 'pair' : 'single');
    const group = slideItems.map((item) => `<figure class="phase2-slide-item ${safeText(item.shape || '')}">
        <img src="${safeText(item.src)}" alt="${safeText(item.alt)}" loading="eager" decoding="async" fetchpriority="high">
      </figure>`).join('');
    return `<div class="phase2-carousel phase2-mobile-carousel phase2-carousel-${layout}">
      <button class="phase2-arrow prev" type="button" onclick="${fnName}(-1)" aria-label="Previous">←</button>
      <div class="phase2-slide-group ${layout}">${group}</div>
      <button class="phase2-arrow next" type="button" onclick="${fnName}(1)" aria-label="Next">→</button>
      <div class="phase2-dots">${slides.map((_, i) => `<button class="phase2-dot ${i === active ? 'active' : ''}" type="button" onclick="${fnName}(${i - active})" aria-label="View ${i + 1}"></button>`).join('')}</div>
    </div>`;
  }

  function renderPageViewer(items, active = 0, fnName = 'phase2PageMove') {
    const item = items[active] || items[0];
    return `<div class="phase2-page-viewer">
      <button class="phase2-page-arrow prev" type="button" onclick="${fnName}(-1)" aria-label="Previous page">‹</button>
      <figure class="phase2-page-frame">
        <img src="${safeText(item.src)}" alt="${safeText(item.alt)}" loading="eager" decoding="async" fetchpriority="high">
      </figure>
      <button class="phase2-page-arrow next" type="button" onclick="${fnName}(1)" aria-label="Next page">›</button>
    </div>`;
  }

  function renderZoomablePageViewer(items, active = 0, fnName = 'phase2PageMove') {
    const item = items[active] || items[0];
    return `<div class="phase2-page-viewer is-zoomable">
      <button class="phase2-page-arrow prev" type="button" onclick="${fnName}(-1)" aria-label="Previous page">&lsaquo;</button>
      <figure class="phase2-page-frame">
        <button class="phase2-page-zoom-trigger" type="button" data-src="${safeText(item.src)}" data-alt="${safeText(item.alt)}" onclick="openPhase2PageZoom(this.dataset.src, this.dataset.alt)" aria-label="View full page">
          <img src="${safeText(item.src)}" alt="${safeText(item.alt)}" loading="eager" decoding="async" fetchpriority="high">
        </button>
      </figure>
      <button class="phase2-page-arrow next" type="button" onclick="${fnName}(1)" aria-label="Next page">&rsaquo;</button>
    </div>`;
  }

  function renderGraphicBody(key) {
    const config = graphics[key];
    const current = window.phase2GraphicIndex || 0;
    const graphicSlides = getGraphicSlides(config);
    const note = config.note ? `<p class="phase2-proof">${safeText(config.note)}</p>` : '';
    const carousel = renderMobileCarousel(config, Math.min(current, graphicSlides.length - 1), 'phase2GraphicMove');
    const content = config.mode === 'scroll'
      ? renderPageViewer(config.items, Math.min(current, config.items.length - 1), 'phase2GraphicMove')
      : config.carouselOnly
        ? `<div class="phase2-carousel-only">${carousel}</div>`
        : `${renderDesktopGrid(config)}${carousel}`;
    return `${header('Graphic Design', config.label, 'Portfolio visuals focused on layout, hierarchy, color balance, and brand-ready presentation.', config.count)}
      ${tabs(graphics, key, 'phase2SwitchGraphic')}
      <div class="phase2-gallery-shell is-graphic is-${safeText(key)}">${content}${note}</div>`;
  }

  window.openGraphicDesign = function () {
    window.phase2GraphicKey = 'email';
    window.phase2GraphicIndex = 0;
    openPhase2Modal(renderGraphicBody('email'));
  };

  window.phase2SwitchGraphic = function (key) {
    window.phase2GraphicKey = key;
    window.phase2GraphicIndex = 0;
    updatePhase2Content(renderGraphicBody(key));
  };

  window.phase2GraphicMove = function (delta) {
    const key = window.phase2GraphicKey || 'email';
    const config = graphics[key];
    const graphicSlides = getGraphicSlides(config);
    window.phase2GraphicIndex = (window.phase2GraphicIndex + delta + graphicSlides.length) % graphicSlides.length;
    updatePhase2Content(renderGraphicBody(key));
  };

  function renderAdminBody(key) {
    const config = admin[key];
    const current = window.phase2AdminIndex || 0;
    const link = config.link ? `<div class="phase2-link-row"><a class="phase2-source-link" href="${safeText(config.link)}" target="_blank" rel="noopener">${safeText(config.linkText || 'View Source')}</a></div>` : '';
    return `${header('Admin & Workflow Systems', config.label, 'Operational samples showing dashboards, templates, planning systems, and client-ready workflow structure.', config.count)}
      ${tabs(admin, key, 'phase2SwitchAdmin')}
      ${link}
      <div class="phase2-gallery-shell">${renderZoomablePageViewer(config.items, Math.min(current, config.items.length - 1), 'phase2AdminMove')}</div>`;
  }

  window.openWorkflow = function () {
    window.phase2AdminKey = 'weekly';
    window.phase2AdminIndex = 0;
    openPhase2Modal(renderAdminBody('weekly'));
  };

  window.phase2SwitchAdmin = function (key) {
    window.phase2AdminKey = key;
    window.phase2AdminIndex = 0;
    updatePhase2Content(renderAdminBody(key));
  };

  window.phase2AdminMove = function (delta) {
    const key = window.phase2AdminKey || 'weekly';
    const config = admin[key];
    window.phase2AdminIndex = (window.phase2AdminIndex + delta + config.items.length) % config.items.length;
    updatePhase2Content(renderAdminBody(key));
  };

  window.openSocialStrategy = function () {
    window.phase2SocialKey = 'lucky';
    openPhase2Modal(renderSocialBody('lucky'), { htmlWide: true });
  };

  function renderSocialBody(key) {
    const config = socialCases[key];
    return `${header('Strategy Mock-Up', 'Social Media Strategy Mock-Up', 'Two HTML case studies only. Posters and graphic assets stay under Graphic Design.', '2 HTML case studies')}
      ${tabs(socialCases, key, 'phase2SwitchSocial')}
      <div class="phase2-iframe"><iframe src="${safeText(config.src)}" title="${safeText(config.label)} case study" sandbox="allow-scripts allow-same-origin"></iframe></div>`;
  }

  window.phase2SwitchSocial = function (key) {
    window.phase2SocialKey = key;
    updatePhase2Content(renderSocialBody(key));
  };

  window.openTechnicalWriting = function () {
    window.phase2TechKey = 'unesco';
    window.phase2TechIndex = 0;
    openPhase2Modal(renderTechBody('unesco'));
  };

  const techDocs = {
    unesco: {
      label: 'UNESCO MUN Rapporteur Log',
      count: '10 pages',
      pages: pageRange('assets/samples/technical-writing', 'technical-writing-01-unesco-mun-master-rapporteur-log-page-', 10)
    },
    onboarding: {
      label: 'Secure Client Onboarding',
      count: '3 pages',
      pages: pageRange('assets/samples/technical-writing', 'technical-writing-02-secure-client-onboarding-case-study-page-', 3)
    }
  };

  function collectSampleSources() {
    const sources = new Set();
    const add = src => {
      if (src && /\.(png|jpe?g|webp|gif)$/i.test(src)) sources.add(src);
    };
    const visit = value => {
      if (!value) return;
      if (typeof value === 'string') {
        add(value);
      } else if (Array.isArray(value)) {
        value.forEach(visit);
      } else if (typeof value === 'object') {
        add(value.src);
        visit(value.items);
        visit(value.pages);
      }
    };
    [graphics, admin, credentials, aiArchitectureProofs, techDocs].forEach(visit);
    [
      'assets/samples/endorsements/endorsement-certificate-recognition-01.jpg',
      'assets/samples/endorsements/endorsement-certificate-recognition-02.jpg',
      'assets/samples/endorsements/endorsement-behind-scenes-philippines-02.jpg',
      'assets/samples/endorsements/endorsement-behind-scenes-vietnam-01.jpg',
      'assets/samples/endorsements/endorsement-behind-scenes-philippines-01.jpg',
      'assets/samples/endorsements/endorsement-credential-letter-01.jpg',
      'assets/samples/endorsements/endorsement-credential-letter-02.jpg'
    ].forEach(add);
    return [...sources];
  }

  function preloadSampleWorksAssets() {
    collectSampleSources().forEach(preloadSampleImage);
  }

  function preloadSampleImage(src, priority = 'low') {
    if (!src || preloadedSampleSources.has(src)) return;
    preloadedSampleSources.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    try { img.fetchPriority = priority; } catch (error) {}
    img.src = src;
  }

  function preloadImagesFromHTML(html) {
    String(html || '').replace(/<img[^>]+src="([^"]+)"/g, (_, src) => {
      preloadSampleImage(src, 'high');
      return _;
    });
  }

  function primeVisiblePhase2Images() {
    const modal = byId('phase2Modal');
    if (!modal) return;
    modal.querySelectorAll('img').forEach(img => {
      img.loading = 'eager';
      img.decoding = 'async';
      try { img.fetchPriority = 'high'; } catch (error) {}
      if (img.decode) img.decode().catch(() => {});
    });
  }

  function renderTechBody(key) {
    const config = techDocs[key];
    const current = window.phase2TechIndex || 0;
    const pages = config.pages.map((src, i) => ({ src, alt: `${config.label} page ${i + 1}` }));
    return `${header('Documentation Sample', 'Technical Writing', '', config.count)}
      ${tabs(techDocs, key, 'phase2SwitchTech')}
      <div class="phase2-gallery-shell">${renderZoomablePageViewer(pages, Math.min(current, pages.length - 1), 'phase2TechMove')}</div>`;
  }

  window.phase2SwitchTech = function (key) {
    window.phase2TechKey = key;
    window.phase2TechIndex = 0;
    updatePhase2Content(renderTechBody(key));
  };

  window.phase2TechMove = function (delta) {
    const key = window.phase2TechKey || 'unesco';
    const config = techDocs[key];
    const current = window.phase2TechIndex || 0;
    window.phase2TechIndex = (current + delta + config.pages.length) % config.pages.length;
    updatePhase2Content(renderTechBody(key));
  };

  window.openCredential = function (src, title) {
    const found = credentials.find(item => item.src === src) || { src, title };
    openPhase2Modal(`${header('Simplilearn SkillUp - Certification', found.title, '', 'Verified credential')}
      <div class="phase2-gallery-shell"><figure class="phase2-doc-page"><img src="${safeText(found.src)}" alt="${safeText(found.title)} credential certificate"></figure></div>`);
  };

  window.openRecognitionPopup = function () {
    const certs = [
      { src: 'assets/samples/endorsements/endorsement-certificate-recognition-01.jpg', alt: 'Certificate of recognition Vietnam' },
      { src: 'assets/samples/endorsements/endorsement-certificate-recognition-02.jpg', alt: 'Certificate of recognition Manila Philippines' }
    ];
    openPhase2Modal(`${header('Executive Endorsement', 'Recognition Certificates', 'Event recognition proof with behind-the-scenes documentation from Vietnam and the Philippines.', '2 certificates + 3 BTS photos')}
      <div class="phase2-gallery-shell">
        <div class="phase2-grid is-wide">${certs.map(imageTag).join('')}</div>
        <div class="phase2-bts-grid">
          <img src="assets/samples/endorsements/endorsement-behind-scenes-philippines-02.jpg" alt="Philippines event behind the scenes">
          <img src="assets/samples/endorsements/endorsement-behind-scenes-vietnam-01.jpg" alt="Vietnam event behind the scenes">
          <img src="assets/samples/endorsements/endorsement-behind-scenes-philippines-01.jpg" alt="Additional Philippines event behind the scenes">
        </div>
      </div>`);
  };

  window.openLetterPopup = function () {
    const pages = ['assets/samples/endorsements/endorsement-credential-letter-01.jpg', 'assets/samples/endorsements/endorsement-credential-letter-02.jpg'].map((src, i) => ({ src, alt: `Credential letter page ${i + 1}` }));
    window.phase2LetterIndex = 0;
    openPhase2Modal(`${header('Executive Endorsement', 'Credential Letter', 'Full two-page executive credential letter.', '2 pages')}
      <div class="phase2-gallery-shell">${renderPageViewer(pages, 0, 'phase2LetterMove')}</div>`);
  };

  window.phase2LetterMove = function (delta) {
    const pages = ['assets/samples/endorsements/endorsement-credential-letter-01.jpg', 'assets/samples/endorsements/endorsement-credential-letter-02.jpg'].map((src, i) => ({ src, alt: `Credential letter page ${i + 1}` }));
    window.phase2LetterIndex = (window.phase2LetterIndex + delta + pages.length) % pages.length;
    updatePhase2Content(`${header('Executive Endorsement', 'Credential Letter', 'Full two-page executive credential letter.', '2 pages')}
      <div class="phase2-gallery-shell">${renderPageViewer(pages, window.phase2LetterIndex, 'phase2LetterMove')}</div>`);
  };

  window.openAIArchitecture = function () {
    window.aiArchitectureInlineIndex = 0;
    openPhase2Modal(renderAIArchitectureBody(), { htmlWide: true });
  };

  function renderAIArchitectureBody() {
    const current = window.aiArchitectureInlineIndex || 0;
    const item = aiArchitectureProofs[current] || aiArchitectureProofs[0];
    return `${header('AI-Assisted Architecture', 'Portfolio Website Build', 'A documented workflow showing how the site moved from AI-generated draft to blueprint-guided, GitHub-ready implementation.', '13 proof assets')}
      <div class="phase2-gallery-shell">
        <div class="ai-architecture-carousel">
          <button class="ai-architecture-inline-arrow prev" type="button" onclick="moveAIArchitectureInline(-1)" aria-label="Previous proof">‹</button>
          <figure class="ai-architecture-hero-proof">
            <button class="ai-architecture-image-button" type="button" onclick="openAIArchitectureViewer(${current})" aria-label="View ${safeText(item.label)} clearly">
              <img src="${safeText(item.src)}" alt="${safeText(item.label)}" loading="eager">
            </button>
            <figcaption>${safeText(current + 1)} of ${safeText(aiArchitectureProofs.length)} - ${safeText(item.label)} - ${safeText(item.caption)}</figcaption>
          </figure>
          <button class="ai-architecture-inline-arrow next" type="button" onclick="moveAIArchitectureInline(1)" aria-label="Next proof">›</button>
        </div>
        ${current === 3 || current === 5 ? `<div class="ai-architecture-code-panel"><div><h4>HTML Code Excerpt</h4><p>Representative code from the live Sample Works card. The full source is stored in the repository.</p></div><pre><code>${safeText(aiArchitectureCodeExcerpt)}</code></pre></div>` : ''}
      </div>`;
  }

  window.moveAIArchitectureInline = function (delta) {
    window.aiArchitectureInlineIndex = (window.aiArchitectureInlineIndex + delta + aiArchitectureProofs.length) % aiArchitectureProofs.length;
    updatePhase2Content(renderAIArchitectureBody());
  };

  window.openAIArchitectureViewer = function (index) {
    const existing = byId('aiArchitectureViewer');
    if (existing) existing.remove();
    window.aiArchitectureViewerIndex = index;
    const viewer = document.createElement('div');
    viewer.id = 'aiArchitectureViewer';
    viewer.className = 'ai-architecture-viewer';
    viewer.innerHTML = '<button class="ai-architecture-viewer-close" type="button" aria-label="Close image viewer" onclick="closeAIArchitectureViewer()">×</button><button class="ai-architecture-viewer-arrow prev" type="button" aria-label="Previous image" onclick="moveAIArchitectureViewer(-1)">‹</button><figure><img id="aiArchitectureViewerImg" alt=""><figcaption id="aiArchitectureViewerCaption"></figcaption></figure><button class="ai-architecture-viewer-arrow next" type="button" aria-label="Next image" onclick="moveAIArchitectureViewer(1)">›</button>';
    viewer.addEventListener('click', event => {
      if (event.target === viewer) closeAIArchitectureViewer();
    });
    document.body.appendChild(viewer);
    renderAIArchitectureViewer();
  };

  function renderAIArchitectureViewer() {
    const item = aiArchitectureProofs[window.aiArchitectureViewerIndex] || aiArchitectureProofs[0];
    const img = byId('aiArchitectureViewerImg');
    const caption = byId('aiArchitectureViewerCaption');
    if (!img || !caption) return;
    img.src = item.src;
    img.alt = item.label;
    caption.textContent = `${item.label} - ${item.caption}`;
  }

  window.moveAIArchitectureViewer = function (delta) {
    window.aiArchitectureViewerIndex = (window.aiArchitectureViewerIndex + delta + aiArchitectureProofs.length) % aiArchitectureProofs.length;
    renderAIArchitectureViewer();
  };

  window.closeAIArchitectureViewer = function () {
    const viewer = byId('aiArchitectureViewer');
    if (viewer) viewer.remove();
  };

  function ensurePhase2PageZoom() {
    let zoom = byId('phase2PageZoom');
    if (zoom) return zoom;
    zoom = document.createElement('div');
    zoom.id = 'phase2PageZoom';
    zoom.className = 'phase2-page-zoom-backdrop';
    zoom.innerHTML = '<div class="phase2-page-zoom-dialog" role="dialog" aria-modal="true" aria-label="Full page preview"><button class="phase2-page-zoom-close" type="button" aria-label="Close full page preview" onclick="closePhase2PageZoom()">×</button><img id="phase2PageZoomImg" alt=""></div>';
    zoom.addEventListener('click', event => {
      if (event.target === zoom) closePhase2PageZoom();
    });
    document.body.appendChild(zoom);
    return zoom;
  }

  window.openPhase2PageZoom = function (src, alt) {
    const zoom = ensurePhase2PageZoom();
    const img = byId('phase2PageZoomImg');
    if (!img) return;
    preloadSampleImage(src, 'high');
    img.src = src;
    img.alt = alt || 'Full page preview';
    zoom.classList.add('active');
  };

  window.closePhase2PageZoom = function () {
    const zoom = byId('phase2PageZoom');
    if (zoom) zoom.classList.remove('active');
  };

  function updateCards() {
    const cards = Array.from(document.querySelectorAll('.work-card'));
    const workflow = cards.find(card => /Workflow Systems/i.test(card.textContent));
    if (workflow) {
      const title = workflow.querySelector('.work-title, h3');
      const desc = workflow.querySelector('.work-desc, p:not(.work-category)');
      const badge = workflow.querySelector('.work-badge, .view-count, span');
      if (title) title.textContent = 'Admin & Workflow Systems';
      if (desc) desc.textContent = 'Dashboards, trackers, content calendars, templates, and workflow boards showing organized client support.';
      if (badge && /Views|view|screens|samples/i.test(badge.textContent)) badge.textContent = '6 Categories';
      workflow.setAttribute('onclick', 'openWorkflow()');
      workflow.setAttribute('aria-label', 'View Admin and Workflow Systems samples');
    }

    const graphic = cards.find(card => /Graphic Design/i.test(card.textContent));
    if (graphic) {
      const desc = graphic.querySelector('.work-desc, p:not(.work-category)');
      if (desc) desc.textContent = 'Categorized email, poster, logo, brand, food, and book-cover visuals arranged by context.';
      const preview = graphic.querySelector('.work-preview, .preview-window, .work-image');
      if (preview) preview.innerHTML = '<img src="assets/samples/graphics/graphic-email-01-romand-gloss-moderne-layout.jpg" alt="Graphic design thumbnail" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:center 20%;">';
    }

    const social = cards.find(card => /Social Media Strategy/i.test(card.textContent));
    if (social) {
      const desc = social.querySelector('.work-desc, p:not(.work-category)');
      if (desc) desc.textContent = 'Two HTML strategy case studies: Lucky Beauty and Sweet SerendipiTea.';
      const preview = social.querySelector('.work-preview, .preview-window, .work-image');
      if (preview) preview.innerHTML = '<div class="case-study-fallback"><span>HTML Case Study</span><strong>Strategy Mock-Up</strong><small>Lucky Beauty + Sweet SerendipiTea</small></div>';
    }
  }

  function updateServicesAndSkills() {
    const serviceHeadings = Array.from(document.querySelectorAll('#services h3, #services .service-title'));
    const socialService = serviceHeadings.find(node => /Social Media/i.test(node.textContent));
    if (socialService) {
      const card = socialService.closest('.service-card, .card, article, div');
      const category = card && card.querySelector('.svc-category');
      if (category) category.textContent = 'Social';
      const desc = card && card.querySelector('.svc-desc');
      if (desc) desc.textContent = 'Social media virtual assistance for consistent posting, organized content workflows, and audience-ready brand communication.';
      let list = card && card.querySelector('.svc-list');
      if (!list && card) {
        list = document.createElement('ul');
        list.className = 'svc-list';
        card.appendChild(list);
      }
      if (list) {
        list.classList.remove('phase2-bullets');
        list.innerHTML = [
          'Social media content calendar management',
          'Post scheduling and publishing support',
          'Content planning and campaign coordination',
          'Community engagement and inquiry tracking',
          'Canva graphics and branded content support',
          'Approval workflows and content organization',
          'Social media reports and performance tracking'
        ].map(item => `<li>${item}</li>`).join('');
      }
    }

    const adminSkill = Array.from(document.querySelectorAll('#skills .skill-zone')).find(block => /Admin\s*&\s*Executive/i.test(block.querySelector('.skill-zone-label')?.textContent || ''));
    if (adminSkill) {
      const wrap = adminSkill.querySelector('.skill-capsules');
      if (wrap) {
        wrap.classList.remove('skill-bullets-wrap');
        wrap.innerHTML = [
          'Calendar Management',
          'Email & Inbox Management',
          'Digital Operations',
          'Stakeholder Communication',
          'Workflow Systems',
          'Client Onboarding',
          'Progress Reporting',
          'Event Planning Support',
          'Process Documentation'
        ].map(item => `<div class="skill-capsule">${item}</div>`).join('');
      }
    }

    const socialSkill = Array.from(document.querySelectorAll('#skills .skill-zone')).find(block => /Social Media\s*&\s*Design|Social Media and Design/i.test(block.querySelector('.skill-zone-label')?.textContent || ''));
    if (socialSkill) {
      const wrap = socialSkill.querySelector('.skill-capsules');
      if (wrap) {
        wrap.classList.add('skill-bullets-wrap');
        wrap.innerHTML = `<ul class="phase2-bullets skill-bullet-list">${[
          'Content Calendar Planning',
          'Social Media Workflow Systems',
          'Promotional Poster Design',
          'Email Marketing Layouts',
          'Brand Identity & Logo Mockups',
          'Product and Food Poster Design',
          'Book Cover and Story Visuals',
          'HTML Case Study Presentation',
          'AI-Assisted Creative Direction'
        ].map(item => `<li>${item}</li>`).join('')}</ul>`;
      }
    }
  }

  function updateTools() {
    const track = document.getElementById('marqueeTrack') || document.querySelector('#tools .marquee-track');
    if (!track) return;
    track.classList.add('marquee-track');
    const tools = [
      ['assets/tool-logos/tool-logo-google-docs.png', 'Google Docs'],
      ['assets/tool-logos/tool-logo-google-sheets.png', 'Google Sheets'],
      ['assets/tool-logos/tool-logo-google-calendar.png', 'Google Calendar'],
      ['assets/tool-logos/tool-logo-google-drive.png', 'Google Drive'],
      ['assets/tool-logos/tool-logo-gmail.png', 'Gmail'],
      ['assets/tool-logos/tool-logo-microsoft-word.png', 'Microsoft Word'],
      ['assets/tool-logos/tool-logo-microsoft-excel.png', 'Microsoft Excel'],
      ['assets/tool-logos/tool-logo-canva.png', 'Canva'],
      ['assets/tool-logos/tool-logo-capcut.png', 'CapCut'],
      ['assets/tool-logos/tool-logo-trello.png', 'Trello'],
      ['assets/tool-logos/tool-logo-chatgpt.png', 'ChatGPT'],
      ['assets/tool-logos/tool-logo-claude.png', 'Claude AI'],
      ['assets/tool-logos/tool-logo-codex.png', 'Codex'],
      ['assets/tool-logos/tool-logo-gemini.png', 'Gemini'],
      ['assets/tool-logos/tool-logo-github.png', 'GitHub'],
      ['assets/tool-logos/tool-logo-grammarly.png', 'Grammarly'],
      ['assets/tool-logos/tool-logo-discord.png', 'Discord'],
      ['assets/tool-logos/tool-logo-whatsapp.png', 'WhatsApp'],
      ['assets/tool-logos/tool-logo-instagram.png', 'Instagram'],
      ['assets/tool-logos/tool-logo-facebook.png', 'Facebook'],
      ['assets/tool-logos/tool-logo-linkedin.png', 'LinkedIn'],
      ['assets/tool-logos/tool-logo-youtube.png', 'YouTube'],
      ['assets/tool-logos/tool-logo-pinterest.png', 'Pinterest'],
      ['assets/tool-logos/tool-logo-google-meet.png', 'Google Meet'],
      ['assets/tool-logos/tool-logo-zoom.png', 'Zoom']
    ];
    track.innerHTML = [...tools, ...tools].map(([file, label]) => `<div class="tool-bubble" role="listitem"><div class="tool-logo-wrap"><img src="${file}" alt="${label} logo" loading="lazy"></div><span class="tool-label">${label}</span></div>`).join('');
  }

  function fixMojibake() {
    const replacements = [
      ['\u00e2\u20ac\u201d', '—'],
      ['\u00e2\u20ac\u201c', '–'],
      ['\u00e2\u2020\u2019', '→'],
      ['\u00e2\u0153\u00a6', '✦'],
      ['\u00c2\u00b7', '·'],
      ['\u00c2\u00a9', '©'],
      ['\u00c2', ''],
      ['\u00f0\u0178\u2018\u2039', ''],
      ['\u00f0\u0178', '']
    ];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      let text = node.nodeValue;
      replacements.forEach(([pattern, value]) => text = text.split(pattern).join(value));
      node.nodeValue = text;
    });
  }

  function updateProfileImages() {
    const heroImgs = Array.from(document.querySelectorAll('img')).filter(img => /Hyacinth|profile|hero/i.test(img.alt || '') || /profile|hero/i.test(img.src || ''));
    if (heroImgs[0]) heroImgs[0].src = 'assets/profile/hero-page-profile.png';
    const about = document.querySelector('#about img');
    if (about) about.src = 'assets/profile/about-me-page-profile.png';
  }

  function wireEndorsementButtons() {
    const buttons = Array.from(document.querySelectorAll('button, a'));
    buttons.forEach(btn => {
      if (/View Full Credential Letter/i.test(btn.textContent)) {
        btn.setAttribute('onclick', 'openLetterPopup(); return false;');
      }
    });
    const endorsement = document.querySelector('#endorsement, #executive-endorsement, section[aria-label*="Endorsement"], section');
    const existing = buttons.find(btn => /View Certificates/i.test(btn.textContent));
    const letterBtn = buttons.find(btn => /View Full Credential Letter/i.test(btn.textContent));
    if (letterBtn && !existing) {
      letterBtn.insertAdjacentHTML('afterend', '<button class="btn-view-letter btn-view-certificates" type="button" onclick="openRecognitionPopup()">View Certificates</button>');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('phase2-compact');
    updateCards();
    updateServicesAndSkills();
    updateTools();
    updateProfileImages();
    wireEndorsementButtons();
    preloadSampleWorksAssets();
    fixMojibake();
  });
})();

// ============================================================
// CODEX SKILL CAPSULE SAFETY (originally <script id="codex-skill-capsule-safety-20260502">)
// ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    const socialSkill = Array.from(document.querySelectorAll('#skills .skill-zone')).find(block => /Social Media\s*&\s*Design|Social Media and Design/i.test(block.querySelector('.skill-zone-label')?.textContent || ''));
    const wrap = socialSkill && socialSkill.querySelector('.skill-capsules');
    if (!wrap) return;
    wrap.classList.remove('skill-bullets-wrap');
    wrap.innerHTML = [
      'Content Calendar Planning',
      'Social Media Workflow Systems',
      'Promotional Poster Design',
      'Email Marketing Layouts',
      'Brand Identity & Logo Mockups',
      'Product and Food Poster Design',
      'Book Cover and Story Visuals',
      'HTML Case Study Presentation',
      'AI-Assisted Creative Direction'
    ].map(item => `<div class="skill-capsule">${item}</div>`).join('');
  });
