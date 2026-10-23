import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

import { estilos } from '@/components/estilos';
import { FilaPlato } from '@/components/FilaPlato';
import { Pantalla } from '@/components/Pantalla';
import { CATEGORIAS, PLATOS } from '@/data/platos';

export default function Buscar() {
  const { q = '', categoria = '' } = useLocalSearchParams<{ q?: string; categoria?: string }>();

  const resultados = PLATOS.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(q.toLowerCase());
    const coincideCategoria = categoria === '' || p.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  return (
    <Pantalla>
      <TextInput
        style={estilos.input}
        placeholder="Buscar un plato"
        value={q}
        onChangeText={(texto) => router.setParams({ q: texto })}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Pressable onPress={() => router.setParams({ categoria: '' })}>
          <Text style={categoria === '' ? estilos.link : estilos.texto}>todas</Text>
        </Pressable>
        {CATEGORIAS.map((c) => (
          <Pressable key={c} onPress={() => router.setParams({ categoria: c })}>
            <Text style={categoria === c ? estilos.link : estilos.texto}>{c}</Text>
          </Pressable>
        ))}
      </View>

      {resultados.length === 0 && <Text style={estilos.aviso}>No se encontraron platos</Text>}

      {resultados.map((plato) => (
        <FilaPlato key={plato.id} plato={plato} />
      ))}
    </Pantalla>
  );
}
