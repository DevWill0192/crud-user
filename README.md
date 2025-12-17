# Crud - User Management

Aplicación frontend para gestión de usuarios consumiendo JSONPlaceholder API.

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **React Router v7** - Routing con lazy loading
- **Context API** - Manejo de estado global
- **CSS Modules** - Estilos scoped
- **Vitest** + **Testing Library** - Testing

## 📋 Funcionalidades

- ✅ **CRUD completo** de usuarios
- ✅ **Vista de listado** con cards interactivas
- ✅ **Vista de detalle** con información completa
- ✅ **Formularios** de creación y edición
- ✅ **Estados de carga, error y vacío**
- ✅ **Responsive design** (mobile-first)
- ✅ **Accesibilidad** (ARIA roles, labels, navegación por teclado)

## 🏗️ Arquitectura

```
src/
├── context/          # Context API (UserContext + UserProvider)
├── hooks/            # Custom hooks (useUsers)
├── pages/            # Páginas/vistas
│   └── users/        # CRUD de usuarios
├── services/         # Servicios API
├── router/           # Configuración de rutas con lazy loading
└── __tests__/        # Tests
```

### Decisiones técnicas

1. **Context API vs Redux**: Para esta escala, Context API es suficiente y reduce boilerplate.
2. **Lazy loading**: Cada página se carga bajo demanda para mejor performance inicial.
3. **Memoización**: `useCallback` en funciones del context y `memo` en componentes de lista para evitar re-renders innecesarios.
4. **CSS Modules**: Estilos scoped sin configuración adicional, mejor DX que styled-components para este proyecto.

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests una vez
npm run test:run
```

### Tests incluidos

- Estado de carga inicial
- Renderizado de lista de usuarios
- Estado vacío
- Manejo de errores de API
- Roles ARIA para accesibilidad

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 📱 Responsive

- Desktop: Cards en fila con acciones a la derecha
- Tablet: Cards apiladas
- Mobile: Acciones en columna, botones full-width

## ♿ Accesibilidad

- Roles ARIA en listas y artículos
- Labels descriptivos en botones de acción
- Focus states visibles
- Navegación por teclado funcional
- Estados anunciados con `aria-live`

## 🔧 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run lint` | Linter ESLint |
| `npm test` | Tests en modo watch |
| `npm run test:run` | Tests una vez |

## 📡 API

Consume [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) como API REST.

**Endpoints utilizados:**
- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

> Nota: JSONPlaceholder es una API fake, las mutaciones no persisten pero retornan respuestas realistas.

## 🎨 Estilos

- Paleta de colores con gradientes púrpura
- Tipografía: Playfair Display para títulos
- Botones con variantes: primary, secondary, warning, danger
- Animaciones sutiles en hover
- Focus states para accesibilidad
