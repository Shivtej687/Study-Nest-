import { SubjectCatalogItem, ALL_SUBJECTS_CATALOG } from './syllabusCatalog';
import { LiveClassItem, RecordedLectureItem } from './classesData';
import { NotePdfResource, SubjectBundlePdf } from './studyLibraryData';
import { 
  ChapterMockPaper20M,
  VivaQuestionItem, 
  BoardQuestionPaperItem, 
  MockTestItem, 
  TeacherAnswerSubmission 
} from './vivaAndTestSessionsData';

// Standard normalizer helper
export interface ParsedGradeInfo {
  stdNumber: number; // 5, 6, 7, 8, 9, 10, 11, 12
  stdLabel: string; // e.g. "Standard 10", "Grade 8", "Standard 12 (HSC)"
  board: string; // "Maharashtra State Board", "CBSE", "ICSE", etc.
  stream?: 'science' | 'commerce' | 'arts' | 'general';
  isSecondary: boolean;
  isHigherSecondary: boolean;
  isMiddleSchool: boolean;
}

export function parseStudentGrade(stdInput?: string, boardInput?: string, studyingInput?: string): ParsedGradeInfo {
  const stdStr = (stdInput || '10').toLowerCase().trim();
  const boardStr = (boardInput || 'State Board').trim();
  const studyStr = (studyingInput || '').toLowerCase().trim();

  let stdNumber = 10;
  let stream: 'science' | 'commerce' | 'arts' | 'general' = 'general';

  // Detect grade number
  if (stdStr.includes('5') || stdStr.includes('fifth')) stdNumber = 5;
  else if (stdStr.includes('6') || stdStr.includes('sixth')) stdNumber = 6;
  else if (stdStr.includes('7') || stdStr.includes('seventh')) stdNumber = 7;
  else if (stdStr.includes('8') || stdStr.includes('eighth')) stdNumber = 8;
  else if (stdStr.includes('9') || stdStr.includes('ninth')) stdNumber = 9;
  else if (stdStr.includes('11') || stdStr.includes('eleventh') || stdStr.includes('fyjc')) stdNumber = 11;
  else if (stdStr.includes('12') || stdStr.includes('twelfth') || stdStr.includes('syjc') || stdStr.includes('hsc')) stdNumber = 12;
  else if (stdStr.includes('10') || stdStr.includes('tenth') || stdStr.includes('ssc')) stdNumber = 10;
  else {
    const matched = stdStr.match(/\d+/);
    if (matched) {
      const parsed = parseInt(matched[0], 10);
      if (parsed >= 5 && parsed <= 12) stdNumber = parsed;
    }
  }

  // Detect stream for 11th / 12th
  if (stdNumber === 11 || stdNumber === 12) {
    if (stdStr.includes('comm') || studyStr.includes('comm') || studyStr.includes('account') || studyStr.includes('bk')) {
      stream = 'commerce';
    } else if (stdStr.includes('art') || studyStr.includes('art') || studyStr.includes('humanities') || studyStr.includes('history') || studyStr.includes('psychology')) {
      stream = 'arts';
    } else {
      stream = 'science'; // Default for 11th & 12th
    }
  }

  // Normalize Board string
  let normalizedBoard = 'Maharashtra State Board';
  const bLower = boardStr.toLowerCase();
  if (bLower.includes('cbse') || bLower.includes('ncert')) {
    normalizedBoard = 'CBSE (NCERT)';
  } else if (bLower.includes('icse') || bLower.includes('isc') || bLower.includes('cisce')) {
    normalizedBoard = stdNumber >= 11 ? 'ISC (Council)' : 'ICSE (Council)';
  } else if (bLower.includes('ib') || bLower.includes('baccalaureate')) {
    normalizedBoard = 'IB International';
  } else if (bLower.includes('cambridge') || bLower.includes('gcse') || bLower.includes('igcse')) {
    normalizedBoard = 'Cambridge (IGCSE)';
  } else {
    normalizedBoard = stdNumber >= 11 ? 'Maharashtra State Board (HSC)' : 'Maharashtra State Board (SSC)';
  }

  let stdLabel = `Standard ${stdNumber}`;
  if (stdNumber === 10) stdLabel = `Standard 10 (SSC / 10th Board)`;
  else if (stdNumber === 11) stdLabel = `Standard 11 (${stream.charAt(0).toUpperCase() + stream.slice(1)})`;
  else if (stdNumber === 12) stdLabel = `Standard 12 (HSC / 12th ${stream.charAt(0).toUpperCase() + stream.slice(1)})`;
  else if (stdNumber <= 8) stdLabel = `Class ${stdNumber} (Middle School)`;
  else if (stdNumber === 9) stdLabel = `Standard 9 (Foundation High School)`;

  return {
    stdNumber,
    stdLabel,
    board: normalizedBoard,
    stream,
    isMiddleSchool: stdNumber <= 8,
    isSecondary: stdNumber === 9 || stdNumber === 10,
    isHigherSecondary: stdNumber >= 11
  };
}

// Multi-Grade Full Subject Catalogs
export const GRADE_5_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'g5_math',
    title: 'Mathematics',
    subtitle: 'Primary Mathematics & Arithmetic',
    subject: 'Mathematics',
    categoryTag: 'Arithmetic & Geometry',
    boardInfo: 'Class 5',
    sections: [
      {
        title: 'Number Sense & Calculations',
        chapters: [
          'Roman Numerals & Number Work',
          'Addition and Subtraction (Large Numbers)',
          'Multiplication and Division Word Problems',
          'Fractions & Equivalent Fractions',
          'Angles and Geometrical Shapes',
          'Decimals and Measurement (Length, Mass, Capacity)',
          'Perimeter and Area of Shapes',
          'Patterns, Symmetry and Pictographs'
        ]
      }
    ]
  },
  {
    id: 'g5_evs1',
    title: 'Environmental Studies 1',
    subtitle: 'General Science & Life Around Us',
    subject: 'Science & Environment',
    categoryTag: 'EVS Part 1',
    boardInfo: 'Class 5',
    sections: [
      {
        title: 'Nature, Plants & Body',
        chapters: [
          'Our Earth and Our Solar System',
          'Motions of the Earth & Living World',
          'Water for Every Household & Water Pollution',
          'Food for All & Methods of Preserving Food',
          'The Environment and Us',
          'Infectious Diseases and How to Prevent Them'
        ]
      }
    ]
  },
  {
    id: 'g5_evs2',
    title: 'Environmental Studies 2',
    subtitle: 'History of Humans & Shivaji Maharaj',
    subject: 'Social Studies',
    categoryTag: 'History & Civics',
    boardInfo: 'Class 5',
    sections: [
      {
        title: 'Evolution of Mankind & Chhatrapati Shivaji',
        chapters: [
          'What is History? & Concept of Time',
          'Evolution of Animals and Humans',
          'From Stone Age to Settlement',
          'Maharashtra Before Shivaji Maharaj',
          'Shivaji’s Childhood & Swarajya Pledge',
          'Fort Conquests and Fort Architecture'
        ]
      }
    ]
  },
  {
    id: 'g5_eng',
    title: 'English Balbharati',
    subtitle: 'English Language & Reading Skills',
    subject: 'Language',
    categoryTag: 'Balbharati',
    boardInfo: 'Class 5',
    sections: [
      {
        title: 'Stories & Grammar',
        chapters: [
          'What a Bird Thought (Poem)',
          'Daydreams & The Golden Touch',
          'True Friends & The Fox and The Grapes',
          'Tenses, Nouns, Pronouns & Adjectives',
          'Paragraph and Friendly Letter Writing'
        ]
      }
    ]
  },
  {
    id: 'g5_mar',
    title: 'Marathi Sugambharti',
    subtitle: 'मराठी सुलभभारती',
    subject: 'Language',
    categoryTag: 'सुलभभारती',
    boardInfo: 'Class 5',
    sections: [
      {
        title: 'पाठ व कविता',
        chapters: [
          'भारतमाता (गीत)',
          'हत्तीचे चातुर्य (चित्रकथा)',
          'खेळातून शिकूया',
          'माझी शाळा व मित्र',
          'नाम, सर्वनाम व सोपे व्याकरण'
        ]
      }
    ]
  }
];

export const GRADE_6_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'g6_math',
    title: 'Mathematics',
    subtitle: 'Standard 6 Mathematics',
    subject: 'Mathematics',
    categoryTag: 'Algebra & Shapes',
    boardInfo: 'Class 6',
    sections: [
      {
        title: 'Concepts & Operations',
        chapters: [
          'Basic Concepts in Geometry',
          'Angles and Angle Bisector Constructions',
          'Integers and Number Line',
          'Operations on Fractions',
          'Decimal Fractions & Percentage',
          'Financial Arithmetic: Ratio and Proportion',
          'Equations in One Variable (Introduction)',
          'Triangle, Quadrilateral & Circle Properties',
          'Three Dimensional Shapes & Symmetry'
        ]
      }
    ]
  },
  {
    id: 'g6_sci',
    title: 'General Science',
    subtitle: 'General Science & Experimentation',
    subject: 'Science',
    categoryTag: 'Living World & Matter',
    boardInfo: 'Class 6',
    sections: [
      {
        title: 'Scientific Phenomena',
        chapters: [
          'Natural Resources — Air, Water and Land',
          'The Living World & Diversity in Living Things',
          'Substances in the Surroundings (Solid, Liquid, Gas)',
          'Motion and Types of Motion',
          'Force and Types of Force',
          'Work and Energy',
          'Light and the Formation of Shadows',
          'Sound and Reflection',
          'Magnets and Their Properties'
        ]
      }
    ]
  },
  {
    id: 'g6_hist',
    title: 'History & Civics',
    subtitle: 'Ancient India & Local Self Government',
    subject: 'Social Science',
    categoryTag: 'Ancient Civilization',
    boardInfo: 'Class 6',
    sections: [
      {
        title: 'Ancient Heritage',
        chapters: [
          'The Indian Subcontinent and History',
          'Sources of History & Harappan Civilization',
          'The Vedic Civilization & Religious Trends',
          'Janapadas and Mahajanapadas',
          'The Mauryan Empire and Emperor Ashoka',
          'Our Local Government Bodies (Gram Panchayat & Nagar Parishad)'
        ]
      }
    ]
  },
  {
    id: 'g6_geo',
    title: 'Geography',
    subtitle: 'The Earth, Latitudes and Continents',
    subject: 'Social Science',
    categoryTag: 'Earth & Maps',
    boardInfo: 'Class 6',
    sections: [
      {
        title: 'Geographical Systems',
        chapters: [
          'The Earth and the Graticule',
          'Let us Use the Graticule & Temperature Zones',
          'Comparing a Globe and a Map',
          'Weather and Climate',
          'Importance of Oceans',
          'Natural Resources and Energy Resources'
        ]
      }
    ]
  },
  {
    id: 'g6_eng',
    title: 'English Kumarbharati',
    subtitle: 'English Reader & Syntax',
    subject: 'Language',
    categoryTag: 'Language Arts',
    boardInfo: 'Class 6',
    sections: [
      {
        title: 'Literature & Writing',
        chapters: [
          'Don’t Give Up! (Poem)',
          'Who’s the Greatest? (Birbal Stories)',
          'Autobiography of a Great Indian Bustard',
          'Children of the Forest',
          'Grammar: Parts of Speech, Conjunctions & Modals',
          'Notice Writing and Dialogue Writing'
        ]
      }
    ]
  },
  {
    id: 'g6_mar',
    title: 'Marathi',
    subtitle: 'मराठी बालभारती / सुलभभारती',
    subject: 'Language',
    categoryTag: 'मातृभाषा',
    boardInfo: 'Class 6',
    sections: [
      {
        title: 'साहित्य व व्याकरण',
        chapters: [
          'बलसागर भारत होवो (गीत)',
          'सायकल म्हणते, मी आहे ना!',
          'डॉ. कलाम यांचे बालपण',
          'पावसाळा आला (कविता)',
          'व्याकरण: लिंग, वचन, विभक्ती व वाक्प्रचार'
        ]
      }
    ]
  }
];

export const GRADE_7_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'g7_math',
    title: 'Mathematics',
    subtitle: 'Standard 7 Mathematics',
    subject: 'Mathematics',
    categoryTag: 'Pre-Algebra & Geometry',
    boardInfo: 'Class 7',
    sections: [
      {
        title: 'Advanced Numbers & Geometry',
        chapters: [
          'Geometrical Constructions (Perpendicular, Incircle)',
          'Multiplication and Division of Integers',
          'HCF and LCM Calculation Methods',
          'Angles and Pairs of Angles',
          'Operations on Rational Numbers',
          'Indices and Exponents',
          'Joint Bar Graphs & Data Handling',
          'Algebraic Expressions and Operations on Them',
          'Direct Proportion and Inverse Proportion',
          'Pythagoras’ Theorem Introduction',
          'Perimeter and Area of Complex Polygons',
          'Surface Area and Volume of Cuboid and Cube'
        ]
      }
    ]
  },
  {
    id: 'g7_sci',
    title: 'General Science',
    subtitle: 'Standard 7 Science & Experiments',
    subject: 'Science',
    categoryTag: 'Physical & Living Sciences',
    boardInfo: 'Class 7',
    sections: [
      {
        title: 'Scientific Principles',
        chapters: [
          'The Living World: Adaptations and Classification',
          'Plants: Structure and Function',
          'Properties of Natural Resources',
          'Nutrition in Living Organisms',
          'Food Safety and Preservation',
          'Measurement of Physical Quantities',
          'Motion, Force and Work',
          'Static Electricity & Lightning Conductors',
          'Heat and Modes of Heat Transfer',
          'Disaster Management & First Aid',
          'Cell Structure and Micro-organisms',
          'Human Organ Systems (Digestive & Circulatory)'
        ]
      }
    ]
  },
  {
    id: 'g7_hist',
    title: 'History & Civics',
    subtitle: 'Medieval India & The Constitution',
    subject: 'Social Science',
    categoryTag: 'Medieval History & Constitution',
    boardInfo: 'Class 7',
    sections: [
      {
        title: 'Medieval Eras & Governance',
        chapters: [
          'Sources of History & India before the Times of Shivaji Maharaj',
          'Religious Synthesis (Bhakti & Sufi Movement)',
          'Maharashtra before the Rise of the Shivaji Maharaj',
          'The Foundation of the Swaraj & Administration',
          'Conflict with the Mughals & Coronation',
          'Introduction to Our Constitution & Fundamental Rights'
        ]
      }
    ]
  },
  {
    id: 'g7_geo',
    title: 'Geography',
    subtitle: 'Seasons, Tides and Air Pressure',
    subject: 'Social Science',
    categoryTag: 'Physical Geography',
    boardInfo: 'Class 7',
    sections: [
      {
        title: 'Atmospheric & Oceanic Cycles',
        chapters: [
          'How Seasons Occur (Part 1 & 2)',
          'The Sun, the Moon and the Earth (Eclipses)',
          'Tides & Ocean Currents',
          'Air Pressure & Wind Systems',
          'Humidity and Clouds',
          'Natural Regions of the World'
        ]
      }
    ]
  },
  {
    id: 'g7_eng',
    title: 'English',
    subtitle: 'Kumarbharati Standard 7',
    subject: 'Language',
    categoryTag: 'Literature & Skills',
    boardInfo: 'Class 7',
    sections: [
      {
        title: 'Prose, Verse & Composition',
        chapters: [
          'Past, Present, Future (Poem by Emily Bronte)',
          'Odd One Out (Story on Empathy)',
          'In Time of Silver Rain',
          'The Welcome (Play by Rabindranath Tagore)',
          'Grammar: Voice, Direct-Indirect Speech, Tenses',
          'Report Writing and Formal Letter Writing'
        ]
      }
    ]
  },
  {
    id: 'g7_mar',
    title: 'Marathi',
    subtitle: 'मराठी अक्षरभारती / बालभारती',
    subject: 'Language',
    categoryTag: 'मातृभाषा व व्याकरण',
    boardInfo: 'Class 7',
    sections: [
      {
        title: 'पाठ, कविता व भाषाभ्यास',
        chapters: [
          'जय जय महाराष्ट्र माझा (राज्यगीत)',
          'स्वप्न विकणारा माणूस',
          'तोडणी (वसंत आणि मीरा)',
          'श्रावणमास (बालकवींची कविता)',
          'व्याकरण: नाम, सर्वनाम, विशेषण, क्रियापद, समास व वाक्यप्रचार'
        ]
      }
    ]
  }
];

export const GRADE_8_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'g8_math',
    title: 'Mathematics',
    subtitle: 'Standard 8 Mathematics (High Yield)',
    subject: 'Mathematics',
    categoryTag: 'Algebra & Geometry',
    boardInfo: 'Class 8',
    sections: [
      {
        title: 'Algebra, Geometry & Mensuration',
        chapters: [
          'Rational and Irrational Numbers',
          'Parallel Lines and Transversals',
          'Indices and Cube Root',
          'Altitudes and Medians of a Triangle',
          'Expansion Formulae [(a+b)³, (a-b)³]',
          'Factorisation of Algebraic Expressions',
          'Variation (Direct & Inverse)',
          'Quadrilateral: Constructions and Types',
          'Discount and Commission',
          'Division of Polynomials',
          'Circle: Chord and Arc Properties',
          'Compound Interest Calculation',
          'Surface Area and Volume (Cylinder, Cuboid, Cube)'
        ]
      }
    ]
  },
  {
    id: 'g8_sci',
    title: 'General Science',
    subtitle: 'Standard 8 Science & Living Systems',
    subject: 'Science',
    categoryTag: 'Physics, Chem & Bio',
    boardInfo: 'Class 8',
    sections: [
      {
        title: 'Core Science Modules',
        chapters: [
          'Living World and Classification of Microbes',
          'Health and Diseases (Infectious & Non-infectious)',
          'Force and Pressure (Atmospheric & Hydraulic)',
          'Current Electricity and Magnetism',
          'Atomic Structure & Periodic Concepts',
          'Composition of Matter (Elements, Compounds, Mixtures)',
          'Metals and Non-metals (Reactions & Rusting)',
          'Pollution (Air, Water, Soil)',
          'Disaster Management & Relief',
          'Cell and Cell Organelles',
          'Human Body and Organ System (Heart, Blood Circulation)'
        ]
      }
    ]
  },
  {
    id: 'g8_hist',
    title: 'History & Civics',
    subtitle: 'Modern India, Freedom Struggle & Judiciary',
    subject: 'Social Science',
    categoryTag: 'Freedom Struggle & Polity',
    boardInfo: 'Class 8',
    sections: [
      {
        title: 'Indian Freedom Movement & Polity',
        chapters: [
          'Sources of History & Europe and India',
          'Effects of British Rule & Freedom Struggle of 1857',
          'Social and Religious Reforms',
          'Beginning of Nationalist Movement (Congress Formation)',
          'Non-cooperation Movement & Civil Disobedience',
          'Quit India Movement & Armed Revolutionaries',
          'The Parliamentary System & The Union Judiciary'
        ]
      }
    ]
  },
  {
    id: 'g8_geo',
    title: 'Geography',
    subtitle: 'Interior of Earth, Oceans & Population',
    subject: 'Social Science',
    categoryTag: 'Earth Dynamics & Industry',
    boardInfo: 'Class 8',
    sections: [
      {
        title: 'Global Geosphere',
        chapters: [
          'Local Time and Standard Time',
          'Interior of the Earth (Crust, Mantle, Core)',
          'Humidity and Clouds',
          'Structure of Ocean Floor',
          'Ocean Currents (Warm & Cold)',
          'Land Use and Agriculture Systems',
          'Population Geography & Industries'
        ]
      }
    ]
  },
  {
    id: 'g8_eng',
    title: 'English',
    subtitle: 'Kumarbharati Standard 8',
    subject: 'Language',
    categoryTag: 'Literature & Composition',
    boardInfo: 'Class 8',
    sections: [
      {
        title: 'Classic Prose & Modern Poetry',
        chapters: [
          'A Time to Believe (Poem)',
          'Dick Whittington and his Cat',
          'The Pilgrim & Reviving Rivers',
          'The Little Match Girl',
          'Grammar: Clauses, Compound Sentences, Prepositions',
          'Speech Writing, View-Counterview, Story Writing'
        ]
      }
    ]
  },
  {
    id: 'g8_mar',
    title: 'Marathi',
    subtitle: 'मराठी अक्षरभारती / बालभारती',
    subject: 'Language',
    categoryTag: 'साहित्य व लेखन कौशल्य',
    boardInfo: 'Class 8',
    sections: [
      {
        title: 'गद्य, पद्य व उपयोजित लेखन',
        chapters: [
          'आम्ही चालवू हा पुढे वारसा (गीत)',
          'मी चित्रकार कसा झालो!',
          'प्रभात (कविता)',
          'आपण सारे एक (नाटिका)',
          'गोंदण (कविता) व लाखाच्या कोटीच्या गप्पा',
          'व्याकरण: केवलप्रयोगी अव्यय, समास, वाक्प्रचार व निबंध लेखन'
        ]
      }
    ]
  }
];

export const GRADE_9_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'g9_math1',
    title: 'Maths 1 (Algebra)',
    subtitle: 'Standard 9 Mathematics Part 1',
    subject: 'Mathematics',
    categoryTag: 'Algebra & Statistics',
    boardInfo: 'Class 9',
    sections: [
      {
        title: '📐 Algebra Topics',
        chapters: [
          'Sets (Venn Diagrams, Subsets, Operations)',
          'Real Numbers (Surds, Rationalization)',
          'Polynomials (Operations, Remainder Theorem, Factorization)',
          'Ratio and Proportion (Properties & Continued Proportion)',
          'Linear Equations in Two Variables (Simultaneous Systems)',
          'Financial Planning (Taxation, Income Tax Basics)',
          'Statistics (Mean, Median, Mode, Frequency Distribution)'
        ]
      }
    ]
  },
  {
    id: 'g9_math2',
    title: 'Maths 2 (Geometry)',
    subtitle: 'Standard 9 Mathematics Part 2',
    subject: 'Mathematics',
    categoryTag: 'Geometry & Mensuration',
    boardInfo: 'Class 9',
    sections: [
      {
        title: '📐 Geometry Proofs & Figures',
        chapters: [
          'Basic Concepts in Geometry (Distance & Betweenness)',
          'Parallel Lines (Alternate & Interior Angle Theorems)',
          'Triangles (Congruence Theorems, Inequality Theorem)',
          'Constructions of Triangles (Incircle & Circumcircle)',
          'Quadrilaterals (Parallelogram, Rhombus, Trapezium Proofs)',
          'Circle (Chords, Distance from Centre, Congruency)',
          'Coordinate Geometry (Distance on Axes & Quadrants)',
          'Trigonometry (Sine, Cosine, Tangent Ratios & Identities)',
          'Surface Area and Volume (Cone, Sphere, Hemisphere)'
        ]
      }
    ]
  },
  {
    id: 'g9_sci1',
    title: 'Science 1',
    subtitle: 'Science & Technology Part 1 (Physics + Chem)',
    subject: 'Science',
    categoryTag: 'Physics + Chemistry',
    boardInfo: 'Class 9',
    sections: [
      {
        title: '🔬 Physical & Chemical Sciences',
        chapters: [
          'Laws of Motion (Newton’s 3 Laws & Momentum)',
          'Work and Energy (Kinetic & Potential Derivations)',
          'Current Electricity (Ohm’s Law, Series & Parallel Resistance)',
          'Measurement of Matter (Mole Concept, Valency, Radicals)',
          'Acids, Bases and Salts (pH Scale, Neutralization)',
          'Classification of Plants (Thallophyta to Angiosperms)',
          'Energy Flow in an Ecosystem (Food Webs & Pyramids)'
        ]
      }
    ]
  },
  {
    id: 'g9_sci2',
    title: 'Science 2',
    subtitle: 'Science & Technology Part 2 (Bio + Env)',
    subject: 'Science',
    categoryTag: 'Biology + Environment',
    boardInfo: 'Class 9',
    sections: [
      {
        title: '🧬 Biology & Ecological Systems',
        chapters: [
          'Useful and Harmful Microbes (Antibiotics & Pathogens)',
          'Environmental Management (Solid Waste & Weather)',
          'Information Communication Technology (ICT & Computing)',
          'Reflection of Light (Spherical Mirrors, Focal Length)',
          'Study of Sound (Echo, Reverberation, SONAR)',
          'Carbon: An Important Element (Allotropes & Hydrocarbons)',
          'Substances in Common Use (Radioactivity, Dyes, Ceramics)',
          'Life Processes in Living Organisms (Transport & Excretion)',
          'Heredity and Variation (Mendel’s Monohybrid Cross)'
        ]
      }
    ]
  },
  {
    id: 'g9_hist',
    title: 'History & Pol Sci',
    subtitle: 'Post-Independence India & International Relations',
    subject: 'Social Science',
    categoryTag: 'Modern History & World Politics',
    boardInfo: 'Class 9',
    sections: [
      {
        title: '🏛️ Modern India & World',
        chapters: [
          'Sources of History & India: Events after 1960',
          'India’s Internal Challenges (Terrorism & Communes)',
          'Economic Development (Five Year Plans & Nationalization)',
          'Education, Science and Technology Advancements',
          'Empowerment of Women and Other Weaker Sections',
          'Post World War Political Developments (Cold War)',
          'India’s Foreign Policy & Defence System'
        ]
      }
    ]
  },
  {
    id: 'g9_geo',
    title: 'Geography',
    subtitle: 'Endogenetic Movements & Weathering',
    subject: 'Social Science',
    categoryTag: 'Physical Geography & Economy',
    boardInfo: 'Class 9',
    sections: [
      {
        title: '🌍 Geomorphology',
        chapters: [
          'Distributional Maps (Dot, Choropleth, Isopleth)',
          'Endogenetic Movements (Earthquakes & Volcanoes)',
          'Exogenetic Movements Part 1 (Weathering & Mass Wasting)',
          'Exogenetic Movements Part 2 (Work of River, Wind, Glaciers)',
          'Precipitation & Properties of Sea Water',
          'International Date Line & Trade Systems'
        ]
      }
    ]
  },
  {
    id: 'g9_eng',
    title: 'English',
    subtitle: 'Kumarbharati Standard 9',
    subject: 'Language',
    categoryTag: 'Literature & Board Writing',
    boardInfo: 'Class 9',
    sections: [
      {
        title: 'Prose, Poetry & Grammar',
        chapters: [
          'Life (Poem by Charlotte Bronte)',
          'A Synopsis — The Swiss Family Robinson',
          'Have you ever seen...? (Humorous Verse)',
          'Have you thought of the verb ‘have’?',
          'The Necklace (Guy de Maupassant)',
          'The Autumn Song (Sarojini Naidu)',
          'Formal Letter, Report Writing, Counterviews'
        ]
      }
    ]
  },
  {
    id: 'g9_mar',
    title: 'Marathi',
    subtitle: 'मराठी अक्षरभारती / कुमारभारती',
    subject: 'Language',
    categoryTag: 'मातृभाषा व लेखन',
    boardInfo: 'Class 9',
    sections: [
      {
        title: 'गद्य, पद्य व व्याकरण',
        chapters: [
          'सर्वात्मका शिवसुंदरा (प्रार्थना)',
          'संतकृपा झाली (संत बहिणाबाई)',
          'बेटा, मी ऐकतो आहे! (वसंत शांताराम कानेटकर)',
          'जी. आय. पी. रेल्वे (प्रबोधनकार ठाकरे)',
          'व्याकरण: संधी, समास, अलंकार, वाक्प्रचार व निबंध'
        ]
      }
    ]
  }
];

// Grade 11 Science Catalog
export const GRADE_11_SCIENCE_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'g11_phy',
    title: 'Physics',
    subtitle: 'Standard 11 Physics (HSC / CBSE / JEE)',
    subject: 'Physics',
    categoryTag: 'Mechanics, Waves & Optics',
    boardInfo: 'Class 11 Science',
    sections: [
      {
        title: '⚛️ Core Physics Syllabus',
        chapters: [
          'Units and Measurements (Dimensions & Error Analysis)',
          'Mathematical Methods (Vectors, Dot & Cross Product)',
          'Motion in a Plane (Projectile Motion & Centripetal Acc.)',
          'Laws of Motion (Friction, Momentum & Pseudo Forces)',
          'Gravitation (Kepler’s Laws, Potential Energy, Satellite Motion)',
          'Mechanical Properties of Solids (Stress, Strain, Young’s Modulus)',
          'Thermal Properties of Matter (Conduction, Radiation, Wien’s Law)',
          'Sound & Doppler Effect',
          'Optics (Refraction, Dispersion, Telescopes & Aberrations)',
          'Electrostatics (Coulomb’s Law, Electric Dipole, Gauss Law)',
          'Current Electricity (Kirchhoff’s Laws & Potentiometer)',
          'Magnetism & Magnetic Dipole Moment',
          'Electromagnetic Waves & Communication Systems',
          'Semiconductors (p-n Junction, Diodes & Logic Gates)'
        ]
      }
    ]
  },
  {
    id: 'g11_chem',
    title: 'Chemistry',
    subtitle: 'Standard 11 Chemistry (Organic & Inorganic)',
    subject: 'Chemistry',
    categoryTag: 'Physical, Organic & Inorganic',
    boardInfo: 'Class 11 Science',
    sections: [
      {
        title: '🧪 Chemical Foundations',
        chapters: [
          'Some Basic Concepts of Chemistry (Mole & Stoichiometry)',
          'Structure of Atom (Bohr Model, Quantum Numbers, Orbitals)',
          'Periodic Table & Periodic Properties',
          'Chemical Bonding and Molecular Structure (Hybridization, VSEPR)',
          'Redox Reactions (Oxidation Numbers & Balancing)',
          'States of Matter (Gaseous & Liquid State, Gas Laws)',
          'Chemical Equilibrium (Le Chatelier’s Principle)',
          'Surface Chemistry (Adsorption & Colloids)',
          'Hydrocarbons (Alkanes, Alkenes, Alkynes & Aromaticity)',
          'Basic Principles of Organic Chemistry (IUPAC, Isomerism)',
          's-Block Elements (Alkali and Alkaline Earth Metals)',
          'p-Block Elements (Group 13 and Group 14)',
          'Environmental Chemistry (Ozone Depletion & Green Chem)'
        ]
      }
    ]
  },
  {
    id: 'g11_math',
    title: 'Mathematics & Stats',
    subtitle: 'Standard 11 Mathematics Part 1 & 2',
    subject: 'Mathematics',
    categoryTag: 'Calculus, Algebra & Vectors',
    boardInfo: 'Class 11 Science',
    sections: [
      {
        title: '📐 Pure & Applied Mathematics',
        chapters: [
          'Angle and Its Measurement (Radian & Arc Length)',
          'Trigonometry I & II (Compound Angles & Identities)',
          'Determinants and Matrices (Cramer’s Rule & Inverse)',
          'Straight Line (Slope, Various Forms, Distance Formula)',
          'Circle (Standard & General Equation, Tangents)',
          'Conic Sections (Parabola, Ellipse, Hyperbola)',
          'Sets and Relations (Cartesian Product, Equivalence)',
          'Functions (Domain, Range, Types of Functions)',
          'Limits and Continuity (Evaluation & Standard Theorems)',
          'Differentiation (First Principles & Product/Quotient Rules)',
          'Permutations and Combinations',
          'Probability & Conditional Probability'
        ]
      }
    ]
  },
  {
    id: 'g11_bio',
    title: 'Biology',
    subtitle: 'Standard 11 Botany & Zoology',
    subject: 'Biology',
    categoryTag: 'Botany & Zoology',
    boardInfo: 'Class 11 Science',
    sections: [
      {
        title: '🧬 Living Organisms & Physiology',
        chapters: [
          'Living World & Systematics of Living Organisms',
          'Kingdom Plantae (Algae, Bryophytes, Pteridophytes, Gymnosperms)',
          'Kingdom Animalia (Non-chordates to Chordates)',
          'Cell Structure and Organization (Organelles & Membranes)',
          'Biomolecules (Carbohydrates, Proteins, Nucleic Acids, Enzymes)',
          'Cell Division (Mitosis, Meiosis, Cell Cycle Regulation)',
          'Plant Water Relations & Mineral Nutrition',
          'Respiration and Energy Transfer (Glycolysis, Krebs, ATP)',
          'Human Nutrition, Excretion and Osmoregulation',
          'Neural & Chemical Coordination (Brain, Neurons, Hormones)'
        ]
      }
    ]
  },
  {
    id: 'g11_eng',
    title: 'English Yuvakbharati',
    subtitle: 'English Literature & Advanced Drafting',
    subject: 'Language',
    categoryTag: 'Core Language',
    boardInfo: 'Class 11 Science',
    sections: [
      {
        title: 'Literature, Prose & Composition',
        chapters: [
          'Being Neighborly (Louisa May Alcott)',
          'On To The Summit: We Reach The Top (Tenzing Norgay)',
          'The Call of the Soil (Venkatesh Iyer)',
          'Cherry Tree (Poem by Ruskin Bond)',
          'The Sower (Victor Hugo / Toru Dutt)',
          'Drafting Virtual Messages, Statement of Purpose (SOP)',
          'Group Discussion & Blog Writing'
        ]
      }
    ]
  }
];

// Grade 12 Science Catalog (HSC / 12th Board)
export const GRADE_12_SCIENCE_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'g12_phy',
    title: 'Physics',
    subtitle: 'Standard 12 Physics (HSC Board / JEE / NEET)',
    subject: 'Physics',
    categoryTag: 'Electromagnetism, Optics & Modern Physics',
    boardInfo: 'Class 12 HSC',
    sections: [
      {
        title: '⚛️ HSC Physics Theory & Derivations',
        chapters: [
          'Rotational Dynamics (Banking of Roads, Moment of Inertia)',
          'Mechanical Properties of Fluids (Surface Tension, Bernoulli)',
          'Kinetic Theory of Gases and Radiation (Black Body, Stefan-Boltzmann)',
          'Thermodynamics (First Law, Isothermal, Carnot Engine)',
          'Oscillations (SHM Differential Equation, Simple Pendulum)',
          'Superposition of Waves (Stationary Waves, Sonometer, Beats)',
          'Wave Optics (Huygens Principle, Interference, Young’s Slits)',
          'Electrostatics (Gauss Theorem Applications, Capacitors)',
          'Current Electricity (Wheatstone Bridge, Meter Bridge, Potentiometer)',
          'Magnetic Fields due to Electric Current (Biot-Savart, Ampere’s Law)',
          'Magnetic Materials (Diamagnetic, Paramagnetic, Ferromagnetic)',
          'Electromagnetic Induction (Faraday’s Law, Lenz’s Law, Eddy Currents)',
          'AC Circuits (LCR Series Circuit, Resonance, Power in AC)',
          'Dual Nature of Radiation and Matter (Photoelectric Effect)',
          'Structure of Atoms and Nuclei (Bohr Model, Radioactive Decay)',
          'Semiconductor Devices (Zener Diode, Transistor, Solar Cell)'
        ]
      }
    ]
  },
  {
    id: 'g12_chem',
    title: 'Chemistry',
    subtitle: 'Standard 12 Chemistry (Physical, Inorganic & Organic)',
    subject: 'Chemistry',
    categoryTag: 'HSC Board Chemistry',
    boardInfo: 'Class 12 HSC',
    sections: [
      {
        title: '🧪 Chemical Systems & Reactions',
        chapters: [
          'Solid State (Crystal Lattices, Unit Cells, Defects)',
          'Solutions (Raoult’s Law, Colligative Properties, Van’t Hoff Factor)',
          'Ionic Equilibria (Ostwald’s Dilution Law, Buffer Solutions, pH)',
          'Chemical Thermodynamics (Enthalpy, Entropy, Gibbs Free Energy)',
          'Electrochemistry (Nernst Equation, Galvanic Cells, Kohlrausch Law)',
          'Chemical Kinetics (Rate Law, Integrated Rate Equations, Arrhenius)',
          'Elements of Groups 16, 17 and 18 (Oxides, Oxyacids, Interhalogens)',
          'Transition and Inner Transition Elements (d and f Block, Coordination)',
          'Coordination Compounds (Werner’s Theory, CFT, VBT, Isomerism)',
          'Halogen Derivatives (SN1, SN2 Mechanisms, Haloarenes)',
          'Alcohols, Phenols and Ethers (Reimer-Tiemann, Williamson Synthesis)',
          'Aldehydes, Ketones and Carboxylic Acids (Aldol, Cannizzaro, Grignard)',
          'Amines & Diazonium Salts',
          'Biomolecules (Glucose Structure, Peptides, DNA/RNA)',
          'Introduction to Polymer Chemistry',
          'Green Chemistry and Nanotechnology'
        ]
      }
    ]
  },
  {
    id: 'g12_math',
    title: 'Mathematics & Stats',
    subtitle: 'Standard 12 Mathematics Part 1 & 2',
    subject: 'Mathematics',
    categoryTag: 'Advanced Calculus & Vectors',
    boardInfo: 'Class 12 HSC',
    sections: [
      {
        title: '📐 HSC Pure Mathematics & Calculus',
        chapters: [
          'Mathematical Logic (Truth Tables, Quantifiers, Duals)',
          'Matrices (Adjoint, Inverse, Reduction & Inversion Method)',
          'Trigonometric Functions (Principal/General Solutions, Sine/Cosine Rule)',
          'Pair of Straight Lines (Homogeneous Equations, Angle Between Lines)',
          'Vectors (Scalar Triple Product, Vector Triple Product)',
          'Three Dimensional Geometry (Direction Cosines & Ratios)',
          'Line and Plane in 3D Space (Vector & Cartesian Equations)',
          'Linear Programming (LPP Formulation & Graphical Feasible Region)',
          'Differentiation (Chain Rule, Parametric, Logarithmic Differentiation)',
          'Applications of Derivatives (Tangents, Maxima-Minima, Rate Measure)',
          'Indefinite Integration (Standard Integrals, By Parts, Partial Fractions)',
          'Definite Integration (Properties & Definite Integral as Limit of Sum)',
          'Application of Definite Integration (Area Under Curves)',
          'Differential Equations (Order & Degree, General & Particular Solutions)',
          'Probability Distributions (PMF, PDF, Expected Value & Variance)',
          'Binomial Distribution [P(X=x) = ⁿCₓ pˣ qⁿ⁻ˣ]'
        ]
      }
    ]
  },
  {
    id: 'g12_bio',
    title: 'Biology',
    subtitle: 'Standard 12 Botany & Zoology',
    subject: 'Biology',
    categoryTag: 'Genetics, Physiology & Ecology',
    boardInfo: 'Class 12 HSC',
    sections: [
      {
        title: '🧬 Genetics & Human Biology',
        chapters: [
          'Reproduction in Lower and Higher Plants (Microsporogenesis & Embryo)',
          'Reproduction in Lower and Higher Animals (Gametogenesis & Menstrual Cycle)',
          'Inheritance and Variation (Mendelian Genetics, Sex Determination)',
          'Molecular Basis of Inheritance (DNA Replication, Transcription, Translation)',
          'Origin and Evolution of Life (Darwinism, Modern Synthetic Theory)',
          'Plant Water Relations & Transpiration Pull',
          'Plant Growth and Mineral Nutrition (Phytohormones: Auxins, Cytokinins)',
          'Respiration and Circulation (Cardiac Cycle, ECG, Blood Pressure)',
          'Control and Coordination (Human Brain, Reflex Arc, Endocrine Glands)',
          'Human Health and Diseases (Immunity, Vaccines, Cancer, AIDS)',
          'Enhancement of Food Production (Plant Breeding, Tissue Culture)',
          'Biotechnology: Principles and Processes (Recombinant DNA & Vectors)',
          'Organisms and Populations (Adaptations, Population Growth Models)',
          'Ecosystems and Energy Flow (Productivity, Nutrient Cycles)',
          'Biodiversity, Conservation and Environmental Issues'
        ]
      }
    ]
  },
  {
    id: 'g12_eng',
    title: 'English Yuvakbharati',
    subtitle: 'HSC English Literature & Writing Section',
    subject: 'Language',
    categoryTag: 'Board Literature',
    boardInfo: 'Class 12 HSC',
    sections: [
      {
        title: 'Prose, Poems & Novel Studies',
        chapters: [
          'An Astrologer’s Day (R. K. Narayan)',
          'On Saying “Please” (A. G. Gardiner)',
          'The Cop and the Anthem (O. Henry)',
          'Song of the Open Road (Walt Whitman)',
          'Indian Weavers (Sarojini Naidu)',
          'The Inchcape Rock (Robert Southey)',
          'Novel Analysis: To Sir with Love (E. R. Braithwaite)',
          'Novel Analysis: Around the World in Eighty Days (Jules Verne)',
          'Novel Analysis: The Sign of Four (Sir Arthur Conan Doyle)',
          'Writing Skills: Expansion of Idea, Virtual Messages, Interview Questions'
        ]
      }
    ]
  }
];

// Grade 11 & 12 Commerce Catalog
export const GRADE_11_12_COMMERCE_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'comm_bk',
    title: 'Book Keeping & Accountancy',
    subtitle: 'Commerce Core Accounting',
    subject: 'Commerce',
    categoryTag: 'Financial Accounting',
    boardInfo: 'Class 11/12 Commerce',
    sections: [
      {
        title: '📊 Accountancy & Ledgers',
        chapters: [
          'Introduction to Book-keeping and Accountancy',
          'Meaning and Fundamentals of Double Entry Book-keeping',
          'Source Documents Required for Accounting (Vouchers & Invoices)',
          'Journal, Ledger & Subsidiary Books (Cash Book, Purchase Book)',
          'Bank Reconciliation Statement (BRS)',
          'Depreciation Accounting (Straight Line & Reducing Balance Method)',
          'Final Accounts of a Sole Trader & Partnership Final Accounts',
          'Accounts of ‘Not for Profit’ Concerns (NPO Receipts & Payments)',
          'Bills of Exchange (Promissory Note, Endorsement, Dishonour)',
          'Dissolution of Partnership Firm',
          'Company Accounts: Issue of Shares & Forfeiture',
          'Analysis of Financial Statements & Computerized Accounting'
        ]
      }
    ]
  },
  {
    id: 'comm_eco',
    title: 'Economics',
    subtitle: 'Micro & Macro Economics Analysis',
    subject: 'Commerce',
    categoryTag: 'Economic Theory',
    boardInfo: 'Class 11/12 Commerce',
    sections: [
      {
        title: '📈 Micro & Macro Economics',
        chapters: [
          'Introduction to Micro & Macro Economics',
          'Utility Analysis (Law of Diminishing Marginal Utility)',
          'Demand Analysis & Elasticity of Demand (Price, Income, Cross)',
          'Supply Analysis & Law of Supply',
          'Forms of Market (Perfect Competition, Monopoly, Oligopoly)',
          'Index Numbers (Simple & Weighted Index Numbers)',
          'National Income Accounting (GDP, GNP, NNP Measurement Methods)',
          'Public Finance in India (Budget, Taxes & Fiscal Policy)',
          'Money Market and Capital Market in India (RBI & SEBI Roles)',
          'Foreign Trade of India (Exports, Imports, Balance of Trade)'
        ]
      }
    ]
  },
  {
    id: 'comm_ocm',
    title: 'Org. of Commerce & Mgt (OCM)',
    subtitle: 'Business Services & Management Principles',
    subject: 'Commerce',
    categoryTag: 'Business Management',
    boardInfo: 'Class 11/12 Commerce',
    sections: [
      {
        title: '🏢 Management Principles & Services',
        chapters: [
          'Principles of Management (Henri Fayol & F.W. Taylor)',
          'Functions of Management (Planning, Organising, Staffing, Directing, Controlling)',
          'Entrepreneurship Development (Startups & Innovation)',
          'Business Services (Banking, Insurance, Warehousing, Transport, Communication)',
          'Emerging Modes of Business (E-Business, BPO, KPO)',
          'Social Responsibilities of Business & Business Ethics',
          'Consumer Protection (Consumer Rights, Redressal Forums)',
          'Marketing Management & 7 Ps of Marketing'
        ]
      }
    ]
  },
  {
    id: 'comm_sp',
    title: 'Secretarial Practice (SP)',
    subtitle: 'Corporate Finance & Securities',
    subject: 'Commerce',
    categoryTag: 'Corporate Finance',
    boardInfo: 'Class 11/12 Commerce',
    sections: [
      {
        title: '📜 Corporate Secretarial Operations',
        chapters: [
          'Introduction to Corporate Finance & Capital Structure',
          'Sources of Corporate Finance (Equity Shares, Debentures, ADR/GDR)',
          'Issue of Shares (Prospectus, Allotment, Calls, Forfeiture)',
          'Issue of Debentures & Creation of Charge',
          'Deposits (Rules for Acceptance of Deposits)',
          'Correspondence with Members, Debenture Holders & Depositors',
          'Depository System (Demat, NSDL, CDSL)',
          'Payment of Dividend and Interest (Interim & Final Dividend)',
          'Financial Markets & Stock Exchange (BSE, NSE, Trading Procedures)'
        ]
      }
    ]
  },
  {
    id: 'comm_eng',
    title: 'English Yuvakbharati',
    subtitle: 'English Literature & Business Communication',
    subject: 'Language',
    categoryTag: 'Language',
    boardInfo: 'Class 11/12 Commerce',
    sections: [
      {
        title: 'Prose & Corporate Communication',
        chapters: [
          'Prose & Poetry Appreciation',
          'Drafting Commercial Letters and Business Proposals',
          'Statement of Purpose (SOP) & Resume Writing',
          'Summary Writing, Mind Mapping & Interview Preparation'
        ]
      }
    ]
  }
];

// Main function to get the exact matching subject catalog for any student
export function getSubjectCatalogForUser(stdInput?: string, boardInput?: string, studyingInput?: string): SubjectCatalogItem[] {
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  
  if (parsed.stdNumber === 5) return GRADE_5_CATALOG;
  if (parsed.stdNumber === 6) return GRADE_6_CATALOG;
  if (parsed.stdNumber === 7) return GRADE_7_CATALOG;
  if (parsed.stdNumber === 8) return GRADE_8_CATALOG;
  if (parsed.stdNumber === 9) return GRADE_9_CATALOG;
  if (parsed.stdNumber === 11) {
    if (parsed.stream === 'commerce') return GRADE_11_12_COMMERCE_CATALOG;
    return GRADE_11_SCIENCE_CATALOG;
  }
  if (parsed.stdNumber === 12) {
    if (parsed.stream === 'commerce') return GRADE_11_12_COMMERCE_CATALOG;
    return GRADE_12_SCIENCE_CATALOG;
  }
  
  // Default to Standard 10 SSC
  return ALL_SUBJECTS_CATALOG;
}

// 1. Dynamic Live Classes for specific Grade & Board
export function getLiveClassesForUser(stdInput?: string, boardInput?: string, studyingInput?: string): LiveClassItem[] {
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);

  if (parsed.stdNumber === 10) {
    // Return standard 10 predefined live classes
    return [
      {
        id: 'live-sci1-grav',
        subjectId: 'sci1',
        subjectTitle: 'Science & Technology 1',
        chapterTitle: 'Gravitation',
        topicTitle: "Newton's Universal Law Derivation & Kepler's 3rd Law Numericals",
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
        topicTitle: "Cramer's Rule Determinants & Word Problem Solving Strategy",
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
        topicTitle: 'Geometric Mean Property & 30°-60°-90° Triangle Theorem Proofs',
        educator: 'Prof. Anant Kulkarni',
        educatorRole: 'Gold Medalist & Senior Geometry Dean',
        status: 'scheduled_today',
        timeSlot: '04:00 PM – 05:15 PM',
        scheduledTime: 'Starts at 04:00 PM',
        dateString: 'Today',
        roomCode: 'SN-MATH2-PYTH-102',
        keyHighlights: [
          'Complete given / to prove structure for Geometric Mean Theorem',
          'Avoiding common board presentation slips in proof statements',
          'Live calculation of ladder and wall word problems'
        ]
      }
    ];
  }

  // Synthesize rich, grade-specific live classes from catalog
  const synthesized: LiveClassItem[] = [];
  const statusOptions: Array<'live_now' | 'scheduled_today' | 'upcoming'> = ['live_now', 'live_now', 'scheduled_today', 'scheduled_today', 'upcoming', 'upcoming'];
  const educators = [
    { name: 'Prof. Anant Kulkarni', role: `Senior Academic Mentor (${parsed.stdLabel})` },
    { name: 'Dr. Ramesh Deshmukh', role: `Curriculum Specialist (${parsed.board})` },
    { name: 'Smt. Madhuri Joshi', role: `Department Head & Senior Faculty` },
    { name: 'Prof. Milind Joshi', role: `Concept Lead & Examiner` },
    { name: 'Dr. Sunita Patil', role: `Textbook Committee Subject Advisor` }
  ];

  catalog.forEach((subj, sIdx) => {
    const chapters = subj.sections.flatMap(sec => sec.chapters);
    const targetChapter = chapters[0] || subj.title;
    const secondChapter = chapters[1] || chapters[0];

    const status1 = statusOptions[sIdx % statusOptions.length];
    const edu = educators[sIdx % educators.length];

    synthesized.push({
      id: `live-${parsed.stdNumber}-${subj.id}-1`,
      subjectId: subj.id,
      subjectTitle: subj.title,
      chapterTitle: targetChapter,
      topicTitle: `${targetChapter} — Master Concepts & Model Board Answers`,
      educator: edu.name,
      educatorRole: edu.role,
      status: status1,
      timeSlot: sIdx % 2 === 0 ? '08:00 AM – 09:15 AM' : '04:30 PM – 05:45 PM',
      scheduledTime: status1 === 'live_now' ? 'Started 15 mins ago' : status1 === 'scheduled_today' ? 'Today, 04:30 PM' : 'Tomorrow 09:00 AM',
      dateString: status1 === 'live_now' ? 'Today (Live Session)' : 'Today',
      attendeesCount: 80 + (sIdx * 25) % 150,
      roomCode: `SN-${parsed.stdNumber}-${subj.id.toUpperCase()}-101`,
      keyHighlights: [
        `Exhaustive concept breakdown directly aligned with ${parsed.board} syllabus for ${parsed.stdLabel}`,
        `Step-by-step whiteboard derivations and solved textbook problems`,
        `Interactive doubt clearance with mentor`
      ]
    });

    if (sIdx < 2 && secondChapter) {
      synthesized.push({
        id: `live-${parsed.stdNumber}-${subj.id}-2`,
        subjectId: subj.id,
        subjectTitle: subj.title,
        chapterTitle: secondChapter,
        topicTitle: `${secondChapter} — Advanced Problem Solving & Numerical Drill`,
        educator: educators[(sIdx + 2) % educators.length].name,
        educatorRole: educators[(sIdx + 2) % educators.length].role,
        status: 'scheduled_today',
        timeSlot: '06:00 PM – 07:15 PM',
        scheduledTime: 'Starts at 06:00 PM',
        dateString: 'Today',
        attendeesCount: 110,
        roomCode: `SN-${parsed.stdNumber}-${subj.id.toUpperCase()}-202`,
        keyHighlights: [
          `Key exam presentation strategies and rubric evaluation standards`,
          `Solving 5 most repeated exam questions`,
          `Instant formula recap sheet distribution`
        ]
      });
    }
  });

  return synthesized;
}

// 2. Dynamic Recorded Lectures for specific Grade & Board
export function getRecordedClassesForUser(stdInput?: string, boardInput?: string, studyingInput?: string): Record<string, RecordedLectureItem[]> {
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const result: Record<string, RecordedLectureItem[]> = {};

  const educators = [
    'Prof. Anant Kulkarni',
    'Dr. Ramesh Deshmukh',
    'Smt. Madhuri Joshi',
    'Prof. Sunita Rane',
    'Dr. Arvind Kelkar',
    'Prof. Milind Joshi'
  ];

  catalog.forEach((subj, sIdx) => {
    const list: RecordedLectureItem[] = [];
    const chapters = subj.sections.flatMap(sec => sec.chapters);

    chapters.forEach((chap, cIdx) => {
      list.push({
        id: `rec-${parsed.stdNumber}-${subj.id}-${cIdx + 1}-1`,
        subjectId: subj.id,
        subjectTitle: subj.title,
        chapterTitle: chap,
        lectureNumber: 1,
        lectureTitle: `${chap} — Core Concepts & Foundation Breakdown`,
        educator: educators[(sIdx + cIdx) % educators.length],
        duration: '42 mins',
        recordedDate: 'Sept 2026',
        viewsCount: 1200 + (cIdx * 140) % 3000,
        difficulty: 'Foundation',
        thumbnailTheme: 'from-amber-900 via-stone-800 to-stone-900',
        keyTakeaways: [
          `Fundamental principles of ${chap} explained with illustrated diagrams`,
          `Detailed explanation of definitions, laws, and basic theorems`,
          `Formula sheet summary for instant revision`
        ],
        sampleVideoSummary: `Comprehensive video lecture delivering complete mastery of ${chap} for ${parsed.stdLabel} under ${parsed.board}.`
      });

      list.push({
        id: `rec-${parsed.stdNumber}-${subj.id}-${cIdx + 1}-2`,
        subjectId: subj.id,
        subjectTitle: subj.title,
        chapterTitle: chap,
        lectureNumber: 2,
        lectureTitle: `${chap} — Exam Question Bank & Master Numerical Drill`,
        educator: educators[(sIdx + cIdx + 1) % educators.length],
        duration: '48 mins',
        recordedDate: 'Sept 2026',
        viewsCount: 980 + (cIdx * 120) % 2500,
        difficulty: 'Core Board Exam',
        thumbnailTheme: 'from-emerald-950 via-stone-800 to-stone-900',
        keyTakeaways: [
          `Solving textbook exercises and previous years' exam questions`,
          `Step-wise scoring guide to achieve 100% full marks`,
          `Top mistakes to avoid in final examination papers`
        ],
        sampleVideoSummary: `High-impact exam preparation covering all 2-mark, 3-mark and 5-mark long answer questions for ${chap}.`
      });
    });

    result[subj.id] = list;
  });

  return result;
}

// 3. Dynamic Study Library Note PDFs for specific Grade & Board
export function getLibraryNotesForUser(stdInput?: string, boardInput?: string, studyingInput?: string): NotePdfResource[] {
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const notes: NotePdfResource[] = [];

  catalog.forEach((subj) => {
    const chapters = subj.sections.flatMap(sec => sec.chapters);

    chapters.forEach((chap, cIdx) => {
      // 1. Target Publications / Master Guide
      notes.push({
        id: `pdf-target-${parsed.stdNumber}-${subj.id}-ch${cIdx + 1}`,
        subjectId: subj.id,
        subjectTitle: subj.title,
        chapterTitle: chap,
        chapterNumber: cIdx + 1,
        publication: 'Target Publications',
        edition: '2026-2027 Latest Academic Edition',
        title: `${chap} — Target Perfect Notes (Complete Chapter Guide)`,
        fileSize: `${(2.8 + ((cIdx % 5) * 0.4)).toFixed(1)} MB`,
        pageCount: 22 + (cIdx % 8) * 2,
        downloadCount: 8400 + (cIdx * 350) % 15000,
        rating: 4.9,
        topicsCovered: [
          `Fundamental overview of ${chap}`,
          `Key terminology, definitions and formula derivations`,
          `Subtopic-wise classified questions aligned with ${parsed.board}`,
          `Model solved textbook exercises with step-by-step reasoning`
        ],
        keyHighlights: [
          `Complete syllabus coverage for ${parsed.stdLabel} (${parsed.board})`,
          `Quick Review Memory Maps and Summary Charts for 5-minute revision`,
          `Practice Questions with Self-Assessment marking rubric for full score`
        ],
        pdfPreviewExcerpt: {
          chapterIntroduction: `Target Perfect Notes for ${chap} presents an exhaustive, student-friendly breakdown of all key curriculum concepts for ${parsed.stdLabel}. Every topic is structured into concise concepts followed immediately by evaluation-format questions.`,
          keyFormulasOrDefinitions: [
            {
              term: `Core Concept 1: ${chap} Fundamentals`,
              explanation: `Foundational principles and laws governing ${chap} conforming to ${parsed.board} standards.`
            },
            {
              term: `Key Application: ${chap} Problem Solving`,
              explanation: `Step-by-step numerical methodology, logical deduction, and model proof structures.`
            }
          ],
          boardModelQuestions: [
            {
              q: `Explain in detail the fundamental concept of ${chap} with appropriate examples.`,
              a: `Model Answer (Target Perfect Format): 1. Clear introductory definition. 2. Scientific / mathematical reasoning with cause and effect. 3. Practical real-life application and concluding inference.`,
              marks: 3
            },
            {
              q: `State the key significance and practical applications of ${chap}.`,
              a: `1. First causal factor directly addressing the core phenomenon. 2. Resulting consequence and physical / historical significance conforming to evaluation marks.`,
              marks: 2
            }
          ],
          topperStudyAdvice: `Target Topper Tip for ${chap}: Pay special attention to keyword definitions. Write answers in numbered bullet points and underline key phrases like examiners recommend.`
        }
      });

      // 2. Navneet Digest / Comprehensive Digest
      notes.push({
        id: `pdf-digest-${parsed.stdNumber}-${subj.id}-ch${cIdx + 1}`,
        subjectId: subj.id,
        subjectTitle: subj.title,
        chapterTitle: chap,
        chapterNumber: cIdx + 1,
        publication: 'Navneet Digest',
        edition: '2026-2027 Official Digest Edition',
        title: `${chap} — Navneet Digest Master Solutions & Q&A`,
        fileSize: `${(3.1 + ((cIdx % 4) * 0.5)).toFixed(1)} MB`,
        pageCount: 26 + (cIdx % 6) * 2,
        downloadCount: 9200 + (cIdx * 410) % 18000,
        rating: 4.8,
        topicsCovered: [
          `Textbook Question-by-Question complete solved answers`,
          `Fill in the Blanks, True/False and Match the Following`,
          `Short Answer Questions & Long Descriptive Answers`,
          `Higher Order Thinking Skills (HOTS) Questions`
        ],
        keyHighlights: [
          `Official Digest solutions trusted by top educators across Maharashtra & India`,
          `Point-wise answers written in simple, easily memorizable language`,
          `Grammar, vocabulary and numerical worksheets included`
        ],
        pdfPreviewExcerpt: {
          chapterIntroduction: `Navneet Digest for ${chap} provides complete, reliable answers to all textbook exercise questions along with extra practice questions for thorough exam readiness in ${parsed.stdLabel}.`,
          keyFormulasOrDefinitions: [
            {
              term: `Digest Summary: ${chap}`,
              explanation: `Comprehensive memory summary of all essential rules, terms and formulas for ${chap}.`
            }
          ],
          boardModelQuestions: [
            {
              q: `Write short notes on ${chap} explaining the core mechanism.`,
              a: `Navneet Digest Model Answer: 1. Core definition with scientific accuracy. 2. Characteristic features and structural properties. 3. Illustrative diagram and practical significance.`,
              marks: 3
            }
          ],
          topperStudyAdvice: `Digest Advice: Memorize the point-wise answers directly from the digest to write answers swiftly during terminal exams.`
        }
      });
    });
  });

  return notes;
}

// 4. Dynamic Subject Bundles for Study Library
export function getSubjectBundlesForUser(stdInput?: string, boardInput?: string, studyingInput?: string): SubjectBundlePdf[] {
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const bundles: SubjectBundlePdf[] = [];

  catalog.forEach((subj) => {
    const chapters = subj.sections.flatMap(sec => sec.chapters);
    const count = chapters.length;

    bundles.push({
      id: `bundle-target-${parsed.stdNumber}-${subj.id}`,
      subjectId: subj.id,
      subjectTitle: subj.title,
      publication: 'Target Publications',
      bundleTitle: `${subj.title} — Complete Target Master Bundle (All ${count} Chapters)`,
      totalChapters: count,
      totalPageCount: count * 24,
      fileSize: `${(count * 2.6).toFixed(1)} MB`,
      description: `Complete all-in-one PDF compendium containing Target Perfect Notes for every single chapter in ${subj.title} (${parsed.stdLabel}, ${parsed.board}).`
    });

    bundles.push({
      id: `bundle-digest-${parsed.stdNumber}-${subj.id}`,
      subjectId: subj.id,
      subjectTitle: subj.title,
      publication: 'Navneet Digest',
      bundleTitle: `${subj.title} — Complete Navneet Digest Bundle (All ${count} Chapters Solved)`,
      totalChapters: count,
      totalPageCount: count * 28,
      fileSize: `${(count * 3.1).toFixed(1)} MB`,
      description: `Official Navneet Digest complete syllabus textbook solution bundle for ${subj.title} with 100% verified model answers.`
    });
  });

  return bundles;
}

// 5. Dynamic 20-Mark Chapter Mock Papers for Test & Quiz
export function getMockPapersForUser(stdInput?: string, boardInput?: string, studyingInput?: string): ChapterMockPaper20M[] {
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const papers: ChapterMockPaper20M[] = [];

  catalog.forEach((subj) => {
    const chapters = subj.sections.flatMap(sec => sec.chapters);

    chapters.forEach((chap, cIdx) => {
      papers.push({
        id: `mock-20m-${parsed.stdNumber}-${subj.id}-ch${cIdx + 1}`,
        subjectId: subj.id,
        subjectTitle: subj.title,
        chapterTitle: chap,
        chapterNumber: cIdx + 1,
        setName: 'Set A',
        setFocus: `Standard ${parsed.board} Core Curriculum & Solutions`,
        difficulty: 'Standard Board Level',
        totalMarks: 20,
        durationMinutes: 45,
        assignedTeacher: {
          name: 'Prof. Anant Kulkarni',
          role: `Senior ${subj.title} Moderator (${parsed.board})`,
          avatarInitials: 'AK'
        },
        instructions: [
          `All questions are compulsory and based on ${parsed.board} curriculum for ${parsed.stdLabel}.`,
          `Draw neat labeled diagrams / show step-by-step mathematical calculations wherever necessary.`,
          `Write your final answers clearly; write the proper question sub-number.`
        ],
        sections: [
          {
            sectionTitle: 'Section A: Objective & Very Short Answers',
            sectionMarks: 4,
            questions: [
              {
                qNumber: 'Q.1 (A)',
                questionText: `Choose the correct alternative for the fundamental property of ${chap}.`,
                marks: 2,
                options: [
                  `Option A: Direct proportional relationship conforming to ${chap} principles`,
                  `Option B: Inverse squared variance under standard temperature/pressure`,
                  `Option C: Neutral invariant constant throughout the physical process`,
                  `Option D: None of the above`
                ],
                modelAnswer: `Answer: Option A — Direct proportional relationship conforming to ${chap} principles based on ${parsed.board} curriculum.`
              },
              {
                qNumber: 'Q.1 (B)',
                questionText: `Answer in one sentence: State the core definition of ${chap}.`,
                marks: 2,
                modelAnswer: `The core definition of ${chap} states the fundamental scientific/mathematical relationship governing its phenomena in accordance with ${parsed.board} textbook standards.`
              }
            ]
          },
          {
            sectionTitle: 'Section B: Short Answer Questions (Attempt Any 2)',
            sectionMarks: 6,
            questions: [
              {
                qNumber: 'Q.2 (1)',
                questionText: `Give scientific / mathematical reasons for the primary behavior observed in ${chap}.`,
                marks: 3,
                modelAnswer: `Point 1: State the initial cause and physical law.\nPoint 2: Elaborate the underlying mechanism with step-wise explanation.\nPoint 3: Conclude with the practical outcome scoring full 3 marks.`
              },
              {
                qNumber: 'Q.2 (2)',
                questionText: `Solve the numerical / descriptive problem based on ${chap}.`,
                marks: 3,
                modelAnswer: `Given data noted clearly with proper SI units. Formula applied: Standard Formula. Substitution of values and final computed answer in rectangular box.`
              }
            ]
          },
          {
            sectionTitle: 'Section C: Long Answer & Diagram / Proof (Attempt Any 2)',
            sectionMarks: 10,
            questions: [
              {
                qNumber: 'Q.3 (1)',
                questionText: `Explain in detail the complete derivation / process of ${chap} with a neat labeled diagram.`,
                marks: 5,
                modelAnswer: `1. Comprehensive definition and context.\n2. Schematic sketch with 4 essential right-aligned labels.\n3. Step-by-step 4-point mechanism explanation.\n4. Practical significance and board examiner key points.`
              },
              {
                qNumber: 'Q.3 (2)',
                questionText: `Analyze the case scenario and deduce the theoretical outcomes related to ${chap}.`,
                marks: 5,
                modelAnswer: `Detailed structured answer framing covering cause, equations, result, and conclusive remarks.`
              }
            ]
          }
        ]
      });
    });
  });

  return papers;
}

// 6. Dynamic Viva Voice Interactive Questions
export function getVivaQuestionsForUser(stdInput?: string, boardInput?: string, studyingInput?: string): VivaQuestionItem[] {
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const vivaList: VivaQuestionItem[] = [];

  catalog.forEach((subj) => {
    const chapters = subj.sections.flatMap(sec => sec.chapters);

    chapters.slice(0, 3).forEach((chap, cIdx) => {
      vivaList.push({
        id: `viva-${parsed.stdNumber}-${subj.id}-${cIdx + 1}`,
        subjectId: subj.id,
        subjectTitle: subj.title,
        chapterTitle: chap,
        questionNumber: cIdx + 1,
        questionText: `What is the core principle of "${chap}" and how is it derived or applied according to ${parsed.board}?`,
        examinerPrompt: `Candidate, please state the fundamental concept behind "${chap}" and explain its applications clearly.`,
        expectedKeywords: [chap.toLowerCase(), 'principle', 'formula', 'concept', 'derivation', 'application'],
        modelAnswer: `In ${chap}, the fundamental principle establishes how key concepts operate. In practice, this allows us to compute values, analyze patterns, and construct systematic proofs in accordance with the ${parsed.board} curriculum.`,
        evaluationCriteria: `Clear explanation of ${chap}, standard formula usage, and articulate reasoning.`,
        marks: 5
      });
    });
  });

  return vivaList;
}

// 7. Dynamic Board Question Papers
export function getBoardPapersForUser(stdInput?: string, boardInput?: string, studyingInput?: string): BoardQuestionPaperItem[] {
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const papers: BoardQuestionPaperItem[] = [];

  const years = ['March 2026', 'July 2025', 'March 2025', 'March 2024'];

  catalog.forEach((subj) => {
    years.forEach((yr, yIdx) => {
      papers.push({
        id: `bp-${parsed.stdNumber}-${subj.id}-${yIdx + 1}`,
        subjectId: subj.id,
        subjectTitle: subj.title,
        paperTitle: `${subj.title} — ${yr} Official ${parsed.board} Exam Paper`,
        yearPattern: `${yr} Pattern`,
        duration: parsed.stdNumber >= 11 ? '3 Hours' : '2 Hours',
        totalMarks: parsed.stdNumber >= 11 ? 70 : 40,
        instructions: [
          'All questions are compulsory.',
          'Figures to the right indicate full marks.',
          'Draw neat diagrams wherever necessary.'
        ],
        sections: [
          {
            sectionTitle: 'Section A: Objective Questions',
            sectionMarks: parsed.stdNumber >= 11 ? 14 : 10,
            questions: [
              {
                qNumber: 'Q.1 (A)',
                questionText: `Choose the correct alternative for the fundamental property of ${subj.title}.`,
                marks: 1,
                options: ['Option A (Standard)', 'Option B', 'Option C', 'Option D'],
                modelAnswer: 'Answer: (A) Correct standard definition.'
              }
            ]
          },
          {
            sectionTitle: 'Section B: Short & Long Answer Questions',
            sectionMarks: parsed.stdNumber >= 11 ? 56 : 30,
            questions: [
              {
                qNumber: 'Q.2 (A)',
                questionText: `Explain with steps the core theorem and practical significance in ${subj.title}.`,
                marks: 3,
                modelAnswer: `Step-by-step derivation and diagrammatic explanation based on standard ${parsed.board} textbook.`
              }
            ]
          }
        ]
      });
    });
  });

  return papers;
}

// 8. Dynamic Full-Length Mock Prelim Tests
export function getMockTestsForUser(stdInput?: string, boardInput?: string, studyingInput?: string): MockTestItem[] {
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const mocks: MockTestItem[] = [];

  catalog.forEach((subj) => {
    const chapters = subj.sections.flatMap(s => s.chapters);
    mocks.push({
      id: `mock-full-${parsed.stdNumber}-${subj.id}-1`,
      subjectId: subj.id,
      subjectTitle: subj.title,
      testTitle: `${subj.title} — Grand Prelim Mock Test 1`,
      chapterCoverage: chapters.slice(0, 4).join(', ') || 'All Chapters',
      durationMinutes: parsed.stdNumber >= 11 ? 180 : 120,
      totalQuestions: 10,
      questions: chapters.slice(0, 5).map((ch, idx) => ({
        id: `q-${parsed.stdNumber}-${subj.id}-${idx + 1}`,
        question: `In ${subj.title}, regarding the topic "${ch}", which of the following is correct?`,
        options: [
          `Fundamental property of ${ch}`,
          `Inverse application under ambient conditions`,
          `Constant ratio irrespective of parameters`,
          `None of the above`
        ],
        correctIndex: 0,
        explanation: `As detailed in the ${parsed.board} syllabus for ${ch}, the fundamental property directly applies.`,
        marks: 2
      }))
    });
  });

  return mocks;
}

// 9. Dynamic Teacher Submissions & Evaluated Answer Sheets
export function getTeacherSubmissionsForUser(stdInput?: string, boardInput?: string, studyingInput?: string): TeacherAnswerSubmission[] {
  const catalog = getSubjectCatalogForUser(stdInput, boardInput, studyingInput);
  const parsed = parseStudentGrade(stdInput, boardInput, studyingInput);
  const submissions: TeacherAnswerSubmission[] = [];

  const teachers = [
    { name: 'Dr. Ramesh Deshmukh', designation: `Senior Examiner (${parsed.board})` },
    { name: 'Prof. Anant Kulkarni', designation: 'Mathematics HOD & Board Evaluator' },
    { name: 'Smt. Madhuri Joshi', designation: 'Language Department Head' }
  ];

  catalog.slice(0, 4).forEach((subj, sIdx) => {
    const chapters = subj.sections.flatMap(sec => sec.chapters);
    const chap = chapters[0] || subj.title;
    const teacher = teachers[sIdx % teachers.length];
    const score = 18 + (sIdx % 3);

    submissions.push({
      id: `sub-${parsed.stdNumber}-${subj.id}-1`,
      paperId: `mock-20m-${parsed.stdNumber}-${subj.id}-ch1`,
      subjectId: subj.id,
      chapterTitle: chap,
      setName: 'Set A',
      studentName: 'Shivtej Pol',
      submittedAt: 'Sept 23, 2026 • 04:30 PM',
      pdfFileName: `Shivtej_Pol_${subj.id.toUpperCase()}_Ch1_Solved.pdf`,
      fileSizeStr: '3.2 MB',
      status: 'evaluated',
      evaluation: {
        teacherName: teacher.name,
        teacherRole: teacher.designation,
        marksAwarded: score,
        totalMarks: 20,
        percentage: Math.round((score / 20) * 100),
        grade: score >= 19 ? 'A+ (Distinction)' : 'A (First Class)',
        overallRemark: `Outstanding presentation on ${chap}! Answers conform perfectly to ${parsed.board} rubrics. Keep up the high standard of work.`,
        questionWiseMarks: [
          { qNumber: 'Q.1', awarded: 4, max: 4, remark: 'Full marks in MCQs and definitions' },
          { qNumber: 'Q.2', awarded: score >= 19 ? 6 : 5, max: 6, remark: 'Well structured cause-and-effect reasoning' },
          { qNumber: 'Q.3', awarded: score >= 19 ? 5.5 : 5, max: 6, remark: 'Clean steps and derivation' },
          { qNumber: 'Q.4', awarded: score >= 19 ? 3.5 : 3.5, max: 4, remark: 'Precise final statement with units' }
        ],
        handwritingPresentationAdvice: 'Maintain exact same margin width on all pages of the answer script.',
        signedAt: 'Sept 24, 2026 • 11:15 AM • Verified Board Signature'
      }
    });
  });

  return submissions;
}

