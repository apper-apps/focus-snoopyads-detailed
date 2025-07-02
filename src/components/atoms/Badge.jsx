import React from 'react'

const Badge = ({ 
  children, 
  variant = "default", 
  size = "sm",
  className = "" 
}) => {
  const variants = {
    default: "bg-slate-700 text-slate-300",
    primary: "bg-primary/20 text-primary border border-primary/30",
    success: "bg-success/20 text-success border border-success/30",
    warning: "bg-warning/20 text-warning border border-warning/30",
    error: "bg-error/20 text-error border border-error/30",
    facebook: "platform-facebook text-white",
    google: "platform-google text-white",
    linkedin: "platform-linkedin text-white"
  }

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${variants[variant]} ${sizes[size]} ${className}
    `}>
      {children}
    </span>
  )
}

export default Badge