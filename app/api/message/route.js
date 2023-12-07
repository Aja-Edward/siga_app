import { transporter, mailOptions } from '@app/config/nodemailer'

export const GET = async (req, res) => {
  return new Response('Hi, my name is Aja Edward')
}

const CONTACT_MESSAGE_FIELD = {
  email: 'Email',
  name: 'Name',
  subject: 'Service',
  date: 'Date',
  time: 'Time',
  description: 'Description',
}

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce((str, [key, val]) => {
    if (typeof val === 'object' && key in CONTACT_MESSAGE_FIELD) {
      const subData = Object.entries(val).map(([subKey, subVal]) => {
        if (subKey in CONTACT_MESSAGE_FIELD[key]) {
          return `${CONTACT_MESSAGE_FIELD[key][subKey]}: ${subVal}`
        }
        return ''
      })
      str += subData.join('\n') + '\n'
    } else {
      str += `${CONTACT_MESSAGE_FIELD[key]}: ${val}\n`
    }
    return str
  }, '')

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    const label = CONTACT_MESSAGE_FIELD[key]
    let valueContent = val

    if (typeof val === 'object') {
      // Handle nested objects (e.g., keyboards, vocals, etc.)
      const subData = Object.entries(val).map(([subKey, subVal]) => {
        if (subVal) {
          const subLabel = CONTACT_MESSAGE_FIELD[key][subKey]
          return `<div>${subLabel}: ${subVal}</div>`
        }
        return ''
      })
      valueContent = subData.join('')
    }

    return (str += `<div style="display: flex; justify-content: space-between; align-items: center;">
    <h1 style="font-family: Helvetica Neue, Arial, sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 16px; margin: 0; padding: 0; color: #333; width: 30%;">${label}:</h1>
    <div style="font-family: Helvetica Neue, Arial, sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0; padding: 0; color: #333; width: 70%;">${valueContent}</div>
  </div>`)
  }, '')

  return {
    text: stringData,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Email Subject</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #ccc; margin: 0; padding: 0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td style="padding: 20px 0">
        <table align="center" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); margin: 0 auto;">
          <tr>
            <td style="padding: 10px; text-align: center; background-color: #6dcee8;">
              <img src="https://asset.cloudinary.com/dkipl0qor/108c3c9a2f44304ec1e0934c6fd35a1f" alt="sigalogo"/>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center;"></td>
          </tr>
          <tr>
            <td style="padding: 20px">
              <h2>New Contact Message</h2>
              <div style="font-size: 18px; color: #555; text-align: left; background-image: url('https://asset.cloudinary.com/dkipl0qor/700fc86c928352d5044026187701f6fb')">
                ${htmlData}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 5px; text-align: center; background-color: #6dcee8;">
              <p style="font-size: 14px; color: #777; text-align: center;">
                If you have any questions, contact us at
                <a href="mailto:your@email.com" style="color: #0077cc; text-decoration: none;">
                  your@email.com
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  }
}

export const POST = async (req) => {
  if (req.method === 'POST') {
    const body = await req.json()
    if (!body.name || !body.email || !body.subject) {
      return new Response('Bad Request', { status: 400 })
    }
    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(body),
        subject: body.subject,
      })
      console.log('This is the body', body)
      return new Response({ success: true }, { status: 200 })
    } catch (error) {
      console.log(error)
      return new Response({ message: error.message }, { status: 400 })
    }
  }
}
