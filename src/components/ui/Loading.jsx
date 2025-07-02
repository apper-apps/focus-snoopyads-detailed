import React from 'react'

const Loading = ({ type = 'dashboard' }) => {
  if (type === 'dashboard') {
    return (
      <div className="space-y-6">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface rounded-lg p-6 border border-slate-600">
              <div className="shimmer h-4 w-24 rounded mb-2"></div>
              <div className="shimmer h-8 w-16 rounded mb-1"></div>
              <div className="shimmer h-3 w-20 rounded"></div>
            </div>
          ))}
        </div>

        {/* Activity Chart Skeleton */}
        <div className="bg-surface rounded-lg p-6 border border-slate-600">
          <div className="shimmer h-6 w-32 rounded mb-4"></div>
          <div className="shimmer h-64 w-full rounded"></div>
        </div>

        {/* Recent Ads Skeleton */}
        <div className="bg-surface rounded-lg p-6 border border-slate-600">
          <div className="shimmer h-6 w-28 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4 p-4 bg-secondary rounded-lg">
                <div className="shimmer h-16 w-16 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="shimmer h-4 w-3/4 rounded"></div>
                  <div className="shimmer h-3 w-1/2 rounded"></div>
                  <div className="shimmer h-3 w-1/4 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'ads') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-surface rounded-lg p-4 border border-slate-600">
            <div className="shimmer h-32 w-full rounded mb-4"></div>
            <div className="space-y-2">
              <div className="shimmer h-4 w-full rounded"></div>
              <div className="shimmer h-4 w-3/4 rounded"></div>
              <div className="flex justify-between items-center mt-3">
                <div className="shimmer h-3 w-16 rounded"></div>
                <div className="shimmer h-3 w-20 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'competitors') {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-surface rounded-lg p-6 border border-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="shimmer h-12 w-12 rounded-full"></div>
                <div className="space-y-2">
                  <div className="shimmer h-5 w-32 rounded"></div>
                  <div className="shimmer h-3 w-24 rounded"></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="shimmer h-8 w-16 rounded"></div>
                <div className="shimmer h-8 w-16 rounded"></div>
                <div className="shimmer h-8 w-8 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default loading
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
    </div>
  )
}

export default Loading