import AppLayout from '@/Layouts/AppLayout'
import { useForm, usePage } from '@inertiajs/react'

export default function EditSalle() {
  const { salle } = usePage().props

  const { data, setData, put, processing, errors } = useForm({
    nom_salle:          salle.nom_salle          ?? '',
    pays_salle:         salle.pays_salle         ?? '',
    region_salle:       salle.region_salle       ?? '',
    adresse_salle:      salle.adresse_salle      ?? '',
    descriptions_salle: salle.descriptions_salle ?? '',
    numero_salle:       salle.numero_salle       ?? '',
    email_salle:        salle.email_salle        ?? '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    put(`/salles/${salle.id}`)
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Modifier — {salle.nom_salle}
        </h1>

        <div className="bg-white rounded-2xl shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {[
              { key: 'nom_salle',          label: 'Nom de la salle',  type: 'text' },
              { key: 'pays_salle',         label: 'Pays',             type: 'text' },
              { key: 'region_salle',       label: 'Région',           type: 'text' },
              { key: 'adresse_salle',      label: 'Adresse',          type: 'text' },
              { key: 'numero_salle',       label: 'Numéro',           type: 'text' },
              { key: 'email_salle',        label: 'Email',            type: 'email' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={data[field.key]}
                  onChange={e => setData(field.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors[field.key] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
                )}
              </div>
            ))}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={data.descriptions_salle}
                onChange={e => setData('descriptions_salle', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={processing}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {processing ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <a href="/salles" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition">
                Annuler
              </a>
            </div>

          </form>
        </div>
      </div>
    </AppLayout>
  )
}