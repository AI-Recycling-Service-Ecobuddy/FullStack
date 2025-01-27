import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Prompt를 추가적으로 강화하는 부분 (필요 시 변경)
    const enhancedPrompt =
      "This is an intelligent AI chatbot designed to answer caregivers' questions about patients in nursing homes. The chatbot provides smart responses in Korean to questions about patients' symptoms, medications, and illnesses. Do not use ** or any other MDX syntax.";

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
