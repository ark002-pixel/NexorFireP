import * as SecureStore from 'expo-secure-store';

// Replace with your computer's IP address
const API_URL = 'http://192.168.20.152:3000/api/mobile';

export async function apiRequest(endpoint: string, method: string = 'GET', body?: any) {
    try {
        const token = await SecureStore.getItemAsync('auth_token');

        const headers: any = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config: any = {
            method,
            headers,
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        console.log(`Requesting: ${API_URL}${endpoint}`);
        const response = await fetch(`${API_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API Request Failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
