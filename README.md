# Movie Finder App

![Movie Finder App](/public/img/og-image.webp)

## Visión General

**Movie Finder App** es una aplicación web interactiva que transforma la experiencia de descubrimiento de películas. Desarrollada con tecnologías modernas como React y TypeScript, esta aplicación no solo demuestra competencias técnicas avanzadas sino que también ofrece una experiencia de usuario fluida y atractiva.

## Tecnologías Utilizadas

- **React 19**: Framework de JavaScript para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript que añade tipado estático
- **Sass**: Preprocesador CSS para estilos más organizados y mantenibles
- **Vite**: Herramienta de construcción rápida para proyectos web modernos
- **API de Películas**: Integración con una API externa para obtener datos de películas

## Características Principales

### 1. Búsqueda de Películas

- Implementación de búsqueda en tiempo real con debounce para optimizar las llamadas a la API
- Visualización de resultados de búsqueda con información relevante de cada película

### 2. Ordenación Avanzada

- Sistema de ordenación flexible que permite ordenar películas por:
  - Título (A-Z y Z-A)
  - Fecha de lanzamiento (más recientes y más antiguas)

### 3. Interfaz Adaptativa

- Diseño responsive que se adapta a diferentes tamaños de pantalla
- Componente Hero dinámico que muestra la imagen de fondo de la película destacada
- Transiciones suaves entre estados de la interfaz

### 4. Gestión de Estado

- Uso de hooks personalizados para encapsular la lógica de negocio
- Implementación de patrones de estado eficientes para manejar datos y UI

## Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
|-- assets/         # Recursos estáticos (SVGs, imágenes)
|-- components/     # Componentes React reutilizables
|-- hooks/          # Hooks personalizados
|-- scss/           # Estilos organizados por componentes
|-- utils/          # Funciones utilitarias
|-- App.tsx         # Componente principal
|-- constants.ts    # Constantes de la aplicación
|-- types.d.ts      # Definiciones de tipos TypeScript
```

### Componentes Principales

#### 1. App

Componente raíz que orquesta la aplicación y gestiona el estado global.

#### 2. Hero

Componente destacado que muestra:

- Título de la aplicación
- Campo de búsqueda
- Selector de ordenación
- Imagen de fondo dinámica de la película destacada

#### 3. MovieGrid

Componente que renderiza la cuadrícula de películas utilizando el componente MovieCard.

#### 4. MovieCard

Componente que muestra la información individual de cada película:

- Póster
- Título
- Fecha de lanzamiento
- Puntuación en estrellas

### Hooks Personalizados

#### useMovies

Hook central que maneja:

- Obtención de datos de la API
- Búsqueda de películas
- Ordenación de resultados
- Estado de carga y errores

## Aspectos Técnicos Destacados

### 1. Tipado Estricto con TypeScript

- Definición clara de interfaces para los datos de películas
- Tipado estricto para props de componentes
- Tipos personalizados para valores de ordenación

### 2. Optimización de Rendimiento

- Implementación de debounce para reducir llamadas a la API durante la búsqueda
- Transiciones optimizadas para cambios de estado visual

### 3. Manejo de Errores

- Sistema robusto de manejo de errores en llamadas a la API
- Fallbacks visuales para posters no disponibles

### 4. Utilidades Reutilizables

- `mapMovies`: Transforma los datos de la API al formato interno de la aplicación
- `sortMovies`: Implementa diferentes algoritmos de ordenación
- `formatDate`: Formatea fechas para una presentación consistente

## Desafíos y Soluciones

### Desafío 1: Gestión de Imágenes Dinámicas

**Solución:** Implementación de un sistema de fallback para pósters y fondos no disponibles, utilizando placeholders generados dinámicamente.

### Desafío 2: Ordenación Eficiente

**Solución:** Desarrollo de algoritmos de ordenación específicos para cada tipo de dato (texto, fechas) con manejo adecuado de casos especiales como fechas inválidas.

### Desafío 3: Experiencia de Usuario Fluida

**Solución:** Implementación de transiciones suaves y estados de carga para proporcionar feedback visual durante las operaciones asíncronas.

## Conclusiones y Aprendizajes

La Movie Finder App representa un ejemplo sólido de desarrollo frontend moderno, combinando buenas prácticas de programación, tipado estricto y una experiencia de usuario cuidadosamente diseñada.
