# Pasos del Proyecto Next.js + Supabase

Pasos realizados siguiendo la [documentación oficial de Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs).

## 1. Crear Proyecto en Supabase

1. Ir a [database.new](https://database.new)
2. Crear nuevo proyecto Supabase
3. Esperar a que el proyecto esté listo

## 2. Crear Tabla de Ejemplo

En el [SQL Editor](https://supabase.com/dashboard/project/_/sql) del proyecto:

```sql
-- Crear tabla instruments
create table instruments (
  id bigint primary key generated always as identity,
  name text not null
);

-- Insertar datos de ejemplo
insert into instruments (name)
values ('violin'), ('viola'), ('cello');

-- Habilitar RLS
alter table instruments enable row level security;

-- Crear política de lectura pública
create policy "public can read instruments"
on public.instruments
for select to anon
using (true);
```

## 3. Crear App Next.js

```bash
npx create-next-app -e with-supabase
```

El template incluye:
- Cookie-based Auth
- TypeScript
- Tailwind CSS
- shadcn/ui components

## 4. Configurar Variables de Entorno

Renombrar `.env.example` a `.env.local` y agregar:

```env
NEXT_PUBLIC_SUPABASE_URL=<tu-url-de-supabase>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<tu-clave-publica>
```

Obtener valores desde: [Project Settings > API](https://supabase.com/dashboard/project/_/settings/api)

## 5. Consultar Datos desde Next.js

Crear `app/instruments/page.tsx`:

```tsx
import { createClient } from '@/lib/supabase/server'

export default async function Instruments() {
  const supabase = await createClient()
  const { data: instruments } = await supabase.from('instruments').select()
  
  return <pre>{JSON.stringify(instruments, null, 2)}</pre>
}
```

## 6. Ejecutar la App

```bash
npm run dev
```

Visitar: `http://localhost:3000/instruments`

## 7. Autenticación (Incluida en el Template)

El template `with-supabase` incluye:

- ✅ Sistema de login/registro
- ✅ Recuperación de contraseña
- ✅ Páginas protegidas
- ✅ Manejo de sesiones con cookies
- ✅ Componentes de UI pre-configurados

### Rutas de Auth Disponibles:
- `/auth/sign-up` - Registro
- `/auth/login` - Inicio de sesión
- `/auth/forgot-password` - Recuperar contraseña
- `/protected` - Página protegida (requiere login)

## 8. Estructura del Proyecto

```
app/
├── auth/              # Rutas de autenticación
├── instruments/       # Ejemplo de consulta a DB
├── protected/         # Página protegida
└── page.tsx          # Página principal

lib/supabase/
├── server.ts         # Cliente para Server Components
├── client.ts         # Cliente para Client Components
└── proxy.ts          # Proxy para cookies

components/
├── ui/               # Componentes shadcn/ui
├── login-form.tsx    # Formulario de login
├── sign-up-form.tsx  # Formulario de registro
└── ...
```

## Recursos

- [Next.js + Supabase Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Import Data Guide](https://supabase.com/docs/guides/database/import-data)

---

**Última actualización:** 2025-12-05
