import React from "react";
import AdCard from "@/components/molecules/AdCard";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
const AdsList = ({ 
  ads, 
  loading, 
  onViewDetails,
  viewMode = 'grid' 
}) => {
  if (loading) {
    return <Loading type="ads" />
  }

  if (!ads || ads.length === 0) {
    return (
      <Empty
        type="ads"
        title="No Ads Found"
        message="No ads match your current filters. Try adjusting your search criteria or platform filters."
      />
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {ads.map((ad) => (
          <div key={ad.Id} className="bg-surface rounded-lg p-4 border border-slate-600">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-slate-700 rounded-lg flex-shrink-0">
                {ad.creative?.image ? (
                  <img 
                    src={ad.creative.image} 
                    alt="Ad"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ApperIcon name="Image" size={24} className="text-slate-400" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-200 truncate">
                    {ad.creative?.headline || 'Ad Creative'}
                  </h3>
                  <Badge variant={ad.platform.toLowerCase()}>
                    {ad.platform}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm line-clamp-2 mb-2">
                  {ad.copy}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{ad.competitorName}</span>
                  <span>{new Date(ad.lastSeen).toLocaleDateString()}</span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(ad)}
              >
                <ApperIcon name="Eye" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <AdCard
          key={ad.Id}
          ad={ad}
          onViewDetails={onViewDetails}
          isNew={ad.isNew}
        />
      ))}
    </div>
  )
}

export default AdsList