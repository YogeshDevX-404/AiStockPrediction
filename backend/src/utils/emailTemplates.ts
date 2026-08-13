export const getVerificationEmailTemplate = (name: string, verifyUrl: string): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050816; color: #ffffff; margin: 0; padding: 40px 20px; }
      .card { max-width: 560px; margin: 0 auto; background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 40px; text-align: center; }
      .logo { font-size: 24px; font-weight: 800; color: #10b981; margin-bottom: 20px; }
      h1 { font-size: 22px; margin-bottom: 12px; }
      p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 28px; }
      .btn { display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 14px; font-weight: bold; font-size: 14px; }
      .footer { margin-top: 32px; font-size: 11px; color: #64748b; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="logo">TradeGenius AI</div>
      <h1>Verify Your Email Address</h1>
      <p>Hi ${name}, welcome to TradeGenius AI! Please confirm your email address to activate your autonomous stock intelligence account.</p>
      <a href="${verifyUrl}" class="btn">Verify Email Address</a>
      <div class="footer">If you did not request this email, you can safely ignore it.</div>
    </div>
  </body>
  </html>
  `;
};

export const getResetPasswordEmailTemplate = (name: string, resetUrl: string): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050816; color: #ffffff; margin: 0; padding: 40px 20px; }
      .card { max-width: 560px; margin: 0 auto; background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 40px; text-align: center; }
      .logo { font-size: 24px; font-weight: 800; color: #8b5cf6; margin-bottom: 20px; }
      h1 { font-size: 22px; margin-bottom: 12px; }
      p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 28px; }
      .btn { display: inline-block; background-color: #8b5cf6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 14px; font-weight: bold; font-size: 14px; }
      .footer { margin-top: 32px; font-size: 11px; color: #64748b; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="logo">TradeGenius AI</div>
      <h1>Reset Your Password</h1>
      <p>Hi ${name}, we received a request to reset your TradeGenius AI account password. Click the button below to choose a new password.</p>
      <a href="${resetUrl}" class="btn">Reset Password</a>
      <div class="footer">This password reset link expires in 1 hour. If you didn't request this, your account is secure.</div>
    </div>
  </body>
  </html>
  `;
};

export const getWelcomeEmailTemplate = (name: string): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050816; color: #ffffff; margin: 0; padding: 40px 20px; }
      .card { max-width: 560px; margin: 0 auto; background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 40px; text-align: center; }
      .logo { font-size: 24px; font-weight: 800; color: #3b82f6; margin-bottom: 20px; }
      h1 { font-size: 22px; margin-bottom: 12px; }
      p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 28px; }
      .btn { display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 14px; font-weight: bold; font-size: 14px; }
      .footer { margin-top: 32px; font-size: 11px; color: #64748b; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="logo">TradeGenius AI</div>
      <h1>Welcome to TradeGenius AI!</h1>
      <p>Hi ${name}, your email has been verified. You now have full access to institutional-grade AI signals, live stock tracking, and computer vision chart analysis.</p>
      <a href="http://localhost:3000/dashboard" class="btn">Launch Dashboard</a>
      <div class="footer">TradeGenius AI Team</div>
    </div>
  </body>
  </html>
  `;
};
