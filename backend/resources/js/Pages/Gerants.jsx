import { router } from "@inertiajs/react";
import { useState } from "react";

const statusColor = {
    reussi:  "bg-green-100 text-green-700",
    attente: "bg-yellow-100 text-yellow-700",
    echoue:  "bg-red-100 text-red-700",
};

export default function Gerants({ gerant, filters }) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [statut, setStatut] = useState(filters.statut ?? "");
    const [plan,   setPlan]   = useState(filters.plan ?? "");

    const applyFilters = () => {
        router.get(
            route("gerant.index"), // ✅ correspond à ->name('gerant.index') dans web.php
            { search, statut, plan },
            { preserveState: true, replace: true }
        );
    };

    const reset = () => {
        setSearch("");
        setStatut("");
        setPlan("");
        router.get(
            route("gerant.index"), // ✅ idem
            {},
            { preserveState: true, replace: true }
        );
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Gérants</h1>

            {/* FILTRES */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3 items-end">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500">Recherche</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                        placeholder="Nom ou email..."
                        className="border rounded-lg px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500">Statut paiement</label>
                    <select
                        value={statut}
                        onChange={(e) => setStatut(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="">Tous</option>
                        <option value="reussi">Réussi</option>
                        <option value="attente">En attente</option>
                        <option value="echoue">Échoué</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500">Plan</label>
                    <select
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="">Tous</option>
                        <option value="mensuel">Mensuel</option>
                        <option value="trimestriel">Trimestriel</option>
                        <option value="annuel">Annuel</option>
                    </select>
                </div>

                <button
                    onClick={applyFilters}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Filtrer
                </button>

                <button
                    onClick={reset}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm"
                >
                    Réinitialiser
                </button>
            </div>

            {/* TABLEAU */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 text-left">#</th>
                            <th className="px-4 py-3 text-left">Nom</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Plan</th>
                            <th className="px-4 py-3 text-left">Statut</th>
                            <th className="px-4 py-3 text-left">Fin abonnement</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {gerant.data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-400">
                                    Aucun gérant trouvé
                                </td>
                            </tr>
                        ) : (
                            gerant.data.map((g, i) => {
                                const dernierPaiement = g.paiements[0];
                                return (
                                    <tr key={g.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-400">
                                            {(gerant.current_page - 1) * 10 + i + 1}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {g.name}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {g.email}
                                        </td>
                                        <td className="px-4 py-3 capitalize">
                                            {dernierPaiement?.plan ?? "—"}
                                        </td>
                                        <td className="px-4 py-3">
                                            {dernierPaiement ? (
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[dernierPaiement.status] ?? "bg-gray-100 text-gray-600"}`}>
                                                    {dernierPaiement.status}
                                                </span>
                                            ) : "—"}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {dernierPaiement?.fin
                                                ? new Date(dernierPaiement.fin).toLocaleDateString("fr-FR")
                                                : "—"}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {gerant.last_page > 1 && (
                <div className="flex gap-1 justify-center flex-wrap">
                    {gerant.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url)}
                            className={`px-3 py-1 rounded text-sm border ${
                                link.active
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            } disabled:opacity-40`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}