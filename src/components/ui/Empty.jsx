import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  type = "general",
  onAction,
  actionLabel,
  title,
  message
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'competitors':
        return {
          icon: 'Users',
          title: title || 'No Competitors Added',
          message: message || "Start monitoring your competition by adding your first competitor. Track up to 10 competitors across Facebook, Google, and LinkedIn.",
          actionLabel: actionLabel || 'Add First Competitor',
          gradient: 'from-primary to-accent'
        }
      case 'ads':
        return {
          icon: 'Eye',
          title: title || 'No Ads Found',
          message: message || "No competitor ads have been detected yet. This could mean your competitors haven't run any new campaigns recently, or our monitoring system is still collecting data.",
          actionLabel: actionLabel || 'Refresh Search',
          gradient: 'from-info to-primary'
        }
      case 'search':
        return {
          icon: 'Search',
          title: title || 'No Results Found',
          message: message || "Your search didn't return any results. Try adjusting your search terms or filters to find what you're looking for.",
          actionLabel: actionLabel || 'Clear Filters',
          gradient: 'from-accent to-info'
        }
      default:
        return {
          icon: 'Inbox',
          title: title || 'Nothing Here Yet',
          message: message || "This section is empty. Start by taking some action to populate this area with data.",
          actionLabel: actionLabel || 'Get Started',
          gradient: 'from-primary to-accent'
        }
    }
  }

  const emptyContent = getEmptyContent()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className={`bg-gradient-to-br ${emptyContent.gradient} p-8 rounded-full mb-8 opacity-20`}>
        <ApperIcon 
          name={emptyContent.icon} 
          size={64} 
          className="text-white"
        />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-200 mb-3">
        {emptyContent.title}
      </h3>
      
      <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
        {emptyContent.message}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          className="flex items-center space-x-2 btn-primary"
        >
          <ApperIcon name="Plus" size={16} />
          <span>{emptyContent.actionLabel}</span>
        </Button>
      )}
    </div>
  )
}

export default Empty