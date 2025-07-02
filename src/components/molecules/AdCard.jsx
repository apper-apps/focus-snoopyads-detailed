import React from 'react'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { format } from 'date-fns'

const AdCard = ({ 
  ad, 
  onViewDetails,
  isNew = false,
  className = ''
}) => {
  const getPlatformBadgeVariant = (platform) => {
    const platformMap = {
      'Facebook': 'facebook',
      'Google': 'google',
      'LinkedIn': 'linkedin'
    }
    return platformMap[platform] || 'default'
  }

  return (
    <Card 
      className={`
        ${className} 
        ${isNew ? 'new-ad-glow' : ''}
        transition-all duration-200
      `}
      hover
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <Badge variant={getPlatformBadgeVariant(ad.platform)}>
            {ad.platform}
          </Badge>
          {isNew && (
            <Badge variant="success" size="xs">
              NEW
            </Badge>
          )}
        </div>

        {/* Ad Creative */}
        <div className="mb-4">
          {ad.creative?.image ? (
            <img 
              src={ad.creative.image} 
              alt="Ad creative"
              className="w-full h-32 object-cover rounded-lg bg-secondary"
            />
          ) : (
            <div className="w-full h-32 bg-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Image" size={32} className="text-slate-500" />
            </div>
          )}
        </div>

        {/* Ad Content */}
        <div className="flex-1 mb-4">
          <h3 className="font-semibold text-slate-200 mb-2 line-clamp-2">
            {ad.creative?.headline || 'Ad Creative'}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-3 mb-3">
            {ad.copy || 'No ad copy available'}
          </p>
          <p className="text-xs text-slate-500">
            Competitor: {ad.competitorName}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-600">
          <div className="text-xs text-slate-500">
            {format(new Date(ad.lastSeen), 'MMM d, yyyy')}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(ad)}
            className="flex items-center space-x-1"
          >
            <ApperIcon name="Eye" size={14} />
            <span>View</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default AdCard