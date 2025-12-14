import * as vscode from "vscode";
import { ProjectNote } from "../types/notes.types";

export async function openNote(note: ProjectNote) {
  const doc = await vscode.workspace.openTextDocument({
    content: `# ${note.title}\n\n${note.content}`,
    language: "markdown"
  });

  await vscode.window.showTextDocument(doc, {
    preview: false
  });
}
