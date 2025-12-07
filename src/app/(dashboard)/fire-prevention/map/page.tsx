'use client';

import { getAllInspections } from '@/actions/inspections';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Filter, Calendar, Map as MapIcon, Check, X } from 'lucide-react';

const InspectionMap = dynamic(() => import('@/components/maps/InspectionMap'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Cargando Mapa...</div>
});

export default function InspectionMapPage() {
    const [inspections, setInspections] = useState<any[]>([]);
    const [filteredInspections, setFilteredInspections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterMode, setFilterMode] = useState<'all' | 'week'>('all');
    const [statusFilters, setStatusFilters] = useState({
        scheduled: true,
        passed: true,
        failed: true
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        getAllInspections()
            .then((data) => {
                setInspections(data || []);
                setFilteredInspections(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching inspections:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = inspections || [];

        // Date Filter
        if (filterMode === 'week') {
            const now = new Date();
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            result = result.filter(i => {
                if (!i.date) return false;
                const date = new Date(i.date);
                return date >= startOfWeek && date <= endOfWeek;
            });
        }

        // Status Filter
        result = result.filter(i => {
            if (i.status === 'Scheduled' && statusFilters.scheduled) return true;
            if (i.status === 'Passed' && statusFilters.passed) return true;
            if (i.status === 'Failed' && statusFilters.failed) return true;
            return false;
        });

        setFilteredInspections(result);
    }, [filterMode, inspections, statusFilters]);

    const toggleStatus = (status: 'scheduled' | 'passed' | 'failed') => {
        setStatusFilters(prev => ({
            ...prev,
            [status]: !prev[status]
        }));
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
            {/* Map Header / Controls Overlay */}
            <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-between items-start pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 pointer-events-auto max-w-md">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <MapIcon size={24} className="text-blue-600" />
                        Mapa de Inspecciones
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Visualización geoespacial de todas las inspecciones programadas, en curso y completadas.
                    </p>
                </div>

                <div className="flex gap-2 pointer-events-auto">
                    <button
                        onClick={() => setFilterMode(prev => prev === 'week' ? 'all' : 'week')}
                        className={`btn shadow-lg border flex items-center gap-2 transition-colors ${filterMode === 'week' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                    >
                        <Calendar size={18} />
                        <span className="hidden sm:inline">{filterMode === 'week' ? 'Mostrando Esta Semana' : 'Esta Semana'}</span>
                    </button>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`btn shadow-lg border flex items-center gap-2 transition-colors ${showFilters ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                    >
                        <Filter size={18} />
                        <span className="hidden sm:inline">Filtrar</span>
                    </button>
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 w-full h-full">
                <InspectionMap inspections={filteredInspections} />
            </div>

            {/* Floating Legend / Status Filters */}
            {showFilters && (
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 z-[1000] min-w-[200px]">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Estado de Inspección</h4>
                        <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        <button
                            onClick={() => toggleStatus('scheduled')}
                            className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors ${statusFilters.scheduled ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${statusFilters.scheduled ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                                {statusFilters.scheduled && <Check size={10} className="text-white" />}
                            </div>
                            <span className="text-sm font-medium text-gray-700">Programada</span>
                        </button>

                        <button
                            onClick={() => toggleStatus('passed')}
                            className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors ${statusFilters.passed ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${statusFilters.passed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                {statusFilters.passed && <Check size={10} className="text-white" />}
                            </div>
                            <span className="text-sm font-medium text-gray-700">Aprobada</span>
                        </button>

                        <button
                            onClick={() => toggleStatus('failed')}
                            className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors ${statusFilters.failed ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${statusFilters.failed ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
                                {statusFilters.failed && <Check size={10} className="text-white" />}
                            </div>
                            <span className="text-sm font-medium text-gray-700">Fallida</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
