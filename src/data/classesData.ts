export interface LiveClassItem {
  id: string;
  subjectId: string;
  subjectTitle: string;
  chapterTitle: string;
  topicTitle: string;
  educator: string;
  educatorRole: string;
  status: 'live_now' | 'scheduled_today' | 'upcoming';
  timeSlot: string;
  scheduledTime: string;
  dateString: string;
  attendeesCount?: number;
  roomCode: string;
  keyHighlights: string[];
}

export interface RecordedLectureItem {
  id: string;
  subjectId: string;
  subjectTitle: string;
  chapterTitle: string;
  lectureNumber: number;
  lectureTitle: string;
  educator: string;
  duration: string;
  recordedDate: string;
  viewsCount: number;
  difficulty: 'Foundation' | 'Core Board Exam' | 'High-Scorer Advanced';
  thumbnailTheme: string;
  keyTakeaways: string[];
  sampleVideoSummary: string;
}

export const LIVE_CLASSES_LIST: LiveClassItem[] = [
  // 🔴 GOING ON NOW (LIVE NOW)
  {
    id: 'live-sci1-grav',
    subjectId: 'sci1',
    subjectTitle: 'Science & Technology 1',
    chapterTitle: 'Gravitation',
    topicTitle: 'Newton\'s Universal Law Derivation & Kepler\'s 3rd Law Numericals',
    educator: 'Prof. Ramesh Kulkarni',
    educatorRole: 'Senior Physics Faculty (18+ Yrs Board Evaluation)',
    status: 'live_now',
    timeSlot: '07:30 AM – 08:45 AM',
    scheduledTime: 'Started 25 mins ago',
    dateString: 'Today (Live Session)',
    attendeesCount: 142,
    roomCode: 'SN-SCI1-GRAV-101',
    keyHighlights: [
      'Step-by-step derivation of F = G·(m₁·m₂)/r² on the digital chalkboard',
      'Solving Board March 2023 & July 2022 numericals on escape velocity',
      'Live Q&A doubt resolution in progress'
    ]
  },
  {
    id: 'live-math1-linear',
    subjectId: 'math1',
    subjectTitle: 'Mathematics Part 1',
    chapterTitle: 'Linear Equations in Two Variables',
    topicTitle: 'Cramer\'s Rule Determinants & Word Problem Solving Strategy',
    educator: 'Mrs. Vandana Deshmukh',
    educatorRole: 'Mathematics HOD & SSC Moderator',
    status: 'live_now',
    timeSlot: '08:00 AM – 09:15 AM',
    scheduledTime: 'Started 12 mins ago',
    dateString: 'Today (Live Session)',
    attendeesCount: 198,
    roomCode: 'SN-MATH1-DET-204',
    keyHighlights: [
      'Mastering determinant calculation D, Dx, Dy without sign mistakes',
      'Step-by-step translation of speed-boat and age word problems into algebraic systems',
      'Topper step-marking presentation tips'
    ]
  },

  // ⏰ SCHEDULED TODAY (ARRANGED FOR TODAY)
  {
    id: 'sched-sci2-cell',
    subjectId: 'sci2',
    subjectTitle: 'Science & Technology 2',
    chapterTitle: 'Life Processes in Living Organisms Part 1',
    topicTitle: 'Cellular Respiration: Glycolysis, Krebs Cycle & ETC Simplified',
    educator: 'Dr. Sunita Patil',
    educatorRole: 'Biology Expert & Text Committee Advisor',
    status: 'scheduled_today',
    timeSlot: '11:00 AM – 12:15 PM',
    scheduledTime: 'Starts at 11:00 AM',
    dateString: 'Today',
    roomCode: 'SN-SCI2-RESP-301',
    keyHighlights: [
      'Visual flow-diagram drawing technique for Kreb\'s cycle',
      'Differentiating Aerobic vs Anaerobic ATP yield for Board 3 Marks',
      'Interactive quiz at the end of the lecture'
    ]
  },
  {
    id: 'sched-math2-pyth',
    subjectId: 'math2',
    subjectTitle: 'Mathematics Part 2',
    chapterTitle: 'Pythagoras Theorem',
    topicTitle: 'Geometric Mean Theorem Proof & Apollonius Theorem Applications',
    educator: 'Prof. Aniket Shinde',
    educatorRole: 'State Board Geometry Specialist',
    status: 'scheduled_today',
    timeSlot: '04:00 PM – 05:15 PM',
    scheduledTime: 'Starts at 04:00 PM',
    dateString: 'Today',
    roomCode: 'SN-MATH2-PYTH-402',
    keyHighlights: [
      'Formal proof presentation with "Given, To Prove, Construction, Proof"',
      'Applying Apollonius theorem in triangle median calculations',
      'Hot 4-mark non-textual geometry challenge problems'
    ]
  },
  {
    id: 'sched-hist-revol',
    subjectId: 'hist',
    subjectTitle: 'History and political Science',
    chapterTitle: 'Historiography — Development in the West',
    topicTitle: 'Western Thinkers Dialectics, Ranke & Marx Class Theory Analysis',
    educator: 'Mrs. Manjusha Gokhale',
    educatorRole: 'Social Science Master Trainer',
    status: 'scheduled_today',
    timeSlot: '06:00 PM – 07:00 PM',
    scheduledTime: 'Starts at 06:00 PM',
    dateString: 'Today',
    roomCode: 'SN-HIST-WEST-503',
    keyHighlights: [
      'Timeline creation techniques for Q.2 (B) concept charts',
      'Writing 2-mark Give Reasons with perfect causal statements',
      'Marx vs Ranke comparative answers'
    ]
  },

  // 📅 ARRANGED FOR THIS WEEK
  {
    id: 'upcom-eng-mind',
    subjectId: 'eng',
    subjectTitle: 'English',
    chapterTitle: 'Where the Mind is Without Fear',
    topicTitle: 'Poem Appreciation Mastery: Figures of Speech, Imagery & Board 5 Marks',
    educator: 'Mr. David Ferns',
    educatorRole: 'Senior English Master & Board Moderator',
    status: 'upcoming',
    timeSlot: '10:00 AM – 11:15 AM',
    scheduledTime: 'Tomorrow at 10:00 AM',
    dateString: 'Tomorrow',
    roomCode: 'SN-ENG-POEM-601',
    keyHighlights: [
      'Deconstructing Metaphor, Personification, and Synecdoche',
      'Perfect 5-mark appreciation writing template for SSC Board',
      'Tagore\'s spiritual and nationalistic vision'
    ]
  },
  {
    id: 'upcom-mar-santh',
    subjectId: 'mar',
    subjectTitle: 'Marathi',
    chapterTitle: 'संतवाणी (अ) अंकिला मी दास तुझा — संत नामदेव',
    topicTitle: 'काव्यसौंदर्य, रसग्रहण व दृष्टांत अलंकार सविस्तर विश्लेषण',
    educator: 'डॉ. आनंद जोशी',
    educatorRole: 'मराठी भाषातज्ज्ञ व मुख्य परीक्षक',
    status: 'upcoming',
    timeSlot: '03:30 PM – 04:45 PM',
    scheduledTime: 'Tomorrow at 03:30 PM',
    dateString: 'Tomorrow',
    roomCode: 'SN-MAR-POEM-702',
    keyHighlights: [
      'आई-बाळ, हरिणी-पाडस, पक्षीण-पिल्लू दृष्टांतांचे अर्थ सौंदर्य',
      'बोर्ड परीक्षेत पैकीच्या पैकी गुण मिळवण्याची रसग्रहण पद्धत',
      'शुद्धलेखन व भाषिक सौंदर्य मार्गदर्शन'
    ]
  },
  {
    id: 'upcom-geo-phys',
    subjectId: 'geo',
    subjectTitle: 'Geography',
    chapterTitle: 'Physiography and Drainage',
    topicTitle: 'India vs Brazil Mountain Ranges, River Basins & Map Marking',
    educator: 'Prof. Suresh Bapat',
    educatorRole: 'Geography Board Cartography Advisor',
    status: 'upcoming',
    timeSlot: '05:30 PM – 06:45 PM',
    scheduledTime: 'Friday at 05:30 PM',
    dateString: 'This Friday',
    roomCode: 'SN-GEO-DRAIN-805',
    keyHighlights: [
      'Comparative analysis: Western Ghats vs Serra do Mar / Escarpment',
      'Himalayan vs Peninsular vs Amazon drainage systems',
      'Live map plotting practice for Board 4 Marks map questions'
    ]
  }
];

export const RECORDED_CLASSES_BY_SUBJECT: Record<string, RecordedLectureItem[]> = {
  // =========================================================================
  // 🔬 SCIENCE & TECHNOLOGY PART 1
  // =========================================================================
  'sci1': [
    {
      id: 'rec-sci1-grav-1',
      subjectId: 'sci1',
      subjectTitle: 'Science and Technology Part 1',
      chapterTitle: 'Gravitation',
      lectureNumber: 1,
      lectureTitle: 'Kepler\'s Three Laws of Planetary Motion & Physical Significance',
      educator: 'Prof. Ramesh Kulkarni',
      duration: '48 mins',
      recordedDate: 'Recorded 3 days ago',
      viewsCount: 1840,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-blue-900 to-indigo-950',
      keyTakeaways: [
        'Law of Elliptical Orbits, Law of Areas (Areal Velocity is Constant)',
        'Harmonic Law: T² ∝ r³ and mathematical ratio verification',
        'Drawing the neat labeled planetary orbit diagram for Board 3 Marks'
      ],
      sampleVideoSummary: 'In this session, Prof. Kulkarni breaks down Johannes Kepler\'s three laws using interactive orbital animations and demonstrates how Newton derived the Inverse Square Law directly from Kepler\'s 3rd Law.'
    },
    {
      id: 'rec-sci1-grav-2',
      subjectId: 'sci1',
      subjectTitle: 'Science and Technology Part 1',
      chapterTitle: 'Gravitation',
      lectureNumber: 2,
      lectureTitle: "Universal Law of Gravitation, 'g' vs 'G' & Acceleration Due to Gravity",
      educator: 'Prof. Ramesh Kulkarni',
      duration: '52 mins',
      recordedDate: 'Recorded 5 days ago',
      viewsCount: 2120,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-blue-900 to-indigo-950',
      keyTakeaways: [
        'Complete derivation of g = GM/R² on Earth\'s surface',
        'Variation in g with Altitude, Depth, and Shape of Earth (Equator vs Poles)',
        'Mass vs Weight board difference table and SI units'
      ],
      sampleVideoSummary: 'Detailed derivation of the acceleration due to gravity formula and high-frequency numericals regarding what happens to weight inside a deep mine versus on Mt. Everest.'
    },
    {
      id: 'rec-sci1-grav-3',
      subjectId: 'sci1',
      subjectTitle: 'Science and Technology Part 1',
      chapterTitle: 'Gravitation',
      lectureNumber: 3,
      lectureTitle: 'Free Fall, Gravitational Potential Energy & Escape Velocity Derivations',
      educator: 'Prof. Ramesh Kulkarni',
      duration: '55 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 1690,
      difficulty: 'High-Scorer Advanced',
      thumbnailTheme: 'from-blue-900 to-indigo-950',
      keyTakeaways: [
        'Deriving v_esc = √(2GM/R) = √(2gR) = 11.2 km/s step-by-step',
        'Potential energy at infinite distance vs on surface (U = -GMm/R)',
        'Kinematic equations for upward throw and free fall'
      ],
      sampleVideoSummary: 'A crucial derivation lecture tackling the 5-mark board question on escape velocity from the Earth\'s surface with conservation of total mechanical energy.'
    },
    {
      id: 'rec-sci1-periodic-1',
      subjectId: 'sci1',
      subjectTitle: 'Science and Technology Part 1',
      chapterTitle: 'Periodic Classification of Elements',
      lectureNumber: 1,
      lectureTitle: 'Dobereiner\'s Triads, Newlands\' Octaves & Mendeleev\'s Periodic Table',
      educator: 'Mrs. Archana Ranade',
      duration: '46 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 1450,
      difficulty: 'Foundation',
      thumbnailTheme: 'from-cyan-900 to-blue-950',
      keyTakeaways: [
        'Merits and Demerits of Mendeleev\'s Periodic Law',
        'Prediction of Eka-Boron (Sc), Eka-Aluminium (Ga), and Eka-Silicon (Ge)',
        'Anomalies in atomic mass and isotopic placement'
      ],
      sampleVideoSummary: 'Explores early classification attempts and highlights the questions repeatedly asked in SSC Board exams concerning Mendeleev\'s structural achievements.'
    },
    {
      id: 'rec-sci1-periodic-2',
      subjectId: 'sci1',
      subjectTitle: 'Science and Technology Part 1',
      chapterTitle: 'Periodic Classification of Elements',
      lectureNumber: 2,
      lectureTitle: 'Modern Periodic Table: Electronic Configuration & Periodic Trends',
      educator: 'Mrs. Archana Ranade',
      duration: '54 mins',
      recordedDate: 'Recorded 8 days ago',
      viewsCount: 2310,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-cyan-900 to-blue-950',
      keyTakeaways: [
        'Trends across Periods & down Groups: Atomic Radius, Valency, Metallic & Non-metallic Character',
        'Effective nuclear charge screening effect explained visually',
        'Classification into s, p, d, and f blocks'
      ],
      sampleVideoSummary: 'Master the periodic trends! Learn why atomic size decreases across a period from left to right while increasing down any group.'
    },
    {
      id: 'rec-sci1-chem-1',
      subjectId: 'sci1',
      subjectTitle: 'Science and Technology Part 1',
      chapterTitle: 'Chemical Reactions and Equations',
      lectureNumber: 1,
      lectureTitle: 'Balancing Chemical Equations & Types of Chemical Reactions',
      educator: 'Prof. Milind Joshi',
      duration: '50 mins',
      recordedDate: 'Recorded 2 weeks ago',
      viewsCount: 1980,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-emerald-900 to-stone-900',
      keyTakeaways: [
        'Step-by-step balancing with atomic inventory tables',
        'Combination, Decomposition, Displacement & Double Displacement Reactions',
        'Endothermic vs Exothermic processes with practical test-tube examples'
      ],
      sampleVideoSummary: 'Never lose a single half-mark in chemical equation balancing! Learn the systematic stepwise trial-and-error method prescribed by the Maharashtra State Board.'
    },
    {
      id: 'rec-sci1-refr-1',
      subjectId: 'sci1',
      subjectTitle: 'Science and Technology Part 1',
      chapterTitle: 'Refraction of light',
      lectureNumber: 1,
      lectureTitle: 'Snell\'s Law, Absolute Refractive Index & Twinkling of Stars',
      educator: 'Prof. Ramesh Kulkarni',
      duration: '58 mins',
      recordedDate: 'Recorded 2 weeks ago',
      viewsCount: 2540,
      difficulty: 'High-Scorer Advanced',
      thumbnailTheme: 'from-indigo-900 to-purple-950',
      keyTakeaways: [
        'Snell\'s Law (sin i / sin r = constant) & refractive indices n₂₁ = v₁/v₂',
        'Apparent depth and lateral shift through a rectangular glass slab',
        'Atmospheric refraction: Why stars twinkle while planets do not, Advanced sunrise & delayed sunset'
      ],
      sampleVideoSummary: 'A foundational optics masterclass walking through ray diagram drawings on optical density, refractive index ratios, and atmospheric refraction phenomena.'
    },
    {
      id: 'rec-sci1-lenses-1',
      subjectId: 'sci1',
      subjectTitle: 'Science and Technology Part 1',
      chapterTitle: 'Lenses',
      lectureNumber: 1,
      lectureTitle: 'Convex & Concave Lens Ray Diagrams, Lens Formula & Human Eye Defects',
      educator: 'Prof. Ramesh Kulkarni',
      duration: '62 mins',
      recordedDate: 'Recorded 3 weeks ago',
      viewsCount: 3100,
      difficulty: 'High-Scorer Advanced',
      thumbnailTheme: 'from-indigo-900 to-purple-950',
      keyTakeaways: [
        'Cartesian sign conventions for 1/f = 1/v - 1/u',
        'Magnification m = v/u = h₂/h₁ and Power of Lens P = 1/f(in meters) Dioptres',
        'Ray diagrams for Myopia (Nearsightedness) and Hypermetropia (Farsightedness) corrections'
      ],
      sampleVideoSummary: 'Everything you need to score full marks in Question 3 and 4 lens numericals, sign conventions, and corrective spectacle lens power calculations.'
    }
  ],

  // =========================================================================
  // 🔬 SCIENCE & TECHNOLOGY PART 2
  // =========================================================================
  'sci2': [
    {
      id: 'rec-sci2-heredity-1',
      subjectId: 'sci2',
      subjectTitle: 'Science and Technology Part 2',
      chapterTitle: 'Heredity and Evolution',
      lectureNumber: 1,
      lectureTitle: 'Transcription, Translation, Translocation & Protein Synthesis',
      educator: 'Dr. Sunita Patil',
      duration: '51 mins',
      recordedDate: 'Recorded 4 days ago',
      viewsCount: 2200,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-emerald-950 to-teal-950',
      keyTakeaways: [
        'Central Dogma of Molecular Biology: DNA ➔ mRNA ➔ Protein',
        'Role of Triplet Codons and tRNA anticodons in translation',
        'Mutation and genetic variation mechanisms'
      ],
      sampleVideoSummary: 'A visual exploration of the ribosome assembly line, explaining how the 64 triplet codons code for amino acids and how ribosomes shift by one codon during translocation.'
    },
    {
      id: 'rec-sci2-heredity-2',
      subjectId: 'sci2',
      subjectTitle: 'Science and Technology Part 2',
      chapterTitle: 'Heredity and Evolution',
      lectureNumber: 2,
      lectureTitle: 'Evidences of Evolution: Morphological, Anatomical, Vestigial & Embryological',
      educator: 'Dr. Sunita Patil',
      duration: '47 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 1850,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-emerald-950 to-teal-950',
      keyTakeaways: [
        'Homologous vs Analogous organs comparison table',
        'Vestigial organs in human body (Appendix, Wisdom tooth, Coccyx, Ear pinna muscles)',
        'Carbon Dating method (C-14 half life) & Connecting Links (Duck-billed Platypus, Peripatus)'
      ],
      sampleVideoSummary: 'Dr. Patil reviews the six classical proofs of organic evolution with specimen diagrams that board evaluators inspect for full 3-mark questions.'
    },
    {
      id: 'rec-sci2-cell-1',
      subjectId: 'sci2',
      subjectTitle: 'Science and Technology Part 2',
      chapterTitle: 'Life Processes in Living Organisms Part 1',
      lectureNumber: 1,
      lectureTitle: 'Mitosis vs Meiosis: Cell Division Stages & Chromosome Behavior',
      educator: 'Dr. Sunita Patil',
      duration: '56 mins',
      recordedDate: 'Recorded 10 days ago',
      viewsCount: 2670,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-teal-900 to-green-950',
      keyTakeaways: [
        'Karyokinesis stages: Prophase, Metaphase, Anaphase, Telophase',
        'Equatorial alignment in Metaphase vs Chromatid separation in Anaphase',
        'Significance of Crossing Over in Prophase I of Meiosis for genetic variation'
      ],
      sampleVideoSummary: 'Complete chalkboard diagram breakdown of somatic mitosis vs germ cell meiosis, with clear mnemonics for memorizing chromosome movements.'
    },
    {
      id: 'rec-sci2-repro-1',
      subjectId: 'sci2',
      subjectTitle: 'Science and Technology Part 2',
      chapterTitle: 'Life Processes in Living Organisms Part 2',
      lectureNumber: 1,
      lectureTitle: 'Human Reproduction: Male & Female Reproductive System Diagrams',
      educator: 'Dr. Sunita Patil',
      duration: '60 mins',
      recordedDate: 'Recorded 2 weeks ago',
      viewsCount: 3420,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-rose-950 to-stone-900',
      keyTakeaways: [
        'Step-by-step drawing of Male Reproductive System (Testes, Vas deferens, Prostate, Urethra)',
        'Female Reproductive System (Ovaries, Oviduct/Fallopian tube, Uterus)',
        'Menstrual Cycle hormonal regulation (FSH, Estrogen, LH, Progesterone)'
      ],
      sampleVideoSummary: 'One of the highest-weightage topics in Science 2! Learn exactly how to draw the organ diagrams with clean, proportional lines and correct anatomical labels.'
    },
    {
      id: 'rec-sci2-green-1',
      subjectId: 'sci2',
      subjectTitle: 'Science and Technology Part 2',
      chapterTitle: 'Towards Green Energy',
      lectureNumber: 1,
      lectureTitle: 'Thermal, Nuclear & Hydroelectric Power Plants: Energy Transformation Flowcharts',
      educator: 'Prof. Milind Joshi',
      duration: '45 mins',
      recordedDate: 'Recorded 2 weeks ago',
      viewsCount: 1780,
      difficulty: 'Foundation',
      thumbnailTheme: 'from-amber-950 to-stone-900',
      keyTakeaways: [
        'Flow of Energy transformation in Thermal vs Nuclear vs Hydroelectric stations',
        'Environmental problems of coal burning and nuclear radioactive waste',
        'Working schematic diagrams of turbines and generators'
      ],
      sampleVideoSummary: 'Flowchart mastery for Board Question 2 & 3. Understand energy conversion stages: Potential Energy ➔ Kinetic Energy ➔ Electrical Energy in dams and turbines.'
    }
  ],

  // =========================================================================
  // 🧮 MATHEMATICS PART 1 (ALGEBRA)
  // =========================================================================
  'math1': [
    {
      id: 'rec-math1-linear-1',
      subjectId: 'math1',
      subjectTitle: 'Mathematics Part 1',
      chapterTitle: 'Linear Equations in Two Variables',
      lectureNumber: 1,
      lectureTitle: 'Simultaneous Equations Elimination Method & Graphical Representation',
      educator: 'Mrs. Vandana Deshmukh',
      duration: '50 mins',
      recordedDate: 'Recorded 3 days ago',
      viewsCount: 2890,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-stone-900 to-amber-950',
      keyTakeaways: [
        'Equating coefficients method with sign inversions',
        'Plotting table of coordinates (x, y) for line drawing',
        'Condition for intersecting, parallel and coincident lines'
      ],
      sampleVideoSummary: 'Mrs. Deshmukh solves textbook Practice Set 1.1 and 1.2 step-by-step, highlighting where students usually lose marks when drawing graphs on grid paper.'
    },
    {
      id: 'rec-math1-quad-1',
      subjectId: 'math1',
      subjectTitle: 'Mathematics Part 1',
      chapterTitle: 'Quadratic Equations',
      lectureNumber: 1,
      lectureTitle: 'Factorization, Completing the Square & Quadratic Formula Methods',
      educator: 'Mrs. Vandana Deshmukh',
      duration: '55 mins',
      recordedDate: 'Recorded 6 days ago',
      viewsCount: 3150,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-stone-900 to-amber-950',
      keyTakeaways: [
        'Finding roots using x = [-b ± √(b² - 4ac)] / (2a)',
        'Discriminant Δ = b² - 4ac: Real & equal, Real & unequal, or Not Real',
        'Relation between roots and coefficients: α + β = -b/a and α·β = c/a'
      ],
      sampleVideoSummary: 'Master all three methods to find the roots of any quadratic equation, with comprehensive coverage of discriminant nature of roots questions.'
    },
    {
      id: 'rec-math1-ap-1',
      subjectId: 'math1',
      subjectTitle: 'Mathematics Part 1',
      chapterTitle: 'Arithmetic Progression',
      lectureNumber: 1,
      lectureTitle: 'nth Term of an AP & Sum of First n Terms (Sₙ) Formula Applications',
      educator: 'Mrs. Vandana Deshmukh',
      duration: '52 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 2420,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-stone-900 to-amber-950',
      keyTakeaways: [
        'Derivation and application of tₙ = a + (n - 1)·d',
        'Application of Sₙ = n/2 · [2a + (n - 1)·d] = n/2 · [t₁ + tₙ]',
        'Three consecutive terms in AP: (a - d), a, (a + d) word problem technique'
      ],
      sampleVideoSummary: 'Step-by-step solutions to challenging word problems involving monthly savings, amphitheater seats, and loan installments using AP formulas.'
    },
    {
      id: 'rec-math1-prob-1',
      subjectId: 'math1',
      subjectTitle: 'Mathematics Part 1',
      chapterTitle: 'Probability',
      lectureNumber: 1,
      lectureTitle: 'Random Experiments, Sample Space (S), Events & P(A) Calculation',
      educator: 'Mrs. Vandana Deshmukh',
      duration: '44 mins',
      recordedDate: 'Recorded 2 weeks ago',
      viewsCount: 1950,
      difficulty: 'Foundation',
      thumbnailTheme: 'from-stone-900 to-amber-950',
      keyTakeaways: [
        'Writing Sample Space S and n(S) for tossing 1, 2, 3 coins',
        'Sample Space for rolling 1 and 2 dice (n(S) = 36)',
        'Deck of 52 playing cards breakdown: Suits, Face cards, Aces'
      ],
      sampleVideoSummary: 'A fast-paced, high-confidence probability lecture covering textbook and question bank problems on cards, colored marbles, and two-digit numbers.'
    }
  ],

  // =========================================================================
  // 📐 MATHEMATICS PART 2 (GEOMETRY)
  // =========================================================================
  'math2': [
    {
      id: 'rec-math2-simil-1',
      subjectId: 'math2',
      subjectTitle: 'Mathematics Part 2',
      chapterTitle: 'Similarity',
      lectureNumber: 1,
      lectureTitle: 'Basic Proportionality Theorem (BPT) & Angle Bisector Theorem Proofs',
      educator: 'Prof. Aniket Shinde',
      duration: '58 mins',
      recordedDate: 'Recorded 4 days ago',
      viewsCount: 3200,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-slate-900 to-stone-950',
      keyTakeaways: [
        'Rigorous proof of Basic Proportionality Theorem (Thales Theorem)',
        'Converse of BPT & Property of Three Parallel Lines and Transversals',
        'Ratio of areas of two similar triangles theorem: A₁/A₂ = (s₁/s₂)²'
      ],
      sampleVideoSummary: 'Prof. Shinde teaches the exact answer-sheet presentation for the 3-mark BPT proof that board moderators look for, with construction and area ratio logic.'
    },
    {
      id: 'rec-math2-circle-1',
      subjectId: 'math2',
      subjectTitle: 'Mathematics Part 2',
      chapterTitle: 'Circle',
      lectureNumber: 1,
      lectureTitle: 'Tangent Theorem, Inscribed Angle Theorem & Cyclic Quadrilaterals',
      educator: 'Prof. Aniket Shinde',
      duration: '64 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 3680,
      difficulty: 'High-Scorer Advanced',
      thumbnailTheme: 'from-slate-900 to-stone-950',
      keyTakeaways: [
        'Tangent Segments drawn from an external point to a circle are congruent',
        'Inscribed Angle Theorem: m∠BAC = 1/2 · m(arc BDC)',
        'Theorem of Opposite Angles of a Cyclic Quadrilateral are supplementary (180°)'
      ],
      sampleVideoSummary: 'Master the weightiest chapter in Geometry! Solve HOTS (Higher Order Thinking Skills) circle problems involving intersecting chords and tangent-secant segments.'
    },
    {
      id: 'rec-math2-trig-1',
      subjectId: 'math2',
      subjectTitle: 'Mathematics Part 2',
      chapterTitle: 'Trigonometry',
      lectureNumber: 1,
      lectureTitle: 'Trigonometric Identities Proofs & Heights and Distances Word Problems',
      educator: 'Prof. Aniket Shinde',
      duration: '54 mins',
      recordedDate: 'Recorded 2 weeks ago',
      viewsCount: 2840,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-slate-900 to-stone-950',
      keyTakeaways: [
        'Fundamental identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ',
        'Proving complex trigonometric algebraic identities LHS = RHS',
        'Angle of Elevation & Angle of Depression word problems with right-angled triangle sketches'
      ],
      sampleVideoSummary: 'Clear mental model for trigonometric identities and real-life problems calculating lighthouse heights, tower distances, and storm-broken tree tops.'
    }
  ],

  // =========================================================================
  // 📖 ENGLISH (KUMARBHARATI)
  // =========================================================================
  'eng': [
    {
      id: 'rec-eng-mind-1',
      subjectId: 'eng',
      subjectTitle: 'English',
      chapterTitle: 'Where the Mind is Without Fear',
      lectureNumber: 1,
      lectureTitle: 'Stanza Analysis, Metaphors & Complete 5-Mark Poem Appreciation',
      educator: 'Mr. David Ferns',
      duration: '42 mins',
      recordedDate: 'Recorded 5 days ago',
      viewsCount: 1650,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-amber-950 to-stone-900',
      keyTakeaways: [
        'Rabindranath Tagore\'s patriotic prayer for a fearless, truthful, rational nation',
        'Clear stream of reason vs Dreary desert sand of dead habit (Metaphors explained)',
        'Full SSC Board marks appreciation: Title, Poet, Rhyme Scheme, Figures of Speech, Central Theme'
      ],
      sampleVideoSummary: 'Line-by-line reading of Tagore\'s immortal prayer, highlighting figures of speech and providing a model appreciation text scored 5/5 by board evaluators.'
    },
    {
      id: 'rec-eng-thief-1',
      subjectId: 'eng',
      subjectTitle: 'English',
      chapterTitle: 'The Thief\'s Story',
      lectureNumber: 1,
      lectureTitle: 'Character Sketch of Hari Singh & Anil, Theme of Transformation & Trust',
      educator: 'Mr. David Ferns',
      duration: '45 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 1890,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-amber-950 to-stone-900',
      keyTakeaways: [
        'Ruskin Bond\'s depiction of empathy reforming a petty thief',
        'Why Hari Singh returned the wet money to Anil\'s mattress',
        'Personal Response & Vocabulary question strategies'
      ],
      sampleVideoSummary: 'Deep literary analysis of Ruskin Bond\'s poignant story, exploring how kindness and education proved stronger than lock and key.'
    }
  ],

  // =========================================================================
  // 📚 MARATHI (अक्षरभारती / कुमारभारती)
  // =========================================================================
  'mar': [
    {
      id: 'rec-mar-ankila-1',
      subjectId: 'mar',
      subjectTitle: 'Marathi',
      chapterTitle: 'संतवाणी (अ) अंकिला मी दास तुझा — संत नामदेव',
      lectureNumber: 1,
      lectureTitle: 'अभंग अर्थ, दृष्टांत अलंकार व संपूर्ण रसग्रहण (मराठीत)',
      educator: 'डॉ. आनंद जोशी',
      duration: '44 mins',
      recordedDate: 'Recorded 4 days ago',
      viewsCount: 2410,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-amber-900 to-stone-900',
      keyTakeaways: [
        'अग्निमाजि पडे बाळू, धावे माता कनवाळू — मातृप्रेमाचे वात्सल्याचे रूपक',
        'काव्यसौंदर्य, विचारसौंदर्य व भाषिक वैशिष्ट्ये ५ गुणांसाठी',
        'संत नामदेवांची भक्ती व विठ्ठलचरणी संपूर्ण शरणागती'
      ],
      sampleVideoSummary: 'संत नामदेवांच्या अभंगाचे शुद्ध मराठीत शब्दशः व भावार्थ विश्लेषण, बोर्ड परीक्षेत रसग्रहण लिहिण्याची सुलभ व प्रभावी मांडणी.'
    },
    {
      id: 'rec-mar-don-divas-1',
      subjectId: 'mar',
      subjectTitle: 'Marathi',
      chapterTitle: 'दोन दिवस — नारायण सुर्वे',
      lectureNumber: 1,
      lectureTitle: 'कामगार जीवन, भाकरीचा चंद्र व नारायण सुर्वे यांचे काव्यसौंदर्य',
      educator: 'डॉ. आनंद जोशी',
      duration: '48 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 2750,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-amber-900 to-stone-900',
      keyTakeaways: [
        'दोन दिवस वाट पाहण्यात गेले; दोन दुःखात गेले — मानवी वेदनेचे वास्तव',
        'भाकरीचा चंद्र शोधण्यातच जिंदगी बर्बाद झाली — प्रतीकात्मकता व दाहकता',
        'कामगारांचे वास्तव आणि कष्टकऱ्यांची जिद्द यांचे प्रभावी रसग्रहण'
      ],
      sampleVideoSummary: 'कवी नारायण सुर्वे यांच्या \'दोन दिवस\' या क्रांतीदर्शी कवितेचे सामाजिक व भावनिक पैलू उलगडून दाखवणारे सखोल व्याख्यान.'
    }
  ],

  // =========================================================================
  // 🏛️ HISTORY & POLITICAL SCIENCE
  // =========================================================================
  'hist': [
    {
      id: 'rec-hist-west-1',
      subjectId: 'hist',
      subjectTitle: 'History and political Science',
      chapterTitle: 'Historiography — Development in the West',
      lectureNumber: 1,
      lectureTitle: 'Descartes, Voltaire, Hegel, Ranke & Karl Marx Class Theory',
      educator: 'Mrs. Manjusha Gokhale',
      duration: '49 mins',
      recordedDate: 'Recorded 5 days ago',
      viewsCount: 1540,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-amber-950 to-stone-900',
      keyTakeaways: [
        'René Descartes: Discourse on the Method & critical evaluation of historical sources',
        'Voltaire as Father of Modern Historiography',
        'Hegel\'s Dialectics (Thesis, Antithesis, Synthesis) & Karl Marx\'s Das Kapital'
      ],
      sampleVideoSummary: 'Clear conceptual roadmap covering how historiography evolved from romanticized tales into rigorous scientific enquiry in 18th and 19th century Europe.'
    },
    {
      id: 'rec-hist-mass-1',
      subjectId: 'hist',
      subjectTitle: 'History and political Science',
      chapterTitle: 'Mass Media and History',
      lectureNumber: 1,
      lectureTitle: 'Indian Journalism Milestones: Darpan, Kesari & Akashvani to Doordarshan',
      educator: 'Mrs. Manjusha Gokhale',
      duration: '46 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 1720,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-amber-950 to-stone-900',
      keyTakeaways: [
        'Balshastri Jambhekar & Darpan (6th January 1832 — Patrakar Din)',
        'Lokmanya Tilak & Gopal Ganesh Agarkar: Kesari & Mahratta newspapers',
        'Role of television and Doordarshan as audio-visual mass medium'
      ],
      sampleVideoSummary: 'Chronological timeline of Indian mass media from 1780 Bengal Gazette to modern satellite broadcasting, with tips for 2-mark Give Reasons questions.'
    },
    {
      id: 'rec-pol-const-1',
      subjectId: 'hist',
      subjectTitle: 'History and political Science',
      chapterTitle: 'Working of the Constitution',
      lectureNumber: 1,
      lectureTitle: 'Right to Information (RTI 2005), 73rd/74th Amendments & Women\'s Representation',
      educator: 'Mrs. Manjusha Gokhale',
      duration: '43 mins',
      recordedDate: 'Recorded 2 weeks ago',
      viewsCount: 1390,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-indigo-950 to-stone-900',
      keyTakeaways: [
        'Shift from beneficiary governance to Rights-Based Approach',
        'Decentralization of power via 73rd and 74th Constitutional Amendments',
        '50% reservation for women in local self-government institutions in Maharashtra'
      ],
      sampleVideoSummary: 'Essential civics lecture outlining the three fundamental pillars of the Indian Constitution: Democracy, Social Justice, and Judicial System.'
    }
  ],

  // =========================================================================
  // 🌍 GEOGRAPHY
  // =========================================================================
  'geo': [
    {
      id: 'rec-geo-phys-1',
      subjectId: 'geo',
      subjectTitle: 'Geography',
      chapterTitle: 'Physiography and Drainage',
      lectureNumber: 1,
      lectureTitle: 'India & Brazil Comparative Relief: Himalayas, Highlands & Coastal Plains',
      educator: 'Prof. Suresh Bapat',
      duration: '52 mins',
      recordedDate: 'Recorded 3 days ago',
      viewsCount: 2340,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-emerald-950 to-stone-900',
      keyTakeaways: [
        'Five physiographic divisions of India vs Five divisions of Brazil',
        'Great Escarpment (Serra do Mar) as an orographic rain barrier creating Drought Quadrilateral',
        'Amazon River Basin (discharge of 200,000 m³/s) vs Ganga and Brahmaputra deltas'
      ],
      sampleVideoSummary: 'A visual cartographic study contrasting India\'s peninsular landforms with Brazil\'s ancient highlands and the Guiana shield.'
    },
    {
      id: 'rec-geo-pop-1',
      subjectId: 'geo',
      subjectTitle: 'Geography',
      chapterTitle: 'Population',
      lectureNumber: 1,
      lectureTitle: 'Population Pyramids, Sex Ratio, Life Expectancy & Spatial Density Maps',
      educator: 'Prof. Suresh Bapat',
      duration: '47 mins',
      recordedDate: 'Recorded 1 week ago',
      viewsCount: 1910,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-emerald-950 to-stone-900',
      keyTakeaways: [
        'India\'s high density (382 persons/km²) vs Brazil\'s sparse density (23 persons/km²)',
        'Sex Ratio trends: Females outnumbering males in Brazil, male skew in India',
        'Why the Amazon basin has sparse population while the North Indian Plain is densely populated'
      ],
      sampleVideoSummary: 'Prof. Bapat breaks down the demographic data graphs and explains how to read and interpret population pyramids for Board 4-mark data questions.'
    }
  ],

  // =========================================================================
  // 📝 HINDI (लोकभारती)
  // =========================================================================
  'hin': [
    {
      id: 'rec-hin-bharat-1',
      subjectId: 'hin',
      subjectTitle: 'Hindi',
      chapterTitle: 'भारत महिमा — कविता',
      lectureNumber: 1,
      lectureTitle: 'जयशंकर प्रसाद जी की भारत महिमा: पद्य विश्लेषण एवं केंद्रीय भाव',
      educator: 'आचार्य राजेश शर्मा',
      duration: '43 mins',
      recordedDate: 'Recorded 5 days ago',
      viewsCount: 1680,
      difficulty: 'Core Board Exam',
      thumbnailTheme: 'from-amber-950 to-stone-900',
      keyTakeaways: [
        'हिमालय के आंगन में उसे प्रथम किरणों का उपहार — भावार्थ',
        'भारत की प्राचीन गौरवशाली संस्कृति, दान, त्याग और सत्यनिष्ठा का निरूपण',
        'पद्य प्राथमिक परिचय, अनुप्रास व उपमा अलंकार, ५ अंक बोर्ड पद्य विश्लेषण'
      ],
      sampleVideoSummary: 'छायावादी कवि जयशंकर प्रसाद जी की अमर कृति भारत महिमा का पंक्ति-दर-पंक्ति विशुद्ध हिंदी में काव्यात्मक एवं वैचारिक विश्लेषण।'
    }
  ]
};
