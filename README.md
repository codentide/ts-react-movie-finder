<div align="center">

  <a href="https://ts-react-movie-finder.netlify.app" target="_blank">
    <img src="./public/screenshots/home_screenshot.png" style="border-radius:12px;"/> 
  </a>
  <h3 style="font-size:32px;"><strong>TS/React Movie Finder</strong></h3>
  <p>Una aplicación web moderna para descubrir y explorar películas consumidas desde el API de TMDB, construida con React 19, TypeScript y React Router.</p>
  <a href="https://ts-react-movie-finder.netlify.app" target="_blank">Live Demo</a>

  <div align="center">

[![React](https://img.shields.io/badge/React-323232?style=for-the-badge&logo=react&logoColor=2361DAFB)](https://es.react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

  </div>

</div>

## 🧪 Funcionalidades principales

- **Búsqueda Inteligente**: Búsqueda en tiempo real con debounce optimizada, persistencia de búsquedas en URL mediante query parameters
- **Paginas de Detalle**: Vista detallada de cada película con información completa, diseño responsive con imágenes de fondo dinámicas
- **Sistema de Ordenación**: Ordenación por título (A-Z, Z-A) y por fecha (más recientes/antiguas)

### Interfaz Moderna

- Diseño completamente responsive
- Componentes reutilizables y modulares
- Transiciones suaves y feedback visual
- Manejo de estados de carga y errores

## Tecnologías

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **React Router 7** - Enrutamiento y navegación
- **Sass** - Preprocesador CSS
- **Vite** - Build tool y dev server
- **TMDB API** - Datos de películas

## 📁 Estructura del Proyecto

```
src/
├── assets/          # SVGs y recursos estáticos
├── components/      # Componentes React reutilizables
├── hooks/           # Hooks personalizados
├── pages/           # Páginas de la aplicación
├── scss/            # Estilos organizados
│   ├── base/        # Variables y tipografía
│   ├── components/  # Estilos por componente
│   └── pages/       # Estilos por página
├── utils/           # Funciones utilitarias
└── types.d.ts       # Definiciones TypeScript
```

## 🔧 Componentes Principales

### App.tsx

Componente raíz que configura el enrutamiento con React Router:

- Ruta principal redirige a `/movies`
- Página de detalle en `/movie/:id`
- Página 404 para rutas no encontradas

### HomePage

Página principal que integra:

- Componente Hero con búsqueda y ordenación
- Grid de películas con estado de carga
- Manejo de errores de API

### MovieDetailPage

Página de detalle individual que muestra:

- Información completa de la película
- Imagen de fondo dinámica
- Navegación de regreso
- Géneros y puntuación

### Hooks Personalizados

#### useMovies

Hook principal para gestión de películas:

- Integración con React Router para query parameters
- Debounce optimizado para búsquedas
- Gestión de película destacada
- Estados de carga y error

#### useMovieDetail

Hook para detalles de película individual:

- Fetch de datos específicos por ID
- Formateo de datos de la API
- Manejo de errores específicos

## Mejoras Implementadas

### Navegación

- **React Router 7**: Navegación moderna con URL state
- **Query parameters**: Búsquedas persistentes en URL
- **Navegación programática**: Botón de regreso funcional

### Performance

- **Debounce mejorado**: Menos llamadas a la API
- **Referencias optimizadas**: Evita re-renders innecesarios
- **Lazy loading**: Componentes cargados bajo demanda

### UX/UI

- **Estados de carga**: Spinner personalizado
- **Manejo de errores**: Mensajes informativos
- **Responsive design**: Adaptable a todos los dispositivos
- **Transiciones suaves**: Mejor experiencia visual

## Instalación y Uso

```bash
# Clonar repositorio
git clone [repository-url]

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Build para producción
pnpm build
```

## Variables de Entorno

```env
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_IMG_BASE_URL=https://image.tmdb.org/t/p/w500
VITE_API_KEY=tu_api_key_aqui
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
