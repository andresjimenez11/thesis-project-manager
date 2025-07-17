# Thesis Project Manager

![GitHub issues](https://img.shields.io/github/issues/andresjimenez11/thesis-project-manager?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/andresjimenez11/thesis-project-manager?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/andresjimenez11/thesis-project-manager?style=for-the-badge)

Un gestor de proyectos full-stack desarrollado para **Tesis**, una compañía global dedicada a brindar servicios profesionales de TI y Automatización. Esta herramienta está diseñada para ayudar a sus equipos a organizar, seguir y completar proyectos de manera eficiente, permitiendo una gestión integral de tareas, proyectos, equipos y prioridades con una interfaz de usuario moderna e intuitiva.

## ✨ Características Principales

- **Gestión de Proyectos:** Crea, actualiza y elimina proyectos. Visualiza todos tus proyectos en un dashboard central.
- **Gestión de Tareas:** Asigna tareas a proyectos y usuarios, establece prioridades (Urgente, Alta, Media, Baja) y fechas de entrega.
- **Vistas Flexibles:** Visualiza tus tareas y proyectos en diferentes formatos:
    - **Vista de Tablero (Kanban):** Organiza tareas por estado (Pendiente, En Progreso, Hecho).
    - **Vista de Lista:** Una lista simple y clara de todas las tareas.
    - **Vista de Tabla:** Datos detallados de las tareas en un formato tabular.
    - **Línea de Tiempo:** Planifica y visualiza el cronograma de tus proyectos.
- **Colaboración en Equipo:** Crea equipos, asigna miembros a proyectos y facilita la colaboración.
- **Autenticación y Usuarios:** Sistema de registro e inicio de sesión para gestionar el acceso.
- **Búsqueda Global:** Encuentra rápidamente proyectos, tareas o usuarios en toda la aplicación.

---

## 🛠️ Stack Tecnológico

Este proyecto es una aplicación monorepo con un cliente y un servidor separados.

### Frontend (Cliente)

- **Framework:** [Next.js](https://nextjs.org/) 14+ (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Gestión de Estado:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI/Componentes:** Componentes personalizados y Headless UI.

### Backend (Servidor)

- **Entorno:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/) para una interacción segura y sencilla con la base de datos.
- **Base de Datos:** Compatible con PostgreSQL, MySQL, SQLite, etc. (configurable en Prisma).

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- [Node.js](https://nodejs.org/en/) (v18 o superior)
- [Git](https://git-scm.com/)
- Un gestor de paquetes como `npm` o `yarn`.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/andresjimenez11/thesis-project-manager.git
cd thesis-project-manager
```

### 2. Configuración del Backend

Primero, configura y ejecuta el servidor.

```bash
# Navega a la carpeta del servidor
cd server

# Instala las dependencias
npm install

# Crea un archivo .env a partir del ejemplo
# y configúralo con la URL de tu base de datos.
# Ejemplo para PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
touch .env
```

**Contenido del archivo `server/.env`:**
```
DATABASE_URL="TU_DATABASE_URL_AQUI"
```

```bash
# Ejecuta las migraciones de la base de datos con Prisma
npx prisma migrate dev

# (Opcional) Puebla la base de datos con datos de ejemplo
npx prisma db seed

# Inicia el servidor de desarrollo
npm run dev
```
El servidor estará corriendo en `http://localhost:5000` (o el puerto que hayas configurado).

### 3. Configuración del Frontend

Ahora, configura y ejecuta el cliente.

```bash
# Desde la raíz del proyecto, navega a la carpeta del cliente
cd ../client

# Instala las dependencias
npm install

# Crea un archivo .env.local para las variables de entorno del cliente.
# Apunta a la URL de tu API del backend.
touch .env.local
```

**Contenido del archivo `client/.env.local`:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
# Inicia el cliente de desarrollo
npm run dev
```
La aplicación web estará disponible en `http://localhost:3000`.

---

## 🤝 Cómo Contribuir

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor sigue estos pasos:

1.  Haz un **Fork** de este repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y haz **Commit** (`git commit -m 'Añadir nueva funcionalidad'`).
4.  Haz **Push** a tu rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un **Pull Request**.

Por favor, abre un [issue](https://github.com/andresjimenez11/thesis-project-manager/issues) primero para discutir cualquier cambio importante que desees realizar.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👤 Autor

**Andrés Felipe Jiménez**
- GitHub: [@andresjimenez11](https://github.com/andresjimenez11)
