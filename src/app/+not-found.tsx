import { Link, Stack, usePathname } from 'expo-router';
import { Text } from 'react-native';

import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';

export default function NoEncontrado() {
  const pathname = usePathname();

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Error 404' }} />
      <Text style={estilos.titulo}>Pagina no encontrada</Text>
      <Text style={estilos.texto}>La direccion {pathname} no existe.</Text>
      <Link href="/" style={estilos.link}>
        Ir al inicio
      </Link>
    </Pantalla>
  );
}
