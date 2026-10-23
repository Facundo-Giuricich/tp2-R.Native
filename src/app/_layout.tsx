import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ComedorProvider, useComedor } from '@/context/ComedorContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ComedorProvider>
        <NavegacionRaiz />
      </ComedorProvider>
    </GestureHandlerRootView>
  );
}

function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoria' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="confirmar" options={{ title: 'Confirmar pedido', presentation: 'modal' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...articulo]" options={{ title: 'Ayuda' }} />

      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ title: 'Ingreso cocina', presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
