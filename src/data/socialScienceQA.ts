export interface ShortAnswerItem {
  question: string;
  answerPoints: string[];
  marks: number;
}

export interface GiveReasonItem {
  statementOrQuestion: string;
  reasons: string[];
  marks: number;
}

export interface BriefAnswerItem {
  question: string;
  introduction?: string;
  detailedPoints: {
    subheading: string;
    description: string;
  }[];
  conclusion?: string;
  marks: number;
}

export interface TimelineEvent {
  yearOrEra: string;
  event: string;
  significance?: string;
}

export interface ConceptMapGroup {
  category: string;
  items: string[];
}

export interface ChapterSocialQA {
  chapterTitle: string;
  subjectType: 'History' | 'Political Science' | 'Geography';
  timelineOrConceptMapTitle?: string;
  timelineEvents?: TimelineEvent[];
  conceptMapItems?: ConceptMapGroup[];
  giveReasons: GiveReasonItem[];
  shortAnswers: ShortAnswerItem[];
  briefAnswers: BriefAnswerItem[];
}

export const SOCIAL_SCIENCE_CHAPTER_QA: Record<string, ChapterSocialQA> = {
  // =========================================================================
  // 🏛️ HISTORY (इतिहास — ९ पाठ)
  // =========================================================================

  'Historiography — Development in the West': {
    chapterTitle: 'Historiography — Development in the West',
    subjectType: 'History',
    timelineOrConceptMapTitle: 'Timeline of Notable Western Thinkers & Historiographical Turning Points',
    timelineEvents: [ { yearOrEra: '1596–1650', event: 'René Descartes', significance: 'Insisted on verifying the reliability of historical documents; authored "Discourse on the Method".' },
      { yearOrEra: '1694–1778', event: 'Voltaire (François-Marie Arouet)', significance: 'Founded modern historiography by emphasizing human relations, social traditions, trade, and agriculture.' },
      { yearOrEra: '1770–1831', event: 'Georg Wilhelm Friedrich Hegel', significance: 'Introduced Dialectics (Thesis, Antithesis, Synthesis) and historical reality through reason.' },
      { yearOrEra: '1795–1886', event: 'Leopold von Ranke', significance: 'Advocated critical analysis of original documents and rejected romanticizing history.' },
      { yearOrEra: '1818–1883', event: 'Karl Marx', significance: 'Class Theory: History is not about abstract ideas but living people driven by means of production and class struggle.' },
      { yearOrEra: '1949 onwards', event: 'Simone de Beauvoir', significance: 'Established Feminist Historiography emphasizing the rethinking and inclusion of women in historical writing.' },
      { yearOrEra: '1926–1984', event: 'Michel Foucault', significance: 'Authored "Archaeology of Knowledge"; rejected chronological linearity to explain historical transitions in knowledge.' }
    ],
    giveReasons: [
        { statementOrQuestion: 'Historical research was driven to focus on in-depth study of particular aspects of women’s life.',
        reasons: [
          'Initially, historical writing was predominantly male-centric, focusing primarily on male rulers, conquests, and patriarchal events.',
          'French feminist thinker Simone de Beauvoir established the fundamentals of feminism, proving that women were systematically marginalized in historical narratives.',
          'Consequently, feminist historiography emerged, driving researchers to focus on women’s employment, role in trade unions, domestic life, and institutional status.'
        ],
        marks: 2
      },
      {
        statementOrQuestion: 'Foucault called his method "The Archaeology of Knowledge".',
        reasons: [
          'Michel Foucault rejected the conventional practice of arranging historical events in a strict chronological sequence.',
          'He pointed out that archaeology does not aim at reaching the ultimate historical truth, but attempts to explain transitions in the past.',
          'He drew attention to previously unacknowledged areas like science of medicine, psychological illnesses, and prison administration from a historical viewpoint.'
        ],
        marks: 2
      },
      {
        statementOrQuestion: 'Voltaire is said to be the founder of modern historiography.',
        reasons: [
          'Prior to Voltaire, historical writing concentrated solely on objective truth, royal dynasties, and divine interventions.',
          'Voltaire posited that understanding prevailing social traditions, trade, economy, and agriculture was equally essential to writing history.',
          'His progressive view that human life in all its aspects must be considered brought about modern historiography.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is Dialectics according to Hegel?',
        answerPoints: [
          'According to Georg Hegel, the human mind cannot grasp the true meaning of an event without understanding its opposite (e.g., True vs False, Good vs Bad).',
          'A theory is proposed first called the "Thesis". Another contrary theory called the "Antithesis" is formulated.',
          'After thorough logical discussion of both, a synthesized theory is arrived at, termed "Synthesis". This method is called Dialectics.'
        ],
        marks: 2
      },
      {
        question: 'What are the main characteristics of modern historiography?',
        answerPoints: [
          '1. Scientific Method: Questions are based on scientific principles and are anthropocentric (about human deeds).',
          '2. Reliable Evidence: Answers to historical questions are substantiated by trustworthy, verified evidence.',
          '3. Graph of Human Progress: Presents a graph of humanity\'s journey with the help of past human deeds.',
          '4. Interdisciplinary Approach: Draws upon linguistics, archaeology, numismatics, and epigraphy.'
        ],
        marks: 2
      },
      {
        question: 'Write a short note on Annales School.',
        answerPoints: [
          'At the onset of the 20th century, a new school of historiography arose in France known as the "Annales School".',
          'It established that history is not merely about kings, great leaders, wars, and politics.',
          'It encompasses climate, local people, agriculture, trade, technology, transport, and collective psychology of the times.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain Karl Marx\'s Class Theory in detail.',
        introduction: 'In the 19th century, German philosopher Karl Marx introduced a revolutionary materialist perspective on historical development in his celebrated treatise "Das Kapital".',
        detailedPoints: [
            { subheading: '1. Material Needs over Abstract Ideas',
            description: 'Marx asserted that history is not about abstract ideas but about concrete living people and their fundamental struggle to secure biological and economic needs.'
          },
          {
            subheading: '2. Means of Production & Social Relationships',
            description: 'Fundamental human relationships are shaped by the prevailing ownership of the means of production necessary to fulfill basic societal needs.'
          },
          {
            subheading: '3. Unequal Access and Class Struggle',
            description: 'Because access to the means of production is never equal across strata, society divides into conflicting classes: the exploiting class (bourgeoisie) and the exploited class (proletariat).'
          },
          {
            subheading: '4. Inevitability of Conflict',
            description: 'Human history is a continuous chronicle of class struggle, wherein the class controlling economic resources systematically exploits the working classes.'
          }
        ],
        conclusion: 'Marx\'s Class Theory transformed 20th-century historiography by redirecting scholarly attention to socioeconomic structures, labor, and subaltern classes.',
        marks: 4
      }
    ]
  },

  'Historiography — Indian Tradition': {
    chapterTitle: 'Historiography — Indian Tradition',
    subjectType: 'History',
    timelineOrConceptMapTitle: 'Chronological Development of Indian Historiography',
    timelineEvents: [ { yearOrEra: 'Ancient Times', event: 'Oral Epics & Harappan Inscriptions', significance: 'Preservation of genealogies through Rigvedic oral recitations, cave engravings, and stone inscriptions like Sohgaura copper plate.' },
      { yearOrEra: '12th Century CE', event: 'Kalhana writes "Rajatarangini"', significance: 'First critical Sanskrit history of Kashmir using coins, inscriptions, monuments, and local chronicles.' },
      { yearOrEra: 'Sultanate & Mughal Era', event: 'Ziauddin Barani & Abul Fazl ("Akbarnama")', significance: 'Barani defined duties of historians; Abul Fazl adopted rigorous scrutiny of authentic administrative records.' },
      { yearOrEra: '1784 CE', event: 'Sir William Jones establishes Asiatic Society', significance: 'Inaugurated Western Indological research into ancient Indian literature, Sanskrit scriptures, and history.' },
      { yearOrEra: '19th–20th Century', event: 'Nationalist Historiography', significance: 'Scholars like Vishnushastri Chiplunkar, V. K. Rajwade, and R. G. Bhandarkar restored pride in India\'s golden heritage against British prejudice.' },
      { yearOrEra: 'Post-Independence', event: 'Marxist, Subaltern & Feminist Perspectives', significance: 'Damodar Kosambi, Mahatma Phule, Dr. B. R. Ambedkar, and Tarabai Shinde diversified historiography to bottom-up narratives.' }
    ],
    giveReasons: [
        { statementOrQuestion: 'Writing of regional history received a great momentum during the 19th and 20th centuries.',
        reasons: [
          'Nationalist historiography ignited immense patriotic pride among Indian scholars against biased colonial British depictions.',
          'Scholars recognized that India is an immense subcontinent with rich regional histories that needed localized critical research.',
          'Notable historians like V. K. Rajwade dedicated their lives to collecting Maratha historical documents, inspiring regional historical writing across Maharashtra, Bengal, and Southern India.'
        ],
        marks: 2
      },
      {
        statementOrQuestion: 'Govind Sakharam Sardesai was honored with the title "Riyasatkar".',
        reasons: [
          'G. S. Sardesai published an exhaustive and monumental multi-volume historical series titled "Marathi Riyasat".',
          'He rendered an invaluable service by compiling, verifying, and publishing vast primary Marathi historical archives covering several centuries of Maratha rule.',
          'In recognition of this singular historical contribution, the public and scholars revered him as "Riyasatkar".'
        ],
        marks: 2
      },
      {
        statementOrQuestion: 'Bakhar is an important type of historical document of medieval times.',
        reasons: [
          'Bakhars contain eulogies of heroes, accounts of historic battles, stories of great men, and prevailing political upheavals.',
          'They provide crucial contemporary insights into Maratha statecraft, military strategy, and societal conditions (e.g., "Sabhasad Bakhar" written by Krishnaji Anant Sabhasad on Chhatrapati Shivaji Maharaj).',
          'They serve as vital linguistic and cultural mirrors of medieval Marathi language.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is Subaltern History?',
        answerPoints: [
          'The word "Subaltern" means the "bottommost ranks" in society.',
          'Italian philosopher Antonio Gramsci emphasized that history must be written from the viewpoint of marginalized, downtrodden communities rather than rulers.',
          'In India, Mahatma Jyotirao Phule (through "Gulamgiri") and Dr. Babasaheb Ambedkar (through "Who Were the Shudras?" and "The Untouchables") championed subaltern historiography.'
        ],
        marks: 2
      },
      {
        question: 'State the contribution of V. K. Rajwade to Marathi historiography.',
        answerPoints: [
          'Rajwade compiled and edited 22 volumes of "Marathyanchya Itihasachi Sadhane".',
          'He firmly declared: "History is all-inclusive; it is not merely the political affairs, conspiracies, and wars of kings."',
          'He founded the "Bharat Itihas Samshodhak Mandal" in Pune in 1910 to preserve authentic documents.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain the contribution of Nationalist Historiography in India.',
        introduction: 'Nationalist historiography emerged in the late 19th and early 20th centuries as a patriotic response against prejudiced British colonial narratives that belittled Indian culture.',
        detailedPoints: [
            { subheading: '1. Restoration of National Self-Respect',
            description: 'Nationalist historians revived awareness of the golden era of ancient Indian civilization, refuting colonial claims that Indians lacked historical consciousness.'
          },
          {
            subheading: '2. Renowned Nationalist Historians',
            description: 'Eminent scholars including R. G. Bhandarkar, M. G. Ranade, V. K. Rajwade, Vishnushastri Chiplunkar, and Vinayak Damodar Savarkar critically investigated original sources.'
          },
          {
            subheading: '3. Sparking the Indian Freedom Struggle',
            description: 'V. D. Savarkar\'s seminal work "The Indian War of Independence, 1857" radically redefined the 1857 uprising from a mere sepoy mutiny into a national war of liberation.'
          },
          {
            subheading: '4. Promotion of Regional Historiography',
            description: 'It stimulated regional historical explorations, leading to deep archives on the Maratha Empire, South Indian dynasties, and Rajput chivalry.'
          }
        ],
        conclusion: 'Nationalist historiography provided the intellectual and emotional backbone for India\'s freedom movement.',
        marks: 4
      }
    ]
  },

  'Applied History': {
      chapterTitle: 'Applied History',
      subjectType: 'History',
      timelineOrConceptMapTitle: 'Classification of Cultural and Natural Heritage',
      conceptMapItems: [
          { category: 'Tangible Cultural Heritage',
          items: ['Ancient Sites', 'Historical Buildings & Monuments', 'Coins & Sculptures', 'Manuscripts', 'Traditional Paintings']
        },
        {
          category: 'Intangible Cultural Heritage',
          items: ['Oral Traditions & Language', 'Performing Arts (Dance, Drama)', 'Traditional Craftsmanship', 'Festivals & Rituals', 'Traditional Knowledge (Ayurveda)']
        },
        {
          category: 'Natural Heritage (UNESCO)',
          items: ['Flora & Fauna', 'Ecology & Geomorphic Characteristics', 'Western Ghats (Kaas Plateau)', 'Kaziranga National Park', 'Sundarbans']
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'It is essential to study Applied History for modern society.',
          reasons: [
            'Applied History (Public History) overcomes the common misconception that history is irrelevant to day-to-day life.',
            'It provides invaluable insights into past decision-making processes, guiding modern town planners, policymakers, and industry leaders.',
            'It creates diverse vocational opportunities in tourism, museum curatorship, archive conservation, and heritage management.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'The list of world heritage sites declared by UNESCO is significant.',
        reasons: [
          'UNESCO recognizes outstanding universal cultural and natural sites that are essential to global human civilization.',
          'Inclusion on the list ensures international financial assistance, expert conservation, and protection against war and neglect.',
          'It promotes global tourism while fostering environmental and historical preservation awareness.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is Public History?',
        answerPoints: [
          'Public History is a field of study concerned with the application of history for the benefit of common people in the present and future.',
          'It actively connects professional historians with the public in museums, historical cinema, architectural restoration, and eco-tourism.',
          'It dispels the belief that history is only for academics.'
        ],
        marks: 2
      },
      {
        question: 'What are the main objectives of the National Film Archive of India (NFAI)?',
        answerPoints: [
          'Established in Pune in 1964 by the Ministry of Information and Broadcasting.',
          '1. To search and acquire rare Indian cinema heritage for posterity.',
          '2. To classify, document, and conduct research on film heritage.',
          '3. To serve as a center for the dissemination of film culture.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'How is history useful in the present times according to Applied History?',
        introduction: 'Applied History demonstrates that the past is directly connected to the present, serving as a compass for future progress.',
        detailedPoints: [
            { subheading: '1. Understanding Present Social Structures',
            description: 'Present-day political systems, religious traditions, and cultural customs have historical roots; understanding their origins helps solve contemporary societal tensions.'
          },
          {
            subheading: '2. Guiding Policy Formulation',
            description: 'Governments and city planners evaluate historical urban patterns, flood histories, and trade routes to make informed governance decisions.'
          },
          {
            subheading: '3. Employment and Economic Opportunities',
            description: 'Heritage walks, monument maintenance, archive digitizing, and museum curatorship generate substantial skilled employment for youth.'
          },
          {
            subheading: '4. Preserving Cultural Identity',
            description: 'Conserving monuments and oral folklore instills pride and a sense of shared identity across communities.'
          }
        ],
        conclusion: 'Applied History bridges the gap between scholarly archives and real-world public welfare.',
        marks: 4
      }
    ]
  },

  'History of Indian Arts': {
      chapterTitle: 'History of Indian Arts',
      subjectType: 'History',
      timelineOrConceptMapTitle: 'Indian Art Traditions & Architectural Evolution',
      conceptMapItems: [
          { category: 'Folk Art Traditions',
          items: ['Warli Painting (Maharashtra)', 'Madhubani (Bihar)', 'Kalamkari (Andhra Pradesh)', 'Chitrakathi Tradition (Pinguli)', 'Phad Painting (Rajasthan)']
        },
        {
          category: 'Classical Art Traditions',
          items: ['Ajanta Fresco Murals', 'Mughal Miniature Paintings', 'Maratha Murals at Wai & Satara', 'Tanjore Glass Paintings']
        },
        {
          category: 'Rock-Cut Architecture',
          items: ['Barabar Caves (Ashokan Era)', 'Ajanta & Ellora Caves (Rashtrakuta Kailash Temple)', 'Elephanta Island (Trimurti)']
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'An expert with deep knowledge of art history is required in the art market.',
          reasons: [
            'In the commercial art market, works of art are bought and sold for millions of rupees, creating risks of forgery.',
            'An art historian can authenticate whether an artifact is genuine or duplicate by analyzing stylistic nuances, pigment age, and signatures.',
            'The expert can accurately assess the commercial value and historical significance of an artwork.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'The style of Maratha painting is distinctive.',
        reasons: [
          'Maratha paintings developed in the late 17th century as mural paintings, miniatures, and manuscript illustrations.',
          'They are prominently seen in wadas at Wai, Menavali, Satara, and Jamgaon, illustrating mythological themes like Ramayana, Mahabharata, and court scenes.',
          'They feature a blend of indigenous folk style with influences from Rajput, Mughal, and European pictorial techniques.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'Write a short note on Warli Painting.',
        answerPoints: [
          'Warli is an ancient indigenous folk painting tradition of Thane and Palghar districts in Maharashtra.',
          'Practiced predominantly by Warli tribal women during marriages and harvest festivals.',
          'Simple geometric shapes (triangles, circles, squares) painted with white rice paste on ochre cow-dung plastered mud walls, depicting Tarpa dances, farming, and hunting.'
        ],
        marks: 2
      },
      {
        question: 'What are the main styles of Temple Architecture in India?',
        answerPoints: [
          '1. Nagara Style: Characterized by beehive-shaped curvilinear towers (shikharas), prevalent in Northern India (Khajuraho, Konark).',
          '2. Dravida Style: Characterized by pyramidal stepped gopurams, prevalent in Southern India (Brihadisvara Temple, Tanjore).',
          '3. Vesara Style: A harmonious fusion of Nagara and Dravida styles, prevalent in Karnataka and Maharashtra (Hoysala temples).'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Describe the salient features of the rock-cut Kailash Temple at Ellora.',
        introduction: 'The Kailash Temple (Cave 16) at Ellora is one of the greatest engineering and artistic wonders in the history of global architecture.',
        detailedPoints: [
            { subheading: '1. Monolithic Top-Down Excavation',
            description: 'Carved entirely out of a single enormous basalt cliff from top to bottom under the patronage of Rashtrakuta King Krishna I in the 8th century CE.'
          },
          {
            subheading: '2. Colossal Dimensions and Intricate Sculpture',
            description: 'Features a massive gateway, Nandi mandapa, towering shikhara, and courtyard surrounded by two-story cloistered arcades filled with life-sized sculpted elephants and deities.'
          },
          {
            subheading: '3. Depiction of Epic Scenes',
            description: 'The plinth is adorned with panels depicting Ravana attempting to shake Mount Kailash, along with intricate scenes from the Ramayana and Mahabharata.'
          }
        ],
        conclusion: 'Recognized as a UNESCO World Heritage Site, the Kailash Temple represents the zenith of ancient Indian rock-cut sculptural mastery.',
        marks: 4
      }
    ]
  },

  'Mass Media and History': {
      chapterTitle: 'Mass Media and History',
      subjectType: 'History',
      timelineOrConceptMapTitle: 'Chronological Milestones in Indian Print & Broadcast Media',
      timelineEvents: [ { yearOrEra: '1780 CE', event: 'Bengal Gazette', significance: 'First English newspaper in India, started by James Augustus Hickey.' },
        { yearOrEra: '1832 CE', event: 'Darpan', significance: 'First Marathi newspaper, started on 6th January 1832 by Balshastri Jambhekar (celebrated as "Patrakar Din").' },
        { yearOrEra: '1840 CE', event: 'Prabhakar', significance: 'Started by Bhau Mahajan; published "Shatapatre" by Lokhitvadi for social reform.' },
        { yearOrEra: '1842 CE', event: 'Dnyanoday', significance: 'Printed the first illustration/map in an Indian newspaper (1842) and reported telegraph installations.' },
        { yearOrEra: '1881 CE', event: 'Kesari & Mahratta', significance: 'Started by Gopal Ganesh Agarkar and Bal Gangadhar Tilak, awakening political consciousness against British rule.' },
        { yearOrEra: '1927–1936', event: 'All India Radio (Akashvani)', significance: 'Private broadcasting nationalized as Indian State Broadcasting Service, renamed "Akashvani" (suggested by poet Pandit Narendra Sharma).' },
        { yearOrEra: '1959 CE', event: 'Doordarshan', significance: 'First television broadcasting initiated in Delhi, black-and-white to color transition during 1982 Asian Games.' }
      ],
      giveReasons: [
          { statementOrQuestion: 'Any information received through mass media needs to be reviewed critically.',
          reasons: [
            'Information disseminated across mass media can be biased, politically motivated, or sensationalized.',
            'A famous example is the German magazine "Stern", which purchased and published forged handwritten diaries attributed to Adolf Hitler, later proven fake.',
            'Critical verification through multiple authentic historical sources prevents the spread of misinformation and propaganda.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Television is the most popular audio-visual mass medium.',
        reasons: [
          'Newspapers are limited to visual text and radio to audio, whereas television combines both sight and sound.',
          'Television transcends literacy barriers, allowing common citizens to witness global live events in real-time in their living rooms.',
          'Specialized channels like Discovery, History TV18, and National Geographic make history and science vivid and engaging.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'Write a short note on Balshastri Jambhekar.',
        answerPoints: [
          'Revered as the "Father of Marathi Journalism" (Aadya Patrakar).',
          'Started the first Marathi newspaper "Darpan" on 6th January 1832, which is celebrated as "Patrakar Din" across Maharashtra.',
          'Also launched the first Marathi monthly magazine "Digdarshan" in 1840, discussing history, science, and nature.'
        ],
        marks: 2
      },
      {
        question: 'Explain the role of newspapers during the Indian freedom struggle.',
        answerPoints: [
          '1. Awakened political consciousness and patriotic pride among masses.',
          '2. Criticized repressive policies of the British colonial government.',
          '3. Addressed social evils like caste discrimination, child marriage, and illiteracy.',
          '4. United leaders and common citizens across diverse linguistic provinces.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Why is history essential for the operation of Mass Media?',
        introduction: 'Mass media channels—newspapers, radio, television, and web portals—require historical research for daily news reporting and specialized programming.',
        detailedPoints: [
            { subheading: '1. Background to Current News',
            description: 'When breaking news occurs (such as international conflicts, parliamentary debates, or natural calamities), media outlets must explain the historical background to provide context.'
          },
          {
            subheading: '2. Special Memorial Editions & Columns',
            description: 'Newspapers publish commemorative articles and editorials on milestone anniversaries (e.g., 75 years of Independence, centenary of World War I), requiring authentic historical archives.'
          },
          {
            subheading: '3. Historical Documentaries & Serial Production',
            description: 'Television serials like "Bharat Ek Khoj", "Raja Shivchhatrapati", and mythological epics demand precise historical advice on costumes, weapons, language dialects, and architecture.'
          },
          {
            subheading: '4. Akashvani Historical Features',
            description: 'Akashvani relies on historical archives for programs like "Chintan", speeches of national leaders, and historical play broadcasts.'
          }
        ],
        conclusion: 'Historians play an indispensable role as researchers, scriptwriters, and consultants in modern mass communication industries.',
        marks: 4
      }
    ]
  },

  'Entertainment and History': {
      chapterTitle: 'Entertainment and History',
      subjectType: 'History',
      timelineOrConceptMapTitle: 'Forms of Indian Folk Theatre and Dramatic Entertainment',
      conceptMapItems: [
          { category: 'Puppetry Traditions',
          items: ['Kathputli (Rajasthan)', 'Gombeyatta (Karnataka)', 'Tholu Bommalata (Andhra Shadow Puppets)', 'Kalasutri Bahulya (Maharashtra Pinguli)']
        },
        {
          category: 'Folk Musical Theatricals',
          items: ['Dashavatara (Konkan/Goa)', 'Tamasha with Lavani (Maharashtra)', 'Powada (Heroic Ballad)', 'Bharud (Saint Eknath)', 'Keertan (Naradiya & Varkari)']
        },
        {
          category: 'Pioneering Cinema Figures',
          items: ['Dadasaheb Phalke ("Raja Harishchandra", 1913)', 'Baburao Painter (Maharashtra Film Company)', 'V. Shantaram (Prabhat Film Company)']
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Dadasaheb Phalke is known as the "Father of Indian Cinema".',
          reasons: [
            'He produced India\'s first indigenous full-length silent feature film "Raja Harishchandra" in 1913.',
            'He established the complete technical and artistic infrastructure for film production in India against immense odds.',
            'He laid the groundwork for India\'s film industry, inspiring generations of Indian filmmakers.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Bharud is considered an important medium of popular enlightenment.',
        reasons: [
          'Composed originally by Saint Eknath, Bharuds are theatrical allegorical folk songs rich in humor and colloquial Marathi.',
          'They use everyday domestic metaphors (e.g., snakebite, washerman, astrologer) to teach deep spiritual values and combat social vices like superstition, hypocrisy, and alcoholism.',
          'Their lively drama and musicality made them immensely popular across rural Maharashtra.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is Dashavatara theatre?',
        answerPoints: [
          'A traditional folk theatre form performed in the Konkan and Goa regions during religious temple festivals.',
          'Based on the ten incarnations (Dashavatara) of Lord Vishnu, culminating in the battle between Lord Vishnu and evil demons (Ahyasura).',
          'Characterized by bright makeup, wooden masks, dramatic sword fights, and spontaneous humorous dialogue.'
        ],
        marks: 2
      },
      {
        question: 'Write a short note on Powada.',
        answerPoints: [
          'Powada is a dramatic heroic ballad unique to Maharashtra.',
          'The earliest notable powada was composed by Agindas (Agyandas) praising Chhatrapati Shivaji Maharaj\'s slaying of Afzal Khan.',
          'During the 19th-century freedom struggle and Samyukta Maharashtra Movement, Shahirs like Annabhau Sathe and Amar Sheikh used powadas to awaken public zeal.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain the difference between Classical Theatre and Folk Theatre in India.',
        introduction: 'Indian performing arts have evolved across centuries into two distinct streams: Classical (Shastriya) and Folk (Loka-natya).',
        detailedPoints: [
            { subheading: '1. Rules and Structure',
            description: 'Classical theatre strictly follows codified rules laid down in Bharata Muni\'s "Natyashastra", while folk theatre is spontaneous, flexible, and evolved through oral community traditions.'
          },
          {
            subheading: '2. Language and Medium',
            description: 'Classical drama used formal Sanskrit and Prakrit, whereas folk theatre employs regional colloquial dialects understood by local villagers.'
          },
          {
            subheading: '3. Performance Spaces',
            description: 'Classical theatre was performed in palace auditoriums and temple mandapas for royal elites; folk theatre (Tamasha, Bhavai, Jatra) is performed in open village squares, fairs, and fields.'
          },
          {
            subheading: '4. Themes and Audience Interaction',
            description: 'Classical drama explores high philosophical, romantic, and heroic epics, while folk theatre directly incorporates local gossip, social satire, audience banter, and moral parables.'
          }
        ],
        conclusion: 'Both streams have mutually enriched each other, keeping India\'s theatrical heritage vibrant for millennia.',
        marks: 4
      }
    ]
  },

  'Sports and History': {
      chapterTitle: 'Sports and History',
      subjectType: 'History',
      timelineOrConceptMapTitle: 'Milestones in the History of Sports & Olympic Games',
      timelineEvents: [ { yearOrEra: 'Ancient Greece (776 BCE)', event: 'Ancient Olympic Games', significance: 'Originated at Olympia, Greece, as religious and athletic competitions between Greek city-states.' },
        { yearOrEra: '1896 CE', event: 'Modern Olympic Games', significance: 'Revived in Athens, Greece, through the efforts of French educator Pierre de Coubertin.' },
        { yearOrEra: '1928, 1932, 1936', event: 'Major Dhyan Chand\'s Olympic Hockey Golds', significance: 'Indian Hockey Team captained by the "Wizard of Hockey" Dhyan Chand won gold in Amsterdam, Los Angeles, and Berlin (29th August is celebrated as National Sports Day).' },
        { yearOrEra: '1952 CE', event: 'Khashaba Jadhav wins Olympic Wrestling Bronze', significance: 'First individual Olympic medal for independent India at the Helsinki Olympic Games.' }
      ],
      giveReasons: [
          { statementOrQuestion: 'Currently, the structure of sports economy has been significantly affected by globalization.',
          reasons: [
            'Global satellite telecasts allow sports fans worldwide to watch matches like the FIFA World Cup, Olympic Games, and IPL in real time.',
            'Corporations invest millions of rupees in player endorsements, team sponsorships, and commercial advertisements during live broadcasts.',
            'Retired players now find lucrative global careers as expert television commentators, analysts, coaches, and sports journalists.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Toys can tell us about history.',
        reasons: [
          'Clay toys excavated from Indus Valley sites (like moving carts and whistles) reveal ancient technological capabilities and religious customs.',
          'Clay dolls found in Pompeii, Italy, confirmed ancient Indo-Roman trade and cultural exchange during the 1st century CE.',
          'Traditional toys reflect prevailing festivals, folklore, and materials of their respective historical periods.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'Write a short note on Major Dhyan Chand.',
        answerPoints: [
          'Known universally as the "Wizard of Hockey" for his extraordinary stickwork and ball control.',
          'Instrumental in winning Olympic Gold medals for India in 1928 (Amsterdam), 1932 (Los Angeles), and 1936 (Berlin).',
          'Honored with the Padma Bhushan; his birth anniversary on 29th August is celebrated across India as "National Sports Day".'
        ],
        marks: 2
      },
      {
        question: 'Differentiate between Outdoor Games and Indoor Games.',
        answerPoints: [
          '1. Indoor Games: Played within enclosed spaces, requiring mental strategy and sitting arrangements (e.g., Chess, Carrom, Kanch-kavdya, Snakes and Ladders).',
          '2. Outdoor Games: Played in open fields, requiring physical endurance, stamina, and running (e.g., Kabaddi, Kho-Kho, Cricket, Football).'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain how sports literature and movies reflect the relationship between Sports and History.',
        introduction: 'The convergence of sports and history has generated a thriving field of literature, encyclopedias, and biographical cinema.',
        detailedPoints: [
            { subheading: '1. Sports Encyclopedias and Scholarly Treatises',
            description: 'Exhaustive encyclopedias like "Vyayam Dnyankosh" compiled by the Mujumdar brothers document ancient wrestling techniques, Mallakhamb origins, and traditional Indian akhadas.'
          },
          {
            subheading: '2. Biographies of Sporting Legends',
            description: 'Autobiographies like "Sunny Days" by Sunil Gavaskar and "Playing It My Way" by Sachin Tendulkar chronicle historical matches and the evolution of international cricket strategy.'
          },
          {
            subheading: '3. Biographical Sports Cinema',
            description: 'Blockbuster movies like "Mary Kom", "Dangal" (Phogat sisters), "Bhaag Milkha Bhaag", and "83" accurately recreate historical sports events, training struggles, and societal biases.'
          },
          {
            subheading: '4. Role in National Pride',
            description: 'These works immortalize the triumphs of national athletes, educating future generations and inspiring young sporting talent.'
          }
        ],
        conclusion: 'Sports media serves as a bridge connecting past athletic triumphs with contemporary cultural identity.',
        marks: 4
      }
    ]
  },

  'Tourism and History': {
      chapterTitle: 'Tourism and History',
      subjectType: 'History',
      timelineOrConceptMapTitle: 'Historical Travelers & Types of Tourism',
      conceptMapItems: [
          { category: 'Historic Global Travelers',
          items: [
            'Benjamin of Tudela (12th c. - Europe & Asia diary)',
            'Marco Polo (13th c. - Introduced China to Europe)',
            'Ibn Battuta (14th c. - Travelled 73,000 miles across Islamic world & India)',
            'Gerardus Mercator (16th c. - World cartographer)',
            'Thomas Cook (19th c. - Founder of modern organized commercial tourism)'
          ]
        },
        {
          category: 'Types of Tourism in India',
          items: [
            'Historical Tourism (Forts, Palaces, UNESCO Heritage sites)',
            'Geographic Tourism (Lonar Crater, Kaas Valley of Flowers)',
            'Health / Medical Tourism (Ayurveda Panchakarma, Yoga, modern surgeries)',
            'Agro-Tourism (Rural farm stays, vineyard visits)',
            'Sports Tourism (Olympic Games, Cricket World Cup tours)'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'The number of people traveling for tourism has increased dramatically in modern times.',
          reasons: [
            'Development of fast, safe air and rail networks has made domestic and international travel accessible and efficient.',
            'Rise in disposable income, online hotel booking portals, and global communication have simplified holiday planning.',
            'Growing interest in world heritage, culinary tourism, yoga retreats, and natural wonders has popularized travel as a lifestyle pursuit.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'It is important to conserve and preserve our heritage sites for tourism.',
        reasons: [
          'Heritage sites represent the tangible history, architectural genius, and cultural pride of our ancestors.',
          'They attract thousands of domestic and foreign tourists, generating substantial revenue and employment for local communities.',
          'Vandalism, graffiti, and pollution degrade these irreplaceable sites, risking the loss of UNESCO World Heritage status.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'Who was Thomas Cook and why is he considered a pioneer in tourism?',
        answerPoints: [
          'In the 19th century, Thomas Cook organized a round-trip railway journey for 570 people from Leicester to Loughborough in England.',
          'He later established the world\'s first full-fledged commercial travel agency, organizing package tours across Europe and America.',
          'His pioneering efforts laid the foundation of modern commercial tourism and hospitality.'
        ],
        marks: 2
      },
      {
        question: 'Write a short note on Agro-Tourism.',
        answerPoints: [
          'Agro-tourism is an emerging trend where urban tourists visit working rural farms to experience village life.',
          'Tourists participate in farming activities, witness dairy and poultry operations, and enjoy authentic, organic farm-fresh food.',
          'Provides supplementary income to rural farmers and bridges the rural-urban cultural divide.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain what precautions should be taken by tourists visiting historical forts in Maharashtra.',
        introduction: 'Maharashtra possesses hundreds of historic hill and sea forts associated with Chhatrapati Shivaji Maharaj; tourists have a civic responsibility to preserve their sanctity.',
        detailedPoints: [
            { subheading: '1. Preventing Defacement and Vandalism',
            description: 'Tourists must strictly refrain from carving names, writing graffiti, or chipping off stones from ancient ramparts and bastions.'
          },
          {
            subheading: '2. Waste Management & Anti-Plastic Discipline',
            description: 'Avoid littering plastic water bottles, snack packets, and waste; all trash must be carried back down in personal bags to keep the fort clean.'
          },
          {
            subheading: '3. Safety along Steep Cliffs and Bastions',
            description: 'Do not venture near slippery edges or scale precarious ramparts to take dangerous selfies, especially during heavy monsoon fog.'
          },
          {
            subheading: '4. Respecting Sacred and Historical Sanctuaries',
            description: 'Maintain decorum at Samadhis, memorial chhatris, water cisterns (tankas), and ancient shrines without playing loud music or indulging in alcohol.'
          }
        ],
        conclusion: 'Respectful and eco-friendly conduct ensures that Maharashtra\'s glorious fort heritage remains pristine for generations to come.',
        marks: 4
      }
    ]
  },

  'Heritage Management': {
      chapterTitle: 'Heritage Management',
      subjectType: 'History',
      timelineOrConceptMapTitle: 'Pioneering Museums and Archives of the World & India',
      conceptMapItems: [
          { category: 'World Famous Museums',
          items: [
            'Louvre Museum (Paris, France - houses "Mona Lisa" & Code of Hammurabi)',
            'British Museum (London, UK - houses Rosetta Stone & ancient artifacts)',
            'National Museum of Natural History (Smithsonian, Washington D.C., USA)'
          ]
        },
        {
          category: 'Premier Indian Museums & Archives',
          items: [
            'Indian Museum (Kolkata, established 1814 by Nathaniel Wallich - oldest museum in India)',
            'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS, Mumbai - Indo-Saracenic architecture)',
            'National Museum (Janpath, New Delhi)',
            'National Archives of India (New Delhi - largest archival repository in Asia)',
            'Saraswati Mahal Library (Thanjavur, Tamil Nadu - Nayaka & Maratha manuscripts)'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Archives and museums are indispensable for historical research.',
          reasons: [
            'They preserve original manuscripts, royal firmans, diaries, ancient coins, and rare artifacts without alteration.',
            'They provide professional chemical treatment and climate control to safeguard delicate historic papers from insect damage and decay.',
            'They catalog and digitize rare records, allowing researchers to study authentic primary sources systematically.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'The Saraswati Mahal Library in Thanjavur is of monumental historical importance.',
        reasons: [
          'Built during the 16th–17th centuries by Nayaka kings and vastly enriched by Maratha ruler Maharaja Serfoji II.',
          'It preserves over 49,000 rare palm-leaf and paper manuscripts written in Sanskrit, Tamil, Marathi, Telugu, and Persian.',
          'It houses unique collections of historical chronicles, music, medicine (Siddha/Ayurveda), and fine art from medieval India.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'Write a short note on the Louvre Museum in Paris.',
        answerPoints: [
          'Established in Paris in 1793 during the French Revolution, it is currently the world\'s most visited art museum.',
          'Houses the world-famous original painting "Mona Lisa" by Leonardo da Vinci and the ancient stela of the "Code of Hammurabi".',
          'Contains over 380,000 precious artifacts spanning ancient antiquities to modern decorative arts.'
        ],
        marks: 2
      },
      {
        question: 'What is the role of the National Archives of India in New Delhi?',
        answerPoints: [
          'It is the chief repository of non-current records of the Government of India, founded in Kolkata in 1891 as the Imperial Record Department.',
          'Houses millions of public records, maps, treaties, and private papers in temperature-controlled vaults.',
          'It is the largest archival repository in South Asia, catering to global scholars.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain the professional tasks involved in managing and preserving Museum collections.',
        introduction: 'Museum management is a multidisciplinary science requiring expertise in museology, archaeology, chemistry, and public curation.',
        detailedPoints: [
            { subheading: '1. Acquisition and Provenance Verification',
            description: 'Authenticating newly acquired artifacts, determining their legal ownership, historical era, and ethical provenance.'
          },
          {
            subheading: '2. Scientific Conservation and Restoration',
            description: 'Treating damaged metal coins, crumbling paper manuscripts, and wooden sculptures with specialized chemical solvents and pest-fumigation techniques.'
          },
          {
            subheading: '3. Cataloging and Digital Archiving',
            description: 'Assigning accession numbers, preparing detailed bibliographic and physical indices, and maintaining photographic digital records.'
          },
          {
            subheading: '4. Exhibition Design and Public Education',
            description: 'Arranging exhibits with proper lighting, temperature, humidity controls, and informative bilingual signage for visiting students and researchers.'
          }
        ],
        conclusion: 'Effective heritage management ensures that ancient relics are safely passed on to future generations.',
        marks: 4
      }
    ]
  },

  // =========================================================================
  // 🏛️ POLITICAL SCIENCE (राज्यशास्त्र — ५ पाठ)
  // =========================================================================

  'Working of the Constitution': {
      chapterTitle: 'Working of the Constitution',
      subjectType: 'Political Science',
      timelineOrConceptMapTitle: 'Constitutional Pillars: Democracy, Social Justice & Judiciary',
      conceptMapItems: [
          { category: 'Democratic Decentralization',
          items: ['73rd Amendment (Panchayati Raj empowerment)', '74th Amendment (Urban local self-governments)', 'Voting age lowered from 21 to 18 years (61st Amendment, 1988)']
        },
        {
          category: 'Empowerment of Marginalized Classes',
          items: ['Reservation of seats for SC and ST communities', 'Prevention of Atrocities Act (1989)', 'OBC Commission & reservations', 'Minority rights protection']
        },
        {
          category: 'Women\'s Representation',
          items: ['50% reservation in local self-governing bodies in Maharashtra', 'National Commission for Women', 'Protection of Women from Domestic Violence Act (2005)']
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Voting age was reduced from 21 to 18 years in India.',
          reasons: [
            'The 61st Constitutional Amendment of 1988 lowered the voting age from 21 to 18 years.',
            'This gave the youth an early opportunity to participate directly in democratic governance.',
            'It made India the largest democracy in the world with the highest proportion of young voters.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'The basic structure of the Constitution cannot be altered by the Parliament.',
        reasons: [
          'In the landmark Kesavananda Bharati case (1973), the Supreme Court ruled that Parliament has power to amend the Constitution but cannot alter its "Basic Structure".',
          'The Basic Structure includes Republican and Democratic form of government, Federal character, Secularism, and Separation of Powers.',
          'This doctrine prevents any ruling regime from turning into a dictatorship.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is the Right to Information (RTI) Act, 2005?',
        answerPoints: [
          'Enacted in 2005 to foster transparency and accountability in public administration.',
          'Empowers citizens to question administrative decisions and access official public records.',
          'Transformed the relationship between citizen and government from secrecy to democratic openness.'
        ],
        marks: 2
      },
      {
        question: 'What is the "Right-based Approach" adopted post-2000?',
        answerPoints: [
          'In recent decades, reforms are treated as fundamental citizen rights rather than government charity.',
          'Key examples include Right to Information (2005), Right to Education (2009), and Right to Food (2013).',
          'Strengthens human dignity and legal accountability.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain the measures taken by the Indian Constitution to establish Social Justice and Equality.',
        introduction: 'Establishing social justice and equality is one of the core foundational goals enshrined in the Preamble of the Indian Constitution.',
        detailedPoints: [
            { subheading: '1. Abolition of Discrimination (Articles 14–17)',
            description: 'Prohibits discrimination on grounds of religion, race, caste, sex, or place of birth, and declares the practice of Untouchability a punishable crime.'
          },
          {
            subheading: '2. Policy of Reservation of Seats',
            description: 'Guarantees reserved seats in educational institutions and government employment for Scheduled Castes (SC), Scheduled Tribes (ST), and Other Backward Classes (OBC).'
          },
          {
            subheading: '3. Prevention of Atrocities Act (1989)',
            description: 'Enacted to protect Dalits and Adivasis from caste-based violence, terror, and humiliation, establishing special speedy trial courts.'
          },
          {
            subheading: '4. Legal Rights and Protection for Women',
            description: 'Enacted equal inheritance rights, Dowry Prohibition Act, Domestic Violence Act (2005), and 50% reservation in local self-governments to ensure women\'s empowerment.'
          }
        ],
        conclusion: 'These constitutional provisions have systematically empowered oppressed sections to participate in mainstream democracy.',
        marks: 4
      }
    ]
  },

  'The Electoral Process': {
      chapterTitle: 'The Electoral Process',
      subjectType: 'Political Science',
      timelineOrConceptMapTitle: 'Electoral Reforms & Code of Conduct Stages',
      conceptMapItems: [
          { category: 'Key Stages in Election Process',
          items: [
            '1. Demarcation of Constituencies by Delimitation Commission',
            '2. Voter Registration & Final Electoral Rolls',
            '3. Announcement of Election Schedule',
            '4. Filing Nominations & Scrutiny of Candidature',
            '5. Election Campaign & Enforcement of Model Code of Conduct',
            '6. Voting through EVMs / VVPATs',
            '7. Counting of Votes & Declaration of Results'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'The Election Commission of India is established as an independent autonomous body.',
          reasons: [
            'Under Article 324 of the Indian Constitution, the Election Commission operates autonomously, free from interference by the ruling government.',
            'The Chief Election Commissioner cannot be easily removed by the ruling executive; removal requires a special parliamentary impeachment procedure.',
            'Autonomy ensures that elections are conducted in a free, fair, and impartial atmosphere.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'The Model Code of Conduct is strictly enforced before elections.',
        reasons: [
          'Prevents the ruling government from misusing state machinery, public funds, and inaugurating populist welfare schemes to bribe voters.',
          'Prohibits candidates from inciting communal hatred, bribing voters with liquor or money, and using religious places for campaigning.',
          'Maintains an equal, fair playing field for all political parties.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'Who was Sukumar Sen?',
        answerPoints: [
          'Sukumar Sen (an ICS officer) was the first Chief Election Commissioner of independent India, appointed in 1950.',
          'Successfully organized India\'s monumental first general elections in 1951–52 amidst widespread illiteracy and tough geography.',
          'His foundational work established India\'s global reputation as a vibrant electoral democracy.'
        ],
        marks: 2
      },
      {
        question: 'What are EVM and VVPAT machines?',
        answerPoints: [
          'EVM (Electronic Voting Machine): Replaced ballot papers in 2004; saves millions of trees and prevents booth capturing.',
          'VVPAT (Voter Verifiable Paper Audit Trail): Prints a slip visible for 7 seconds showing the candidate voted for, ensuring full transparency.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain the major challenges faced by the Election Commission in conducting free and fair elections in India.',
        introduction: 'Conducting elections for nearly 950 million voters across diverse geographic terrain is the largest democratic logistical operation on Earth.',
        detailedPoints: [
            { subheading: '1. Misuse of Money Power',
            description: 'Illicit distribution of cash, gifts, and liquor to influence poor voters remains a major challenge; the Commission deploys special flying squads to seize unaccounted wealth.'
          },
          {
            subheading: '2. Criminalization of Politics',
            description: 'Political parties frequently field candidates with serious criminal records due to their muscle power and winnability, undermining institutional integrity.'
          },
          {
            subheading: '3. Communal & Casteist Polarizing Propaganda',
            description: 'Candidates sometimes appeal to narrow caste and religious identities, threatening public law, order, and national unity.'
          },
          {
            subheading: '4. Geographic and Logistical Extremities',
            description: 'Setting up polling stations in snowbound Himalayan valleys, dense Andaman forests, and deserts so no citizen is left behind.'
          }
        ],
        conclusion: 'Continuous electoral reforms and active voter vigilance are essential to overcoming these persistent challenges.',
        marks: 4
      }
    ]
  },

  'Political Parties': {
      chapterTitle: 'Political Parties',
      subjectType: 'Political Science',
      timelineOrConceptMapTitle: 'National and Regional Political Parties of India',
      conceptMapItems: [
          { category: 'Recognized National Parties',
          items: [
            'Indian National Congress (INC - 1885)',
            'Communist Party of India (CPI - 1925)',
            'Bharatiya Janata Party (BJP - 1980)',
            'Communist Party of India (Marxist) (CPI-M - 1964)',
            'Bahujan Samaj Party (BSP - 1984)',
            'Nationalist Congress Party (NCP - 1999)',
            'Aam Aadmi Party (AAP)'
          ]
        },
        {
          category: 'Prominent Regional Parties in Maharashtra',
          items: [
            'Shiv Sena (Established 1966 by Balasaheb Thackeray)',
            'Maharashtra Navnirman Sena (MNS - 2006)',
            'Peasants and Workers Party of India (PWP)',
            'Republican Party of India (RPI)'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Coalition politics has established stability in India since 1989.',
          reasons: [
            'After 1989, the era of single-party dominance ended; no single political party won an absolute parliamentary majority.',
            'Parties adopted a common minimum program, forming durable national coalitions like NDA and UPA.',
            'Coalition politics accommodated diverse regional interests and proved that coalitions can provide stable governance.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Regional parties are playing a vital role in Indian politics.',
        reasons: [
          'Regional parties articulate the unique linguistic, cultural, and developmental needs of specific states.',
          'They ensure that national policies address state aspirations, strengthening cooperative federalism.',
          'They have become indispensable partners in forming national coalition governments at the Centre.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What are the essential criteria for a party to be recognized as a National Party?',
        answerPoints: [
          '1. The party must secure at least 6% of valid votes in 4 or more states in Lok Sabha or Assembly elections AND win at least 4 Lok Sabha seats.',
          'OR 2. The party must win at least 2% of total Lok Sabha seats (11 seats) elected from at least 3 different states.'
        ],
        marks: 2
      },
      {
        question: 'What is an Election Manifesto?',
        answerPoints: [
          'A published official document issued by a political party before elections.',
          'Outlines the party\'s ideology, developmental vision, proposed legislation, and welfare promises.',
          'Serves as a yardstick for voters to evaluate the party\'s governance performance.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain the changing nature of regional parties in India across decades.',
        introduction: 'Regional parties have evolved through distinct ideological phases since Indian independence.',
        detailedPoints: [
            { subheading: '1. Separatist Tendencies (1950s–1960s)',
            description: 'Initially, some regional groups felt linguistic and cultural alienation, occasionally voicing demands for secession (e.g., early Dravidian movements and Mizo/Naga struggles).'
          },
          {
            subheading: '2. Demand for Greater State Autonomy (1970s–1980s)',
            description: 'Regional movements shifted focus from secession to demanding greater financial and administrative autonomy from central control, opposing misuse of Article 356.'
          },
          {
            subheading: '3. Assertion of Regional Pride and Development',
            description: 'Parties like Shiv Sena in Maharashtra and Telugu Desam Party in Andhra Pradesh championed the rights of local sons of the soil (Bhumiputra) and localized infrastructure growth.'
          },
          {
            subheading: '4. Partnership in National Governance (1990s–Present)',
            description: 'Regional parties now actively aspire to power at the Centre, joining national coalitions to steer defense, foreign, and economic policy.'
          }
        ],
        conclusion: 'Regional parties have matured into stabilizing pillars of Indian federal democracy.',
        marks: 4
      }
    ]
  },

  'Social and Political Movements': {
      chapterTitle: 'Social and Political Movements',
      subjectType: 'Political Science',
      timelineOrConceptMapTitle: 'Major People\'s Movements in Modern India',
      conceptMapItems: [
          { category: 'Prominent Environmental Movements',
          items: [
            'Chipko Movement (Uttarakhand - Sunderlal Bahuguna & Gaura Devi against deforestation)',
            'Narmada Bachao Andolan (Medha Patkar against submergence of tribal lands)',
            'Water Conservation Movement (Dr. Rajendra Singh - "Waterman of India" in Rajasthan)'
          ]
        },
        {
          category: 'Farmers\' & Workers\' Movements',
          items: [
            'Shetkari Sanghatana (Sharad Joshi - "Freedom of trade and fair remunerative prices")',
            'Bharatiya Kisan Union (Mahendra Singh Tikait)',
            'Trade Union Movements (AITUC, Datta Samant mill workers movement in Mumbai)'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Movements are considered very important in a democracy.',
          reasons: [
            'Movements allow citizens to voice dissent and raise grievances without waiting for elections.',
            'They mobilize public awareness on neglected issues like environmental degradation, displacement, and consumer rights.',
            'They pressure the government to pass progressive legislation like the Right to Information and Forest Rights Acts.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Dr. Rajendra Singh is revered as the "Waterman of India".',
        reasons: [
          'He spearheaded a massive community water harvesting movement in the arid districts of Rajasthan through his NGO "Tarun Bharat Sangh".',
          'He revived thousands of traditional rainwater reservoirs (Johads), restoring dead rivers like Arvari to perennial flow.',
          'He was honored with the prestigious Stockholm Water Prize and Ramon Magsaysay Award for environmental conservation.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What are the main characteristics of a Movement?',
        answerPoints: [
          '1. Collective Action: Involves mass active participation of common citizens around a shared cause.',
          '2. Strong Leadership: Relies on determined leadership to maintain focus, strategy, and morale.',
          '3. Definite Ideology & Program: Possesses clear ideological goals and public awareness programs.',
          '4. Democratic Pressure: Influences public policy through peaceful protests, dharnas, and public advocacy.'
        ],
        marks: 2
      },
      {
        question: 'What were the key demands of the Shetkari Sanghatana led by Sharad Joshi?',
        answerPoints: [
          '1. Demanded fair, remunerative market prices for agricultural produce based on actual cost of production.',
          '2. Demanded the removal of government restrictions on the export of farm commodities.',
          '3. Advocated for debt relief, lower electricity tariffs, and irrigation infrastructure for farmers.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain the causes and impact of the Consumer Movement in India.',
        introduction: 'The Consumer Movement arose in India to protect common citizens from exploitation in the commercial marketplace.',
        detailedPoints: [
            { subheading: '1. Causes of the Movement',
            description: 'Rampant adulteration in foodstuffs, black marketing, artificial hoarding, misleading advertisements, and defective weights and measures cheated consumers.'
          },
          {
            subheading: '2. Enactment of Consumer Protection Act (1986)',
            description: 'Due to sustained citizen agitation, the Indian Parliament enacted the Consumer Protection Act (COPRA), establishing a three-tier quasi-judicial redressal mechanism (District Forum, State Commission, National Commission).'
          },
          {
            subheading: '3. Consumer Rights Recognized',
            description: 'Legally codified fundamental rights: Right to Safety, Right to Information, Right to Choose, Right to be Heard, and Right to Redressal.'
          },
          {
            subheading: '4. Public Awakening Campaigns',
            description: 'Nationwide awareness campaigns like "Jago Grahak Jago" educated citizens to demand tax invoices and check ISI/Agmark certifications.'
          }
        ],
        conclusion: 'The Consumer Movement successfully empowered ordinary buyers, enforcing business ethics and accountability across Indian commerce.',
        marks: 4
      }
    ]
  },

  'Challenges Faced by Indian Democracy': {
      chapterTitle: 'Challenges Faced by Indian Democracy',
      subjectType: 'Political Science',
      timelineOrConceptMapTitle: 'Pillars for Deepening Democracy vs Modern Challenges',
      conceptMapItems: [
          { category: 'Key Challenges Facing Democracy',
          items: [
            'Communalism & Religious Fanaticism',
            'Terrorism & Naxalite Violence (Left-Wing Extremism)',
            'Corruption in Public Administration',
            'Criminalization of Politics & Muscle Power',
            'Socioeconomic Inequality & Poverty'
          ]
        },
        {
          category: 'Measures to Strengthen Democracy',
          items: [
            'Strict anti-defection laws and financial transparency in campaign funding',
            'Fast-track courts for trials of corrupt politicians',
            'Inclusive education and grassroots women empowerment',
            'Active citizen participation beyond periodic voting'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Naxalism is a serious internal security challenge for Indian democracy.',
          reasons: [
            'Originating in Naxalbari (1967) to defend landless laborers, it evolved into an armed guerilla movement opposing the democratic state.',
            'Naxalite groups employ violence, blow up public infrastructure, and target police personnel in interior tribal forest corridors.',
            'It impedes developmental projects, schools, and hospitals in marginalized regions.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Criminalization of politics damages the very foundation of democracy.',
        reasons: [
          'When individuals facing grave criminal charges enter state assemblies and Parliament, public faith in the rule of law is severely eroded.',
          'Such leaders use muscle power and illicit money to intimidate opponents and subvert administrative machinery.',
          'It replaces merit-based governance with organized crime networks.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is Communalism and why is it dangerous?',
        answerPoints: [
          'Communalism is the belief that people of different religions have fundamentally conflicting economic and political interests.',
          'It generates mutual suspicion, religious riots, loss of innocent lives, and damages the secular democratic fabric of the nation.'
        ],
        marks: 2
      },
      {
        question: 'How can Indian democracy be deepened at the grassroots?',
        answerPoints: [
          '1. By decentralizing administrative and financial powers to village Gram Panchayats.',
          '2. Ensuring active participation of women, youth, and marginalized classes in decision-making.',
          '3. Implementing transparency through e-governance and social audits.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'What reforms and measures are essential to make Indian democracy successful and clean?',
        introduction: 'While India is the world\'s largest functioning democracy, systemic reforms are essential to eliminate entrenched corruption, criminalization, and inequality.',
        detailedPoints: [
            { subheading: '1. Strict Electoral Reforms',
            description: 'Barring candidates with proven charges of heinous crimes from contesting elections and enforcing transparent digital auditing of party funding.'
          },
          {
            subheading: '2. Judicial Independence and Speedy Justice',
            description: 'Establishing fast-track special courts to resolve election disputes and criminal cases against MPs and MLAs within one year.'
          },
          {
            subheading: '3. Eradication of Socioeconomic Inequalities',
            description: 'Expanding affordable quality healthcare, rural employment guarantees (MGNREGA), and technical education to bridge the rich-poor gap.'
          },
          {
            subheading: '4. Active and Vigilant Citizenry',
            description: 'Citizens must vote responsibly without accepting cash or liquor, utilize the Right to Information Act, and demand public accountability.'
          }
        ],
        conclusion: 'Democracy is not merely a government structure but a collective way of civilized life; its success rests on an alert, ethical citizenry.',
        marks: 4
      }
    ]
  },

  // =========================================================================
  // 🌍 GEOGRAPHY (भूगोल — ९ पाठ)
  // =========================================================================

  'Field Visit': {
      chapterTitle: 'Field Visit',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Field Visit Methodology & Report Structure',
      conceptMapItems: [
          { category: 'Preparation & Essential Items for Field Visit',
          items: ['Notebook & Clipboard', 'Survey Questionnaire', 'Compass for Direction', 'Topographical Map', 'Camera / GPS Handheld Device', 'First Aid Box', 'Water Bottle & Cap']
        },
        {
          category: 'Structure of a Field Visit Report',
          items: [
            '1. Introduction & Objectives',
            '2. Route Map and Location details',
            '3. Physiography, Soil, and Vegetation observed',
            '4. Human Settlement Patterns & Economic Occupations',
            '5. Environmental Observations & Waste management',
            '6. Conclusion and Acknowledgments'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Field visit is an indispensable study method in Geography.',
          reasons: [
            'Geographical concepts, landforms, vegetation, and human settlements are experienced directly rather than through textbook theory.',
            'Students develop practical skills in observation, map reading, questionnaire interviewing, and environmental assessment.',
            'It fosters a direct understanding of the correlation between physical terrain and human lifestyle.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Carrying a questionnaire is necessary during a field visit.',
        reasons: [
          'A questionnaire helps gather focused, systematic statistical and qualitative data from local farmers, factory managers, or villagers.',
          'It ensures that interviewers do not deviate from the core academic objectives of the study.',
          'It provides authentic primary data needed to draft the final field visit report.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'How will you manage the garbage generated during a field visit?',
        answerPoints: [
          '1. Carry individual cloth or paper bags to collect personal dry waste and snack wrappers.',
          '2. Never litter plastic bottles or wrappers in natural reserves, forts, or villages.',
          '3. Hand over segregated biodegradable and non-biodegradable waste to designated municipal dustbins.'
        ],
        marks: 2
      },
      {
        question: 'Which precautions should be taken to ensure personal safety during a field visit?',
        answerPoints: [
          '1. Always strictly adhere to instructions provided by teachers and local guides.',
          '2. Do not venture into deep river waters, steep cliff edges, or isolated forest trails alone.',
          '3. Carry a personal identity card, emergency phone numbers, and a fully stocked first-aid kit.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Prepare a questionnaire to visit a local commercial sugar factory or farming estate during a field visit.',
        introduction: 'The following structured questionnaire is designed to interview a factory manager or agricultural proprietor during a geography field study:',
        detailedPoints: [
            { subheading: '1. General & Operational Information',
            description: '• In which year was this establishment founded?\n• What is the daily production and crushing capacity of this facility?'
          },
          {
            subheading: '2. Raw Materials & Supply Chain',
            description: '• From what radius do you procure raw sugarcane or agricultural raw materials?\n• What mode of transportation is utilized to transport perishable raw materials without delay?'
          },
          {
            subheading: '3. Employment & Labor Welfare',
            description: '• How many seasonal and permanent workers are employed?\n• What safety and medical measures are provided to the laborers?'
          },
          {
            subheading: '4. Environmental Protection & Byproduct Utilization',
            description: '• How are factory effluents and bagasse treated?\n• Is bagasse utilized for captive co-generation of green electricity?'
          }
        ],
        conclusion: 'The compiled answers provide authentic empirical data for drafting the economic chapter of the field visit report.',
        marks: 4
      }
    ]
  },

  'Location and Extent': {
      chapterTitle: 'Location and Extent',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Comparative Coordinates: India vs Brazil',
      conceptMapItems: [
          { category: 'Republic of India 🇮🇳',
          items: [
            'Latitude: 8°4\' N to 37°6\' N (Indira Point at 6°45\' N is southernmost tip)',
            'Longitude: 68°7\' E to 97°25\' E',
            'Hemisphere: Entirely in Northern and Eastern Hemispheres',
            'Continent: Southern part of Asian Continent',
            'Coastline: Arabian Sea (West), Bay of Bengal (East), Indian Ocean (South)'
          ]
        },
        {
          category: 'Federative Republic of Brazil 🇧🇷',
          items: [
            'Latitude: 5°15\' N to 33°45\' S (Equator and Tropic of Capricorn pass through Brazil)',
            'Longitude: 34°47\' W to 73°48\' W',
            'Hemisphere: Tiny part in Northern Hemisphere; majority in Southern & Western Hemispheres',
            'Continent: Northern part of South American Continent',
            'Coastline: Atlantic Ocean (North and East)'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Brazil is called the "Coffee Pot of the World".',
          reasons: [
            'Brazil has been the world\'s largest producer and exporter of coffee for over 150 consecutive years.',
            'The fertile volcanic terra roxa soil and undulating tropical plateau of São Paulo provide ideal conditions for large-scale coffee plantations (Fazendas).',
            'Coffee exports contribute substantially to Brazil\'s international foreign exchange reserves.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Both India and Brazil have coastlines, but there are distinct differences.',
        reasons: [
          'India has an extensive coastline along the Arabian Sea, Bay of Bengal, and Indian Ocean, featuring prominent deltas on the east coast (Ganga, Godavari).',
          'Brazil faces the North and South Atlantic Ocean, with a long unbroken coast where the Amazon discharges enormous fresh water preventing delta formation.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is the longitudinal extent of India and Brazil?',
        answerPoints: [
          '• India: 68°7\' E to 97°25\' E longitude (a spread of ~29°, resulting in nearly 2 hours time difference between Arunachal Pradesh and Gujarat).',
          '• Brazil: 34°47\' W to 73°48\' W longitude (a vast spread across 4 distinct standard time zones).'
        ],
        marks: 2
      },
      {
        question: 'Identify the neighboring countries of India and Brazil.',
        answerPoints: [
          '• India: Pakistan, Afghanistan (NW); China, Nepal, Bhutan (North); Myanmar, Bangladesh (East); Sri Lanka, Maldives (South).',
          '• Brazil: Boundaries touch almost every South American nation except Chile and Ecuador.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Compare the historical background and post-independence struggles of India and Brazil.',
        introduction: 'Both India and Brazil are major developing democracies with long colonial histories.',
        detailedPoints: [
            { subheading: '1. Colonial Rule & Independence',
            description: 'India was under British colonial rule for nearly 150 years and gained independence on 15th August 1947 through a largely peaceful freedom movement. Brazil was under Portuguese rule for over three centuries, gaining independence on 7th September 1822.'
          },
          {
            subheading: '2. Post-Independence Governance',
            description: 'India established a stable federal parliamentary democratic republic right from independence. Brazil experienced military rule and political instability until establishing a federal presidential republic in 1985.'
          },
          {
            subheading: '3. Global Economic Role',
            description: 'Both nations overcame severe economic crises in the late 20th century and are now key global growth engines, prominent members of the BRICS, G-20, and major international trade blocs.'
          }
        ],
        conclusion: 'Despite diverse colonial masters, both nations now stand as vibrant multi-ethnic democracies.',
        marks: 4
      }
    ]
  },

  'Physiography and Drainage': {
      chapterTitle: 'Physiography and Drainage',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Physiographic & Drainage Divisions: India vs Brazil',
      conceptMapItems: [
          { category: '5 Physiographic Divisions of India',
          items: ['The Himalayas', 'The North Indian Plains', 'The Peninsular Plateau', 'Coastal Plains (Western & Eastern)', 'The Island Groups (Lakshadweep & Andaman)']
        },
        {
          category: '5 Physiographic Divisions of Brazil',
          items: ['The Highlands (Brazilian Shield & Guiana Shield)', 'The Great Escarpment', 'The Coast', 'The Plains (Pantanal & Amazon)', 'The Island Groups']
        },
        {
          category: 'Key River Basins Comparison',
          items: [
            'Amazon River: Largest discharge in the world (~2,00,000 m³/s); no deltas due to velocity; navigable.',
            'Ganga River: Originates at Gangotri; forms the world\'s largest Sundarbans delta with Brahmaputra.',
            'Parana-Paraguay: Southwest-flowing basin in southern Brazil.',
            'Peninsular Rivers of India: Godavari, Krishna, Narmada, Tapi (West-flowing into Arabian Sea).'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'There are no deltas formed at the mouth of the Amazon River.',
          reasons: [
            'The Amazon has an immense discharge of water (~200,000 cubic meters/sec) and sweeps all collected sediment far out into the Atlantic Ocean.',
            'The swift velocity of the river near its mouth prevents any continuous sediment deposition.',
            'The coastline is actively eroded by strong ocean waves and currents, preventing delta development.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'The Great Escarpment acts as a major climatic barrier in Brazil.',
        reasons: [
          'The Great Escarpment rises steeply along the southeastern coast of Brazil.',
          'It acts as a physical wall blocking the moisture-laden Southeast Trade Winds, causing heavy orographic rainfall on the coastal windward slopes.',
          'The leeward side receives negligible rain, creating the arid "Drought Quadrilateral" (Seca).'
        ],
        marks: 2
      },
      {
        statementOrQuestion: 'The rivers of the Western Ghats are short and swift.',
        reasons: [
          'The Western Ghats stand as a continuous water divide close to the western Arabian Sea coastline.',
          'Rivers originating on the steep western slopes (like Vaitarna, Savitri, Zuari) have very short distances to cover before meeting the sea, resulting in high flow velocity.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'Differentiate between Western Coastal Plain and Eastern Coastal Plain of India.',
        answerPoints: [
          '1. Western Coast: Narrow, rocky, characterized by natural ports, submerged coastlines, and estuaries; no prominent deltas.',
          '2. Eastern Coast: Broad, flat, formed by alluvial deposition of east-flowing rivers (Mahanadi, Godavari, Krishna, Cauvery); features vast fertile deltas and lagoons like Chilika Lake.'
        ],
        marks: 2
      },
      {
        question: 'What is the Pantanal?',
        answerPoints: [
          'Pantanal is one of the largest continuous wetlands and swamps in the world.',
          'Located in the southwestern part of Brazil along the Paraguay river basin, characterized by extraordinary aquatic biodiversity.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Describe the main characteristics of the Himalayan Mountain Range.',
        introduction: 'The Himalayas are one of the world\'s youngest fold mountain chains, stretching continuously from the Pamir Knot in Tajikistan to the borders of Myanmar.',
        detailedPoints: [
            { subheading: '1. Three Parallel Latitudinal Ranges',
            description: '• Himadri (Greater Himalayas): Highest average elevation (>6,000m) with perennial glaciers (Gangotri, Yamunotri).\n• Himachal (Lesser Himalayas): Famous hill resorts like Shimla, Mussoorie, Darjeeling.\n• Shivalik (Outer Himalayas): Southernmost, lowest, youngest range forming scenic flat valleys known as \'Duns\' (e.g., Dehradun).'
          },
          {
            subheading: '2. Regional Geographic Divisions',
            description: 'Divided from west to east into: Western Himalayas (Kashmir/Ladakh), Central Himalayas (Kumaon/Himachal), and Eastern Himalayas (Assam/Arunachal).'
          },
          {
            subheading: '3. Climatic and Strategic Significance',
            description: 'Blocks cold polar winds from Central Asia and forces the Southwest Monsoon winds to shed torrential rain across the northern plains.'
          }
        ],
        conclusion: 'The Himalayas are the primary water tower and climatic protector of the Indian subcontinent.',
        marks: 4
      }
    ]
  },

  'Climate': {
      chapterTitle: 'Climate',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Climatic Comparison: Tropical Monsoon vs Tropical Wet',
      conceptMapItems: [
          { category: 'Climatic Features of India 🇮🇳',
          items: [
            'Climate Type: Tropical Monsoon Climate',
            'Key Wind System: Southwest Monsoon Winds (June–Sept) & Northeast Retreating Monsoon',
            'Rainfall Variation: Mawsynram & Cherrapunji (>11,000 mm) vs Thar Desert (<100 mm)',
            'Temperature: Extreme diurnal and seasonal variations in interior continental north'
          ]
        },
        {
          category: 'Climatic Features of Brazil 🇧🇷',
          items: [
            'Climate Type: Equatorial in north, Tropical in central plateau, Temperate in south',
            'Key Wind System: Southeast and Northeast Trade Winds',
            'Rainfall Variation: Amazon basin receives ~2000 mm year-round; Drought Quadrilateral receives <500 mm',
            'Cyclones: Tropical cyclones are extremely rare due to converging trade winds'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'India has a monsoon type of climate.',
          reasons: [
            'India\'s weather is dominated by seasonal reversal of wind directions caused by differential heating of the Indian Ocean and the Asian landmass.',
            'Southwest monsoon winds bring over 80% of India\'s annual rainfall between June and September, dictating the agricultural calendar.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Tropical cyclones rarely occur in Brazil.',
        reasons: [
          'In the coastal equatorial regions of Brazil, the Southeast and Northeast trade winds converge uniformly.',
          'There is no strong vertical air movement and the Coriolis force is nearly zero near the equator, preventing the swirling cyclonic vortex from forming.'
        ],
        marks: 2
      },
      {
        statementOrQuestion: 'The northeastern part of the Brazilian Highlands receives very little rainfall.',
        reasons: [
          'The moisture-bearing Southeast trade winds are obstructed by the steep Great Escarpment, causing heavy rain on coastal slopes.',
          'By the time the winds cross the Escarpment into the interior plateau, they lose moisture, creating the rain shadow region known as the "Drought Quadrilateral" (Seca).'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is the phenomenon of "Break in Monsoon"?',
        answerPoints: [
          'During the rainy season, there are dry intervals when no rain falls for several days or weeks, known as the "Break in Monsoon".',
          'Caused by the northward or southward shifting of the monsoon trough of low pressure.'
        ],
        marks: 2
      },
      {
        question: 'Why does snowfall occur in the Himalayas but never in Brazil\'s Amazon?',
        answerPoints: [
          'The Himalayas have immense altitudes reaching 6,000–8,000 meters above sea level where temperatures drop far below freezing point (0°C).',
          'The Amazon basin lies directly on the Equator at low elevations with hot and humid conditions year-round, making snowfall impossible.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Explain the mechanism of the Southwest Monsoon winds in India.',
        introduction: 'The Southwest Monsoon is the lifeblood of Indian agriculture and economy, driven by complex thermodynamic dynamics.',
        detailedPoints: [
            { subheading: '1. Intense Summer Heating and Low Pressure Trough',
            description: 'During summer (April–May), the vast landmass of North India and the Tibetan plateau heat up intensely, creating an intense low-pressure cell across the Thar Desert and Indo-Gangetic plain.'
          },
          {
            subheading: '2. Inflow of Moisture-Laden Winds',
            description: 'Simultaneously, high atmospheric pressure prevails over the southern Indian Ocean. Winds blow from high pressure over the ocean towards the low pressure on land.'
          },
          {
            subheading: '3. Division into Two Branches',
            description: 'Upon striking the southern tip of the Indian peninsula, the monsoon splits into: Arabian Sea Branch (obstructed by Western Ghats causing heavy orographic rain) and Bay of Bengal Branch (striking Meghalaya hills and deflected along Himalayas).'
          },
          {
            subheading: '4. Retreating Monsoon (October–November)',
            description: 'As winter approaches, the land cools faster than the ocean, reversing wind direction from land to sea (Northeast monsoon), bringing rainfall to Tamil Nadu coast.'
          }
        ],
        conclusion: 'The monsoon cycle regulates the socioeconomic prosperity and water security of India.',
        marks: 4
      }
    ]
  },

  'Natural Vegetation and Wildlife': {
      chapterTitle: 'Natural Vegetation and Wildlife',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Flora & Fauna Diversity: India vs Brazil',
      conceptMapItems: [
          { category: 'Major Forest Types of Brazil',
          items: [
            'Equatorial Rainforests (Selvas - Amazon basin, "Lungs of the World")',
            'Tropical Deciduous & Savanna (Campos)',
            'Thorny Shrubs (Caatinga in Drought Quadrilateral)',
            'Swamp vegetation (Pantanal wetlands)'
          ]
        },
        {
          category: 'Major Forest Types of India',
          items: [
            'Tropical Evergreen Forests (Western Ghats, Andaman, Assam - Rosewood, Mahogany)',
            'Tropical Deciduous Forests (Most widespread - Teak, Sal, Bamboo, Sandalwood)',
            'Thorny & Scrub Forests (Rajasthan, Gujarat - Kair, Babool, Acacia)',
            'Himalayan Coniferous Forests (Pine, Deodar, Silver Fir)',
            'Coastal Mangrove Forests (Sundarbans - Sundari trees)'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'The Amazon rainforest is known as the "Lungs of the World".',
          reasons: [
            'The Amazon basin contains the largest continuous expanse of dense, multi-layered equatorial rainforests on Earth.',
            'Through continuous photosynthesis, this vast biomass absorbs colossal volumes of carbon dioxide and releases enormous quantities of oxygen into the global atmosphere.',
            'It plays an irreplaceable role in regulating global climate patterns.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Wildlife in India is facing serious threats of extinction.',
        reasons: [
          'Uncontrolled deforestation, urbanization, and industrial corridors fragment natural wildlife habitats.',
          'Illegal poaching for tiger skins, elephant ivory, rhinoceros horns, and musk endangers flagship species.',
          'Forest fires, agricultural encroachment, and pollution severely diminish food chains.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'Name three unique wildlife species endemic to Brazil.',
        answerPoints: [
          '1. Anaconda: Giant non-venomous water boa found in the Amazon basin and Pantanal.',
          '2. Golden Lion Tamarin: Endangered small monkey found in the Atlantic coastal forests.',
          '3. Piranha & Pink Dolphin: Carnivorous river fish and freshwater dolphins found in the Amazon river.'
        ],
        marks: 2
      },
      {
        question: 'What are the main characteristics of Mangrove (Sundarbans) forests in India?',
        answerPoints: [
          'Found in saline tidal coastal zones and river deltas (Ganga-Brahmaputra delta).',
          'Plants possess stilt roots and respiratory roots (pneumatophores) that emerge vertically out of the mud to breathe air during high tides.',
          'Dominated by the "Sundari" tree, whose wood is light, tough, and water-resistant, ideal for boat-making.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Compare the wildlife diversity between India and Brazil.',
        introduction: 'Both India and Brazil are recognized as global mega-biodiversity hotspots harboring extraordinary animal species.',
        detailedPoints: [
            { subheading: '1. Brazil\'s Wildlife Specialties',
            description: 'Home to the giant green anaconda, caimans, jaguars, pumas, tapirs, sloths, capybaras (world\'s largest rodent), and thousands of bird species including toucans and macaws.'
          },
          {
            subheading: '2. India\'s Wildlife Specialties',
            description: 'The only country in the world naturally home to both the Bengal Tiger and Asiatic Lion (Gir forest). Also harbors the Asian Elephant, One-Horned Rhinoceros (Kaziranga), Snow Leopard, and Indian Peacock.'
          },
          {
            subheading: '3. Conservation Initiatives',
            description: 'India launched focused species recovery programs like "Project Tiger" (1973) and "Project Elephant". Brazil established extensive Amazonian bio-reserves, battling illegal logging and cattle ranching.'
          }
        ],
        conclusion: 'Protecting these unique biomes is essential to preserving the biosphere of planet Earth.',
        marks: 4
      }
    ]
  },

  'Population': {
      chapterTitle: 'Population',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Demographic Indices: India vs Brazil',
      conceptMapItems: [
          { category: 'Demographic Contrast (Census 2011/2010)',
          items: [
            'Total Population: India ~1.21 Billion (2nd in world) vs Brazil ~190 Million (5th in world)',
            'Share of World Population: India 17.5% vs Brazil 2.8%',
            'Share of World Land Area: India 2.4% vs Brazil 5.6%',
            'Average Population Density: India 382 persons/km² vs Brazil only 23 persons/km²'
          ]
        },
        {
          category: 'Sex Ratio & Age Structure',
          items: [
            'Sex Ratio: Brazil has more females than males (>1000 females/1000 males); India historically has male deficit (~943 females/1000 males).',
            'Age Structure: India has a higher proportion of working-age youth (demographic dividend); Brazil\'s population is gradually aging.'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'The distribution of population is extremely uneven in Brazil.',
          reasons: [
            'The southeastern coastal states (São Paulo, Rio de Janeiro) have fertile agricultural soils, vast industries, and favorable temperate climates, concentrating over 80% of Brazil\'s population.',
            'In stark contrast, the dense equatorial Amazon basin in the north has an inhospitable climate, heavy swamps, and poor transport accessibility, resulting in extremely sparse population density (<1 person/km²).'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'India\'s population density is very high in the northern plains.',
        reasons: [
          'The Indo-Gangetic plains possess rich, deep fertile alluvial soil deposited by perennial rivers (Ganga, Yamuna).',
          'Flat terrain allows the dense construction of railways and highways, facilitating extensive industrial development and intensive farming.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is meant by the "Demographic Dividend" of India?',
        answerPoints: [
          'Demographic Dividend refers to the economic growth potential that results from shifts in a country\'s population age structure.',
          'Over 60% of India\'s population is in the young working-age bracket (15 to 59 years), offering tremendous productive human resource potential.'
        ],
        marks: 2
      },
      {
        question: 'Compare the sex ratio of India and Brazil.',
        answerPoints: [
          '• Brazil: Sex ratio has continuously favored females for several decades (around 1,090 females per 1,000 males).',
          '• India: Sex ratio has historically remained unfavorable to women (943 females per 1,000 males in Census 2011), though improving with progressive government campaigns like "Beti Bachao, Beti Padhao".'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Analyze the factors influencing the spatial distribution of population in India.',
        introduction: 'India\'s population distribution exhibits stark contrasts, varying from densely populated plains to sparsely settled deserts and mountains.',
        detailedPoints: [
            { subheading: '1. Physiography and Topography',
            description: 'Flat, fertile river valleys like Uttar Pradesh, Bihar, and West Bengal support dense populations. Rugged mountains in Ladakh and Arunachal Pradesh have very sparse settlements.'
          },
          {
            subheading: '2. Water Availability and Climate',
            description: 'Regions with assured rainfall and perennial irrigation (Punjab, Kerala) are densely populated, whereas hyper-arid zones in Rajasthan (Thar Desert) have low density.'
          },
          {
            subheading: '3. Industrialization and Urbanization',
            description: 'Metropolitan economic engines like Mumbai, Delhi, Bengaluru, and Pune attract millions of internal migrants seeking employment, education, and commerce.'
          },
          {
            subheading: '4. Mineral Resources',
            description: 'The Chota Nagpur plateau (Jharkhand, Odisha) supports mining cities (Jamshedpur, Dhanbad) despite undulating terrain.'
          }
        ],
        conclusion: 'Natural physical suitability coupled with industrial infrastructure dictates population density across India.',
        marks: 4
      }
    ]
  },

  'Human Settlements': {
      chapterTitle: 'Human Settlements',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Types & Patterns of Settlements in India and Brazil',
      conceptMapItems: [
          { category: 'Settlement Patterns',
          items: [
            'Nucleated Settlements (Fertile river plains, transport crossroads, industrial hubs)',
            'Dispersed / Scattered Settlements (Tribal hill slopes, deserts, dense forests)',
            'Linear Settlements (Along railway lines, river banks, and highways)'
          ]
        },
        {
          category: 'Urbanization Trends',
          items: [
            'India: Urbanization rate ~31.2% (Census 2011); high growth in million-plus cities (Goa is most urbanized state; Himachal Pradesh least).',
            'Brazil: Rapid urbanization (>86%); concentrated in coastal south (São Paulo, Rio de Janeiro); government promotes "Go West" policy to decongest the coast.'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'The Brazilian government is encouraging the "Go West" policy.',
          reasons: [
            'Over 85% of Brazil\'s population is clustered in a narrow coastal corridor in the east and south, resulting in acute urban overcrowding, slums (Favelas), and traffic congestion.',
            'The vast interior western states (Mato Grosso, Goiás, Amazonia) remain sparsely populated and underdeveloped.',
            'The "Go West" policy, including shifting the federal capital inland to Brasília in 1960, aims to achieve balanced regional development.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Nucleated settlements are common along the Ganga River basin.',
        reasons: [
          'The Ganga basin has rich, deep alluvial soil, gentle slope, and perennial water supply supporting intensive agriculture.',
          'An extensive network of railways and roadways connects thriving trade and industrial centers, encouraging people to build closely clustered settlements.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What are Favelas in Brazil?',
        answerPoints: [
          'Favelas are informal settlements and squatter slums found on the steep hills surrounding major Brazilian metropolitan cities like Rio de Janeiro and São Paulo.',
          'Formed due to rapid uncontrolled rural-to-urban migration, often lacking civic water, sanitation, and safety.'
        ],
        marks: 2
      },
      {
        question: 'What are the main causes of dispersed settlements in India?',
        answerPoints: [
          '1. Fragmented and rugged topography (Himalayan slopes, Chota Nagpur plateau).',
          '2. Arid climate with scarcity of water (Thar desert in Rajasthan).',
          '3. Dense forested tracts with isolated tribal agricultural plots.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Compare urbanization trends between India and Brazil.',
        introduction: 'Urbanization is a key indicator of economic modernization, industrialization, and migration patterns.',
        detailedPoints: [
            { subheading: '1. Degree of Urbanization',
            description: 'Brazil is one of the most highly urbanized developing countries in the world, with over 86% of its population living in urban centers. India has a comparatively lower rate of urbanization at approximately 31.2% (2011), meaning nearly 69% of Indians still reside in rural villages.'
          },
          {
            subheading: '2. Pace and Volume',
            description: 'Though India\'s percentage is lower, the absolute number of urban dwellers in India (>377 million) is nearly double the entire population of Brazil.'
          },
          {
            subheading: '3. Spatial Concentration',
            description: 'In Brazil, urbanization was historically concentrated in coastal agglomerations (São Paulo, Rio de Janeiro), prompting the creation of planned inland capital Brasília. In India, urbanization is spreading across southern and western states like Goa, Maharashtra, Gujarat, and Tamil Nadu.'
          },
          {
            subheading: '4. Urban Challenges',
            description: 'Both nations face acute urban crises: slum expansion (Dharavi in Mumbai, Favelas in Rio), water shortages, sewage treatment deficits, and housing shortages.'
          }
        ],
        conclusion: 'Both countries require decentralized urban planning to manage rapid rural-urban migration sustainably.',
        marks: 4
      }
    ]
  },

  'Economy and Occupations': {
      chapterTitle: 'Economy and Occupations',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Sectors of Economy: Agriculture, Mining & Industries',
      conceptMapItems: [
          { category: 'Primary Sector (Agriculture & Allied)',
          items: [
            'India: Agriculture employs ~49% of workforce; food crops dominate (Rice, Wheat, Pulses); milk production #1 in world.',
            'Brazil: Agriculture employs only ~10% of workforce; commercial cash crops dominate (Coffee, Sugarcane, Soybeans, Oranges, Cocoa).'
          ]
        },
        {
          category: 'Secondary & Tertiary Sectors',
          items: [
            'Brazil: Rich in iron ore (Itabira), manganese, bauxite; oil production at Campos Basin; strong aviation (Embraer) and automobile manufacturing.',
            'India: Steel, textiles, pharmaceuticals, world leader in Information Technology (IT/BPO in Bengaluru, Hyderabad, Pune).'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Agriculture is the backbone of the Indian economy.',
          reasons: [
            'Nearly half (49%) of India\'s population depends directly or indirectly on agriculture for their livelihood and employment.',
            'Agriculture provides food security to 1.4 billion citizens and supplies raw materials to major agro-industries like textiles, sugar, and food processing.',
            'Agricultural exports like basmati rice, spices, tea, and marine products generate valuable foreign exchange.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'Mining activities are well developed in eastern Brazil.',
        reasons: [
          'The Brazilian Highlands and Guiana Shield are geologically ancient crystalline rock platforms rich in high-grade iron ore, manganese, bauxite, and nickel.',
          'Proximity to Atlantic ports and hydroelectric power plants facilitates cost-effective smelting and international maritime export.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is "Fazenda" in Brazil?',
        answerPoints: [
          'Fazenda is the Portuguese term for large commercial agricultural estates and plantations in Brazil.',
          'Principally used for growing coffee, sugarcane, and cattle ranching for beef exports.'
        ],
        marks: 2
      },
      {
        question: 'Differentiate between subsistence farming and commercial farming.',
        answerPoints: [
          '1. Subsistence Farming: Prevalent in India; small fragmented landholdings; crops grown primarily for family consumption with traditional tools.',
          '2. Commercial Farming: Prevalent in Brazil (soybean/coffee); massive mechanized landholdings; crops grown with heavy capital investment for global export.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Describe the fishing industry in India and Brazil.',
        introduction: 'Fishing is an essential primary occupation providing dietary protein, employment, and export revenue in both maritime nations.',
        detailedPoints: [
            { subheading: '1. Marine Fishing in India',
            description: 'India has an extensive coastline of ~7,517 km. Marine fishing dominates the west coast (Kerala, Maharashtra, Gujarat) yielding sardines, mackerel, Bombay duck, and prawns. Inland freshwater fishing is also highly developed in rivers, tanks, and aquaculture farms (Andhra Pradesh, West Bengal).'
          },
          {
            subheading: '2. Marine Fishing in Brazil',
            description: 'Brazil has a ~7,400 km Atlantic coastline. Meeting of warm Brazil current and cold Falkland current near the southern coast creates nutrient-rich fishing grounds yielding swordfish, shrimp, lobster, and sardines.'
          },
          {
            subheading: '3. Why Inland Fishing is Limited in Amazon',
            description: 'Although the Amazon River holds abundant freshwater fish, dense inaccessible forests, swift water currents, and extreme heat limit large-scale commercial fishing in the interior.'
          }
        ],
        conclusion: 'Modernized deep-sea trawling and cold-storage supply chains are expanding the economic contribution of fishing in both nations.',
        marks: 4
      }
    ]
  },

  'Tourism, Transport and Communication': {
      chapterTitle: 'Tourism, Transport and Communication',
      subjectType: 'Geography',
      timelineOrConceptMapTitle: 'Transport & Time Zone Systems: India vs Brazil',
      conceptMapItems: [
          { category: 'Transport Networks Comparison',
          items: [
            'Railways: Highly developed in India (Indian Railways is 4th largest network in world); poorly developed in Brazil due to steep Escarpment.',
            'Roadways: Dominates transport in Brazil (>70% freight); Golden Quadrilateral & National Highways in India.',
            'Waterways: Amazon River is world\'s longest navigable inland waterway (~3,700 km); Inland Waterways Authority of India develops National Waterways on Ganga & Brahmaputra.'
          ]
        },
        {
          category: 'Communication & Standard Time Zones',
          items: [
            'Indian Standard Time (IST): Single standard time for entire nation based on 82°30\' E longitude (Mirzapur, UP), UTC +05:30.',
            'Brazilian Standard Time (BRT): Spans 4 distinct standard time zones (UTC -02:00 to UTC -05:00); official Brasilia time is UTC -03:00.'
          ]
        }
      ],
      giveReasons: [
          { statementOrQuestion: 'Waterways are extensively developed in the Amazon basin of Brazil.',
          reasons: [
            'The Amazon is an enormous, deep river carrying a massive volume of water year-round without seasonal drying.',
            'Constructing overland highways and railway lines through the dense, swampy, frequently flooded equatorial rainforest is technically difficult and expensive.',
            'Consequently, river navigation provides the most natural, fuel-efficient, and feasible transport artery connecting interior settlements like Manaus to the Atlantic.'
          ],
          marks: 2
      },
      {
        statementOrQuestion: 'India relies on a single Standard Time, whereas Brazil has multiple Standard Times.',
        reasons: [
          'India has an east-west longitudinal extent of about 29 degrees, resulting in a time difference of roughly 2 hours, successfully synchronized by a single central median (82°30\' E).',
          'Brazil has an immense longitudinal extent of 39 degrees spanning thousands of miles, making a single time zone impossible; hence it is officially divided into 4 time zones.'
        ],
        marks: 2
      }
    ],
    shortAnswers: [
        { question: 'What is the Indian Standard Time (IST) meridian?',
        answerPoints: [
          'The IST meridian is 82°30\' E (82.5° East longitude), passing through Mirzapur near Prayagraj in Uttar Pradesh.',
          'It is exactly 5 hours and 30 minutes ahead of Greenwich Mean Time (UTC +05:30).'
        ],
        marks: 2
      },
      {
        question: 'What is the Trans-Amazonian Highway?',
        answerPoints: [
          'A major pioneering highway built in the 1970s cutting across the interior of the Amazon rainforest in Brazil.',
          'Constructed to connect isolated remote northwestern regions with the developed eastern coast under the "Go West" initiative.'
        ],
        marks: 2
      }
    ],
    briefAnswers: [
        { question: 'Compare the development of the railway network between India and Brazil.',
        introduction: 'Railways form the heavy backbone of freight and passenger movement in continental nations.',
        detailedPoints: [
            { subheading: '1. Extensive Railway Density in India',
            description: 'Indian Railways is one of the world\'s largest unified networks, operating over 68,000 route kilometers. Dense networks blanket the flat northern plains and coastal belts, serving as the economic lifeline for millions of daily commuters.'
          },
          {
            subheading: '2. Limited Railway Development in Brazil',
            description: 'Brazil\'s railway network is sparse and confined mostly to coastal mineral routes in the southeast. The steep Great Escarpment and immense Amazon jungle made laying railway tracks prohibitively expensive.'
          },
          {
            subheading: '3. Economic Impact',
            description: 'While India relies heavily on electrified railways for moving coal, steel, grain, and passengers, Brazil relies predominantly on long-distance highway trucking, which causes higher logistical fuel costs.'
          }
        ],
        conclusion: 'India possesses an advanced railway network, whereas Brazil prioritizes highway trucking and river waterways.',
        marks: 4
      }
    ]
  }
};
