// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let cachedSettings = {
  enabled: true,
  frequency: 'daily',
  includeScreenshots: true,
  platforms: ['Facebook', 'Google', 'LinkedIn'],
  emailAddress: 'user@example.com',
  sendTime: '09:00'
}

export const getEmailSettings = async () => {
  await delay(200)
  
  return { ...cachedSettings }
}

export const updateEmailSettings = async (settings) => {
  await delay(300)
  
  cachedSettings = {
    ...cachedSettings,
    ...settings
  }
  
  return { ...cachedSettings }
}

export const sendTestEmail = async (emailAddress) => {
  await delay(500)
  
  // Simulate sending test email
  return {
    success: true,
    message: 'Test email sent successfully'
  }
}