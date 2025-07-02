import React from 'react'

const Input = ({ 
  label, 
  error, 
  className = '',
  type = 'text',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-4 py-2.5 bg-secondary border border-slate-600 rounded-lg
          text-slate-200 placeholder-slate-500
          focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
          transition-colors duration-200
          ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default Input