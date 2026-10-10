import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
You are the Senior Solutions Consultant & Lead AI Partner at AJ Code Studio.

STRICT LANGUAGE MATCHING (TOP PRIORITY - NEVER FAIL THIS):
- IF CLIENT SPEAKS ENGLISH: You MUST reply in 100% articulate, professional ENGLISH. NEVER reply in Roman Urdu or Urdu if the user writes in English.
- IF CLIENT SPEAKS ROMAN URDU: Reply in natural, polite Roman Urdu.
- IF CLIENT SPEAKS URDU SCRIPT (اردو): Reply in Urdu script.
- ALWAYS match the exact language of the user's latest message.

AJ CODE TEAM PROFILE & EXPERTISE:
- Who we are: Elite full-stack engineering team with 3,000+ satisfied global clients.
- Stack: Next.js 16 (Turbopack, Server Components), React 19, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Stripe/PayPal payment integrations, and 95+ SEO performance.
- Services: High-conversion E-Commerce, custom SaaS web apps, corporate portfolios, and API development.

STRICT CONVERSATION RULES:
1. WHEN ASKED ABOUT A CONSULTATION / DISCOVERY CALL:
   - English: "We would be delighted to schedule a 1-on-1 discovery consultation for your project! Please click 'Forward to WhatsApp' below to connect with us, and the AJ Code Team will reach out to you shortly."
   - Roman Urdu: "Zaroor! Hum aapke project ke liye 1-on-1 discovery session arrange karenge. 'Forward to WhatsApp' par click kar ke apni details share kar dein, AJ Code Team aapse jald rabta karegi."
2. WHEN CLIENT ASKS ABOUT AJ CODE TEAM:
   - English: "AJ Code Team specializes in high-performance Next.js 16 web applications, custom SaaS, and E-Commerce stores with a track record of 3,000+ satisfied global clients."
   - Roman Urdu: "AJ Code Team Next.js 16 aur full-stack MERN par high-performance web apps, SaaS aur E-Commerce stores banati hai with 3,000+ global clients."
3. WHEN CLIENT PROVIDES CONTACT DETAILS:
   - English: "Thank you! Details received. Please click 'Forward to WhatsApp' below to share your details, and the AJ Code Team will connect with you shortly."
   - Roman Urdu: "Bohat shukriya! Details receive ho chuki hain. 'Forward to WhatsApp' par click kar ke apni details share kar dein, AJ Code Team aapse jald rabta karegi."
4. NO PRICING / NO DOLLAR FIGURES:
   - NEVER write dollar numbers ($). Explain that cost depends on custom features and scope.
5. SHORT & CRISP:
   - Maximum 2 short sentences (strictly under 30 words).
6. BRANDING & PRIVACY:
   - Refer only to "AJ Code Team" or "AJ AI Assistant". Never mention any personal individual names or raw phone numbers in text.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API Key is not configured." },
        { status: 500 }
      );
    }

    // Format messages for Gemini API
    const formattedContents = (messages || []).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const activeModels = [
      "gemini-3.1-flash-lite",
      "gemini-3.7-flash",
      "gemini-3-flash-preview",
      "gemini-3.5-flash-lite",
      "gemini-flash-lite-latest",
      "gemini-3.5-flash",
    ];

    let reply = "";

    for (const model of activeModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }],
              },
              contents: formattedContents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
                topP: 0.9,
              },
            }),
          }
        );

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            reply = data.candidates[0].content.parts[0].text;
            break;
          }
        }
      } catch (err) {
        // Try next model seamlessly
      }
    }

    if (!reply) {
      // Smart bilingual contextual fallback engine
      const lastUserMsg = (messages[messages.length - 1]?.content || "").toLowerCase();
      
      const isEnglish = (
        lastUserMsg.includes("i want") ||
        lastUserMsg.includes("schedule") ||
        lastUserMsg.includes("consultation") ||
        lastUserMsg.includes("build") ||
        lastUserMsg.includes("about") ||
        lastUserMsg.includes("services") ||
        lastUserMsg.includes("would like") ||
        lastUserMsg.includes("project") ||
        lastUserMsg.includes("store") ||
        lastUserMsg.includes("cost") ||
        lastUserMsg.includes("price") ||
        lastUserMsg.includes("hello") ||
        lastUserMsg.includes("hi")
      ) && !lastUserMsg.includes("hai") && !lastUserMsg.includes("karna") && !lastUserMsg.includes("karein") && !lastUserMsg.includes("mujhe") && !lastUserMsg.includes("aap");

      if (isEnglish) {
        if (lastUserMsg.includes("schedule") || lastUserMsg.includes("consultation") || lastUserMsg.includes("call") || lastUserMsg.includes("meet")) {
          reply = "We would be delighted to schedule a 1-on-1 discovery consultation for your project! Please click 'Forward to WhatsApp' below to share your requirements, and the AJ Code Team will reach out to you shortly.";
        } else if (lastUserMsg.includes("team") || lastUserMsg.includes("about") || lastUserMsg.includes("services")) {
          reply = "The AJ Code Team specializes in high-performance Next.js 16 web applications, custom SaaS, and E-Commerce platforms with 3,000+ satisfied global clients.";
        } else if (lastUserMsg.includes("cost") || lastUserMsg.includes("price") || lastUserMsg.includes("pricing") || lastUserMsg.includes("quote")) {
          reply = "Project pricing is tailored based on your custom requirements and features. Please click 'Forward to WhatsApp' below to get a direct proposal from the AJ Code Team.";
        } else if (lastUserMsg.includes("@") || lastUserMsg.includes("+") || lastUserMsg.includes("name") || lastUserMsg.includes("email") || lastUserMsg.includes("phone")) {
          reply = "Thank you! Your details have been received. Please click 'Forward to WhatsApp' below to connect, and the AJ Code Team will reach out to you shortly.";
        } else {
          reply = "Great! We engineer high-performance Next.js 16 web applications. Please share your project details or click 'Forward to WhatsApp' to connect with the AJ Code Team.";
        }
      } else {
        if (lastUserMsg.includes("consultation") || lastUserMsg.includes("schedule") || lastUserMsg.includes("meeting") || lastUserMsg.includes("session") || lastUserMsg.includes("call")) {
          reply = "Zaroor! Hum aapke project ke liye 1-on-1 discovery session arrange karenge. 'Forward to WhatsApp' par click kar ke apni details share kar dein, AJ Code Team aapse jald rabta karegi.";
        } else if (lastUserMsg.includes("team") || lastUserMsg.includes("about") || lastUserMsg.includes("services") || lastUserMsg.includes("kaun")) {
          reply = "AJ Code Team Next.js 16 aur full-stack MERN par ultra-fast web apps, SaaS aur E-Commerce stores banati hai with 3,000+ global clients.";
        } else if (lastUserMsg.includes("cost") || lastUserMsg.includes("price") || lastUserMsg.includes("paisa") || lastUserMsg.includes("rate") || lastUserMsg.includes("kitna")) {
          reply = "Cost aapki requirements aur features par depend karti hai. Exact quote ke liye apna Name aur WhatsApp number share karein, AJ Code Team jald aapse rabta karegi.";
        } else if (lastUserMsg.includes("vision") || lastUserMsg.includes("vission")) {
          reply = "Vision se muraad aapke business ke main goals, target audience aur key features hain. Aap kis category ka project banana chahte hain?";
        } else if (lastUserMsg.includes("@") || lastUserMsg.includes("03") || lastUserMsg.includes("naam") || lastUserMsg.includes("name") || lastUserMsg.includes("number")) {
          reply = "Bohat shukriya! Details receive ho chuki hain. 'Forward to WhatsApp' par click kar ke apni details share kar dein, AJ Code Team aapse jald rabta karegi.";
        } else {
          reply = "Zabardast! Hum Next.js 16 par high-performance web applications design aur build karte hain. Aap apne project ke specific requirements share karein, AJ Code Team aapse discussion karegi.";
        }
      }
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat request." },
      { status: 500 }
    );
  }
}
