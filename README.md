# Inmidoc

Aplicacion web de tramites construida con Next.js 16, React 19, TypeScript, Tailwind CSS y Supabase.

## Requisitos

- Node.js 20.9 o superior.
- npm.
- Un proyecto de Supabase con las tablas del folder `migrations/`.

## Configuracion inicial

Instala las dependencias:

```bash
npm ci
```

Crea el archivo de variables de entorno:

```bash
cp .env.example .env
```

Completa los valores en `.env`:

```bash
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SECRET_KEY=tu-service-role-o-secret-key
AUTH_SECRET=una-cadena-larga-y-secreta
```

`AUTH_SECRET` se usa para firmar la sesion de administrador. Si no se define, la app usa `SUPABASE_SECRET_KEY` como respaldo, pero es mejor configurarlo por separado.

## Base de datos

Aplica las migraciones de Supabase en este orden:

1. `migrations/001_initial_migration.sql`
2. `migrations/002_database_backfill.sql`

Puedes ejecutarlas desde el SQL Editor de Supabase o con la herramienta que uses para conectarte a Postgres. La segunda migracion inserta datos iniciales para instituciones, tramites, documentos requeridos, administradores y tickets.

## Desarrollo

Arranca el servidor local:

```bash
npm run dev
```

Abre `http://localhost:3000` en el navegador.

Rutas principales:

- `/`: catalogo publico de tramites.
- `/login`: inicio de sesion de administradores.
- `/admin`: panel de administracion.
- `/admin/procedures`: gestion de tramites.
- `/admin/reports`: reportes.

## Comandos disponibles

```bash
npm run dev
```

Inicia Next.js en modo desarrollo.

```bash
npm run lint
```

Ejecuta ESLint.

```bash
npm run build
```

Genera el build de produccion.

```bash
npm run start
```

Levanta el servidor de produccion despues de correr `npm run build`.

## Flujo recomendado

```bash
npm ci
cp .env.example .env
# editar .env
# aplicar migraciones en Supabase
npm run dev
```

Antes de publicar cambios:

```bash
npm run lint
npm run build
```
