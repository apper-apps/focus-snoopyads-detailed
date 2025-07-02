import React from 'react'
import CompetitorCard from '@/components/molecules/CompetitorCard'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'

const CompetitorList = ({ 
  competitors, 
  loading, 
  onEdit, 
  onDelete, 
  onViewAds,
  onAddCompetitor 
}) => {
  if (loading) {
    return <Loading type="competitors" />
  }

  if (!competitors || competitors.length === 0) {
    return (
      <Empty
        type="competitors"
        onAction={onAddCompetitor}
      />
    )
  }

  return (
    <div className="space-y-4">
      {competitors.map((competitor) => (
        <CompetitorCard
          key={competitor.Id}
          competitor={competitor}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewAds={onViewAds}
        />
      ))}
    </div>
  )
}

export default CompetitorList