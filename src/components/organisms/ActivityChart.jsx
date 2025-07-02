import React from 'react'
import ReactApexChart from 'react-apexcharts'
import Card from '@/components/atoms/Card'

const ActivityChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <div className="shimmer h-6 w-32 rounded mb-4"></div>
        <div className="shimmer h-64 w-full rounded"></div>
      </Card>
    )
  }

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent'
    },
    theme: {
      mode: 'dark'
    },
    colors: ['#7C3AED', '#10B981', '#3B82F6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    grid: {
      borderColor: '#475569',
      strokeDashArray: 3
    },
    xaxis: {
      categories: data.dates,
      labels: {
        style: { colors: '#94A3B8' }
      }
    },
    yaxis: {
      labels: {
        style: { colors: '#94A3B8' }
      }
    },
    legend: {
      labels: {
        colors: '#94A3B8'
      }
    },
    tooltip: {
      theme: 'dark'
    }
  }

  const series = [
    {
      name: 'Facebook Ads',
      data: data.facebook
    },
    {
      name: 'Google Ads',
      data: data.google
    },
    {
      name: 'LinkedIn Ads',
      data: data.linkedin
    }
  ]

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">Ad Activity Trends</h3>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="area"
        height={300}
      />
    </Card>
  )
}

export default ActivityChart