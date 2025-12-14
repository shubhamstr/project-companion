import * as vscode from "vscode";
import { Note, NoteScope } from "../models/notes.model";
import { NoteService } from "../services/note.service";

type ScopePickItem = vscode.QuickPickItem & {
  value: NoteScope
}

export async function addNote(noteService: NoteService) {
  const scopePick = await vscode.window.showQuickPick<ScopePickItem>(
    [
      { label: "Global Note", value: "global" },
      { label: "Current File Note", value: "file" }
    ],
    { placeHolder: "Select note scope" }
  );

  if (!scopePick) { return; }

  const title = await vscode.window.showInputBox({
    prompt: "Note title",
    validateInput: v =>
      v.trim().length === 0 ? "Title is required" : undefined
  });
  if (!title) { return; }

  const content = await vscode.window.showInputBox({
    prompt: "Note content",
    placeHolder: "Write your note here..."
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

  const note: Note = {
    id: crypto.randomUUID(),
    scope: scopePick.value,
    title,
    content,
    filePath,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  noteService.add(note);

  vscode.window.showInformationMessage(
    `Note "${title}" added`
  );
}
