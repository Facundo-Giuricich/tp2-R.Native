import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { PLATOS } from '@/data/platos';

export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useComedor();

  // El id llega como texto, por eso lo paso a numero.
  const plato = PLATOS.find((p) => p.id === Number(id));

  if (!plato) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <Text style={estilos.aviso}>No existe el plato {id}</Text>
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: plato.nombre }} />
      <Text style={estilos.titulo}>{plato.nombre}</Text>
      <Text style={estilos.texto}>Precio: ${plato.precio}</Text>
      <Text style={estilos.texto}>{plato.descripcion}</Text>
      <Boton titulo="Agregar al carrito" onPress={() => agregarAlCarrito(plato.id)} />
    </Pantalla>
  );
}
