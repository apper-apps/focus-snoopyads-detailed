import { generateMockAds } from '@/services/mockData/adsData'
import { getCompetitors } from '@/services/api/competitorService'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let cachedAds = null

export const getAds = async () => {
  await delay(400)
  
  if (!cachedAds) {
    cachedAds = await generateMockAds()
  }
  
  // Get competitors to add names to ads
  const competitors = await getCompetitors()
  
  const adsWithCompetitorNames = cachedAds.map(ad => {
    const competitor = competitors.find(c => c.Id === ad.competitorId) || competitors[0]
    return {
      ...ad,
      competitorName: competitor ? competitor.name : 'Unknown Competitor'
    }
  })
  
  return adsWithCompetitorNames
}

export const getAdById = async (id) => {
  await delay(200)
  
  const ads = await getAds()
  const ad = ads.find(a => a.Id === parseInt(id))
  
  if (!ad) {
    throw new Error('Ad not found')
  }
  
  return { ...ad }
}

export const getAdsByCompetitor = async (competitorId) => {
  await delay(300)
  
  const ads = await getAds()
  return ads.filter(ad => ad.competitorId === parseInt(competitorId))
}

export const getAdsByPlatform = async (platform) => {
  await delay(250)
  
  const ads = await getAds()
  return ads.filter(ad => ad.platform.toLowerCase() === platform.toLowerCase())
}

export const searchAds = async (query) => {
  await delay(350)
  
  const ads = await getAds()
  const searchQuery = query.toLowerCase()
  
  return ads.filter(ad => 
    ad.copy?.toLowerCase().includes(searchQuery) ||
    ad.creative?.headline?.toLowerCase().includes(searchQuery) ||
    ad.competitorName?.toLowerCase().includes(searchQuery)
  )
}