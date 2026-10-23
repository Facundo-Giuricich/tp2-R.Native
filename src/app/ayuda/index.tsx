import { Link } from 'expo-router';
import { Text } from 'react-native';

import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { ARTICULOS } from '@/data/ayuda';

export default function Ayuda() {
  const rutas = Object.keys(ARTICULOS);

  return (
    <Pantalla>
      <Text style={estilos.titulo}>Temas de ayuda</Text>
      {rutas.map((ruta) => (
        <Link key={ruta} href={`/ayuda/${ruta}`} style={estilos.link}>
          /ayuda/{ruta}
        </Link>
      ))}
    </Pantalla>
  );
}
