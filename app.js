/* ==========================================================================
   LifeCraft — Open Habit Framework
   Core Application Logic
   ========================================================================== */

// --- ARABIC NUMERALS HELPER ---
const AR = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
const toAr = (n) => String(n).replace(/[0-9]/g, d => AR[+d]);

function formatTimeAr(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${toAr(String(m).padStart(2,'0'))}:${toAr(String(s).padStart(2,'0'))}`;
}

// Category metadata
const CATEGORIES = {
  work:      { label: 'عمل ومهنة',        icon: '💼', color: '#E5A93B' },
  learning:  { label: 'تعلّم وتطوير',     icon: '📚', color: '#00BFA5' },
  health:    { label: 'صحة ولياقة',        icon: '🏃', color: '#4BD37F' },
  creative:  { label: 'إبداع وفن',         icon: '🎨', color: '#FF8A5B' },
  spiritual: { label: 'روحاني وتأمل',      icon: '🌿', color: '#90A4AE' },
  other:     { label: 'أخرى',              icon: '✨', color: '#7CA6FF' }
};

// ==========================================================================
// --- LANGUAGE SWITCHING ---
// ==========================================================================
let currentLang = localStorage.getItem('lifecraft_lang') || 'ar';

const DEFAULT_HABIT_NAME_KEYS = {
  'القراءة اليومية': 'habit_name_daily_reading',
  'التمارين الرياضية': 'habit_name_exercise',
  'الكتابة اليومية': 'habit_name_daily_writing',
  'التأمل والاسترخاء': 'habit_name_meditation_relaxation',
  'النوم المبكر': 'habit_name_sleep_early',
  'شرب الماء بانتظام': 'habit_name_drink_water',
  'التعلم المستمر': 'habit_name_continuous_learning',
  'تنظيم الوقت': 'habit_name_time_management',
  'تخطيط اليوم': 'habit_name_plan_day',
  'مراجعة الأهداف': 'habit_name_review_goals'
};

function getLocalizedNumber(value) {
  return currentLang === 'ar' ? toAr(value) : String(value);
}

function getLocalizedHabitName(habitOrName) {
  const rawName = typeof habitOrName === 'string' ? habitOrName : habitOrName?.name;
  if (!rawName) return '—';

  const translationKey = typeof habitOrName === 'object' && habitOrName?.nameKey
    ? habitOrName.nameKey
    : DEFAULT_HABIT_NAME_KEYS[rawName];

  return translationKey && translations[currentLang]?.[translationKey]
    ? translations[currentLang][translationKey]
    : rawName;
}

function containsArabic(text) {
  if (!text || typeof text !== 'string') return false;
  // Unicode Arabic block detection
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
}

function getLocalizedWhy(habit) {
  // Prefer habit.description object when available: { ar: '', en: '' }
  if (!habit) return '';
  if (habit.description && typeof habit.description === 'object') {
    const val = habit.description[currentLang] || habit.description['en'] || habit.description['ar'] || '';
    return val;
  }

  // Habit may provide a whyKey for translation (defaults), or a freeform why string entered by user.
  // Prefer explicit whyKey
  if (habit.whyKey && translations[currentLang] && translations[currentLang][habit.whyKey]) {
    return translations[currentLang][habit.whyKey];
  }

  // If no description or whyKey, try mapping from default Arabic why text to a key
  const DEFAULT_WHY_KEYS = {
    'تطوير العقل والمعرفة المستمرة': 'habit_why_daily_reading',
    'تحسين اللياقة والصحة العامة': 'habit_why_exercise',
    'تنمية مهارة التعبير والإبداع': 'habit_why_daily_writing',
    'تحسين التركيز والصفاء الذهني': 'habit_why_meditation_relaxation',
    'الحصول على راحة كافية للجسم': 'habit_why_sleep_early',
    'الحفاظ على ترطيب الجسم': 'habit_why_drink_water',
    'تطوير المهارات المهنية': 'habit_why_continuous_learning',
    'زيادة الإنتاجية والإنجاز': 'habit_why_time_management',
    'تحديد الأولويات بوضوح': 'habit_why_plan_day',
    'متابعة التقدم والتحسين': 'habit_why_review_goals'
  };

  if (typeof habit.why === 'string') {
    const mappedKey = DEFAULT_WHY_KEYS[habit.why];
    if (mappedKey && translations[currentLang] && translations[currentLang][mappedKey]) {
      return translations[currentLang][mappedKey];
    }
    // Fallback to the raw string
    return habit.why;
  }

  return '';
}

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lifecraft_lang', lang);

  // Set document direction and html lang attribute
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';

  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update language toggle button text
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
  }

  // Update category labels in select using data-i18n
  const categorySelect = document.getElementById('new-habit-category');
  if (categorySelect) {
    const options = categorySelect.querySelectorAll('option');
    options.forEach(option => {
      const key = option.getAttribute('data-i18n');
      if (key && translations[lang] && translations[lang][key]) {
        option.textContent = translations[lang][key];
      }
    });
  }

  // Update toggle habits form button
  const toggleHabitsBtn = document.getElementById('toggle-habits-form');
  if (toggleHabitsBtn) {
    const habitAddForm = document.getElementById('habit-add-form');
    const isOpen = habitAddForm && !habitAddForm.classList.contains('hidden');
    const addText = lang === 'ar' ? '+ إضافة عادة جديدة' : '+ Add New Habit';
    const closeText = lang === 'ar' ? '✕ إغلاق' : '✕ Close';
    toggleHabitsBtn.textContent = isOpen ? closeText : addText;
  }

  // Update theme-label in card header
  const themeLabel = document.getElementById('theme-label');
  if (themeLabel && translations[lang] && translations[lang].stage_tag) {
    themeLabel.textContent = translations[lang].stage_tag;
  }

  // Re-render dynamic content that uses translations
  if (window.app) {
  try {
    if (window.app.renderHabitSelector) window.app.renderHabitSelector();
    if (window.app.renderHabitsList) window.app.renderHabitsList();
    if (window.app.renderHistory) window.app.renderHistory();
    if (window.app.renderStats) window.app.renderStats();
    if (window.app.renderIdentityPools) window.app.renderIdentityPools();
    if (window.app.renderWeeklyPlan) window.app.renderWeeklyPlan();
    if (window.app.updateDurationDisplay) window.app.updateDurationDisplay();
  } catch (e) {
    console.error('Error re-rendering after language switch (switchLanguage):', e);
  }
}

// Also emit console info for debugging
console.info('Language switched to', lang);
}

function getCategoryLabelEn(category) {
  const labels = {
    work: '💼 Work & Career',
    learning: '📚 Learning & Development',
    health: '🏃 Health & Fitness',
    creative: '🎨 Creativity & Art',
    spiritual: '🌿 Spiritual & Meditation',
    other: '✨ Other'
  };
  return labels[category] || '✨ Other';
}

// ==========================================================================
// --- SOUND ENGINE ---
// ==========================================================================
class SoundManager {
  constructor() { this.ctx = null; }

  wake() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  tone(freq, type, duration, startGain = 0.1) {
    this.wake();
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, this.ctx.currentTime);
    g.gain.setValueAtTime(startGain, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(); o.stop(this.ctx.currentTime + duration);
  }

  success() {
    this.wake();
    [261.63, 329.63, 392, 523.25].forEach((f, i) => {
      setTimeout(() => this.tone(f, 'triangle', 0.4, 0.12), i * 100);
    });
  }

  tick() { this.tone(600, 'sine', 0.08, 0.04); }

  levelUp() {
    this.wake();
    [392, 392, 392, 523.25, 659.25, 783.99].forEach((f, i) => {
      setTimeout(() => this.tone(f, 'sawtooth', 0.3, 0.08), [0,120,240,360,560,760][i]);
    });
  }
}

const sound = new SoundManager();

// ==========================================================================
// --- STATE MANAGEMENT ---
// ==========================================================================
class AppState {
  createDefaultWeeklyPlan() {
    return {
      vision: '',
      days: ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'].map(key => ({
        key,
        tasks: []
      }))
    };
  }

  normalizeWeeklyPlan(weeklyPlan) {
    const basePlan = this.createDefaultWeeklyPlan();
    if (!weeklyPlan || typeof weeklyPlan !== 'object') return basePlan;

    const normalizedDays = basePlan.days.map((defaultDay, index) => {
      const savedDay = Array.isArray(weeklyPlan.days) ? weeklyPlan.days.find(day => day?.key === defaultDay.key) || weeklyPlan.days[index] : null;
      const tasks = Array.isArray(savedDay?.tasks)
        ? savedDay.tasks.map(task => ({
            id: task?.id || `${defaultDay.key}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            text: task?.text || '',
            done: Boolean(task?.done)
          }))
        : [];

      return { key: defaultDay.key, tasks };
    });

    return {
      vision: typeof weeklyPlan.vision === 'string' ? weeklyPlan.vision : '',
      days: normalizedDays
    };
  }

  constructor() {
    this.xp = 0;
    this.level = 1;
    this.streak = 0;
    this.lastDate = null;
    this.xpPerLevel = 50;
    this.habits = [];
    this.history = [];
    this.totalSessions = 0;
    this.atomicWatcherEnabled = false;
    this.habitDeadline = null;
    this.diagnosticAnswers = null;
    this.systemImprovements = [];
    this.identityPools = {}; // { "مبرمج محترف": { xp: 0, level: 1, xpPerLevel: 50 } }
    this.environmentCues = []; // { id, habitId, habitName, modification, timestamp, scheduledTime }
    this.xpFreezeUntil = null; // Date when XP freeze ends
    this.contractLocked = false; // Whether app is locked by contract
    this.hasActivePenalty = false; // Whether an active contract penalty is unresolved
    this.isContractSigned = false; // Whether the contract was successfully signed and cleared
    this.atomicDisciplineData = {}; // { "YYYY-MM-DD": { habitId: status } } - stores daily discipline status per habit
    this.weeklyPlan = this.createDefaultWeeklyPlan();
    this.load();
  }

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem('lifecraft_v2') || 'null');
      if (!saved) { this.setDefaults(); return; }
      this.xp = saved.xp || 0;
      this.level = saved.level || 1;
      this.streak = saved.streak || 0;
      this.lastDate = saved.lastDate || null;
      this.habits = saved.habits || [];
      this.history = saved.history || [];
      this.totalSessions = saved.totalSessions || this.history.length;
      this.atomicWatcherEnabled = saved.atomicWatcherEnabled || false;
      this.habitDeadline = saved.habitDeadline || null;
      this.diagnosticAnswers = saved.diagnosticAnswers || null;
      this.systemImprovements = saved.systemImprovements || [];
      this.identityPools = saved.identityPools || {};
      this.environmentCues = saved.environmentCues || [];
      this.xpFreezeUntil = saved.xpFreezeUntil || null;
      const activePenaltyFlag = saved.hasActivePenalty ?? saved.contractLocked ?? false;
      this.hasActivePenalty = activePenaltyFlag === true || localStorage.getItem('hasActivePenalty') === 'true';
      this.isContractSigned = saved.isContractSigned === true;
      this.contractLocked = this.hasActivePenalty;
      this.atomicDisciplineData = saved.atomicDisciplineData || {};
      this.weeklyPlan = this.normalizeWeeklyPlan(saved.weeklyPlan);

      // Migrate any legacy habit 'why' strings into description objects for i18n
      if (this.habits && Array.isArray(this.habits)) {
        let migrated = false;
        this.habits.forEach(h => {
          if (h && !h.description) {
            const desc = {};
            if (h.why && typeof h.why === 'string' && h.why.trim().length > 0) {
              // Use stored Arabic text as 'ar'
              desc.ar = h.why;
            }
            // If whyKey exists and translations available, populate both languages when possible
            if (h.whyKey && translations['ar'] && translations['ar'][h.whyKey]) {
              desc.ar = desc.ar || translations['ar'][h.whyKey];
            }
            if (h.whyKey && translations['en'] && translations['en'][h.whyKey]) {
              desc.en = translations['en'][h.whyKey];
            }

            // If we couldn't populate 'en' but we have a raw Arabic string, leave 'en' undefined
            if (Object.keys(desc).length > 0) {
              h.description = desc;
              migrated = true;
            }
          }
        });
        if (migrated) this.save();
      }

      // If habits array is empty, load default habits
      if (!this.habits || this.habits.length === 0) {
        this.setDefaults();
      }
    } catch(e) {
      console.error('State load error:', e);
      this.setDefaults();
    }
  }

  setDefaults() {
    this.habits = [
    { id: 1, name: 'القراءة اليومية', nameKey: 'habit_name_daily_reading', duration: 30, category: 'learning', identity: 'قارئ نهم', whyKey: 'habit_why_daily_reading', description: { ar: 'تطوير العقل والمعرفة المستمرة', en: translations.en?.habit_why_daily_reading || 'Mind development & continuous knowledge' } },
    { id: 2, name: 'التمارين الرياضية', nameKey: 'habit_name_exercise', duration: 45, category: 'health', identity: 'شخص رياضي', whyKey: 'habit_why_exercise', description: { ar: 'تحسين اللياقة والصحة العامة', en: translations.en?.habit_why_exercise || 'Improving fitness and general health' } },
    { id: 3, name: 'الكتابة اليومية', nameKey: 'habit_name_daily_writing', duration: 20, category: 'creative', identity: 'كاتب مبدع', whyKey: 'habit_why_daily_writing', description: { ar: 'تنمية مهارة التعبير والإبداع', en: translations.en?.habit_why_daily_writing || 'Develop expression and creativity' } },
    { id: 4, name: 'التأمل والاسترخاء', nameKey: 'habit_name_meditation_relaxation', duration: 15, category: 'spiritual', identity: 'شخص متوازن', whyKey: 'habit_why_meditation_relaxation', description: { ar: 'تحسين التركيز والصفاء الذهني', en: translations.en?.habit_why_meditation_relaxation || 'Improve focus and mental clarity' } },
    { id: 5, name: 'النوم المبكر', nameKey: 'habit_name_sleep_early', duration: 0, category: 'health', identity: 'شخص صحي', whyKey: 'habit_why_sleep_early', description: { ar: 'الحصول على راحة كافية للجسم', en: translations.en?.habit_why_sleep_early || 'Get sufficient rest for the body' } },
    { id: 6, name: 'شرب الماء بانتظام', nameKey: 'habit_name_drink_water', duration: 0, category: 'health', identity: 'شخص صحي', whyKey: 'habit_why_drink_water', description: { ar: 'الحفاظ على ترطيب الجسم', en: translations.en?.habit_why_drink_water || 'Maintain proper hydration' } },
    { id: 7, name: 'التعلم المستمر', nameKey: 'habit_name_continuous_learning', duration: 60, category: 'learning', identity: 'متعلم مدى الحياة', whyKey: 'habit_why_continuous_learning', description: { ar: 'تطوير المهارات المهنية', en: translations.en?.habit_why_continuous_learning || 'Develop professional skills' } },
    { id: 8, name: 'تنظيم الوقت', nameKey: 'habit_name_time_management', duration: 30, category: 'work', identity: 'منظم محترف', whyKey: 'habit_why_time_management', description: { ar: 'زيادة الإنتاجية والإنجاز', en: translations.en?.habit_why_time_management || 'Increase productivity and output' } },
    { id: 9, name: 'تخطيط اليوم', nameKey: 'habit_name_plan_day', duration: 10, category: 'work', identity: 'مخطط استراتيجي', whyKey: 'habit_why_plan_day', description: { ar: 'تحديد الأولويات بوضوح', en: translations.en?.habit_why_plan_day || 'Clarify priorities' } },
    { id: 10, name: 'مراجعة الأهداف', nameKey: 'habit_name_review_goals', duration: 15, category: 'other', identity: 'محقق أهداف', whyKey: 'habit_why_review_goals', description: { ar: 'متابعة التقدم والتحسين', en: translations.en?.habit_why_review_goals || 'Track progress and improve' } }
    ];
    this.history = [];
    this.totalSessions = 0;
    this.identityPools = {};
    this.hasActivePenalty = false;
    this.isContractSigned = false;
    this.contractLocked = false;
    this.weeklyPlan = this.createDefaultWeeklyPlan();
    this.save();
  }

  resetToDefaults() {
    localStorage.removeItem('lifecraft_v2');
    this.xp = 0;
    this.level = 1;
    this.streak = 0;
    this.lastDate = null;
    this.identityPools = {};
    this.weeklyPlan = this.createDefaultWeeklyPlan();
    this.setDefaults();
  }

  save() {
    localStorage.setItem('lifecraft_v2', JSON.stringify({
      xp: this.xp, level: this.level, streak: this.streak,
      lastDate: this.lastDate, habits: this.habits,
      history: this.history, totalSessions: this.totalSessions,
      atomicWatcherEnabled: this.atomicWatcherEnabled,
      habitDeadline: this.habitDeadline,
      diagnosticAnswers: this.diagnosticAnswers,
      systemImprovements: this.systemImprovements,
      identityPools: this.identityPools,
      environmentCues: this.environmentCues,
      xpFreezeUntil: this.xpFreezeUntil,
      contractLocked: this.contractLocked,
      hasActivePenalty: this.hasActivePenalty,
      isContractSigned: this.isContractSigned,
      atomicDisciplineData: this.atomicDisciplineData,
      weeklyPlan: this.weeklyPlan
    }));
    localStorage.setItem('hasActivePenalty', String(this.hasActivePenalty));
  }

  // Identity Pool Methods
  addXPToIdentity(identityName, xpAmount) {
    if (!identityName || !this.identityPools[identityName]) {
      return false;
    }
    const pool = this.identityPools[identityName];
    pool.xp += xpAmount;
    let leveled = false;
    while (pool.xp >= pool.xpPerLevel) {
      pool.xp -= pool.xpPerLevel;
      pool.level++;
      leveled = true;
    }
    this.save();
    return leveled;
  }

  getOrCreateIdentityPool(identityName) {
    if (!identityName) return null;
    if (!this.identityPools[identityName]) {
      this.identityPools[identityName] = {
        xp: 0,
        level: 1,
        xpPerLevel: 50
      };
      this.save();
    }
    return this.identityPools[identityName];
  }

  getIdentityProgress(identityName) {
    const pool = this.identityPools[identityName];
    if (!pool) return 0;
    return (pool.xp / pool.xpPerLevel) * 100;
  }

  // Environment Cue Methods
  addEnvironmentCue({ habitId, habitName, modification, scheduledTime }) {
    const cue = {
      id: Date.now(),
      habitId: habitId || null,
      habitName: habitName || '—',
      modification: modification?.trim() || '',
      timestamp: new Date().toISOString(),
      scheduledTime: scheduledTime || null
    };
    this.environmentCues.push(cue);
    
    // Keep only last 30 cues to prevent storage bloat
    if (this.environmentCues.length > 30) {
      this.environmentCues.shift();
    }
    
    this.save();
    return cue;
  }

  getRelevantEnvironmentCues(habitId) {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    
    return this.environmentCues.filter(cue => {
      if (!cue.scheduledTime) return false;
      const scheduled = new Date(cue.scheduledTime);
      // Check if cue is scheduled within the next hour
      return scheduled >= now && scheduled <= oneHourFromNow;
    });
  }

  addHabit({ name, duration, category, identity, why }) {
    const habit = { id: Date.now(), name: name.trim(), duration: Math.max(1, parseInt(duration) || 30), category: category || 'other', identity: identity?.trim() || '', why: why?.trim() || '' };
    this.habits.push(habit);

    // Create identity pool if it doesn't exist
    if (identity && identity.trim()) {
      this.getOrCreateIdentityPool(identity.trim());
    }

    this.save();
    return habit;
  }

  deleteHabit(id) {
    this.habits = this.habits.filter(h => h.id !== +id);
    this.save();
  }

  logSession({ habitName, habitId, goal, log }) {
    const dateStr = new Date().toLocaleDateString('ar-EG', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    this.history.unshift({ id: Date.now(), date: dateStr, habitName, habitId, goal: goal?.trim() || '', log: log.trim() });
    if (this.history.length > 100) this.history.pop();
    this.totalSessions++;
    this.save();
  }

  addXP(n) {
    // Check if XP is frozen
    if (this.xpFreezeUntil && new Date() < new Date(this.xpFreezeUntil)) {
      return false; // XP is frozen, don't add
    }
    this.xp += n;
    let leveled = false;
    while (this.xp >= this.xpPerLevel) { this.xp -= this.xpPerLevel; this.level++; leveled = true; }
    this.save();
    return leveled;
  }

  updateStreak() {
    const today = new Date().toDateString();
    if (this.lastDate) {
      const diff = Math.round((new Date(today) - new Date(this.lastDate)) / 86400000);
      if (diff === 1) this.streak++;
      else if (diff > 1) this.streak = 1;
    } else {
      this.streak = 1;
    }
    this.lastDate = today;
    this.save();
  }

  // Atomic Discipline Data Methods
  setDisciplineStatus(dateStr, habitId, status) {
    if (!this.atomicDisciplineData[dateStr]) {
      this.atomicDisciplineData[dateStr] = {};
    }
    this.atomicDisciplineData[dateStr][habitId] = status;
    this.save();
  }

  getDisciplineStatus(dateStr, habitId) {
    if (!this.atomicDisciplineData[dateStr]) return null;
    return this.atomicDisciplineData[dateStr][habitId] || null;
  }

  getCombinedStatus(dateStr, habitId) {
    // Get status for specific habit or combined status for all habits
    if (habitId && habitId !== 'all') {
      return this.getDisciplineStatus(dateStr, habitId);
    }
    
    // If habitId is 'all', return the highest status for that day across all habits
    if (!this.atomicDisciplineData[dateStr]) return null;
    
    const statuses = Object.values(this.atomicDisciplineData[dateStr]);
    if (statuses.length === 0) return null;
    
    // Return highest status: high > medium > low > none
    const statusPriority = { 'status-high': 3, 'status-medium': 2, 'status-low': 1, 'status-none': 0 };
    let highestStatus = statuses[0];
    let highestPriority = statusPriority[highestStatus] || 0;
    
    for (const status of statuses) {
      const priority = statusPriority[status] || 0;
      if (priority > highestPriority) {
        highestPriority = priority;
        highestStatus = status;
      }
    }
    
    return highestStatus;
  }

  calculateStreaks(habitId = 'all') {
    const today = new Date();
    const year = today.getFullYear();
    const startDate = new Date(year, 0, 1); // January 1st of current year
    const endDate = new Date(year, 11, 31); // December 31st of current year
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let totalDays = 0;
    
    // Iterate through all days of the year
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD format
      const status = this.getCombinedStatus(dateStr, habitId);
      
      if (status && status !== 'status-none') {
        tempStreak++;
        totalDays++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
      
      // Check if this is part of current streak (from today backwards)
      if (d <= today) {
        if (status && status !== 'status-none') {
          currentStreak = tempStreak;
        }
      }
    }
    
    return { currentStreak, longestStreak, totalDays };
  }
}

const state = new AppState();

// ==========================================================================
// --- ATOMIC DISCIPLINE NETWORK ---
// ==========================================================================
class AtomicNetwork {
  constructor() {
    this.gridContainer = document.getElementById('atomic-network-grid');
    this.filterSelect = document.getElementById('filter-habit');
    this.currentStreakEl = document.getElementById('current-streak');
    this.longestStreakEl = document.getElementById('longest-streak');
    this.totalDaysEl = document.getElementById('total-days');
    this.currentFilter = 'all';
    this.tooltip = null;
    this.statusModal = null;
    
    this.init();
  }

  init() {
    this.createTooltip();
    this.populateFilterOptions();
    this.generateGrid();
    this.updateAnalytics();
    this.bindEvents();
  }

  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'atomic-tooltip';
    this.tooltip.innerHTML = `
      <div class="atomic-tooltip-date"></div>
      <div class="atomic-tooltip-status"></div>
    `;
    document.body.appendChild(this.tooltip);
  }

  populateFilterOptions() {
    // Clear existing options except "all"
    while (this.filterSelect.options.length > 1) {
      this.filterSelect.remove(1);
    }
    
    // Add habit options
    state.habits.forEach(habit => {
      const option = document.createElement('option');
      option.value = habit.id;
      const cat = CATEGORIES[habit.category] || CATEGORIES.other;
      option.textContent = `${cat.icon} ${habit.name}`;
      this.filterSelect.appendChild(option);
    });
  }

  generateGrid() {
    this.gridContainer.innerHTML = '';
    
    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1); // January 1st
    const endDate = new Date(year, 11, 31); // December 31st
    
    // Generate 365 cells (or 366 for leap year)
    const daysInYear = year % 4 === 0 ? 366 : 365;
    
    for (let i = 0; i < daysInYear; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateStr = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const status = state.getCombinedStatus(dateStr, this.currentFilter);
      
      const cell = document.createElement('div');
      cell.className = `atomic-cell ${status || 'status-none'}`;
      cell.dataset.date = dateStr;
      
      // Add hover event for tooltip
      cell.addEventListener('mouseenter', (e) => this.showTooltip(e, dateStr, status));
      cell.addEventListener('mouseleave', () => this.hideTooltip());
      
      // Add click event for status update
      cell.addEventListener('click', () => this.openStatusModal(dateStr));
      
      this.gridContainer.appendChild(cell);
    }
  }

  showTooltip(event, dateStr, status) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('ar-EG', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const statusLabels = {
      'status-none': currentLang === 'ar' ? 'لا بيانات' : 'No data',
      'status-low': currentLang === 'ar' ? 'منخفض' : 'Low',
      'status-medium': currentLang === 'ar' ? 'متوسط' : 'Medium',
      'status-high': currentLang === 'ar' ? 'ممتاز' : 'Excellent'
    };
    
    this.tooltip.querySelector('.atomic-tooltip-date').textContent = formattedDate;
    this.tooltip.querySelector('.atomic-tooltip-status').textContent = 
      `${currentLang === 'ar' ? 'مستوى الانضباط:' : 'Discipline Level:'} ${statusLabels[status] || statusLabels['status-none']}`;
    
    // Position tooltip
    const rect = event.target.getBoundingClientRect();
    this.tooltip.style.left = `${rect.left + rect.width / 2}px`;
    this.tooltip.style.top = `${rect.top - 10}px`;
    this.tooltip.style.transform = 'translate(-50%, -100%)';
    
    this.tooltip.classList.add('visible');
  }

  hideTooltip() {
    this.tooltip.classList.remove('visible');
  }

  openStatusModal(dateStr) {
    // Remove existing modal if any
    if (this.statusModal) {
      this.statusModal.remove();
    }
    
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('ar-EG', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    this.statusModal = document.createElement('div');
    this.statusModal.className = 'status-update-modal';
    
    const statusLabels = {
      'status-low': currentLang === 'ar' ? 'منخفض' : 'Low',
      'status-medium': currentLang === 'ar' ? 'متوسط' : 'Medium',
      'status-high': currentLang === 'ar' ? 'ممتاز' : 'Excellent'
    };
    
    this.statusModal.innerHTML = `
      <div class="status-update-card">
        <h3 class="status-update-title">${currentLang === 'ar' ? 'تحديث حالة الانضباط' : 'Update Discipline Status'}</h3>
        <div class="status-update-date">${formattedDate}</div>
        <div class="status-options">
          <button class="status-option status-low" data-status="status-low">${statusLabels['status-low']}</button>
          <button class="status-option status-medium" data-status="status-medium">${statusLabels['status-medium']}</button>
          <button class="status-option status-high" data-status="status-high">${statusLabels['status-high']}</button>
        </div>
        <button class="status-cancel">${currentLang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
      </div>
    `;
    
    document.body.appendChild(this.statusModal);
    
    // Bind events
    this.statusModal.querySelectorAll('.status-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const status = btn.dataset.status;
        this.updateStatus(dateStr, status);
        this.statusModal.remove();
      });
    });
    
    this.statusModal.querySelector('.status-cancel').addEventListener('click', () => {
      this.statusModal.remove();
    });
    
    // Close on background click
    this.statusModal.addEventListener('click', (e) => {
      if (e.target === this.statusModal) {
        this.statusModal.remove();
      }
    });
  }

  updateStatus(dateStr, status) {
    // If filtering by specific habit, update only that habit
    // If filtering by 'all', update the first habit or create a combined entry
    if (this.currentFilter !== 'all') {
      state.setDisciplineStatus(dateStr, this.currentFilter, status);
    } else {
      // For 'all' filter, update the first available habit or create a general entry
      if (state.habits.length > 0) {
        state.setDisciplineStatus(dateStr, state.habits[0].id.toString(), status);
      }
    }
    
    // Regenerate grid and update analytics
    this.generateGrid();
    this.updateAnalytics();
  }

  updateAnalytics() {
    const streaks = state.calculateStreaks(this.currentFilter);
    
    this.currentStreakEl.textContent = toAr(streaks.currentStreak);
    this.longestStreakEl.textContent = toAr(streaks.longestStreak);
    this.totalDaysEl.textContent = toAr(streaks.totalDays);
  }

  bindEvents() {
    this.filterSelect.addEventListener('change', () => {
      this.currentFilter = this.filterSelect.value;
      this.generateGrid();
      this.updateAnalytics();
    });
  }

  refresh() {
    this.populateFilterOptions();
    this.generateGrid();
    this.updateAnalytics();
  }
}

// Initialize Atomic Network
let atomicNetwork = null;

// ==========================================================================
// --- CONFETTI ---
// ==========================================================================
function spawnConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#E5A93B','#7CA6FF','#4BD37F','#FF8A5B','#FF5C5C'];
  for (let i = 0; i < 90; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    const size = 6 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dur = 2 + Math.random() * 2;
    const delay = Math.random() * 0.6;
    el.style.cssText = `left:${Math.random()*100}vw;background:${color};width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;border-radius:${Math.random()>0.5?'50%':'3px'}`;
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000);
  }
}

// ==========================================================================
// --- MAIN APP CONTROLLER ---
// ==========================================================================
class LifeCraftApp {
  constructor() {
    // Timer state
    this.sessionDurationMin = 2;
    this.timeLeft = 0;
    this.totalTime = 0;
    this.timerInterval = null;
    this.isRunning = false;
    this.CIRC = 289; // 2 * pi * 46

    // Reflection state
    this.refBarrier = null;
    this.rescueInterval = null;
    this.rescueLeft = 120;

    // DOM refs
    this.$ = (id) => document.getElementById(id);

    this.bindDOM();
    this.bindEvents();
    this.renderAll();
  }

  bindDOM() {
    // Stats
    this.streakEl     = this.$('streak-val');
    this.sessionsEl   = this.$('sessions-val');
    this.levelEl      = this.$('level-val');
    this.xpFillEl     = this.$('xp-progress-fill');
    this.xpTextEl     = this.$('xp-display');

    // Session Card
    this.sessionSection     = this.$('session-section');
    this.sessionCompletion = this.$('session-completion');
    this.habitSelector     = this.$('habit-selector');
    this.sessionGoalGroup  = this.$('session-goal-group');
    this.sessionGoalInput  = this.$('session-goal-input');
    this.optTimerGroup     = this.$('optional-timer-group');
    this.timerSection      = this.$('timer-section');
    this.durDisplay        = this.$('dur-display');
    this.durNumber         = this.$('dur-number');
    this.durUnit           = this.$('dur-unit');
    this.timerDisplay      = this.$('timer-display');
    this.timerProgress     = this.$('timer-progress');
    this.timerToggle       = this.$('timer-toggle');
    this.durationControlsRow = this.$('duration-controls-row');
    this.sessionXpAwarded  = false;
    this.startBtn          = this.$('start-btn');
    this.cancelBtn         = this.$('cancel-btn');
    this.slackBtn          = this.$('slack-btn');
    this.collectBtn        = this.$('collect-btn');
    this.accomplishInput   = this.$('accomplishment-log-input');

    // Custom habit inputs (conditionally shown)
    this.customHabitGroup  = this.$('custom-habit-group');
    this.customHabitInput  = this.$('custom-habit-input');
    
    // Timer mode
    this.isTimerMode = false;
    this.stopwatchTime = 0;
    this.sessionStartTime = null;

    // Atomic Habits Watcher
    this.atomicWatcherToggle = this.$('atomic-watcher-toggle');
    this.identityVideoCard = this.$('identity-video-card');

    // Habits
    this.toggleHabitsFormBtn = this.$('toggle-habits-form');
    this.habitAddForm        = this.$('habit-add-form');
    this.newHabitCurrentInput = this.$('new-habit-current');
    this.newHabitNewInput    = this.$('new-habit-new');
    this.newHabitDurInput    = this.$('new-habit-duration');
    this.newHabitIdentityInput = this.$('new-habit-identity');
    this.newHabitWhyInput    = this.$('new-habit-why');
    this.addHabitBtn         = this.$('add-habit-btn');
    this.habitsList          = this.$('habits-list');

    // Weekly Planning Section
    this.weeklyPlanVisionInput = this.$('weekly-plan-vision');
    this.weeklyPlanDaysGrid = this.$('weekly-plan-days-grid');
    this.weeklyPlanProgressText = this.$('weekly-plan-progress-text');
    this.weeklyPlanProgressFill = this.$('weekly-plan-progress-fill');

    // History
    this.historyFeed     = this.$('history-logs-feed');
    this.clearHistoryBtn = this.$('clear-history-btn');

    // Level Up Modal
    this.levelUpOverlay  = this.$('level-up-overlay');
    this.modalLevelNum   = this.$('modal-level-num');
    this.levelUpDesc     = this.$('level-up-desc');
    this.levelUpCloseBtn = this.$('level-up-close-btn');
    this.themeLabel      = this.$('theme-label');

    // Reflection Overlay
    this.reflectionOverlay = this.$('reflection-overlay');
    this.rescueDisplay     = this.$('rescue-timer-display');
    this.pledgeInput       = this.$('pledge-input');
    this.pledgeConfirmBtn  = this.$('pledge-confirm-btn');
    this.systemChangeInput = this.$('system-change');
    this.refNext4Btn       = this.$('ref-next-4');
    this.barrierDetailInput= this.$('barrier-detail');
  }

  addSafeListener(element, eventName, handler) {
    if (element) {
      element.addEventListener(eventName, handler);
    }
  }

  updateDurationDisplay() {
    // Update legacy span if present
    if (this.durDisplay) {
      this.durDisplay.innerText = getLocalizedNumber(this.sessionDurationMin);
    }

    // Update the numeric/unit inputs if present
    if (this.durNumber && this.durUnit) {
      if (this.sessionDurationMin >= 60 && this.durUnit.value === 'hr') {
        const hours = (this.sessionDurationMin / 60).toFixed(2).replace(/\.00$/, '');
        this.durNumber.value = hours;
      } else if (this.durUnit.value === 'hr') {
        // if unit is hours but minutes < 60, show fraction
        const hours = (this.sessionDurationMin / 60).toFixed(2).replace(/\.00$/, '');
        this.durNumber.value = hours;
      } else {
        this.durNumber.value = String(this.sessionDurationMin);
      }
    }

    if (this.timerDisplay && !this.isRunning) {
      this.timerDisplay.innerText = formatTimeAr(this.sessionDurationMin * 60);
    }
  }

  // Convert numeric + unit -> minutes
  parseDurationFromControls() {
    if (!this.durNumber || !this.durUnit) return null;
    const raw = this.durNumber.value;
    const unit = this.durUnit.value;
    if (raw === null || raw === undefined || raw === '') return null;
    const n = parseFloat(raw);
    if (!Number.isFinite(n) || n <= 0) return null;
    if (unit === 'hr') {
      // allow decimals e.g., 1.5 -> 90
      return Math.round(n * 60);
    }
    return Math.round(n);
  }

  // Validate that session form has both a habit selected (or custom habit filled) and a non-empty goal
  validateSessionForm() {
    const goal = this.sessionGoalInput ? (this.sessionGoalInput.value || '').trim() : '';
    const habitVal = this.habitSelector ? this.habitSelector.value : '';

    let habitOk = false;
    if (!habitVal || habitVal === '') habitOk = false;
    else if (habitVal === '__custom__') {
      habitOk = this.customHabitInput && (this.customHabitInput.value || '').trim().length > 0;
    } else {
      habitOk = true; // existing saved habit selected
    }

    const ok = goal.length > 0 && habitOk;

    if (this.startBtn) {
      this.startBtn.disabled = !ok;
      this.startBtn.style.opacity = ok ? '1' : '0.5';
      this.startBtn.style.cursor = ok ? 'pointer' : 'not-allowed';
      this.startBtn.style.boxShadow = ok ? 'var(--shadow-btn)' : 'none';
    }

    return ok;
  }


  bindEvents() {
    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    this.addSafeListener(langToggle, 'click', () => {
      const newLang = currentLang === 'ar' ? 'en' : 'ar';
      switchLanguage(newLang);

      // Force re-render of dynamic components to ensure reactive update
      try {
        if (this.renderHabitSelector) this.renderHabitSelector();
        if (this.renderHabitsList) this.renderHabitsList();
        if (this.renderStats) this.renderStats();
        if (this.renderIdentityPools) this.renderIdentityPools();
        if (this.renderHistory) this.renderHistory();
        if (this.renderWeeklyPlan) this.renderWeeklyPlan();
      } catch (e) {
        console.error('Error re-rendering after language switch:', e);
      }
    });

    // Session Buttons
    this.addSafeListener(this.startBtn, 'click', () => this.startSession());
    this.addSafeListener(this.cancelBtn, 'click', () => this.cancelSession());
    this.addSafeListener(this.slackBtn, 'click', () => this.openReflection());
    this.addSafeListener(this.collectBtn, 'click', () => this.collectSession());

    // Habit selector
    this.addSafeListener(this.habitSelector, 'change', () => { this.onHabitSelected(); this.validateSessionForm(); });

    // Weekly planning interactions
    if (this.weeklyPlanVisionInput) {
      this.addSafeListener(this.weeklyPlanVisionInput, 'input', () => {
        state.weeklyPlan.vision = this.weeklyPlanVisionInput.value;
        state.save();
      });
    }

    if (this.weeklyPlanDaysGrid) {
      this.addSafeListener(this.weeklyPlanDaysGrid, 'click', (event) => {
        const addBtn = event.target.closest('.weekly-plan-add-btn');
        if (addBtn) {
          const dayKey = addBtn.dataset.dayKey;
          const input = this.weeklyPlanDaysGrid.querySelector(`.weekly-plan-task-input[data-day-key="${dayKey}"]`);
          const text = input?.value?.trim() || '';
          if (text) {
            this.addWeeklyPlanTask(dayKey, text);
          }
          return;
        }

        const checkbox = event.target.closest('.weekly-plan-task-checkbox');
        if (checkbox) {
          this.toggleWeeklyPlanTask(checkbox.dataset.dayKey, checkbox.dataset.taskId, checkbox.checked);
          return;
        }

        const deleteBtn = event.target.closest('.weekly-plan-task-delete');
        if (deleteBtn) {
          this.removeWeeklyPlanTask(deleteBtn.dataset.dayKey, deleteBtn.dataset.taskId);
        }
      });

      this.addSafeListener(this.weeklyPlanDaysGrid, 'keydown', (event) => {
        if (event.key === 'Enter' && event.target.classList.contains('weekly-plan-task-input')) {
          event.preventDefault();
          const dayKey = event.target.dataset.dayKey;
          const text = event.target.value.trim();
          if (text) {
            this.addWeeklyPlanTask(dayKey, text);
          }
        }
      });
    }

    // Environment cue dismiss
    const envCueDismiss = this.$('environment-cue-dismiss');
    if (envCueDismiss) {
      envCueDismiss.addEventListener('click', () => {
        const envCue = this.$('environment-cue');
        if (envCue) envCue.classList.add('hidden');
      });
    }

    // Accomplish input
    this.addSafeListener(this.accomplishInput, 'input', () => {
      const ok = this.accomplishInput.value.trim().length >= 10;
      this.collectBtn.disabled = !ok;
      this.collectBtn.style.opacity = ok ? '1' : '0.5';
      this.collectBtn.style.cursor = ok ? 'pointer' : 'not-allowed';
      this.collectBtn.style.boxShadow = ok ? 'var(--shadow-btn)' : 'none';
    });

    // Session goal input & validation
    this.addSafeListener(this.sessionGoalInput, 'input', () => {
      this.validateSessionForm();
    });

    // Custom habit input validation
    if (this.customHabitInput) {
      this.addSafeListener(this.customHabitInput, 'input', () => {
        this.validateSessionForm();
      });
    }

    // Timer toggle
    this.addSafeListener(this.timerToggle, 'change', () => {
      this.isTimerMode = this.timerToggle.checked;
      if (this.durationControlsRow) {
        this.durationControlsRow.style.display = this.isTimerMode ? 'flex' : 'none';
      }
    });
    // Initialize duration controls visibility
    if (this.durationControlsRow) {
      this.durationControlsRow.style.display = this.isTimerMode ? 'flex' : 'none';
    }

    // Advanced duration controls: numeric + unit
    if (this.durNumber && this.durUnit) {
      const handleNumericChange = () => {
        const parsed = this.parseDurationFromControls();
        if (parsed !== null) {
          this.sessionDurationMin = Math.max(1, Math.min(1440, parsed));
          // keep reasonable cap (here 24h -> 1440 min)
          this.updateDurationDisplay();
        }
      };

      this.addSafeListener(this.durNumber, 'input', handleNumericChange);
      this.addSafeListener(this.durUnit, 'change', () => {
        // convert current value to the new unit for user convenience
        const currentMins = this.sessionDurationMin;
        if (this.durUnit.value === 'hr') {
          this.durNumber.value = (currentMins / 60).toFixed(2).replace(/\.00$/, '');
        } else {
          this.durNumber.value = String(currentMins);
        }
        handleNumericChange();
      });
    }

    // Initialize control values
    this.updateDurationDisplay();

    // Initial validation state for session form
    this.validateSessionForm = this.validateSessionForm || function() { return true; };
    this.validateSessionForm();

    // Slack button: handle penalty if atomic watcher enabled
    const originalSlackHandler = () => this.openReflection();
    this.addSafeListener(this.slackBtn, 'click', () => {
      if (state.atomicWatcherEnabled) {
        // apply a small penalty and strict feedback
        const penalty = 5;
        state.xp = Math.max(0, (state.xp || 0) - penalty);
        // also reduce each identity pool slightly (distribute penalty)
        const identities = Object.keys(state.identityPools);
        if (identities.length > 0) {
          const per = Math.ceil(penalty / identities.length);
          identities.forEach(name => {
            state.identityPools[name].xp = Math.max(0, state.identityPools[name].xp - per);
          });
        }
        state.save();
        this.renderStats();
        this.renderIdentityPools();

        // Visual strict feedback on video card
        if (this.identityVideoCard) {
          this.identityVideoCard.classList.add('strict-flash');
          setTimeout(() => this.identityVideoCard.classList.remove('strict-flash'), 1500);
        }

        // Strong visual feedback near identity pools
        try {
          const container = this.$('identity-pools-container');
          if (container) {
            // Shake animation
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 900);

            // Temporary strict message
            const msg = document.createElement('div');
            msg.className = 'strict-message';
            msg.innerHTML = translations[currentLang]?.strict_mode_desc || 'Strict feedback: identity XP reduced.';
            // Insert at top
            container.insertAdjacentElement('afterbegin', msg);
            setTimeout(() => {
              msg.remove();
            }, 3500);
          }
        } catch (e) {
          console.error('Error showing strict feedback UI:', e);
        }
      }

      originalSlackHandler();
    });

    
    // Toggle habit form
    if (this.toggleHabitsFormBtn) {
      this.toggleHabitsFormBtn.addEventListener('click', () => {
        const open = !this.habitAddForm.classList.contains('hidden');
        this.habitAddForm.classList.toggle('hidden', open);
        const addText = currentLang === 'ar' ? '+ إضافة عادة جديدة' : '+ Add New Habit';
        const closeText = currentLang === 'ar' ? '✕ إغلاق' : '✕ Close';
        this.toggleHabitsFormBtn.textContent = open ? addText : closeText;
      });
    }

    // Add habit
    this.addSafeListener(this.addHabitBtn, 'click', () => this.addHabit());

    // Clear history
    this.addSafeListener(this.clearHistoryBtn, 'click', () => {
      const clearMsg = translations[currentLang]?.clear_history_confirm || 'هل تريد حذف جميع السجلات؟ لا يمكن التراجع.';
      if (confirm(clearMsg)) {
        state.history = [];
        state.totalSessions = 0;
        state.save();
        this.renderHistory();
        this.renderStats();
      }
    });

    // Reset to defaults
    this.addSafeListener(this.$('reset-btn'), 'click', () => {
      const resetMsg = translations[currentLang]?.reset_confirm || 'هل تريد إعادة تعيين جميع البيانات إلى القيم الافتراضية؟ سيتم حذف جميع العادات المخصصة والسجلات.';
      if (confirm(resetMsg)) {
        state.resetToDefaults();
        this.renderAll();
        location.reload();
      }
    });

    // Atomic Habits Watcher toggle
    this.addSafeListener(this.atomicWatcherToggle, 'change', () => {
      state.atomicWatcherEnabled = this.atomicWatcherToggle.checked;
      state.save();
      if (state.atomicWatcherEnabled) {
        this.startAtomicWatcher();
        this.showToast('🔥 تم تفعيل رقيب العادات الذرية!', 'success');
        // Add a visual change to the identity video card
        if (this.identityVideoCard) {
          this.identityVideoCard.style.boxShadow = '0 0 20px rgba(229, 169, 59, 0.6)';
        }
      } else {
        this.stopAtomicWatcher();
        this.showToast('🛑 تم إيقاف رقيب العادات الذرية', 'info');
        // Remove the visual change
        if (this.identityVideoCard) {
          this.identityVideoCard.style.boxShadow = '';
        }
      }
    });

    // Initialize toggle state
    if (this.atomicWatcherToggle) {
      this.atomicWatcherToggle.checked = state.atomicWatcherEnabled;
    }
    if (state.atomicWatcherEnabled && this.atomicWatcherToggle) {
      this.startAtomicWatcher();
      if (this.identityVideoCard) {
        this.identityVideoCard.style.boxShadow = '0 0 20px rgba(229, 169, 59, 0.6)';
      }
    }

    // Level Up close
    this.addSafeListener(this.levelUpCloseBtn, 'click', () => {
      this.levelUpOverlay.classList.add('hidden');
      this.resetCardFront();
    });

    // ---- Reflection Buttons ----
    this.addSafeListener(this.$('ref-next-1'), 'click', () => this.showRefStep(2));
    this.addSafeListener(this.$('ref-close-btn'), 'click', () => this.closeReflection());
    this.addSafeListener(this.$('ref-next-2'), 'click', () => this.showRefStep(3));
    this.addSafeListener(this.$('rescue-confirm-btn'), 'click', () => this.onRescueConfirmed());
    this.addSafeListener(this.$('rescue-skip-btn'), 'click', () => {
      this.stopRescueTimer();
      this.showRefStep(4);
    });
    this.addSafeListener(this.$('ref-next-4'), 'click', () => {
      // Save environment modification
      const modification = this.systemChangeInput.value.trim();
      const habitId = this.habitSelector.value;
      const habit = state.habits.find(h => h.id == habitId);
      
      if (modification && modification.length >= 10) {
        // Schedule the cue for 1 hour before the same time tomorrow
        const scheduledTime = new Date();
        scheduledTime.setDate(scheduledTime.getDate() + 1);
        scheduledTime.setHours(scheduledTime.getHours() - 1);
        
        state.addEnvironmentCue({
          habitId: habitId,
          habitName: habit ? habit.name : '—',
          modification: modification,
          scheduledTime: scheduledTime.toISOString()
        });
      }
      
      this.showRefStep(5);
    });

    // Barrier chips
    document.querySelectorAll('.barrier-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.barrier-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.refBarrier = chip.dataset.val;
      });
    });

    // System change input enables next button
    this.addSafeListener(this.systemChangeInput, 'input', () => {
      const ok = this.systemChangeInput.value.trim().length >= 10;
      this.refNext4Btn.disabled = !ok;
      this.refNext4Btn.style.opacity = ok ? '1' : '0.5';
      this.refNext4Btn.style.cursor = ok ? 'pointer' : 'not-allowed';
    });

    // Pledge input enables confirm
    this.addSafeListener(this.pledgeInput, 'input', () => {
      const ok = this.pledgeInput.value.trim().length >= 10;
      this.pledgeConfirmBtn.disabled = !ok;
      this.pledgeConfirmBtn.style.opacity = ok ? '1' : '0.5';
      this.pledgeConfirmBtn.style.cursor = ok ? 'pointer' : 'not-allowed';
    });

    this.addSafeListener(this.pledgeConfirmBtn, 'click', () => {
      this.closeReflection();
      sound.success();
    });

    // ---- Contract Lock Events ----
    const contractSignatureInput = this.$('contract-signature');
    const contractUnlockBtn = this.$('contract-unlock-btn');
    const signatureStatus = this.$('signature-status');

    if (contractSignatureInput && contractUnlockBtn) {
      const requiredPhraseAr = 'أنا ألتزم بالظهور غداً وإصلاح نظامي الحياتي';
      const requiredPhraseEn = 'I commit to showing up tomorrow and fixing my life system';

      contractSignatureInput.addEventListener('input', () => {
        const input = contractSignatureInput.value.trim();
        const currentRequiredPhrase = currentLang === 'ar' ? requiredPhraseAr : requiredPhraseEn;
        
        // Check if input matches the required phrase exactly
        const isMatch = input === currentRequiredPhrase;
        
        if (isMatch) {
          contractUnlockBtn.disabled = false;
          contractUnlockBtn.style.opacity = '1';
          contractUnlockBtn.style.cursor = 'pointer';
          contractUnlockBtn.style.boxShadow = 'var(--shadow-btn)';
          signatureStatus.textContent = currentLang === 'ar' ? '✅ مطابق' : '✅ Match';
          signatureStatus.className = 'signature-status correct';
        } else {
          contractUnlockBtn.disabled = true;
          contractUnlockBtn.style.opacity = '0.5';
          contractUnlockBtn.style.cursor = 'not-allowed';
          contractUnlockBtn.style.boxShadow = 'none';
          if (input.length > 0) {
            signatureStatus.textContent = currentLang === 'ar' ? '❌ غير مطابق - اكتب الجملة حرفياً' : '❌ No match - write the phrase exactly';
            signatureStatus.className = 'signature-status incorrect';
          } else {
            signatureStatus.textContent = '';
            signatureStatus.className = 'signature-status';
          }
        }
      });

      contractUnlockBtn.addEventListener('click', () => {
        this.unlockContract();
      });
    }

    // Check for contract lock on load
    this.checkContractLock();
  }

  // ---------- RENDER ALL ----------
  renderAll() {
    this.renderStats();
    this.renderHabitSelector();
    this.renderHabitsList();
    this.renderHistory();
    this.renderIdentityPools();
    this.renderWeeklyPlan();
    this.renderWeeklyPlan();
    this.updateDurationDisplay();
    this.applyLevelTheme();
    
    // Initialize or refresh Atomic Network
    if (!atomicNetwork) {
      atomicNetwork = new AtomicNetwork();
    } else {
      atomicNetwork.refresh();
    }

    // Ensure start button validation state is correct after rendering
    if (this.validateSessionForm) this.validateSessionForm();
  }

  renderWeeklyPlan() {
    if (!this.weeklyPlanDaysGrid || !this.weeklyPlanProgressText || !this.weeklyPlanProgressFill) return;

    const plan = state.weeklyPlan || { vision: '', days: [] };
    const totalTasks = plan.days.reduce((sum, day) => sum + (day?.tasks?.length || 0), 0);
    const completedTasks = plan.days.reduce((sum, day) => sum + (day?.tasks?.filter(task => task?.done).length || 0), 0);
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    if (this.weeklyPlanVisionInput) {
      this.weeklyPlanVisionInput.value = plan.vision || '';
    }

    this.weeklyPlanProgressText.textContent = `${getLocalizedNumber(progress)}%`;
    this.weeklyPlanProgressFill.style.width = `${progress}%`;

    const dayCards = plan.days.map(day => {
      const label = translations[currentLang]?.[`weekly_plan_day_${day.key}`] || day.key;
      const placeholder = translations[currentLang]?.weekly_plan_task_placeholder || 'Add a small task...';
      const emptyText = translations[currentLang]?.weekly_plan_empty_state || 'No tasks yet';
      const completedCount = (day.tasks || []).filter(task => task?.done).length;
      const taskRows = (day.tasks || []).map(task => {
        const safeText = (task.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `
          <div class="weekly-plan-task-row">
            <label class="weekly-plan-task-item">
              <input type="checkbox" class="weekly-plan-task-checkbox" data-day-key="${day.key}" data-task-id="${task.id}" ${task.done ? 'checked' : ''}>
              <span class="weekly-plan-task-text ${task.done ? 'done' : ''}">${safeText}</span>
            </label>
            <button class="weekly-plan-task-delete" data-day-key="${day.key}" data-task-id="${task.id}" title="${translations[currentLang]?.weekly_plan_remove_task || 'Remove task'}">✕</button>
          </div>`;
      }).join('');

      return `
        <div class="weekly-plan-day-card">
          <div class="weekly-plan-day-header">
            <span class="weekly-plan-day-label">${label}</span>
            <span class="weekly-plan-day-pill">${completedCount}/${day.tasks?.length || 0}</span>
          </div>
          <div class="weekly-plan-task-list">
            ${taskRows || `<div class="weekly-plan-empty-state">${emptyText}</div>`}
          </div>
          <div class="weekly-plan-task-adder">
            <input type="text" class="weekly-plan-task-input" data-day-key="${day.key}" placeholder="${placeholder}">
            <button class="weekly-plan-add-btn" data-day-key="${day.key}">＋</button>
          </div>
        </div>`;
    }).join('');

    this.weeklyPlanDaysGrid.innerHTML = dayCards;
  }

  addWeeklyPlanTask(dayKey, text) {
    const day = state.weeklyPlan.days.find(item => item.key === dayKey);
    if (!day) return;

    day.tasks.push({
      id: `${dayKey}-${Date.now()}`,
      text,
      done: false
    });

    state.save();
    this.renderWeeklyPlan();
  }

  toggleWeeklyPlanTask(dayKey, taskId, done) {
    const day = state.weeklyPlan.days.find(item => item.key === dayKey);
    if (!day) return;

    const task = day.tasks.find(item => item.id === taskId);
    if (!task) return;

    task.done = done;
    state.save();
    this.renderWeeklyPlan();
  }

  removeWeeklyPlanTask(dayKey, taskId) {
    const day = state.weeklyPlan.days.find(item => item.key === dayKey);
    if (!day) return;

    day.tasks = day.tasks.filter(item => item.id !== taskId);
    state.save();
    this.renderWeeklyPlan();
  }

  renderStats() {
    this.streakEl.innerText   = getLocalizedNumber(state.streak);
    this.sessionsEl.innerText = getLocalizedNumber(state.totalSessions);
    this.levelEl.innerText    = getLocalizedNumber(state.level);
    const pct = (state.xp / state.xpPerLevel) * 100;
    this.xpFillEl.style.width = `${pct}%`;
    const xpDisplay = `${getLocalizedNumber(state.xp)} / ${getLocalizedNumber(state.xpPerLevel)} XP`;
    this.xpTextEl.innerText   = xpDisplay;
  }

  renderHabitSelector() {
    if (!this.habitSelector) return;
    
    const prev = this.habitSelector.value;
    const defaultText = currentLang === 'ar' ? '— اختر عادة من قائمتك —' : '— Select a habit from your list —';
    this.habitSelector.innerHTML = `<option value="" disabled data-i18n="select_habit">${defaultText}</option>`;

    // Apply translation to default option immediately
    const defaultOption = this.habitSelector.querySelector('option[data-i18n="select_habit"]');
    if (defaultOption && translations[currentLang] && translations[currentLang].select_habit) {
      defaultOption.textContent = translations[currentLang].select_habit;
    }

    state.habits.forEach(h => {
      const cat = CATEGORIES[h.category] || CATEGORIES.other;
      const opt = document.createElement('option');
      opt.value = h.id;
      opt.textContent = `${cat.icon} ${getLocalizedHabitName(h)}`;
      this.habitSelector.appendChild(opt);
    });

  // Append "Custom Habit" option at the end
  const customOpt = document.createElement('option');
  customOpt.value = '__custom__';
  customOpt.textContent = translations[currentLang]?.custom_habit_option || (currentLang === 'ar' ? 'عادة مخصصة...' : 'Custom Habit...');
  this.habitSelector.appendChild(customOpt);

  if (state.habits.length === 0) {
    this.habitSelector.value = '';
  } else if (prev && (state.habits.some(h => h.id == prev) || prev === '__custom__')) {
    this.habitSelector.value = prev;
    this.onHabitSelected();
  } else if (state.habits.length > 0) {
    this.habitSelector.value = state.habits[0].id;
    this.onHabitSelected();
  }
  }

  onHabitSelected() {
    const id = this.habitSelector.value;
    if (!id) return;

    // Handle custom habit selection
    if (id === '__custom__') {
      if (this.customHabitGroup) this.customHabitGroup.classList.remove('hidden');
      if (this.customHabitInput) this.customHabitInput.focus();
      // Hide session result sections and timer preview
      if (this.timerSection) this.timerSection.classList.add('hidden');
      if (this.sessionCompletion) this.sessionCompletion.classList.add('hidden');
      // No environment cue for custom unsaved habit
      this.checkAndDisplayEnvironmentCue(null);
      return;
    }

    // Existing behavior for saved habits
    const habit = state.habits.find(h => h.id == id);
    if (!habit) return;

    if (this.customHabitGroup) this.customHabitGroup.classList.add('hidden');

    this.sessionDurationMin = habit.duration;
    this.updateDurationDisplay();
    this.timerSection.classList.add('hidden');
    this.sessionCompletion.classList.add('hidden');

    // Check for environment cues
    this.checkAndDisplayEnvironmentCue(id);
  }

  checkAndDisplayEnvironmentCue(habitId) {
    const relevantCues = state.getRelevantEnvironmentCues(habitId);
    const envCueEl = this.$('environment-cue');
    const envCueTextEl = this.$('environment-cue-text');

    if (relevantCues.length > 0 && envCueEl && envCueTextEl) {
      // Display the most recent relevant cue
      const cue = relevantCues[relevantCues.length - 1];
      const cueTitle = translations[currentLang]?.environment_cue_title || 'تذكير بيئي';
      const cuePrefix = translations[currentLang]?.environment_cue_prefix || 'تعديلك البيئي:';
      
      envCueEl.querySelector('.environment-cue-title').textContent = cueTitle;
      envCueTextEl.textContent = `${cuePrefix} ${cue.modification}`;
      envCueEl.classList.remove('hidden');
    } else if (envCueEl) {
      envCueEl.classList.add('hidden');
    }
  }

  renderHabitsList() {
    this.habitsList.innerHTML = '';
    if (state.habits.length === 0) {
      const emptyTitle = translations[currentLang]?.habits_empty_title || 'أضف أول عادة حقيقية';
      const emptyDesc = translations[currentLang]?.habits_empty_desc || 'أضف أول عادة حقيقية تريد الانضباط فيها.<br>البرمجة، المذاكرة، الكتابة، الرياضة — كل ما تريد بناءه هنا.';
      this.habitsList.innerHTML = `
        <div class="habits-empty-state">
          <span class="empty-icon">🎯</span>
          <p>${emptyDesc}</p>
        </div>`;
      return;
    }

    state.habits.forEach(habit => {
      const cat = CATEGORIES[habit.category] || CATEGORIES.other;
      const goalPrefix = translations[currentLang]?.habit_goal_prefix || 'الهدف:';
      const selectBtn = translations[currentLang]?.habit_select_btn || 'تحديد ▶';
      const deleteBtn = translations[currentLang]?.habit_delete_btn || '🗑';
      const minutesAbbr = translations[currentLang]?.minutes_abbr || 'دق';
      const categoryLabel = translations[currentLang]?.[`category_${habit.category}`] || cat.label;
      const displayName = getLocalizedHabitName(habit);

      const formattedName = displayName.length > 50
        ? displayName.substring(0, 50) + '...'
        : displayName;

      const formattedDuration = getLocalizedNumber(habit.duration);
      const localizedWhy = getLocalizedWhy(habit);

      // Build the localized why and language badge intelligently
      let whyHtml = '';

      // If habit uses a translation key (default app habit), show localized text and badge of current UI language
      if (habit.whyKey && localizedWhy) {
        const badgeText = translations[currentLang]?.orig_lang_badge || (currentLang === 'ar' ? 'AR' : 'EN');
        const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        whyHtml = `<div class="habit-detail-row"><span class="habit-detail-why" dir="${dir}">💡 ${localizedWhy} <span class="lang-badge" title="${currentLang === 'ar' ? 'النص المعروض' : 'Displayed language'}">${badgeText}</span></span></div>`;
      }
      // If user-provided freeform why exists (no whyKey), detect script and show original text with appropriate badge
      else if (typeof habit.why === 'string' && habit.why.trim().length > 0) {
        const hasArabic = containsArabic(habit.why);
        const originalBadge = hasArabic ? (translations['ar']?.orig_lang_badge || 'AR') : (translations['en']?.orig_lang_badge || 'EN');

        // If UI language differs from original script, indicate original language badge and show raw text
        if ((currentLang === 'en' && hasArabic) || (currentLang === 'ar' && !hasArabic)) {
          whyHtml = `<div class="habit-detail-row"><span class="habit-detail-why" dir="auto">💡 ${habit.why} <span class="lang-badge" title="Original text detected">${originalBadge}</span></span></div>`;
        } else {
          // UI language matches script; show text and a small badge reflecting UI language
          const uiBadge = translations[currentLang]?.orig_lang_badge || (currentLang === 'ar' ? 'AR' : 'EN');
          whyHtml = `<div class="habit-detail-row"><span class="habit-detail-why" dir="auto">💡 ${habit.why} <span class="lang-badge" title="Displayed language">${uiBadge}</span></span></div>`;
        }
      }
      // Fallback: if we have a localizedWhy but no whyKey, show it with UI badge
      else if (localizedWhy) {
        const badgeText = translations[currentLang]?.orig_lang_badge || (currentLang === 'ar' ? 'AR' : 'EN');
        const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        whyHtml = `<div class="habit-detail-row"><span class="habit-detail-why" dir="${dir}">💡 ${localizedWhy} <span class="lang-badge">${badgeText}</span></span></div>`;
      }

      const accordionItem = document.createElement('div');
      accordionItem.className = 'habit-accordion-item';
      accordionItem.innerHTML = `
        <div class="habit-accordion-header">
          <span class="habit-accordion-icon">${cat.icon}</span>
          <div class="habit-accordion-info">
            <div class="habit-accordion-name">${formattedName}</div>
            <div class="habit-accordion-progress">${goalPrefix} ${formattedDuration} ${minutesAbbr}</div>
          </div>
          <span class="habit-accordion-toggle">▼</span>
        </div>
        <div class="habit-accordion-content">
          <div class="habit-accordion-details">
            <div class="habit-detail-row">
              <span class="habit-detail-label" style="color:${cat.color};background:${cat.color}18;">${cat.icon} ${categoryLabel}</span>
            </div>
            ${whyHtml}
            <div class="habit-accordion-actions">
              <button class="habit-select-btn" data-id="${habit.id}">${selectBtn}</button>
              <button class="habit-delete-btn" data-id="${habit.id}">${deleteBtn}</button>
            </div>
          </div>
        </div>`;

      // Accordion toggle functionality
      const header = accordionItem.querySelector('.habit-accordion-header');
      header.addEventListener('click', () => {
        accordionItem.classList.toggle('expanded');
      });

      // Select button functionality
      accordionItem.querySelector('.habit-select-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        this.habitSelector.value = id;
        this.onHabitSelected();
      });

      accordionItem.querySelector('.habit-delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const deleteConfirm = translations[currentLang]?.habit_delete_confirm || 'حذف هذه العادة نهائياً؟';
        if (confirm(deleteConfirm)) {
          state.deleteHabit(id);
          this.renderHabitSelector();
          this.renderHabitsList();
        }
      });

      this.habitsList.appendChild(accordionItem);
    });
  }

  renderHistory() {
    this.historyFeed.innerHTML = '';
    if (state.history.length === 0) {
      const emptyDesc = translations[currentLang]?.history_empty_desc || 'سجل إنجازاتك الحقيقية سيظهر هنا.<br>كل جلسة مكتملة هي حجر في صرحك.';
      this.historyFeed.innerHTML = `
        <div class="history-empty-state">
          <span class="empty-icon">📖</span>
          <p>${emptyDesc}</p>
        </div>`;
      return;
    }

    state.history.forEach(log => {
      const cat = CATEGORIES[state.habits.find(h => h.id == log.habitId)?.category] || CATEGORIES.other;
      const goalPrefix = translations[currentLang]?.log_goal_prefix || 'الهدف:';
      const displayHabitName = getLocalizedHabitName(log.habitName);
      const card = document.createElement('div');
      card.className = 'log-card';
      card.innerHTML = `
        <div class="log-card-header">
          <span class="log-card-habit" style="background:${cat.color}18;color:${cat.color};">${cat.icon} ${displayHabitName}</span>
          <span class="log-card-date">${log.date}</span>
        </div>
        ${log.goal ? `<div class="log-card-goal">🎯 ${goalPrefix} ${log.goal}</div>` : ''}
        <div class="log-card-body">${log.log}</div>`;
      this.historyFeed.appendChild(card);
    });
  }

  renderIdentityPools() {
    const identityPoolsContainer = this.$('identity-pools-container');
    if (!identityPoolsContainer) return;

    const identities = Object.keys(state.identityPools);
    if (identities.length === 0) {
      identityPoolsContainer.innerHTML = '';
      return;
    }

    const progressLabel = translations[currentLang]?.identity_progress_label || 'أنت الآن';
    const levelLabel = translations[currentLang]?.identity_level_label || 'المستوى';
    const xpLabel = translations[currentLang]?.identity_xp_label || 'نقاط الخبرة';

    identityPoolsContainer.innerHTML = identities.map(identityName => {
      const pool = state.identityPools[identityName];
      const progress = (pool.xp / pool.xpPerLevel) * 100;
      const colors = ['#E5A93B', '#7CA6FF', '#4BD37F', '#FF8A5B', '#90A4AE'];
      const color = colors[identities.indexOf(identityName) % colors.length];

      const formattedLevel = getLocalizedNumber(pool.level);
      const formattedXp = getLocalizedNumber(pool.xp);
      const formattedXpPerLevel = getLocalizedNumber(pool.xpPerLevel);
      const formattedPercent = getLocalizedNumber(Math.round(progress));

      return `
        <div class="identity-pool-item">
          <div class="identity-pool-header">
            <span class="identity-pool-name">${identityName}</span>
            <span class="identity-pool-level">${levelLabel} ${formattedLevel}</span>
          </div>
          <div class="identity-pool-progress">
            <div class="identity-pool-bar" style="width: ${progress}%; background: ${color};"></div>
          </div>
          <div class="identity-pool-stats">
            <span class="identity-pool-xp">${formattedXp} / ${formattedXpPerLevel} ${xpLabel}</span>
            <span class="identity-pool-percent">${formattedPercent}%</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ---------- SESSION FLOW ----------
  addHabit() {
    const currentHabit = this.newHabitCurrentInput.value.trim();
    const newHabit = this.newHabitNewInput.value.trim();
    const identity = this.newHabitIdentityInput.value.trim();

    if (!currentHabit || !newHabit) {
      if (!currentHabit) this.newHabitCurrentInput.focus();
      else this.newHabitNewInput.focus();
      return;
    }

    // Merge the two habits using the stacking formula
    const connector = translations[currentLang]?.habit_stacking_connector || 'بعد أن';
    const will = translations[currentLang]?.habit_stacking_will || 'سأقوم بـ';
    const arrow = translations[currentLang]?.habit_stacking_arrow || '➔';
    const stackedName = `${connector} ${currentHabit} ${arrow} ${will} ${newHabit}`;

    const habit = state.addHabit({
      name: stackedName,
      duration: this.newHabitDurInput.value || 45,
      category: 'other',
      identity: identity,
      why: this.newHabitWhyInput.value
    });

    // Reset form
    this.newHabitCurrentInput.value = '';
    this.newHabitNewInput.value = '';
    this.newHabitIdentityInput.value = '';
    this.newHabitDurInput.value = '45';
    this.newHabitWhyInput.value = '';
    this.habitAddForm.classList.add('hidden');
    const addText = currentLang === 'ar' ? '+ إضافة عادة جديدة' : '+ Add New Habit';
    this.toggleHabitsFormBtn.textContent = addText;

    sound.success();

    this.renderHabitSelector();
    this.renderHabitsList();
    this.renderIdentityPools();

    // Auto-select new habit
    this.habitSelector.value = habit.id;
    this.onHabitSelected();
  }

  startSession() {
    // Validate required fields strictly before allowing a session start
    const valid = this.validateSessionForm ? this.validateSessionForm() : true;
    if (!valid) {
      const msg = translations[currentLang]?.please_write_goal_and_select_habit || translations[currentLang]?.select_habit_alert || 'يرجى كتابة هدف الجلسة واختيار العادة أولاً قبل البدء';
      alert(msg);
      return;
    }

    const id = this.habitSelector.value;

    // Ensure sessionDurationMin reflects controls
    const parsed = this.parseDurationFromControls();
    if (parsed !== null) this.sessionDurationMin = Math.max(1, Math.min(1440, parsed));

    sound.wake();
    this.isRunning = true;
    updateAdSlotVisibility();
    this.sessionStartTime = new Date();
    this.sessionXpAwarded = false; // reset for this session

    this.startBtn.classList.add('hidden');
    this.cancelBtn.classList.remove('hidden');
    
    if (this.isTimerMode) {
      this.totalTime = this.sessionDurationMin * 60;
      this.timeLeft = this.totalTime;
      this.timerSection.classList.remove('hidden');
      this.timerDisplay.innerText = formatTimeAr(this.timeLeft);
      this.timerProgress.style.strokeDashoffset = 0;

      this.timerInterval = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 5 && this.timeLeft > 0) sound.tick();

        this.timerDisplay.innerText = formatTimeAr(this.timeLeft);
        const offset = this.CIRC - (this.timeLeft / this.totalTime) * this.CIRC;
        this.timerProgress.style.strokeDashoffset = offset;

        if (this.timeLeft <= 0) this.completeSession();
      }, 1000);
    } else {
      // Stopwatch mode
      this.stopwatchTime = 0;
      this.timerSection.classList.remove('hidden');
      this.timerDisplay.innerText = formatTimeAr(this.stopwatchTime);
      // Hide the progress circle for stopwatch
      const circles = this.timerSection.querySelectorAll('circle');
      circles.forEach(c => c.style.display = 'none');

      this.timerInterval = setInterval(() => {
        this.stopwatchTime++;
        this.timerDisplay.innerText = formatTimeAr(this.stopwatchTime);
      }, 1000);
    }
  }

  cancelSession() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    updateAdSlotVisibility();
    this.timerSection.classList.add('hidden');
    this.startBtn.classList.remove('hidden');
    this.cancelBtn.classList.add('hidden');
    
    if (this.isTimerMode) {
      this.timerDisplay.innerText = formatTimeAr(this.sessionDurationMin * 60);
      this.timerProgress.style.strokeDashoffset = 0;
    } else {
      // Reset stopwatch
      this.stopwatchTime = 0;
      this.timerDisplay.innerText = formatTimeAr(this.stopwatchTime);
      const circles = this.timerSection.querySelectorAll('circle');
      circles.forEach(c => c.style.display = '');
    }
  }

  completeSession() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    updateAdSlotVisibility();

    sound.success();
    spawnConfetti();

    // Reset accomplish input
    this.accomplishInput.value = '';
    this.collectBtn.disabled = true;
    this.collectBtn.style.opacity = '0.5';
    this.collectBtn.style.cursor = 'not-allowed';
    this.collectBtn.style.boxShadow = 'none';

    // Show completion section
    this.sessionCompletion.classList.remove('hidden');
    this.timerSection.classList.add('hidden');
    
    // Reset circles display
    if (!this.isTimerMode) {
      const circles = this.timerSection.querySelectorAll('circle');
      circles.forEach(c => c.style.display = '');
    }

    // Award XP immediately and update identity pools for instant feedback
    try {
      if (!this.sessionXpAwarded) {
        const id = this.habitSelector.value;
        const habit = state.habits.find(h => h.id == id);
        const didLevelUp = state.addXP(10);
        if (habit && habit.identity) {
          state.getOrCreateIdentityPool(habit.identity);
          state.addXPToIdentity(habit.identity, 10);
        }
        state.updateStreak();
        this.sessionXpAwarded = true;
        this.renderStats();
        this.renderIdentityPools();

        // Show level-up modal if applicable
        if (didLevelUp) {
          setTimeout(() => this.showLevelUp(), 400);
        }
      }
    } catch (e) {
      console.error('Error awarding XP on completion:', e);
    }
  }

  collectSession() {
    const id = this.habitSelector.value;
    const habit = state.habits.find(h => h.id == id);
    const habitName = habit ? habit.name : (id === '__custom__' && this.customHabitInput ? this.customHabitInput.value.trim() : '—');
    const goal = this.sessionGoalInput ? this.sessionGoalInput.value : '';
    const log = this.accomplishInput.value.trim();

    state.logSession({ habitName, habitId: id, goal, log });

    // Award XP if not already given on completion
    let didLevelUp = false;
    if (!this.sessionXpAwarded) {
      didLevelUp = state.addXP(10);
      if (habit && habit.identity) {
        state.getOrCreateIdentityPool(habit.identity);
        state.addXPToIdentity(habit.identity, 10);
      }
      // If custom habit has no identity, nothing to add there — could be enhanced to allow identity input for custom habits
      state.updateStreak();
      this.sessionXpAwarded = true;
    }

    this.renderStats();
    this.renderHistory();
    this.renderIdentityPools();

    // Hide completion section
    this.sessionCompletion.classList.add('hidden');

    setTimeout(() => {
      if (didLevelUp) {
        this.showLevelUp();
      } else {
        this.resetSessionCard();
      }
    }, 500);
  }

  resetSessionCard() {
    this.startBtn.classList.remove('hidden');
    this.cancelBtn.classList.add('hidden');
    this.sessionGoalInput.value = '';
  }

  showLevelUp() {
    this.modalLevelNum.innerText = toAr(state.level);

    const descs = {
      2:  'ارتقيت للمرحلة الثانية: الهيكل المادي 🏡 — يستمر صرح انضباطك في الصعود.',
      5:  'ارتقيت للمرحلة الثالثة: الصرح البرمجي 🏢 — بنيتك آخذة في الاتساع!',
      10: 'ارتقيت للمرحلة الرابعة: المدينة التقنية 🏙️ — لقد صنعت مجد انضباطك لبنة لبنة!'
    };

    this.levelUpDesc.innerText = descs[state.level] || `المستوى ${toAr(state.level)} — هويتك الانضباطية في تصاعد مستمر.`;

    this.applyLevelTheme();
    sound.levelUp();
    this.levelUpOverlay.classList.remove('hidden');
  }

  applyLevelTheme() {
    document.body.classList.remove('theme-2','theme-3','theme-4');
    let label = 'المرحلة ١: حجر الأساس 📐';
    let stage = 1;

    if (state.level >= 2 && state.level < 5) {
      document.body.classList.add('theme-2');
      label = 'المرحلة ٢: الهيكل المادي 🏡';
      stage = 2;
    } else if (state.level >= 5 && state.level < 10) {
      document.body.classList.add('theme-3');
      label = 'المرحلة ٣: الصرح المؤسسي 🏢';
      stage = 3;
    } else if (state.level >= 10) {
      document.body.classList.add('theme-4');
      label = 'المرحلة ٤: المدينة التقنية 🏙️';
      stage = 4;
    }

    if (this.themeLabel) {
      this.themeLabel.innerText = label;
    }
    const tag = this.$('diorama-stage-tag');
    if (tag) tag.innerText = label;
  }

  // ---------- REFLECTION DIALOG ----------
  openReflection() {
    // Reset all steps
    for (let i = 1; i <= 5; i++) {
      const step = this.$(`ref-step-${i}`);
      if (step) step.classList.toggle('hidden', i !== 1);
    }

    // Reset form fields
    this.pledgeInput.value = '';
    this.pledgeConfirmBtn.disabled = true;
    this.pledgeConfirmBtn.style.opacity = '0.5';
    this.pledgeConfirmBtn.style.cursor = 'not-allowed';
    this.systemChangeInput.value = '';
    this.refNext4Btn.disabled = true;
    this.refNext4Btn.style.opacity = '0.5';
    this.refNext4Btn.style.cursor = 'not-allowed';
    if (this.barrierDetailInput) this.barrierDetailInput.value = '';
    document.querySelectorAll('.barrier-chip').forEach(c => c.classList.remove('active'));

    this.refBarrier = null;
    this.reflectionOverlay.classList.remove('hidden');

    const dp = this.$('identity-video-card');
    if (dp) dp.classList.add('failure-alarm');
  }

  showRefStep(n) {
    for (let i = 1; i <= 5; i++) {
      const step = this.$(`ref-step-${i}`);
      if (step) step.classList.toggle('hidden', i !== n);
    }
    if (n === 3) this.startRescueTimer();
  }

  startRescueTimer() {
    this.rescueLeft = 120;
    this.rescueDisplay.innerText = formatTimeAr(this.rescueLeft);
    clearInterval(this.rescueInterval);
    this.rescueInterval = setInterval(() => {
      this.rescueLeft--;
      if (this.rescueLeft <= 5 && this.rescueLeft > 0) sound.tick();
      this.rescueDisplay.innerText = formatTimeAr(this.rescueLeft);
      if (this.rescueLeft <= 0) { clearInterval(this.rescueInterval); this.showRefStep(4); }
    }, 1000);
  }

  stopRescueTimer() {
    clearInterval(this.rescueInterval);
    this.rescueLeft = 0;
  }

  onRescueConfirmed() {
    this.stopRescueTimer();
    sound.success();
    // Give back 5 XP for the micro-action
    state.addXP(5);
    this.renderStats();
    this.showRefStep(4);
  }

  closeReflection() {
    this.stopRescueTimer();
    this.reflectionOverlay.classList.add('hidden');
    const dp = this.$('identity-video-card');
    if (dp) dp.classList.remove('failure-alarm');
  }

  // ---------- ATOMIC HABITS WATCHER ----------
  startAtomicWatcher() {
    this.stopAtomicWatcher(); // Clear any existing interval

    // Set deadline to 10 PM today (or next day if past)
    const now = new Date();
    const deadline = new Date();
    deadline.setHours(22, 0, 0, 0); // 10 PM

    if (now >= deadline) {
      deadline.setDate(deadline.getDate() + 1);
    }

    state.habitDeadline = deadline.toISOString();
    state.save();

    this.watcherInterval = setInterval(() => {
      this.checkHabitDeadline();
    }, 60000); // Check every minute

    this.checkHabitDeadline(); // Check immediately
  }

  showToast(message, type = 'info') {
    const toastContainer = this.$('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast-notification`;
    toast.style.cssText = `
      background: ${type === 'success' ? 'rgba(75, 211, 127, 0.9)' : type === 'error' ? 'rgba(255, 92, 92, 0.9)' : 'rgba(229, 169, 59, 0.9)'};
      color: #0a0f18;
      padding: 12px 24px;
      border-radius: 12px;
      font-family: var(--font-main);
      font-weight: 700;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  stopAtomicWatcher() {
    if (this.watcherInterval) {
      clearInterval(this.watcherInterval);
      this.watcherInterval = null;
    }
    if (this.identityVideoCard) {
      this.identityVideoCard.classList.remove('strict-procrastination-mode');
    }
    this.removeStrictModeUI();
  }

  checkHabitDeadline() {
    if (!state.atomicWatcherEnabled) return;

    const now = new Date();
    const deadline = new Date(state.habitDeadline);

    if (now >= deadline) {
      // Check if user has logged a habit today
      const today = now.toDateString();
      const hasLoggedToday = state.history.some(log => {
        const logDate = new Date(log.date).toDateString();
        return logDate === today;
      });

      if (!hasLoggedToday && !state.contractLocked) {
        this.triggerContractLock();
      }
    }
  }

  triggerStrictProcrastinationMode() {
    if (this.identityVideoCard) {
      this.identityVideoCard.classList.add('strict-procrastination-mode');
    }
    this.showStrictModeUI();
    if (typeof sound.alarm === 'function') {
      sound.alarm();
    }
  }

  // ---------- CONTRACT LOCK ----------
  triggerContractLock() {
    state.contractLocked = true;
    state.hasActivePenalty = true;
    state.isContractSigned = false;
    
    // Set XP freeze for 2 days
    const freezeUntil = new Date();
    freezeUntil.setDate(freezeUntil.getDate() + 2);
    state.xpFreezeUntil = freezeUntil.toISOString();
    state.save();

    // Show contract lock overlay
    const contractOverlay = this.$('contract-lock-overlay');
    if (contractOverlay) {
      contractOverlay.classList.remove('hidden');
      updateAdSlotVisibility();
    }

    // Pause the background video
    const video = this.$('growth-video');
    if (video) {
      video.pause();
    }

    // Disable app interaction
    this.disableAppInteraction();
  }

  unlockContract() {
    state.contractLocked = false;
    state.hasActivePenalty = false;
    state.isContractSigned = true;

    // Reset signature input
    const contractSignatureInput = this.$('contract-signature');
    const contractUnlockBtn = this.$('contract-unlock-btn');
    const signatureStatus = this.$('signature-status');
    
    if (contractSignatureInput) contractSignatureInput.value = '';
    if (contractUnlockBtn) {
      contractUnlockBtn.disabled = true;
      contractUnlockBtn.style.opacity = '0.5';
      contractUnlockBtn.style.cursor = 'not-allowed';
      contractUnlockBtn.style.boxShadow = 'none';
    }
    if (signatureStatus) {
      signatureStatus.textContent = '';
      signatureStatus.className = 'signature-status';
    }

    // Hide contract lock overlay
    const contractOverlay = this.$('contract-lock-overlay');
    if (contractOverlay) {
      contractOverlay.classList.add('hidden');
      updateAdSlotVisibility();
    }

    // Resume background video
    const video = this.$('growth-video');
    if (video) {
      video.play();
    }

    // Re-enable app interaction
    this.enableAppInteraction();

    // Set new deadline for tomorrow
    const newDeadline = new Date();
    newDeadline.setDate(newDeadline.getDate() + 1);
    newDeadline.setHours(22, 0, 0, 0);
    state.habitDeadline = newDeadline.toISOString();
    state.save();

    sound.success();
  }

  checkContractLock() {
    const contractOverlay = this.$('contract-lock-overlay');
    if (state.hasActivePenalty && state.contractLocked) {
      if (contractOverlay) {
        contractOverlay.classList.remove('hidden');
      }

      // Pause video if locked
      const video = this.$('growth-video');
      if (video) {
        video.pause();
      }

      this.disableAppInteraction();
    } else {
      if (contractOverlay) {
        contractOverlay.classList.add('hidden');
      }

      const video = this.$('growth-video');
      if (video) {
        video.play().catch(() => {});
      }

      this.enableAppInteraction();
    }
    updateAdSlotVisibility();
  }

  disableAppInteraction() {
    // Disable main app panels
    const enginePanel = this.$('engine-panel');
    const identityVideoCard = this.$('identity-video-card');
    
    if (enginePanel) {
      enginePanel.style.pointerEvents = 'none';
      enginePanel.style.opacity = '0.3';
    }
    
    if (identityVideoCard) {
      identityVideoCard.style.pointerEvents = 'none';
      identityVideoCard.style.opacity = '0.3';
    }
  }

  enableAppInteraction() {
    // Enable main app panels
    const enginePanel = this.$('engine-panel');
    const identityVideoCard = this.$('identity-video-card');
    
    if (enginePanel) {
      enginePanel.style.pointerEvents = 'auto';
      enginePanel.style.opacity = '1';
    }
    
    if (identityVideoCard) {
      identityVideoCard.style.pointerEvents = 'auto';
      identityVideoCard.style.opacity = '1';
    }
  }

  showStrictModeUI() {
    const videoContainer = this.identityVideoCard?.querySelector('.video-container');
    if (!videoContainer) return;

    this.diagnosticStep = 0;

    videoContainer.innerHTML = `
      <div class="diagnostic-container" id="diagnostic-container">
        <div class="strict-message">🔍 تشخيص نظامك الحياتي</div>
        <div class="diagnostic-step" id="diagnostic-step-0">
          <div class="diagnostic-question">المشكلة ليست في رغبتك، بل في نظامك المحيط. كيف سنجعل إشارة عادتك الواقعية غداً مستحيلة التجاهل في غرفتك؟</div>
          <textarea class="diagnostic-input" id="diag-input-0" placeholder="اكتب كيف ستغير بيئتك..."></textarea>
          <button class="btn btn-primary" id="diag-next-0" style="height: 44px; font-size: 0.85rem; margin-top: 10px;">
            <span class="btn-text">التالي</span>
          </button>
        </div>
      </div>
    `;

    // Add event listener for first step
    document.getElementById('diag-next-0').addEventListener('click', () => this.showDiagnosticStep(1));
  }

  showDiagnosticStep(step) {
    const container = document.getElementById('diagnostic-container');
    if (!container) return;

    // Get friction reduction suggestions based on most recent habit
    const frictionHints = this.getFrictionReductionHints();

    const steps = [
      {
        question: "المشكلة ليست في رغبتك، بل في نظامك المحيط. كيف سنجعل إشارة عادتك الواقعية غداً مستحيلة التجاهل في غرفتك؟",
        placeholder: "اكتب كيف ستغير بيئتك...",
        hint: "مثال: ضع كتابك على المكتب، أزل المشتتات، جهز الملابس الرياضية..."
      },
      {
        question: "كيف سنقلل الاحتكاك لتجعل البدء سهلاً؟ ما هي العقبات الصغيرة التي تمنعك من البدء؟",
        placeholder: "حدد العقبات الصغيرة...",
        hint: frictionHints || "مثال: فتح التطبيق، تجهيز الأدوات، إزالة الحواجز المادية..."
      },
      {
        question: "ما هو أصغر إجراء يمكنك اتخاذه الآن (أقل من دقيقتين) لبدء عادتك؟",
        placeholder: "حدد أصغر خطوة...",
        hint: "مثال: فتح الكتاب، ارتداء حذاء الرياضة، فتح تطبيق التعلم..."
      },
      {
        question: "كيف ستكافئ نفسك بعد إتمام هذا الإجراء الصغير؟",
        placeholder: "حدد المكافأة...",
        hint: "مثال: استراحة قصيرة، شرب قهوة، الاستماع لأغنية مفضلة..."
      }
    ];

    if (step >= steps.length) {
      this.showDiagnosticSummary();
      return;
    }

    const currentStep = steps[step];

    container.innerHTML = `
      <div class="strict-message" style="font-size: 0.75rem;">🔍 تشخيص نظامك الحياتي (${step + 1}/${steps.length})</div>
      <div class="diagnostic-step">
        <div class="diagnostic-question">${currentStep.question}</div>
        <div class="diagnostic-hint">${currentStep.hint}</div>
        <textarea class="diagnostic-input" id="diag-input-${step}" placeholder="${currentStep.placeholder}"></textarea>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button class="btn btn-ghost" id="diag-back-${step}" style="flex: 1; height: 44px; font-size: 0.85rem;">
            <span class="btn-text">رجوع</span>
          </button>
          <button class="btn btn-primary" id="diag-next-${step}" style="flex: 1; height: 44px; font-size: 0.85rem;">
            <span class="btn-text">${step === steps.length - 1 ? 'إنهاء' : 'التالي'}</span>
          </button>
        </div>
      </div>
    `;

    // Save previous answer
    if (step > 0) {
      const prevInput = document.getElementById(`diag-input-${step - 1}`);
      if (prevInput) {
        this.diagnosticAnswers = this.diagnosticAnswers || {};
        this.diagnosticAnswers[step - 1] = prevInput.value;
      }
    }

    // Add event listeners
    document.getElementById(`diag-next-${step}`).addEventListener('click', () => {
      const currentInput = document.getElementById(`diag-input-${step}`);
      if (currentInput && currentInput.value.trim()) {
        this.diagnosticAnswers = this.diagnosticAnswers || {};
        this.diagnosticAnswers[step] = currentInput.value.trim();
        this.showDiagnosticStep(step + 1);
      } else {
        currentInput.style.borderColor = '#FF5C5C';
        setTimeout(() => currentInput.style.borderColor = '', 1000);
      }
    });

    if (step > 0) {
      document.getElementById(`diag-back-${step}`).addEventListener('click', () => {
        this.showDiagnosticStep(step - 1);
      });
    }
  }

  getFrictionReductionHints() {
    // Get the most recent habit from history
    if (state.history.length === 0) return null;

    const recentLog = state.history[state.history.length - 1];
    const habitId = recentLog.habitId;
    const habit = state.habits.find(h => h.id === habitId);

    if (!habit) return null;

    // Return friction reduction hints based on habit category
    const hints = {
      work: "مثال: جهز مساحة العمل مسبقاً، افتح البرامج الضرورية، أزل إشعارات البريد الإلكتروني...",
      learning: "مثال: ضع الكتاب في مكان واضح، جهز دفتر الملاحظات، أزل الهاتف من الغرفة...",
      health: "مثال: جهز الملابس الرياضية من الليلة السابقة، ضع حذاء الرياضة عند الباب، جهز زجاجة الماء...",
      creative: "مثال: جهز أدوات الفن مسبقاً، نظف مساحة العمل، افتح برنامج التصميم...",
      spiritual: "مثال: جهز مكان التأمل، أزل المشتتات، جهز سجادة الصلاة...",
      other: "مثال: جهز الأدوات المطلوبة، أزل العقبات المادية، جهز البيئة المناسبة..."
    };

    return hints[habit.category] || hints.other;
  }

  showDiagnosticSummary() {
    const container = document.getElementById('diagnostic-container');
    if (!container) return;

    // Save as system improvement
    const improvement = {
      id: Date.now(),
      date: new Date().toISOString(),
      answers: this.diagnosticAnswers,
      implemented: false
    };

    state.systemImprovements.push(improvement);
    state.diagnosticAnswers = this.diagnosticAnswers;
    state.save();

    container.innerHTML = `
      <div class="strict-message" style="color: #4BD37F; border-color: rgba(75, 211, 127, 0.3);">✅ خطة نظامك جاهزة</div>
      <div class="diagnostic-summary">
        <div class="summary-item">
          <div class="summary-label">🎯 إشارة البيئة:</div>
          <div class="summary-value">${this.diagnosticAnswers[0] || 'لم يحدد'}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">🔓 تقليل الاحتكاك:</div>
          <div class="summary-value">${this.diagnosticAnswers[1] || 'لم يحدد'}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">⚡ أصغر إجراء:</div>
          <div class="summary-value">${this.diagnosticAnswers[2] || 'لم يحدد'}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">🎁 المكافأة:</div>
          <div class="summary-value">${this.diagnosticAnswers[3] || 'لم يحدد'}</div>
        </div>
      </div>
      <div class="two-minute-action">
        <div class="two-minute-title">🚀 نفذ خطتك الآن</div>
        <div class="two-minute-desc">طبق التغييرات التي حددتها وابدأ بأصغر إجراء</div>
        <button class="btn btn-primary" id="strict-rescue-btn" style="height: 44px; font-size: 0.9rem;">
          <span class="btn-text">بدء التنفيذ</span>
        </button>
      </div>
    `;

    document.getElementById('strict-rescue-btn').addEventListener('click', () => this.startTwoMinuteRescue());
  }

  removeStrictModeUI() {
    if (this.strictTimerInterval) {
      clearInterval(this.strictTimerInterval);
      this.strictTimerInterval = null;
    }

    const videoContainer = this.identityVideoCard?.querySelector('.video-container');
    if (videoContainer) {
      videoContainer.innerHTML = `
        <video id="growth-video" autoplay loop muted playsinline controls>
          <source src="intro.mp4" type="video/mp4">
        </video>
      `;
    }
  }

  startTwoMinuteRescue() {
    clearInterval(this.strictTimerInterval);
    this.stopAtomicWatcher();

    // Open the session card with a pre-filled goal
    this.challengeCard.classList.remove('flipped');
    this.sessionGoalInput.value = "قاعدة الدقيقتين - إنقاذ اليوم";
    this.sessionGoalInput.focus();

    // Show success message
    alert('اختيار حكيم! الآن نفذ جزءاً مصغراً من عادتك لمدة دقيقتين فقط. هذا يمنع كسر السلسلة.');
  }

  handleStrictTimeout() {
    // User failed to take action - harsher consequences
    state.streak = 0;
    state.save();
    this.renderStats();

    const videoContainer = this.identityVideoCard?.querySelector('.video-container');
    if (videoContainer) {
      videoContainer.innerHTML = `
        <div style="padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
          <div class="strict-message" style="color: #FF4444; border-color: rgba(255, 68, 68, 0.5);">
            ❌ فشلت في قاعدة الدقيقتين
          </div>
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-sub); text-align: center; line-height: 1.6; margin-top: 12px;">
            تم كسر السلسلة. يجب أن تبدأ من الصفر غداً.<br>
            الألم من الفشل الآن سيجعلك أقوى غداً.
          </div>
          <button class="btn btn-ghost" id="strict-dismiss-btn" style="margin-top: 16px;">
            أغلق
          </button>
        </div>
      `;

      const dismissBtn = document.getElementById('strict-dismiss-btn');
      if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
          this.removeStrictModeUI();
          // Reset deadline for tomorrow
          this.startAtomicWatcher();
        });
      }
    }
  }
}

// ==========================================================================
// --- BOOT ---
// ==========================================================================
function updateAdSlotVisibility() {
  const slot = document.getElementById('ad-slot');
  if (!slot) return;

  const content = document.getElementById('ad-slot-content');
  const contractOverlay = document.getElementById('contract-lock-overlay');
  const hasLoadedAd = slot.dataset.adLoaded === 'true' && Boolean(content?.childElementCount);
  const isLoadingAd = !hasLoadedAd && Boolean(content?.querySelector('[data-ad-provider-frame]'));
  const contractIsOpen = contractOverlay && !contractOverlay.classList.contains('hidden');
  const shouldShow = hasLoadedAd && navigator.onLine && !window.app?.isRunning && !contractIsOpen;

  slot.hidden = !shouldShow && !isLoadingAd;
  slot.classList.toggle('hidden', !shouldShow && !isLoadingAd);
  slot.classList.toggle('ad-slot-loading', isLoadingAd);
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new LifeCraftApp();

  // Initialize language after app is ready
  switchLanguage(currentLang);

  const adSlot = document.getElementById('ad-slot');
  const contractOverlay = document.getElementById('contract-lock-overlay');
  if (adSlot) {
    const adContent = document.getElementById('ad-slot-content');
    const adProviderTemplate = document.getElementById('ad-provider-template');
    let adFrame = null;

    // Ad integrations dispatch this only after successfully rendering into the slot.
    window.addEventListener('lifecraft:ad-loaded', () => {
      const content = document.getElementById('ad-slot-content');
      adSlot.dataset.adLoaded = String(Boolean(content?.childElementCount));
      updateAdSlotVisibility();
    });

    const loadAdProvider = () => {
      if (!navigator.onLine || adFrame || !adContent || !adProviderTemplate) return;

      adFrame = document.createElement('iframe');
      adFrame.title = 'إعلان';
      adFrame.width = '320';
      adFrame.height = '50';
      adFrame.dataset.adProviderFrame = '';
      adFrame.setAttribute('sandbox', 'allow-scripts');
      adFrame.referrerPolicy = 'no-referrer';
      adFrame.srcdoc = `<!doctype html><html><head><meta name="referrer" content="no-referrer"></head><body style="margin:0"><script>
        (() => {
          let reported = false;
          let loadTimeout;
          const reportLoaded = () => {
            if (reported) return;
            reported = true;
            clearTimeout(loadTimeout);
            parent.postMessage({ type: 'lifecraft-ad-loaded', unit: '6217544' }, '*');
          };
          const inspectCreative = (creative) => {
            const size = creative.getBoundingClientRect();
            if (size.width < 300 || size.height < 40) return;
            const source = creative.getAttribute('src');
            if (source && source !== 'about:blank') {
              reportLoaded();
              return;
            }
            try {
              const body = creative.contentDocument?.body;
              if (body && (body.childElementCount > 0 || body.textContent.trim())) reportLoaded();
            } catch (error) {
              console.error('Unable to inspect the loaded ad frame:', error);
            }
          };
          const observeCreative = (creative) => {
            if (creative.dataset.lifecraftObserved) return;
            creative.dataset.lifecraftObserved = 'true';
            creative.addEventListener('load', () => inspectCreative(creative));
            try {
              const documentElement = creative.contentDocument?.documentElement;
              if (documentElement) {
                new MutationObserver(() => inspectCreative(creative))
                  .observe(documentElement, { childList: true, subtree: true });
              }
            } catch (error) {
              console.error('Unable to observe the loaded ad frame:', error);
            }
            inspectCreative(creative);
          };
          const observer = new MutationObserver(() => {
            document.querySelectorAll('iframe').forEach(observeCreative);
          });
          observer.observe(document.documentElement, { childList: true, subtree: true });
          document.addEventListener('load', (event) => {
            if (event.target instanceof HTMLIFrameElement) observeCreative(event.target);
          }, true);
          document.addEventListener('error', (event) => {
            const failedScript = event.target;
            if (failedScript instanceof HTMLScriptElement && failedScript.src.startsWith('https://bauval.org/22/')) {
              parent.postMessage({ type: 'lifecraft-ad-error', unit: '6217544' }, '*');
            }
          }, true);
          loadTimeout = setTimeout(() => {
            if (!reported) parent.postMessage({ type: 'lifecraft-ad-empty', unit: '6217544' }, '*');
          }, 20000);
        })();
      <\/script>${adProviderTemplate.innerHTML}</body></html>`;

      window.addEventListener('message', (event) => {
        if (
          event.source !== adFrame?.contentWindow ||
          !event.data ||
          event.data.unit !== adProviderTemplate.dataset.adUnitId
        ) return;

        if (event.data.type === 'lifecraft-ad-error' || event.data.type === 'lifecraft-ad-empty') {
          if (event.data.type === 'lifecraft-ad-error') {
            console.error('The ad provider script failed to load.');
          } else {
            console.warn('The ad provider did not return a banner.');
          }
          adFrame.remove();
          adFrame = null;
          updateAdSlotVisibility();
          return;
        }

        if (event.data.type !== 'lifecraft-ad-loaded') return;
        window.dispatchEvent(new Event('lifecraft:ad-loaded'));
      });

      adContent.replaceChildren(adFrame);
    };

    window.addEventListener('online', () => {
      loadAdProvider();
      updateAdSlotVisibility();
    });
    window.addEventListener('offline', () => {
      if (adSlot.dataset.adLoaded !== 'true' && adFrame) {
        adFrame.remove();
        adFrame = null;
      }
      updateAdSlotVisibility();
    });

    if (contractOverlay) {
      new MutationObserver(updateAdSlotVisibility).observe(contractOverlay, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    loadAdProvider();
    updateAdSlotVisibility();
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(r => console.log('LifeCraft SW registered:', r.scope))
        .catch(e => console.error('LifeCraft SW failed:', e));
    });
  }
});
