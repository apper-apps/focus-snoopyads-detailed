import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import DashboardStats from '@/components/organisms/DashboardStats'
import ActivityChart from '@/components/organisms/ActivityChart'
import RecentAds from '@/components/organisms/RecentAds'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getDashboardStats, getRecentAds, getActivityData } from '@/services/api/dashboardService'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [recentAds, setRecentAds] = useState([])
  const [activityData, setActivityData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [statsData, adsData, chartData] = await Promise.all([
        getDashboardStats(),
        getRecentAds(),
        getActivityData()
      ])
      
      setStats(statsData)
      setRecentAds(adsData)
      setActivityData(chartData)
    } catch (err) {
      setError('Failed to load dashboard data')
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/ads-library?search=${encodeURIComponent(query)}`)
    }
  }

  const handleViewAllAds = () => {
    navigate('/ads-library')
  }

  const handleViewAdDetails = (ad) => {
    // In a real app, this would open a modal or navigate to ad details
    toast.info(`Viewing details for ad: ${ad.creative?.headline || 'Untitled Ad'}`)
  }

  if (loading) {
    return (
      <div className="p-6">
        <Loading type="dashboard" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadDashboardData} />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Dashboard"
        subtitle="Monitor competitor advertising activity across all platforms"
        onSearch={handleSearch}
        searchPlaceholder="Search ads, competitors, or campaigns..."
      />
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <DashboardStats stats={stats} loading={loading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart data={activityData} loading={loading} />
          <RecentAds 
            ads={recentAds} 
            loading={loading}
            onViewAll={handleViewAllAds}
            onViewDetails={handleViewAdDetails}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard