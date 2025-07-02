import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import { motion } from 'framer-motion'

const Sidebar = () => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'BarChart3' },
    { name: 'Competitors', href: '/competitors', icon: 'Users' },
    { name: 'Ads Library', href: '/ads-library', icon: 'Eye' },
    { name: 'Settings', href: '/settings', icon: 'Settings' }
  ]

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="w-64 bg-secondary border-r border-slate-600 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="Eye" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">SnoopyAds</h1>
            <p className="text-xs text-slate-400">Ad Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive: linkActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-200 group relative
                  ${linkActive || isActive(item.href)
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }
                `}
              >
                {(isActive(item.href)) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <ApperIcon 
                  name={item.icon} 
                  size={18} 
                  className={`relative z-10 ${isActive(item.href) ? 'text-primary' : ''}`}
                />
                <span className="relative z-10">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Info */}
      <div className="p-4 border-t border-slate-600">
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">Competitors</span>
            <span className="text-sm font-bold text-primary">7/10</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">3 slots remaining</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar