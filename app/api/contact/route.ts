import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact_form',
          timestamp: new Date().toISOString(),
          ...data,
        }),
      })
      console.log('n8n webhook response status:', response.status)
      try {
        const text = await response.text()
        console.log('n8n webhook response text:', text)
      } catch (err) {
        console.log('Could not read n8n response body')
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
