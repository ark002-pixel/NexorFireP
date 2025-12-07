
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react-native';
import { apiRequest } from '../lib/api';

export default function InspectionsScreen() {
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadInspections();
    }, []);

    const loadInspections = async () => {
        try {
            const data = await apiRequest('/inspections');
            setInspections(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: any) => (
        <View className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-blue-500">
            <View className="flex-row justify-between mb-2">
                <Text className="font-bold text-gray-800 text-lg">{item.building.name}</Text>
                <View className="bg-blue-100 px-2 py-1 rounded-md">
                    <Text className="text-blue-700 text-xs font-bold">
                        {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center mb-1">
                <MapPin size={14} color="#6B7280" />
                <Text className="text-gray-500 text-sm ml-1">{item.building.address}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-surface px-4 pt-4">
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-gray-800">Asignaciones</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0f172a" />
            ) : (
                <FlatList
                    data={inspections}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text className="text-center text-gray-500 mt-10">No hay inspecciones asignadas</Text>
                    }
                />
            )}
        </SafeAreaView>
    );
}
