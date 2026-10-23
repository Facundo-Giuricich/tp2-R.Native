import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: 'index',
};

export default function LayoutCarrito() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      <Stack.Screen
        name="nota"
        options={{ title: 'Nota', presentation: 'formSheet', sheetAllowedDetents: [0.5, 0.9] }}
      />
    </Stack>
  );
}
