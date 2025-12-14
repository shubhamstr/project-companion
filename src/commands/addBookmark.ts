import * as vscode from "vscode";
import { Bookmark } from "../models/bookmark.model";
import { BookmarkService } from "../services/bookmark.service";

export async function addBookmarkCommand(
  bookmarkService: BookmarkService
) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage(
      "Open a file and place cursor to add a bookmark."
    );
    return;
  }

  const doc = editor.document;
  const pos = editor.selection.active;

  const label = await vscode.window.showInputBox({
    prompt: "Optional label for bookmark"
  });

  const bookmark: Bookmark = {
    id: crypto.randomUUID(),
    file: doc.fileName,
    line: pos.line,
    label,
    createdAt: new Date().toISOString()
  };

  const added = bookmarkService.add(bookmark);

  if (!added) {
    vscode.window.showInformationMessage(
      "Bookmark already exists on this line."
    );
    return;
  }

  vscode.window.showInformationMessage("Bookmark added.");

  // refresh tree + decorations
  vscode.commands.executeCommand("project-companion.refreshBookmarks");
  vscode.commands.executeCommand("project-companion.refreshDecorations");
}
