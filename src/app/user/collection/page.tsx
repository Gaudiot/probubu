"use client";

import { useEffect, useState } from "react";

// Dados simulados, pois não temos integração real. Trocar pelo fetch do backend depois!
const mockCollections = [
    { id: "1", name: "Coleção Clássica" },
    { id: "2", name: "Coleção Lendária" },
    { id: "3", name: "Coleção Especial" },
];

type CollectionOption = {
    id: string;
    name: string;
};

export default function UserCollectionsPage() {
    const [collections, setCollections] = useState<CollectionOption[]>([]);
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        // Simulação de fetch; troque pelo endpoint real mais tarde.
        setCollections(mockCollections);
        if (mockCollections.length) setSelected(mockCollections[0].id);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 tracking-wider">Minhas Cartas</h1>
            <div className="mb-8 w-full max-w-sm">
                <label className="block mb-2 text-lg font-medium text-gray-700">
                    Selecionar coleção
                </label>
                <select
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md outline-none text-gray-700 bg-white focus:border-blue-500 transition"
                    value={selected}
                    onChange={e => setSelected(e.target.value)}
                >
                    {collections.map(collection => (
                        <option key={collection.id} value={collection.id}>
                            {collection.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Aqui irão as cartas colecionadas da coleção escolhida */}
            <div className="w-full max-w-3xl flex flex-col items-center">
                <span className="text-gray-500">Selecione uma coleção para exibir suas cartas colecionadas.</span>
            </div>
        </div>
    )
}
