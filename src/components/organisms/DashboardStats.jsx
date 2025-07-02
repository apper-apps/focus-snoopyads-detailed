import React from 'react'
import StatCard from '@/components/molecules/StatCard'

const DashboardStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface rounded-lg p-6 border border-slate-600">
            <div className="shimmer h-4 w-24 rounded mb-2"></div>
            <div className="shimmer h-8 w-16 rounded mb-1"></div>
            <div className="shimmer h-3 w-20 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Ads Tracked"
        value={stats.totalAds}
        change="+12% this week"
        changeType="positive"
        icon="Eye"
      />
      <StatCard
        title="Active Competitors"
        value={stats.activeCompetitors}
        change="7 of 10 slots"
        changeType="neutral"
        icon="Users"
      />
      <StatCard
        title="New Ads Today"
        value={stats.newAdsToday}
        change="+4 from yesterday"
        changeType="positive"
        icon="TrendingUp"
      />
      <StatCard
        title="Platform Coverage"
        value={`${stats.platformCoverage}%`}
        change="All platforms active"
        changeType="positive"
        icon="Globe"
      />
    </div>
  )
}

export default DashboardStats