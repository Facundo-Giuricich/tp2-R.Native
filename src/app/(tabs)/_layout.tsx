import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';

import { useComedor } from '@/context/ComedorContext';

export default function LayoutTabs() {
  const { carrito } = useComedor();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarBadge: carrito.length > 0 ? carrito.length : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
