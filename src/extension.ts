import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

// Definir patrones de comentarios para cada lenguaje
const commentPatterns: { [key: string]: string } = {
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

export function activate(context: vscode.ExtensionContext) {
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
    const tags: string[] = [];
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

    const edits: vscode.TextEdit[] = [];
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

function findCodeBlock(document: vscode.TextDocument, startPosition: vscode.Position): vscode.Range | undefined {
  const lines = document.getText().split('\n');
  let startLine = startPosition.line;
  let endLine = startLine;

  for (let i = startLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '') {
      break;
    }
    endLine = i;
  }

  return new vscode.Range(
    new vscode.Position(startLine + 1, 0),
    new vscode.Position(endLine, lines[endLine].length)
  );
}

function isCodeBlockCommented(codeBlockText: string, commentPrefix: string): boolean {
  const lines = codeBlockText.split('\n');
  return lines.every(line => line.trim().startsWith(commentPrefix));
}

function commentOrUncommentCodeBlock(codeBlockText: string, range: vscode.Range, isCommented: boolean, commentPrefix: string): vscode.TextEdit[] {
  const lines = codeBlockText.split('\n');
  const edits: vscode.TextEdit[] = [];

  if (isCommented) {
    // Descomentar
    lines.forEach((line, index) => {
      if (line.trim().startsWith(commentPrefix)) {
        const lineStart = new vscode.Position(range.start.line + index, 0);
        const lineEnd = new vscode.Position(range.start.line + index, commentPrefix.length + 1); // +1 para incluir el espacio
        edits.push(vscode.TextEdit.delete(new vscode.Range(lineStart, lineEnd)));
      }
    });
  } else {
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

function updateStatusBar(isActive: boolean, tag: string) {
  statusBarItem.text = isActive ? `$(eye) ${tag}: Activo` : `$(eye-closed) ${tag}: Comentado`;
  statusBarItem.show();
}

export function deactivate() {}