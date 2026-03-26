import AppLayout from '@/Layouts/AppLayout'
import { usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import { DollarSign, CheckCircle, XCircle, List } from 'lucide-react'

export default function Paiements() {
  const { paiements, stats, filters } = usePage().props

  const [form, setForm] = useState({
    status:     filters?.status     ?? '',
    date_debut: filters?.date_debut ?? '',
    date_fin:   filters?.date_fin   ?? '',
    plan:       filters?.plan       ?? '',
  })

  function handleFilter(e) {
    e.preventDefault()
    router.get('/paiements', form, { preserveState: true })
  }

  function resetFilter() {
    setForm({ status: '', date_debut: '', date_fin: '', plan: '' })
    router.get('/paiements')
  }

  return (
    <AppLayout>

      {/* Titre */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Paiements</h1>
        <p className="text-sm text-gray-500">Gestion des paiements GymPlus</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<DollarSign size={22} className="text-orange-600" />}
          label="Total encaissé"
          value={`${stats.total} FCFA`}
          bg="bg-orange-50"
        />
        <StatCard
          icon={<CheckCircle size={22} className="text-green-600" />}
          label="Payé"
          value={`${stats.paye} FCFA`}
          bg="bg-green-50"
        />
        <StatCard
          icon={<XCircle size={22} className="text-red-500" />}
          label="Impayé"
          value={`${stats.impaye} FCFA`}
          bg="bg-red-50"
        />
        <StatCard
          icon={<List size={22} className="text-purple-600" />}
          label="Nb paiements"
          value={stats.count}
          bg="bg-purple-50"
        />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Filtres</h2>
        <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Tous les statuts</option>
            <option value="paye">Payé</option>
            <option value="impaye">Impayé</option>
          </select>

          <select
            value={form.plan}
            onChange={e => setForm({ ...form, plan: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Tous les plans</option>
            <option value="mensuel">Mensuel</option>
            <option value="trimestriel">Trimestriel</option>
            <option value="annuel">Annuel</option>
          </select>

          <input
            type="date"
            value={form.date_debut}
            onChange={e => setForm({ ...form, date_debut: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="date"
            value={form.date_fin}
            onChange={e => setForm({ ...form, date_fin: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <div className="sm:col-span-2 lg:col-span-4 flex gap-3">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
            >
              Filtrer
            </button>
            <button
              type="button"
              onClick={resetFilter}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition"
            >
              Réinitialiser
            </button>
          </div>

        </form>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Gérant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Montant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Début</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fin</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trans ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paiements.data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    Aucun paiement trouvé
                  </td>
                </tr>
              ) : (
                paiements.data.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {p.gerant?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-semibold">
                      {p.montant} FCFA
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{p.plan}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${p.status === 'paye'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                        }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{p.debut}</td>
                    <td className="px-4 py-3 text-gray-500">{p.fin}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{p.transId ?? '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {paiements.total} paiement(s) au total
          </p>
          <div className="flex gap-2">
            {paiements.links.map((link, i) => (
              <button
                key={i}
                disabled={!link.url}
                onClick={() => link.url && router.get(link.url)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition
                  ${link.active
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40'
                  }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </div>

      </div>

    </AppLayout>
  )
}

function StatCard({ icon, label, value, bg }) {
  return (
    <div className={`${bg} rounded-2xl p-5 flex items-center gap-4`}>
      <div className="p-2 bg-white rounded-xl shadow-sm">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}