


Toggle Tagged Code
Version 1.0.0
License MIT

Toggle Tagged Code es una extensión de Visual Studio Code diseñada para ayudarte a comentar y descomentar bloques de código etiquetados de forma rápida y eficiente. Es especialmente útil cuando trabajas con grandes cantidades de código y necesitas activar/desactivar secciones específicas por diversos motivos, como depuración (debugging) , pruebas condicionales o personalización del comportamiento del programa.

🚀 Características principales
Manejo de grandes volúmenes de código: Activa o desactiva bloques de código etiquetados sin tener que buscar manualmente las líneas correspondientes.
Depuración simplificada: Ideal para debugging , ya que puedes comentar/descomentar rápidamente bloques de código relacionados con diferentes escenarios de prueba.
Compatibilidad multi-lenguaje: Soporta múltiples lenguajes de programación (JavaScript, Python, Java, etc.).
Interfaz intuitiva: Usa un menú emergente para seleccionar las etiquetas disponibles en el documento.
Barra de estado: Muestra el estado actual del bloque de código (activo o comentado) directamente en la barra de estado de VS Code.
📋 Requisitos
Visual Studio Code versión 1.80.0 o superior.
Conocimiento básico de cómo usar etiquetas en comentarios.
💡 Casos de uso
1. Debugging
Cuando estás depurando un programa, es común que necesites activar o desactivar ciertas partes del código para probar diferentes escenarios. Con Toggle Tagged Code , puedes etiquetar bloques de código y alternar entre ellos fácilmente.

Ejemplo:
javascript
// @tag:debug
console.log("Este bloque está activo durante el debugging.");
console.log("Aquí puedes agregar logs adicionales.");

// @tag:production
console.log("Este bloque está activo en producción.");
Con un solo clic, puedes alternar entre el bloque de debugging y el bloque de producción .

2. Pruebas condicionales
Si tienes múltiples configuraciones o escenarios de prueba, puedes etiquetar cada uno y activar/desactivarlos según sea necesario.

Ejemplo:
python
# @tag:test-case-1
print("Ejecutando caso de prueba 1.")

# @tag:test-case-2
print("Ejecutando caso de prueba 2.")

Esto te permite probar diferentes configuraciones sin tener que modificar manualmente el código.

3. Personalización del comportamiento
En proyectos grandes, es común tener funcionalidades que solo deben estar activas en ciertos entornos (por ejemplo, desarrollo, producción, staging). Con esta extensión, puedes etiquetar bloques de código para cada entorno y alternar entre ellos fácilmente.

Ejemplo:
javascript
// @tag:development
console.log("Esta función solo está disponible en desarrollo.");

// @tag:staging
console.log("Esta función está disponible en staging.");

// @tag:production
console.log("Esta función está disponible en producción.");

🛠️ Instalación
Abre Visual Studio Code.
Ve a la pestaña Extensions (Ctrl+Shift+X o Cmd+Shift+X).
Busca "Toggle Tagged Code" .
Haz clic en Install .
O instala directamente desde la línea de comandos:

bash
Copiar
1
code --install-extension TU_NOMBRE_DE_USUARIO.toggle-tagged-code
📝 Uso
1. Etiquetar bloques de código
Para etiquetar un bloque de código, agrega un comentario en la línea anterior al bloque con el siguiente formato:

javascript
// @tag:nombre-de-la-etiqueta
console.log("Este es un bloque de código etiquetado.");
console.log("Puedes activarlo o desactivarlo fácilmente.");
En Python:

python
# @tag:nombre-de-la-etiqueta
print("Este es un bloque de código etiquetado.")
print("Puedes activarlo o desactivarlo fácilmente.")
2. Activar/desactivar bloques
Ejecuta el comando "Toggle Tagged Code" :
Presiona Ctrl+Shift+P (o Cmd+Shift+P) y busca "Toggle Tagged Code" .
O haz clic en el ícono correspondiente en la barra de estado.
Selecciona la etiqueta que deseas activar/desactivar desde el menú emergente.
El bloque de código asociado se comentará o descomentará automáticamente.
🎨 Personalización
Puedes personalizar los prefijos de comentario para diferentes lenguajes modificando el objeto commentPatterns en el código fuente. Por ejemplo:

typescript
const commentPatterns = {
  javascript: '//',
  python: '#',
  // Agrega más lenguajes según sea necesario
};
📸 Capturas de pantalla
Antes de comentar:
Antes de comentar

Después de comentar:
Después de comentar

(Reemplaza estas rutas con capturas reales si decides incluirlas.)

🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras algún error o tienes ideas para mejorar esta extensión, no dudes en abrir un issue o enviar un pull request en el repositorio de GitHub .

📜 Licencia
Este proyecto está bajo la licencia MIT .

🙏 Agradecimientos
Inspirado en herramientas similares para gestionar bloques de código.
Gracias a la comunidad de Visual Studio Code por su apoyo continuo.
🔗 Enlaces útiles
Visual Studio Code Marketplace
Repositorio en GitHub
Reportar problemas
