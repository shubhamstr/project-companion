import * as vscode from "vscode";
import { ProjectNote } from "../types/notes.types";

const STORAGE_KEY = "project-companion.notes";

export class NotesStorage {
  constructor(private context: vscode.ExtensionContext) { }

  getAll(): ProjectNote[] {
    return this.context.workspaceState.get<ProjectNote[]>(STORAGE_KEY, []);
  }

  saveAll(notes: ProjectNote[]) {
    return this.context.workspaceState.update(STORAGE_KEY, notes);
  }

  add(note: ProjectNote) {
    const notes = this.getAll();
    notes.push(note);
    return this.saveAll(notes);
  }

  update(note: ProjectNote) {
    const notes = this.getAll().map(n => (n.id === note.id ? note : n));
    return this.saveAll(notes);
  }

  delete(noteId: string) {
    const notes = this.getAll().filter(n => n.id !== noteId);
    return this.saveAll(notes);
  }
}
