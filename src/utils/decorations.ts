import * as vscode from "vscode";
import { BookmarkService } from "../services/bookmark.service";
import { Bookmark } from "../models/bookmark.model";

let decorationType: vscode.TextEditorDecorationType | undefined;

export function createDecorationType(context: vscode.ExtensionContext) {
  if (!decorationType) {
    decorationType = vscode.window.createTextEditorDecorationType({
      gutterIconPath: context.asAbsolutePath(
        "resources/bookmark.svg"
      ),
      gutterIconSize: "contain"
    });
  }
  return decorationType;
}

export function applyDecorationsForEditor(
  editor: vscode.TextEditor | undefined,
  bookmarkService: BookmarkService
) {
  if (!editor || !decorationType) { return; }

  const docPath = editor.document.fileName;

  const bookmarks: Bookmark[] =
    bookmarkService.getAll().filter(
      b => b.file === docPath
    );

  const ranges = bookmarks.map(
    b => new vscode.Range(b.line, 0, b.line, 0)
  );

  editor.setDecorations(decorationType, ranges);
}

export function refreshDecorationsForAllOpenEditors(
  bookmarkService: BookmarkService
) {
  vscode.window.visibleTextEditors.forEach(editor =>
    applyDecorationsForEditor(editor, bookmarkService)
  );
}
