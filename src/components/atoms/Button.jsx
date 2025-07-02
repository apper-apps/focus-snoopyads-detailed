import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
  
  const variants = {
    primary: 'btn-primary text-white hover:shadow-lg',
    secondary: 'bg-surface text-slate-200 border border-slate-600 hover:border-slate-500 hover:bg-slate-600 glow-on-hover',
    danger: 'bg-error text-white hover:bg-red-600 hover:shadow-lg hover:shadow-error/25',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-700 glow-on-hover',
    success: 'bg-success text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-success/25'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button