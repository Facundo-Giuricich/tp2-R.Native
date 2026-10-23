# Trabajo Práctico N° 2: Respuestas (Partes A a F)

**Taller Complementario: React Native II** · Instituto Politécnico Formosa
**Alumno/a:** Facundo · **Proyecto:** Comedor IPF (Expo SDK 57, expo-router 57.0.29)

---

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

**a)**

- **LIFO** (*Last In, First Out*): el último que entra es el primero que sale. Corresponde a la **pila**.
- **FIFO** (*First In, First Out*): el primero que entra es el primero que sale. Corresponde a la **cola**.

**b)**

- **Pila:** el elemento entra y sale por **el mismo extremo**, el **tope**. Por el otro extremo (la base) nunca sale nada.
- **Cola:** el elemento entra por el **final** y sale por el **frente**, o sea, por extremos opuestos.

**c)**

| Estructura | Vida real | Aplicación móvil |
|---|---|---|
| Pila | Una pila de platos para lavar: se agarra siempre el de arriba. | El historial de pantallas y el botón "atrás". También el "deshacer" (Ctrl+Z) de un editor. |
| Cola | La fila del comedor o del banco: se atiende primero al que llegó primero. | Los mensajes de WhatsApp que se mandan sin conexión y salen en orden. También la cola de descargas o de impresión. |

### A2. Seguimiento de una pila

| # | Salida | Explicación |
|---|---|---|
| (1) | `Perfil` | Antes del primer log la pila quedó en `[Inicio, Productos, Perfil]`: "Detalle 3" entró y salió con el `pop()`. |
| (2) | `Perfil` | `pop()` saca el tope y lo devuelve. |
| (3) | `Productos` | Ahora el tope es Productos. |
| (4) | `false` | Todavía quedan 2 elementos. `vacia` es un *getter*, por eso se escribe sin paréntesis. |

**Estado final (de base a tope):** `[ 'Inicio', 'Productos' ]`

### A3. Seguimiento de una cola

| # | Salida | Explicación |
|---|---|---|
| (1) | `Beto` | Ana fue desencolada. Antes del primer log la cola es `[Beto, Caro, Dani]` y Beto está al frente. |
| (2) | `Beto` | `desencolar()` saca el frente y lo devuelve. |
| (3) | `false` | Quedan Caro y Dani. |

**Estado final (de frente a final):** `[ 'Caro', 'Dani' ]`

> Las dos respuestas las verifiqué ejecutando las clases del proyecto (`src/estructuras/`).

### A4. Análisis de la implementación

**a)** El `#` declara un **campo privado** de la clase (JavaScript estándar, desde ES2022). Solo se puede usar dentro de la clase: si se escribe `p.#items` desde afuera, hay un error de sintaxis. Así nadie puede manipular el array directamente (`items.splice(1, 1)`, `items[0] = ...`, `items.unshift(...)`) y romper las reglas de la estructura. Por ejemplo, no se puede sacar un elemento del medio de la pila ni "colar" a alguien adelante en la cola. Es **encapsulamiento**: la única forma de usar la estructura es a través de sus métodos.

**b)** `shift()` saca el primer elemento y **corre todos los demás un lugar** para reacomodar los índices. Eso es **O(n)** por cada desencolar, y vaciar una cola de *n* elementos llega a costar **O(n²)**. Con colas grandes se vuelve lento. Las colas "serias" lo resuelven con:

- un **índice (puntero) al frente**: desencolar solo lo avanza, O(1);
- un **buffer circular** (array de tamaño fijo con índices de inicio y fin que dan la vuelta);
- una **lista enlazada** con referencias al primero y al último.

**c)** La pila saca con **`pop()`** (del final) y la cola con **`shift()`** (del principio). Las dos agregan con `push()` al final. No pueden sacar con el mismo método porque esa es justamente la diferencia entre las dos estructuras: una cola que sacara con `pop()` devolvería el **último** que llegó y se comportaría como una pila (LIFO). Para ser FIFO tiene que sacar por el extremo **opuesto** al que entra.

### A5. Programación: una cola eficiente

```js
class ColaEficiente {
  #items = [];
  #frente = 0; // índice del elemento que está al frente

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const x = this.#items[this.#frente];
    this.#frente++; // en vez de shift() solo avanzo el índice
    return x;
  }

  frente() {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}
```

Con este método, `desencolar` es O(1). Esta misma clase, en TypeScript y con `aArray()`, es la `Cola` del proyecto: [src/estructuras/Cola.ts](src/estructuras/Cola.ts).

### A6. Pila y cola dentro de Expo Router

**a)** El historial de pantallas de un Stack es una **pila**. La pantalla **visible es el tope**. Navegar con `push` apila una pantalla nueva y "atrás" (`router.back()`, el botón del header o el gesto) hace **`pop`**: saca el tope y deja visible la de abajo.

**b)** Las acciones de navegación pasan por una **cola** (FIFO). Expo Router tiene internamente un `routingQueue`: cada `router.push`, cada toque de `<Link>`, etc. se **encola**, y después se procesan **en orden de llegada, una por una**. Si el usuario toca dos links muy rápido, **las dos acciones se ejecutan, y en el orden en que se tocaron**: con dos `push`, queda la primera pantalla y la segunda encima, y se ve la segunda. Ninguna se pierde ni se mezcla. Si no se quiere apilar duplicados, se usa `navigate` o la opción `dangerouslySingular`.

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | **`/`**. El grupo `(tabs)` no aparece en la URL. Es la pantalla de inicio dentro de las pestañas. |
| `src/app/acerca.tsx` | **`/acerca`**, en el Stack raíz (fuera de las tabs). |
| `src/app/(tabs)/perfil.tsx` | **`/perfil`**, una pestaña. |
| `src/app/(tabs)/productos/index.tsx` | **`/productos`**. El `index` de la carpeta. |
| `src/app/(tabs)/productos/[id].tsx` | **`/productos/:id`**, ruta dinámica (`/productos/3`, `/productos/abc`…). `id` llega como string. |
| `src/app/docs/[...slug].tsx` | **`/docs/*`**, catch-all: `/docs/a`, `/docs/a/b/c`… `slug` es un array de segmentos. |
| `src/app/_layout.tsx` | **No genera URL.** Es el layout raíz: define el navegador que envuelve a todas las rutas (y ahí van los providers). |
| `src/app/+not-found.tsx` | **No tiene URL fija.** Es la pantalla 404 que se muestra para **cualquier** URL que no coincida con ninguna ruta. |
| `src/app/Boton.tsx` | **Problema:** genera la ruta **`/Boton`**. Todo archivo dentro de `app/` se convierte en pantalla. Si es un componente sin `export default` de pantalla, además da un warning o error. Hay que moverlo a `src/components/`. |

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` (los parámetros `?q=…` no van en el nombre del archivo) |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` (catch-all: profundidad variable) |
| `/ayuda` (con una pantalla propia) | `src/app/ayuda/index.tsx` |

### B3. Verdadero o falso

- **a) F.** En Expo Router las rutas se basan en archivos: crear el archivo en `src/app` ya crea la pantalla. No hay que registrarla en ninguna tabla. Declararla en el `_layout` es opcional y solo sirve para configurarla.
- **b) F.** Los `_layout.tsx` **no son pantallas visitables**. Definen el navegador (Stack, Tabs, Drawer) y envuelven a las pantallas de su carpeta.
- **c) V.**
- **d) F.** `npm install` trae la última versión publicada, que puede ser **incompatible** con el SDK del proyecto. Conviene usar **`npx expo install`**, que elige la versión compatible con SDK 57.
- **e) V.** `expo-router/entry` pasa a ser el punto de entrada, y la app se arma a partir de los archivos de `src/app` en lugar de `App.tsx`.
- **f) V.** `/_sitemap` lista todas las rutas de la app y es útil para depurar.
- **g) V.** Una ruta más específica le gana al catch-all, y `docs/index.tsx` atiende `/docs`.
- **h) V.** En SDK 57 los paquetes de Expo usan el mismo número mayor que el SDK. En este proyecto `expo-router` es la `57.0.29`.

---

## Parte C · Navegar: `<Link>`, `router` y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | **Apila** siempre una pantalla nueva en el tope, aunque ya exista. |
| `router.navigate(href)` | Si la pantalla del **tope** es la misma ruta, la **reutiliza** (solo cambia los params). Si no, **apila** una nueva. |
| `router.replace(href)` | **Reemplaza el tope**: saca la pantalla actual y pone la nueva en su lugar. La pila queda del mismo tamaño. |
| `router.back()` | **Pop**: saca el tope y vuelve a la pantalla de abajo. |
| `router.dismissTo(href)` | Hace **pop sucesivos hasta llegar a `href`**, si está en la pila. Si no está, la agrega. |
| `router.dismissAll()` | Hace pop de todo hasta dejar **solo la primera pantalla** (la base) del Stack. |
| `router.canGoBack()` | **No modifica** la pila. Devuelve `true` si hay alguna pantalla debajo a la que volver. |
| `router.setParams({...})` | **No modifica** la pila. Cambia los parámetros (y la URL) de la pantalla actual. |

### C2. Simulación de la pila

Pila inicial: `[ /productos ]`

| # | Instrucción | Pila resultante (base → tope) |
|---|---|---|
| 1 | `router.push("/productos/1")` | `[ /productos, /productos/1 ]` |
| 2 | `router.push("/productos/2")` | `[ /productos, /productos/1, /productos/2 ]` |
| 3 | `router.navigate("/productos/5")` | `[ /productos, /productos/1, /productos/5 ]`. El tope ya era la ruta `productos/[id]`, así que `navigate` la **reutiliza** cambiándole el parámetro (no apila). |
| 4 | `router.push("/perfil")` | `[ /productos, /productos/1, /productos/5, /perfil ]` |
| 5 | `router.replace("/buscar")` | `[ /productos, /productos/1, /productos/5, /buscar ]` |
| 6 | `router.back()` | `[ /productos, /productos/1, /productos/5 ]` |
| 7 | `router.dismissTo("/productos")` | `[ /productos ]` |
| 8 | `router.canGoBack()` | Devuelve **`false`**: queda una sola pantalla y no hay nada debajo. |

### C3. ¿Link o router?

- **a)** **`<Link>`** con `href={{ pathname: '/productos/[id]', params: { id } }}` (y `asChild` sobre un `Pressable` si la tarjeta es un componente propio). Es una acción directa del usuario: el link es accesible y en la web se convierte en un `<a>` real.
- **b)** **`router.replace('/exito')`** después del `await` de la API. La navegación depende de una lógica (que la API responda OK), así que va con `router`. Uso `replace` para que "atrás" no vuelva al formulario ya enviado.
- **c)** **`router.back()`**. Cerrar un modal es sacarlo del tope de la pila (pop).
- **d)** **`router.replace('/')`**, o directamente `Stack.Protected`. Pasa después de una lógica (validar el login). Va con `replace` para que el login no quede debajo y "atrás" no vuelva a él.
- **e)** **`router.dismissTo('/pedidos')`** (o un `<Link href="/pedidos" dismissTo>`). Saca de una vez las pantallas que hay arriba de la lista y vuelve a la que ya existe, sin apilar otra lista.

### C4. Escribí el código

```tsx
// a) Link con href como objeto
<Link href={{ pathname: '/productos/[id]', params: { id: '8' } }}>Ver producto 8</Link>

// b) Link que SIEMPRE apila
<Link href="/perfil" push>Ir a mi perfil</Link>

// c) Pressable propio como link, con asChild
<Link href="/carrito" asChild>
  <Pressable style={estilos.boton}>
    <Text style={estilos.textoBoton}>Ir al carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar

En la web, cada `<Link>` es un `<a href>` real, así que el usuario puede usar todo lo que el navegador ofrece para los enlaces:

- abrirlo en otra pestaña (clic del medio o Ctrl+clic);
- copiar la dirección del link para compartirla;
- ver adónde lleva al pasar el mouse;
- usar los botones atrás y adelante del navegador.

Además los buscadores (SEO) y los lectores de pantalla (accesibilidad) lo entienden como un enlace.

En el celular no hay barra de direcciones, pero **cada pantalla sigue teniendo una URL**. El usuario no la ve, pero es lo que permite los **deep links**: abrir una pantalla puntual desde una notificación, un link compartido por WhatsApp o un código QR (`comedoripf://menu/7`). El router traduce esa URL a la pantalla correspondiente.

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| **¿Apila pantallas?** | **Sí.** Cada pantalla nueva va arriba de la anterior. | **No.** Las pestañas son hermanas: se cambia de una a otra y cada una conserva su estado. | **No.** Cambia entre secciones del mismo nivel. |
| **¿Cómo cambia de pantalla el usuario?** | Toca links o botones para avanzar, y vuelve con "atrás", la flecha del header o el gesto de deslizar. | Toca los íconos de la barra de pestañas de abajo. | Abre el menú lateral (botón hamburguesa o deslizando desde el borde) y elige una opción. |
| **¿Desde dónde se importa en SDK 57?** | `import { Stack } from 'expo-router'` | `import { Tabs } from 'expo-router/js-tabs'` (importarlo desde `'expo-router'` está **deprecado**) | `import { Drawer } from 'expo-router/drawer'` |
| **Un caso de uso típico** | Lista de productos → detalle → otro detalle. | Las secciones principales de la app: Inicio, Menú, Carrito. | Un panel de administración con muchas secciones (por ejemplo, la cocina: pedidos y atendidos). |

### D2. Cada tab tiene su pila

Ve **el detalle del producto 4**. Las tabs no se desmontan al cambiar de pestaña, y Productos tiene **su propio Stack**, que conserva su pila (`[lista, detalle 4]`) mientras el usuario está en Inicio. Al volver a la pestaña se muestra el tope de esa pila, tal como quedó. Instagram, YouTube o WhatsApp se comportan así: si entrás a un perfil desde "Buscar", vas a "Inicio" y volvés a "Buscar", seguís en ese perfil.

### D3. ¿Dónde va cada pantalla?

- **a)** **Dentro de la tab** (en el Stack propio de la pestaña), así la barra de pestañas sigue visible.
- **b)** **Stack raíz**: lo que está en el Stack raíz se dibuja por encima del navegador de tabs y tapa la barra.
- **c)** **Stack raíz**, como modal.
- **d)** **Dentro de la tab** Perfil (en su Stack). Es parte de esa sección.

### D4. Configurar el Stack

**a)** `screenOptions` (en el `<Stack>`) son las opciones **por defecto para todas** las pantallas de ese navegador. Las `options` de un `<Stack.Screen>` se aplican **solo a esa pantalla** y pisan a las de `screenOptions`.

**b)** Porque `(tabs)` es otro navegador (Tabs) que ya dibuja su propio header, o cuyas pestañas tienen su Stack con header. Si el Stack raíz también mostrara el suyo, aparecerían **dos headers** apilados, y el de arriba diría "(tabs)".

**c)** **Sí existe.** Expo Router registra automáticamente todos los archivos de `src/app`, estén declarados o no. Declararla sirve para **configurarla**: título, `presentation`, header, orden, o para meterla dentro de un `Stack.Protected`.

**d)** Algunos valores son `'card'` (el normal), `'modal'`, `'transparentModal'`, `'fullScreenModal'`, `'formSheet'` y `'containedModal'`. Para una hoja inferior que se abre al 50% usaría **`'formSheet'`** con `sheetAllowedDetents: [0.5]` (o `[0.5, 0.9]` para que también se pueda agrandar).

**e)** Desde la propia pantalla de detalle se renderiza un `<Stack.Screen>` con las opciones:

```tsx
<Stack.Screen options={{ title: `Producto ${id}` }} />
```

También se puede usar `navigation.setOptions({ title: 'Producto 7' })` dentro de un `useEffect`.

### D5. Tabs y Drawer en SDK 57

**a)** En SDK 57, `import { Tabs } from 'expo-router'` quedó **deprecado**: las tabs de JavaScript se importan desde **`expo-router/js-tabs`**. La alternativa experimental son las **tabs nativas**, `NativeTabs`, desde `expo-router/unstable-native-tabs`. Usan la barra de pestañas real de iOS o Android.

**b)** El Drawer necesita **`react-native-gesture-handler`** (gestos) y **`react-native-reanimated`** (animaciones). Reanimated 4 además depende de `react-native-worklets`. Los tres se instalan con `npx expo install`. En el layout raíz conviene envolver todo con **`<GestureHandlerRootView style={{ flex: 1 }}>`** para que funcionen los gestos de deslizar.

**c)** **No.** Desde SDK 56 el Drawer viene **incluido dentro de `expo-router`** (`expo-router/drawer`, que usa `react-native-drawer-layout` por debajo). En este proyecto no está instalado `@react-navigation/drawer` y el Drawer funciona.

**d)** `router.back()` actúa sobre el **navegador más cercano** a la pantalla actual que pueda volver atrás. Si ese navegador no tiene adónde volver (está en su primera pantalla), la acción **sube al navegador padre**.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

Los parámetros de la URL **siempre llegan como texto**. `id` vale `"3"` (string) y `p.id` vale `3` (number), y `===` compara también el tipo: `3 === "3"` es `false`. Por eso `find` nunca encuentra nada. Por el mismo motivo `id === 3` nunca es verdadero (TypeScript incluso marca error, porque compara un `string` con un `number`).

Corrección: convertir el parámetro a número y validarlo.

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumero = Number(id);
  const producto = Number.isInteger(idNumero)
    ? productos.find((p) => p.id === idNumero)
    : undefined;

  if (idNumero === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

### E2. Catch-all

| URL | `slug` |
|---|---|
| `/docs/react` | `["react"]` |
| `/docs/react/hooks/useState` | `["react", "hooks", "useState"]` |
| `/docs` | **No coincide.** El catch-all necesita **al menos un segmento** después de `/docs`. Sin `docs/index.tsx`, `/docs` muestra la pantalla 404 (`+not-found`). Para tener una pantalla en `/docs` hay que crear `docs/index.tsx`. |

### E3. Anatomía de una URL

`rutasipf://buscar?q=mate&categoria=bebidas`

**a)**

- **scheme:** `rutasipf`
- **ruta:** `/buscar`
- **parámetros de búsqueda:** `q=mate` y `categoria=bebidas` (después del `?`, separados por `&`)

**b)** `{ q: "mate", categoria: "bebidas" }` (los dos valores como string).

**c)** **No.** Los corchetes son para **segmentos dinámicos de la ruta** (`/productos/3`). Los parámetros de búsqueda (`?q=...`) llegan a **cualquier** pantalla sin cambiar el nombre del archivo: alcanza con `buscar.tsx`.

**d)** Dos razones:

1. **No llena la pila:** con `push`, cada letra apilaría una pantalla nueva, y "atrás" recorrería letra por letra ("mat", "ma", "m"…).
2. **Conserva la pantalla:** se mantiene el mismo componente, el `TextInput` no pierde el foco ni el teclado y no hay animación de transición. Aun así la URL queda actualizada, así que la búsqueda se puede compartir.

### E4. ¿Dónde estoy?

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | `"/productos/3"` | `"/buscar"` (sin la query) |
| `useSegments()` | `["(tabs)", "productos", "[id]"]` | `["buscar"]` |
| `useLocalSearchParams()` | `{ id: "3" }` | `{ q: "chipa" }` |

### E5. Local vs global

**a)**

- `useLocalSearchParams` devuelve los parámetros **de la pantalla donde se usa**, y solo se actualiza cuando cambian los de esa pantalla.
- `useGlobalSearchParams` devuelve los parámetros **de la URL actual de toda la app**. Se actualiza en **todas** las pantallas montadas cada vez que cambia la URL, aunque esas pantallas no estén visibles (por ejemplo, las que quedaron debajo en la pila).

La opción por defecto es **`useLocalSearchParams`**. Evita re-renders innecesarios de pantallas que no están visibles, y evita que una pantalla de la pila lea por error los parámetros de otra.

**b)** `useFocusEffect` ejecuta un efecto **cada vez que la pantalla gana el foco**, y su limpieza cuando lo pierde. Hace falta porque en un Stack las pantallas de abajo no se desmontan, y un `useEffect` común no se vuelve a ejecutar al volver a ellas.

Ejemplo: al volver a la pantalla de cocina, recargar los pedidos del servidor. Otro: pausar un video o un temporizador cuando el usuario se va de la pantalla.

```tsx
useFocusEffect(
  useCallback(() => {
    cargarPedidos();
    return () => detenerTemporizador();
  }, []),
);
```

**c)** **No es un error de Expo Router.** El router solo verifica que la URL coincida con el **patrón** `productos/[id]`, y `mate` es un valor válido para `[id]`. No sabe qué productos existen. **La responsabilidad es del desarrollador, en la pantalla:** validar el parámetro y mostrar un mensaje si no existe.

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a)** Al renderizarse, `<Redirect href="/productos" />` navega a `/productos` **reemplazando** la pantalla actual. Equivale a **`router.replace("/productos")`**.

**b)** Si la redirección apilara, la pantalla que redirige quedaría debajo en la pila. Al tocar "atrás", el usuario volvería a ella, que lo **redirigiría otra vez hacia adelante**. Quedaría **atrapado en un bucle** sin poder salir, con el historial lleno de pantallas que no se ven. Con `replace` la pantalla que redirige desaparece de la pila.

### F2. Stack.Protected

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="privado" />
</Stack.Protected>
<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" options={{ presentation: 'modal' }} />
</Stack.Protected>
```

**a)** Cuando su `guard` es `false`, la pantalla **deja de existir** para el navegador:

- No se puede navegar a ella. Si se intenta (o se entra por un deep link), Expo Router redirige al *anchor* o a la primera pantalla disponible.
- Si el `guard` pasa de `true` a `false`, **todas sus entradas se borran del historial**.

**b)** Al iniciar sesión, `conSesion` pasa a `true` y el guard de `login` (`!conSesion`) pasa a `false`. Entonces `login` deja de existir y **se saca sola de la pila**, y queda visible la pantalla que estaba debajo. Ningún código llama a `back()`: el layout reacciona al cambio de estado.

**c)** Ese aviso aparece cuando se navega a una ruta que **ningún navegador montado tiene registrada en ese momento**. El caso típico es navegar a una ruta protegida justo después de cambiar la sesión, en el mismo evento:

```tsx
login();
router.push('/privado'); // el guard todavía es false: React no volvió a renderizar
```

El estado todavía no se actualizó, así que el guard sigue en `false` y la pantalla no existe. También pasa si se navega a un nombre de ruta mal escrito.

Se evita así:

- no navegando "a mano" después del login y dejando que `Stack.Protected` haga el trabajo;
- o navegando recién cuando el guard ya cambió (en un efecto que depende de la sesión);
- y nunca navegando a una pantalla protegida mientras su guard es `false`.

**d)** `Stack.Protected` tiene varias ventajas frente a un `<Redirect>` condicional en cada pantalla:

- La regla está **centralizada en un solo lugar** (el layout) y es declarativa. No hay que acordarse de agregar el `Redirect` en cada pantalla privada nueva.
- **Limpia el historial** solo: al cerrar sesión, las pantallas privadas desaparecen de la pila y no se puede volver con "atrás".
- No hay un "flash" de la pantalla privada antes de redirigir.
- Protege también los **deep links**.

### F3. 404, anchor y rutas tipadas

**a)** `+not-found.tsx` se define en `src/app/+not-found.tsx`. Es la pantalla que se muestra cuando la URL **no coincide con ninguna ruta** (el 404). Con `usePathname()` se puede mostrar la URL inexistente.

**b)** `export const unstable_settings = { anchor: "(tabs)" }` se escribe en el **`_layout.tsx`** del navegador, en este caso el raíz. Define la **pantalla ancla**, la que se pone **debajo** en la pila cuando se entra directo a otra pantalla por un deep link o al recargar. Así existe un "atrás" a donde volver. Por ejemplo, si se abre `comedoripf://categorias/bebidas`, queda `[(tabs), categorias/bebidas]`. Reemplaza al viejo `initialRouteName`, que está deprecado.

**c)** `typedRoutes` se activa en `app.json` (`"experiments": { "typedRoutes": true }`). Si escribís `<Link href="/prodcutos" />`, **TypeScript marca un error** en el editor y en `tsc`, porque `"/prodcutos"` no es una ruta válida (`Href`). El error de tipeo aparece antes de ejecutar la app. Los tipos se **generan automáticamente** al correr `npx expo start`, en **`.expo/types/router.d.ts`**, y se incluyen mediante `expo-env.d.ts`.

### F4. Deep links

| Dónde | URL |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

**¿Qué significa `/--/`?** En Expo Go, la URL `exp://192.168.1.20:8081` identifica **qué proyecto** cargar (el servidor de desarrollo en esa IP y puerto). El `/--/` es un **separador**: le indica a Expo Go que todo lo que viene después (`/menu/7`) es la **ruta dentro de la app**.

**¿Por qué el scheme propio no funciona en Expo Go?** El scheme `comedoripf://` se registra en el sistema operativo **cuando se instala la app propia**: queda escrito en la configuración nativa del binario (`Info.plist` en iOS, `AndroidManifest.xml` en Android). Dentro de Expo Go la app que está instalada es **Expo Go**, que solo tiene registrado el scheme `exp://`. El celular no sabe que `comedoripf://` corresponde a nuestro proyecto.

### F5. Errores comunes

**a)**

- **Causa:** con `asChild`, `<Link>` usa un `<Slot>` que le pasa sus props (`onPress`, `href`…) al hijo y necesita combinar los estilos. No puede fusionar un **array de estilos**.
- **Solución:** pasar un solo objeto de estilo, con `StyleSheet.flatten([estilos.boton, activo && estilos.activo])`, o elegir el estilo con un ternario (`activo ? estilos.botonActivo : estilos.boton`).

**b)**

- **Causa:** **todo archivo dentro de `src/app` se convierte en una ruta**, así que `TarjetaProducto.tsx` generó `/TarjetaProducto`.
- **Solución:** moverlo a `src/components/TarjetaProducto.tsx`. En `src/app` van solo rutas y layouts.

**c)**

- **Causa:** `push` **apila** `/` encima del login, así que el login sigue en la pila y "atrás" vuelve a él.
- **Solución:** usar `router.replace("/")`, que reemplaza el login. O, mejor, proteger el login con `Stack.Protected guard={!conSesion}`, que lo saca del historial automáticamente.

**d)**

- **Causa:** `npm install` instaló la **última versión** del paquete, que no es la compatible con SDK 57. Expo Go trae versiones nativas fijas para su SDK.
- **Solución:** desinstalarlo y reinstalarlo con **`npx expo install <paquete>`**, o correr `npx expo install --fix` para alinear todas las versiones con el SDK. `npx expo-doctor` ayuda a detectar el problema.
