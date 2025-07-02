import React from 'react'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const PlatformFilter = ({ 
  selectedPlatforms = [], 
  onPlatformChange,
  className = ''
}) => {
  const platforms = [
    { id: 'all', name: 'All Platforms', icon: 'Globe' },
    { id: 'facebook', name: 'Facebook', icon: 'Facebook' },
    { id: 'google', name: 'Google', icon: 'Chrome' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin' }
  ]

  const handlePlatformClick = (platformId) => {
    if (platformId === 'all') {
      onPlatformChange([])
    } else {
      const newPlatforms = selectedPlatforms.includes(platformId)
        ? selectedPlatforms.filter(p => p !== platformId)
        : [...selectedPlatforms, platformId]
      onPlatformChange(newPlatforms)
    }
  }

  const isSelected = (platformId) => {
    if (platformId === 'all') {
      return selectedPlatforms.length === 0
    }
    return selectedPlatforms.includes(platformId)
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {platforms.map((platform) => (
        <Button
          key={platform.id}
          variant={isSelected(platform.id) ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handlePlatformClick(platform.id)}
          className="flex items-center space-x-2"
        >
          <ApperIcon name={platform.icon} size={16} />
          <span>{platform.name}</span>
        </Button>
      ))}
    </div>
  )
}

export default PlatformFilter