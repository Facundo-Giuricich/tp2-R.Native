import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

export default function Nota() {
  const { nota, setNota } = useComedor();
  const [texto, setTexto] = useState(nota);

  function guardar() {
    setNota(texto);
    router.back();
  }

  return (
    <Pantalla>
      <Text style={estilos.texto}>Aclaracion para la cocina (ej: sin sal)</Text>
      <TextInput style={estilos.input} value={texto} onChangeText={setTexto} />
      <Boton titulo="Guardar" onPress={guardar} />
    </Pantalla>
  );
}
