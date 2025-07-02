import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = ({ 
  label, 
  error, 
  options = [], 
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            w-full px-4 py-2.5 bg-secondary border border-slate-600 rounded-lg
            text-slate-200 appearance-none cursor-pointer
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
            transition-colors duration-200
            ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-secondary">
              {option.label}
            </option>
          ))}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          size={16} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default Select