import AppLayout from '@/Layouts/AppLayout'
import { usePage, router, Link } from '@inertiajs/react'
import { useState } from 'react'
import { Building2, CheckCircle, XCircle, Search, Eye, Pencil, PowerOff, Trash2 } from 'lucide-react'

export default function SallesIndex() {
  const { salles, stats, filters } = usePage().props

  const [form, setForm] = useState({
    search: filters?.search ?? '',
    active: filters?.active ?? '',
  })

  function handleFilter(e) {
    e.preventDefault()
    router.get('/salles', form, { preserveState: true })
  }

  function resetFilter() {
    setForm({ search: '', active: '' })
    router.get('/salles')
  }

  function handleToggle(id) {
    router.post(`/salles/${id}/toggle`)
  }

  function handleDelete(id) {
    if (confirm('Confirmer la suppression de cette salle ?')) {
      router.delete(`/salles/${id}`)
    }
  }

  return (
    <AppLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Salles</h1>
          <p className="text-sm text-gray-500">Gestion des salles GymPlus</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<Building2 size={22} className="text-orange-600" />}   label="Total"    value={stats.total}    bg="bg-orange-50" />
        <StatCard icon={<CheckCircle size={22} className="text-green-600" />} label="Actives"  value={stats.active}   bg="bg-green-50" />
        <StatCard icon={<XCircle size={22} className="text-red-500" />}       label="Inactives" value={stats.inactive} bg="bg-red-50" />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-3">

          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une salle..."
              value={form.search}
              onChange={e => setForm({ ...form, search: e.target.value })}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <select
            value={form.active}
            onChange={e => setForm({ ...form, active: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Tous les statuts</option>
            <option value="1">Actives</option>
            <option value="0">Inactives</option>
          </select>

          <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
            Filtrer
          </button>
          <button type="button" onClick={resetFilter} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium transition">
            Reset
          </button>

        </form>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Salle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Pays / Région</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Adhérents</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {salles.data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    Aucune salle trouvée
                  </td>
                </tr>
              ) : (
                salles.data.map((salle) => (
                  <tr key={salle.id} className="hover:bg-gray-50 transition">

                    {/* Nom */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {salle.logo_salle ? (
                          <img src={`/storage/${salle.logo_salle}`} className="w-9 h-9 rounded-xl object-cover" />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold uppercase">
                            {salle.nom_salle?.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-800">{salle.nom_salle}</p>
                          <p className="text-xs text-gray-400">{salle.adresse_salle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Pays */}
                    <td className="px-4 py-3 text-gray-600">
                      {salle.pays_salle} {salle.region_salle && `/ ${salle.region_salle}`}
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3 text-gray-500">
                      <p>{salle.email_salle}</p>
                      <p className="text-xs">{salle.numero_salle}</p>
                    </td>

                    {/* Adhérents */}
                    <td className="px-4 py-3 text-gray-700 font-semibold">
                      {salle.adherents_count}
                    </td>

                    {/* Statut */}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${salle.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                        }`}>
                        {salle.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

          
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/salles/${salle.id}`}
                          className="p-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                          title="Voir"
                        >
                          <Eye size={15} />
                        </Link>
                        <Link
                          href={`/salles/${salle.id}/edit`}
                          className="p-1.5 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition"
                          title="Modifier"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => handleToggle(salle.id)}
                          className={`p-1.5 rounded-lg transition ${salle.active
                            ? 'bg-orange-50 text-orange-500 hover:bg-orange-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title={salle.active ? 'Suspendre' : 'Activer'}
                        >
                          <PowerOff size={15} />
                        </button>
                     
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">{salles.total} salle(s)</p>
          <div className="flex gap-2">
            {salles.links.map((link, i) => (
              <button
                key={i}
                disabled={!link.url}
                onClick={() => link.url && router.get(link.url)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition
                  ${link.active ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40'}`}
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
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}