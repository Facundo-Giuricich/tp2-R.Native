import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: 'index',
};

export default function LayoutMenu() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Menu' }} />
    </Stack>
  );
}
