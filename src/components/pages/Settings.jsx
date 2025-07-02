import React, { useState, useEffect } from 'react'
import Header from '@/components/organisms/Header'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getEmailSettings, updateEmailSettings } from '@/services/api/settingsService'
import { toast } from 'react-toastify'

const Settings = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    enabled: true,
    frequency: 'daily',
    includeScreenshots: true,
    platforms: ['Facebook', 'Google', 'LinkedIn'],
    emailAddress: '',
    sendTime: '09:00'
  })

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' }
  ]

  const timeOptions = [
    { value: '06:00', label: '6:00 AM' },
    { value: '07:00', label: '7:00 AM' },
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' }
  ]

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getEmailSettings()
      setSettings(data)
      setFormData(prev => ({ ...prev, ...data }))
    } catch (err) {
      setError('Failed to load settings')
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.emailAddress.trim()) {
      toast.error('Email address is required')
      return
    }

    try {
      setSaving(true)
      const updated = await updateEmailSettings(formData)
      setSettings(updated)
      toast.success('Settings saved successfully')
    } catch (err) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
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

  const handleTestEmail = async () => {
    if (!formData.emailAddress.trim()) {
      toast.error('Please enter an email address first')
      return
    }
    
    toast.info('Test email sent! Check your inbox.')
  }

  if (loading) {
    return (
      <div className="p-6">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadSettings} />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Settings"
        subtitle="Configure your email notifications and monitoring preferences"
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl space-y-6">
          {/* Email Notifications */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
                <p className="text-slate-400 text-sm">Configure daily email summaries of competitor activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {formData.enabled && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailAddress: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                  
                  <Select
                    label="Frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                    options={frequencyOptions}
                  />
                </div>

                <Select
                  label="Send Time"
                  value={formData.sendTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, sendTime: e.target.value }))}
                  options={timeOptions}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Include Platforms
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['Facebook', 'Google', 'LinkedIn'].map((platform) => (
                      <label
                        key={platform}
                        className={`
                          flex items-center space-x-2 px-4 py-2 rounded-lg border cursor-pointer
                          transition-all duration-200
                          ${formData.platforms.includes(platform)
                            ? 'bg-primary/20 border-primary text-primary'
                            : 'bg-secondary border-slate-600 text-slate-300 hover:border-slate-500'
                          }
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={formData.platforms.includes(platform)}
                          onChange={() => handlePlatformToggle(platform)}
                          className="sr-only"
                        />
                        <ApperIcon 
                          name={platform === 'Facebook' ? 'Facebook' : platform === 'Google' ? 'Chrome' : 'Linkedin'} 
                          size={16} 
                        />
                        <span>{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.includeScreenshots}
                      onChange={(e) => setFormData(prev => ({ ...prev, includeScreenshots: e.target.checked }))}
                      className="w-4 h-4 text-primary bg-secondary border-slate-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-slate-300">Include ad screenshots in emails</span>
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleTestEmail}
                    className="flex items-center space-x-2"
                  >
                    <ApperIcon name="Send" size={16} />
                    <span>Send Test Email</span>
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={saving}
                    className="btn-primary flex items-center space-x-2"
                  >
                    {saving ? (
                      <>
                        <ApperIcon name="Loader2" size={16} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Save" size={16} />
                        <span>Save Settings</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Card>

          {/* Account Information */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Plan</span>
                <span className="text-white">Free Plan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Competitors Tracked</span>
                <span className="text-white">7 / 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Data Retention</span>
                <span className="text-white">30 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">API Requests</span>
                <span className="text-white">1,247 / 5,000</span>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-error/30">
            <h3 className="text-lg font-semibold text-error mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-error/5 rounded-lg border border-error/20">
                <div>
                  <h4 className="font-medium text-white">Clear All Data</h4>
                  <p className="text-sm text-slate-400">Remove all tracked competitors and ad data</p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => toast.warning('This feature is not available in the demo')}
                >
                  Clear Data
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Settings