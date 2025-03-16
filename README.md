
# Toggle Tagged Code

&#x20;

**Toggle Tagged Code** es una extensión de Visual Studio Code diseñada para comentar y descomentar bloques de código etiquetados de forma rápida y eficiente. Es ideal para manejar grandes volúmenes de código, depuración (debugging), pruebas condicionales y personalización del comportamiento de un programa.

---

## 🚀 Características principales

✅ **Manejo de grandes volúmenes de código**: Activa o desactiva bloques etiquetados sin buscarlos manualmente.
✅ **Depuración simplificada**: Comenta/descomenta rápidamente bloques de código para diferentes escenarios de prueba.
✅ **Compatibilidad multi-lenguaje**: Soporta múltiples lenguajes de programación (JavaScript, Python, Java, etc.).
✅ **Interfaz intuitiva**: Usa un menú emergente para seleccionar etiquetas en el documento.
✅ **Barra de estado**: Indica si un bloque está activo o comentado en la barra de estado de VS Code.

---

## 📋 Requisitos

- **Visual Studio Code** versión **1.80.0** o superior.
- Conocimiento básico sobre etiquetas en comentarios.

---

## 💡 Casos de uso

### 🔍 Debugging

Cuando depuras un programa, es común activar o desactivar partes del código para probar distintos escenarios.

```javascript
// @tag:debug
console.log("Este bloque está activo durante el debugging.");
console.log("Aquí puedes agregar logs adicionales.");

// @tag:production
console.log("Este bloque está activo en producción.");
```

Con un solo clic, puedes alternar entre el bloque de `debugging` y `producción`.

---

### 🧪 Pruebas condicionales

Si tienes múltiples configuraciones o escenarios de prueba, puedes etiquetar cada uno y activarlos/desactivarlos según sea necesario.

```python
# @tag:test-case-1
print("Ejecutando caso de prueba 1.")

# @tag:test-case-2
print("Ejecutando caso de prueba 2.")
```

Esto te permite probar diferentes configuraciones sin modificar el código manualmente.

---

### ⚙️ Personalización del comportamiento

En proyectos grandes, algunas funcionalidades solo deben estar activas en ciertos entornos como desarrollo, producción o staging.

```javascript
// @tag:development
console.log("Esta función solo está disponible en desarrollo.");

// @tag:staging
console.log("Esta función está disponible en staging.");

// @tag:production
console.log("Esta función está disponible en producción.");
```

---

## 🛠️ Instalación

1. Abre **Visual Studio Code**.
2. Ve a la pestaña **Extensions** (`Ctrl+Shift+X` o `Cmd+Shift+X`).
3. Busca **"Toggle Tagged Code"**.
4. Haz clic en **Install**.

O instala directamente desde la línea de comandos:

```bash
code --install-extension DFScarrone.toggle-tagged-code
```

---

## 📝 Uso

### 📌 Etiquetar bloques de código

Para etiquetar un bloque de código, agrega un comentario en la línea anterior con este formato:

#### JavaScript:

```javascript
// @tag:nombre-de-la-etiqueta
console.log("Este es un bloque de código etiquetado.");
console.log("Puedes activarlo o desactivarlo fácilmente.");
```

#### Python:

```python
# @tag:nombre-de-la-etiqueta
print("Este es un bloque de código etiquetado.")
print("Puedes activarlo o desactivarlo fácilmente.")
```

---

### 🔄 Activar/desactivar bloques

1. Ejecuta el comando **"Toggle Tagged Code"**:
   - Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P`).
   - Busca **"Toggle Tagged Code"**.
   - Selecciona la etiqueta que deseas activar/desactivar.
2. El bloque de código se comentará o descomentará automáticamente.

---

## 🎨 Personalización

Puedes modificar los prefijos de comentario para diferentes lenguajes en el código fuente.

```typescript
const commentPatterns = {
  javascript: '//',
  python: '#',
  // Agrega más lenguajes según sea necesario
};
```

---

## 📷 Capturas de pantalla

![Búsqueda de extensión](imagenes/Captura%20de%20pantalla%20(325).png)  

![Muestra de bloques etiquetados](imagenes/Captura%20de%20pantalla%20(326).png)  

![Selección de etiquetas](imagenes/Captura%20de%20pantalla%20(327).png)  

![Selección de etiquetas](imagenes/Captura%20de%20pantalla%20(328).png)  

![Bloque comentado](imagenes/Captura%20de%20pantalla%20(329).png)  




---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras errores o tienes ideas para mejorar la extensión, abre un **issue** o envía un **pull request** en el [repositorio de GitHub](#).

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.

---

## 🙏 Agradecimientos

Inspirado en herramientas similares para gestionar bloques de código. ¡Gracias a la comunidad de VS Code por su apoyo continuo!

---

## 🔗 Enlaces útiles

- 📌 [Visual Studio Code Marketplace](#)
- 🛠️ [Repositorio en GitHub](#)
- 🐞 [Reportar problemas](#)

