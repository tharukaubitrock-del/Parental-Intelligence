/* script.js */

// ── Language text content (moved to top) ─────────────────
const TEXTS = {
  en: {
    slogan:   'For the Parent in All of Us.',
    tagline:  'Because every parent deserves answers, empathy, and peace of mind.',
    greeting: 'Hello {name}! I’m PI+ — your coaching companion. How can I help you today?',
    placeholder: 'Ask me anything…'
  },
  si: {
    slogan:   'ඔබ තුළ සිටින මව්පියන් වෙනුවෙන්.',
    tagline:  'සෑම දෙමව්පියෙකුටම පිළිතුරු, කරුණාව සහ සිතේ සහනය හිමි විය යුතුය.',
    greeting: 'හෙලෝ {name}! මම PI+ — ඔබගේ උපදේශන සගයා. මට අද ඔබට කෙසේ උදව් කළ හැකිද?',
    placeholder:'ඕනෑම දෙයක් අහන්න...'
  }
};

const SYSTEM_PROMPT = {
  en: `You are PI+, a warm Sri Lankan parenting coach...`,
  si: `ඔබ PI+, උණුසුම් සිතුවිලි සහ දකුණු ආචාර…`
};

// ── Main ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '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';

  let parentName    = '';
  let childStage    = '';
  let userLang      = 'en';
  const chats       = {};
  window.chats     = chats;
  let chatCounter   = 0;
  let currentChatId = null;

  // Elements
  const overlay       = document.getElementById('overlay');
  const dashboard     = document.getElementById('dashboard');
  const chatLog       = document.getElementById('chat');
  const chatList      = document.getElementById('chat-list');
  const slogan        = document.getElementById('slogan');
  const taglineEn     = document.getElementById('tagline');
  const taglineSi     = document.getElementById('tagline-si');
  const langEnBtn     = document.getElementById('lang-en');
  const langSiBtn     = document.getElementById('lang-si');
  const loginBtn      = document.getElementById('login');
  const sendBtn       = document.getElementById('send');
  const userInput     = document.getElementById('user-input');
  const newChatBtn    = document.getElementById('new-chat');
  const sidebarStage  = document.getElementById('sidebar-stage-select');
  const stageModal    = document.getElementById('stage-modal');
  const stageSave     = document.getElementById('stage-save');
  const inputStage    = document.getElementById('input-stage');
  const languageModal = document.getElementById('language-modal');
  const langSelectEn  = document.getElementById('lang-select-en');
  const langSelectSi  = document.getElementById('lang-select-si');
  const menuToggle    = document.getElementById('menu-toggle');
  const sidebar       = document.querySelector('.sidebar');
  const db            = firebase.firestore();

  // Subscribe button
  const subscribeBtn = document.getElementById('subscribe-btn');
  subscribeBtn.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    if (!user) return alert('Please log in first.');
    window.open(`/api/payhere/subscribe?uid=${user.uid}`, '_blank');
  });

  // Show subscription outcome
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  if (status === 'success') {
    alert('🎉 Subscription activated!');
  } else if (status === 'cancel') {
    alert('⚠️ Subscription was canceled.');
  }

  // Allow Enter to send (Shift+Enter for newline)
  userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  // Toggle sidebar
  menuToggle.onclick = () => {
    sidebar.classList.toggle('active');
  };

  // Language toggle function
  function setLanguage(lang) {
    userLang = lang;
    slogan.innerText        = TEXTS[lang].slogan;
    taglineEn.style.display = lang === 'en' ? 'block' : 'none';
    taglineSi.style.display = lang === 'si' ? 'block' : 'none';
    taglineEn.innerText     = TEXTS.en.tagline;
    taglineSi.innerText     = TEXTS.si.tagline;
    langEnBtn.classList.toggle('active', lang === 'en');
    langSiBtn.classList.toggle('active', lang === 'si');
    userInput.placeholder   = TEXTS[lang].placeholder;
  }
  langEnBtn.onclick = () => setLanguage('en');
  langSiBtn.onclick = () => setLanguage('si');

  // Firebase auth state
  firebase.auth().onAuthStateChanged(async user => {
    document.body.classList.remove('initializing');
    if (user) {
      overlay.classList.add('hidden');
      dashboard.classList.remove('hidden');
      await loadUserProfile();
      createNewChat();
    } else {
      overlay.classList.remove('hidden');
      dashboard.classList.add('hidden');
    }
  });

  // Login button
  loginBtn.onclick = async () => { /* existing login logic */ };

  // Forgot password
  const forgotPassLink = document.getElementById('forgot-password-link');
  forgotPassLink.onclick = async (e) => { /* existing reset logic */ };

  // Load user profile
  async function loadUserProfile() { /* existing profile logic */ }

  // New chat
  newChatBtn.onclick = () => { languageModal.classList.remove('hidden'); };
  langSelectEn.onclick = () => { setLanguage('en'); languageModal.classList.add('hidden'); createNewChat(); };
  langSelectSi.onclick = () => { setLanguage('si'); languageModal.classList.add('hidden'); createNewChat(); };

  // Create chat session
  function createNewChat() { /* existing create logic using TEXTS */ }

  // Render chat list
  function renderChatList() { /* existing render logic */ }

  // Load chat
  function loadChat(id) { /* existing load logic calling setLanguage */ }

  // Stage selection
  sidebarStage.onchange = () => childStage = sidebarStage.value;
  stageSave.onclick    = () => { childStage = inputStage.value; stageModal.classList.add('hidden'); };

  // AI response
  async function getAIResponse(prompt, chatId) { /* existing AI call logic */ }

  // Send button
  sendBtn.onclick = async () => { /* existing send logic */ };

  // Add message helper
  function addMessage(txt, cls, opts = {}) { /* existing add message logic */ }

  // Click outside sidebar
  document.addEventListener('click', (event) => { /* existing logic */ });

  // User menu
  const userMenuBtn   = document.getElementById('user-menu-btn');
  const userMenuPopup = document.getElementById('user-menu-popup');
  userMenuBtn.addEventListener('click', e => { e.stopPropagation(); userMenuPopup.classList.toggle('visible'); });
  document.addEventListener('click', e => { if (!userMenuPopup.contains(e.target) && e.target !== userMenuBtn) userMenuPopup.classList.remove('visible'); });

});

// Outside DOMContentLoaded handlers for static buttons

document.getElementById('logout-btn').onclick = () => firebase.auth().signOut().then(() => location.reload());
document.getElementById('open-settings-btn').onclick = () => { /* existing settings open logic */ };
document.getElementById('close-settings-btn').onclick = () => document.getElementById('settings-overlay').classList.add('hidden');
document.getElementById('maslogout-btn').onclick = () => firebase.auth().signOut().then(() => location.reload());