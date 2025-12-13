# Next.js Supabase Backend

Este proyecto es una aplicación web construida con **Next.js 15** y **Supabase**, diseñada para demostrar funcionalidades de backend como autenticación, base de datos en tiempo real y almacenamiento de archivos.

## 🚀 Tecnologías Principales

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Backend/Base de Datos**: [Supabase](https://supabase.com/)
-   **Autenticación**: Supabase Auth (SSR)
-   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes UI**: [Shadcn/ui](https://ui.shadcn.com/) (Radix UI)
-   **Iconos**: [Lucide React](https://lucide.dev/)

## 🛠️ Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### 1. Clonar el repositorio

```bash
git clone <url-del- repositorio>
cd nextjs-supabase-backend
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables de tu proyecto de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_supabase_anon_key
```

> **Nota**: Asegúrate de que las claves coincidan con las de tu proyecto en el dashboard de Supabase (Project Settings -> API). El código espera `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` en lugar de `ANON_KEY`.

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📂 Estructura del Proyecto

### Rutas Principales (`/app`)

-   **`/`**: Página de inicio.
-   **`/auth`**: Páginas de autenticación (Login, Registro).
-   **`/notes`**: Ejemplo de lista de notas en tiempo real (Realtime Database).
-   **`/instruments`**: Página de gestión de instrumentos (CRUD).
-   **`/profile`**: Perfil de usuario (requiere autenticación).
-   **`/protected`**: Ejemplo de ruta protegida del lado del servidor.
-   **`/supabase-files`**: Ejemplo de carga y visualización de archivos (Supabase Storage).

### Librerías (`/lib`)

-   **`lib/supabase`**: Configuración del cliente de Supabase para SSR (Server-Side Rendering) y cliente (Browser).
    -   `client.ts`: Cliente para componentes de cliente.
    -   `server.ts`: Cliente para componentes de servidor (Server Components).

## ✨ Características

-   **Autenticación Completa**: Flujos de registro e inicio de sesión integrados con Supabase Auth.
-   **Protección de Rutas**: Middleware y comprobaciones de sesión para proteger rutas privadas.
-   **Base de Datos en Tiempo Real**: Sincronización automática de datos en la página de notas.
-   **Almacenamiento de Archivos**: Carga y descarga de imágenes utilizando Supabase Storage.
-   **Modo Oscuro/Claro**: Soporte para cambio de tema (Next-Themes).
