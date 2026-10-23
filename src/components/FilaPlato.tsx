import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { Plato } from '@/data/platos';

import { estilos } from './estilos';

export function FilaPlato({ plato }: { plato: Plato }) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: plato.id } }} asChild>
      <Pressable style={estilos.tarjeta}>
        <Text style={estilos.texto}>{plato.nombre}</Text>
        <Text style={estilos.textoGris}>${plato.precio}</Text>
      </Pressable>
    </Link>
  );
}
