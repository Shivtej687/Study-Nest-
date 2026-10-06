export interface FigureOfSpeechItem {
  name: string;
  exampleLine: string;
  explanation: string;
}

export interface PoemAppreciation {
  id: string;
  subjectId: 'eng' | 'mar' | 'hin';
  poemTitle: string;
  poetName: string;
  sourceOrOrigin: string; // कहाँ से ली गई / कुठून घेतली आहे
  rhymeScheme: string; // यमक योजना / तुकान्त योजना
  figuresOfSpeech: FigureOfSpeechItem[];
  centralIdeaSummary: string; // मध्यवर्ती कल्पना / केंद्रीय भाव
  favoriteLines: string[]; // आवडलेली ओळ / प्रिय पंक्तियाँ
  poeticStyleAndTone: string; // भाषाशैली / रस / भाषा सौंदर्य
  reasonForLiking: string; // कविता आवडण्याचे कारण / पसंद आने का कारण
  moralOrMessage: string; // संदेश / शिकवण
  boardMarksAllocation: {
    criterion: string;
    marks: string;
  }[];
}

export const POEM_APPRECIATIONS: Record<string, PoemAppreciation> = {
  // =========================================================================
  // MARATHI (अक्षरभारती — संपूर्ण रसग्रहण व काव्यसौंदर्य मराठीत)
  // =========================================================================

  'तू बुद्धी दे — प्रार्थना': {
    id: 'mar-poem-1',
    subjectId: 'mar',
    poemTitle: 'तू बुद्धी दे (प्रार्थना)',
    poetName: 'गुरु ठाकूर (सुप्रसिद्ध कवी, गीतकार व पटकथाकार)',
    sourceOrOrigin: 'कवी गुरु ठाकूर यांच्या लोकप्रिय भावगीत व प्रार्थना संग्रहातून संकलित.',
    rhymeScheme: 'अ-अ / ब-ब अशा गेय आणि नादमय चरणबद्ध रचनेतील पारंपरिक सुश्राव्य यमक रचना.',
    figuresOfSpeech: [
      {
        name: 'अनुप्रास अलंकार',
        exampleLine: '‘सत्यासती तू बुद्धी दे, सत्कर्म तू करवून घे’',
        explanation: '‘स’ या वर्णाची वारंवारिता झाल्यामुळे नादमाधुर्य निर्माण होऊन अनुप्रास अलंकार साधला गेला आहे.'
      },
      {
        name: 'दृष्टांत व रूपक अलंकार',
        exampleLine: '‘ज्योतीमधुनी तेजाकडे, अंधारातून प्रकाशाकडे’',
        explanation: 'अज्ञानाचा अंधार आणि ज्ञानाचा प्रकाश यांचे रूपकात्मक साम्य साधून सुंदर काव्यसौंदर्य व्यक्त केले आहे.'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत प्रार्थनेतून कवी गुरु ठाकूर यांनी मानवी जीवनात सत्याची कास धरण्याची, चांगल्या कर्मांची ओढ निर्माण होण्याची आणि अज्ञानाचा अंधार दूर सारून ज्ञानाच्या प्रकाशात जीवन समृद्ध करण्याची विनम्र प्रार्थना ईश्वराकडे केली आहे. स्वार्थाचा त्याग करून मानवतेची सेवा करण्याचे उच्च नैतिक मूल्य या कवितेतून शिकवले आहे.',
    favoriteLines: [
      'तू बुद्धी दे, तू तेज दे, नवचेतना विश्वास दे,',
      'जे सत्य सुंदर सर्वथा, आजन्म त्याचा ध्यास दे.'
    ],
    poeticStyleAndTone: 'अत्यंत प्रासादिक, ओघवती, सुलभ आणि अंतःकरणाला स्पर्श करणारी भक्तिभावपूर्ण भाषाशैली. शांत व करुण रसाचा सुंदर परिपोष यात जाणवतो.',
    reasonForLiking: 'ही प्रार्थना दैनंदिन जीवनात मनाला सकारात्मक ऊर्जा, सद्सद्विवेकबुद्धी आणि संकटांशी सामना करण्याचे आत्मिक बळ देते. यातील शब्दरचना मनाला शांती व सात्विक आनंद प्रदान करते.',
    moralOrMessage: 'सत्य, शिव आणि सौंदर्याची उपासना करावी, नीतीचे आचरण करावे आणि अज्ञानाचा अंधःकार दूर सारून सदैव ज्ञानमार्गावर मार्गक्रमण करावे.',
    boardMarksAllocation: [
      { criterion: '१. प्रस्तुत कवितेचे कवी', marks: '१ गुण' },
      { criterion: '२. कवितेचा संदर्भ व मूळ उगम', marks: '१ गुण' },
      { criterion: '३. कवितेची मध्यवर्ती कल्पना (सारांश)', marks: '२ गुण' },
      { criterion: '४. कवितेतील अलंकार व यमक योजना', marks: '२ गुण' },
      { criterion: '५. कविता आवडण्याचे कारण व संदेश', marks: '२ गुण' }
    ]
  },

  'संतवाणी (अ) अंकिला मी दास तुझा': {
    id: 'mar-poem-2',
    subjectId: 'mar',
    poemTitle: 'संतवाणी (अ) अंकिला मी दास तुझा',
    poetName: 'संत नामदेव (वारकरी संप्रदायातील थोर संत कवी)',
    sourceOrOrigin: '‘सकलसंतगाथा खंड १ : संत नामदेवांची अभंगगाथा’ (अभंग क्र. १६६५, संपादक: प्रा. डॉ. ल. रा. पांगारकर).',
    rhymeScheme: 'वारकरी अभंग छंद (चार चरणी अभंग रचना, चरणांतर्गत नादमय यमक: धावे-पावे, काज-लाज).',
    figuresOfSpeech: [
      {
        name: 'दृष्टांत अलंकार',
        exampleLine: '‘अग्निमाजि पडे बाळू । माता धावे लवलाहू ॥’ तसेच ‘सवेचि झेंपावे पक्षिणी । पिल्लीं पडतांचि धरणीं ॥’',
        explanation: 'आई आणि मूल, पक्षिणी आणि तिचे पिल्लू, गाय आणि पाडस यांच्या वात्सल्याचा समर्पक दाखला (दृष्टांत) देऊन भक्तीची आर्तता सिद्ध केली आहे.'
      },
      {
        name: 'अतिशयोक्ती व रूपक अलंकार',
        exampleLine: '‘भुकेले वत्सरावे । धेनु हुंबरत धावे ॥’',
        explanation: 'वात्सल्याचा उत्कट भाव दर्शवण्यासाठी गायीच्या ममतेचे रूपक वापरले आहे.'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत अभंगात संत नामदेवांनी विविध दैनंदिन कौटुंबिक व नैसर्गिक दृष्टांतांच्या माध्यमातून परमेश्वराच्या (श्रीविठ्ठलाच्या) असीम कृपेची आणि मातृवत् वात्सल्याची याचना केली आहे. ज्याप्रमाणे आई बाळाला संकटातून वाचवण्यासाठी तात्काळ धावून जाते, त्याप्रमाणे हे देवा, तू माझ्या संकटात धावून ये आणि माझा उद्धार कर, असा उत्कट भक्तिभाव येथे व्यक्त झाला आहे.',
    favoriteLines: [
      'अग्निमाजि पडे बाळू । माता धावे लवलाहू ॥',
      'तैसे मज व्हावे काकुळती । येउनी भेटावे श्रीपती ॥'
    ],
    poeticStyleAndTone: 'प्राचीन संतकाव्याची रसाळ, भक्तिरसपूर्ण, आर्त आणि अत्यंत भावस्पर्शी प्राकृत मराठी भाषाशैली. वात्सल्य भाव आणि शांत-भक्तिरसाचा अप्रतिम संगम.',
    reasonForLiking: 'या अभंगातील मातृप्रेमाचे दृष्टांत काळजाला भिडतात. संत नामदेवांची विठ्ठलाविषयीची आर्त आळवणी मानवी मनातील सर्वात पवित्र वात्सल्यभाव जागृत करते.',
    moralOrMessage: 'ईश्वराप्रती संपूर्ण समर्पण भाव ठेवावा; संकटात परमेश्वराची अनन्यभावाने भक्ती केली असता तो मातेप्रमाणे आपल्या रक्षणासाठी धावून येतो.',
    boardMarksAllocation: [
      { criterion: '१. कवीचे नाव (संत नामदेव)', marks: '१ गुण' },
      { criterion: '२. संदर्भ व काव्यप्रकार (अभंग)', marks: '१ गुण' },
      { criterion: '३. मध्यवर्ती कल्पना व सारांश', marks: '२ गुण' },
      { criterion: '४. भाषेतील अलंकार व दृष्टांत', marks: '२ गुण' },
      { criterion: '५. रसग्रहण व जीवन संदेश', marks: '२ गुण' }
    ]
  },

  'संतवाणी (आ) योगी सर्वकाळ सुखदाता': {
    id: 'mar-poem-3',
    subjectId: 'mar',
    poemTitle: 'संतवाणी (आ) योगी सर्वकाळ सुखदाता',
    poetName: 'संत एकनाथ (भागवत संप्रदायातील महान संत कवी व तत्त्वज्ञ)',
    sourceOrOrigin: '‘एकनाथी भागवत’ व ‘श्री संत एकनाथ महाराज यांची अभंगगाथा’ यातून संकलित.',
    rhymeScheme: 'पारंपरिक ओवी/अभंग वृत्त (प्रत्येक कडव्यात तीन चरण यमकबद्ध आणि चौथा चरण मुक्त किंवा नादयुक्त).',
    figuresOfSpeech: [
      {
        name: 'व्यतिरेक अलंकार',
        exampleLine: '‘उदकाहूनि अधिक गोड । जीवांसि करी तृषित खोड । योगी सर्वकाळ सुखदाता ॥’',
        explanation: 'येथे उपमेय (योगी पुरुष) हा उपमानापेक्षा (पाणी/उदक) श्रेष्ठ दाखवला असल्याने व्यतिरेक अलंकार झाला आहे.'
      },
      {
        name: 'दृष्टांत अलंकार',
        exampleLine: '‘उदक जेवी तान्हेल्यांसी । तृषा हरूनी शांत करी । तैसा योगी जनांसी । उद्धरी स्वयें ॥’',
        explanation: 'पाणी आणि योगी पुरुष यांची तुलना करून योग्याचे श्रेष्ठत्व सिद्ध करण्यासाठी पाण्याचा समर्पक दृष्टांत दिला आहे.'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत अभंगात संत एकनाथांनी जीवनदायी पाणी (उदक) आणि आत्मज्ञानी योगी पुरुष यांची तुलना केली आहे. पाणी केवळ बाह्य मळ धुवून तात्पुरती तृष्णा शमवते, परंतु योगी पुरुष माणसाचे अंतरंग निर्मळ करतो आणि त्याला अखंड, सर्वकाळ टिकणारे आत्मिक सुख प्रदान करतो. त्यामुळे योगी हा पाण्यापेक्षाही श्रेष्ठ कसा आहे, हे संत एकनाथांनी स्पष्ट केले आहे.',
    favoriteLines: [
      'उदक जेवी तृषा हरूनी । क्षणैक तृप्ती दे अंतरी ॥',
      'योगी पुरुषाची संगती । सर्वकाळ सुख दे जीवांसी ॥'
    ],
    poeticStyleAndTone: 'अत्यंत शुद्ध, ओजस्वी, प्रबोधनपर आणि आध्यात्मिक तत्त्वज्ञान सहज सोप्या शब्दात मांडणारी प्रौढ संतवाणी.',
    reasonForLiking: 'या अभंगातून तात्कालिक भौतिक सुख आणि शाश्वत आत्मिक सुख यातील फरक अतिशय तर्कशुद्ध आणि काव्यमय पद्धतीने समजतो.',
    moralOrMessage: 'सत्पुरुषांची आणि संतांची संगत माणसाच्या दुर्गुणांचा नाश करून जीवनात शाश्वत समाधान निर्माण करते, म्हणून सज्जनांच्या सहवासात राहावे.',
    boardMarksAllocation: [
      { criterion: '१. कवीचे नाव (संत एकनाथ)', marks: '१ गुण' },
      { criterion: '२. काव्य प्रकार व संदर्भ', marks: '१ गुण' },
      { criterion: '३. मध्यवर्ती भाव (पाणी व योगी तुलना)', marks: '२ गुण' },
      { criterion: '४. व्यतिरेक व दृष्टांत अलंकार', marks: '२ गुण' },
      { criterion: '५. शिकवण व काव्यसौंदर्य', marks: '२ गुण' }
    ]
  },

  'दोन दिवस — कविता': {
    id: 'mar-poem-4',
    subjectId: 'mar',
    poemTitle: 'दोन दिवस (कविता)',
    poetName: 'नारायण सुर्वे (श्रमिक जनतेचे विद्रोही व वास्तववादी महाकवी)',
    sourceOrOrigin: 'नारायण सुर्वे यांच्या गाजलेल्या ‘माझे विद्यापीठ’ या कवितासंग्रहातून साभार.',
    rhymeScheme: 'मुक्तछंद (Free Verse) — पारंपरिक यमकाचे बंधन झुगारून रचलेली आंतरिक नादमय मुक्त रचना.',
    figuresOfSpeech: [
      {
        name: 'अतिशयोक्ती व विरोधाभास अलंकार',
        exampleLine: '‘दोन दिवस वाट पाहण्यात गेले; दोन दुःखात गेले’',
        explanation: 'चार दिवसांचे छोटे आयुष्य सांगताना दोन दिवस सुखाच्या प्रतीक्षेत आणि दोन दिवस दुःखात खर्ची पडल्याचा दाहक विरोधाभास मांडला आहे.'
      },
      {
        name: 'रूपक अलंकार',
        exampleLine: '‘भाकरीचा चंद्र शोधण्यातच जिंदगी बरबाद झाली’',
        explanation: 'भाकरीची गोल कोर आणि आकाशातील चंद्र यांचे सुंदर रूपक साधून गरिबीचे भीषण वास्तव चित्रित केले आहे.'
      },
      {
        name: 'चेतनगुणोक्ती अलंकार',
        exampleLine: '‘हात जे माझे सर्वस्व होते, दारोदारी उपाशीच राहिले’',
        explanation: 'निर्जीव हातांवर मानवी भावनांचा आणि श्रमाच्या लाचारीचा आरोप केला आहे.'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत कवितेत नारायण सुर्वे यांनी कष्टकरी, कामगार आणि उपेक्षित वर्गाच्या जीवनातील भीषण वास्तव आणि जीवनसंघर्ष अत्यंत प्रभावीपणे मांडला आहे. मानवी आयुष्य अत्यंत छोटे आहे; त्यातील दोन दिवस सुखाच्या आशेने वाट पाहण्यात आणि उरलेले दोन दिवस दुःखात जळण्यात संपतात. पोटाची भूक शमवण्यासाठी भाकरीच्या शोधात आयुष्य संपते, तरीही कवी जगाच्या शाळेत दुःख पचवून पुन्हा जिद्दीने जगण्याची प्रेरणा देतो.',
    favoriteLines: [
      'दोन दिवस वाट पाहण्यात गेले; दोन दुःखात गेले,',
      'हिशोब करतो आहे आता किती राहिलेत डोईवर उन्हाळे.',
      'भाकरीचा चंद्र शोधण्यातच जिंदगी बरबाद झाली!'
    ],
    poeticStyleAndTone: 'अत्यंत धारदार, प्रत्यक्षानुभूतीवर आधारलेली, वास्तववादी आणि तळमळीची विद्रोही भाषाशैली. कारुण्याचा आणि झुंजार वृत्तीचा प्रत्यय येतो.',
    reasonForLiking: 'ही कविता केवळ कल्पनेच्या विश्वात रमत नाही, तर समाजातील ९०% कष्टकरी माणसाच्या घामाचे आणि भुकेचे खरेखुरे दर्शन घडवते. भाकरीला चंद्राची उपमा काळजाला भिडते.',
    moralOrMessage: 'जीवनातील दुःखाला न घाबरता परिस्थितीशी दोन हात करावेत. दारिद्र्य आणि कष्ट सहन करत असतानाही माणसाने स्वतःची स्वाभिमानी जीवननिष्ठा ढळू देऊ नये.',
    boardMarksAllocation: [
      { criterion: '१. कवीचे नाव (नारायण सुर्वे)', marks: '१ गुण' },
      { criterion: '२. काव्यसंग्रह (माझे विद्यापीठ)', marks: '१ गुण' },
      { criterion: '३. मध्यवर्ती कल्पना (कामगार जीवनसंघर्ष)', marks: '२ गुण' },
      { criterion: '४. भाषेतील रूपक व अलंकार', marks: '२ गुण' },
      { criterion: '५. रसग्रहण व जीवनदृष्टी', marks: '२ गुण' }
    ]
  },

  'औक्षण — कविता': {
    id: 'mar-poem-5',
    subjectId: 'mar',
    poemTitle: 'औक्षण (कविता)',
    poetName: 'इंदिरा संत (स्त्री-मनाची सूक्ष्म स्पंदने टिपणाऱ्या ज्येष्ठ कवयित्री)',
    sourceOrOrigin: 'कवयित्री इंदिरा संत यांच्या निवडक कविता संग्रहातून संकलित.',
    rhymeScheme: 'अ-ब-क-ब अशी गेय आणि भावमधुर पदरचना.',
    figuresOfSpeech: [
      {
        name: 'रूपक अलंकार',
        exampleLine: '‘नाही मुठीमध्ये द्रव्य, नाही शिरेमध्ये रक्त । काय करावे कळेना, नाही कष्टाचे सामर्थ्य ॥’',
        explanation: 'देशरक्षणासाठी निघालेल्या जवानापुढे सामान्य देशवासीयांची कृतज्ञता आणि असहायता व्यक्त करणारे रूपक.'
      },
      {
        name: 'दृष्टांत व उपमा अलंकार',
        exampleLine: '‘अशा असंख्य ज्योतींची तुझ्या मागून रांग, दिनदुबळ्यांचे औक्षण हेच तुझे पांग’',
        explanation: 'डोळ्यांतील आसवांची तुलना दिव्यांच्या तेवणाऱ्या ज्योतींशी करून सुंदर उपमा साधली आहे.'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत कवितेत रणभूमीवर सीमेचे रक्षण करण्यासाठी प्राण पणाला लावून लढणाऱ्या भारतीय सैनिकाविषयी देशातील सामान्य नागरिकांच्या मनात असणारी कृतज्ञता, आदर आणि अभिमानाची भावना कवयित्रीने औक्षणाच्या माध्यमातून व्यक्त केली आहे. सैनिकाच्या अतुलनीय शौर्यापुढे आपल्याकडे कोणतेही धन किंवा सामर्थ्य कमी पडते, म्हणून डोळ्यांतील अश्रूंच्या ज्योतींनी त्याचे औक्षण केले आहे.',
    favoriteLines: [
      'नाही मुठीमध्ये द्रव्य, नाही शिरेमध्ये रक्त,',
      'काय करावे कळेना, नाही कष्टाचे सामर्थ्य.',
      'तुझ्या शौर्यगाथेपुढे, हे औक्षण ठेंगणे!'
    ],
    poeticStyleAndTone: 'अत्यंत मृदू, भावुक, देशप्रेम आणि कृतज्ञतेने ओथंबलेली हळुवार स्त्री-सुलभ भाषाशैली. वीर आणि करुण रसाचा उदात्त मेळ.',
    reasonForLiking: 'आपल्या सुरक्षेसाठी बर्फाच्छादित सीमेवर उभे राहणाऱ्या जवानांबद्दल हृदयात देशभक्तीची मशाल पेटवणारी ही कविता आहे.',
    moralOrMessage: 'सैनिक हे देशाचे खरे संरक्षक आहेत; त्यांच्या त्यागाची सदैव जाणीव ठेवून देशबांधवांनी त्यांच्याप्रती कृतज्ञ राहिले पाहिजे.',
    boardMarksAllocation: [
      { criterion: '१. कवयित्रीचे नाव (इंदिरा संत)', marks: '१ गुण' },
      { criterion: '२. संदर्भ व पार्श्वभूमी', marks: '१ गुण' },
      { criterion: '३. मध्यवर्ती कल्पना (सैनिकाचे औक्षण)', marks: '२ गुण' },
      { criterion: '४. भाषेतील अलंकार व काव्यसौंदर्य', marks: '२ गुण' },
      { criterion: '५. कविता आवडण्याचे कारण व राष्ट्रभक्ती', marks: '२ गुण' }
    ]
  },

  'रंग मजेचे रंग उदयाचे — कविता': {
    id: 'mar-poem-6',
    subjectId: 'mar',
    poemTitle: 'रंग मजेचे रंग उदयाचे (कविता)',
    poetName: 'संगीता बर्वे (प्रसिद्ध कवयित्री व बालकथाकार)',
    sourceOrOrigin: 'कवयित्री संगीता बर्वे यांच्या निसर्ग व पर्यावरणविषयक कवितासंग्रहातून.',
    rhymeScheme: 'यमकप्रधान, चार चरणी गेय वृत्तबद्ध रचना (झाडे-भाडे, पाऊस-धूस, पाणी-गाणी).',
    figuresOfSpeech: [
      {
        name: 'चेतनगुणोक्ती अलंकार',
        exampleLine: '‘डोलतील मग हिरवी राने, आनंदाने गातील पाने’',
        explanation: 'निर्जीव झाडाच्या पानांवर गाणे गाण्याचा आणि डोलण्याचा मानवी धर्म आरोपिला आहे.'
      },
      {
        name: 'अनुप्रास अलंकार',
        exampleLine: '‘रंग मजेचे रंग उदयाचे, फुलाफुलांचे संगे नाचे’',
        explanation: 'शब्दांची पुनरावृत्ती होऊन काव्यात नाद निर्माण झाला आहे.'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत कवितेत संगणक आणि आधुनिक विज्ञानाच्या युगात माणसाने निसर्गाशी असलेले आपले नाते तोडू नये, असा महत्त्वाचा संदेश दिला आहे. झाडे लावा, जलसंधारण करा, हिरवेगार रान फुलवा. जर निसर्ग समृद्ध राहिला, तरच उद्याचे भविष्य आनंदी आणि रंगीबेरंगी होईल, असा पर्यावरण संवर्धनाचा आशावादी दृष्टिकोन येथे व्यक्त केला आहे.',
    favoriteLines: [
      'फुलाफुलांचे रंग मजेचे, संगे घेऊन नाचू या,',
      'हिरवे हिरवे निसर्ग वैभव, उद्याच्या जगाला देऊ या!'
    ],
    poeticStyleAndTone: 'ताजी, प्रसन्न, निसर्गरम्य आणि बालसुलभ उत्साहाने भरलेली लयबद्ध भाषाशैली.',
    reasonForLiking: 'ही कविता पर्यावरणाचे महत्त्व अत्यंत गोड आणि आशादायी शब्दात पटवून देते, ज्यामुळे निसर्गावर प्रेम करण्याची प्रेरणा मिळते.',
    moralOrMessage: 'झाडे लावा, पाण्याचे रक्षण करा आणि पृथ्वीचे हिरवेगार सौंदर्य टिकवून शाश्वत विकासाकडे वाटचाल करा.',
    boardMarksAllocation: [
      { criterion: '१. कवयित्रीचे नाव (संगीता बर्वे)', marks: '१ गुण' },
      { criterion: '२. संदर्भ व पर्यावरण महत्त्व', marks: '१ गुण' },
      { criterion: '३. मध्यवर्ती कल्पना व सारांश', marks: '२ गुण' },
      { criterion: '४. चेतनगुणोक्ती व यमक रचना', marks: '२ गुण' },
      { criterion: '५. पर्यावरण संवर्धन संदेश', marks: '२ गुण' }
    ]
  },

  'हिरवंगार झाडासारखं — कविता': {
    id: 'mar-poem-7',
    subjectId: 'mar',
    poemTitle: 'हिरवंगार झाडासारखं (कविता)',
    poetName: 'जॉर्ज लोपीस (निसर्गप्रेमी आधुनिक मराठी कवी)',
    sourceOrOrigin: 'कवी जॉर्ज लोपीस यांच्या समग्र कवितासंग्रहातून.',
    rhymeScheme: 'आधुनिक मुक्तछंद (भावगर्भ, संवादात्मक रचना).',
    figuresOfSpeech: [
      {
        name: 'रूपक व उपमा अलंकार',
        exampleLine: '‘झाडासारखं राहावं, झाडासारखं जगावं’',
        explanation: 'माणसाच्या जगण्याची तुलना थेट झाडाच्या शांत, परोपकारी वृत्तीशी केली आहे.'
      },
      {
        name: 'चेतनगुणोक्ती अलंकार',
        exampleLine: '‘झाड शांतपणे ऊन-पाऊस अंगावर झेलतं, तरीही हसतमुख राहतं’',
        explanation: 'झाडाला मानवाप्रमाणे सोशिक आणि स्थितप्रज्ञ मानले आहे.'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत कवितेत कवीने माणसाला झाडाप्रमाणे स्थितप्रज्ञ, सोशिक, सकारात्मक आणि परोपकारी जीवन जगण्याचे आवाहन केले आहे. झाड ऊन, वारा, वादळ शांतपणे सहन करते; कोणावरही राग धरत नाही, आणि स्वतः त्रास सोसून इतरांना सावली, फळे व फुले देते. माणसानेही सुख-दुःखात झाडासारखेच हिरवेगार (सदा उल्हसित) राहायला शिकले पाहिजे.',
    favoriteLines: [
      'झाडाच्या अंगावर पक्षी घरटी बांधतात, झाड कधी तक्रार करत नाही,',
      'आयुष्य जगावं तर असं हिरवंगार झाडासारखं!'
    ],
    poeticStyleAndTone: 'चिंतनशील, शांत, उद्बोधक आणि मानवी मनाला अंतर्मुख करणारी जीवनवादी भाषाशैली.',
    reasonForLiking: 'झाडाचे रूपक वापरून माणसाला आयुष्यातील संकटकाळात स्थिर आणि प्रसन्न राहण्याचे मोठे जीवनरहस्य या कवितेतून उलगडून मिळते.',
    moralOrMessage: 'संकटांना न घाबरता सोशिक बनावे, स्वतःच्या स्वार्थाचा त्याग करून इतरांच्या कामी यावे आणि सदैव प्रसन्न चित्ताने जगावे.',
    boardMarksAllocation: [
      { criterion: '१. कवीचे नाव (जॉर्ज लोपीस)', marks: '१ गुण' },
      { criterion: '२. संदर्भ व काव्यवैशिष्ट्य', marks: '१ गुण' },
      { criterion: '३. मध्यवर्ती कल्पना (झाडाची सोशिकता)', marks: '२ गुण' },
      { criterion: '४. रूपक व चेतनगुणोक्ती अलंकार', marks: '२ गुण' },
      { criterion: '५. जीवनमूल्य व रसग्रहण', marks: '२ गुण' }
    ]
  },

  'स्वप्न करू साकार — कविता': {
    id: 'mar-poem-8',
    subjectId: 'mar',
    poemTitle: 'स्वप्न करू साकार (कविता)',
    poetName: 'किशोर पाठक (प्रसिद्ध कवी व गीतकार)',
    sourceOrOrigin: 'कवी किशोर पाठक यांच्या देशभक्तीपर व समाजप्रबोधक कवितासंग्रहातून.',
    rhymeScheme: 'यमकप्रधान, उत्साहवर्धक व ओजस्वी राष्ट्रीय गीतशैली (साकार-अपार, देश-वेश).',
    figuresOfSpeech: [
      {
        name: 'अनुप्रास अलंकार',
        exampleLine: '‘या भारतभूच्या मातीवरती स्वप्न करू साकार’',
        explanation: '‘स’ आणि ‘र’ या अक्षरांच्या नादयुक्त रचनेमुळे काव्यात जोश निर्माण होतो.'
      },
      {
        name: 'रूपक अलंकार',
        exampleLine: '‘श्रमाचे वैभव, कष्टाचे तोरण बांधू या दारी’',
        explanation: 'कष्ट आणि श्रमाला घराच्या दारावरील मांगल्याचे तोरण मानून रूपक साधले आहे.'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत कवितेत कवी किशोर पाठक यांनी नव्या पिढीला भारतभूमीचे भविष्य उज्ज्वल करण्याचे आणि अखंड श्रमप्रतिष्ठेतून समृद्ध भारताचे स्वप्न साकार करण्याचे आवाहन केले आहे. जात, पात, धर्म आणि पंथ विसरून सर्वांनी एकत्र यावे, विज्ञानाची कास धरावी, शेतांमध्ये धनधान्य पिकवावे आणि देशाची प्रगती साधावी, अशी राष्ट्रीय एकात्मतेची हाक येथे दिली आहे.',
    favoriteLines: [
      'या देशाचे स्वप्न करू साकार,',
      'हात हातात घेऊनी चालू, कष्ट करू अपार!',
      'नाही भेदभाव, नाही दरी, एकच आमची भारतमाता!'
    ],
    poeticStyleAndTone: 'अत्यंत ओजस्वी, स्फूर्तिदायक, प्रेरणादायी आणि राष्ट्रभक्तीने भारलेली प्रभावी भाषाशैली.',
    reasonForLiking: 'ही कविता तरुणांच्या मनात देशाविषयी ज्वलंत अभिमान आणि परिश्रमाची जिद्द निर्माण करते. सामूहिक ऐक्याची जाणीव करून देते.',
    moralOrMessage: 'भेदभाव विसरून श्रमप्रतिष्ठेला व विज्ञानाला मान द्यावा आणि एकोप्याने भारताला जगात महासत्ता बनवण्याचा संकल्प करावा.',
    boardMarksAllocation: [
      { criterion: '१. कवीचे नाव (किशोर पाठक)', marks: '१ गुण' },
      { criterion: '२. संदर्भ व देशभक्ती पार्श्वभूमी', marks: '१ गुण' },
      { criterion: '३. मध्यवर्ती कल्पना (श्रम व एकता)', marks: '२ गुण' },
      { criterion: '४. भाषेतील अलंकार व ओजस्वी गुण', marks: '२ गुण' },
      { criterion: '५. राष्ट्रीय एकात्मतेचा संदेश', marks: '२ गुण' }
    ]
  },

  // =========================================================================
  // HINDI (लोकभारती — संपूर्ण पद्य विश्लेषण एवं काव्य सौंदर्य हिंदी में)
  // =========================================================================

  'भारत महिमा — कविता': {
    id: 'hin-poem-1',
    subjectId: 'hin',
    poemTitle: 'भारत महिमा (कविता)',
    poetName: 'जयशंकर प्रसाद (छायावाद के मूर्धन्य एवं महान कवि)',
    sourceOrOrigin: 'कवि जयशंकर प्रसाद के विश्वविख्यात ऐतिहासिक नाटक ‘स्कंदगुप्त’ के प्रसिद्ध देशभक्ति गीत से साभार संकलित।',
    rhymeScheme: 'तुकान्त एवं लयात्मक छंद — सम पंक्तियों में मधुर गेय तुक (प्यारा-हमारा, आलोक-अशोक)।',
    figuresOfSpeech: [
      {
        name: 'रूपक अलंकार',
        exampleLine: '‘उषा ने हँस अभिनंदन किया और पहनाया हीरक हार’',
        explanation: 'उषा (सुबह) द्वारा ओस की बूँदों को हीरों के हार के रूप में भारत को पहनाने का अत्यंत सजीव रूपक बाँधा गया है।'
      },
      {
        name: 'मानवीकरण अलंकार',
        exampleLine: '‘हँस अभिनंदन किया उषा ने...’',
        explanation: 'प्राकृतिक प्रभात (उषा) पर मानवीय हँसने एवं स्वागत करने की क्रिया का आरोप होने से मानवीकरण अलंकार है।'
      },
      {
        name: 'अनुप्रास अलंकार',
        exampleLine: '‘विमल वाणी ने वीणा ली, कमल कोमल कर में सप्रीत’',
        explanation: '‘व’ और ‘क’ वर्ण की सुंदर आवृत्ति से संगीतमय नाद-सौंदर्य उत्पन्न हुआ है।'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत कविता में छायावाद के प्रवर्तक कवि जयशंकर प्रसाद ने अपने गौरवशाली देश भारत के स्वर्णिम इतिहास, पावन प्राकृतिक छटा और महान सांस्कृतिक वैभव का अत्यंत ओजस्वी गुणगान किया है। भारत ज्ञान का प्रथम प्रणेता है, जहाँ प्रकृति ने मुक्त हस्त से अपनी कृपा बरसाई है। हमारे पूर्वजों ने सदा त्याग, दान, सत्य और परोपकार को धन से अधिक महत्व दिया। कवि देशवासियों से अपने प्राणों से प्यारे भारतवर्ष पर सर्वस्व न्योछावर करने का आह्वान करते हैं।',
    favoriteLines: [
      'हिमालय के आँगन में उसे प्रथम किरणों का दे उपहार,',
      'उषा ने हँस अभिनंदन किया और पहनाया हीरक हार।',
      'जिएँ तो सदा इसी के लिए, यही अभिमान रहे यह हर्ष,',
      'निछावर कर दें हम सर्वस्व, हमारा प्यारा भारतवर्ष!'
    ],
    poeticStyleAndTone: 'तत्सम प्रधान, संस्कृतनिष्ठ, अत्यंत परिमार्जित, प्रौढ़ एवं ओजपूर्ण काव्यमयी हिंदी भाषा। वीर और शांत रस का अद्भुत संगम।',
    reasonForLiking: 'यह कविता प्रत्येक भारतीय के हृदय में अगाध देशभक्ति, स्वाभिमान और पूर्वजों के त्याग के प्रति गौरव का संचार करती है। इसकी भाषा में दिव्य नाद-सौंदर्य है।',
    moralOrMessage: 'अपनी मातृभूमि से निस्वार्थ प्रेम करना चाहिए, ज्ञान और सत्य के मार्ग पर चलकर भारत की गौरवमयी परंपरा की रक्षा हेतु सदैव तत्पर रहना चाहिए।',
    boardMarksAllocation: [
      { criterion: '१. रचनाकार का नाम (जयशंकर प्रसाद)', marks: '१ अंक' },
      { criterion: '२. रचना का संदर्भ व विधा', marks: '१ अंक' },
      { criterion: '३. केंद्रीय भाव एवं सारांश', marks: '२ अंक' },
      { criterion: '४. प्रयुक्त अलंकार व भाषा-शैली', marks: '२ अंक' },
      { criterion: '५. प्रेरणा एवं संदेश', marks: '२ अंक' }
    ]
  },

  'मन — हाइकू': {
    id: 'hin-poem-2',
    subjectId: 'hin',
    poemTitle: 'मन (हाइकू)',
    poetName: 'विकास परिहार (समकालीन प्रतिष्ठित कवि एवं साहित्यकार)',
    sourceOrOrigin: 'जापानी लोक-काव्य विधा ‘हाइकू’ पर आधारित कवि विकास परिहार के आधुनिक काव्य संग्रह से।',
    rhymeScheme: 'हाइकू छंद — ५ + ७ + ५ = १७ अक्षरों (वर्णों) की त्रि-पंक्तिबद्ध सूक्ष्म काव्य संरचना।',
    figuresOfSpeech: [
      {
        name: 'विरोधाभास अलंकार',
        exampleLine: '‘घना अँधेरा, चमकता प्रकाश, और अधिक।’',
        explanation: 'अँधेरे और प्रकाश का विपरीत संबंध दिखाकर यह व्यक्त किया गया है कि घोर संकट में ही आशा की किरण सबसे प्रखर होती है।'
      },
      {
        name: 'रूपक एवं बिंब विधान',
        exampleLine: '‘खारे जल से, धुल गए विषाद, मन पावन।’',
        explanation: 'नेत्रों के खारे आँसुओं को मन की मलिनता और दुःख को धोने वाले पावन जल के रूप में चित्रित किया गया है।'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत हाइकू श्रृंखला में कवि विकास परिहार ने मानव मन की विभिन्न अनुभूतियों, जीवन के संघर्षों, निराशा में आशा की किरण और अंतर्मन की गहराइयों को अत्यंत संक्षिप्त एवं मारक शब्दों में प्रकट किया है। कवि सिखाते हैं कि गुलाब के काँटों के बीच भी खिलना सीखो, आँसुओं से दुःख को धोकर मन को पावन करो और जीवन रूपी नैया को मझधार में भी हिम्मत से पार लगाओ।',
    favoriteLines: [
      'घना अँधेरा,',
      'चमकता प्रकाश,',
      'और अधिक।',
      'रंग-बिरंगे, रंग-संग लेकर, आया फागुन।'
    ],
    poeticStyleAndTone: 'अत्यंत सूक्ष्म, सूत्रबद्ध, गहन अर्थपूर्ण एवं गागर में सागर भरने वाली प्रतीकात्मक भाषाशैली। शांत और विचारोत्तेजक रस।',
    reasonForLiking: 'मात्र १७ वर्णों की छोटी-सी कविता में जीवन का बहुत बड़ा दर्शन छिपा है। यह निराश मन में असीम ऊर्जा और जीने का सकारात्मक हौसला भर देती है।',
    moralOrMessage: 'सुख और दुःख जीवन के दो पहलू हैं। काँटों से घबराए बिना गुलाब की तरह सदा मुस्कुराते रहना चाहिए और जीवन-पथ पर अविचल आगे बढ़ना चाहिए।',
    boardMarksAllocation: [
      { criterion: '१. कवि का नाम (विकास परिहार)', marks: '१ अंक' },
      { criterion: '२. काव्य विधा (हाइकू - ५+७+५)', marks: '१ अंक' },
      { criterion: '३. केंद्रीय भाव एवं अर्थ-गांभीर्य', marks: '२ अंक' },
      { criterion: '४. प्रयुक्त अलंकार व बिंब-विधान', marks: '२ अंक' },
      { criterion: '५. जीवनोपयोगी संदेश', marks: '२ अंक' }
    ]
  },

  'गिरिधर नागर — पद': {
    id: 'hin-poem-3',
    subjectId: 'hin',
    poemTitle: 'गिरिधर नागर (पद)',
    poetName: 'संत कवयित्री मीराबाई (कृष्ण भक्ति शाखा की अमर साधिका)',
    sourceOrOrigin: '‘मीराबाई की पदावली’ (संपादक: परशुराम चतुर्वेदी) से साभार संकलित।',
    rhymeScheme: 'मध्यकालीन ज्ञेय पद विधा — राग-रागनियों पर आधारित सुरम्य अन्त्यानुप्रास (मोया-खोया, पार-तार)।',
    figuresOfSpeech: [
      {
        name: 'रूपक अलंकार',
        exampleLine: '‘अंसुवन जल सींचि-सींचि, प्रेम-बेलि बोयी’',
        explanation: 'आँसुओं के जल से सींचकर प्रभु-प्रेम रूपी लता को बड़ा करने का अत्यंत भावपूर्ण रूपक बाँधा गया है।'
      },
      {
        name: 'विरोधाभास व अनुप्रास अलंकार',
        exampleLine: '‘तात मात भ्रात बंधु, आपनो न कोई’',
        explanation: 'संसार के समस्त सांसारिक संबंधों की नश्वरता और भगवान कृष्ण से अनन्य प्रेम का एकनिष्ठ भाव।'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत पदों में अनन्य कृष्ण-भक्त कवयित्री मीराबाई ने गिरधर गोपाल (श्रीकृष्ण) के प्रति अपना सर्वात्म समर्पण और विरह-प्रेम व्यक्त किया है। मीराबाई कहती हैं कि सिर पर मोरमुकुट धारण करने वाले गिरिधर नागर ही मेरे एकमात्र पति व सर्वस्व हैं। कुल की मर्यादा और लोकलाज का त्याग कर उन्होंने संतों की संगति में ईश्वर-भक्ति को अपनाया और अपने अश्रुजल से प्रेम-बेलि को सींचा है। वे प्रभु से संसार-सागर से पार उतारने की गुहार लगाती हैं।',
    favoriteLines: [
      'मेरे तो गिरधर गोपाल, दूसरो न कोई।',
      'जाके सिर मोर-मुकुट, मेरो पति सोई।',
      'अंसुवन जल सींचि-सींचि, प्रेम-बेलि बोयी, अब तो बेल फैल गई, आणंद फल होई!'
    ],
    poeticStyleAndTone: 'सरल, सहज, राजस्थानी व ब्रजभाषा मिश्रित अत्यंत मधुर, संगीतमय एवं भक्तिरस से परिपूर्ण आत्मनिवेदनात्मक भाषाशैली। माधुर्य गुण व शांत-शृंगार रस।',
    reasonForLiking: 'मीराबाई की निश्चल और निस्वार्थ भक्ति सीधे हृदय को छूती है। प्रेम-बेलि का अश्रुओं से सींचे जाने का भाव काव्य का सर्वोच्च शिखर है।',
    moralOrMessage: 'ईश्वर-भक्ति में सांसारिक लोभ, जाति-पाँति और लोकलाज का कोई स्थान नहीं। सच्ची आस्था और अनन्य प्रेम से ही परमात्मा की प्राप्ति संभव है।',
    boardMarksAllocation: [
      { criterion: '१. कवयित्री का नाम (मीराबाई)', marks: '१ अंक' },
      { criterion: '२. काव्य विधा (भक्ति पद)', marks: '१ अंक' },
      { criterion: '३. केंद्रीय भाव (अनन्य कृष्ण-समर्पण)', marks: '२ अंक' },
      { criterion: '४. प्रयुक्त रूपक व अनुप्रास अलंकार', marks: '२ अंक' },
      { criterion: '५. भाषा-सौंदर्य व दार्शनिक संदेश', marks: '२ अंक' }
    ]
  },

  'गजल — कविता': {
    id: 'hin-poem-4',
    subjectId: 'hin',
    poemTitle: 'गजल (कविता)',
    poetName: 'माणिक वर्मा (प्रख्यात समकालीन गजलकार एवं शायर)',
    sourceOrOrigin: 'कवि माणिक वर्मा के प्रसिद्ध गजल-संग्रह ‘गजल मेरी पहचान’ से।',
    rhymeScheme: 'उर्दू-हिंदी गजल विधा — काफिया और रदीफ का अत्यंत सुव्यवस्थित और लयबद्ध निर्वाह।',
    figuresOfSpeech: [
      {
        name: 'विरोधाभास अलंकार',
        exampleLine: '‘आईना बनकर सँवरने से भला क्या फायदा, रूप पत्थर का पिघलकर मोम होना चाहिए।’',
        explanation: 'पत्थर के कठोर रूप और मोम की कोमलता का विरोधाभास प्रस्तुत कर हृदय में संवेदनशीलता जगाने की बात कही गई है।'
      },
      {
        name: 'रूपक एवं दृष्टांत अलंकार',
        exampleLine: '‘शौक है गर नींव के अंदर दफन होने का, तुम दिखो बाहर तो फिर एक मील का पत्थर बनो।’',
        explanation: 'नींव की ईंट और मील के पत्थर का रूपक देकर निस्वार्थ कर्मयोगी बनने का संदेश दिया गया है।'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत गजल में गजलकार माणिक वर्मा ने मनुष्य को बाहरी रूप-रंग और चमक-दमक के पीछे भागने के बजाय अपने अंतर्मन को सुंदर, मानवीय और संवेदनशील बनाने की प्रेरणा दी है। कवि कहते हैं कि केवल शिखर का कंगूरा बनने की चाहत मत रखो, बल्कि इमारत को मजबूती देने वाली नींव की ईंट बनो। असहाय और दुखी लोगों के आँसू पोंछकर उनके काम आना ही सच्ची मानवता है।',
    favoriteLines: [
      'आपसे किसने कहा स्वर्णिम शिखर बनकर दिखो,',
      'शौक दिखने का है तो फिर नींव के अंदर दिखो!',
      'एक जुगनू ने कहा मैं भी तुम्हारे साथ हूँ,',
      'वक्त की इस धुंध में तुम रोशनी बनकर दिखो।'
    ],
    poeticStyleAndTone: 'सरल, व्यावहारिक, प्रवाहमयी, हिंदुस्तानी (हिंदी-उर्दू मिश्रित) जनबोली की मुहावरेदार भाषाशैली। प्रबोधनात्मक एवं प्रेरणादायी स्वर।',
    reasonForLiking: 'यह गजल जीवन की वास्तविक सच्चाई को उद्घाटित करती है। नींव की ईंट बनने की सीख स्वार्थी दुनिया में निस्वार्थ सेवा का मार्ग दिखाती है।',
    moralOrMessage: 'दिखावे की जिंदगी छोड़कर समाज के लिए कुछ सार्थक काम करें। दुखी और पीड़ित मानवता की सेवा कर उनके जीवन में उजाला फैलाएँ।',
    boardMarksAllocation: [
      { criterion: '१. गजलकार का नाम (माणिक वर्मा)', marks: '१ अंक' },
      { criterion: '२. विधा (गजल - काफिया व रदीफ)', marks: '१ अंक' },
      { criterion: '३. केंद्रीय भाव व मानवीय संवेदना', marks: '२ अंक' },
      { criterion: '४. प्रयुक्त रूपक व भाषा-सौंदर्य', marks: '२ अंक' },
      { criterion: '५. सामाजिक संदेश व प्रेरणा', marks: '२ अंक' }
    ]
  },

  'कृषक गान — कविता': {
    id: 'hin-poem-5',
    subjectId: 'hin',
    poemTitle: 'कृषक गान (कविता)',
    poetName: 'दिनेश भारद्वाज (प्रगतिशील जनवादी कवि)',
    sourceOrOrigin: 'कवि दिनेश भारद्वाज के श्रमजीवी व ग्राम्य-चेतना काव्य संग्रह से साभार।',
    rhymeScheme: 'गेय मुक्त-छंद — तुकांत चरणों में जनगीत की तीव्र लय और गतिशीलता।',
    figuresOfSpeech: [
      {
        name: 'रूपक अलंकार',
        exampleLine: '‘वह अन्नदाता है जगत का, जो स्वयं भूखा सो रहा’',
        explanation: 'किसान को समस्त संसार का पालक और अन्नदाता मानकर पवित्र रूपक बाँधा गया है।'
      },
      {
        name: 'विरोधाभास अलंकार',
        exampleLine: '‘सबको खिलाए अन्न जो, उसके ही घर में तंगहाली’',
        explanation: 'संसार को भोजन देने वाले किसान की अपनी कंगाली और विपन्नता का मर्मस्पर्शी विरोधाभास।'
      }
    ],
    centralIdeaSummary: 'प्रस्तुत कविता में कवि दिनेश भारद्वाज ने अन्नदाता किसान की दयनीय दशा, उसके कठोर परिश्रम और समाज द्वारा उसकी उपेक्षा का यथार्थवादी चित्रण किया है। किसान दिन-रात धूप, ठंड और बरसात में खेत में पसीना बहाकर पूरे संसार का पेट भरता है, किंतु स्वयं अभावों, फटेहाल कपड़ों और भुखमरी में जीने को विवश है। कवि ऐसे कर्मयोगी किसान के सम्मान में श्रद्धा-गीत गाने और उसके अधिकारों की रक्षा का संकल्प लेते हैं।',
    favoriteLines: [
      'हाथ जिसके छाले पड़े हैं, जो धरा का रूप संवारे,',
      'आज उस अन्नदाता के हित, गीत मैं गाता रहूँगा!',
      'भूख की ज्वाला बुझाकर जो स्वयं जलता रहा, उस कृषक का वंदन करूँ।'
    ],
    poeticStyleAndTone: 'ओजपूर्ण, यथार्थपरक, भावनात्मक और जनवादी विद्रोही स्वर। करुण और वीर रस का प्रेरणादायी संगम।',
    reasonForLiking: 'यह कविता हमें भोजन के हर दाने के पीछे छिपे किसान के खून-पसीने की याद दिलाती है और ग्रामीण भारत के प्रति संवेदनशील बनाती है।',
    moralOrMessage: 'किसानों का आदर करना चाहिए, उन्हें उनके श्रम का उचित मूल्य मिलना चाहिए तथा अन्न का कभी अपमान व अपव्यय नहीं करना चाहिए।',
    boardMarksAllocation: [
      { criterion: '१. कवि का नाम (दिनेश भारद्वाज)', marks: '१ अंक' },
      { criterion: '२. संदर्भ व ग्राम्य यथार्थ', marks: '१ अंक' },
      { criterion: '३. केंद्रीय भाव (अन्नदाता की व्यथा)', marks: '२ अंक' },
      { criterion: '४. प्रयुक्त रूपक व अलंकार', marks: '२ अंक' },
      { criterion: '५. किसान सम्मान का राष्ट्रीय संदेश', marks: '२ अंक' }
    ]
  },

  // =========================================================================
  // ENGLISH (Kumarbharati — Full Critical Appreciation in Standard English)
  // =========================================================================

  'Where the Mind is Without Fear': {
    id: 'eng-poem-1',
    subjectId: 'eng',
    poemTitle: 'Where the Mind is Without Fear',
    poetName: 'Rabindranath Tagore (Nobel Laureate in Literature, 1913)',
    sourceOrOrigin: 'Taken from Rabindranath Tagore\'s world-renowned masterpiece collection "Gitanjali" (Poem No. 35), originally written in Bengali as "Chitto Jetha Bhayshunyo" and translated into English by Tagore himself.',
    rhymeScheme: 'Written in Free Verse (no fixed rhyme scheme or regular meter). The rhythmic flow is achieved through elevated philosophical diction and repetitive parallel structures.',
    figuresOfSpeech: [
      {
        name: 'Personification',
        exampleLine: '"Where tireless striving stretches its arms towards perfection"',
        explanation: 'Striving (an abstract human effort) is given the human physical attribute of "stretching its arms".'
      },
      {
        name: 'Metaphor',
        exampleLine: '"Where the clear stream of reason has not lost its way into the dreary desert sand of dead habit"',
        explanation: 'Reason and logical thinking are implicitly compared to a "clear stream", while outdated dogmatic superstitions are compared to "dreary desert sand".'
      },
      {
        name: 'Alliteration',
        exampleLine: '"Where the mind is without fear and the head is held high"',
        explanation: 'Repetition of the soft "w" and aspirated "h" consonant sounds creates solemn auditory resonance.'
      },
      {
        name: 'Synecdoche',
        exampleLine: '"...the head is held high"',
        explanation: 'The physical "head" represents the self-respect and dignity of the entire human person.'
      }
    ],
    centralIdeaSummary: 'The poem is an impassioned prayer to the Almighty Father for spiritual, intellectual, and political freedom. Tagore envisioned an India not merely free from British colonial bondage, but liberated from internal societal evils—fear, narrow communal divisions, casteism, untruthfulness, and blind superstition. He yearns for an awakened nation where knowledge is accessible to all, rational thinking prevails, and citizens relentlessly strive for perfection in thoughts and actions.',
    favoriteLines: [
      '"Where the mind is without fear and the head is held high;',
      'Where knowledge is free;',
      'Where the world has not been broken up into fragments by narrow domestic walls;',
      'Into that heaven of freedom, my Father, let my country awake."'
    ],
    poeticStyleAndTone: 'Solemn, deeply spiritual, patriotic, and uplifting. Written in the classical invocative form of a direct psalm addressed to God ("my Father").',
    reasonForLiking: 'The poem transcends borders and historical periods. It is not just about colonial India; it is a universal manifesto for human enlightenment, global brotherhood, and intellectual fearlessness.',
    moralOrMessage: 'True freedom requires fearless integrity, open-minded pursuit of knowledge, eradication of prejudices, and continuous moral self-improvement.',
    boardMarksAllocation: [
      { criterion: '1. Title & Poet Name', marks: '1 Mark (1/2 + 1/2)' },
      { criterion: '2. Rhyme Scheme', marks: '1 Mark' },
      { criterion: '3. Figures of Speech (with explanation)', marks: '1 Mark' },
      { criterion: '4. Central Idea / Theme (in 4–5 sentences)', marks: '2 Marks' }
    ]
  },

  "All the World's a Stage": {
    id: 'eng-poem-2',
    subjectId: 'eng',
    poemTitle: "All the World's a Stage",
    poetName: 'William Shakespeare (The Bard of Avon)',
    sourceOrOrigin: 'An iconic monologue delivered by the melancholy philosopher-nobleman Jaques in Act II, Scene VII of Shakespeare\'s renowned pastoral comedy "As You Like It".',
    rhymeScheme: 'Blank Verse — Unrhymed Iambic Pentameter (lines consisting of 10 syllables with alternating unstressed and stressed beats: da-DUM da-DUM da-DUM da-DUM da-DUM).',
    figuresOfSpeech: [
      {
        name: 'Extended Metaphor',
        exampleLine: '"All the world\'s a stage, and all the men and women merely players"',
        explanation: 'The entire cosmos is compared to a theatrical stage, and human lifetimes are compared to dramatic roles and stage exits.'
      },
      {
        name: 'Simile',
        exampleLine: '"Creeping like snail unwillingly to school" and "Sighing like furnace"',
        explanation: 'Direct comparison using "like" to highlight the schoolboy\'s sluggish reluctance and the lover\'s passionate sighs.'
      },
      {
        name: 'Alliteration',
        exampleLine: '"A world too wide for his shrunk shank"',
        explanation: 'Repetition of the "w" and "sh" consonant sounds conveys the withered frailty of old age.'
      },
      {
        name: 'Oxymoron / Paradox',
        exampleLine: '"Sans teeth, sans eyes, sans taste, sans everything"',
        explanation: 'The repetitive French word "sans" (without) paradoxically shows how the final stage of life returns to the complete helplessness of an infant.'
      }
    ],
    centralIdeaSummary: 'Shakespeare contemplates the fleeting, cyclical nature of mortal human life by dividing human existence into seven distinct developmental stages: 1) The mewling, puking Infant; 2) The whining Schoolboy creeping like a snail; 3) The sighing Lover writing woeful ballads; 4) The ambitious Soldier seeking bubble reputation; 5) The round-bellied Justice full of wise saws; 6) The aging Pantaloon with shrunk shank and spectacles; and 7) Second Childishness and mere oblivion—ending without teeth, eyes, taste, or anything.',
    favoriteLines: [
      '"All the world\'s a stage, and all the men and women merely players:',
      'They have their exits and their entrances; and one man in his time plays many parts,',
      'His acts being seven ages."',
      '"Last scene of all, that ends this strange eventful history, is second childishness and mere oblivion."'
    ],
    poeticStyleAndTone: 'Philosophical, satirical, observant, and bittersweet. Blends sharp psychological wit with profound existential contemplation of mortality.',
    reasonForLiking: 'Its universal psychological accuracy is stunning. Four centuries later, every human still passes through these identical psychological and biological milestones.',
    moralOrMessage: 'Human life is transient and ego is vanity; we are all temporary performers on the cosmic stage, so one should accept aging and mortality with philosophical poise.',
    boardMarksAllocation: [
      { criterion: '1. Title & Poet', marks: '1 Mark' },
      { criterion: '2. Rhyme Scheme (Blank Verse)', marks: '1 Mark' },
      { criterion: '3. Figures of Speech (Metaphor / Simile)', marks: '1 Mark' },
      { criterion: '4. Central Idea (Seven Ages of Man)', marks: '2 Marks' }
    ]
  },

  'Animals': {
    id: 'eng-poem-3',
    subjectId: 'eng',
    poemTitle: 'Animals',
    poetName: 'Walt Whitman (Father of American Free Verse)',
    sourceOrOrigin: 'Excerpted from Song 32 of Walt Whitman\'s revolutionary, ground-breaking poetry anthology "Song of Myself" in his collection "Leaves of Grass" (1855).',
    rhymeScheme: 'Free Verse — Completely devoid of any end-rhyme scheme or metrical rhythm, reflecting the natural, unconstrained freedom of the animal kingdom.',
    figuresOfSpeech: [
      {
        name: 'Anaphora',
        exampleLine: '"They do not sweat and whine about their condition,\nThey do not lie awake in the dark and weep for their sins,\nThey do not make me sick discussing their duty to God"',
        explanation: 'Repetition of the phrase "They do not..." at the beginning of three consecutive verses emphasizes the tranquil virtues of animals.'
      },
      {
        name: 'Metaphor',
        exampleLine: '"I wonder where they get those tokens, did I pass that way huge times ago and negligently drop them?"',
        explanation: '"Tokens" is an extended metaphor for pure human values—innocence, contentment, honesty, and simplicity—which mankind dropped during evolutionary greed.'
      },
      {
        name: 'Alliteration',
        exampleLine: '"They do not make me sick..."',
        explanation: 'Repetition of the "m" and "s" sounds.'
      }
    ],
    centralIdeaSummary: 'In this introspective poem, Walt Whitman expresses his profound longing to turn away from corrupt human society and live among animals. He observes that animals possess serenity, contentment, and innocence; they do not suffer from anxiety, do not weep for sins in the dark, do not worship fellow creatures, and are never afflicted by the manic obsession of owning material things. Whitman laments that humans originally possessed these noble virtues ("tokens"), but lost them through greed and hypocrisy.',
    favoriteLines: [
      '"I think I could turn and live with animals, they are so placid and self-contain\'d,',
      'I stand and look at them long and long.',
      'Not one is dissatisfied, not one is demented with the mania of owning things."'
    ],
    poeticStyleAndTone: 'Reflective, conversational, candid, and philosophical. Rejects Victorian moralizing in favor of authentic communion with nature.',
    reasonForLiking: 'It sharply exposes modern human neuroses—hypocrisy, guilt, religious dogmatism, and materialism—contrasting them with the quiet dignity and calm of nature.',
    moralOrMessage: 'Simplicity, contentment, and natural authenticity are superior to artificial societal greed; humans should reclaim their lost innocence.',
    boardMarksAllocation: [
      { criterion: '1. Title & Poet Name', marks: '1 Mark' },
      { criterion: '2. Rhyme Scheme (Free Verse)', marks: '1 Mark' },
      { criterion: '3. Figures of Speech (Anaphora / Metaphor)', marks: '1 Mark' },
      { criterion: '4. Central Idea (Simplicity vs Greed)', marks: '2 Marks' }
    ]
  },

  'The Pulley': {
    id: 'eng-poem-4',
    subjectId: 'eng',
    poemTitle: 'The Pulley',
    poetName: 'George Herbert (Eminent 17th-Century Metaphysical Poet)',
    sourceOrOrigin: 'Published posthumously in George Herbert\'s celebrated religious collection of metaphysical devotion, "The Temple: Sacred Poems and Private Ejaculations" (1633).',
    rhymeScheme: 'a-b-a-b-a (Five-line stanzas known as quintets, with precise interlocking end-rhymes: glass-pass, lie-by, span-man).',
    figuresOfSpeech: [
      {
        name: 'Metaphysical Conceit / Metaphor',
        exampleLine: 'The entire poem\'s title "The Pulley"',
        explanation: 'A mechanical pulley (which hoists heavy weights upward) is used as an unexpected metaphysical conceit for human restlessness / weariness, which pulls man\'s soul upward to God.'
      },
      {
        name: 'Pun',
        exampleLine: '"Having a glass of blessings standing by..." and "Let him keep the rest, but keep them with repining restlessness"',
        explanation: 'A clever double-meaning pun on the word "Rest": 1) the remainder of the gifts (wealth, honor), and 2) physical peace of mind / repose.'
      },
      {
        name: 'Paradox',
        exampleLine: '"If goodness lead him not, yet weariness may toss him to my breast."',
        explanation: 'Physical fatigue and spiritual restlessness, usually viewed as negative afflictions, paradoxically become the divine instrument of salvation.'
      }
    ],
    centralIdeaSummary: 'Herbert invents an allegorical creation myth: When God first formed Man, He poured blessings from a divine glass—strength, beauty, wisdom, honor, and pleasure. However, God intentionally withheld the final treasure: "Rest" (contentment). God reasoned that if He bestowed peace and rest, man would worship the gifts of Nature rather than the God of Nature. Thus, God left man rich yet weary, ensuring that when worldly pleasures fail, human restlessness acts like a mechanical "pulley" drawing man\'s soul back to his Creator.',
    favoriteLines: [
      '"When God at first made man, having a glass of blessings standing by...',
      'Yet let him keep the rest, but keep them with repining restlessness:',
      'Let him be rich and weary, that at least,',
      'If goodness lead him not, yet weariness may toss him to my breast."'
    ],
    poeticStyleAndTone: 'Ingenious, witty, devotional, and structured. Exemplifies classic metaphysical poetry using intellectual conceits and religious parables.',
    reasonForLiking: 'The clever mechanical metaphor of a pulley applied to human psychology explains why human beings, despite possessing material luxuries, always feel a restless spiritual void.',
    moralOrMessage: 'Material abundance without spiritual connection leads to exhaustion; true inner peace is found only in divine communion.',
    boardMarksAllocation: [
      { criterion: '1. Title & Poet', marks: '1 Mark' },
      { criterion: '2. Rhyme Scheme (a-b-a-b-a)', marks: '1 Mark' },
      { criterion: '3. Figures of Speech (Pun / Metaphysical Conceit)', marks: '1 Mark' },
      { criterion: '4. Central Idea (The Divine Glass of Blessings)', marks: '2 Marks' }
    ]
  },

  'Night of the Scorpion': {
    id: 'eng-poem-5',
    subjectId: 'eng',
    poemTitle: 'Night of the Scorpion',
    poetName: 'Nissim Ezekiel (Father of Modern Indian English Poetry)',
    sourceOrOrigin: 'Featured in Nissim Ezekiel\'s landmark anthology "The Exact Name" (1965).',
    rhymeScheme: 'Free Verse — Unrhymed conversational narrative structure with fluctuating line lengths capturing raw rural dramatic tension.',
    figuresOfSpeech: [
      {
        name: 'Simile',
        exampleLine: '"The peasants came like swarms of flies"',
        explanation: 'Direct comparison comparing the buzzing, overwhelming arrival of village peasants to swarms of flies.'
      },
      {
        name: 'Metaphor & Onomatopoeia',
        exampleLine: '"...and buzzed the name of God a hundred times to paralyse the Evil One"',
        explanation: 'The scorpion is metaphorically designated as "the Evil One" (diabolic agent), while "buzzed" mimics the chanting hum.'
      },
      {
        name: 'Alliteration',
        exampleLine: '"...diabolic tail in the dark room - he risked the rain again"',
        explanation: 'Repetition of the "d" and "r" consonant sounds enhances the sinister dread of the poisonous creature.'
      },
      {
        name: 'Antithesis / Contrast',
        exampleLine: 'Contrasting the superstitious peasants chanting mantras with the rationalist, skeptic father applying paraffin and matches.',
        explanation: 'Juxtaposition of traditional Indian superstition against modern scientific rationalism.'
      }
    ],
    centralIdeaSummary: 'Set in a rural Indian village on a rainy night, the poem recounts a mother being stung by a venomous scorpion that had crawled beneath a sack of rice. The narrative portrays three distinct responses: 1) The superstitious village peasants chanting mantras and searching for the scorpion with lanterns; 2) The rational, skeptic father resorting to powders, herbs, paraffin, and a flame to burn the bite; and 3) The holy man performing incantations. Ultimately, when the poison subsides after twenty agony-filled hours, maternal love triumphs as the mother simply whispers: "Thank God the scorpion picked on me and spared my children."',
    favoriteLines: [
      '"My mother twisted through and through, groaning on a mat.',
      'My father, sceptic, rationalist, trying every curse and blessing...',
      'My mother only said: Thank God the scorpion picked on me and spared my children."'
    ],
    poeticStyleAndTone: 'Vividly realistic, narrative, ironical, and deeply emotional. Evokes the sensory sights and sounds of a muddy, lantern-lit rural Indian home.',
    reasonForLiking: 'The climax is magnificent: despite enduring twenty hours of excruciating physical torture, the mother\'s only thought is relief that her children were spared.',
    moralOrMessage: 'Maternal love is the most selfless, unconditional force on earth; it transcends physical agony and intellectual debates.',
    boardMarksAllocation: [
      { criterion: '1. Title & Poet Name', marks: '1 Mark' },
      { criterion: '2. Rhyme Scheme (Free Verse)', marks: '1 Mark' },
      { criterion: '3. Figures of Speech (Simile / Antithesis)', marks: '1 Mark' },
      { criterion: '4. Central Idea (Maternal Love & Rural Superstition)', marks: '2 Marks' }
    ]
  },

  'The Will to Win': {
    id: 'eng-poem-6',
    subjectId: 'eng',
    poemTitle: 'The Will to Win',
    poetName: 'Berton Braley (Inspirational American Poet & Journalist)',
    sourceOrOrigin: 'Published in Berton Braley\'s motivational poetry volume "Things As They Are" (1916).',
    rhymeScheme: 'Irregular forceful rhyme scheme (a-b-a-b / c-d-c-d variations with driving percussive rhythm).',
    figuresOfSpeech: [
      {
        name: 'Anaphora & Repetition',
        exampleLine: '"If you want a thing bad enough...\nIf you\'ll gladly sweat for it...\nIf you\'ll simply go after that thing that you want"',
        explanation: 'Repeated use of the conditional conjunction "If you..." builds relentless psychological momentum.'
      },
      {
        name: 'Tautology',
        exampleLine: '"...with all your capacity, strength, and sagacity"',
        explanation: 'Use of multiple synonymous terms to emphasize total mental and physical dedication.'
      },
      {
        name: 'Hyperbole',
        exampleLine: '"If neither cold, poverty, famished and gaunt, nor sickness nor pain can turn you away"',
        explanation: 'Vivid exaggeration of extreme physical deprivation endured to attain the goal.'
      }
    ],
    centralIdeaSummary: 'This hard-hitting motivational poem is a blueprint for achieving seemingly impossible dreams through unrelenting willpower and perseverance. Braley declares that if an individual desires a goal so intensely that they are willing to work day and night, sacrifice sleep, peace, and comfort, endure poverty, sickness, and pain, and relentlessly fight without losing faith, victory is mathematically and spiritually guaranteed: "YOU\'LL GET IT!"',
    favoriteLines: [
      '"If you want a thing bad enough to go out and fight for it,',
      'Work day and night for it, give up your time and your peace and your sleep for it...',
      'If dogged and grim you besiege and beset it,',
      'YOU\'LL GET IT!"'
    ],
    poeticStyleAndTone: 'Energetic, commanding, uncompromising, and highly motivational. Uses direct second-person address ("You") to electrify the reader.',
    reasonForLiking: 'It acts as an instant psychological antidote to procrastination and self-doubt. It reminds students that genius is simply obsessive perseverance.',
    moralOrMessage: 'Success is not a product of luck; it belongs to those with single-minded passion, resilience, and unyielding determination.',
    boardMarksAllocation: [
      { criterion: '1. Title & Poet', marks: '1 Mark' },
      { criterion: '2. Rhyme Scheme & Rhythm', marks: '1 Mark' },
      { criterion: '3. Figures of Speech (Anaphora / Hyperbole)', marks: '1 Mark' },
      { criterion: '4. Central Idea (Unconditional Perseverance)', marks: '2 Marks' }
    ]
  },

  'A Thing of Beauty is a Joy For Ever': {
    id: 'eng-poem-7',
    subjectId: 'eng',
    poemTitle: 'A Thing of Beauty is a Joy For Ever',
    poetName: 'John Keats (Foremost Romantic Poet of Sensuous Beauty)',
    sourceOrOrigin: 'The immortal opening passage of John Keats\'s epic mythological romance poem "Endymion: A Poetic Romance" (Book I, lines 1–24, published 1818).',
    rhymeScheme: 'Heroic Couplets — Rhyming pairs of iambic pentameter lines (a-a, b-b, c-c: ever-never, keep-sleep, breathing-wreathing).',
    figuresOfSpeech: [
      {
        name: 'Epigram',
        exampleLine: '"A thing of beauty is a joy for ever"',
        explanation: 'A concise, memorable, proverb-like statement expressing a timeless universal truth.'
      },
      {
        name: 'Metaphor',
        exampleLine: '"A bower quiet for us, and a sleep full of sweet dreams"',
        explanation: 'Beauty is metaphorically compared to a tranquil shady bower in a forest offering restful shelter from worldly anguish.'
      },
      {
        name: 'Alliteration',
        exampleLine: '"Noble natures" and "cooling covert"',
        explanation: 'Soft harmonious repetition of the "n" and "c" sounds.'
      },
      {
        name: 'Imagery',
        exampleLine: '"Daffodils with the green world they live in, and clear rills that for themselves a cooling covert make"',
        explanation: 'Sensuous, vivid visual and tactile imagery evoking lush natural landscapes.'
      }
    ],
    centralIdeaSummary: 'John Keats expounds his romantic philosophy that true beauty possesses eternal, immortal life. Unlike physical objects that fade, a thing of beauty increases in loveliness with time and never passes into nothingness. Amidst human gloom, despondence, loss of noble ideals, and dark days, beautiful creations of nature (the sun, moon, old and young trees, daffodils, clear streams, musk-roses) and inspiring grand heroic tales act as a heavenly pall-lifter, wiping away dark misery from our souls.',
    favoriteLines: [
      '"A thing of beauty is a joy for ever:',
      'Its loveliness increases; it will never pass into nothingness;',
      'But still will keep a bower quiet for us, and a sleep full of sweet dreams..."',
      '"An endless fountain of immortal drink, pouring unto us from the heaven\'s brink."'
    ],
    poeticStyleAndTone: 'Lush, sensuous, aesthetic, and transcendent. Characterized by Keats\'s signature romantic melody and opulent imagery.',
    reasonForLiking: 'Its opening line is one of the most famous declarations in world literature. It provides comforting solace that art and nature can heal any depression.',
    moralOrMessage: 'Nature and artistic beauty have therapeutic powers to dispel human melancholy and provide perpetual spiritual joy.',
    boardMarksAllocation: [
      { criterion: '1. Title & Poet Name', marks: '1 Mark' },
      { criterion: '2. Rhyme Scheme (Heroic Couplets aabbcc)', marks: '1 Mark' },
      { criterion: '3. Figures of Speech (Epigram / Metaphor)', marks: '1 Mark' },
      { criterion: '4. Central Idea (Immortal Healing Power of Beauty)', marks: '2 Marks' }
    ]
  },

  'The Height of the Ridiculous': {
    id: 'eng-poem-8',
    subjectId: 'eng',
    poemTitle: 'The Height of the Ridiculous',
    poetName: 'Oliver Wendell Holmes (Renowned 19th-Century American Fireside Poet & Physician)',
    sourceOrOrigin: 'Published in Oliver Wendell Holmes\'s first comedic poetry anthology "Poems" (1836).',
    rhymeScheme: 'Ballad Stanza Meter — Quatrains with a-b-c-b end rhyme scheme (lines 2 and 4 rhyme: print-in\'t, way-day, side-died).',
    figuresOfSpeech: [
      {
        name: 'Hyperbole (Exaggeration)',
        exampleLine: '"He broke five buttons off his vest and tumbled in a fit"',
        explanation: 'Extreme comic exaggeration describing the servant\'s physical reaction to laughing uncontrollably.'
      },
      {
        name: 'Alliteration',
        exampleLine: '"...slender servant" and "ten days and nights"',
        explanation: 'Alliterative repetition of the "s" and "d" sounds.'
      },
      {
        name: 'Onomatopoeia',
        exampleLine: '"...a chuckling noise he made, and then a grin grew broad"',
        explanation: 'The word "chuckling" phonetically echoes the vocal sound of stifled laughter.'
      },
      {
        name: 'Irony',
        exampleLine: '"I never dare to write as funny as I can"',
        explanation: 'Humorous dramatic irony where the author swears off writing funny poetry because his humor is fatally potent.'
      }
    ],
    centralIdeaSummary: 'This light-hearted humorous narrative poem recounts the comical disaster caused by a poet who penned some extremely witty, merry verses. Pleased with his own genius, he gives the manuscript to his sober, slender manservant to deliver to the printing press. As the servant reads the lines, his chuckles escalate into convulsive guffaws: the third line makes him split his sides, the fourth bursts five buttons off his waistcoat, and by the fifth he collapses in a fit! After nursing the poor servant through ten days and nights of continuous laughter, the poet vows never again to write "as funny as I can".',
    favoriteLines: [
      '"I wrote some lines once on a time in wondrous merry mood...',
      'He broke five buttons off his vest, and tumbled in a fit;',
      'Ten days and nights, with sleepless eye, I watched that poor young man,',
      'And since, I never dare to write as funny as I can."'
    ],
    poeticStyleAndTone: 'Playful, jocular, self-deprecating, and melodious. Follows the rhythmic, fast-paced cadence of a comic ballad.',
    reasonForLiking: 'It provides pure, innocent laughter and relief from heavy academic topics. The image of buttons bursting off a vest is timeless slapstick comedy.',
    moralOrMessage: 'Laughter is powerful medicine, but excessive humor without caution can be hazardously overwhelming!',
    boardMarksAllocation: [
      { criterion: '1. Title & Poet', marks: '1 Mark' },
      { criterion: '2. Rhyme Scheme (a-b-c-b Ballad Meter)', marks: '1 Mark' },
      { criterion: '3. Figures of Speech (Hyperbole / Irony)', marks: '1 Mark' },
      { criterion: '4. Central Idea (The Perils of Excessive Humor)', marks: '2 Marks' }
    ]
  }
};
