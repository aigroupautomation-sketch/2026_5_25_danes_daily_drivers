import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Forward to n8n/Make.com webhook
    const webhookUrl = process.env.PREQUAL_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'prequal_form',
          timestamp: new Date().toISOString(),
          ...data,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Prequal submit error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
