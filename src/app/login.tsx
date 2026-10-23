import { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

export default function Login() {
  const { iniciarSesion } = useComedor();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(false);

  // No hace falta navegar: Stack.Protected cierra el login solo.
  function ingresar() {
    const ok = iniciarSesion(usuario, clave);
    setError(!ok);
  }

  return (
    <Pantalla>
      <Text style={estilos.texto}>Usuario</Text>
      <TextInput style={estilos.input} value={usuario} onChangeText={setUsuario} autoCapitalize="none" />
      <Text style={estilos.texto}>Clave</Text>
      <TextInput style={estilos.input} value={clave} onChangeText={setClave} secureTextEntry />
      {error && <Text style={estilos.aviso}>Usuario o clave incorrectos</Text>}
      <Boton titulo="Ingresar" onPress={ingresar} />
      <Text style={estilos.textoGris}>Usuario: cocina - Clave: 1234</Text>
    </Pantalla>
  );
}
