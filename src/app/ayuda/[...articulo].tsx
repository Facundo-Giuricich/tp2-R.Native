import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { ARTICULOS } from '@/data/ayuda';

export default function Articulo() {
  // articulo es un array, por ejemplo ["pagos", "efectivo"]
  const { articulo } = useLocalSearchParams<{ articulo: string[] }>();
  const ruta = articulo.join('/');
  const texto = ARTICULOS[ruta];

  return (
    <Pantalla>
      <Text style={estilos.titulo}>/ayuda/{ruta}</Text>
      {texto ? (
        <Text style={estilos.texto}>{texto}</Text>
      ) : (
        <Text style={estilos.aviso}>No existe ese articulo de ayuda</Text>
      )}
    </Pantalla>
  );
}
