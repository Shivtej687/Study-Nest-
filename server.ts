import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

// Initialize the secure server-side Google GenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Helper to execute generateContent with automatic multi-model fallback using modern @google/genai models
async function generateContentWithFallback(params: { contents: any; config?: any }) {
  const models = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.1-pro-preview"];
  let lastError: any = null;
  for (const model of models) {
    try {
      return await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
    } catch (error: any) {
      lastError = error;
      console.warn(`Model ${model} unavailable or rate limited (${error.message || error}), trying next fallback...`);
    }
  }
  throw lastError || new Error("All AI models were temporarily unavailable.");
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint to generate complete personalized curriculum parameters
  app.post('/api/gemini/generate-dashboard', async (req: express.Request, res: express.Response) => {
    try {
      const { name, age, std, studying, board } = req.body;
      
      const prompt = `You are an elite academic counselor. Create a comprehensive, standard-specific, and board-appropriate study curriculum for:
- Student Name: ${name}
- Age: ${age}
- Standard/Grade: ${std}
- Focus Subjects/Interests Entered by Student: ${studying}
- Board of Education: ${board}

CRITICAL RULES:
1. Instead of narrow chapter-level titles (like "Linear equations" or "Quadratic Mastery"), you MUST generate exactly 10 courses representing the following high-level academic subjects for their standard:
   - "Maths 1"
   - "Maths 2"
   - "Science 1"
   - "Science 2"
   - "Marathi"
   - "English"
   - "Hindi"
   - "Sanskrit"
   - "History and political Science"
   - "Geography"
2. Each of these 10 courses MUST be present in the "courses" array.
3. For each of these courses, the "title" and "subject" MUST match the respective subject name exactly (e.g. title: "Maths 1", subject: "Maths 1").
4. For each course, generate exactly 4 syllabus sub-chapters/milestones under the "chapters" field, appropriate for age ${age}, standard ${std}, and board ${board}.
5. Ensure the schedule (classesSchedule) and book recommendations cover some of these major subjects cohesively.`;

      const response = await generateContentWithFallback({
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              curriculumQuote: {
                type: Type.STRING,
                description: "Luxury motivational quote specific to this child's grade and syllabus"
              },
              studyGoalHours: {
                type: Type.INTEGER,
                description: "Recommended daily study hours (integer between 2 and 5)"
              },
              courses: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING, description: "Title of the course (e.g. Maths 1, Maths 2, Marathi, Geography)" },
                    subject: { type: Type.STRING, description: "The high level subject area (e.g. Maths 1, Maths 2, Science 1, Science 2, Marathi, English, Hindi, Sanskrit, History and political Science, Geography)" },
                    lessonsCount: { type: Type.INTEGER },
                    chapters: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "List of exactly 4 specific syllabus sub-chapters/milestones for this course"
                    }
                  },
                  required: ["id", "title", "subject", "lessonsCount", "chapters"]
                },
                description: "Exactly 10 courses corresponding to: Maths 1, Maths 2, Science 1, Science 2, Marathi, English, Hindi, Sanskrit, History and political Science, Geography"
              },
              classesSchedule: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING },
                    time: { type: Type.STRING },
                    subject: { type: Type.STRING },
                    topic: { type: Type.STRING }
                  },
                  required: ["day", "time", "subject", "topic"]
                },
                description: "Exactly 10 weekly virtual classes, one for each of the 10 subjects"
              },
              recommendedBooks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    author: { type: Type.STRING },
                    type: { type: Type.STRING }
                  },
                  required: ["title", "author", "type"]
                },
                description: "Exactly 10 textbook recommendations, one for each of the 10 subjects"
              },
              quizQuestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctIndex: { type: Type.INTEGER, description: "0-indexed correct answer" },
                    explanation: { type: Type.STRING }
                  },
                  required: ["question", "options", "correctIndex", "explanation"]
                },
                description: "Exactly 10 syllabus-appropriate multiple choice questions, one for each of the 10 subjects"
              },
              studyTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exactly 10 custom focus techniques, one for each of the 10 subjects"
              }
            },
            required: [
              "curriculumQuote", 
              "studyGoalHours", 
              "courses", 
              "classesSchedule", 
              "recommendedBooks", 
              "quizQuestions", 
              "studyTips"
            ]
          }
        }
      });

      const rawText = response.text || '{}';
      res.json(JSON.parse(rawText));
    } catch (error: any) {
      console.warn("Gemini dashboard generation rate-limited or failed, using robust academic fallback curriculum:", error.message || error);
      res.json({
        curriculumQuote: "Excellence is not an act, but a quiet daily habit.",
        studyGoalHours: 4,
        courses: [
          { id: "maths1", title: "Maths 1", subject: "Maths 1", lessonsCount: 8, chapters: ["Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progression", "Probability"] },
          { id: "maths2", title: "Maths 2", subject: "Maths 2", lessonsCount: 8, chapters: ["Similarity", "Pythagoras Theorem", "Circle", "Coordinate Geometry"] },
          { id: "science1", title: "Science 1", subject: "Science 1", lessonsCount: 8, chapters: ["Gravitation", "Periodic Classification of Elements", "Chemical Reactions", "Effects of Electric Current"] },
          { id: "science2", title: "Science 2", subject: "Science 2", lessonsCount: 8, chapters: ["Heredity and Evolution", "Life Processes in Living Organisms Part 1", "Life Processes in Living Organisms Part 2", "Environmental Management"] },
          { id: "marathi", title: "Marathi", subject: "Marathi", lessonsCount: 6, chapters: ["संतवाणी", "खेळताना...", "व्याकरण व समास", "उपयोजित लेखन"] },
          { id: "english", title: "English", subject: "English", lessonsCount: 6, chapters: ["Targeting Grammar", "Writing Skills & Letters", "Prose Comprehension", "Poetry Analysis"] },
          { id: "hindi", title: "Hindi", subject: "Hindi", lessonsCount: 6, chapters: ["गद्य व पद्य", "व्याकरण", "रचना विभाग", "पत्र लेखन"] },
          { id: "sanskrit", title: "Sanskrit", subject: "Sanskrit", lessonsCount: 6, chapters: ["सुभाषितानि", "कारकप्रकरणम्", "संध्या व समास", "अपठित गद्यांश"] },
          { id: "history", title: "History and political Science", subject: "History and political Science", lessonsCount: 8, chapters: ["Historiography: Indian Tradition", "Historiography: West", "Applied History", "Mass Media and History"] },
          { id: "geography", title: "Geography", subject: "Geography", lessonsCount: 8, chapters: ["Field Work", "Location and Extent", "Physiography and Drainage", "Climate"] }
        ],
        classesSchedule: [
          { day: "Monday", time: "09:00 AM", subject: "Maths 1", topic: "Linear Equations Masterclass" },
          { day: "Monday", time: "11:00 AM", subject: "Science 1", topic: "Gravitation Laws" },
          { day: "Tuesday", time: "09:00 AM", subject: "Maths 2", topic: "Pythagorean Triplet Practice" },
          { day: "Tuesday", time: "11:00 AM", subject: "English", topic: "Grammar & Composition" },
          { day: "Wednesday", time: "09:00 AM", subject: "Science 2", topic: "Heredity & DNA" },
          { day: "Wednesday", time: "11:00 AM", subject: "History and political Science", topic: "Indian Historiography" },
          { day: "Thursday", time: "09:00 AM", subject: "Geography", topic: "Physiography & Drainage" },
          { day: "Thursday", time: "11:00 AM", subject: "Marathi", topic: "व्याकरण व समास" },
          { day: "Friday", time: "09:00 AM", subject: "Hindi", topic: "गद्य व पद्य विश्लेषण" },
          { day: "Friday", time: "11:00 AM", subject: "Sanskrit", topic: "सुभाषितानि पठन" }
        ],
        recommendedBooks: [
          { title: "Target Publication SSC Mathematics 1", author: "Target Publications", type: "Textbook & Notes" },
          { title: "Target Publication SSC Mathematics 2", author: "Target Publications", type: "Textbook & Notes" },
          { title: "Mastering Science & Technology Part 1", author: "Navneet Board Experts", type: "Reference" },
          { title: "Mastering Science & Technology Part 2", author: "Navneet Board Experts", type: "Reference" },
          { title: "Marathi Kumarbharati Grammar & Writing", author: "State Board", type: "Workbook" },
          { title: "English Kumarbharati Complete Guide", author: "Oxford / State Board", type: "Guide" },
          { title: "Hindi Lokbharati Guide", author: "State Board", type: "Workbook" },
          { title: "Sanskrit Aaradhya", author: "State Board", type: "Textbook" },
          { title: "History and Political Science Mastery", author: "Target Publications", type: "Notes" },
          { title: "Geography Complete Map & Atlas", author: "Navneet", type: "Workbook" }
        ],
        quizQuestions: [
          { question: "Which of the following is a linear equation in two variables?", options: ["x² + y = 5", "3x + 4y = 12", "xy + 2 = 0", "x + y² = 1"], correctIndex: 1, explanation: "3x + 4y = 12 has degree 1 in both variables x and y." },
          { question: "What is the value of discriminant Δ for equation ax² + bx + c = 0?", options: ["b² - 4ac", "b² + 4ac", "4ac - b²", "b - 4ac"], correctIndex: 0, explanation: "Discriminant Δ = b² - 4ac." },
          { question: "The gravitational force between two objects is inversely proportional to what?", options: ["Distance", "Square of the distance", "Mass product", "Velocity"], correctIndex: 1, explanation: "F = G m1 m2 / r², so it is inversely proportional to the square of the distance r." },
          { question: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], correctIndex: 2, explanation: "Mitochondria generate chemical energy stored in ATP." },
          { question: "कोणता समास उभयविध पदांमध्ये महत्त्वाचा असतो?", options: ["अव्ययीभाव", "द्वंद्व समास", "बहुव्रीहि", "कर्मधारय"], correctIndex: 1, explanation: "द्वंद्व समासात दोन्ही पदे महत्त्वाची असतात." },
          { question: "Identify the figure of speech in: 'The wind whispered through the trees.'", options: ["Simile", "Metaphor", "Personification", "Hyperbole"], correctIndex: 2, explanation: "Personification gives human traits to non-human things." },
          { question: "Which ancient civilization's historiography is noted for the tradition of chronicling royal events?", options: ["Greek", "Mesopotamian / Indian", "Roman", "Aztec"], correctIndex: 1, explanation: "Indian and Mesopotamian traditions chronicled historical deeds and traditions." },
          { question: "The highest peak in South India is:", options: ["Anamudi", "Dodabetta", "Nilgiri", "K2"], correctIndex: 0, explanation: "Anamudi in Kerala is the highest peak in South India." },
          { question: "संस्कृतभाषाम् कति कारकानि सन्ति?", options: ["षट्", "सप्त", "पञ्च", "अष्ट"], correctIndex: 1, explanation: "संस्कृत व्याकरणे कर्त्रधि षट् कारकानि (कर्ता, कर्म, करण, संप्रदान, अपादान, अधिकरण)." },
          { question: "Which gas is released during photosynthesis?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correctIndex: 1, explanation: "Photosynthesis releases oxygen as a byproduct." }
        ],
        studyTips: [
          "Practice at least 5 numerical problems in Algebra daily.",
          "Draw neat, labeled geometrical diagrams with a sharp pencil.",
          "Memorize chemical reactions by writing balanced equations 3 times.",
          "Create flowcharts for biological processes and life cycles.",
          "सराव करा: मराठी व्याकरणाचे नियम दररोज १० मिनिटे वाचा.",
          "Read one English editorial article daily to improve vocabulary.",
          "हिंदी व्याकरण व मुहावरे रोज ५ सराव करा.",
          "लिखिताभ्यास: संस्कृत सुभाषित पाठांतर व अर्थ.",
          "Make timeline charts for historical events.",
          "Practice map pointing regularly for Geography exams."
        ]
      });
    }
  });

  // API endpoint for real-time AI Doubt clearance (Legacy single-shot)
  app.post('/api/gemini/clear-doubt', async (req: express.Request, res: express.Response) => {
    try {
      const { doubt, std, board, studying } = req.body;
      const prompt = `You are Study Nest AI, a wise, encouraging academic tutor. A student studying in ${std} under the ${board} board, focusing on ${studying}, has the following doubt:
"${doubt}"

Please explain this concept in a very clear, supportive, and age-appropriate manner, providing examples where helpful. Keep it within 150 words.`;

      const response = await generateContentWithFallback({
        contents: prompt
      });

      res.json({ answer: response.text || "I was unable to clear your doubt. Please try again." });
    } catch (error: any) {
      console.error("AI Doubt clearance error:", error);
      res.status(500).json({ error: error.message || "AI was unable to clear doubt." });
    }
  });

  // 24/7 Conversational AI Doubt Solver & Casual Study Buddy
  app.post('/api/gemini/doubt-chat', async (req: express.Request, res: express.Response) => {
    try {
      const { messages, mode = 'casual', subject = 'All', studentProfile } = req.body;
      
      const std = studentProfile?.std || 'Class 10';
      const board = studentProfile?.board || 'Maharashtra State Board (SSC)';
      const name = studentProfile?.name || 'Student';
      const studying = studentProfile?.studying || 'SSC Syllabus';

      let toneInstruction = '';
      if (mode === 'casual') {
        toneInstruction = `You are a super friendly, casual, witty, and encouraging 24/7 study buddy and mentor. Talk naturally and casually (like a supportive older sibling or cool study partner). Use conversational greetings, light humor, relatable analogies, and emojis where appropriate. You are approachable and ready for both deep scholastic doubts and fun casual study banter, cheer-ups, and life balance advice.`;
      } else if (mode === 'exam') {
        toneInstruction = `You are an expert SSC/State Board examiner and master tutor. Provide crisp, structured, exam-oriented solutions with 'Given', 'Formula', 'Step-by-step working', 'Key Definitions', and 'Final Answer with Units' where applicable. Highlight common board exam pitfalls and mark-scoring tips.`;
      } else if (mode === 'quick') {
        toneInstruction = `You are an ultra-fast revision coach. Deliver crisp, bulleted, high-yield explanations under 120 words with clear memory hooks and mnemonics.`;
      }

      const systemInstruction = `You are NestAI, the 24/7 AI Doubt Solver and Study Companion inside the Study Nest platform.
Current Student Context:
- Student Name: ${name}
- Grade / Standard: ${std}
- Educational Board: ${board}
- Current Focus / Subject Area: ${subject !== 'All' ? subject : studying}
- Response Mode: ${mode}

CORE DIRECTIVES:
1. 24/7 AVAILABILITY & CAPABILITY: You can solve and answer ANY scholastic or casual question across all subjects including:
   - Mathematics 1 (Algebra, Linear Equations, Quadratic, AP, Probability, Statistics)
   - Mathematics 2 (Geometry, Similarity, Pythagoras, Circles, Trigonometry, Coordinate Geometry, Mensuration)
   - Science 1 (Gravitation, Periodic Table, Chemical Reactions, Refraction, Lenses, Carbon Compounds, Space)
   - Science 2 (Heredity, Life Processes, Environmental Mgmt, Animal Classification, Biotechnology, Disaster Mgmt)
   - Languages: Marathi (व्याकरण, समास, वृत्त, उपयोजित लेखन), Hindi (व्याकरण, मुहावरे, पत्र लेखन), English (Grammar, Writing Skills), Sanskrit (सुभाषितानि, व्याकरणम्)
   - Social Sciences: History, Political Science, Geography (Map work, climate, agriculture, governance)
   - General Study Techniques, Memory Tricks, Time Management, Stress Relief, Casual Conversations & Daily Banter.
2. TONE & PERSONALITY: ${toneInstruction}
   - You MUST be able to talk casually and warmly. When a student says "hi", "how are you", "I feel lazy today", or asks a casual question, talk to them like a real friend while gently motivating them.
   - Never be robotic, overly stiff, or dismissive.
3. LANGUAGE DYNAMICS:
   - If the student asks in Marathi (e.g. "गुरूत्वाकर्षण म्हणजे काय?"), answer naturally and accurately in Marathi (Devanagari script).
   - If the student asks in Hindi / Hinglish, answer naturally in Hindi / Hinglish.
   - If in English, answer in clear, engaging English.
4. FORMATTING: Use Markdown with bolding for key terms, clear step numbering, bullet points, and neat spacing for mathematical formulas.
5. LENGTH & ENGAGEMENT: Keep explanations comprehensive yet digestible. At the end, you can optionally include a short encouraging one-liner or ask a quick follow-up to check their understanding.`;

      // Format messages for @google/genai
      const formattedContents = (messages || []).map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      if (formattedContents.length === 0) {
        return res.status(400).json({ error: "No messages provided." });
      }

      const response = await generateContentWithFallback({
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: mode === 'casual' ? 0.8 : 0.4,
          topP: 0.95,
        }
      });

      const reply = response.text || "I'm right here with you! Could you please repeat or rephrase that doubt?";
      res.json({ reply });
    } catch (error: any) {
      console.error("AI Doubt Chat error:", error);
      res.status(500).json({ 
        error: error.message || "NestAI is temporarily catching its breath. Please try again!",
        reply: "Hey! Looks like my connection had a tiny hiccup. Feel free to ask your doubt again, I'm right here 24/7!"
      });
    }
  });

  // Mount Vite development server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Full-stack Server listening on http://localhost:${PORT}`);
  });
}

startServer();
