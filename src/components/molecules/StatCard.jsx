import React from 'react'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon,
  className = ''
}) => {
  const changeColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-slate-400'
  }

  const changeIcons = {
    positive: 'TrendingUp',
    negative: 'TrendingDown',
    neutral: 'Minus'
  }

  return (
    <Card className={`${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white gradient-text mb-1">{value}</p>
          {change && (
            <div className={`flex items-center text-sm ${changeColors[changeType]}`}>
              <ApperIcon name={changeIcons[changeType]} size={14} className="mr-1" />
              <span>{change}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="bg-primary/20 p-3 rounded-lg">
            <ApperIcon name={icon} size={24} className="text-primary" />
          </div>
        )}
      </div>
    </Card>
  )
}

export default StatCard