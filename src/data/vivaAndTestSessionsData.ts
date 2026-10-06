export interface VivaQuestionItem {
  id: string;
  subjectId: string;
  subjectTitle: string;
  chapterTitle: string;
  questionNumber: number;
  questionText: string;
  examinerPrompt: string; // Text spoken by AI examiner
  expectedKeywords: string[];
  modelAnswer: string;
  evaluationCriteria: string;
  marks: number;
}

export interface BoardQuestionPaperItem {
  id: string;
  subjectId: string;
  subjectTitle: string;
  paperTitle: string;
  yearPattern: string;
  duration: string;
  totalMarks: number;
  instructions: string[];
  sections: {
    sectionTitle: string;
    sectionMarks: number;
    questions: {
      qNumber: string;
      questionText: string;
      marks: number;
      options?: string[];
      modelAnswer: string;
    }[];
  }[];
}

export interface MockTestItem {
  id: string;
  subjectId: string;
  subjectTitle: string;
  testTitle: string;
  chapterCoverage: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    marks: number;
  }[];
}

// =========================================================================
// 1. VIVA QUESTIONS CATALOG (WITH ORAL SPEECH & KEYWORD EVALUATION)
// =========================================================================
export const VIVA_QUESTIONS_LIST: VivaQuestionItem[] = [
  // 🔬 Science 1 Viva
  {
    id: 'viva-sci1-1',
    subjectId: 'sci1',
    subjectTitle: 'Science & Technology 1',
    chapterTitle: 'Gravitation',
    questionNumber: 1,
    questionText: 'State Kepler\'s Third Law of planetary motion and mention its mathematical formula.',
    examinerPrompt: 'Candidate, please state Kepler\'s Third Law of planetary motion and explain its mathematical formula clearly.',
    expectedKeywords: ['square', 'orbital period', 'cube', 'mean distance', 'semi-major axis', 'proportional', 'T^2', 'r^3', 'constant'],
    modelAnswer: 'Kepler\'s Third Law (Law of Periods) states that the square of the orbital period of revolution of a planet around the Sun is directly proportional to the cube of the mean distance of the planet from the Sun. Mathematically, T² ∝ r³ or T²/r³ = constant (k).',
    evaluationCriteria: 'Must mention square of period of revolution, cube of mean distance/radius, and constant ratio.',
    marks: 5
  },
  {
    id: 'viva-sci1-2',
    subjectId: 'sci1',
    subjectTitle: 'Science & Technology 1',
    chapterTitle: 'Gravitation',
    questionNumber: 2,
    questionText: 'Explain the difference between mass and weight. Can weight be zero?',
    examinerPrompt: 'Explain the fundamental differences between mass and weight. Under what conditions does weight become zero?',
    expectedKeywords: ['matter', 'force', 'gravity', 'constant', 'varies', 'zero', 'free fall', 'space', 'kilogram', 'newton'],
    modelAnswer: 'Mass is the amount of matter present in an object. It is a scalar quantity, measured in kilograms (kg), and remains constant everywhere in the universe. Weight is the gravitational force exerted by the Earth on the object (W = m·g). It is a vector quantity, measured in Newtons (N), and varies with acceleration due to gravity (g). Weight can be zero during free fall or in deep space where g is zero.',
    evaluationCriteria: 'Clear contrast between scalar vs vector, kg vs Newton, constancy of mass and zero weight during free fall.',
    marks: 5
  },
  {
    id: 'viva-sci1-3',
    subjectId: 'sci1',
    subjectTitle: 'Science & Technology 1',
    chapterTitle: 'Periodic Classification of Elements',
    questionNumber: 3,
    questionText: 'State the Modern Periodic Law and explain how atomic radius varies across a period from left to right.',
    examinerPrompt: 'State the Modern Periodic Law and explain why atomic radius decreases as we go from left to right across a period.',
    expectedKeywords: ['atomic number', 'properties', 'periodic function', 'nuclear charge', 'electrons', 'same shell', 'pull', 'decreases'],
    modelAnswer: 'The Modern Periodic Law states that "Properties of elements are a periodic function of their atomic numbers." Across a period from left to right, the atomic radius decreases because positive nuclear charge increases by one unit with each successive element while electrons are added to the same outermost shell. The increased nuclear attraction pulls the electrons closer to the nucleus.',
    evaluationCriteria: 'Must cite atomic number (Moseley) and nuclear charge pulling electrons inward in the same shell.',
    marks: 5
  },

  // 🧬 Science 2 Viva
  {
    id: 'viva-sci2-1',
    subjectId: 'sci2',
    subjectTitle: 'Science & Technology 2',
    chapterTitle: 'Life Processes in Living Organisms — Part 1',
    questionNumber: 1,
    questionText: 'Describe the process of Glycolysis. Where does it take place in the cell and what are the end products?',
    examinerPrompt: 'Candidate, describe the process of Glycolysis. In which part of the cell does it occur, and what molecules are produced?',
    expectedKeywords: ['cytoplasm', 'glucose', 'pyruvic acid', 'pyruvate', 'atp', 'nadh2', 'water', 'anaerobic'],
    modelAnswer: 'Glycolysis (also called the EMP pathway) occurs in the cytoplasm of the cell. During this step, one molecule of glucose (6-carbon) is oxidized stepwise to produce two molecules each of pyruvic acid, ATP, NADH₂, and water (H₂O). It does not require oxygen directly and is common to both aerobic and anaerobic respiration.',
    evaluationCriteria: 'Mentions cytoplasm location, 1 glucose yielding 2 pyruvic acid, 2 ATP, and 2 NADH2 molecules.',
    marks: 5
  },
  {
    id: 'viva-sci2-2',
    subjectId: 'sci2',
    subjectTitle: 'Science & Technology 2',
    chapterTitle: 'Heredity and Evolution',
    questionNumber: 2,
    questionText: 'What are vestigial organs? Name three vestigial organs found in the human body.',
    examinerPrompt: 'What do you understand by vestigial organs? Name at least three vestigial organs present in the human body.',
    expectedKeywords: ['degenerated', 'underdeveloped', 'useless', 'functional', 'appendix', 'wisdom teeth', 'tail bone', 'coccyx', 'ear muscles', 'pinna'],
    modelAnswer: 'Vestigial organs are degenerated or underdeveloped, useless organs of organisms that were functional in ancestors or are functional in other related animals. Three vestigial organs in humans are: 1. Appendix (functional for cellulose digestion in ruminants), 2. Tail bone (Coccyx), 3. Wisdom teeth, and 4. Muscles of ear pinna.',
    evaluationCriteria: 'Defines non-functional/degenerated organs and correctly lists at least three examples in humans.',
    marks: 5
  },

  // 🧮 Mathematics Part 1 Viva
  {
    id: 'viva-math1-1',
    subjectId: 'math1',
    subjectTitle: 'Mathematics Part 1 (Algebra)',
    chapterTitle: 'Linear Equations in Two Variables',
    questionNumber: 1,
    questionText: 'Explain Cramer\'s Rule for solving a pair of linear equations in two variables.',
    examinerPrompt: 'Explain how you evaluate the determinants D, Dx, and Dy to solve a system of linear equations using Cramer\'s Rule.',
    expectedKeywords: ['determinant', 'cramer', 'dx', 'dy', 'coefficients', 'x = dx/d', 'y = dy/d', 'd not equal to zero'],
    modelAnswer: 'In Cramer\'s Rule for equations a₁x + b₁y = c₁ and a₂x + b₂y = c₂: First, calculate determinant D formed by coefficients of x and y: D = |a₁ b₁; a₂ b₂|. Then Dx is obtained by replacing x-coefficients with constants c₁ and c₂. Dy is obtained by replacing y-coefficients with constants. If D ≠ 0, the unique solution is x = Dx/D and y = Dy/D.',
    evaluationCriteria: 'Explains formation of D, Dx, Dy determinants and states formulas x = Dx/D and y = Dy/D with D ≠ 0.',
    marks: 5
  },
  {
    id: 'viva-math1-2',
    subjectId: 'math1',
    subjectTitle: 'Mathematics Part 1 (Algebra)',
    chapterTitle: 'Quadratic Equations',
    questionNumber: 2,
    questionText: 'What is the Discriminant (Δ) of a quadratic equation and how does it determine the nature of roots?',
    examinerPrompt: 'Define the Discriminant of a quadratic equation. State the three conditions that determine the nature of its roots.',
    expectedKeywords: ['b^2 - 4ac', 'delta', 'discriminant', 'real and equal', 'real and unequal', 'not real', 'greater than zero', 'zero', 'negative'],
    modelAnswer: 'For ax² + bx + c = 0, the Discriminant is Δ = b² - 4ac. Nature of roots: 1. If Δ = 0, the roots are real and equal. 2. If Δ > 0, the roots are real and unequal. 3. If Δ < 0, the roots are not real (complex).',
    evaluationCriteria: 'States b² - 4ac formula and all three cases (equal, unequal, not real).',
    marks: 5
  },

  // 📐 Mathematics Part 2 Viva
  {
    id: 'viva-math2-1',
    subjectId: 'math2',
    subjectTitle: 'Mathematics Part 2 (Geometry)',
    chapterTitle: 'Similarity',
    questionNumber: 1,
    questionText: 'State the Basic Proportionality Theorem (Thales Theorem).',
    examinerPrompt: 'State the statement of the Basic Proportionality Theorem clearly.',
    expectedKeywords: ['line', 'parallel', 'one side', 'intersects', 'distinct points', 'divides', 'same ratio', 'triangle'],
    modelAnswer: 'Basic Proportionality Theorem states: "If a line parallel to a side of a triangle intersects the remaining two sides in two distinct points, then the line divides the sides in the same ratio." If line l is parallel to side BC in ΔABC intersecting AB at P and AC at Q, then AP/PB = AQ/QC.',
    evaluationCriteria: 'Accurate formal statement of BPT with parallel line and equal proportion.',
    marks: 5
  },
  {
    id: 'viva-math2-2',
    subjectId: 'math2',
    subjectTitle: 'Mathematics Part 2 (Geometry)',
    chapterTitle: 'Pythagoras Theorem',
    questionNumber: 2,
    questionText: 'State the Geometric Mean Theorem in a right-angled triangle.',
    examinerPrompt: 'Candidate, state the Geometric Mean Property of an altitude drawn to the hypotenuse in a right-angled triangle.',
    expectedKeywords: ['altitude', 'perpendicular', 'hypotenuse', 'geometric mean', 'segments', 'right angled triangle', 'qs^2 = ps * sr'],
    modelAnswer: 'In a right-angled triangle, the perpendicular segment drawn to the hypotenuse from the opposite vertex is the geometric mean of the segments into which the hypotenuse is divided. In ΔPQR with ∠Q = 90° and QS ⊥ PR, QS² = PS × SR, so QS is the geometric mean of PS and SR.',
    evaluationCriteria: 'Specifies perpendicular from right angle to hypotenuse and geometric mean formula.',
    marks: 5
  },

  // 📖 English Viva
  {
    id: 'viva-eng-1',
    subjectId: 'eng',
    subjectTitle: 'English (Kumarbharati)',
    chapterTitle: 'Where the Mind is Without Fear',
    questionNumber: 1,
    questionText: 'What is the poet Rabindranath Tagore\'s prayer for his country in \'Where the Mind is Without Fear\'?',
    examinerPrompt: 'Candidate, summarize Rabindranath Tagore\'s vision and prayer for his country in the poem \'Where the Mind is Without Fear\'.',
    expectedKeywords: ['freedom', 'knowledge is free', 'fearless', 'truth', 'reason', 'dead habit', 'heaven of freedom', 'dignity', 'tagore'],
    modelAnswer: 'Rabindranath Tagore prays to God for an awakened, fearless nation where knowledge is accessible to all without discrimination. He dreams of a country not broken into fragments by narrow domestic walls (caste, creed, religion), where people speak the truth from the depths of their hearts, where clear reason is not lost in dead superstitions, and where the mind is led forward into ever-widening thought and action.',
    evaluationCriteria: 'Highlights freedom from fear, knowledge is free, reason over superstition, and heaven of freedom.',
    marks: 5
  },

  // 🏛️ History & Political Science Viva
  {
    id: 'viva-hist-1',
    subjectId: 'hist',
    subjectTitle: 'History & Political Science',
    chapterTitle: 'Historiography — Development in the West',
    questionNumber: 1,
    questionText: 'Who was Karl Marx? Briefly explain his class theory of history.',
    examinerPrompt: 'Who was Karl Marx and what was his fundamental theory regarding class struggle in history?',
    expectedKeywords: ['das kapital', 'class struggle', 'means of production', 'economic', 'bourgeoisie', 'proletariat', 'exploitation', 'material'],
    modelAnswer: 'Karl Marx was an influential 19th-century German philosopher and historian who wrote Das Kapital. According to Marx, history is not about abstract ideas; it is the history of class struggle. Human history is defined by the relationships people have with the means of production. The dominant social class that controls the means of production economically exploits the subordinate class.',
    evaluationCriteria: 'Cites Das Kapital, relationship to means of production, and class struggle/exploitation.',
    marks: 5
  },

  // 🌍 Geography Viva
  {
    id: 'viva-geo-1',
    subjectId: 'geo',
    subjectTitle: 'Geography',
    chapterTitle: 'Physiography and Drainage',
    questionNumber: 1,
    questionText: 'Explain the physiological and drainage differences between the Western Ghats and Eastern Ghats in India.',
    examinerPrompt: 'Explain the key differences between the Western Ghats and Eastern Ghats of India regarding continuity and river drainage.',
    expectedKeywords: ['western ghats', 'eastern ghats', 'continuous', 'discontinuous', 'higher elevation', 'arabian sea', 'bay of bengal', 'godavari', 'krishna'],
    modelAnswer: 'The Western Ghats (Sahyadri) run parallel to the western coast; they are continuous, have a higher average elevation (900-1600m), and can only be crossed through passes like Thal Ghat and Bhor Ghat. The Eastern Ghats are discontinuous, irregular, and dissected by major east-flowing rivers (Godavari, Krishna, Mahanadi, Kaveri) draining into the Bay of Bengal.',
    evaluationCriteria: 'Contrasts continuous vs discontinuous, elevation differences, and drainage directions.',
    marks: 5
  },
  // ==========================================
  // 📚 मराठी (कुमारभारती / अक्षरभारती) मौखिक परीक्षा (VIVA VOCE)
  // ==========================================
  {
    id: 'viva-mar-1',
    subjectId: 'mar',
    subjectTitle: 'मराठी (अक्षरभारती / कुमारभारती)',
    chapterTitle: 'तू बुद्धी दे — प्रार्थना',
    questionNumber: 1,
    questionText: 'ग. दि. माडगूळकर यांच्या \'तू बुद्धी दे\' या प्रार्थनेतून कवी परमेश्वराकडे कोणती महत्त्वाची मागणी करतात?',
    examinerPrompt: 'विद्यार्थी मित्रा, \'तू बुद्धी दे\' या प्रार्थनेतून कवी परमेश्वराकडे कोणती महत्त्वाची मागणी करतात ते स्पष्ट करा.',
    expectedKeywords: ['सत्याची वाट', 'सद्बुद्धी', 'सन्मार्ग', 'ज्ञानाची ज्योत', 'सामर्थ्य', 'कवितेचा संदेश'],
    modelAnswer: 'कवी ग. दि. माडगूळकर परमेश्वराकडे सत्य, न्याय आणि सन्मार्गावर चालण्याची बुद्धी, दुबळ्यांना आधार देण्याचे सामर्थ्य आणि अखंड ज्ञानज्योत तेवत ठेवण्याची मागणी करतात.',
    evaluationCriteria: 'कवितेतील मुख्य विचार, सन्मार्ग व बुद्धीची मागणी या मुद्द्यांचे स्पष्टीकरण.',
    marks: 5
  },
  {
    id: 'viva-mar-2',
    subjectId: 'mar',
    subjectTitle: 'मराठी (अक्षरभारती / कुमारभारती)',
    chapterTitle: 'शाल',
    questionNumber: 2,
    questionText: 'राग जाधव यांच्या \'शाल\' या पाठात शालीशी संबंधित कोणकोणते भावनिक संदर्भ आले आहेत?',
    examinerPrompt: 'राग जाधव यांच्या \'शाल\' या पाठात शालीशी संबंधित कोणकोणते भावनिक संदर्भ आले आहेत ते सांगा.',
    expectedKeywords: ['पुल देशपांडे', 'सुनिताबाई', 'मच्छीमार बाई', 'शालीनता', 'गरजू', 'नारायण सुर्वे', 'संस्कार'],
    modelAnswer: 'पु. ल. देशपांडे यांनी दिलेली शाल ही लेखकासाठी आदराचे प्रतीक होती. कवी नारायण सुर्वे यांच्या शालीनतेचा संदर्भ आणि ओंकारेश्वर पुलावर थंडीने कुडकुडणाऱ्या म्हाताऱ्या भिक्षेकऱ्याला दिलेली शाल हे प्रसंग शालीचे औदार्य दर्शवतात.',
    evaluationCriteria: 'पु. ल. देशपांडे, नारायण सुर्वे व भिक्षेकऱ्याला दिलेल्या शालीचा संदर्भ.',
    marks: 5
  },
  // ==========================================
  // 📝 हिन्दी (लोकभारती) मौखिक परीक्षा (VIVA VOCE)
  // ==========================================
  {
    id: 'viva-hin-1',
    subjectId: 'hin',
    subjectTitle: 'हिन्दी (लोकभारती)',
    chapterTitle: 'भारत महिमा — कविता',
    questionNumber: 1,
    questionText: 'जयशंकर प्रसाद जी ने \'भारत महिमा\' कविता में भारतवासियों के किन-किन उदात्त गुणों का वर्णन किया है?',
    examinerPrompt: 'प्रिय विद्यार्थी, जयशंकर प्रसाद जी की \'भारत महिमा\' कविता में भारतवासियों के किन-किन मानवीय व सांस्कृतिक गुणों का वर्णन है, मुखर रूप से बताइए।',
    expectedKeywords: ['ज्ञान', 'दानशीलता', 'सत्य', 'अतिथि देवो भव', 'त्याग', 'चरित्र', 'हृदय का तेज'],
    modelAnswer: 'कवि के अनुसार भारतवासी ज्ञान के प्रथम प्रसारक हैं। उनके हृदय में दानशीलता, वाणी में सत्य, भुजाओं में शक्ति और चरित्र में पवित्रता सदैव विद्यमान रही है। अतिथि को देवतुल्य माना गया है।',
    evaluationCriteria: 'भारतीय संस्कृति, सत्य, दानशीलता एवं अतिथि सत्कार के मूल्यों की मौखिक अभिव्यक्ति।',
    marks: 5
  },
  {
    id: 'viva-hin-2',
    subjectId: 'hin',
    subjectTitle: 'हिन्दी (लोकभारती)',
    chapterTitle: 'लक्ष्मी — संवादात्मक पाठ',
    questionNumber: 2,
    questionText: 'गुरू दयाल सिंह रचित \'लक्ष्मी\' पाठ में करामत अली और गाय के बीच के भावनात्मक संबंध को स्पष्ट कीजिए।',
    examinerPrompt: 'गुरू दयाल सिंह रचित \'लक्ष्मी\' पाठ में करामत अली और गाय के बीच के आत्मीय व संवेदनशील संबंध को अपने शब्दों में व्यक्त कीजिए।',
    expectedKeywords: ['गौसेवा', 'आत्मीयता', 'संवेदना', 'चारा', 'मारपीट', 'गौशाला', 'पशु प्रेम'],
    modelAnswer: 'करामत अली बूढ़ी और दूध न देने वाली गाय लक्ष्मी को परिवार का सदस्य मानते थे। आर्थिक तंगी के बावजूद वे उसे बेचना या कसाईखाने भेजना पाप समझते थे, जिससे उनका मूक पशु के प्रति अगाध प्रेम प्रकट होता है।',
    evaluationCriteria: 'पशु प्रेम, करामत अली का भावनात्मक जुड़ाव और संवेदनशीलता का प्रतिपादन।',
    marks: 5
  },
  // ==========================================
  // 🕉️ संस्कृतम् (आमोदः / आनन्दः) मौखिक परीक्षा (VIVA VOCE)
  // ==========================================
  {
    id: 'viva-san-1',
    subjectId: 'sanskrit',
    subjectTitle: 'संस्कृतम् (आमोदः / आनन्दः)',
    chapterTitle: 'आद्यकृषकः पृथुवैन्यः',
    questionNumber: 1,
    questionText: 'राजा पृथुवैन्यः भूमौ कृषि-व्यवस्थायाः आरम्भं कथं कृतवान्? तस्य मुख्यं योगदानं किम्?',
    examinerPrompt: 'भो छात्र, \'आद्यकृषकः पृथुवैन्यः\' इति पाठाधारेण राजा पृथुः भूमौ कृषिकार्यस्य आरम्भं कथं कृतवान् इति संक्षेपेण वदतु।',
    expectedKeywords: ['पृथुवैन्यः', 'कृषिकार्यम्', 'बीजबीजनम्', 'जलव्यवस्थापनम्', 'भूम्याः समतलीकरणम्', 'धनधान्यम्'],
    modelAnswer: 'राजा पृथुवैन्यः पर्वतान् भित्त्वा भूमिं समां कृतवान्। ततः वृष्टिजलं सङ्गृह्य जलव्यवस्थापनं अकरोत्, बीजानां संस्कारं कृत्वा वपनं अकरोत्। अतः सः पृथिव्याः प्रथमः कृषकः मन्यते।',
    evaluationCriteria: 'संस्कृतवाक्यरचना, भूमिसमतलीकरणं, जलव्यवस्थापनं तथा आद्यकृषकत्वस्य महत्त्वम्।',
    marks: 5
  },
  {
    id: 'viva-san-2',
    subjectId: 'sanskrit',
    subjectTitle: 'संस्कृतम् (आमोदः / आनन्दः)',
    chapterTitle: 'व्यसने मित्रपरीक्षा',
    questionNumber: 2,
    questionText: 'हितोपदेशस्य कथायाम् आपत्काले कः सत्यं मित्रम् इति काक-मृग-शृगालानां प्रसङ्गेन प्रतिपादयतु।',
    examinerPrompt: 'हितोपदेशस्य \'व्यसने मित्रपरीक्षा\' इति कथायां सत्यमित्रस्य लक्षणं किम् उल्लिखितम् इति वदतु।',
    expectedKeywords: ['व्यसने मित्रपरीक्षा', 'सत्यमित्रम्', 'काकः', 'मृगः', 'शृगालः', 'हितोपदेशः', 'संकटे सहाय्यम्'],
    modelAnswer: 'आपत्काले यः साहाय्यं करोति स एव वास्तविकं मित्रम्। शृगालः स्वार्थाय मित्रतां कृतवान् किन्तु काकः स्वबुद्ध्या मृगस्य प्राणरक्षणम् अकरोत्। अतः संकटे एव मित्रपरीक्षा भवति।',
    evaluationCriteria: 'सत्यमित्रस्य लक्षणम्, काकस्य निस्वार्थं साहाय्यं तथा शृगालस्य धूर्तता।',
    marks: 5
  }
];

// =========================================================================
// 2. FULL BOARD QUESTION PAPERS CATALOG
// =========================================================================
export const BOARD_QUESTION_PAPERS_LIST: BoardQuestionPaperItem[] = [
  {
    id: 'paper-sci1-2025',
    subjectId: 'sci1',
    subjectTitle: 'Science & Technology 1',
    paperTitle: 'SSC Board Model Question Paper — Science & Technology Part 1',
    yearPattern: 'Latest Maharashtra Board Pattern (2025–26)',
    duration: '2 Hours',
    totalMarks: 40,
    instructions: [
      'All questions are compulsory.',
      'Use of calculator is not allowed.',
      'Draw neat, labeled diagrams wherever necessary.',
      'For Q.1(A) MCQs, write only the question sub-number and correct alphabet (e.g., 1 - A).'
    ],
    sections: [
      {
        sectionTitle: 'Q.1 (A) Choose the correct alternative (5 Marks)',
        sectionMarks: 5,
        questions: [
          {
            qNumber: 'Q.1 (A) (1)',
            questionText: 'The value of acceleration due to gravity (g) at the center of the Earth is ______.',
            options: ['9.8 m/s²', '0 m/s²', '9.83 m/s²', 'infinity'],
            marks: 1,
            modelAnswer: 'Answer: (B) 0 m/s² [At the center of Earth, effective mass enclosed is zero, hence g = 0].'
          },
          {
            qNumber: 'Q.1 (A) (2)',
            questionText: 'According to Mendeleev\'s periodic law, properties of elements are a periodic function of their ______.',
            options: ['Atomic numbers', 'Atomic masses', 'Densities', 'Valencies'],
            marks: 1,
            modelAnswer: 'Answer: (B) Atomic masses.'
          },
          {
            qNumber: 'Q.1 (A) (3)',
            questionText: 'The SI unit of specific heat capacity is ______.',
            options: ['J/kg°C', 'cal/g°C', 'Joule', 'Calorie'],
            marks: 1,
            modelAnswer: 'Answer: (A) J/kg°C.'
          }
        ]
      },
      {
        sectionTitle: 'Q.2 (A) Give scientific reasons (Any 2 out of 3) (4 Marks)',
        sectionMarks: 4,
        questions: [
          {
            qNumber: 'Q.2 (A) (1)',
            questionText: 'Stars twinkle at night, but planets do not twinkle. Give reason.',
            marks: 2,
            modelAnswer: 'Reason: 1. Stars are point sources of light situated at immense distances. Light rays passing through continuously varying atmospheric refractive indices undergo continuous refraction and fluctuation in apparent brightness, causing twinkling. 2. Planets are much closer and act as extended collections of point sources. The average variation in total light entering the eye averages out to zero, hence planets do not twinkle.'
          },
          {
            qNumber: 'Q.2 (A) (2)',
            questionText: 'Elements belonging to the same group have the same valency. Give scientific reason.',
            marks: 2,
            modelAnswer: 'Reason: 1. Valency of an element is determined by the number of valence electrons in the outermost shell. 2. All elements in the same group possess the exact same number of valence electrons in their outermost shell, therefore they exhibit identical valency.'
          }
        ]
      },
      {
        sectionTitle: 'Q.3 Answer the following questions (Any 5 out of 8) (15 Marks)',
        sectionMarks: 15,
        questions: [
          {
            qNumber: 'Q.3 (1)',
            questionText: 'Derive the formula for escape velocity (v_esc) from the surface of the Earth.',
            marks: 3,
            modelAnswer: 'Step 1: Total energy on Earth\'s surface E₁ = KE + PE = 1/2·m·v_esc² - (G·M·m)/R. Step 2: At infinite distance, KE = 0 and PE = 0, so E₂ = 0. Step 3: By conservation of energy E₁ = E₂ ➔ 1/2·m·v_esc² = (G·M·m)/R ➔ v_esc = √(2GM/R) = √(2gR). For Earth, v_esc = 11.2 km/s.'
          },
          {
            qNumber: 'Q.3 (2)',
            questionText: 'Explain the construction and working of an electric motor with a neat labeled diagram.',
            marks: 3,
            modelAnswer: 'Construction: Armature coil ABCD placed between opposite poles of horseshoe magnet, split-ring commutator (P and Q), carbon brushes (X and Y), battery. Working: Fleming\'s Left-Hand Rule dictates forces on arms AB and CD in opposite directions creating a torque, rotating the coil continuously in one direction.'
          }
        ]
      }
    ]
  },
  {
    id: 'paper-math1-2025',
    subjectId: 'math1',
    subjectTitle: 'Mathematics Part 1 (Algebra)',
    paperTitle: 'SSC Board Model Question Paper — Mathematics Part 1 (Algebra)',
    yearPattern: 'Latest Maharashtra Board Pattern (2025–26)',
    duration: '2 Hours',
    totalMarks: 40,
    instructions: [
      'All questions are compulsory.',
      'Use of calculator is strictly prohibited.',
      'The numbers to the right of the questions indicate full marks.'
    ],
    sections: [
      {
        sectionTitle: 'Q.1 (A) Choose correct alternative (4 Marks)',
        sectionMarks: 4,
        questions: [
          {
            qNumber: 'Q.1 (A) (1)',
            questionText: 'To draw graph of 4x + 5y = 19, find y when x = 1.',
            options: ['4', '3', '2', '-3'],
            marks: 1,
            modelAnswer: '4(1) + 5y = 19 ➔ 5y = 19 - 4 = 15 ➔ y = 3. Answer: (B) 3.'
          },
          {
            qNumber: 'Q.1 (A) (2)',
            questionText: 'What is the degree of quadratic equation 3x² - 5x + 7 = 0?',
            options: ['1', '2', '3', '0'],
            marks: 1,
            modelAnswer: 'The highest index of the variable x is 2. Answer: (B) 2.'
          }
        ]
      },
      {
        sectionTitle: 'Q.2 (A) Complete any two activities (4 Marks)',
        sectionMarks: 4,
        questions: [
          {
            qNumber: 'Q.2 (A) (1)',
            questionText: 'Complete the activity to find the 19th term of the AP: 7, 13, 19, 25, ...',
            marks: 2,
            modelAnswer: 'Here a = 7, d = 13 - 7 = 6. Formula: tₙ = a + (n - 1)d ➔ t₁₉ = 7 + (19 - 1)×6 ➔ t₁₉ = 7 + 18×6 = 7 + 108 = 115.'
          }
        ]
      },
      {
        sectionTitle: 'Q.4 Solve challenging HOTS questions (Any 2 out of 3) (8 Marks)',
        sectionMarks: 8,
        questions: [
          {
            qNumber: 'Q.4 (1)',
            questionText: 'A two-digit number is 4 times the sum of its digits and 3 times the product of its digits. Find the number.',
            marks: 4,
            modelAnswer: 'Let tens digit be x and units digit be y. Number = 10x + y. Condition 1: 10x + y = 4(x + y) ➔ 6x = 3y ➔ y = 2x. Condition 2: 10x + y = 3xy ➔ 10x + 2x = 3x(2x) ➔ 12x = 6x² ➔ 6x(x - 2) = 0. Since x ≠ 0, x = 2. Then y = 2(2) = 4. Number = 24.'
          }
        ]
      }
    ]
  },
  // ==========================================
  // 📚 मराठी (प्रथम भाषा) अधिकृत आदर्श प्रश्नपत्रिका (पूर्ण ८० गुण)
  // ==========================================
  {
    id: 'board-mar-1',
    subjectId: 'mar',
    subjectTitle: 'मराठी (अक्षरभारती / कुमारभारती)',
    paperTitle: 'महाराष्ट्र राज्य माध्यमिक प्रमाणपत्र परीक्षा — मराठी (प्रथम भाषा) आदर्श प्रश्नपत्रिका',
    yearPattern: '२०२५-२०२६ अधिकृत बोर्ड आराखडा',
    duration: '३ तास',
    totalMarks: 80,
    instructions: [
      'सर्व कृती सोडवणे अनिवार्य आहे.',
      'उत्तरे शुद्धलेखनाच्या नियमांनुसार व सुवाच्य हस्ताक्षरात लिहावीत.',
      'सुबक आकृत्या व संकल्पनाचित्रे पेननेच काढावीत.'
    ],
    sections: [
      {
        sectionTitle: 'विभाग १: गद्य विभाग (१८ गुण)',
        sectionMarks: 18,
        questions: [
          {
            qNumber: 'प्र.१ (अ)',
            questionText: 'पठित गद्य उतारे वाचून दिलेल्या कृती पूर्ण करा: (शाल — राग जाधव)',
            marks: 7,
            modelAnswer: 'उत्तर: पु. ल. देशपांडे आणि सुनीताबाई यांनी दिलेली शाल ही लेखकासाठी सन्मानाचे सर्वोच्च प्रतीक होती.'
          },
          {
            qNumber: 'प्र.१ (आ)',
            questionText: 'स्वमत अभिव्यक्ती: \'शालीनता आणि शाल\' यांतील परस्परसंबंध तुमच्या शब्दांत स्पष्ट करा.',
            marks: 4,
            modelAnswer: 'उत्तर: शाल हे सन्मानाचे प्रतीक आहे, पण सन्मानाने माणसाची शालीनता हरवता कामा नये.'
          }
        ]
      },
      {
        sectionTitle: 'विभाग २: पद्य विभाग (१६ गुण)',
        sectionMarks: 16,
        questions: [
          {
            qNumber: 'प्र.२ (अ)',
            questionText: 'पठित पद्य आधारे कृती सोडवा: (संतवाणी — अंकिला मी दास तुझा)',
            marks: 8,
            modelAnswer: 'उत्तर: संत नामदेव महाराज परमेश्वराला मातेची आणि स्वतःला लहान बाळाची उपमा देऊन करुणा भाकतात.'
          },
          {
            qNumber: 'प्र.२ (आ)',
            questionText: 'काव्यसौंदर्य: \'दोन दिवस वाट पाहण्यात गेले; दोन दुःखात गेले\' या ओळींचे रसग्रहण करा.',
            marks: 4,
            modelAnswer: 'उत्तर: कवी नारायण सुर्वे यांनी कष्टकरी माणसाच्या जीवनातील विदारक वास्तव मांडले आहे.'
          }
        ]
      },
      {
        sectionTitle: 'विभाग ३: भाषाभ्यास व व्याकरण (१६ गुण)',
        sectionMarks: 16,
        questions: [
          {
            qNumber: 'प्र.४ (अ)',
            questionText: 'खालील वाक्यांचा प्रकार ओळखा व योग्य सामासिक शब्दांचा विग्रह करा.',
            marks: 8,
            modelAnswer: 'उत्तर: प्रतिदिन = प्रत्येक दिवशी (अव्ययीभाव समास); नीलकंठ = निळा आहे कंठ ज्याचा तो (बहुव्रीहि समास).'
          }
        ]
      },
      {
        sectionTitle: 'विभाग ५: उपयोजित लेखन (२४ गुण)',
        sectionMarks: 24,
        questions: [
          {
            qNumber: 'प्र.५ (अ)',
            questionText: 'पत्रलेखन: औपचारिक पत्र किंवा अनौपचारिक पत्र यांपैकी एक कृती सोडवा.',
            marks: 6,
            modelAnswer: 'उत्तर: दिनांक, प्रति, विषय, महोदय, मुख्य मजकूर आणि आपला नम्र या अधिकृत आराखड्यानुसार परिपूर्ण पत्रलेखन.'
          },
          {
            qNumber: 'प्र.५ (ब)',
            questionText: 'जाहिरात लेखन किंवा बातमी लेखन तयार करा.',
            marks: 5,
            modelAnswer: 'उत्तर: आकर्षक शीर्षक, संपर्क तपशील व भाषिक सौंदर्यासह परिपूर्ण जाहिरात.'
          }
        ]
      }
    ]
  },
  // ==========================================
  // 📝 हिन्दी (लोकभारती) अधिकृत आदर्श प्रश्नपत्र (पूर्ण ८० अंक)
  // ==========================================
  {
    id: 'board-hin-1',
    subjectId: 'hin',
    subjectTitle: 'हिन्दी (लोकभारती)',
    paperTitle: 'महाराष्ट्र राज्य माध्यमिक प्रमाण-पत्र परीक्षा — हिन्दी (लोकभारती) आदर्श प्रश्नपत्र',
    yearPattern: '२०२५-२०२६ अधिकृत बोर्ड प्रारूप',
    duration: '३ घण्टे',
    totalMarks: 80,
    instructions: [
      'सभी प्रश्न हल करना अनिवार्य है।',
      'उत्तर स्वच्छता एवं शुद्ध वर्तनी के साथ लिखिए।',
      'रचना विभाग में प्रारूप का विशेष ध्यान रखिए।'
    ],
    sections: [
      {
        sectionTitle: 'विभाग १: गद्य विभाग (२० अंक)',
        sectionMarks: 20,
        questions: [
          {
            qNumber: 'प्रश्न १ (अ)',
            questionText: 'पठित गद्यांश पढ़कर दी गई कृतियां पूर्ण कीजिए: (लक्ष्मी — गुरू दयाल सिंह)',
            marks: 8,
            modelAnswer: 'उत्तर: करामत अली गाय को केवल पशु नहीं बल्कि अपने परिवार का अभिन्न अंग मानते थे।'
          },
          {
            qNumber: 'प्रश्न १ (आ)',
            questionText: 'स्वमत अभिव्यक्ति: \'पशु-पक्षियों के प्रति मानवीय संवेदनशीलता\' पर अपने विचार व्यक्त कीजिए।',
            marks: 4,
            modelAnswer: 'उत्तर: मूक पशु-पक्षियों के प्रति दया, करुणा और संरक्षण का भाव रखना प्रत्येक मानव का नैतिक कर्तव्य है।'
          }
        ]
      },
      {
        sectionTitle: 'विभाग २: पद्य विभाग (१२ अंक)',
        sectionMarks: 12,
        questions: [
          {
            qNumber: 'प्रश्न २ (अ)',
            questionText: 'पद्यांश पढ़कर कृतियां हल कीजिए: (भारत महिमा — जयशंकर प्रसाद)',
            marks: 6,
            modelAnswer: 'उत्तर: भारत भूमि ज्ञान, सत्य, त्याग और विश्वकल्याण की शाश्वत जननी है।'
          }
        ]
      },
      {
        sectionTitle: 'विभाग ४: भाषा अध्ययन एवं व्याकरण (१४ अंक)',
        sectionMarks: 14,
        questions: [
          {
            qNumber: 'प्रश्न ४',
            questionText: 'शब्दभेद, मुहावरे, संधि एवं काल परिवर्तन के निर्देशानुसार उत्तर लिखिए।',
            marks: 14,
            modelAnswer: 'उत्तर: संधि-विच्छेद: सूर्य + उदय = सूर्योदय (गुण संधि); काल परिवर्तन: करामत अली गाय की सेवा करेंगे (भविष्यत् काल)।'
          }
        ]
      },
      {
        sectionTitle: 'विभाग ५: रचना विभाग / उपयोजित लेखन (२६ अंक)',
        sectionMarks: 26,
        questions: [
          {
            qNumber: 'प्रश्न ५ (अ)',
            questionText: 'पत्र लेखन: औपचारिक अथवा अनौपचारिक पत्र लिखिए।',
            marks: 5,
            modelAnswer: 'उत्तर: दिनांक, सेवा में, विषय, महोदय, विषय विस्तार एवं प्रेषक के विवरण सहित मानक पत्र।'
          }
        ]
      }
    ]
  },
  // ==========================================
  // 🕉️ संस्कृतम् (आमोदः) अधिकृत आदर्श प्रश्नपत्रम् (पूर्ण ८० अंकाः)
  // ==========================================
  {
    id: 'board-san-1',
    subjectId: 'sanskrit',
    subjectTitle: 'संस्कृतम् (आमोदः / आनन्दः)',
    paperTitle: 'महाराष्ट्र-राज्य-माध्यमिक-प्रमाणपत्र-परीक्षा — संस्कृतम् (आमोदः) आदर्श-मूल्याङ्कन-पत्रिका',
    yearPattern: '२०२५-२०२६ अधिकृत-बोर्ड-प्रारूपम्',
    duration: '३ होराः',
    totalMarks: 80,
    instructions: [
      'सर्वे प्रश्नाः समाधेयाः।',
      'देवनागरीलिप्यां शुद्धलेखन-नियमानुसारेण उत्तराणि लिखत।',
      'व्याकरण-नियमानां यथोचितं पालनं कुरुत।'
    ],
    sections: [
      {
        sectionTitle: 'विभागः १: सुगमसंस्कृतम् (८ अंकाः)',
        sectionMarks: 8,
        questions: [
          {
            qNumber: 'प्रश्न १ (अ)',
            questionText: 'चित्रं दृष्ट्वा नामानि लिखत तथा संख्याः अक्षरेषु लिखत।',
            marks: 4,
            modelAnswer: 'उत्तर: लेखनी, कन्दुकम्, पुस्तकम्, व्यजनम्।'
          }
        ]
      },
      {
        sectionTitle: 'विभागः २: गद्यविभागः (२० अंकाः)',
        sectionMarks: 20,
        questions: [
          {
            qNumber: 'प्रश्न २ (अ)',
            questionText: 'गद्यांशं पठित्वा अवबोधन-कार्यं कुरुत: (आद्यकृषकः पृथुवैन्यः)',
            marks: 8,
            modelAnswer: 'उत्तर: राजा पृथुवैन्यः भूमौ कृषि-व्यवस्थायाः जनकः आसीत्।'
          }
        ]
      },
      {
        sectionTitle: 'विभागः ४: भाषाभ्यासः च व्याकरणम् (१७ अंकाः)',
        sectionMarks: 17,
        questions: [
          {
            qNumber: 'प्रश्न ४',
            questionText: 'नामरूपाणि धातुरूपाणि तथा समासानां विग्रहं कुरुत।',
            marks: 17,
            modelAnswer: 'उत्तर: रामस्य (षष्ठी एकवचनम्); गच्छति (गम् धातोः लट्लकारः प्रथमपुरुषः एकवचनम्)।'
          }
        ]
      }
    ]
  }
];

// =========================================================================
// 3. INTERACTIVE TIMED MOCK TESTS
// =========================================================================
export const MOCK_TESTS_LIST: MockTestItem[] = [
  {
    id: 'mock-sci1-full',
    subjectId: 'sci1',
    subjectTitle: 'Science & Technology 1',
    testTitle: 'Speed Mock Test: Physics & Chemistry Core Board Exam',
    chapterCoverage: 'Gravitation, Periodic Table, Chemical Reactions & Light',
    durationMinutes: 15,
    totalQuestions: 6,
    questions: [
      {
        id: 'q1',
        question: 'What is the value of Universal Gravitational Constant (G) in SI units?',
        options: ['6.673 × 10⁻¹¹ N·m²/kg²', '9.8 m/s²', '6.673 × 10¹¹ N·m²/kg²', '1.6 × 10⁻¹⁹ C'],
        correctIndex: 0,
        explanation: 'Henry Cavendish experimentally measured G = 6.673 × 10⁻¹¹ N·m²/kg².',
        marks: 1
      },
      {
        id: 'q2',
        question: 'Which of the following elements has the largest atomic radius in Period 2?',
        options: ['Lithium (Li)', 'Carbon (C)', 'Fluorine (F)', 'Oxygen (O)'],
        correctIndex: 0,
        explanation: 'Atomic size decreases across a period from left to right; therefore, Lithium (Li) on the far left has the largest atomic radius.',
        marks: 1
      },
      {
        id: 'q3',
        question: 'When copper sulfate solution reacts with iron nail, which type of reaction occurs?',
        options: ['Combination reaction', 'Displacement reaction', 'Decomposition reaction', 'Double decomposition'],
        correctIndex: 1,
        explanation: 'Iron is more reactive than copper; Fe displaces Cu from CuSO₄ to form FeSO₄ (green) and copper deposit.',
        marks: 1
      },
      {
        id: 'q4',
        question: 'A convex lens of focal length 0.5 meters has optical power equal to ______.',
        options: ['+2.0 Dioptre', '-2.0 Dioptre', '+0.5 Dioptre', '+5.0 Dioptre'],
        correctIndex: 0,
        explanation: 'Power P = 1 / f(in meters) = 1 / 0.5 = +2.0 D (positive for convex lens).',
        marks: 1
      },
      {
        id: 'q5',
        question: 'Which rule is applied to determine the direction of force experienced by a current-carrying conductor in a magnetic field?',
        options: ['Right-Hand Thumb Rule', 'Fleming\'s Left-Hand Rule', 'Fleming\'s Right-Hand Rule', 'Ampere\'s Swimming Rule'],
        correctIndex: 1,
        explanation: 'Fleming\'s Left-Hand Rule is used for Electric Motors to determine the direction of magnetic force on a current-carrying wire.',
        marks: 1
      },
      {
        id: 'q6',
        question: 'What is the escape velocity from the surface of planet Earth?',
        options: ['11.2 km/s', '9.8 km/s', '3.1 km/s', '11.2 m/s'],
        correctIndex: 0,
        explanation: 'v_esc = √(2gR) = √(2 × 9.8 × 6.4 × 10⁶) ≈ 11.2 km/s.',
        marks: 1
      }
    ]
  },
  {
    id: 'mock-math1-full',
    subjectId: 'math1',
    subjectTitle: 'Mathematics Part 1 (Algebra)',
    testTitle: 'Speed Mock Test: Algebra Mastery & Equations',
    chapterCoverage: 'Linear Equations, Quadratics & AP',
    durationMinutes: 15,
    totalQuestions: 5,
    questions: [
      {
        id: 'mq1',
        question: 'For simultaneous equations 3x + 5y = 9 and 5x + 3y = 7, what is the value of (x + y)?',
        options: ['2', '1', '16', '8'],
        correctIndex: 0,
        explanation: 'Adding both equations: 8x + 8y = 16 ➔ Dividing by 8: x + y = 2.',
        marks: 1
      },
      {
        id: 'mq2',
        question: 'If the roots of quadratic equation 2x² - kx + k = 0 are real and equal, find k (k ≠ 0).',
        options: ['4', '8', '16', '2'],
        correctIndex: 1,
        explanation: 'For real and equal roots, Δ = b² - 4ac = 0 ➔ (-k)² - 4(2)(k) = 0 ➔ k² - 8k = 0 ➔ k(k - 8) = 0. Since k ≠ 0, k = 8.',
        marks: 1
      },
      {
        id: 'mq3',
        question: 'For an Arithmetic Progression (AP), if a = 3.5, d = 0, then t₁₀₁ is ______.',
        options: ['0', '3.5', '103.5', '104.5'],
        correctIndex: 1,
        explanation: 'tₙ = a + (n - 1)d = 3.5 + (101 - 1)(0) = 3.5.',
        marks: 1
      },
      {
        id: 'mq4',
        question: 'What is the probability of getting an ace from a well-shuffled pack of 52 playing cards?',
        options: ['1/13', '1/52', '4/13', '1/4'],
        correctIndex: 0,
        explanation: 'Number of aces = 4. Total cards = 52. P(Ace) = 4/52 = 1/13.',
        marks: 1
      },
      {
        id: 'mq5',
        question: 'If sum of roots of quadratic equation is -5 and product of roots is 6, what is the quadratic equation?',
        options: ['x² + 5x + 6 = 0', 'x² - 5x + 6 = 0', 'x² + 5x - 6 = 0', 'x² - 6x + 5 = 0'],
        correctIndex: 0,
        explanation: 'Equation is x² - (α + β)x + αβ = 0 ➔ x² - (-5)x + 6 = 0 ➔ x² + 5x + 6 = 0.',
        marks: 1
      }
    ]
  }
];

// =========================================================================
// 4. CHAPTER-WISE 20-MARK MOCK PAPERS (SET A, SET B, SET C)
// =========================================================================

export interface ChapterMockPaper20M {
  id: string;
  subjectId: string;
  subjectTitle: string;
  chapterTitle: string;
  chapterNumber: number;
  setName: string;
  setFocus: string;
  difficulty: string;
  totalMarks: number; // Exactly 20 Marks
  durationMinutes: number; // 45 Minutes
  assignedTeacher: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  instructions: string[];
  sections: {
    sectionTitle: string;
    sectionMarks: number;
    questions: {
      qNumber: string;
      questionText: string;
      marks: number;
      options?: string[];
      modelAnswer: string;
    }[];
  }[];
}

export interface TeacherAnswerSubmission {
  id: string;
  paperId: string;
  subjectId: string;
  chapterTitle: string;
  setName: string;
  studentName: string;
  submittedAt: string;
  pdfFileName: string;
  fileSizeStr: string;
  status: 'pending_review' | 'evaluated';
  evaluation?: {
    teacherName: string;
    teacherRole: string;
    marksAwarded: number;
    totalMarks: number;
    percentage: number;
    grade: string;
    overallRemark: string;
    questionWiseMarks: {
      qNumber: string;
      awarded: number;
      max: number;
      remark: string;
    }[];
    handwritingPresentationAdvice: string;
    signedAt: string;
  };
}

export { ALL_CHAPTER_MOCK_PAPERS_20M as CHAPTER_MOCK_PAPERS_20M } from "./chapterMockPapersData";

export const INITIAL_TEACHER_SUBMISSIONS: TeacherAnswerSubmission[] = [
  {
    "id": "sub-demo-mar-ch1-seta",
    "paperId": "paper-mar-ch1-seta",
    "subjectId": "mar",
    "chapterTitle": "तू बुद्धी दे — प्रार्थना",
    "setName": "संच 'अ'",
    "studentName": "शिवतेज पोळ",
    "submittedAt": "काल, संध्याकाळी ०६:१५",
    "pdfFileName": "मराठी_पाठ१_संच_अ_हस्तलिखित_उत्तरपत्रिका.pdf",
    "fileSizeStr": "२.८ मेगाबाईट",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "डॉ. आनंद जोशी",
      "teacherRole": "ज्येष्ठ मराठी भाषातज्ज्ञ व मुख्य परीक्षक",
      "marksAwarded": 19,
      "totalMarks": 20,
      "percentage": 95,
      "grade": "अ+ (विशेष प्रावीण्य)",
      "overallRemark": "अतिशय सुरेख व उत्कृष्ट उत्तरपत्रिका! सर्व प्रश्नांची उत्तरे शुद्धलेखनाच्या नियमांनुसार व सुवाच्य अक्षरात लिहिलेली आहेत. विचारसौंदर्य व काव्यसौंदर्य प्रभावीपणे उलगडले आहे.",
      "questionWiseMarks": [
        {
          "qNumber": "प्र.१",
          "awarded": 4,
          "max": 4,
          "remark": "सर्व वस्तुनिष्ठ प्रश्न आणि पर्याय अचूक सोडवले आहेत."
        },
        {
          "qNumber": "प्र.२",
          "awarded": 6,
          "max": 6,
          "remark": "व्याकरण घटक, वाक्यरूपांतर व समास परिपूर्ण आहेत."
        },
        {
          "qNumber": "प्र.३",
          "awarded": 5.5,
          "max": 6,
          "remark": "काव्यसौंदर्य आणि विचारसौंदर्य प्रभावीपणे स्पष्ट केले आहे."
        },
        {
          "qNumber": "प्र.४",
          "awarded": 3.5,
          "max": 4,
          "remark": "स्वमत अभिव्यक्तीमध्ये स्वतःचे चिंतन स्पष्टपणे जाणवते. उत्तर आदर्श आहे."
        }
      ],
      "handwritingPresentationAdvice": "हस्ताक्षर वळणदार आणि देखणे आहे. दोन उत्तरांमध्ये दुहेरी रेषा आखल्याने उत्तरपत्रिका अधिक आकर्षक दिसते.",
      "signedAt": "काल, रात्री ०८:३० • अधिकृत राज्य मंडळ स्वाक्षरी"
    }
  },
  {
    "id": "sub-demo-hin-ch1-seta",
    "paperId": "paper-hin-ch1-seta",
    "subjectId": "hin",
    "chapterTitle": "भारत महिमा — कविता",
    "setName": "सेट 'अ'",
    "studentName": "शिवतेज शर्मा",
    "submittedAt": "कल, सायं ०५:२०",
    "pdfFileName": "हिन्दी_अध्याय१_सेट_अ_हल_की_गई_उत्तरपुस्तिका.pdf",
    "fileSizeStr": "३.१ मेगाबाइट",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "आचार्य राजेश शर्मा",
      "teacherRole": "वरिष्ठ हिन्दी प्रवक्ता एवं राज्य परीक्षक",
      "marksAwarded": 18.5,
      "totalMarks": 20,
      "percentage": 92.5,
      "grade": "ए+ (विशेष योग्यता)",
      "overallRemark": "अति उत्तम उत्तरपुस्तिका! भाषा शैली अत्यंत प्रवाहमयी, शुद्ध वर्तनीयुक्त एवं प्रभावोत्पादक है। पद्य भावार्थ तथा व्याकरण का विश्लेषण राज्य मण्डल के मानकों के सर्वथा अनुकूल है।",
      "questionWiseMarks": [
        {
          "qNumber": "प्रश्न १",
          "awarded": 4,
          "max": 4,
          "remark": "सभी वस्तुनिष्ठ एवं रिक्त स्थान शुद्ध हल किए गए हैं।"
        },
        {
          "qNumber": "प्रश्न २",
          "awarded": 5.5,
          "max": 6,
          "remark": "संधि, मुहावरे एवं काल परिवर्तन पूर्णतः व्याकरण सम्मत हैं।"
        },
        {
          "qNumber": "प्रश्न ३",
          "awarded": 5.5,
          "max": 6,
          "remark": "पद्य भावार्थ में गहन विचार सौंदर्य झलकता है।"
        },
        {
          "qNumber": "प्रश्न ४",
          "awarded": 3.5,
          "max": 4,
          "remark": "स्वमत अभिव्यक्ति में मौलिकता एवं तार्किक दृष्टिकोण प्रशंसनीय है।"
        }
      ],
      "handwritingPresentationAdvice": "हस्ताक्षर अत्यंत स्वच्छ एवं पठनीय है। मुख्य बिंदुओं के नीचे रेखांकन करने की परिपाटी बोर्ड परीक्षा में अत्यंत लाभकारी सिद्ध होगी।",
      "signedAt": "कल, रात्रि ०८:०० • अधिकृत राज्य मण्डल हस्ताक्षर एवं मुहर"
    }
  },
  {
    "id": "sub-demo-san-ch1-seta",
    "paperId": "paper-sanskrit-ch1-seta",
    "subjectId": "sanskrit",
    "chapterTitle": "आद्यकृषकः पृथुवैन्यः",
    "setName": "संचः 'अ'",
    "studentName": "शिवतेज वर्मन्",
    "submittedAt": "ह्यः, सायं ०४:४५",
    "pdfFileName": "संस्कृतम्_पाठ१_संच_अ_उत्तरपत्रिका.pdf",
    "fileSizeStr": "२.५ मेगाबाइट",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "पं. भालचंद्र शास्त्री",
      "teacherRole": "संस्कृत व्याकरणविद् तथा मुख्य परीक्षकः",
      "marksAwarded": 19.5,
      "totalMarks": 20,
      "percentage": 97.5,
      "grade": "ए+ (परमोत्कृष्टम्)",
      "overallRemark": "अतीव प्रशंसनीयम् उत्तरपत्रम्! देवनागरीलिप्यां शुद्धलेखनं, व्याकरणनियमानां पालनं तथा अन्वयपूर्तिः सर्वथा प्रामाणिका वर्तते।",
      "questionWiseMarks": [
        {
          "qNumber": "प्रश्न १",
          "awarded": 4,
          "max": 4,
          "remark": "सुगमसंस्कृतस्य सर्वे पर्यायाः शुद्धाः वर्तन्ते।"
        },
        {
          "qNumber": "प्रश्न २",
          "awarded": 6,
          "max": 6,
          "remark": "नामरूपाणि धातुरूपाणि तथा समासाः शतप्रतिशतं शुद्धाः।"
        },
        {
          "qNumber": "प्रश्न ३",
          "awarded": 5.5,
          "max": 6,
          "remark": "अन्वयपूर्तिः श्लोकसरलार्थश्च सम्यक् उल्लिखितः।"
        },
        {
          "qNumber": "प्रश्न ४",
          "awarded": 4,
          "max": 4,
          "remark": "माध्यमभाषया स्वविचारप्रकटनं उत्कृष्टं वर्तते।"
        }
      ],
      "handwritingPresentationAdvice": "देवनागरीलिप्यां शिरोरेखायाः सम्यक् प्रयोगः कृतः। एतादृशी सुस्पष्टा लेखनशैली बोर्डपरीक्षार्थिभ्यः आदर्शभूता अस्ति।",
      "signedAt": "ह्यः, रात्रौ ०७:१५ • अधिकृत मण्डल-हस्ताक्षरम् मुद्रा च"
    }
  },
  {
    "id": "sub-demo-sci1-ch1-setA",
    "paperId": "paper-sci1-ch1-setA",
    "subjectId": "sci1",
    "chapterTitle": "Gravitation",
    "setName": "Set A",
    "studentName": "Aarav Patil",
    "submittedAt": "Yesterday, 05:40 PM",
    "pdfFileName": "Aarav_Patil_Science1_Ch1_SetA_Solved.pdf",
    "fileSizeStr": "3.4 MB",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "Prof. Ramesh Kulkarni",
      "teacherRole": "Senior Physics Faculty & SSC Moderator",
      "marksAwarded": 18.5,
      "totalMarks": 20,
      "percentage": 92.5,
      "grade": "A+ (Distinction)",
      "overallRemark": "Outstanding handwritten solution sheet! Derivations are neatly presented with given data and SI units. Just missed half mark in Q.4 for not underlining the final answer.",
      "questionWiseMarks": [
        {
          "qNumber": "Q.1",
          "awarded": 4,
          "max": 4,
          "remark": "All objective answers and units completely correct."
        },
        {
          "qNumber": "Q.2",
          "awarded": 6,
          "max": 6,
          "remark": "Scientific reasons written with proper cause-and-effect numbered points."
        },
        {
          "qNumber": "Q.3",
          "awarded": 5.5,
          "max": 6,
          "remark": "Clean diagram of Kepler elliptical orbit. In g formula, explicitly state that m cancels out."
        },
        {
          "qNumber": "Q.4",
          "awarded": 3,
          "max": 4,
          "remark": "Correct substitution of s=ut+1/2gt^2. Minor calculation step rushed."
        }
      ],
      "handwritingPresentationAdvice": "Keep drawing a double underline under your final numerical answer with units in SSC board answer books.",
      "signedAt": "Yesterday, 08:15 PM"
    }
  },
  {
    "id": "sub-demo-math1-ch1-seta",
    "paperId": "paper-math1-ch1-seta",
    "subjectId": "math1",
    "chapterTitle": "Linear Equations in Two Variables",
    "setName": "Set A",
    "studentName": "Shivtej Pol",
    "submittedAt": "2 days ago, 04:30 PM",
    "pdfFileName": "Shivtej_Pol_Maths1_Ch1_SetA_Solved.pdf",
    "fileSizeStr": "3.2 MB",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "Prof. S. R. Deshmukh",
      "teacherRole": "Senior Mathematics Moderator & SSC Evaluator",
      "marksAwarded": 19.5,
      "totalMarks": 20,
      "percentage": 97.5,
      "grade": "A+ (Distinction)",
      "overallRemark": "Exemplary mathematical presentation! Determinant and Cramer's rule steps are impeccably written. Word problem formulated into simultaneous equations cleanly with let variables.",
      "questionWiseMarks": [
        {
          "qNumber": "Q.1",
          "awarded": 4,
          "max": 4,
          "remark": "All MCQs and 1-mark determinant evaluations solved correctly."
        },
        {
          "qNumber": "Q.2",
          "awarded": 6,
          "max": 6,
          "remark": "Simultaneous elimination steps completely verified with Dx, Dy and D."
        },
        {
          "qNumber": "Q.3",
          "awarded": 5.5,
          "max": 6,
          "remark": "Graphical coordinate table plotted accurately. Scale on axes clearly highlighted."
        },
        {
          "qNumber": "Q.4",
          "awarded": 4,
          "max": 4,
          "remark": "Speed-time word problem formulation is perfect. Final statement boxed."
        }
      ],
      "handwritingPresentationAdvice": "Use a pencil and sharp ruler for graph coordinate boxes. Presentation is board topper level.",
      "signedAt": "2 days ago, 07:45 PM • Verified Board Signature"
    }
  },
  {
    "id": "sub-demo-math2-ch1-seta",
    "paperId": "paper-math2-ch1-seta",
    "subjectId": "math2",
    "chapterTitle": "Similarity",
    "setName": "Set A",
    "studentName": "Shivtej Pol",
    "submittedAt": "3 days ago, 03:15 PM",
    "pdfFileName": "Shivtej_Pol_Geometry_Ch1_SetA_Solved.pdf",
    "fileSizeStr": "3.6 MB",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "Mrs. Sunita Kulkarni",
      "teacherRole": "Senior Geometry Board Examiner",
      "marksAwarded": 18,
      "totalMarks": 20,
      "percentage": 90,
      "grade": "A+ (Distinction)",
      "overallRemark": "Very systematic geometric proofs! Basic Proportionality Theorem (BPT) stated with given, to prove, construction, and proof correctly justified with area ratios.",
      "questionWiseMarks": [
        {
          "qNumber": "Q.1",
          "awarded": 4,
          "max": 4,
          "remark": "Angle bisector and ratio formulas applied accurately."
        },
        {
          "qNumber": "Q.2",
          "awarded": 5,
          "max": 6,
          "remark": "Construction line dashed neatly in figure; mentioned triangle similarity test."
        },
        {
          "qNumber": "Q.3",
          "awarded": 5.5,
          "max": 6,
          "remark": "Areas of similar triangles theorem proved with altitude construction."
        },
        {
          "qNumber": "Q.4",
          "awarded": 3.5,
          "max": 4,
          "remark": "HOTS trapezium problem solved using parallel lines property."
        }
      ],
      "handwritingPresentationAdvice": "Always mention reason brackets (e.g. [By AAA test of similarity]) next to every equality line.",
      "signedAt": "3 days ago, 06:30 PM • Verified Board Signature"
    }
  },
  {
    "id": "sub-demo-sci2-ch1-seta",
    "paperId": "paper-sci2-ch1-seta",
    "subjectId": "sci2",
    "chapterTitle": "Heredity and Evolution",
    "setName": "Set A",
    "studentName": "Shivtej Pol",
    "submittedAt": "4 days ago, 05:00 PM",
    "pdfFileName": "Shivtej_Pol_Science2_Ch1_SetA_Solved.pdf",
    "fileSizeStr": "3.1 MB",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "Dr. Manisha Shinde",
      "teacherRole": "Senior Life Sciences Faculty & SSC Moderator",
      "marksAwarded": 19,
      "totalMarks": 20,
      "percentage": 95,
      "grade": "A+ (Distinction)",
      "overallRemark": "Brilliant answers with precise biological terminology! Transcription, RNA translation, and translocation explained in chronological sequence. Vestigial organs named with diagrams.",
      "questionWiseMarks": [
        {
          "qNumber": "Q.1",
          "awarded": 4,
          "max": 4,
          "remark": "All codons, amino acids and triplet codon definitions exact."
        },
        {
          "qNumber": "Q.2",
          "awarded": 6,
          "max": 6,
          "remark": "Lamarckism vs Darwinism natural selection compared in neat columns."
        },
        {
          "qNumber": "Q.3",
          "awarded": 5.5,
          "max": 6,
          "remark": "Human evolution timeline diagram with cranial capacity noted cleanly."
        },
        {
          "qNumber": "Q.4",
          "awarded": 3.5,
          "max": 4,
          "remark": "Morphological and embryological evidences elaborated with examples."
        }
      ],
      "handwritingPresentationAdvice": "Underline biological terms like 't-RNA anticodon' and 'Australopithecus' for maximum examiner visual ease.",
      "signedAt": "4 days ago, 08:00 PM • Verified Board Signature"
    }
  },
  {
    "id": "sub-demo-hist-ch1-seta",
    "paperId": "paper-hist-ch1-seta",
    "subjectId": "hist",
    "chapterTitle": "Historiography : Development in the West",
    "setName": "Set A",
    "studentName": "Shivtej Pol",
    "submittedAt": "5 days ago, 02:40 PM",
    "pdfFileName": "Shivtej_Pol_History_Ch1_SetA_Solved.pdf",
    "fileSizeStr": "2.9 MB",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "Prof. D. K. Pawar",
      "teacherRole": "Senior Social Sciences Moderator",
      "marksAwarded": 18.5,
      "totalMarks": 20,
      "percentage": 92.5,
      "grade": "A+ (Distinction)",
      "overallRemark": "Comprehensive historical analysis! The Annales School and feminist historiography are explained with thinkers (Voltaire, Karl Marx, Michel Foucault) cited with their seminal works.",
      "questionWiseMarks": [
        {
          "qNumber": "Q.1",
          "awarded": 4,
          "max": 4,
          "remark": "Wrong pair identified and corrected accurately."
        },
        {
          "qNumber": "Q.2",
          "awarded": 5.5,
          "max": 6,
          "remark": "Concept maps drawn with clean rectangular borders using pen."
        },
        {
          "qNumber": "Q.3",
          "awarded": 5.5,
          "max": 6,
          "remark": "Hegel's dialectics explained with thesis, anti-thesis and synthesis."
        },
        {
          "qNumber": "Q.4",
          "awarded": 3.5,
          "max": 4,
          "remark": "Detailed answer on archaeology of knowledge by Foucault."
        }
      ],
      "handwritingPresentationAdvice": "Use neat bullet points instead of long paragraphs in historical reasons.",
      "signedAt": "5 days ago, 06:10 PM • Verified Board Signature"
    }
  },
  {
    "id": "sub-demo-geo-ch1-seta",
    "paperId": "paper-geo-ch1-seta",
    "subjectId": "geo",
    "chapterTitle": "Field Visit",
    "setName": "Set A",
    "studentName": "Shivtej Pol",
    "submittedAt": "6 days ago, 11:20 AM",
    "pdfFileName": "Shivtej_Pol_Geography_Ch1_SetA_Solved.pdf",
    "fileSizeStr": "3.0 MB",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "Mrs. Anita Bhosle",
      "teacherRole": "State Geography Board Evaluator",
      "marksAwarded": 19,
      "totalMarks": 20,
      "percentage": 95,
      "grade": "A+ (Distinction)",
      "overallRemark": "Exceptional field report preparation! Questionnaire for visiting a factory/farm formulated with sensible questions. Safety precautions and eco-friendly measures highlighted.",
      "questionWiseMarks": [
        {
          "qNumber": "Q.1",
          "awarded": 4,
          "max": 4,
          "remark": "Field visit essential items and objective statements exact."
        },
        {
          "qNumber": "Q.2",
          "awarded": 6,
          "max": 6,
          "remark": "Questionnaire structured into raw materials, labour, output and disposal."
        },
        {
          "qNumber": "Q.3",
          "awarded": 5.5,
          "max": 6,
          "remark": "Vegetation and soil changes observed from Alibaug to Sinhagad."
        },
        {
          "qNumber": "Q.4",
          "awarded": 3.5,
          "max": 4,
          "remark": "Report outline format followed board parameters."
        }
      ],
      "handwritingPresentationAdvice": "Very clean headings and sub-headings.",
      "signedAt": "6 days ago, 03:00 PM • Verified Board Signature"
    }
  },
  {
    "id": "sub-demo-eng-ch1-seta",
    "paperId": "paper-eng-ch1-seta",
    "subjectId": "eng",
    "chapterTitle": "Where the Mind is Without Fear",
    "setName": "Set A",
    "studentName": "Shivtej Pol",
    "submittedAt": "1 week ago, 04:10 PM",
    "pdfFileName": "Shivtej_Pol_English_Ch1_SetA_Solved.pdf",
    "fileSizeStr": "2.7 MB",
    "status": "evaluated",
    "evaluation": {
      "teacherName": "Dr. Sarah Thomas",
      "teacherRole": "Senior English Faculty & Board Moderator",
      "marksAwarded": 18.5,
      "totalMarks": 20,
      "percentage": 92.5,
      "grade": "A+ (Distinction)",
      "overallRemark": "Superb poetic appreciation and personal response! Figures of speech like personification and metaphor identified with exact poetic lines. Grammatical transformation is error-free.",
      "questionWiseMarks": [
        {
          "qNumber": "Q.1",
          "awarded": 4,
          "max": 4,
          "remark": "Vocabulary, synonyms and antonyms answered correctly."
        },
        {
          "qNumber": "Q.2",
          "awarded": 5.5,
          "max": 6,
          "remark": "Poetic devices identified; rhyme scheme free verse noted."
        },
        {
          "qNumber": "Q.3",
          "awarded": 5.5,
          "max": 6,
          "remark": "Appreciation of poem written in point format as per board pattern."
        },
        {
          "qNumber": "Q.4",
          "awarded": 3.5,
          "max": 4,
          "remark": "Personal response on Tagore's vision of independent India."
        }
      ],
      "handwritingPresentationAdvice": "Neat cursive handwriting, paragraph breaks well maintained.",
      "signedAt": "1 week ago, 07:15 PM • Verified Board Signature"
    }
  }
];
