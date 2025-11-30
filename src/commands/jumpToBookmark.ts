import * as vscode from 'vscode';
import { Bookmark } from '../models/bookmark';

export async function jumpToBookmarkCommand(bookmark?: Bookmark) {
  if (!bookmark) {
    vscode.window.showInformationMessage('No bookmark specified.');
    return;
  }
  const uri = vscode.Uri.file(bookmark.file);
  try {
    const doc = await vscode.workspace.openTextDocument(uri);
    const editor = await vscode.window.showTextDocument(doc);
    const pos = new vscode.Position(bookmark.line, 0);
    editor.selection = new vscode.Selection(pos, pos);
    editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
  } catch (e) {
    vscode.window.showErrorMessage('Could not open file for bookmark: ' + e);
  }
}
