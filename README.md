# Kdhaly El Rincón del café

Sitio web prémium e interactivo para la cafetería **Kdhaly El Rincón del café**, desarrollado con arquitectura moderna de Frontend, storytelling con scroll sincronizado a 240 frames en Canvas, y diseño editorial galardonado.

---

## 🎨 Dirección de Arte y Skills Aplicadas

1. **Taste Skill (Curaduría visual de clase mundial):**
   - Paleta de color fiel a la referencia: Crema/marfil cálido (`#F7F4EB`), verde bosque profundo (`#1A3B2B`), acentos tostados de café (`#8B5A2B`) y dorado (`#C28B47`).
   - Microtextura táctil de papel/lino orgánico sobre toda la interfaz.
   - Tipografía editorial combinada: `Bebas Neue` (display audaz), `Fraunces / Playfair Display` (serif editorial clásico), `Plus Jakarta Sans` (cuerpo moderno).

2. **Emil Kowalski (Físicas de interacción y microanimaciones):**
   - **Scrubbing de Canvas fluido con Lerp:** En lugar de saltos bruscos de scroll, el canvas interpola los 240 frames mediante una función de suavizado (*linear interpolation*) a 60/120 FPS sin parpadeos.
   - **Retroalimentación táctil (`:active`):** Botones con `transform: scale(0.97)` y curvas de aceleración personalizadas (`cubic-bezier(0.23, 1, 0.32, 1)`).
   - **Entradas orgánicas:** Modales y elementos que nunca parten de `scale(0)`, sino de `scale(0.95)` con transición de opacidad.
   - **Parallax de baja fricción:** Granos de café y fotos Polaroid flotantes con respuesta natural al movimiento del ratón y scroll.

3. **Impeccable (Jerarquía y Microcopywriting Persuasivo):**
   - Secciones completamente redactadas con tono de hospitalidad de especialidad en español.
   - Formularios accesibles con feedback celebratorio (confetti interactivo).
   - Espaciado rítmico, drop-caps y líderes de puntos editoriales en menús.

---

## ☕ Secciones Incluidas

1. **Preloader Asíncrono:** Precarga en memoria de los 240 frames WebP con barra de progreso y porcentaje.
2. **Hero Section con Canvas Scroll:** Canvas sticky fijado a un contenedor de scroll de `380vh` para controlar el scrub fotograma a fotograma de la taza y los granos de café flotantes.
3. **Nuestra Historia:** Párrafo editorial con drop-cap y assets flotantes con parallax (taza con latte art y hojaldre artesanal).
4. **Nuestros Especiales:** Cuadrícula con miniaturas circulares, descripciones gastronómicas, precios en pesos mexicanos ($ MXN) y botones de adición directa.
5. **Banner Divisorio:** Franja verde bosque con Polaroids flotantes y botón de llamado a la acción.
6. **Explora Nuestro Menú:** Menú con filtros dinámicos por categorías (*Todos*, *Café & Espresso*, *Té & Botánicos*) y mancha de taza de café integrada.
7. **Galería Visual (Bento Grid):** Mosaico con efecto de zoom suave al cursor y distintivo central *"UN SABOR QUE QUERRÁS COMPARTIR"*.
8. **Nuestros Clientes Felices (Testimonios):** Carrusel interactivo con tarjetas en papel crema, reseñas reales y controles anterior/siguiente.
9. **Encuentra Kdhaly El Rincón del café:** 3 tarjetas de contacto con dirección, teléfono y horarios de apertura.
10. **Footer Masivo:** Enlaces de navegación, suscripción al club de café y aviso de derechos reservados.
11. **Modal de Pedido Rápido:** Drawer/modal con opciones de bebida, tipo de leche, personalización de nombre y celebración visual con confetti.

---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Iniciar en Modo Desarrollo (HMR):
```bash
npm run dev
```
Abre en tu navegador la URL indicada (habitualmente `http://localhost:3000`).

### 2. Generar Build de Producción:
```bash
npm run build
```

### 3. Previsualizar Build de Producción:
```bash
npm run preview
```
