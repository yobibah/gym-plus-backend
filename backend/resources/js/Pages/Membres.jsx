import { router } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "../Layouts/AppLayout";

const statusColor = {
    actif: "bg-green-100 text-green-700",
    suspendu: "bg-red-100 text-red-700",
    attente: "bg-yellow-100 text-yellow-700",
};

export default function Membres({ membres, filters }) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [salle, setSalle] = useState(filters.salle ?? "");
    const [statut, setStatut] = useState(filters.statut ?? "");

    const applyFilters = () => {
        router.get(
            route("membres"),
            { search, salle, statut },
            { preserveState: true, replace: true },
        );
    };

    const reset = () => {
        setSearch("");
        setSalle("");
        setStatut("");

        router.get(
            route("membres"),
            {},
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Membres</h1>

                <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3 items-end">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-500">
                            Recherche
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && applyFilters()
                            }
                            placeholder="Nom ou email..."
                            className="border rounded-lg px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-500">Salle</label>
                        <input
                            type="text"
                            value={salle}
                            onChange={(e) => setSalle(e.target.value)}
                            placeholder="Nom de salle..."
                            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-500">Statut</label>
                        <select
                            value={statut}
                            onChange={(e) => setStatut(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                            <option value="">Tous</option>
                            <option value="actif">Actif</option>
                            <option value="suspendu">Suspendu</option>
                            <option value="attente">En attente</option>
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
                                <th className="px-4 py-3 text-left">Salles</th>
                                <th className="px-4 py-3 text-left">Statut</th>
                                <th className="px-4 py-3 text-left">
                                    Inscription
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {membres.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-10 text-gray-400"
                                    >
                                        Aucun membre trouvé
                                    </td>
                                </tr>
                            ) : (
                                membres.data.map((m, i) => (
                                    <tr key={m.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-400">
                                            {(membres.current_page - 1) * 10 +
                                                i +
                                                1}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {m.name}
                                        </td>

                                        <td className="px-4 py-3 text-gray-500">
                                            {m.email}
                                        </td>

                                        <td className="px-4 py-3">
                                            {m.salles?.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {m.salles.map((salle) => (
                                                        <span
                                                            key={salle.id}
                                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                                                        >
                                                            {salle.nom_salle}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-gray-300 text-xs">
                                                    Aucune
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            {m.dernierAbonnement ? (
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        statusColor[
                                                            m.dernierAbonnement
                                                                .actif ?? ""
                                                        ] ??
                                                        "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {m.dernierAbonnement.actif
                                                        ? "Actif"
                                                        : "Inactif"}
                                                </span>
                                            ) : (
                                                "—"
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(
                                                m.created_at,
                                            ).toLocaleDateString("fr-FR")}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {membres.last_page > 1 && (
                    <div className="flex gap-1 justify-center flex-wrap">
                        {membres.links.map((link, i) => (
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
        </AppLayout>
    );
}
