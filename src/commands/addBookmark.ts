import * as vscode from 'vscode';
import { readData, writeData } from '../storage/fileStorage';
import { Bookmark } from '../models/bookmark';

export async function addBookmarkCommand() {
  const { v4: uuidv4 } = await import("uuid");
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('Open a file and place cursor to add a bookmark.');
    return;
  }
  const doc = editor.document;
  const pos = editor.selection.active;
  const label = await vscode.window.showInputBox({ prompt: 'Optional label for bookmark' });

  const bookmark: Bookmark = {
    id: uuidv4(),
    file: doc.fileName,
    line: pos.line,
    label: label,
    createdAt: new Date().toISOString()
  };

  const data = readData();
  data.bookmarks = data.bookmarks || [];
  // avoid duplicates for same file-line
  if (!data.bookmarks.some(b => b.file === bookmark.file && b.line === bookmark.line)) {
    data.bookmarks.push(bookmark);
    writeData(data);
    vscode.window.showInformationMessage('Bookmark added.');
    // notify via event (we'll wire a refresh function)
    vscode.commands.executeCommand('project-companion.refreshBookmarks');
    // refresh decorations
    vscode.commands.executeCommand('project-companion.refreshDecorations');
  } else {
    vscode.window.showInformationMessage('Bookmark already exists on this line.');
  }
}
