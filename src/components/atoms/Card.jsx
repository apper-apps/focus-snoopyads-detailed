import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  glow = false,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.02 } : {}}
      className={`
        bg-surface rounded-lg border border-slate-600 p-6
        ${hover ? 'cursor-pointer transition-all duration-200 hover:border-slate-500' : ''}
        ${glow ? 'glow-on-hover' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card