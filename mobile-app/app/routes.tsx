
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Navigation, CheckCircle } from 'lucide-react-native';
import { apiRequest } from '../lib/api';

export default function RouteScreen() {
    const [route, setRoute] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadRoute();
    }, []);

    const loadRoute = async () => {
        try {
            const data = await apiRequest('/routes');
            if (!data.message) { // Check if not 404 message
                setRoute(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const openMaps = (lat: number, lng: number) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        Linking.openURL(url);
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-surface justify-center items-center">
                <ActivityIndicator size="large" color="#0f172a" />
            </SafeAreaView>
        );
    }

    if (!route) {
        return (
            <SafeAreaView className="flex-1 bg-surface px-4 pt-4">
                <TouchableOpacity onPress={() => router.back()} className="mb-6">
                    <ArrowLeft size={24} color="#1F2937" />
                </TouchableOpacity>
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-500 text-lg">No hay ruta activa</Text>
                </View>
            </SafeAreaView>
        );
    }

    const currentStop = route.stops.find((s: any) => s.status === 'Pending') || route.stops[0];
    const nextStops = route.stops.filter((s: any) => s.sequence > currentStop.sequence);

    return (
        <SafeAreaView className="flex-1 bg-surface px-4 pt-4">
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-gray-800">Ruta Activa</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Current Stop Card */}
                <View className="bg-primary p-6 rounded-2xl shadow-lg mb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="bg-white/20 px-3 py-1 rounded-full">
                            <Text className="text-white text-xs font-bold">PARADA #{currentStop.sequence}</Text>
                        </View>
                        <Text className="text-white/80 text-xs">Est. 15 min</Text>
                    </View>

                    <Text className="text-white text-2xl font-bold mb-2">{currentStop.inspection.building.name}</Text>
                    <Text className="text-white/80 text-base mb-6">{currentStop.inspection.building.address}</Text>

                    <View className="flex-row gap-4">
                        <TouchableOpacity
                            className="flex-1 bg-white py-3 rounded-xl flex-row justify-center items-center"
                            onPress={() => openMaps(currentStop.inspection.building.latitude, currentStop.inspection.building.longitude)}
                        >
                            <Navigation size={18} color="#0f172a" />
                            <Text className="text-primary font-bold ml-2">Navegar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-1 bg-white/20 py-3 rounded-xl flex-row justify-center items-center border border-white/30">
                            <CheckCircle size={18} color="white" />
                            <Text className="text-white font-bold ml-2">Llegué</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Timeline */}
                <Text className="text-gray-800 font-bold text-lg mb-4">Siguientes Paradas</Text>

                {nextStops.map((stop: any, index: number) => (
                    <View key={stop.id} className="flex-row mb-6">
                        <View className="items-center mr-4">
                            <View className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center z-10">
                                <Text className="text-gray-600 font-bold text-xs">{stop.sequence}</Text>
                            </View>
                            {index !== nextStops.length - 1 && (
                                <View className="w-0.5 h-full bg-gray-200 absolute top-8" />
                            )}
                        </View>

                        <View className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <Text className="font-bold text-gray-800">{stop.inspection.building.name}</Text>
                            <Text className="text-gray-500 text-sm">{stop.inspection.building.address}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
