import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { LogOut, Settings, User, Shield, Bell } from 'lucide-react-native';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.replace('/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-brand-light">
            <View className="px-4 pt-4">
                <Text className="text-2xl font-bold text-brand-dark mb-6">Mi Perfil</Text>

                {/* Profile Card */}
                <View className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6 items-center">
                    <View className="w-20 h-20 bg-brand-muted/10 rounded-full items-center justify-center mb-4">
                        <Text className="text-brand-dark font-bold text-2xl">{user?.name?.[0] || 'I'}</Text>
                    </View>
                    <Text className="text-xl font-bold text-brand-dark">{user?.name || 'Inspector'}</Text>
                    <Text className="text-brand-muted">{user?.email || 'inspector@nexorfire.com'}</Text>
                    <View className="bg-brand-dark/10 px-3 py-1 rounded-full mt-3">
                        <Text className="text-brand-dark text-xs font-bold">INSPECTOR CERTIFICADO</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <MenuItem icon={<User size={20} color="#64748B" />} label="Editar Perfil" />
                    <MenuItem icon={<Bell size={20} color="#64748B" />} label="Notificaciones" />
                    <MenuItem icon={<Shield size={20} color="#64748B" />} label="Seguridad y Privacidad" />
                    <MenuItem icon={<Settings size={20} color="#64748B" />} label="Configuración de App" />
                </View>

                <TouchableOpacity
                    onPress={handleLogout}
                    className="mt-8 bg-red-50 p-4 rounded-xl flex-row items-center justify-center border border-red-100 active:bg-red-100"
                >
                    <LogOut size={20} color="#DC2626" className="mr-2" />
                    <Text className="text-brand-red font-bold">Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

function MenuItem({ icon, label }: { icon: any, label: string }) {
    return (
        <TouchableOpacity className="flex-row items-center p-4 border-b border-slate-50 active:bg-slate-50">
            {icon}
            <Text className="flex-1 ml-3 text-brand-dark font-medium">{label}</Text>
            <Settings size={16} color="#CBD5E1" />
        </TouchableOpacity>
    );
}
