import AppLayout from '@/Layouts/AppLayout'
import { usePage } from '@inertiajs/react'
import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { Users, Building2, CheckCircle, XCircle } from 'lucide-react'

Chart.register(...registerables)

export default function Dashboard() {
  const { auth, stats, adherantsParSalle } = usePage().props

  const donutRef  = useRef(null)
  const barRef    = useRef(null)
  const donutChart = useRef(null)
  const barChart   = useRef(null)

  // Chart Donut — Salles actives/inactives
  useEffect(() => {
    if (donutChart.current) donutChart.current.destroy()

    donutChart.current = new Chart(donutRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Actives', 'Inactives'],
        datasets: [{
          data: [stats.sallesActive, stats.sallesInactive],
          backgroundColor: ['#2563eb', '#e5e7eb'],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    })

    return () => donutChart.current?.destroy()
  }, [stats])

  // Chart Bar — Adherants par salle
  useEffect(() => {
    if (barChart.current) barChart.current.destroy()

    barChart.current = new Chart(barRef.current, {
      type: 'bar',
      data: {
        labels: adherantsParSalle.map(s => s.name),
        datasets: [{
          label: 'Adhérants',
          data: adherantsParSalle.map(s => s.count),
          backgroundColor: '#2563eb',
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
          },
        },
      },
    })

    return () => barChart.current?.destroy()
  }, [adherantsParSalle])

  return (
    <AppLayout>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenue, {auth?.user?.name} 👋
        </h1>
        <p className="text-sm text-gray-500">{auth?.user?.email}</p>
      </div>

      {/* Cards stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <StatCard
          icon={<Building2 size={22} className="text-orange-600" />}
          label="Total Salles"
          value={stats.totalSalles}
          bg="bg-orange-50"
        />
        <StatCard
          icon={<CheckCircle size={22} className="text-green-600" />}
          label="Salles Actives"
          value={stats.sallesActive}
          bg="bg-green-50"
        />
        <StatCard
          icon={<XCircle size={22} className="text-red-500" />}
          label="Salles Inactives"
          value={stats.sallesInactive}
          bg="bg-red-50"
        />
        <StatCard
          icon={<Users size={22} className="text-purple-600" />}
          label="Total Adhérants"
          value={stats.totalAdherants}
          bg="bg-purple-50"
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Donut */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">
            Salles actives vs inactives
          </h2>
          <div className="max-w-xs mx-auto">
            <canvas ref={donutRef} />
          </div>
        </div>

        {/* Bar */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">
            Adhérants par salle
          </h2>
          <canvas ref={barRef} />
        </div>

      </div>

    </AppLayout>
  )
}

// Composant carte stat
function StatCard({ icon, label, value, bg }) {
  return (
    <div className={`${bg} rounded-2xl p-5 flex items-center gap-4`}>
      <div className="p-2 bg-white rounded-xl shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}