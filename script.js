document.addEventListener('DOMContentLoaded', () => {
  
  let parentName   = '';
  let childStage   = '';
  let userLang     = 'en';
  let chats        = {};
  window.chats = chats;
  let chatCounter  = 0;
  let currentChatId= null;



  // Elements
  const overlay         = document.getElementById('overlay');
  const dashboard       = document.getElementById('dashboard');
  const chatLog         = document.getElementById('chat');
  const chatList        = document.getElementById('chat-list');
  const slogan          = document.getElementById('slogan');
  const taglineEn       = document.getElementById('tagline');
  const taglineSi       = document.getElementById('tagline-si');
  const langEnBtn       = document.getElementById('lang-en');
  const langSiBtn       = document.getElementById('lang-si');
  const loginBtn        = document.getElementById('login');
  const sendBtn         = document.getElementById('send');
  const userInput       = document.getElementById('user-input');
  const newChatBtn      = document.getElementById('new-chat');
  const sidebarStage    = document.getElementById('sidebar-stage-select');
  const stageModal      = document.getElementById('stage-modal');
  const stageSave       = document.getElementById('stage-save');
  const inputStage      = document.getElementById('input-stage');
  const languageModal   = document.getElementById('language-modal');
  const langSelectEn    = document.getElementById('lang-select-en');
  const langSelectSi    = document.getElementById('lang-select-si');
  const menuToggle      = document.getElementById('menu-toggle');
  const sidebar         = document.querySelector('.sidebar');
  const subscribeBtn = document.getElementById('subscribe-btn');
  const db = firebase.firestore();

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

  // ── Allow Enter to send (Shift+Enter for newline) ─────────────
  userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();   // prevent a newline
      sendBtn.click();      // trigger existing send logic
    }
  });

  // Toggle sidebar
  menuToggle.onclick = () => {
    sidebar.classList.toggle('active');
  };

  // inside your DOMContentLoaded listener, after auth is ready:
  subscribeBtn.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    if (!user) return alert('Please log in first.');
    // open the subscribe function, passing uid as a query param
    window.open(`/api/payhere/subscribe`, '_blank');
  });

  // ← NEW: show subscription outcome
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  if (status === 'success') {
    alert('🎉 Subscription activated!');
  } else if (status === 'cancel') {
    alert('⚠️ Subscription was canceled.');
  }

  // Language text content
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

  // Language toggle
  function setLanguage(lang) {
    userLang = lang;
    slogan.innerText        = TEXTS[lang].slogan;
    taglineEn.style.display = lang === 'en' ? 'block' : 'none';
    taglineSi.style.display = lang === 'si' ? 'block' : 'none';
    taglineEn.innerText = TEXTS.en.tagline;
    taglineSi.innerText = TEXTS.si.tagline;
    langEnBtn.classList.toggle('active', lang === 'en');
    langSiBtn.classList.toggle('active', lang === 'si');
    userInput.placeholder = TEXTS[lang].placeholder;
  }
  langEnBtn.onclick = () => setLanguage('en');
  langSiBtn.onclick = () => setLanguage('si');

  loginBtn.onclick = async () => {
    const email = document.getElementById('input-email').value.trim();
    const pass  = document.getElementById('input-pass').value.trim();
    if (!email || !pass) return alert('Enter email & password');

    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      const user = firebase.auth().currentUser;
      if (!user.emailVerified) {
        alert("Please verify your email before continuing.");
        await firebase.auth().signOut();
        return;
      }
      overlay.classList.add('hidden');
      dashboard.classList.remove('hidden');
      await loadUserProfile();
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-login-credentials') {
        alert('Incorrect password.');
      } else if (err.code === 'auth/user-not-found') {
        alert('No account found with this email. Please register first.');
      } else {
        alert('Login failed: ' + err.message);
      }
    }
    
  };

  const forgotPassLink = document.getElementById('forgot-password-link');

  forgotPassLink.onclick = async (e) => {
    e.preventDefault();

    const email = document.getElementById('input-email').value.trim();
    if (!email) return alert('Please enter your email address to reset your password.');

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Password reset email sent. Check your inbox.');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        alert('No account found with that email.');
      } else {
        alert('Error: ' + err.message);
      }
    }
  };

  async function loadUserProfile() {
    const user = firebase.auth().currentUser;
    if (!user) return;
  
    try {
      const doc = await db.collection("users").doc(user.uid).get();
      if (doc.exists) {
        const data = doc.data();
        const fullName = data.fullName || 'User';
        parentName = data.fullName.split(' ')[0];
        const email = data.email || '';
        const phone = data.phone || '';
  
        // Set all available elements only if they exist
        const nameEl = document.getElementById('settings-name');
        const emailEl = document.getElementById('settings-email');
        const phoneEl = document.getElementById('field-phone');
        const fullNameField = document.getElementById('field-fullname');
        const emailField = document.getElementById('field-email');
        const avatar = document.querySelector('.avatar-circle');
  
        if (nameEl) nameEl.innerText = fullName;
        if (emailEl) emailEl.innerText = email;
        if (phoneEl) phoneEl.innerText = phone;
        if (fullNameField) fullNameField.innerText = fullName;
        if (emailField) emailField.innerText = email;
        if (avatar) avatar.innerText = fullName.charAt(0).toUpperCase();
  
        // Also update sidebar label
        const sidebarName = document.getElementById('profile-name');
        if (sidebarName) sidebarName.innerText = fullName;
      } else {
        console.warn("No profile data found.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  newChatBtn.onclick = () => {
    // Close sidebar first
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
    }

    // Then show the language modal
    languageModal.classList.remove('hidden');
  };

  // Language modal selections
  langSelectEn.onclick = () => {
    setLanguage('en');
    languageModal.classList.add('hidden');
    createNewChat();
  };
  langSelectSi.onclick = () => {
    setLanguage('si');
    languageModal.classList.add('hidden');
    createNewChat();
  };

  // Create a fresh chat session
  function createNewChat() {
    if (currentChatId && chats[currentChatId]) {
      const messages = Array.from(chatLog.children)
      .filter(el => !el.classList.contains('typing'))
      .map(el => ({
        text: el.dataset.raw || el.innerText,
        cls: el.className,
        isGreeting: el.dataset.isGreeting === 'true'
      }));
    
      chats[currentChatId] = {
        ...chats[currentChatId], // preserve lang
        messages
      };
    }
    chatCounter++;
    currentChatId = `chat${chatCounter}`;
    chats[currentChatId] = {
      lang: userLang,
      messages: []
    };
    renderChatList();
    loadChat(currentChatId);

    // Greeting
    const tmpl    = TEXTS[userLang].greeting;
    const message = tmpl.replace('{name}', parentName);
    addMessage(message, 'bot', { isGreeting: true });

    // 🔽 Close sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
    }
  }

  // Chat list render
  function renderChatList() {
    chatList.innerHTML = '';
    Object.keys(chats).forEach(id => {
      const li = document.createElement('li');
      li.innerText = id;
      li.classList.toggle('active', id === currentChatId);
      li.onclick = () => {
        // ✅ Collect messages from current chat UI
        const messages = Array.from(chatLog.children).map(el => ({
          text: el.dataset.raw || el.innerText,
          cls: el.className,
          isGreeting: el.dataset.isGreeting === 'true'
        }));
      
        // ✅ Store messages in current chat without overwriting metadata
        if (currentChatId && chats[currentChatId]) {
          chats[currentChatId] = {
            ...chats[currentChatId],
            messages
          };
        }
      
        loadChat(id);
      
        // 🔽 Close sidebar on mobile
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
        }
      };
      chatList.appendChild(li);
    });
  }

  function loadChat(id) {
    currentChatId = id;
    chatLog.innerHTML = '';
  
    const chat = chats[id];
    const lang = chat?.lang || 'en';
    setLanguage(lang);
  
    const chatMessages = chat?.messages || [];
    chatMessages.forEach(msg => {
      addMessage(msg.text, msg.cls.split(' ')[1], {
        isGreeting: msg.isGreeting,
        skipSave: true  // ✅ Don't duplicate message in history
      });
    });
  
    renderChatList();
  }

  // Stage selection
  sidebarStage.onchange = () => childStage = sidebarStage.value;
  stageSave.onclick = () => {
    childStage = inputStage.value;
    stageModal.classList.add('hidden');
  };

  //talk to ai
  async function getAIResponse(prompt,chatId) {
    const chat = chats[chatId];
    const lang = chat?.lang || 'en';
  
    // 1️⃣ Rebuild history
    const history = (chat?.messages || [])
      .filter(msg => !msg.isGreeting)
      .map(msg => ({
        role:  msg.cls.includes('user') ? 'user' : 'assistant',
        content: msg.text
      }));
  
    // 2️⃣ Build full prompt with correct per-chat language
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT[lang] },
      { role: 'system', content: `Child Stage: ${childStage || 'Not set'}` },
      ...history,
      { role: 'user', content: prompt }
    ];
  
    // Proxy through Netlify Function
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Chat error ${res.status}: ${text}`);
    }
    const { reply } = await res.json();
    return reply;
  }

  sendBtn.onclick = async () => {
    const text = userInput.value.trim();
    if (!text) return;
  
    const chatIdAtSend = currentChatId;
  
    // 🔒 Disable input while bot is responding
    userInput.disabled = true;
    sendBtn.disabled = true;
  
    // Show user's message immediately
    addMessage(text, 'user', { chatId: chatIdAtSend });
  
    userInput.value = '';
  
    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'message bot typing';
    typing.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    chatLog.appendChild(typing);
    chatLog.scrollTop = chatLog.scrollHeight;
  
    try {
      const reply = await getAIResponse(text, chatIdAtSend);
  
      typing.remove();
  
      // ✅ Let `addMessage()` handle saving to the correct chat
      addMessage(reply, 'bot', {
        chatId: chatIdAtSend,
        skipSave: false  // ensure it’s saved
      });
  
      // ✅ If user is still in this chat, show it
      if (chatIdAtSend !== currentChatId) {
        // no need to render; it’s already saved and will show on return
      }
  
    } catch (err) {
      typing.remove();
      addMessage('⚠️ Sorry, something went wrong. Try again.', 'bot');
      console.error(err);
    } finally {
      userInput.disabled = false;
      sendBtn.disabled = false;
      userInput.focus();
    }
  };

  // Add message
  function addMessage(txt, cls, opts = {}) {
    const m = document.createElement('div');
    m.className = `message ${cls}`;
    m.dataset.raw = txt;
    if (opts.isGreeting) m.dataset.isGreeting = 'true';

    m.innerHTML = cls === 'bot' ? marked.parse(txt) : txt;

    // Only show messages for active chat
    if (opts.chatId === currentChatId || !opts.chatId) {
      chatLog.appendChild(m);
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Save message unless explicitly skipped
    if (!opts.skipSave) {
      const targetChatId = opts.chatId || currentChatId;
      if (!chats[targetChatId]) {
        chats[targetChatId] = { lang: userLang, messages: [] };
      }

      chats[targetChatId].messages.push({
        text: txt,
        cls: `message ${cls}`,
        isGreeting: opts.isGreeting || false
      });
    }
  }

  document.addEventListener('click', (event) => {
    // Only do this on mobile
    if (window.innerWidth > 768) return;

    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnHamburger = menuToggle.contains(event.target);

    // If click is outside both, close the sidebar
    if (!isClickInsideSidebar && !isClickOnHamburger) {
      sidebar.classList.remove('active');
    }
  });

  const userMenuBtn = document.getElementById('user-menu-btn');
  const userMenuPopup = document.getElementById('user-menu-popup');

  userMenuBtn.addEventListener('click', e => {
    e.stopPropagation();
    userMenuPopup.classList.toggle('visible');
  });

  document.addEventListener('click', e => {
    if (!userMenuPopup.contains(e.target) && e.target !== userMenuBtn) {
      userMenuPopup.classList.remove('visible');
    }
  });
  
});

document.getElementById('logout-btn').onclick = () => {
  firebase.auth().signOut().then(() => {
    location.reload(); // or redirect to login page
  });
};



document.getElementById('open-settings-btn').onclick = () => {
  const fullName = document.getElementById('profile-name')?.innerText || 'User';
  const email = firebase.auth().currentUser?.email || '';
  const phone = document.getElementById('field-phone')?.innerText || '';  // ✅ fixed

  const avatar = document.querySelector('.avatar-circle');

  document.getElementById('settings-name').innerText = fullName;
  document.getElementById('settings-email').innerText = email;
  document.getElementById('field-fullname').innerText = fullName;
  document.getElementById('field-email').innerText = email;
  document.getElementById('field-phone').innerText = phone;

  if (avatar) {
    avatar.innerText = fullName.charAt(0).toUpperCase();
  }

  document.getElementById('settings-overlay').classList.remove('hidden');
};

document.getElementById('close-settings-btn').onclick = () => {
  document.getElementById('settings-overlay').classList.add('hidden');
};


document.getElementById('maslogout-btn').onclick = () => {
  firebase.auth().signOut().then(() => {
    location.reload(); // or redirect to login page
  });
};