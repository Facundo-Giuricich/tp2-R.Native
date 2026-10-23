import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { estilos } from '@/components/estilos';
import { FilaPlato } from '@/components/FilaPlato';
import { Pantalla } from '@/components/Pantalla';
import { CATEGORIAS, PLATOS } from '@/data/platos';

export default function Menu() {
  return (
    <Pantalla>
      {CATEGORIAS.map((categoria) => (
        <View key={categoria} style={{ gap: 8 }}>
          <Text style={estilos.titulo}>{categoria}</Text>
          <Link href={{ pathname: '/categorias/[categoria]', params: { categoria } }} style={estilos.link}>
            Ver solo {categoria}
          </Link>
          {PLATOS.filter((p) => p.categoria === categoria).map((plato) => (
            <FilaPlato key={plato.id} plato={plato} />
          ))}
        </View>
      ))}
    </Pantalla>
  );
}
