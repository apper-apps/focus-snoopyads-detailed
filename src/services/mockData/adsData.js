export const generateMockAds = async () => {
  const platforms = ['Facebook', 'Google', 'LinkedIn']
  const competitorIds = [1, 2, 3, 4, 5, 6, 7]
  
  const headlines = [
    "Transform Your Business with AI-Powered Solutions",
    "Boost Productivity by 300% - See How",
    "The Ultimate Guide to Digital Transformation",
    "Revolutionary Cloud Technology - Try Free",
    "Secure Your Data with Enterprise-Grade Protection",
    "Automate Your Workflow in Minutes",
    "Join 10,000+ Companies Already Using Our Platform",
    "Cut Costs While Scaling Your Operations",
    "Experience the Future of Business Intelligence",
    "Streamline Operations with Advanced Analytics",
    "Protect Your Business from Cyber Threats",
    "Unlock Hidden Revenue Opportunities",
    "Scale Your Team Without the Overhead",
    "Real-Time Insights for Better Decisions",
    "Enterprise Security Made Simple",
    "Connect All Your Business Tools in One Place",
    "Stop Losing Money on Manual Processes",
    "The Smart Way to Manage Your Finances",
    "Build Better Customer Relationships",
    "Turn Data Into Actionable Intelligence"
  ]
  
  const adCopies = [
    "Discover how industry leaders are leveraging cutting-edge technology to stay ahead of the competition. Our comprehensive platform integrates seamlessly with your existing workflow, delivering results from day one.",
    "Don't let outdated processes hold your business back. Our innovative solution has helped thousands of companies streamline operations and boost efficiency. Start your free trial today.",
    "Join the digital revolution and transform how your team works. With advanced automation and intelligent insights, you'll wonder how you ever managed without us.",
    "Security breaches cost businesses millions every year. Protect your company with our enterprise-grade solution trusted by Fortune 500 companies worldwide.",
    "Stop wasting time on repetitive tasks. Our AI-powered automation handles the heavy lifting while you focus on growing your business. See the difference in just 30 days.",
    "Data is your most valuable asset. Learn how to harness its power with our advanced analytics platform that turns complex information into clear, actionable insights.",
    "Your competitors are already using next-generation tools. Don't get left behind. Our platform gives you the competitive edge you need to dominate your market.",
    "Tired of juggling multiple software solutions? Our all-in-one platform brings everything together, saving you time, money, and frustration.",
    "Remote work doesn't have to mean reduced productivity. Our collaboration tools keep teams connected and projects on track, no matter where they're working.",
    "Every minute counts in today's fast-paced business environment. Our solution helps you make critical decisions faster with real-time data and predictive analytics."
  ]
  
  const mockAds = []
  
  for (let i = 1; i <= 50; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)]
    const competitorId = competitorIds[Math.floor(Math.random() * competitorIds.length)]
    const headline = headlines[Math.floor(Math.random() * headlines.length)]
    const copy = adCopies[Math.floor(Math.random() * adCopies.length)]
    
    // Generate random dates within the last 30 days
    const daysAgo = Math.floor(Math.random() * 30)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysAgo)
    
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 14) + 1)
    
    const lastSeen = new Date()
    lastSeen.setDate(lastSeen.getDate() - Math.floor(Math.random() * daysAgo))
    
    mockAds.push({
      Id: i,
      competitorId: competitorId,
      platform: platform,
      creative: {
        headline: headline,
        image: `https://picsum.photos/400/300?random=${i}`,
        callToAction: ["Learn More", "Get Started", "Try Free", "Sign Up", "Download"][Math.floor(Math.random() * 5)]
      },
      copy: copy,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      lastSeen: lastSeen.toISOString(),
      metadata: {
        adType: ["image", "video", "carousel"][Math.floor(Math.random() * 3)],
        placement: ["feed", "sidebar", "story"][Math.floor(Math.random() * 3)],
        objective: ["awareness", "traffic", "conversion", "engagement"][Math.floor(Math.random() * 4)],
        estimatedBudget: `$${(Math.random() * 10000 + 1000).toFixed(0)}`
      },
      isNew: Math.random() < 0.1 // 10% chance of being marked as new
    })
  }
  
  // Sort by last seen date (newest first)
  return mockAds.sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen))
}