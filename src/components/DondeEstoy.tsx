import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { Text, View } from 'react-native';

const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segmentos = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={{ marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8 }}>
      <Text style={{ fontWeight: 'bold' }}>Donde estoy?</Text>
      <Text>usePathname: {pathname}</Text>
      <Text>useSegments: {JSON.stringify(segmentos)}</Text>
      <Text>useLocalSearchParams: {JSON.stringify(params)}</Text>
    </View>
  );
}
