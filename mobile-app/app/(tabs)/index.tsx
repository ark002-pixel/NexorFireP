import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Calendar, AlertTriangle, ChevronRight } from 'lucide-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { apiRequest } from '../../lib/api';

export default function DashboardScreen() {
    const { user } = useAuth();
    const router = useRouter();
    const [activeRoute, setActiveRoute] = useState<any>(null);
    const [stats, setStats] = useState({ pending: 0, completed: 0 });
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            if (user?.id) {
                // Fetch Route
                const routeData = await apiRequest(`/routes?inspectorId=${user.id}`);
                if (!routeData.message) {
                    setActiveRoute(routeData);
                } else {
                    setActiveRoute(null);
                }

                // Fetch Inspections for Stats
                const inspectionsData = await apiRequest(`/inspections?inspectorId=${user.id}`);
                if (Array.isArray(inspectionsData)) {
                    const pending = inspectionsData.filter((i: any) => i.status !== 'Completed').length;
                    const completed = inspectionsData.filter((i: any) => i.status === 'Completed').length;
                    setStats({ pending, completed });
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [user])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const nextStop = activeRoute?.stops?.find((s: any) => s.status === 'Pending');

    return (
        <SafeAreaView className="flex-1 bg-brand-light">
            <ScrollView
                className="flex-1 px-5 pt-6"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mb-8">
                    <View>
                        <Text className="text-brand-muted text-sm font-medium">Bienvenido de nuevo,</Text>
                        <Text className="text-brand-dark text-3xl font-bold tracking-tight">{user?.name || 'Inspector'}</Text>
                    </View>
                    <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-slate-100">
                        <Text className="text-brand-red font-bold text-lg">{user?.name?.[0] || 'I'}</Text>
                    </View>
                </View>

                {/* Stats Cards */}
                <View className="flex-row gap-4 mb-8">
                    <View className="flex-1 bg-brand-red p-5 rounded-3xl shadow-lg shadow-brand-red/20">
                        <View className="bg-white/20 w-10 h-10 rounded-xl items-center justify-center mb-3">
                            <Calendar color="white" size={20} />
                        </View>
                        <Text className="text-white/90 text-sm font-medium">Pendientes</Text>
                        <Text className="text-white text-3xl font-bold">{stats.pending}</Text>
                    </View>
                    <View className="flex-1 bg-brand-dark p-5 rounded-3xl shadow-lg shadow-brand-dark/20">
                        <View className="bg-white/10 w-10 h-10 rounded-xl items-center justify-center mb-3">
                            <MapPin color="white" size={20} />
                        </View>
                        <Text className="text-white/80 text-sm font-medium">Completadas</Text>
                        <Text className="text-white text-3xl font-bold">{stats.completed}</Text>
                    </View>
                </View>

                {/* Active Route Preview */}
                <View className="mb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-brand-dark text-xl font-bold">Ruta Activa</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/map')}>
                            <Text className="text-brand-red font-semibold">Ver Mapa</Text>
                        </TouchableOpacity>
                    </View>

                    {activeRoute && nextStop ? (
                        <TouchableOpacity
                            onPress={() => router.push('/(tabs)/inspections')}
                            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex-row items-center active:scale-95 transition-all"
                        >
                            <View className="w-14 h-14 bg-brand-light rounded-2xl items-center justify-center mr-4">
                                <MapPin color="#DC2626" size={28} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-brand-dark font-bold text-lg">{nextStop.inspection.building.name}</Text>
                                <Text className="text-brand-muted text-sm">{nextStop.inspection.building.address}</Text>
                                <View className="bg-blue-50 self-start px-2 py-1 rounded-md mt-2">
                                    <Text className="text-blue-600 text-xs font-bold">Siguiente Parada</Text>
                                </View>
                            </View>
                            <ChevronRight color="#94a3b8" size={24} />
                        </TouchableOpacity>
                    ) : (
                        <View className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm items-center">
                            <Text className="text-brand-muted text-center">No hay ruta activa para hoy.</Text>
                        </View>
                    )}
                </View>

                {/* Recent Alerts */}
                <View className="mb-8">
                    <Text className="text-brand-dark text-xl font-bold mb-4">Alertas de Seguridad</Text>
                    <View className="bg-red-50 p-5 rounded-3xl border border-red-100 flex-row items-start">
                        <AlertTriangle color="#DC2626" size={24} className="mt-1 mr-4" />
                        <View className="flex-1">
                            <Text className="text-brand-red font-bold text-lg mb-1">Sistema Activo</Text>
                            <Text className="text-brand-dark/70 text-sm leading-relaxed">
                                Reporte cualquier incidente de seguridad inmediatamente usando el botón de pánico en el mapa.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
