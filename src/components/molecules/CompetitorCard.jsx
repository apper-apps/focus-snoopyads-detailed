import React from 'react'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { format } from 'date-fns'

const CompetitorCard = ({ 
  competitor, 
  onEdit, 
  onDelete,
  onViewAds,
  className = ''
}) => {
  const getPlatformCount = () => {
    return competitor.platforms?.length || 0
  }

  const getRecentActivity = () => {
    // Mock recent activity - in real app this would come from API
    return Math.floor(Math.random() * 15) + 1
  }

  return (
    <Card className={`${className}`} hover>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Company Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {competitor.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">
              {competitor.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>{competitor.industry}</span>
              <span>•</span>
              <span>Added {format(new Date(competitor.addedDate), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Actions and Stats */}
        <div className="flex items-center space-x-4">
          {/* Platform Badges */}
          <div className="flex space-x-1">
            {competitor.platforms?.map((platform) => (
              <Badge 
                key={platform} 
                variant={platform.toLowerCase()}
                size="xs"
              >
                {platform}
              </Badge>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="text-right">
            <div className="text-sm font-medium text-slate-200">
              {getRecentActivity()} ads
            </div>
            <div className="text-xs text-slate-400">
              this week
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewAds(competitor)}
              className="flex items-center space-x-1"
            >
              <ApperIcon name="Eye" size={14} />
              <span>View Ads</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(competitor)}
            >
              <ApperIcon name="Edit" size={14} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(competitor)}
              className="text-error hover:text-error"
            >
              <ApperIcon name="Trash2" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CompetitorCard