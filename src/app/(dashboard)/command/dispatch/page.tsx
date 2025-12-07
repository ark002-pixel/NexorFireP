'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Radio, Map as MapIcon, User, CheckCircle, Clock } from 'lucide-react';

// Dynamically import Map to avoid SSR issues
const LiveRouteMap = dynamic(() => import('@/components/maps/LiveRouteMap'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Cargando Mapa...</div>
});

export default function DispatchPage() {
    const [routes, setRoutes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoutes();
        const interval = setInterval(fetchRoutes, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const fetchRoutes = async () => {
        try {
            const res = await fetch('/api/routes/active');
            if (res.ok) {
                const data = await res.json();
                setRoutes(data);
            }
        } catch (error) {
            console.error('Error fetching routes:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Monitor de Rutas en Vivo</h2>
                    <p className="text-gray-500">Supervisión de inspectores y progreso de rutas SGR</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-semibold animate-pulse">
                        <Radio size={18} />
                        <span className="text-sm">SISTEMA ACTIVO</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Map Panel */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-1 overflow-hidden flex flex-col">
                    <div className="flex-1 relative">
                        <LiveRouteMap routes={routes} />
                    </div>
                </div>

                {/* Sidebar Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <MapIcon size={18} className="text-blue-600" />
                            Rutas Activas ({routes.length})
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">Cargando datos...</div>
                        ) : routes.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                No hay rutas activas en este momento.
                            </div>
                        ) : (
                            routes.map((route) => {
                                const completed = route.stops.filter((s: any) => s.status === 'Completed').length;
                                const total = route.stops.length;
                                const progress = Math.round((completed / total) * 100) || 0;

                                return (
                                    <div key={route.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                                                    {route.inspector.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{route.inspector.name}</h4>
                                                    <p className="text-xs text-gray-500">ID: {route.inspector.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                                                EN RUTA
                                            </span>
                                        </div>

                                        <div className="mb-3">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Progreso</span>
                                                <span className="font-medium text-gray-900">{progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-2 text-xs text-gray-500">
                                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                <CheckCircle size={12} className="text-green-600" />
                                                {completed} Completadas
                                            </div>
                                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                <Clock size={12} className="text-orange-500" />
                                                {total - completed} Pendientes
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

