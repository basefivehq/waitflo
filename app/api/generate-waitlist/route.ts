import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()
  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 })
  }
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'DeepSeek API key not set.' }, { status: 500 })
  }
  try {
    const aiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-coder-v2',
        messages: [
          { role: 'system', content: 'You are an expert at generating structured waitlist landing page configurations as JSON. Output only the JSON config, no explanations.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1024,
        temperature: 0.2
      })
    })
    if (!aiRes.ok) {
      const err = await aiRes.text()
      return NextResponse.json({ error: 'AI API error: ' + err }, { status: 500 })
    }
    const data = await aiRes.json()
    const content = data.choices?.[0]?.message?.content || ''
    let config
    try {
      config = JSON.parse(content)
    } catch {
      return NextResponse.json({ error: 'AI did not return valid JSON.' }, { status: 500 })
    }
    return NextResponse.json({ config })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 })
  }
} 