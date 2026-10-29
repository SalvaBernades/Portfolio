# 🎮 Portfolio de Diseño de Videojuegos (Game Designer & Systems)

Un sitio web portfolio moderno, limpio, ultra rápido y sin sobrecarga visual, creado con **HTML5 semántico**, **CSS3 moderno** (variables y flexbox/grid) y **JavaScript vainilla** (ES6+), listo para ser publicado gratuitamente en **GitHub Pages**.

---

## 🌟 Características Destacadas

- **Diseño Limpio & No Cargado**: Paleta de colores *dark* con contrastes sutiles, micro-interacciones suaves y tipografía legible (`Outfit` y `JetBrains Mono`).
- **Fondo Interactivo Ligero**: Partículas en Canvas HTML5 nativo que reaccionan sutilmente al cursor a 60 FPS, sin librerías pesadas como Three.js.
- **Filtro de Proyectos en Tiempo Real**: Filtrado dinámico por categoría (*Game Design*, *Level Design*, *Sistemas & UI*).
- **Fichas Técnicas de Diseño (Modales GDD)**: Cada proyecto incluye una vista detallada con Visión, Pilares de Diseño (Core Pillars), Mecánicas Clave y notas de Level Design / Greyboxing.
- **Game Feel con Audio UI Opcional**: Efecto de sonido sintetizado en tiempo real con la Web Audio API (inicia silenciado por defecto para no molestar).
- **100% Responsivo**: Adaptado para móviles, tablets y monitores de alta resolución.
- **Cero Dependencias**: No requiere `npm`, `node_modules` ni bundlers para funcionar.

---

## 📁 Estructura del Proyecto

```text
├── index.html                 # Estructura principal y contenido
├── favicon.svg                # Ícono de pestaña
├── .gitignore                 # Archivos excluidos de git
├── README.md                  # Documentación
├── css/
│   └── style.css              # Estilos, variables y media queries
├── js/
│   └── main.js                # Lógica de filtros, modal GDD, audio y canvas
└── assets/
    └── images/                # Ilustraciones y recursos
        ├── avatar.svg         # Avatar de perfil
        ├── project-1.svg      # Imagen del Proyecto 1 (Plataformas / Tiempo)
        ├── project-2.svg      # Imagen del Proyecto 2 (Combate Melee)
        ├── project-3.svg      # Imagen del Proyecto 3 (HUD / Sigilo)
        └── project-4.svg      # Imagen del Proyecto 4 (Economía / Islas)
```

---

## 🚀 Cómo Publicar tu Portfolio en GitHub Pages (Paso a Paso)

Sigue estos sencillos pasos para tener tu portfolio online en `https://TU_USUARIO.github.io/portfolio`:

### Paso 1: Crear un nuevo repositorio en GitHub
1. Inicia sesión en tu cuenta de [GitHub](https://github.com).
2. Haz clic en el botón verde **"New"** (Nuevo repositorio).
3. Asigna un nombre al repositorio, por ejemplo: `portfolio-game-design` (o `tuusuario.github.io`).
4. Déjalo como **Public** (Público).
5. **No** marques las opciones de "Add a README file" ni ".gitignore" (ya los tenemos creados aquí).
6. Haz clic en **Create repository**.

### Paso 2: Conectar y subir tus archivos desde la terminal
Abre una terminal en esta misma carpeta (`AntiGravity`) y ejecuta los siguientes comandos (sustituyendo `TU_USUARIO` y el nombre de tu repo):

```bash
# 1. Iniciar el repositorio local
git init

# 2. Añadir todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "feat: portfolio inicial de game designer"

# 4. Asegurarse de estar en la rama main
git branch -M main

# 5. Vincular con tu repositorio de GitHub (copia tu URL de GitHub)
git remote add origin https://github.com/TU_USUARIO/portfolio-game-design.git

# 6. Subir el proyecto
git push -u origin main
```

### Paso 3: Activar GitHub Pages en 2 clics
1. En la página de tu repositorio en GitHub, entra en la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages** (dentro de la sección *Code and automation*).
3. En **Build and deployment > Source**, selecciona **Deploy from a branch**.
4. En **Branch**, selecciona `main` y la carpeta `/(root)`.
5. Haz clic en **Save** (Guardar).
6. ¡Listo! En 1 o 2 minutos, GitHub te mostrará en la parte superior el enlace en vivo a tu página:
   `https://TU_USUARIO.github.io/portfolio-game-design/`

---

## 🛠️ Cómo Personalizar el Contenido

1. **Datos Personales y Enlaces**:
   - Abre `index.html`.
   - Modifica tu nombre, biografía, correo (`mailto:...`) y enlaces a tus perfiles de **Itch.io**, **ArtStation**, **LinkedIn** y **GitHub**.

2. **Proyectos y Fichas de Diseño (GDD)**:
   - Para cambiar las tarjetas que se muestran en el grid, edita los `<article class="project-card">` en `index.html`.
   - Para cambiar la información técnica del modal (pilares, mecánicas, resumen), edita el objeto `projectsData` en `js/main.js`.

3. **Imágenes Propias**:
   - Puedes colocar tus propias capturas de pantalla, renders de Blender o gifs de gameplay en la carpeta `assets/images/` y actualizar los atributos `src="assets/images/..."` en `index.html`.
