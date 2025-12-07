import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, Mail } from 'lucide-react-native';
import { apiRequest } from '../lib/api';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingrese correo y contraseña');
            return;
        }

        setLoading(true);
        try {
            const response = await apiRequest('/auth/login', 'POST', { email, password });

            if (response.token && response.user) {
                await signIn(response.token, response.user);
                router.replace('/(tabs)');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Credenciales inválidas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-brand-dark justify-center px-6">
            <View className="items-center mb-12">
                {/* Logo Area */}
                <View className="w-24 h-24 bg-brand-red rounded-3xl items-center justify-center mb-6 shadow-2xl shadow-brand-red/50">
                    <Text className="text-white text-5xl font-bold">N</Text>
                </View>
                <Text className="text-4xl font-bold text-white tracking-tight">NexorFire</Text>
                <Text className="text-brand-muted mt-2 text-lg">Acceso a Inspectores</Text>
            </View>

            <View className="space-y-5">
                <View className="flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-4 border border-slate-700">
                    <Mail color="#94a3b8" size={22} />
                    <TextInput
                        className="flex-1 ml-4 text-white text-lg"
                        placeholder="Correo Electrónico"
                        placeholderTextColor="#64748b"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View className="flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-4 border border-slate-700">
                    <Lock color="#94a3b8" size={22} />
                    <TextInput
                        className="flex-1 ml-4 text-white text-lg"
                        placeholder="Contraseña"
                        placeholderTextColor="#64748b"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={loading}
                    className="bg-brand-red py-4 rounded-2xl items-center shadow-lg shadow-brand-red/30 mt-8 active:opacity-90"
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-bold text-xl">Iniciar Sesión</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
