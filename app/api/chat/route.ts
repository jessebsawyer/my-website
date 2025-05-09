import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

import fs from 'fs/promises';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || !messages.length) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const bioPath = path.join(process.cwd(), 'data/bio.txt');
    const bio = await fs.readFile(bioPath, 'utf-8');

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are Jesse Sawyer's AI assistant. Only answer questions related to Jesse and his work. Use the following background info:

${bio}

Never answer unrelated questions. If the question isn’t about Jesse, politely say: "I'm only here to help you learn about Jesse and his work."`,
        },
        ...messages,
      ],
      temperature: 0.7,
    });

    const reply = chatCompletion.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('OpenAI error:', err?.response?.data || err.message || err);
    return NextResponse.json({
      reply: "I'm having trouble connecting to my brain right now 🤖. Please try again later.",
    });
  }
}
