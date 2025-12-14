import * as vscode from "vscode";
import { Note } from "../models/notes.model";

export class NoteTreeItem extends vscode.TreeItem {
  constructor(public readonly note: Note) {
    super(note.title, vscode.TreeItemCollapsibleState.None);

    this.tooltip = note.content;
    this.contextValue = "projectNote";

    this.command = {
      command: "project-companion.notes.open",
      title: "Open Note",
      arguments: [note]
    };

    this.iconPath = new vscode.ThemeIcon("note");
  }
}
