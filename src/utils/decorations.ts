import * as vscode from 'vscode';
import { readData } from '../storage/fileStorage';

let decorationType: vscode.TextEditorDecorationType | undefined;

export function createDecorationType(context: vscode.ExtensionContext) {
  if (!decorationType) {
    decorationType = vscode.window.createTextEditorDecorationType({
      gutterIconPath: context.asAbsolutePath('resources/bookmark.svg'),
      gutterIconSize: 'contain'
    });
  }
  return decorationType;
}

export function applyDecorationsForEditor(editor: vscode.TextEditor | undefined) {
  if (!editor) { return; }
  const docPath = editor.document.fileName;
  const data = readData();
  const bookmarks = (data.bookmarks || []).filter(b => b.file === docPath);
  const ranges = bookmarks.map(b => new vscode.Range(b.line, 0, b.line, 0));
  if (decorationType) {
    editor.setDecorations(decorationType, ranges);
  }
}

export function refreshDecorationsForAllOpenEditors() {
  vscode.window.visibleTextEditors.forEach(applyDecorationsForEditor);
}
