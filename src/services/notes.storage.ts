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

  // 🔐 Internal state access
  private getState(): NotesState {
    return this.context.workspaceState.get<NotesState>(
      STORAGE_KEY,
      DEFAULT_STATE
    );
  }

  private saveState(state: NotesState) {
    return this.context.workspaceState.update(STORAGE_KEY, state);
  }

  // 📤 Public API (unchanged usage)
  getAll(): ProjectNote[] {
    return [...this.getState().notes];
  }

  add(note: ProjectNote) {
    const state = this.getState();

    const nextState: NotesState = {
      ...state,
      notes: [...state.notes, note]
    };

    return this.saveState(nextState);
  }

  update(note: ProjectNote) {
    const state = this.getState();

    const nextState: NotesState = {
      ...state,
      notes: state.notes.map(n =>
        n.id === note.id ? note : n
      )
    };

    return this.saveState(nextState);
  }

  delete(noteId: string) {
    const state = this.getState();

    const nextState: NotesState = {
      ...state,
      notes: state.notes.filter(n => n.id !== noteId)
    };

    return this.saveState(nextState);
  }

  clear() {
    return this.saveState(DEFAULT_STATE);
  }
}
