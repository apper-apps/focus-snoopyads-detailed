import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import CompetitorList from '@/components/organisms/CompetitorList'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getCompetitors, createCompetitor, updateCompetitor, deleteCompetitor } from '@/services/api/competitorService'
import { toast } from 'react-toastify'

const Competitors = () => {
  const navigate = useNavigate()
  const [competitors, setCompetitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCompetitor, setEditingCompetitor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    platforms: []
  })

  const industryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Automotive', label: 'Automotive' },
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Other', label: 'Other' }
  ]

  const platformOptions = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Google', label: 'Google' },
    { value: 'LinkedIn', label: 'LinkedIn' }
  ]

  const loadCompetitors = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getCompetitors()
      setCompetitors(data)
    } catch (err) {
      setError('Failed to load competitors')
      toast.error('Failed to load competitors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCompetitors()
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const filteredCompetitors = competitors.filter(competitor =>
    competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    competitor.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddCompetitor = () => {
    if (competitors.length >= 10) {
      toast.warning('You can only track up to 10 competitors')
      return
    }
    setShowAddForm(true)
    setEditingCompetitor(null)
    setFormData({ name: '', industry: '', platforms: [] })
  }

  const handleEditCompetitor = (competitor) => {
    setEditingCompetitor(competitor)
    setShowAddForm(true)
    setFormData({
      name: competitor.name,
      industry: competitor.industry,
      platforms: competitor.platforms || []
    })
  }

  const handleDeleteCompetitor = async (competitor) => {
    if (window.confirm(`Are you sure you want to remove ${competitor.name} from your competitors list?`)) {
      try {
        await deleteCompetitor(competitor.Id)
        setCompetitors(competitors.filter(c => c.Id !== competitor.Id))
        toast.success(`${competitor.name} removed from competitors`)
      } catch (err) {
        toast.error('Failed to remove competitor')
      }
    }
  }

  const handleViewAds = (competitor) => {
    navigate(`/ads-library?competitor=${encodeURIComponent(competitor.name)}`)
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Company name is required')
      return
    }
    
    if (formData.platforms.length === 0) {
      toast.error('Please select at least one platform')
      return
    }

    try {
      const competitorData = {
        ...formData,
        addedDate: editingCompetitor ? editingCompetitor.addedDate : new Date().toISOString(),
        identifiers: {} // This would contain platform-specific IDs in a real app
      }

      if (editingCompetitor) {
        const updated = await updateCompetitor(editingCompetitor.Id, competitorData)
        setCompetitors(competitors.map(c => c.Id === editingCompetitor.Id ? updated : c))
        toast.success(`${formData.name} updated successfully`)
      } else {
        const newCompetitor = await createCompetitor(competitorData)
        setCompetitors([...competitors, newCompetitor])
        toast.success(`${formData.name} added to competitors`)
      }

      setShowAddForm(false)
      setFormData({ name: '', industry: '', platforms: [] })
    } catch (err) {
      toast.error(editingCompetitor ? 'Failed to update competitor' : 'Failed to add competitor')
    }
  }

  const handlePlatformToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Competitors"
        subtitle={`Manage your competitor tracking (${competitors.length}/10 slots used)`}
        onSearch={handleSearch}
        searchPlaceholder="Search competitors..."
        actions={
          <Button
            variant="primary"
            onClick={handleAddCompetitor}
            disabled={competitors.length >= 10}
            className="btn-primary"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Competitor
          </Button>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto">
        {showAddForm && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {editingCompetitor ? 'Edit Competitor' : 'Add New Competitor'}
            </h3>
            
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter company name"
                  required
                />
                
                <Select
                  label="Industry"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  options={industryOptions}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Platforms to Monitor
                </label>
                <div className="flex flex-wrap gap-3">
                  {platformOptions.map((platform) => (
                    <label
                      key={platform.value}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg border cursor-pointer
                        transition-all duration-200
                        ${formData.platforms.includes(platform.value)
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-secondary border-slate-600 text-slate-300 hover:border-slate-500'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform.value)}
                        onChange={() => handlePlatformToggle(platform.value)}
                        className="sr-only"
                      />
                      <ApperIcon 
                        name={platform.value === 'Facebook' ? 'Facebook' : platform.value === 'Google' ? 'Chrome' : 'Linkedin'} 
                        size={16} 
                      />
                      <span>{platform.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="btn-primary"
                >
                  {editingCompetitor ? 'Update Competitor' : 'Add Competitor'}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {error ? (
          <Error message={error} onRetry={loadCompetitors} />
        ) : (
          <CompetitorList
            competitors={filteredCompetitors}
            loading={loading}
            onEdit={handleEditCompetitor}
            onDelete={handleDeleteCompetitor}
            onViewAds={handleViewAds}
            onAddCompetitor={handleAddCompetitor}
          />
        )}
      </div>
    </div>
  )
}

export default Competitors