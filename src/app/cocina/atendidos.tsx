import { Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

export default function Atendidos() {
  const { pilaAtendidos, cerrarSesion } = useComedor();

  // aArray va de la base al tope, lo doy vuelta para mostrar el ultimo primero
  const lista = pilaAtendidos.aArray().reverse();

  return (
    <Pantalla>
      {lista.length === 0 && <Text style={estilos.aviso}>Todavia no se atendio ningun pedido</Text>}

      {lista.map((pedido) => (
        <View key={pedido.numero} style={estilos.tarjeta}>
          <Text style={estilos.titulo}>Turno {pedido.numero}</Text>
          <Text style={estilos.textoGris}>{pedido.platos.map((p) => p.nombre).join(', ')}</Text>
        </View>
      ))}

      <Boton titulo="Cerrar sesion" onPress={cerrarSesion} />
    </Pantalla>
  );
}
