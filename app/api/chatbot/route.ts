import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 },
      );
    }

    const enhancedPrompt = `
      You are an intelligent AI assistant specialized in answering questions about recycling. 
      You provide expert advice in Korean regarding recycling methods, types of recyclable materials, 
      proper disposal procedures, and sustainability tips. 
      Ensure your responses are informative and aligned with eco-friendly practices. 
      
      Question: ${prompt}
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4', //
        messages: [{ role: 'system', content: enhancedPrompt }],
        max_tokens: 500, // 응답 최대 길이 설정
        temperature: 0.7, // 창의성 조절
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const result = await response.json();
    const responseText =
      result.choices?.[0]?.message?.content || '응답을 생성할 수 없습니다.';

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
