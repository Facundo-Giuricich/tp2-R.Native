import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { estilos } from '@/components/estilos';
import { FilaPlato } from '@/components/FilaPlato';
import { Pantalla } from '@/components/Pantalla';
import { CATEGORIAS, PLATOS } from '@/data/platos';

export default function Categoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  if (!CATEGORIAS.includes(categoria)) {
    return (
      <Pantalla>
        <Text style={estilos.aviso}>La categoria "{categoria}" no existe</Text>
      </Pantalla>
    );
  }

  const platos = PLATOS.filter((p) => p.categoria === categoria);

  return (
    <Pantalla>
      <Stack.Screen options={{ title: categoria }} />
      {platos.map((plato) => (
        <FilaPlato key={plato.id} plato={plato} />
      ))}
    </Pantalla>
  );
}
