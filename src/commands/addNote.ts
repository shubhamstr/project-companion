import * as vscode from "vscode";
import { NotesStorage } from "../services/notes.storage";

export async function addNote(storage: NotesStorage) {
  const { v4: uuidv4 } = await import("uuid");
  const scope = await vscode.window.showQuickPick(
    ["Global", "Current File"],
    { placeHolder: "Note scope" }
  );
  if (!scope) { return; }

  const title = await vscode.window.showInputBox({
    prompt: "Note title"
  });
  if (!title) { return; }

  const content = await vscode.window.showInputBox({
    prompt: "Note content"
  });
  if (!content) { return; }

  const editor = vscode.window.activeTextEditor;

  storage.add({
    id: uuidv4(),
    scope: scope === "Global" ? "global" : "file",
    title,
    content,
    filePath:
      scope === "Current File"
        ? editor?.document.uri.fsPath
        : undefined,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
}
