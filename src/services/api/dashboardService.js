import { generateMockAds } from '@/services/mockData/adsData'
import { generateMockCompetitors } from '@/services/mockData/competitorsData'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getDashboardStats = async () => {
  await delay(300)
  
  // Generate some dynamic stats
  const totalAds = 1247 + Math.floor(Math.random() * 100)
  const newAdsToday = 12 + Math.floor(Math.random() * 8)
  const activeCompetitors = 7
  const platformCoverage = 100
  
  return {
    totalAds,
    activeCompetitors,
    newAdsToday,
    platformCoverage
  }
}

export const getRecentAds = async () => {
  await delay(250)
  
  const mockAds = await generateMockAds()
  const mockCompetitors = await generateMockCompetitors()
  
  // Add competitor names to ads and mark some as new
  const recentAds = mockAds.slice(0, 8).map((ad, index) => {
    const competitor = mockCompetitors.find(c => c.Id === ad.competitorId) || mockCompetitors[0]
    return {
      ...ad,
      competitorName: competitor.name,
      isNew: index < 3 // Mark first 3 as new
    }
  })
  
  return recentAds
}

export const getActivityData = async () => {
  await delay(200)
  
  // Generate mock chart data for the last 7 days
  const dates = []
  const facebook = []
  const google = []
  const linkedin = []
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    
    facebook.push(15 + Math.floor(Math.random() * 25))
    google.push(10 + Math.floor(Math.random() * 20))
    linkedin.push(5 + Math.floor(Math.random() * 15))
  }
  
  return {
    dates,
    facebook,
    google,
    linkedin
  }
}