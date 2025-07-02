import { generateMockCompetitors } from '@/services/mockData/competitorsData'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Import for cache invalidation
let invalidateAdCache = null
export const setAdCacheInvalidator = (invalidator) => {
  invalidateAdCache = invalidator
}
let cachedCompetitors = null

export const getCompetitors = async () => {
  await delay(300)
  
  if (!cachedCompetitors) {
    cachedCompetitors = await generateMockCompetitors()
  }
  
  return [...cachedCompetitors]
}

export const getCompetitorById = async (id) => {
  await delay(200)
  
  const competitors = await getCompetitors()
  const competitor = competitors.find(c => c.Id === parseInt(id))
  
  if (!competitor) {
    throw new Error('Competitor not found')
  }
  
  return { ...competitor }
}

export const createCompetitor = async (competitorData) => {
  await delay(400)
  
  const competitors = await getCompetitors()
  
  // Find the highest existing Id and add 1
  const maxId = Math.max(...competitors.map(c => c.Id), 0)
  const newCompetitor = {
    Id: maxId + 1,
    ...competitorData,
    addedDate: new Date().toISOString()
}
  
  cachedCompetitors.push(newCompetitor)
  
  // Invalidate ad cache to regenerate ads with new competitor
  if (invalidateAdCache) {
    invalidateAdCache()
  }
  
  return { ...newCompetitor }
}

export const updateCompetitor = async (id, updates) => {
  await delay(350)
  
  const competitors = await getCompetitors()
  const index = competitors.findIndex(c => c.Id === parseInt(id))
  
  if (index === -1) {
    throw new Error('Competitor not found')
  }
  
  const updatedCompetitor = {
    ...competitors[index],
    ...updates,
    Id: parseInt(id) // Ensure Id remains integer
}
  
  cachedCompetitors[index] = updatedCompetitor
  
  // Invalidate ad cache to refresh ads with updated competitor info
  if (invalidateAdCache) {
    invalidateAdCache()
  }
  
  return { ...updatedCompetitor }
}

export const deleteCompetitor = async (id) => {
  await delay(250)
  
  const competitors = await getCompetitors()
  const index = competitors.findIndex(c => c.Id === parseInt(id))
  
  if (index === -1) {
    throw new Error('Competitor not found')
  }
cachedCompetitors.splice(index, 1)
  
  // Invalidate ad cache to remove ads for deleted competitor
  if (invalidateAdCache) {
    invalidateAdCache()
  }
  
  return { success: true }
}