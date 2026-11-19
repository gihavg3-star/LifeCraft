const translations = {
  ar: {
    // App Title
    title: "LifeCraft — اصنع نظامك اليومي الحقيقي",
    description: "LifeCraft هو إطار عمل ذكي يناقشك في عاداتك الحقيقية، يوثّق إنجازاتك، ويبني هويتك الانضباطية لبنة لبنة.",

    // Left Panel
    identity_title: "هوية انضباطك",
    stage_tag: "المرحلة ١: حجر الأساس 📐",
    session_stage_badge: "△ المرحلة 1: حجر الأساس",
    streak_label: "يوم متواصل",
    sessions_label: "جلسة موثّقة",
    level_label: "المستوى",

    // Identity Pools
    identity_pools_title: "عدادات الهوية",
    identity_pools_desc: "تغيير السلوك هو تغيير الهوية",
    identity_progress_label: "أنت الآن",
    identity_level_label: "المستوى",
    identity_xp_label: "نقاط الخبرة",

    // Atomic Habits Watcher
    watcher_title: "🔥 رقيب العادات الذرية",
    watcher_desc: "تفعيل الرقيب الصارم الذي يتابع التزامك ويتدخل عند التقاعس",

    // Right Panel - Sections
    habits_section: "إطار عاداتي الحقيقية",
    add_habit_btn: "+ إضافة عادة جديدة",
    history_section: "سجل إنجازاتي الحقيقية",
    clear_history_btn: "مسح السجل",
    ad_slot_label: "مساحة إعلانية",

    // Weekly Planning & Vision Board
    weekly_plan_title: "نظام التخطيط الأسبوعي ورؤية الأهداف",
    weekly_plan_quote: "ما يمكنك تحقيقه في 12 أسبوعاً سيدهشك.. أفعالك هي مرآة نتائجك!",
    weekly_plan_progress_label: "التقدم الأسبوعي",
    weekly_plan_vision_label: "رؤية الأسبوع وهدفه الأكبر",
    weekly_plan_vision_placeholder: "اكتب رؤيتك لهذا الأسبوع...",
    weekly_plan_task_placeholder: "أضف مهمة صغيرة...",
    weekly_plan_empty_state: "لا توجد مهام بعد",
    weekly_plan_remove_task: "إزالة المهمة",
    weekly_plan_day_sat: "السبت",
    weekly_plan_day_sun: "الأحد",
    weekly_plan_day_mon: "الاثنين",
    weekly_plan_day_tue: "الثلاثاء",
    weekly_plan_day_wed: "الأربعاء",
    weekly_plan_day_thu: "الخميس",
    weekly_plan_day_fri: "الجمعة",

    // Add Habit Form (Habit Stacking)
    habit_current_label: "العادة الحالية (بعد أن...)",
    habit_current_placeholder: "مثال: أصب كوب قهوتي الصباحي، أستيقظ من النوم، أنهي الغداء...",
    habit_new_label: "العادة الجديدة (سأقوم بـ...)",
    habit_new_placeholder: "مثال: البرمجة لمدة ساعة، القراءة لمدة 30 دقيقة، التأمل...",
    habit_duration_label: "الهدف (دق)",
    habit_identity_label: "الهوية التي تبنيها هذه العادة",
    habit_identity_placeholder: "مثال: مبرمج محترف، شخص رياضي، كاتب مبدع، قائد فريق...",
    habit_why_label: "لماذا هذه العادة مهمة لك؟",
    habit_why_placeholder: "الغرض منها يقوّي الالتزام بها...",
    add_habit_submit: "إضافة العادة إلى إطاري",
    habit_stacking_connector: "بعد أن",
    habit_stacking_arrow: "➔",
    habit_stacking_will: "سأقوم بـ",

    // Habit Categories
    category_work: "💼 عمل ومهنة",
    category_learning: "📚 تعلّم وتطوير",
    category_health: "🏃 صحة ولياقة",
    category_creative: "🎨 إبداع وفن",
    category_spiritual: "🌿 روحاني وتأمل",
    category_other: "✨ أخرى",
    habit_name_daily_reading: "القراءة اليومية",
    habit_name_exercise: "التمارين الرياضية",
    habit_name_daily_writing: "الكتابة اليومية",
    habit_name_meditation_relaxation: "التأمل والاسترخاء",
    habit_name_sleep_early: "النوم المبكر",
    habit_name_drink_water: "شرب الماء بانتظام",
    habit_name_continuous_learning: "التعلم المستمر",
    habit_name_time_management: "تنظيم الوقت",
    habit_name_plan_day: "تخطيط اليوم",
    habit_name_review_goals: "مراجعة الأهداف",

    // Habit why descriptions
    habit_why_daily_reading: "تطوير العقل والمعرفة المستمرة",
    habit_why_exercise: "تحسين اللياقة والصحة العامة",
    habit_why_daily_writing: "تنمية مهارة التعبير والإبداع",
    habit_why_meditation_relaxation: "تحسين التركيز والصفاء الذهني",
    habit_why_sleep_early: "الحصول على راحة كافية للجسم",
    habit_why_drink_water: "الحفاظ على ترطيب الجسم",
    habit_why_continuous_learning: "تطوير المهارات المهنية",
    habit_why_time_management: "زيادة الإنتاجية والإنجاز",
    habit_why_plan_day: "تحديد الأولويات بوضوح",
    habit_why_review_goals: "متابعة التقدم والتحسين",

    // Session Card
    session_goal_label: "ما هدفك لهذه الجلسة؟",
    session_goal_placeholder: "مثال: إكمال فصل من الكتاب، برمجة ميزة، التدريب لمدة ساعة...",
    session_duration_label: "المدة المستهدفة",
    optional_timer_label: "تفعيل المؤقت (اختياري)",
    start_session_btn: "ابدأ الجلسة",
    cancel_session_btn: "إلغاء",
    slack_session_btn: "تقاعست ⚠",
    collect_session_btn: "توثيق الإنجاز",

    // Timer
    timer_label: "المؤقت",
    duration_label: "المدة",

    // Accomplishment Log
    accomplishment_label: "ما الذي أنجزته حقاً؟",
    accomplishment_placeholder: "اكتب إنجازك الحقيقي هنا...",

    // Level Up Modal
    level_up_title: "ارتقيت لمستوى جديد! 🎉",
    level_label: "المستوى",
    level_up_desc: "هويتك الانضباطية في تصاعد مستمر.",
    continue_btn: "استمر في البناء",

    // Reflection Modal
    reflection_title: "لماذا لم تلتزم اليوم؟",
    reflection_step1_title: "حدد العقبة",
    reflection_step1_desc: "ما الذي منعك من الالتزام بعادتك اليوم؟",
    reflection_step2_title: "قاعدة الدقيقتين",
    reflection_step2_desc: "هل يمكنك تنفيذ جزء مصغر جداً من عادتك الآن (دقيقتين فقط) لإنقاذ اليوم؟",
    reflection_step3_title: "التغيير الحقيقي",
    reflection_step3_desc: "ما التغيير الواحد الذي ستطبقه في نظامك غداً لمنع تكرار هذا؟",
    reflection_step4_title: "التأكيد",
    reflection_step4_desc: "أنت الآن تدرك المشكلة. غداً ستطبق الحل.",
    reflection_step5_title: "الالتزام",
    reflection_step5_desc: "أنت تلتزم بتطبيق التغيير الذي حددته غداً.",

    // Barrier Options
    barrier_tired: "🫥 تعبت/مللت",
    barrier_distracted: "📱 مشتتات (هاتف/سوشيال)",
    barrier_emergency: "🚨 طارئ",
    barrier_forgot: "🧠 نسيت/لم أتذكر",
    barrier_other: "❓ شيء آخر",

    // Rescue Timer
    rescue_label: "المؤقت للإنقاذ",
    rescue_confirm: "نعم، نفذت الإجراء المصغر",
    rescue_skip: "لا، أريد الانتقال للتغيير",

    // System Change
    system_change_label: "ما التغيير الذي ستطبقه غداً؟",
    system_change_placeholder: "مثال: سأضع الكتاب على المكتب، سأزيل الهاتف من الغرفة...",

    // Environment Engineering
    environment_change_label: "ما التعديل المادي الفعلي الذي أجريته في غرفتك أو مكتبك لتسهيل العادة غداً؟",
    environment_change_placeholder: "مثال: وضعت الكتاب فوق الوسادة، فصلت جهاز الألعاب، وضعت الكمبيوتر مفتوحاً على مشروعي...",
    environment_change_hint: "اجعلها سهلة - التعديل المادي يقلل الاحتكاك ويجعل البدء تلقائياً",
    environment_cue_title: "تذكير بيئي",
    environment_cue_prefix: "تعديلك البيئي:",

    // Pledge
    pledge_label: "ألتزم بتطبيق هذا التغيير غداً",
    pledge_placeholder: "اكتب التزامك هنا...",

    // Diagnostic Questions
    diagnostic_title: "🔍 تشخيص نظامك الحياتي",
    diagnostic_question1: "المشكلة ليست في رغبتك، بل في نظامك المحيط. كيف سنجعل إشارة عادتك الواقعية غداً مستحيلة التجاهل في غرفتك؟",
    diagnostic_question2: "كيف سنقلل الاحتكاك لتجعل البدء سهلاً؟ ما هي العقبات الصغيرة التي تمنعك من البدء؟",
    diagnostic_question3: "ما هو أصغر إجراء يمكنك اتخاذه الآن (أقل من دقيقتين) لبدء عادتك؟",
    diagnostic_question4: "كيف ستكافئ نفسك بعد إتمام هذا الإجراء الصغير؟",
    diagnostic_placeholder1: "اكتب كيف ستغير بيئتك...",
    diagnostic_placeholder2: "حدد العقبات الصغيرة...",
    diagnostic_placeholder3: "حدد أصغر خطوة...",
    diagnostic_placeholder4: "حدد المكافأة...",
    diagnostic_hint1: "مثال: ضع كتابك على المكتب، أزل المشتتات، جهز الملابس الرياضية...",
    diagnostic_hint2: "مثال: فتح التطبيق، تجهيز الأدوات، إزالة الحواجز المادية...",
    diagnostic_hint3: "مثال: فتح الكتاب، ارتداء حذاء الرياضة، فتح تطبيق التعلم...",
    diagnostic_hint4: "مثال: استراحة قصيرة، شرب قهوة، الاستماع لأغنية مفضلة...",

    // Summary
    summary_ready: "✅ خطة نظامك جاهزة",
    summary_environment: "🎯 إشارة البيئة:",
    summary_friction: "🔓 تقليل الاحتكاك:",
    summary_action: "⚡ أصغر إجراء:",
    summary_reward: "🎁 المكافأة:",
    summary_execute: "🚀 نفذ خطتك الآن",
    summary_execute_desc: "طبق التغييرات التي حددتها وابدأ بأصغر إجراء",
    start_execution: "بدء التنفيذ",

    // Strict Mode
    strict_mode_title: "❌ فشلت في قاعدة الدقيقتين",
    strict_mode_desc: "تم كسر السلسلة. يجب أن تبدأ من الصفر غداً.<br>الألم من الفشل الآن سيجعلك أقوى غداً.",
    close_btn: "أغلق",

    // Footer
    footer_hint: "أنت لا ترتقي إلى مستوى أهدافك، بل تهبط إلى مستوى أنظمتك — بنِ نظامك هنا.",
    reset_btn: "إعادة تعيين البيانات الافتراضية",

    // Confirmations
    clear_history_confirm: "هل تريد حذف جميع السجلات؟ لا يمكن التراجع.",
    reset_confirm: "هل تريد إعادة تعيين جميع البيانات إلى القيم الافتراضية؟ سيتم حذف جميع العادات المخصصة والسجلات.",

    // Rescue Success
    rescue_success: "اختيار حكيم! الآن نفذ جزءاً مصغراً من عادتك لمدة دقيقتين فقط. هذا يمنع كسر السلسلة.",

    // Not Specified
    not_specified: "لم يحدد",

    // Additional UI Elements
    xp_progress: "تقدّم الهوية",
    current_session: "جلسة التركيز الحالية",
    habit_selector_label: "العادة التي تعمل عليها الآن:",
    select_habit: "— اختر عادة من قائمتك —",
    custom_habit_option: "عادة مخصصة...",
    custom_habit_label: "ادخل اسم العادة المخصصة",
    custom_habit_placeholder: "اكتب اسم العادة هنا...",
    please_write_goal_and_select_habit: "يرجى كتابة هدف الجلسة واختيار العادة أولاً قبل البدء",
    session_goal_placeholder: "مثال: إنهاء واجهة المستخدم للصفحة الرئيسية، أو حفظ الفصل الثالث...",
    goal_hint: "حدّد هدفك قبل البدء — هذا يرفع جودة الجلسة بشكل كبير",
    session_complete: "جلسة مكتملة!",
    session_complete_desc: "وثّق ما أنجزته بالتفصيل — هذا السجل هو حجارة بنائك الحقيقي",
    accomplishment_placeholder: "مثال: برمجت نظام المصادقة وصممت قاعدة البيانات، وحللت مشكلة الاتصال بنجاح...",
    minutes_abbr: "دق",
    orig_lang_badge: "AR",

    // Reflection Modal
    reflection_title: "تشخيص اليوم",
    reflection_intro: "لم تتمكن من الالتزام بعادتك اليوم — هذا يحدث لكل إنسان. الفارق الحقيقي هو ماذا تفعل بعد ذلك.",
    reflection_quote: '"الانضباط ليس الكمال، بل هو القدرة على العودة بعد التوقف دون استسلام أو تبرير."',
    reflection_start: "أريد تشخيص ما حدث ⚙️",
    reflection_close: "إغلاق والمحاولة غداً",
    reflection_step2_title: "تحليل السبب الجذري",
    reflection_step2_desc: "ما الذي أعاق جلستك اليوم؟ لا يوجد إجابة خاطئة — الهدف هو فهم نمط المقاومة.",
    barrier_distracted: "📱 تشتت وإلهاء",
    barrier_tired: "😴 إرهاق وقلة طاقة",
    barrier_unclear: "🤔 الهدف غير واضح",
    barrier_environment: "🌍 البيئة غير مهيأة",
    barrier_emotion: "💭 عقبة نفسية أو قلق",
    barrier_time: "⏰ ضغط الوقت",
    barrier_detail_label: "صِف ما حدث بكلماتك الخاصة:",
    barrier_detail_placeholder: "كنت أنوي... لكن حدث...",
    reflection_step2_next: "انتقل للحل →",
    reflection_step3_title: "قاعدة الدقيقتين",
    reflection_step3_desc: "لا تكسر السلسلة تماماً. نفّذ الآن إجراءاً صغيراً واحداً — لا يتجاوز دقيقتين — يثبت أن هويتك لم تُهزم.",
    reflection_step3_hint: "الهدف ليس الإنجاز الكامل، بل الحفاظ على طقس البداية وعدم كسر السلسلة.",
    example1: "📝 اكتب سطراً واحداً من كودك",
    example2: "📖 اقرأ صفحة واحدة",
    example3: "🖊️ افتح الملف الذي تعمل عليه",
    example4: "🎯 ارسم مخططاً للخطوة التالية",
    countdown_label: "العداد التنازلي",
    rescue_confirm: "نفّذت الإجراء المصغّر ✅",
    rescue_skip: "تخطّ إلى التعهد",
    reflection_step4_title: "إعادة هندسة النظام",
    reflection_step4_desc: "أنت لا تفشل في الإرادة — أنت تفشل في التصميم. غيّر شيئاً واحداً في بيئتك أو جدولك لجعل العادة أسهل غداً.",
    system_change_placeholder: "مثال: سأضع الكمبيوتر مفتوحاً على مشروعي منذ الصباح، أو سأضبط تنبيهاً في الساعة ٨...",
    reflection_step4_next: "التزمت بهذا التغيير →",
    reflection_step5_title: "تعهد الغد",
    reflection_step5_desc: "لا تفوّت مرتين متتاليتين — هذه هي القاعدة الذهبية للبناء المتراكم. اكتب تعهداً واضحاً لغد أفضل.",
    pledge_placeholder: "غداً بعد الانتهاء من... سأجلس لمدة ... للعمل على ...",
    pledge_confirm: "أوقّع تعهدي وأغلق اليوم ✍️",

    // Habit Card Labels
    habit_goal_prefix: "الهدف:",
    habit_select_btn: "تحديد ▶",
    habit_delete_btn: "🗑",
    habits_empty_title: "أضف أول عادة حقيقية",
    habits_empty_desc: "أضف أول عادة حقيقية تريد الانضباط فيها.<br>البرمجة، المذاكرة، الكتابة، الرياضة — كل ما تريد بناءه هنا.",
    history_empty_title: "سجل إنجازاتك الحقيقية",
    history_empty_desc: "سجل إنجازاتك الحقيقية سيظهر هنا.<br>كل جلسة مكتملة هي حجر في صرحك.",
    log_goal_prefix: "الهدف:",
    habit_delete_confirm: "حذف هذه العادة نهائياً؟",

    // Alert/Confirm Messages
    select_habit_alert: "اختر عادة أولاً لبدء الجلسة",
    clear_history_confirm: "هل تريد حذف جميع السجلات؟ لا يمكن التراجع.",
    reset_confirm: "هل تريد إعادة تعيين جميع البيانات إلى القيم الافتراضية؟ سيتم حذف جميع العادات المخصصة والسجلات.",

    // Contract Lock
    contract_lock_title: "وثيقة عقد العادات القانونية",
    contract_lock_subtitle: "قفل الطوارئ - رقيب العادات الذرية",
    contract_warning: "تجاوزت الموعد النهائي دون إتمام عادتك الواقعية",
    contract_message_1: "لقد فشلت في الالتزام بالموعد الذي حددته لنفسك. هذا ليس مجرد تقاعس عادي — هذا انتهاك لثقتك بنفسك وللعقد الذي أبرمته مع هويتك الانضباطية.",
    contract_message_2: "كبرياؤك يُستحق أكثر من ذلك. أنت لست شخصاً يترك وعوده للرياح. أنت شخص انضباطي يلتزم بكلمته حتى عندما لا يريد ذلك.",
    punishment_title: "العقوبة المفروضة:",
    punishment_xp_freeze: "تجميد كسب الـ XP العام لمدة يومين",
    punishment_locked: "قفل التطبيق حتى التوقيع الرقمي",
    signature_label: "اكتب الجملة التالية حرفياً لفك القفل:",
    required_phrase: '"أنا ألتزم بالظهور غداً وإصلاح نظامي الحياتي"',
    signature_placeholder: "اكتب الجملة أعلاه حرفياً...",
    unlock_contract_btn: "توقيع وفك القفل ✍️",

    // Atomic Discipline Network
    atomic_network_title: "شبكة الالتزام الذري",
    current_streak: "السلسلة الحالية",
    longest_streak: "أطول سلسلة",
    total_days: "أيام مكتملة",
    filter_habit_label: "تصفية حسب العادة:",
    filter_all: "جميع العادات",
    legend_none: "لا بيانات",
    legend_low: "منخفض",
    legend_medium: "متوسط",
    legend_high: "ممتاز"
  },
  en: {
    // App Title
    // App Title
    title: "LifeCraft — Build Your Real Daily System",
    description: "LifeCraft is a smart framework that challenges your real habits, documents your achievements, and builds your discipline identity brick by brick.",

    // Left Panel
    identity_title: "Your Discipline Identity",
    stage_tag: "Stage 1: Foundation 📐",
    session_stage_badge: "△ Phase 1: Foundation",
    streak_label: "Day Streak",
    sessions_label: "Logged Session",
    level_label: "Level",

    // Identity Pools
    identity_pools_title: "Identity Pools",
    identity_pools_desc: "Changing behavior is changing identity",
    identity_progress_label: "You are now",
    identity_level_label: "Level",
    identity_xp_label: "Experience Points",

    // Atomic Habits Watcher
    watcher_title: "🔥 Atomic Habits Watcher",
    watcher_desc: "Enable the strict watcher that monitors your commitment and intervenes upon procrastination",

    // Right Panel - Sections
    habits_section: "My Real Habit Framework",
    add_habit_btn: "+ Add New Habit",
    history_section: "My Real Achievement Log",
    clear_history_btn: "Clear Log",
    ad_slot_label: "Advertisement",

    // Weekly Planning & Vision Board
    weekly_plan_title: "Weekly Planning & Vision Board",
    weekly_plan_quote: "What you can achieve in 12 weeks will amaze you.. Your actions reflect your results!",
    weekly_plan_progress_label: "Weekly Progress",
    weekly_plan_vision_label: "This week's vision and bigger goal",
    weekly_plan_vision_placeholder: "Write your vision for this week...",
    weekly_plan_task_placeholder: "Add a small task...",
    weekly_plan_empty_state: "No tasks yet",
    weekly_plan_remove_task: "Remove task",
    weekly_plan_day_sat: "Saturday",
    weekly_plan_day_sun: "Sunday",
    weekly_plan_day_mon: "Monday",
    weekly_plan_day_tue: "Tuesday",
    weekly_plan_day_wed: "Wednesday",
    weekly_plan_day_thu: "Thursday",
    weekly_plan_day_fri: "Friday",

    // Add Habit Form (Habit Stacking)
    habit_current_label: "Current Habit (After I...)",
    habit_current_placeholder: "Example: pour my morning coffee, wake up, finish lunch...",
    habit_new_label: "New Habit (I will...)",
    habit_new_placeholder: "Example: code for an hour, read for 30 minutes, meditate...",
    habit_duration_label: "Target (min)",
    habit_identity_label: "The identity this habit builds",
    habit_identity_placeholder: "Example: professional programmer, athlete, creative writer, team leader...",
    habit_why_label: "Why is this habit important to you?",
    habit_why_placeholder: "The purpose strengthens commitment...",
    add_habit_submit: "Add Habit to My Framework",
    habit_stacking_connector: "After I",
    habit_stacking_arrow: "➔",
    habit_stacking_will: "I will",

    // Habit Categories
    category_work: "💼 Work & Career",
    category_learning: "📚 Learning & Development",
    category_health: "🏃 Health & Fitness",
    category_creative: "🎨 Creativity & Art",
    category_spiritual: "🌿 Spiritual & Meditation",
    category_other: "✨ Other",
    habit_name_daily_reading: "Daily Reading",
    habit_name_exercise: "Exercise",
    habit_name_daily_writing: "Daily Writing",
    habit_name_meditation_relaxation: "Meditation & Relaxation",
    habit_name_sleep_early: "Sleep Early",
    habit_name_drink_water: "Drink Water Regularly",
    habit_name_continuous_learning: "Continuous Learning",
    habit_name_time_management: "Time Management",
    habit_name_plan_day: "Plan the Day",
    habit_name_review_goals: "Review Goals",

    // Habit why descriptions
    habit_why_daily_reading: "Mind development & continuous knowledge",
    habit_why_exercise: "Improving fitness and general health",
    habit_why_daily_writing: "Develop expression and creativity",
    habit_why_meditation_relaxation: "Improve focus and mental clarity",
    habit_why_sleep_early: "Get sufficient rest for the body",
    habit_why_drink_water: "Maintain proper hydration",
    habit_why_continuous_learning: "Develop professional skills",
    habit_why_time_management: "Increase productivity and output",
    habit_why_plan_day: "Clarify priorities",
    habit_why_review_goals: "Track progress and improve",

    // Session Card
    session_goal_label: "What's your goal for this session?",
    session_goal_placeholder: "Example: Complete a book chapter, code a feature, train for an hour...",
    session_duration_label: "Target Duration",
    optional_timer_label: "Enable Timer (Optional)",
    start_session_btn: "Start Session",
    cancel_session_btn: "Cancel",
    slack_session_btn: "Slacked Off ⚠",
    collect_session_btn: "Log Achievement",

    // Timer
    timer_label: "Timer",
    duration_label: "Duration",

    // Accomplishment Log
    accomplishment_label: "What did you really accomplish?",
    accomplishment_placeholder: "Write your real achievement here...",

    // Level Up Modal
    level_up_title: "Leveled Up! 🎉",
    level_label: "Level",
    level_up_desc: "Your discipline identity is steadily ascending.",
    continue_btn: "Continue Building",

    // Reflection Modal
    reflection_title: "Why didn't you commit today?",
    reflection_step1_title: "Identify the Barrier",
    reflection_step1_desc: "What prevented you from committing to your habit today?",
    reflection_step2_title: "2-Minute Rule",
    reflection_step2_desc: "Can you execute a very tiny part of your habit now (just 2 minutes) to save the day?",
    reflection_step3_title: "Real Change",
    reflection_step3_desc: "What single change will you apply to your system tomorrow to prevent this from repeating?",
    reflection_step4_title: "Confirmation",
    reflection_step4_desc: "You now understand the problem. Tomorrow you will apply the solution.",
    reflection_step5_title: "Commitment",
    reflection_step5_desc: "You commit to applying the change you identified tomorrow.",

    // Barrier Options
    barrier_tired: "🫥 Tired/Bored",
    barrier_distracted: "📱 Distracted (Phone/Social)",
    barrier_emergency: "🚨 Emergency",
    barrier_forgot: "🧠 Forgot/Didn't Remember",
    barrier_other: "❓ Something Else",

    // Rescue Timer
    rescue_label: "Rescue Timer",
    rescue_confirm: "Yes, I executed the micro-action",
    rescue_skip: "No, I want to move to change",

    // System Change
    system_change_label: "What change will you apply tomorrow?",
    system_change_placeholder: "Example: I'll put the book on my desk, I'll remove the phone from the room...",

    // Environment Engineering
    environment_change_label: "What physical modification did you make in your room or office to facilitate the habit tomorrow?",
    environment_change_placeholder: "Example: Put the book on the pillow, unplugged the gaming console, left the computer open on my project...",
    environment_change_hint: "Make it easy - Physical modification reduces friction and makes starting automatic",
    environment_cue_title: "Environment Cue",
    environment_cue_prefix: "Your environmental modification:",

    // Pledge
    pledge_label: "I commit to applying this change tomorrow",
    pledge_placeholder: "Write your commitment here...",

    // Diagnostic Questions
    diagnostic_title: "🔍 Your Life System Diagnosis",
    diagnostic_question1: "The problem isn't your desire, it's your surrounding system. How will we make your real habit signal tomorrow impossible to ignore in your room?",
    diagnostic_question2: "How will we reduce friction to make starting easy? What small obstacles prevent you from starting?",
    diagnostic_question3: "What's the smallest action you can take now (less than 2 minutes) to start your habit?",
    diagnostic_question4: "How will you reward yourself after completing this small action?",
    diagnostic_placeholder1: "Write how you'll change your environment...",
    diagnostic_placeholder2: "Identify small obstacles...",
    diagnostic_placeholder3: "Identify smallest step...",
    diagnostic_placeholder4: "Identify the reward...",
    diagnostic_hint1: "Example: Put your book on the desk, remove distractions, prepare workout clothes...",
    diagnostic_hint2: "Example: Opening the app, preparing tools, removing physical barriers...",
    diagnostic_hint3: "Example: Opening the book, putting on running shoes, opening learning app...",
    diagnostic_hint4: "Example: Short break, drinking coffee, listening to favorite song...",

    // Summary
    summary_ready: "✅ Your System Plan is Ready",
    summary_environment: "🎯 Environment Signal:",
    summary_friction: "🔓 Reduce Friction:",
    summary_action: "⚡ Smallest Action:",
    summary_reward: "🎁 Reward:",
    summary_execute: "🚀 Execute Your Plan Now",
    summary_execute_desc: "Apply the changes you identified and start with the smallest action",
    start_execution: "Start Execution",

    // Strict Mode
    strict_mode_title: "❌ Failed the 2-Minute Rule",
    strict_mode_desc: "The streak is broken. You must start from zero tomorrow.<br>The pain of failure now will make you stronger tomorrow.",
    close_btn: "Close",

    // Footer
    footer_hint: "You don't rise to the level of your goals, you fall to the level of your systems — build your system here.",
    reset_btn: "Reset to Default Data",

    // Confirmations
    clear_history_confirm: "Do you want to delete all logs? This cannot be undone.",
    reset_confirm: "Do you want to reset all data to default values? All custom habits and logs will be deleted.",

    // Rescue Success
    rescue_success: "Wise choice! Now execute a tiny part of your habit for just 2 minutes. This prevents breaking the streak.",

    // Not Specified
    not_specified: "Not specified",

    // Additional UI Elements
    xp_progress: "Identity Progress",
    current_session: "Current Focus Session",
    habit_selector_label: "Habit you're working on now:",
    select_habit: "— Select a habit from your list —",
    custom_habit_option: "Custom Habit...",
    custom_habit_label: "Enter custom habit name",
    custom_habit_placeholder: "Type habit name here...",
    please_write_goal_and_select_habit: "Please write the session goal and select (or enter) a habit first",
    session_goal_placeholder: "Example: Complete homepage UI, memorize chapter three...",
    goal_hint: "Define your goal before starting — this dramatically raises session quality",
    session_complete: "Session Complete!",
    session_complete_desc: "Document what you accomplished in detail — this log is your real building blocks",
    accomplishment_placeholder: "Example: Coded authentication system and designed database, successfully solved connection issue...",
    minutes_abbr: "min",
    orig_lang_badge: "EN",

    // Reflection Modal
    reflection_title: "Today's Diagnosis",
    reflection_intro: "You couldn't commit to your habit today — this happens to everyone. The real difference is what you do afterwards.",
    reflection_quote: '"Discipline is not perfection, but the ability to return after stopping without surrender or excuse."',
    reflection_start: "I want to diagnose what happened ⚙️",
    reflection_close: "Close and try tomorrow",
    reflection_step2_title: "Root Cause Analysis",
    reflection_step2_desc: "What hindered your session today? There's no wrong answer — the goal is to understand the resistance pattern.",
    barrier_distracted: "📱 Distracted",
    barrier_tired: "😴 Tired/Low Energy",
    barrier_unclear: "🤔 Unclear Goal",
    barrier_environment: "🌍 Environment Not Ready",
    barrier_emotion: "💭 Mental Block/Anxiety",
    barrier_time: "⏰ Time Pressure",
    barrier_detail_label: "Describe what happened in your own words:",
    barrier_detail_placeholder: "I intended to... but...",
    reflection_step2_next: "Move to solution →",
    reflection_step3_title: "2-Minute Rule",
    reflection_step3_desc: "Don't break the streak completely. Execute one tiny action now — less than 2 minutes — proving your identity wasn't defeated.",
    reflection_step3_hint: "The goal isn't full completion, but maintaining the starting ritual and not breaking the streak.",
    example1: "📝 Write one line of code",
    example2: "📖 Read one page",
    example3: "🖊️ Open the file you're working on",
    example4: "🎯 Draw a diagram for the next step",
    countdown_label: "Countdown",
    rescue_confirm: "I executed the micro-action ✅",
    rescue_skip: "Skip to pledge",
    reflection_step4_title: "System Redesign",
    reflection_step4_desc: "You don't fail in willpower — you fail in design. Change one thing in your environment or schedule to make the habit easier tomorrow.",
    system_change_placeholder: "Example: I'll leave the computer open on my project since morning, or set an alarm at 8 AM...",
    reflection_step4_next: "I commit to this change →",
    reflection_step5_title: "Tomorrow's Pledge",
    reflection_step5_desc: "Don't miss twice in a row — this is the golden rule of cumulative building. Write a clear pledge for a better tomorrow.",
    pledge_placeholder: "Tomorrow after finishing... I'll sit for ... to work on ...",
    pledge_confirm: "Sign my pledge and close the day ✍️",

    // Habit Card Labels
    habit_goal_prefix: "Goal:",
    habit_select_btn: "Select ▶",
    habit_delete_btn: "🗑",
    habits_empty_title: "Add your first real habit",
    habits_empty_desc: "Add your first real habit you want to discipline yourself in.<br>Programming, studying, writing, sports — whatever you want to build here.",
    history_empty_title: "Your real achievement log",
    history_empty_desc: "Your real achievement log will appear here.<br>Every completed session is a brick in your building.",
    log_goal_prefix: "Goal:",
    habit_delete_confirm: "Delete this habit permanently?",

    // Alert/Confirm Messages
    select_habit_alert: "Select a habit first to start the session",
    clear_history_confirm: "Do you want to delete all logs? This cannot be undone.",
    reset_confirm: "Do you want to reset all data to default values? All custom habits and logs will be deleted.",

    // Contract Lock
    contract_lock_title: "Habit Contract Legal Document",
    contract_lock_subtitle: "Emergency Lock - Atomic Habits Watcher",
    contract_warning: "You missed the deadline without completing your real habit",
    contract_message_1: "You failed to commit to the deadline you set for yourself. This is not just ordinary procrastination — this is a violation of your self-trust and the contract you made with your discipline identity.",
    contract_message_2: "Your pride deserves better than this. You are not someone who leaves promises to the wind. You are a disciplined person who commits to their word even when they don't want to.",
    punishment_title: "Punishment Imposed:",
    punishment_xp_freeze: "XP earning frozen for 2 days",
    punishment_locked: "App locked until digital signature",
    signature_label: "Write the following phrase exactly to unlock:",
    required_phrase: '"I commit to showing up tomorrow and fixing my life system"',
    signature_placeholder: "Write the phrase above exactly...",
    unlock_contract_btn: "Sign and Unlock ✍️",

    // Atomic Discipline Network
    atomic_network_title: "Atomic Discipline Network",
    current_streak: "Current Streak",
    longest_streak: "Longest Streak",
    total_days: "Completed Days",
    filter_habit_label: "Filter by habit:",
    filter_all: "All Habits",
    legend_none: "No data",
    legend_low: "Low",
    legend_medium: "Medium",
    legend_high: "Excellent"
  }
};
