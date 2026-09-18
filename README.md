# Formulario de inscripción - Dimensión Trabajo

Formulario público para el Taller de Factores Críticos - Dimensión Trabajo: HTML/CSS/JavaScript estático, endpoint serverless de Vercel y persistencia en Supabase.

## Setup

1. Copiá `.env.example` a `.env.local` en Vercel o para desarrollo local.
2. Configurá `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` con las credenciales del proyecto. La clave service-role debe mantenerse solamente en variables de entorno del servidor.
3. Configurá `ALLOWED_ORIGIN` con el origen del sitio desplegado.
4. Ejecutá `sql/006_enrollment_submissions_trabajo.sql` en el SQL Editor de Supabase antes de desplegar el endpoint actualizado.
5. Confirmá que existan `assets/splash-unsj-horizontal.png` y `assets/hero-banner.jpg`.

## Datos del evento

El formulario corresponde al encuentro participativo “Taller de Factores Críticos - Dimensión Trabajo”.

- Fecha: 29 de septiembre de 2026
- Horario: 9:00 hs.
- Lugar: Facultad de Ciencias Sociales
- Descripción: En este encuentro vamos a compartir miradas, identificar desafíos y construir escenarios para la UNSJ del 2050.

## Período de inscripción

Las fechas se centralizan en `form-config.js`:

```js
startsAt: "2026-09-19T00:00:00-03:00",
expiresAt: "2026-09-28T23:59:59-03:00",
```

El formulario acepta inscripciones desde el 19 de septiembre de 2026 a las 00:00 hasta el 28 de septiembre de 2026 a las 23:59:59, hora de Argentina. El navegador y el endpoint rechazan solicitudes fuera de ese período.

## Datos almacenados

Todos los campos visibles son obligatorios:

- Nombre
- Apellido
- DNI
- Género
- Email
- Teléfono
- Lugar de trabajo

Las inscripciones se almacenan en `public.enrollment_submissions_trabajo`. El DNI se normaliza en la columna `dni`, debe contener 7 u 8 dígitos y es único dentro de la tabla. Los valores permitidos para género son `Masculino`, `Femenino`, `No binario` y `Otro`. El lugar de trabajo admite texto libre de hasta 180 caracteres.

## Ejecución local

Podés abrir `index.html` directamente para previsualizar la interfaz. La vista `file://` no puede llamar a `POST /api/submit` y muestra un mensaje informativo.

Para probar el endpoint localmente usá:

```bash
vercel dev
```

## Despliegue y verificación

- No expongas `SUPABASE_SERVICE_ROLE_KEY` en código de navegador.
- Todas las escrituras pasan por `POST /api/submit`.
- Ejecutá la migración `sql/006_enrollment_submissions_trabajo.sql` antes de desplegar.
- La tabla de Trabajo es independiente de las tablas de otros encuentros.

Las verificaciones locales, sin credenciales reales de Supabase, son:

```bash
node --check main.js && node --check api/submit.js && node scripts/verify-local.js
```
