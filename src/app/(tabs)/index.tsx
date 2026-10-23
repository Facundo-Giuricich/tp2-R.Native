import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

export default function Inicio() {
  const { usuario } = useComedor();

  return (
    <Pantalla>
      <Text style={estilos.titulo}>Bienvenido al Comedor IPF</Text>
      <Text style={estilos.texto}>Pedi tu comida y retirala cuando salga tu turno.</Text>

      <Link href="/menu" asChild>
        <Pressable style={estilos.tarjeta}>
          <Text style={estilos.titulo}>Menu</Text>
          <Text style={estilos.textoGris}>Ver todos los platos</Text>
        </Pressable>
      </Link>

      <Link href="/buscar" asChild>
        <Pressable style={estilos.tarjeta}>
          <Text style={estilos.titulo}>Buscar</Text>
          <Text style={estilos.textoGris}>Buscar un plato por nombre</Text>
        </Pressable>
      </Link>

      <Link href="/ayuda" asChild>
        <Pressable style={estilos.tarjeta}>
          <Text style={estilos.titulo}>Ayuda</Text>
          <Text style={estilos.textoGris}>Horarios, pagos y turnos</Text>
        </Pressable>
      </Link>

      <Link href={usuario ? '/cocina' : '/login'} asChild>
        <Pressable style={estilos.tarjeta}>
          <Text style={estilos.titulo}>Cocina</Text>
          <Text style={estilos.textoGris}>Solo para el personal</Text>
        </Pressable>
      </Link>
    </Pantalla>
  );
}
