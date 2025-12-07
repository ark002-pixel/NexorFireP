import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../lib/api';
import { Navigation, AlertTriangle, MapPin } from 'lucide-react-native';
import { useFocusEffect } from 'expo-router';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
    const { user } = useAuth();
    const [location, setLocation] = useState<any>(null);
    const [activeRoute, setActiveRoute] = useState<any>(null);
    const [incidents, setIncidents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            if (user?.id) {
                // 1. Get Current Location
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permiso denegado', 'Se requiere acceso a la ubicación para el mapa.');
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation.coords);

                // 2. Fetch Active Route
                const routeData = await apiRequest(`/routes?inspectorId=${user.id}`);
                if (!routeData.message) {
                    setActiveRoute(routeData);
                }

                // 3. Fetch Nearby Incidents
                if (currentLocation) {
                    const incidentsData = await apiRequest(
                        `/incidents?lat=${currentLocation.coords.latitude}&lng=${currentLocation.coords.longitude}&radius=5`
                    );
                    if (Array.isArray(incidentsData)) {
                        setIncidents(incidentsData);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [user])
    );

    if (loading || !location) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50">
                <ActivityIndicator size="large" color="#0f172a" />
                <Text className="text-slate-500 mt-4">Obteniendo ubicación...</Text>
            </View>
        );
    }

    const routeCoordinates = activeRoute?.stops?.map((stop: any) => ({
        latitude: stop.inspection.building.latitude,
        longitude: stop.inspection.building.longitude,
    })) || [];

    // Add current location to start of route for visualization
    if (location) {
        routeCoordinates.unshift({
            latitude: location.latitude,
            longitude: location.longitude
        });
    }

    return (
        <View className="flex-1">
            <MapView
                style={{ width, height }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {/* Route Path */}
                {routeCoordinates.length > 1 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#0F172A" // brand-dark
                        strokeWidth={4}
                    />
                )}

                {/* Inspection Stops */}
                {activeRoute?.stops?.map((stop: any, index: number) => (
                    <Marker
                        key={stop.id}
                        coordinate={{
                            latitude: stop.inspection.building.latitude,
                            longitude: stop.inspection.building.longitude,
                        }}
                        title={`${index + 1}. ${stop.inspection.building.name}`}
                        description={stop.inspection.building.address}
                        pinColor={stop.status === 'Completed' ? '#10B981' : '#0F172A'} // emerald-500 : brand-dark
                    />
                ))}

                {/* Safety Incidents */}
                {incidents.map((incident: any) => (
                    <View key={incident.id}>
                        <Marker
                            coordinate={{
                                latitude: incident.latitude,
                                longitude: incident.longitude,
                            }}
                            title={incident.type}
                            description={incident.description}
                        >
                            <View className="bg-red-50 p-2 rounded-full border border-brand-red">
                                <AlertTriangle size={20} color="#DC2626" />
                            </View>
                        </Marker>
                        <Circle
                            center={{
                                latitude: incident.latitude,
                                longitude: incident.longitude,
                            }}
                            radius={incident.radius * 1000} // Convert km to meters
                            fillColor="rgba(220, 38, 38, 0.1)"
                            strokeColor="rgba(220, 38, 38, 0.4)"
                        />
                    </View>
                ))}
            </MapView>

            {/* Floating Action Button for Navigation */}
            <View className="absolute bottom-6 right-6">
                <TouchableOpacity
                    className="bg-brand-dark p-4 rounded-full shadow-lg shadow-brand-dark/30"
                    onPress={() => Alert.alert('Navegación', 'Iniciando navegación GPS...')}
                >
                    <Navigation color="white" size={24} />
                </TouchableOpacity>
            </View>

            {/* Safety Alert Button */}
            <View className="absolute bottom-6 left-6">
                <TouchableOpacity
                    className="bg-brand-red p-4 rounded-full shadow-lg shadow-brand-red/30"
                    onPress={() => Alert.alert('Emergencia', 'Reportando incidente de seguridad...')}
                >
                    <AlertTriangle color="white" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
