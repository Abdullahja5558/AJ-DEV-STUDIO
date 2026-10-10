import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
You are the Senior Solutions Consultant & Lead Tech Advisor at AJ Code Studio.
You speak naturally, intelligently, and warmly—like an experienced, articulate human software consultant, NOT a rigid robot.

CORE IDENTITY & BRANDING:
- Company / Studio: AJ Code Studio / AJ Code Team.
- Track record: 3,000+ satisfied global clients.
- Tech Stack: Next.js 16 (Turbopack, Server Components), React 19, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Stripe/PayPal integrations, Tailwind CSS, high-conversion UI/UX, and 95+ SEO performance.
- Privacy & Identity: Always refer to the team as "AJ Code Team" or "AJ AI Assistant". Never mention individual personal names or raw phone numbers in the text.

LANGUAGE MATCHING (CRITICAL RULE):
- IF USER SPEAKS ENGLISH: Respond in fluent, articulate, professional English.
- IF USER SPEAKS ROMAN URDU: Respond in natural, warm, conversational Roman Urdu.
- IF USER SPEAKS URDU SCRIPT (اردو): Respond in Urdu script.
- Always mirror the exact language and tone of the client.

CONVERSATION & CONSULTATION STYLE:
1. BE CONVERSATIONAL, SMART & HELPFUL:
   - When a client asks to build something (e.g. an E-Commerce store, SaaS, real estate app, or custom web app), engage with their idea intelligently! Ask 1 helpful clarifying question (e.g. what products they plan to sell, what core features/dashboard they need, or their preferred design style).
   - Answer their questions directly, clearly, and thoughtfully (e.g., explaining technical stack, vision, process, or project approach).
2. NO ROBOTIC CANNED REPETITION:
   - NEVER repeat generic sentences like "Bohat shukriya details receive ho chuki hain forward to whatsapp par click karein" on normal questions.
   - Do NOT force WhatsApp or forward links in casual conversations.
   - ONLY suggest connecting via WhatsApp or booking a discovery call when the client specifically asks to connect, asks for a direct quote/meeting, or provides their phone/email contact details.
3. PRICING & COST QUESTIONS:
   - NEVER write dollar numbers ($) or fixed figures.
   - Explain politely that every project is custom and tailored to their specific features, integrations, and project scope.
4. RESPONSE LENGTH & TONE:
   - Keep responses concise (2 to 3 sentences, around 25-50 words), natural, and engaging.
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
      "gemini-3.5-flash-lite",
      "gemini-3-flash-preview",
      "gemini-3.1-flash-lite",
      "gemini-3.7-flash",
      "gemini-flash-lite-latest",
      "gemini-3.5-flash",
    ];

    let reply = "";

    for (const model of activeModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);

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
                maxOutputTokens: 500,
                topP: 0.9,
              },
            }),
          }
        );

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            reply = data.candidates[0].content.parts[0].text.trim();
            break;
          }
        }
      } catch (err) {
        // Try next model seamlessly
      }
    }

    if (!reply) {
      // High-Intelligence Contextual Fallback Engine
      const lastUserMsg = (messages[messages.length - 1]?.content || "").toLowerCase().trim();
      
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
        lastUserMsg.includes("hi ") ||
        lastUserMsg === "hi" ||
        lastUserMsg.includes("what is") ||
        lastUserMsg.includes("tell me") ||
        lastUserMsg.includes("how much")
      ) && !lastUserMsg.includes("hai") && !lastUserMsg.includes("karna") && !lastUserMsg.includes("karein") && !lastUserMsg.includes("mujhe") && !lastUserMsg.includes("aap") && !lastUserMsg.includes("salam");

      const hasContact = lastUserMsg.includes("@") || /(03\d{9}|\+92\d{10}|\b\d{10,12}\b)/.test(lastUserMsg);

      if (isEnglish) {
        if (hasContact) {
          reply = "Thank you for sharing your contact details! The AJ Code Team will reach out to you shortly to discuss your project in detail.";
        } else if (lastUserMsg.includes("ecommerce") || lastUserMsg.includes("e-commerce") || lastUserMsg.includes("shop") || lastUserMsg.includes("store")) {
          reply = "We build high-converting E-Commerce platforms with Next.js 16, Stripe payment processing, and ultra-fast product catalogues. What kind of products are you planning to sell?";
        } else if (lastUserMsg.includes("saas") || lastUserMsg.includes("software") || lastUserMsg.includes("dashboard") || lastUserMsg.includes("web app") || lastUserMsg.includes("platform")) {
          reply = "Developing scalable SaaS platforms and custom web applications is our core strength. What are the key features and user roles you have in mind for your platform?";
        } else if (lastUserMsg.includes("team") || lastUserMsg.includes("about") || lastUserMsg.includes("company") || lastUserMsg.includes("who are you")) {
          reply = "AJ Code Team is an elite full-stack engineering team with over 3,000+ satisfied clients worldwide, specializing in Next.js 16, React 19, and full-stack cloud solutions.";
        } else if (lastUserMsg.includes("tech") || lastUserMsg.includes("stack") || lastUserMsg.includes("technology") || lastUserMsg.includes("framework")) {
          reply = "We leverage Next.js 16, React 19, TypeScript, Node.js, PostgreSQL, MongoDB, and Tailwind CSS to guarantee sub-second load times and 95+ SEO performance.";
        } else if (lastUserMsg.includes("cost") || lastUserMsg.includes("price") || lastUserMsg.includes("pricing") || lastUserMsg.includes("quote") || lastUserMsg.includes("budget") || lastUserMsg.includes("how much")) {
          reply = "Project investment is tailored depending on your required features, complexity, and timeline. Tell us a bit about your project goals and we will be happy to guide you!";
        } else if (lastUserMsg.includes("vision") || lastUserMsg.includes("goal")) {
          reply = "Our vision is transforming ideas into high-performing, revenue-generating digital products. What kind of project are you looking to launch?";
        } else if (lastUserMsg.includes("schedule") || lastUserMsg.includes("consultation") || lastUserMsg.includes("call") || lastUserMsg.includes("meeting") || lastUserMsg.includes("book")) {
          reply = "We would love to set up a 1-on-1 discovery consultation for your project! You can connect with us directly or share your requirements here.";
        } else if (lastUserMsg.includes("hello") || lastUserMsg.includes("hi") || lastUserMsg.includes("hey")) {
          reply = "Hello! Welcome to AJ Code Studio. How can we help bring your web project or software vision to life today?";
        } else {
          reply = "That sounds exciting! Could you share a few more details about the specific features or design requirements you envision for your project?";
        }
      } else {
        // Roman Urdu / Urdu
        if (hasContact) {
          reply = "Bohat shukriya! Aapki contact details receive ho chuki hain. AJ Code Team jald aapse rabta karegi.";
        } else if (lastUserMsg.includes("ecommerce") || lastUserMsg.includes("e-commerce") || lastUserMsg.includes("store") || lastUserMsg.includes("dukan") || lastUserMsg.includes("shop")) {
          reply = "E-Commerce stores mein AJ Code Team Next.js 16, payment gateway (Stripe/Bank transfer) aur high-speed product filters integrate karti hai. Aap kis type ke products sell karna chahte hain?";
        } else if (lastUserMsg.includes("saas") || lastUserMsg.includes("web app") || lastUserMsg.includes("custom app") || lastUserMsg.includes("system") || lastUserMsg.includes("portal")) {
          reply = "Zabardast! Hum Next.js 16 aur cloud databases par custom SaaS platforms aur web applications banate hain. Aapke project ke main user features aur requirements kya hain?";
        } else if (lastUserMsg.includes("team") || lastUserMsg.includes("about") || lastUserMsg.includes("kaun") || lastUserMsg.includes("kon ho") || lastUserMsg.includes("kya karte")) {
          reply = "AJ Code Team ek premier full-stack engineering team hai jo 3,000+ global clients ke liye high-performance Next.js 16 web applications aur SaaS platforms develop karti hai.";
        } else if (lastUserMsg.includes("tech") || lastUserMsg.includes("stack") || lastUserMsg.includes("languages") || lastUserMsg.includes("tool")) {
          reply = "Hum modern tech stack use karte hain: Next.js 16, React 19, TypeScript, Node.js, Express, MongoDB, aur PostgreSQL, jo ultra-fast speed aur 95+ SEO performance dete hain.";
        } else if (lastUserMsg.includes("cost") || lastUserMsg.includes("price") || lastUserMsg.includes("kitna") || lastUserMsg.includes("paisa") || lastUserMsg.includes("rate") || lastUserMsg.includes("budget") || lastUserMsg.includes("kharcha")) {
          reply = "Har project ki cost uske scope, design complexity aur features par depend karti hai. Aap apne project ki thori details share karein taake hum behtareen estimation de sakein.";
        } else if (lastUserMsg.includes("vision") || lastUserMsg.includes("vission")) {
          reply = "Humara vision aapke ideas ko ek lightning-fast aur high-converting digital product mein convert karna hai. Aap kis category ka project banana chahte hain?";
        } else if (lastUserMsg.includes("consultation") || lastUserMsg.includes("schedule") || lastUserMsg.includes("meeting") || lastUserMsg.includes("call") || lastUserMsg.includes("rabta")) {
          reply = "Zaroor! Hum aapke project ke liye 1-on-1 discovery consultation arrange karenge. Aap yahan details discuss kar sakte hain ya direct WhatsApp par connect kar sakte hain.";
        } else if (lastUserMsg.includes("salam") || lastUserMsg.includes("hello") || lastUserMsg.includes("hi") || lastUserMsg.includes("kese ho") || lastUserMsg.includes("kaise ho")) {
          reply = "Walaikum Assalam! AJ Code Studio mein khush aamdeed. Aap apne project ya web development ke baray mein kya maloomat hasil karna chahte hain?";
        } else {
          reply = "Zabardast! Aap thori mazeed details share karein ke aapko is project mein konse specific features ya design chahiye?";
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

