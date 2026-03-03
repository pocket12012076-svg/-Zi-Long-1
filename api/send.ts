import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, email, name, category, scenario } = req.body;

  try {
    let subject = '';
    let html = '';

    if (type === 'contact') {
      subject = `[官網聯絡] 來自 ${name} 的訊息 - ${category}`;
      html = `
        <h2>新的聯絡表單提交</h2>
        <p><strong>姓名:</strong> ${name}</p>
        <p><strong>電子信箱:</strong> ${email}</p>
        <p><strong>分類:</strong> ${category}</p>
        <p><strong>內容描述:</strong></p>
        <p>${scenario}</p>
      `;
    } else if (type === 'subscribe') {
      subject = `[官網訂閱] 新的訂閱者: ${email}`;
      html = `
        <h2>新的電子報訂閱</h2>
        <p><strong>電子信箱:</strong> ${email}</p>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: 'Zi Long Official <onboarding@resend.dev>',
      to: ['pocket12012076@gmail.com'],
      subject: subject,
      html: html,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ message: 'Success', data });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
