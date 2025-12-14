import * as vscode from "vscode";
import { ProjectNote } from "../types/notes.types";

const STORAGE_KEY = "project-companion.notes";

interface NotesState {
  version: 1
  notes: ProjectNote[]
}

const DEFAULT_STATE: NotesState = {
  version: 1,
  notes: []
};

export class NotesStorage {
  constructor(private context: vscode.ExtensionContext) { }

  private getState(): NotesState {
    return this.context.workspaceState.get<NotesState>(
      STORAGE_KEY,
      DEFAULT_STATE
    );
  }

  private saveState(state: NotesState) {
    return this.context.workspaceState.update(STORAGE_KEY, state);
  }

  getAll(): ProjectNote[] {
    return [...this.getState().notes];
  }

  add(note: ProjectNote) {
    const state = this.getState();

    return this.saveState({
      ...state,
      notes: [...state.notes, note]
    });
  }

  update(note: ProjectNote) {
    const state = this.getState();

    return this.saveState({
      ...state,
      notes: state.notes.map(n =>
        n.id === note.id ? note : n
      )
    });
  }

  delete(noteId: string) {
    const state = this.getState();

    return this.saveState({
      ...state,
      notes: state.notes.filter(n => n.id !== noteId)
    });
  }

  clear() {
    return this.saveState(DEFAULT_STATE);
  }
}
