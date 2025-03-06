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
let statusBarItem;
// Definir patrones de comentarios para cada lenguaje
const commentPatterns = {
    javascript: '//',
    typescript: '//',
    java: '//',
    csharp: '//',
    cpp: '//',
    go: '//',
    php: '//',
    ruby: '#',
    swift: '//',
    kotlin: '//',
    scala: '//',
    rust: '//',
    perl: '//',
    dart: '//',
    bash: '#',
    sh: '#',
    zsh: '#',
    lua: '--',
    typescriptreact: '//',
    javascriptreact: '//',
    python: '#',
    // Agrega más lenguajes según sea necesario
};
function activate(context) {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'extension.toggleTaggedCode';
    context.subscriptions.push(statusBarItem);
    let disposable = vscode.commands.registerCommand('extension.toggleTaggedCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const languageId = document.languageId;
        const commentPrefix = commentPatterns[languageId] || '#'; // Default to # for unknown languages
        const fullText = document.getText();
        const tagPattern = new RegExp(`${commentPrefix} @tag:(\\w+)`, 'g');
        const tags = [];
        let match;
        while ((match = tagPattern.exec(fullText)) !== null) {
            if (!tags.includes(match[1])) {
                tags.push(match[1]);
            }
        }
        const selectedTag = await vscode.window.showQuickPick(tags, {
            placeHolder: 'Selecciona una etiqueta para activar/desactivar'
        });
        if (!selectedTag) {
            return;
        }
        const edits = [];
        let isCommented = false;
        while ((match = tagPattern.exec(fullText)) !== null) {
            if (match[1] !== selectedTag) {
                continue;
            }
            const tagStart = document.positionAt(match.index);
            const tagEnd = document.positionAt(tagPattern.lastIndex);
            const codeBlockRange = findCodeBlock(document, tagEnd);
            if (!codeBlockRange) {
                continue;
            }
            const codeBlockText = document.getText(codeBlockRange);
            isCommented = isCodeBlockCommented(codeBlockText, commentPrefix);
            edits.push(...commentOrUncommentCodeBlock(codeBlockText, codeBlockRange, isCommented, commentPrefix));
        }
        if (edits.length > 0) {
            const edit = new vscode.WorkspaceEdit();
            edit.set(document.uri, edits);
            await vscode.workspace.applyEdit(edit);
            // Mensaje detallado
            const action = isCommented ? 'descomentado' : 'comentado';
            vscode.window.showInformationMessage(`El bloque de código etiquetado con '${selectedTag}' ha sido ${action}.`);
            updateStatusBar(!isCommented, selectedTag);
        }
    });
    context.subscriptions.push(disposable);
}
function findCodeBlock(document, startPosition) {
    const lines = document.getText().split('\n');
    let startLine = startPosition.line;
    let endLine = startLine;
    for (let i = startLine + 1; i < lines.length; i++) {
        if (lines[i].trim() === '') {
            break;
        }
        endLine = i;
    }
    return new vscode.Range(new vscode.Position(startLine + 1, 0), new vscode.Position(endLine, lines[endLine].length));
}
function isCodeBlockCommented(codeBlockText, commentPrefix) {
    const lines = codeBlockText.split('\n');
    return lines.every(line => line.trim().startsWith(commentPrefix));
}
function commentOrUncommentCodeBlock(codeBlockText, range, isCommented, commentPrefix) {
    const lines = codeBlockText.split('\n');
    const edits = [];
    if (isCommented) {
        // Descomentar
        lines.forEach((line, index) => {
            if (line.trim().startsWith(commentPrefix)) {
                const lineStart = new vscode.Position(range.start.line + index, 0);
                const lineEnd = new vscode.Position(range.start.line + index, commentPrefix.length + 1); // +1 para incluir el espacio
                edits.push(vscode.TextEdit.delete(new vscode.Range(lineStart, lineEnd)));
            }
        });
    }
    else {
        // Comentar
        lines.forEach((line, index) => {
            if (!line.trim().startsWith(commentPrefix)) {
                const lineStart = new vscode.Position(range.start.line + index, 0);
                edits.push(vscode.TextEdit.insert(lineStart, `${commentPrefix} `));
            }
        });
    }
    return edits;
}
function updateStatusBar(isActive, tag) {
    statusBarItem.text = isActive ? `$(eye) ${tag}: Activo` : `$(eye-closed) ${tag}: Comentado`;
    statusBarItem.show();
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