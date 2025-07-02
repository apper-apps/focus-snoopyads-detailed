import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import AdsList from '@/components/organisms/AdsList'
import PlatformFilter from '@/components/molecules/PlatformFilter'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getAds } from '@/services/api/adService'
import { getCompetitors } from '@/services/api/competitorService'
import { toast } from 'react-toastify'

const AdsLibrary = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [ads, setAds] = useState([])
  const [competitors, setCompetitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  
  // Filters
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [selectedCompetitor, setSelectedCompetitor] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'competitor', label: 'By Competitor' },
    { value: 'platform', label: 'By Platform' }
  ]

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [adsData, competitorsData] = await Promise.all([
        getAds(),
        getCompetitors()
      ])
      setAds(adsData)
      setCompetitors(competitorsData)
    } catch (err) {
      setError('Failed to load ads library')
      toast.error('Failed to load ads library')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Handle URL params
  useEffect(() => {
    const search = searchParams.get('search')
    const competitor = searchParams.get('competitor')
    
    if (search) {
      setSearchQuery(search)
    }
    
    if (competitor) {
      setSelectedCompetitor(competitor)
    }
  }, [searchParams])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query) {
      setSearchParams({ search: query })
    } else {
      setSearchParams({})
    }
  }

  const handleViewDetails = (ad) => {
    toast.info(`Viewing details for ad: ${ad.creative?.headline || 'Untitled Ad'}`)
  }

  const clearFilters = () => {
    setSelectedPlatforms([])
    setSelectedCompetitor('')
    setSearchQuery('')
    setSortBy('newest')
    setSearchParams({})
  }

  // Filter and sort ads
  const filteredAds = ads.filter(ad => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!ad.copy?.toLowerCase().includes(query) && 
          !ad.creative?.headline?.toLowerCase().includes(query) &&
          !ad.competitorName?.toLowerCase().includes(query)) {
        return false
      }
    }
    
    // Platform filter
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(ad.platform.toLowerCase())) {
      return false
    }
    
    // Competitor filter
    if (selectedCompetitor && ad.competitorName !== selectedCompetitor) {
      return false
    }
    
    return true
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.lastSeen) - new Date(a.lastSeen)
      case 'oldest':
        return new Date(a.lastSeen) - new Date(b.lastSeen)
      case 'competitor':
        return a.competitorName.localeCompare(b.competitorName)
      case 'platform':
        return a.platform.localeCompare(b.platform)
      default:
        return 0
    }
  })

  const activeFiltersCount = [
    selectedPlatforms.length > 0,
    selectedCompetitor,
    searchQuery
  ].filter(Boolean).length

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Ads Library"
        subtitle={`Browse and analyze competitor ads (${filteredAds.length} ads found)`}
        onSearch={handleSearch}
        searchPlaceholder="Search ads, headlines, or competitors..."
      />
      
      <div className="flex-1 overflow-auto">
        {/* Filters */}
        <Card className="mx-6 mt-6 mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <PlatformFilter
                selectedPlatforms={selectedPlatforms}
                onPlatformChange={setSelectedPlatforms}
                className="flex-shrink-0"
              />
              
              <Select
                label=""
                value={selectedCompetitor}
                onChange={(e) => setSelectedCompetitor(e.target.value)}
                options={[
                  { value: '', label: 'All Competitors' },
                  ...competitors.map(c => ({ value: c.name, label: c.name }))
                ]}
                className="min-w-[200px]"
              />
              
              <Select
                label=""
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={sortOptions}
                className="min-w-[150px]"
              />
            </div>
            
            <div className="flex items-center gap-3">
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                </div>
              )}
              
              <div className="flex items-center bg-secondary rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <ApperIcon name="Grid3X3" size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <ApperIcon name="List" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Ads List */}
        <div className="px-6 pb-6">
          {error ? (
            <Error message={error} onRetry={loadData} />
          ) : (
            <AdsList
              ads={filteredAds}
              loading={loading}
              onViewDetails={handleViewDetails}
              viewMode={viewMode}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AdsLibrary