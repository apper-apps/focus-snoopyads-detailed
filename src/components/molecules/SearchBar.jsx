import React, { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className = '',
  value,
  onChange
}) => {
  const [searchValue, setSearchValue] = useState(value || '')

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchValue(val)
    if (onChange) onChange(val)
    if (onSearch) onSearch(val)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(searchValue)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-slate-600 rounded-lg
                   text-slate-200 placeholder-slate-500
                   focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                   transition-colors duration-200"
        />
      </div>
    </form>
  )
}

export default SearchBar