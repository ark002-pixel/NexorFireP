import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Building2, Clock } from 'lucide-react-native';
import { apiRequest } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function InspectionsScreen() {
    const [inspections, setInspections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

    const fetchInspections = async () => {
        try {
            if (user?.id) {
                const data = await apiRequest(`/inspections?inspectorId=${user.id}`);
                setInspections(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchInspections();
    }, [user]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchInspections();
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getPriorityColor = (priority: number) => {
        switch (priority) {
            case 2: return { bg: 'bg-red-50', text: 'text-brand-red', label: 'CRÍTICA' };
            case 1: return { bg: 'bg-orange-50', text: 'text-orange-600', label: 'ALTA' };
            default: return { bg: 'bg-blue-50', text: 'text-blue-600', label: 'NORMAL' };
        }
    };

    const handleComplete = async (id: string) => {
        try {
            setLoading(true);
            await apiRequest(`/inspections/${id}`, 'PUT', { status: 'Completed' });
            // Refresh list
            fetchInspections();
        } catch (error) {
            console.error(error);
            alert('Error al completar la inspección');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-brand-light">
            <View className="px-5 pt-6 pb-4">
                <Text className="text-3xl font-bold text-brand-dark mb-6 tracking-tight">Mis Inspecciones</Text>

                {/* Search Bar */}
                <View className="flex-row gap-4 mb-2">
                    <View className="flex-1 bg-white flex-row items-center px-5 py-4 rounded-2xl border border-slate-100 shadow-sm">
                        <Search color="#94a3b8" size={22} />
                        <Text className="text-brand-muted ml-3 text-base">Buscar...</Text>
                    </View>
                    <TouchableOpacity className="bg-brand-dark w-14 items-center justify-center rounded-2xl shadow-lg shadow-brand-dark/20">
                        <Filter color="white" size={22} />
                    </TouchableOpacity>
                </View>
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#DC2626" />
                </View>
            ) : (
                <FlatList
                    data={inspections}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#DC2626" />
                    }
                    ListEmptyComponent={
                        <View className="items-center mt-12">
                            <Text className="text-brand-muted text-lg">No hay inspecciones asignadas.</Text>
                        </View>
                    }
                    renderItem={({ item }) => {
                        const priorityStyle = getPriorityColor(item.priority || 0);
                        return (
                            <TouchableOpacity className="bg-white p-5 rounded-3xl mb-5 border border-slate-100 shadow-sm active:scale-95 transition-all">
                                <View className="flex-row justify-between items-start mb-3">
                                    <View className={`px-3 py-1.5 rounded-lg ${priorityStyle.bg}`}>
                                        <Text className={`text-xs font-bold ${priorityStyle.text} tracking-wide`}>
                                            {priorityStyle.label}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center bg-slate-50 px-2 py-1 rounded-lg">
                                        <Clock size={14} color="#64748b" className="mr-1.5" />
                                        <Text className="text-brand-muted text-xs font-medium">{formatTime(item.date)}</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center mb-1">
                                    <Building2 size={20} color="#0F172A" className="mr-3" />
                                    <Text className="text-brand-dark font-bold text-xl flex-1" numberOfLines={1}>{item.building.name}</Text>
                                </View>
                                <Text className="text-brand-muted text-sm ml-8 mb-4">{item.building.address}</Text>

                                <View className="pt-4 border-t border-slate-50 flex-row justify-between items-center">
                                    <View className="flex-row items-center">
                                        <View className={`w-2 h-2 rounded-full mr-2 ${item.status === 'Completed' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                        <Text className={`text-sm font-medium ${item.status === 'Completed' ? 'text-emerald-600' : 'text-brand-muted'
                                            }`}>
                                            {item.status === 'Completed' ? 'Completada' : 'Pendiente'}
                                        </Text>
                                    </View>

                                    {item.status !== 'Completed' && (
                                        <TouchableOpacity
                                            onPress={() => handleComplete(item.id)}
                                            className="bg-brand-red px-5 py-2.5 rounded-xl shadow-md shadow-brand-red/20"
                                        >
                                            <Text className="text-white font-bold text-xs tracking-wide">COMPLETAR</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </SafeAreaView>
    );
}
