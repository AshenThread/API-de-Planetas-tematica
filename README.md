# Orbital Atlas API

API REST temática de planetas creada para el deber 2 de Desarrollo Web3. El backend funciona sin base de datos: usa un arreglo en memoria y está organizado por capas para separar rutas, controladores, servicios y modelos de dominio.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución local

```bash
npm install
npm run dev
```

La API queda disponible en `http://localhost:3000`. Para compilar y ejecutar la versión JavaScript:

```bash
npm run build
npm start
```

También puedes abrir `http://localhost:3000/` en el navegador para visualizar el catálogo. La interfaz permite listar planetas, crear uno nuevo y eliminar registros usando la API en memoria.

## Estructura

```text
src/
├── controllers/       # Reciben la petición y forman la respuesta
├── middlewares/       # Request ID, logging, validación y errores
├── routes/            # Endpoints HTTP
├── services/          # Lógica CRUD y arreglo en memoria
├── types/             # Tipos del dominio Planet
├── app.ts             # Configuración de Express
└── server.ts          # Punto de entrada HTTP
```

## Recurso Planet

Cada planeta tiene los campos tipados `id`, `name`, `type`, `massEarths`, `distanceFromSunAu`, `habitable`, `description` y `createdAt`.

## Endpoints

| Método | Ruta | Resultado esperado |
| --- | --- | --- |
| GET | `/health` | 200, estado del servicio |
| GET | `/api/planets` | 200, lista de planetas |
| GET | `/api/planets/:id` | 200 o 404 |
| POST | `/api/planets` | 201, planeta creado; 400 si falla validación |
| PUT | `/api/planets/:id` | 200 o 404 |
| DELETE | `/api/planets/:id` | 204 o 404 |

## Middlewares y errores

- `requestId`: agrega un identificador único en la respuesta mediante `x-request-id`.
- `logger`: registra método, ruta, código de estado y duración.
- `validatePlanet`: valida tipos, rangos y textos antes de crear o actualizar.
- `errorHandler`: centraliza errores inesperados y errores HTTP del servicio.

Las pruebas manuales completas, con ejemplos de request y respuestas esperadas, están en [requests.http](requests.http). Se pueden ejecutar desde VS Code con la extensión REST Client o copiarse a Postman/cURL.

## Flujo Git/GitHub sugerido

```bash
git init
git add .
git commit -m "chore: inicializa API de planetas"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main

git checkout -b feature/crud-planets
git add src README.md requests.http
git commit -m "feat: agrega CRUD de planetas y middlewares"
git push -u origin feature/crud-planets
```

Después se puede abrir un Pull Request hacia `main` para evidenciar el trabajo con ramas. Reemplaza la URL del remoto por la de tu repositorio real.