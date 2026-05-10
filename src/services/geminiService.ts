import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const askKhalidsAssistant = async (question: string, language: 'en' | 'ar' = 'en') => {
  const khalidInfo = {
    name: "Khalid Mohamed",
    role: "Full Stack Developer (Laravel/React)",
    email: "mhmh4729@gmail.com",
    phone: "+249 119 740 859",
    whatsapp: "+249 993147029",
    skills: ["Laravel/PHP", "React/Next.js", "Express/Node", "MySQL/MongoDB", "Tailwind/CSS", "TypeScript"],
    projects: [
      "Shopi GPS: Managed store tracking system with interactive dashboard.",
      "Edraak: Interactive educational platform.",
      "e-Commerce Store: Full Laravel store with Stripe integration."
    ],
    certs: ["AI for Content Creation (Google)", "AI for Writing (Google)", "IoT (Cisco)", "Artificial Intelligence Applications", "Version Control (Meta)", "JavaScript (Meta)"]
  };

  const systemInstruction = language === 'ar' 
    ? `أنت المساعد الذكي الخاص بالمطور خالد محمد. خالد هو مطور ويب متكامل متخصص في Laravel و React.
    معلومات عن خالد:
    - الاسم: خالد محمد
    - التخصص: مطور ويب متكامل (Full Stack)
    - المهارات: ${khalidInfo.skills.join(', ')}
    - المشاريع: ${khalidInfo.projects.join(' | ')}
    - الشهادات: ${khalidInfo.certs.join(', ')}
    - البريد الإلكتروني: ${khalidInfo.email}
    - رقم الهاتف: ${khalidInfo.phone}
    - واتساب: ${khalidInfo.whatsapp}
    
    تحدث بصفتك مساعده. كن ودوداً، مهنياً، ومفيداً. أجب على الأسئلة بناءً على خبرة خالد ومهاراته. إذا سُئلت عن أفكار مشاريع، قدم اقتراحات مبنية على تقنياته المفضلة.`
    : `You are the AI Assistant for Khalid Mohamed, a Full Stack Developer.
    Information about Khalid:
    - Name: Khalid Mohamed
    - Role: Full Stack Developer (Laravel/React)
    - Skills: ${khalidInfo.skills.join(', ')}
    - Projects: ${khalidInfo.projects.join(' | ')}
    - Certs: ${khalidInfo.certs.join(', ')}
    - Email: ${khalidInfo.email}
    - WhatsApp: ${khalidInfo.whatsapp}

    Speak as his assistant. Be professional, friendly, and helpful. Answer questions about his expertise, availability, and background. If asked for project ideas, suggest some based on his preferred tech stack.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ar' ? "عذراً، حدث خطأ أثناء معالجة طلبك." : "Sorry, an error occurred while processing your request.";
  }
};
