export interface ChapterSection {
  title?: string;
  chapters: string[];
}

export interface SubjectCatalogItem {
  id: string;
  title: string;
  subtitle: string;
  subject: string;
  categoryTag: string;
  boardInfo?: string;
  sections: ChapterSection[];
}

export const ALL_SUBJECTS_CATALOG: SubjectCatalogItem[] = [
  {
    id: 'math1',
    title: 'Maths 1',
    subtitle: 'Mathematics Part 1 — Algebra',
    subject: 'Mathematics',
    categoryTag: 'Algebra',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: '📐 Algebra Chapter List',
        chapters: [
          'Linear Equations in Two Variables',
          'Quadratic Equations',
          'Arithmetic Progression',
          'Financial Planning',
          'Probability',
          'Statistics'
        ]
      }
    ]
  },
  {
    id: 'math2',
    title: 'Maths 2',
    subtitle: 'Mathematics Part 2 — Geometry',
    subject: 'Mathematics',
    categoryTag: 'Geometry',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: '📐 Geometry Chapter List',
        chapters: [
          'Similarity',
          'Pythagoras Theorem',
          'Circle',
          'Geometric Constructions',
          'Co-ordinate Geometry',
          'Trigonometry',
          'Mensuration'
        ]
      }
    ]
  },
  {
    id: 'sci1',
    title: 'Science 1',
    subtitle: 'Science & Technology Part 1',
    subject: 'Science & Technology',
    categoryTag: 'Physics + Chemistry',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: '🔬 Physics + Chemistry Chapter List',
        chapters: [
          'Gravitation',
          'Periodic Classification of Elements',
          'Chemical Reactions and Equations',
          'Effects of Electric Current',
          'Heat',
          'Refraction of Light',
          'Lenses',
          'Metallurgy',
          'Carbon Compounds',
          'Space Missions'
        ]
      }
    ]
  },
  {
    id: 'sci2',
    title: 'Science 2',
    subtitle: 'Science & Technology Part 2',
    subject: 'Science & Technology',
    categoryTag: 'Biology + Environment',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: '🧬 Biology + Environment Chapter List',
        chapters: [
          'Heredity and Evolution',
          'Life Processes in Living Organisms — Part 1',
          'Life Processes in Living Organisms — Part 2',
          'Environmental Management',
          'Towards Green Energy',
          'Animal Classification',
          'Introduction to Microbiology',
          'Cell Biology and Biotechnology',
          'Social Health',
          'Disaster Management'
        ]
      }
    ]
  },
  {
    id: 'mar',
    title: 'Marathi',
    subtitle: 'Marathi Second Language — अक्षरभारती',
    subject: 'Language',
    categoryTag: 'अक्षरभारती',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: 'भाग १',
        chapters: [
          'तू बुद्धी दे — प्रार्थना',
          'संतवाणी (अ) अंकिला मी दास तुझा',
          'संतवाणी (आ) योगी सर्वकाळ सुखदाता',
          'शाल',
          'उपास',
          'मोठे होत असलेल्या मुलांनो... — स्थूलवाचन'
        ]
      },
      {
        title: 'भाग २',
        chapters: [
          'दोन दिवस — कविता',
          'चुडीवाला',
          'फूटप्रिन्टस',
          'ऊर्जाशक्तीचा जागर',
          'जाता अस्ताला — स्थूलवाचन'
        ]
      },
      {
        title: 'भाग ३',
        chapters: [
          'औक्षण — कविता',
          'रंग साहित्याचे',
          'जंगल डायरी',
          'रंग मजेचे रंग उदयाचे — कविता',
          'जगणं कॅक्टसचं — स्थूलवाचन'
        ]
      },
      {
        title: 'भाग ४',
        chapters: [
          'हिरवंगार झाडासारखं — कविता',
          'बीज पेरले गेले',
          'खरा नागरिक',
          'स्वप्न करू साकार — कविता',
          'व्युत्पत्ती कोश — स्थूलवाचन'
        ]
      },
      {
        title: '✍️ भाषा अभ्यास / लेखन — उपयोजित लेखन',
        chapters: [
          'पत्रलेखन',
          'सारांशलेखन',
          'जाहिरातलेखन',
          'बातमीलेखन',
          'कथालेखन',
          'निबंधलेखन (प्रसंगलेखन / अनुभवलेखन)',
          'निबंधलेखन (आत्मकथन)',
          'निबंधलेखन (वैचारिक लेखन)'
        ]
      },
      {
        title: 'व्याकरण विभाग',
        chapters: [
          'शब्दसंपत्ती (समानार्थी शब्द, विरुद्धार्थी शब्द, शब्दसमूहासाठी एक शब्द)',
          'लिंग व वचन विचार',
          'केवलप्रयोगी अव्यय',
          'वाक्य व वाक्यांचे प्रकार आणि वाक्यरूपांतर',
          'समास व अलंकार',
          'प्रत्यय व उपसर्ग',
          'वाक्प्रचार व म्हणी',
          'विरामचिन्हे व लेखननियमांनुसार लेखन',
          'पारिभाषिक शब्द व वाक्य तयार करा',
          'अपठित गद्य आकलन'
        ]
      }
    ]
  },
  {
    id: 'eng',
    title: 'English',
    subtitle: 'English — Kumarbharati',
    subject: 'Language',
    categoryTag: 'Kumarbharati',
    boardInfo: 'SSC Maharashtra Board • Std 10 (2026–27 Syllabus)',
    sections: [
      {
        title: 'Prose / Poetry / Supplementary Reading',
        chapters: [
          'Where the Mind is Without Fear',
          "The Thief's Story",
          'On Wings of Courage',
          "All the World's a Stage",
          'Joan of Arc',
          'The Alchemy of Nature',
          'Animals',
          'Three Questions',
          'Connecting the Dots',
          'The Pulley',
          "Let's March",
          'Science and Spirituality',
          'Night of the Scorpion',
          'The Night I Met Einstein',
          'Stephen Hawking',
          'The Will to Win',
          'Unbeatable Super Mom – Mary Kom',
          'The Concert',
          'A Thing of Beauty is a Joy For Ever',
          'The Luncheon',
          'World Heritage',
          'The Height of the Ridiculous',
          'The Old Man and The Sea — Book Review',
          'The Gift of the Magi'
        ]
      },
      {
        title: 'Language Skills & Evaluation',
        chapters: [
          'Reading skills',
          'Grammar & Syntax Mastery',
          'Writing skills',
          'Oral/Listening activities'
        ]
      }
    ]
  },
  {
    id: 'hin',
    title: 'Hindi',
    subtitle: 'Hindi — लोकभारती',
    subject: 'Language',
    categoryTag: 'लोकभारती',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: 'गद्य व पद्य विभाग',
        chapters: [
          'भारत महिमा — कविता',
          'लक्ष्मी — संवादात्मक कहानी',
          'वाह रे! हमदर्द — हास्य-व्यंग्य',
          'मन — हाइकू',
          'गोवा : जैसा मैंने देखा — यात्रा वर्णन',
          'गिरिधर नागर — पद',
          'खुला आकाश — डायरी',
          'गजल — कविता',
          'रीढ़ की हड्डी — एकांकी',
          'ठेस — आंचलिक कहानी',
          'कृषक गान — कविता'
        ]
      },
      {
        title: 'व्याकरण व उपयोजित लेखन',
        chapters: [
          'शब्द भेद व अव्यय',
          'संधि व मुहावरे',
          'काल परिवर्तन व वाक्य भेद',
          'पत्र लेखन व गद्य आकलन',
          'वृत्तांत लेखन व विज्ञापन लेखन',
          'कहानी लेखन व निबंध लेखन'
        ]
      }
    ]
  },
  {
    id: 'san',
    title: 'Sanskrit',
    subtitle: 'Sanskrit — आनन्द / संयुक्त',
    subject: 'Language',
    categoryTag: 'आनन्द / संयुक्त',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: 'आनन्द / संयुक्त साहित्य पाठ',
        chapters: [
          'आद्यकृषकः पृथुवैन्यः',
          'व्यसने मित्रपरीक्षा',
          'सूक्तिसुधा',
          'स एव परमाणुः',
          'युग्ममाला',
          'संस्कृतनाट्ययुग्मम्',
          'वाचनप्रशंसा',
          'नदीसूक्तम्',
          'आदिशङ्कराचार्यः',
          'चित्रकाव्यम्',
          'मानवताधर्मः'
        ]
      },
      {
        title: 'व्याकरण व भाषाभ्यास',
        chapters: [
          'संस्कृत व्याकरण व सुभाषित',
          'कारक व विभक्ती परिचय',
          'धातु व लकार विचार',
          'अनुवाद व संवाद लेखन'
        ]
      }
    ]
  },
  {
    id: 'hist',
    title: 'History and political Science',
    subtitle: 'History & Political Science',
    subject: 'Social Science',
    categoryTag: 'History & Civics',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: '🏛️ History',
        chapters: [
          'Historiography — Development in the West',
          'Historiography — Indian Tradition',
          'Applied History',
          'History of Indian Arts',
          'Mass Media and History',
          'Entertainment and History',
          'Sports and History',
          'Tourism and History',
          'Heritage Management'
        ]
      },
      {
        title: '🏛️ Political Science',
        chapters: [
          'Working of the Constitution',
          'The Electoral Process',
          'Political Parties',
          'Social and Political Movements',
          'Challenges Faced by Indian Democracy'
        ]
      }
    ]
  },
  {
    id: 'geo',
    title: 'Geography',
    subtitle: 'Geography 🌍',
    subject: 'Social Science',
    categoryTag: 'Geography 🌍',
    boardInfo: 'SSC Maharashtra Board • Std 10',
    sections: [
      {
        title: 'Geography Chapters',
        chapters: [
          'Field Visit',
          'Location and Extent',
          'Physiography and Drainage',
          'Climate',
          'Natural Vegetation and Wildlife',
          'Population',
          'Human Settlements',
          'Economy and Occupations',
          'Tourism, Transport and Communication'
        ]
      }
    ]
  }
];

export const getAllChaptersForSubject = (subject: SubjectCatalogItem): string[] => {
  return subject.sections.flatMap(s => s.chapters);
};
