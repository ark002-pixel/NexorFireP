# NexorFire Mobile App

Esta es la aplicación móvil nativa para inspectores, construida con React Native y Expo.

## Requisitos
- Node.js (ya instalado)
- Aplicación "Expo Go" instalada en tu celular (Android o iOS)

## Cómo iniciar

1. Abre una terminal en esta carpeta:
   ```bash
   cd mobile-app
   ```

2. Ejecuta el servidor de desarrollo:
   ```bash
   npx expo start
   ```

3. Escanea el código QR que aparecerá en la terminal con la app **Expo Go** de tu celular.

## Estructura
- `app/`: Pantallas de la aplicación (Login, Dashboard, Rutas).
- `lib/api.ts`: Configuración de conexión con el backend.
- `components/`: Componentes reutilizables.

## Notas
- Asegúrate de que tu PC y tu celular estén en la misma red Wi-Fi.
- Si tienes problemas de conexión, revisa la IP en `lib/api.ts`.
