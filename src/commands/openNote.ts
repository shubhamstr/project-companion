import * as vscode from "vscode";
import { Note } from "../models/notes.model";

export async function openNote(note: Note) {
  const doc = await vscode.workspace.openTextDocument({
    content: `# ${note.title}\n\n${note.content}`,
    language: "markdown"
  });

  await vscode.window.showTextDocument(doc, {
    preview: false
  });
}
