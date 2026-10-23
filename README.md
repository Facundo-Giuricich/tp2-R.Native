# Comedor IPF

App para pedir comida en el comedor del Instituto Politécnico Formosa. Los pedidos se atienden en orden de llegada (con una **Cola**) y el carrito permite deshacer (con una **Pila**).

Trabajo Práctico N° 2: Taller Complementario React Native II.

- Expo SDK 57, expo-router 57, TypeScript
- Rutas tipadas activadas (`typedRoutes`)
- Scheme: `comedoripf`

## Cómo correrlo

```bash
npm install
npx expo start
```

Para entrar a la cocina: usuario `cocina`, clave `1234`.

## Árbol de carpetas de `src/app`

```
src/app
├── _layout.tsx                 Stack raíz (Provider, GestureHandlerRootView, Stack.Protected, anchor "(tabs)")
├── (tabs)
│   ├── _layout.tsx             Tabs (expo-router/js-tabs)
│   ├── index.tsx               /
│   ├── menu
│   │   ├── _layout.tsx         Stack de la tab Menú
│   │   ├── index.tsx           /menu
│   │   └── [id].tsx            /menu/[id]
│   └── carrito
│       ├── _layout.tsx         Stack de la tab Carrito
│       ├── index.tsx           /carrito
│       └── nota.tsx            /carrito/nota   (formSheet)
├── categorias
│   └── [categoria].tsx         /categorias/[categoria]
├── buscar.tsx                  /buscar?q=&categoria=
├── confirmar.tsx               /confirmar      (modal)
├── turno
│   └── [numero].tsx            /turno/[numero]
├── login.tsx                   /login          (modal, solo SIN sesión)
├── cocina
│   ├── _layout.tsx             Drawer (expo-router/drawer), solo CON sesión
│   ├── index.tsx               /cocina
│   └── atendidos.tsx           /cocina/atendidos
├── ayuda
│   ├── index.tsx               /ayuda
│   └── [...articulo].tsx       /ayuda/... (catch-all)
├── pedido.tsx                  /pedido  ->  <Redirect href="/carrito" />
└── +not-found.tsx              404
```

El resto del código está fuera de `src/app`:

| Carpeta | Contenido |
|---|---|
| `src/components` | Boton, Pantalla, FilaPlato, DondeEstoy, estilos |
| `src/context` | ComedorContext (sesión, carrito, cola y pilas) |
| `src/data` | platos (15 platos en 4 categorías) y artículos de ayuda |
| `src/estructuras` | Pila y Cola |

### Navegador de cada `_layout`

| Layout | Navegador | Para qué |
|---|---|---|
| `app/_layout.tsx` | **Stack** | Pantallas que tapan las pestañas: categorías, buscar, confirmar (modal), turno, login (modal), cocina, ayuda. |
| `app/(tabs)/_layout.tsx` | **Tabs** | Inicio, Menú y Carrito. El Carrito muestra un badge con la cantidad de ítems. |
| `app/(tabs)/menu/_layout.tsx` | **Stack** | La lista y el detalle del plato. La barra de pestañas sigue visible. |
| `app/(tabs)/carrito/_layout.tsx` | **Stack** | El carrito y la nota, que se abre como hoja inferior. |
| `app/cocina/_layout.tsx` | **Drawer** | Menú lateral con "Cocina" y "Atendidos". |

## Pila y Cola en el sistema

- **Cola de pedidos** (`colaPedidos`): al confirmar, el pedido se encola con un número correlativo. La cocina ve el `frente()` y "Atender siguiente" hace `desencolar()`. Nadie se puede colar.
- **Pila de deshacer** (`pilaDeshacer`): cada plato agregado hace `push`. "Deshacer último" hace `pop` y saca ese plato. El botón se deshabilita cuando la pila está vacía.
- **Pila de atendidos** (`pilaAtendidos`): cada pedido atendido se apila. `/cocina/atendidos` la muestra del tope a la base.

## ¿Por qué `replace` y no `push` al confirmar?

En `/confirmar` se usa:

```ts
router.replace({ pathname: '/turno/[numero]', params: { numero } });
```

`replace` saca la pantalla de confirmación de la pila y pone el turno en su lugar:

- Pila antes: `[(tabs), confirmar]`
- Pila después: `[(tabs), turno/1]`

Si usara `push`, la pila quedaría `[(tabs), confirmar, turno/1]` y al tocar "atrás" el usuario volvería a la confirmación de un pedido que ya está en la cola. Ahí podría confirmar de nuevo un carrito vacío o confundirse. Con `replace`, "atrás" vuelve directamente a las pestañas.

## Rutas protegidas

En el layout raíz:

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="cocina" />
</Stack.Protected>
<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" />
</Stack.Protected>
```

- Al iniciar sesión, el guard de `login` pasa a `false` y el modal se cierra solo.
- Al cerrar sesión, el guard de `cocina` pasa a `false` y toda la sección se borra del historial.

## Deep link de prueba (Expo Go)

Con `npx expo start` corriendo y el celular en la misma red Wi-Fi:

```
exp://192.168.1.79:8081/--/menu/3
```

Abre directamente el plato 3 (Chipa). Hay que cambiar la IP por la que muestra `npx expo start`.

Otros ejemplos:

- `exp://192.168.1.79:8081/--/categorias/bebidas`: queda `(tabs)` debajo por el `anchor`.
- `exp://192.168.1.79:8081/--/buscar?q=cafe&categoria=desayuno`: abre el buscador con la búsqueda cargada.
- `exp://192.168.1.79:8081/--/no-existe`: muestra la pantalla 404.

Con una build propia, el equivalente es `comedoripf://menu/3`.

## Capturas

> Agregar las capturas en la carpeta `capturas/`.

- Carrito con deshacer: `capturas/carrito.png`
- Turno: `capturas/turno.png`
- Cocina atendiendo pedidos: `capturas/cocina.png`
- Login / logout: `capturas/login.png`
- Pantalla 404: `capturas/404.png`

## Desafíos opcionales hechos

- Hoja inferior: `/carrito/nota` se abre con `presentation: "formSheet"` y `sheetAllowedDetents: [0.5, 0.9]`.
- Tiempo estimado: en `/turno/[numero]`, la espera es (posición + 1) × 3 minutos.
