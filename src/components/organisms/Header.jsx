import React from 'react'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = ({ title, subtitle, onSearch, searchPlaceholder, actions }) => {
  return (
    <div className="bg-surface border-b border-slate-600 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-white gradient-text">{title}</h1>
          {subtitle && (
            <p className="text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-4">
          {onSearch && (
            <SearchBar
              placeholder={searchPlaceholder || "Search..."}
              onSearch={onSearch}
            />
          )}
          
          {actions}

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <ApperIcon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          {/* User Menu */}
          <Button variant="ghost" size="sm">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={16} className="text-white" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header