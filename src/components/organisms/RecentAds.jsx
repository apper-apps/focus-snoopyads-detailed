import React from 'react'
import Card from '@/components/atoms/Card'
import AdCard from '@/components/molecules/AdCard'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'

const RecentAds = ({ ads, loading, onViewAll, onViewDetails }) => {
  if (loading) {
    return (
      <Card>
        <div className="shimmer h-6 w-28 rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex space-x-4 p-4 bg-secondary rounded-lg">
              <div className="shimmer h-16 w-16 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="shimmer h-4 w-3/4 rounded"></div>
                <div className="shimmer h-3 w-1/2 rounded"></div>
                <div className="shimmer h-3 w-1/4 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (!ads || ads.length === 0) {
    return (
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Ads</h3>
        </div>
        <Empty
          type="ads"
          title="No Recent Ads"
          message="No new competitor ads have been detected in the last 24 hours. Check back later for updates."
        />
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Ads</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="flex items-center space-x-2"
        >
          <span>View All</span>
          <ApperIcon name="ArrowRight" size={16} />
        </Button>
      </div>

      <div className="space-y-4">
        {ads.slice(0, 5).map((ad) => (
          <div key={ad.Id} className="flex items-center space-x-4 p-4 bg-secondary rounded-lg hover:bg-slate-600 transition-colors cursor-pointer"
               onClick={() => onViewDetails(ad)}>
            <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
              {ad.creative?.image ? (
                <img 
                  src={ad.creative.image} 
                  alt="Ad"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <ApperIcon name="Image" size={24} className="text-slate-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-slate-200 truncate">
                {ad.creative?.headline || 'Ad Creative'}
              </h4>
              <p className="text-sm text-slate-400 truncate">
                {ad.competitorName} • {ad.platform}
              </p>
              <p className="text-xs text-slate-500">
                {ad.copy?.substring(0, 60)}...
              </p>
            </div>
            
            <div className="text-xs text-slate-500 text-right">
              <div>{new Date(ad.lastSeen).toLocaleDateString()}</div>
              {ad.isNew && (
                <div className="text-success font-medium">NEW</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RecentAds