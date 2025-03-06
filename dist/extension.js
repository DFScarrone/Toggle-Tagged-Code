/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.toggleTaggedCode', async () => {
        console.log("Comando 'Toggle Tagged Code' ejecutado");
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const fullText = document.getText();
        const tagPattern = /\/\/ @tag:(\w+)/g; // Patrón para encontrar etiquetas
        const edits = [];
        let match;
        while ((match = tagPattern.exec(fullText)) !== null) {
            const tagName = match[1];
            const tagStart = document.positionAt(match.index);
            const tagEnd = document.positionAt(tagPattern.lastIndex);
            // Buscar el bloque de código asociado a la etiqueta
            const codeBlockRange = findCodeBlock(document, tagEnd);
            if (!codeBlockRange) {
                continue;
            }
            const codeBlockText = document.getText(codeBlockRange);
            // Determinar si el bloque está comentado o no
            const isCommented = codeBlockText.trim().startsWith('//');
            // Crear la edición para activar/desactivar el bloque
            if (isCommented) {
                // Descomentar el bloque
                const uncommentedCode = codeBlockText.replace(/^\/\/\s?/gm, '');
                edits.push(vscode.TextEdit.replace(codeBlockRange, uncommentedCode));
            }
            else {
                // Comentar el bloque
                const commentedCode = codeBlockText.replace(/^/gm, '// ');
                edits.push(vscode.TextEdit.replace(codeBlockRange, commentedCode));
            }
        }
        // Aplicar todas las ediciones
        const edit = new vscode.WorkspaceEdit();
        edit.set(document.uri, edits);
        await vscode.workspace.applyEdit(edit);
    });
    context.subscriptions.push(disposable);
}
/**
 * Encuentra el rango del bloque de código asociado a una etiqueta.
 * Usa líneas vacías para determinar el final del bloque.
 */
function findCodeBlock(document, startPosition) {
    const lines = document.getText().split('\n');
    const startLine = startPosition.line;
    let endLine = startLine;
    // Encontrar el final del bloque basado en líneas vacías
    for (let i = startLine + 1; i < lines.length; i++) {
        if (lines[i].trim() === '' || lines[i].trim().startsWith('//')) {
            break; // Termina el bloque si hay una línea vacía o un comentario
        }
        endLine = i;
    }
    return new vscode.Range(startPosition, new vscode.Position(endLine, lines[endLine].length));
}
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map