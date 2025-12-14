import * as vscode from "vscode";
import { NotesStorage } from "../services/notes.storage";
import { NoteScope } from "../types/notes.types";

type ScopePickItem = vscode.QuickPickItem & {
  value: NoteScope
}

export async function addNote(storage: NotesStorage) {
  const scopePick = await vscode.window.showQuickPick<ScopePickItem>(
    [
      { label: "Global Note", value: "global" },
      { label: "Current File Note", value: "file" }
    ],
    { placeHolder: "Select note scope" }
  );

  if (!scopePick) { return; }

  const title = await vscode.window.showInputBox({
    prompt: "Note title"
  });
  if (!title) { return; }

  const content = await vscode.window.showInputBox({
    prompt: "Note content"
  });
  if (!content) { return; }

  let filePath: string | undefined;

  if (scopePick.value === "file") {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage(
        "Open a file to add a file note"
      );
      return;
    }
    filePath = editor.document.uri.fsPath;
  }

  storage.add({
    id: crypto.randomUUID(),
    scope: scopePick.value,
    title,
    content,
    filePath,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
}
