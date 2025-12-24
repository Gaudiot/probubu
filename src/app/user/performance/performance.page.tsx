"use client";

import { Navbar } from "@/base/components/navbar";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import usePerformancePage from "./hooks/usePerformancePage.hook";

export default function PerformancePage() {
    const { performance, isLoading } = usePerformancePage();

    // Formatar dados para o Recharts
    const chartData = performance.map((item, index) => ({
        name: item.date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
        }),
        segundos: item.secondsElapsed,
        minutos: Math.round((item.secondsElapsed / 60) * 10) / 10,
    }));

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                        Minha Performance
                    </h1>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-[300px]">
                            <p className="text-gray-600 dark:text-gray-400">
                                Carregando...
                            </p>
                        </div>
                    ) : performance.length === 0 ? (
                        <div className="flex items-center justify-center h-[300px] bg-white dark:bg-gray-800 rounded-lg shadow">
                            <p className="text-gray-600 dark:text-gray-400">
                                Nenhum dado de performance disponível ainda.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                Tempo de Estudo (Minutos)
                            </h2>
                            <ResponsiveContainer width="70%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{
                                            fill: "#6B7280",
                                            fontSize: 12,
                                        }}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: "#6B7280",
                                            fontSize: 12,
                                        }}
                                        label={{
                                            value: "Minutos",
                                            angle: -90,
                                            position: "insideLeft",
                                            style: {
                                                fill: "#6B7280",
                                                fontSize: 14,
                                            },
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1F2937",
                                            border: "none",
                                            borderRadius: "8px",
                                            color: "#F9FAFB",
                                        }}
                                        formatter={(value: number) => [
                                            `${value} min`,
                                            "Tempo",
                                        ]}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="minutos"
                                        fill="#3B82F6"
                                        name="Minutos de Estudo"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
