import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = "Something went wrong while loading the data.", 
  onRetry,
  type = "general"
}) => {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Connection Error',
          message: "Unable to connect to the server. Please check your internet connection and try again."
        }
      case 'notfound':
        return {
          icon: 'SearchX',
          title: 'No Results Found',
          message: "We couldn't find what you're looking for. Try adjusting your search criteria."
        }
      case 'permission':
        return {
          icon: 'ShieldAlert',
          title: 'Access Denied',
          message: "You don't have permission to access this resource."
        }
      default:
        return {
          icon: 'AlertTriangle',
          title: 'Error',
          message: message
        }
    }
  }

  const errorContent = getErrorContent()

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-error/10 rounded-full p-6 mb-6">
        <ApperIcon 
          name={errorContent.icon} 
          size={48} 
          className="text-error"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-200 mb-2">
        {errorContent.title}
      </h3>
      
      <p className="text-slate-400 mb-6 max-w-md">
        {errorContent.message}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" size={16} />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  )
}

export default Error