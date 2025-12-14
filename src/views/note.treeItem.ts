import * as vscode from "vscode";
import { ProjectNote } from "../types/notes.types";

export class NoteTreeItem extends vscode.TreeItem {
  constructor(public readonly note: ProjectNote) {
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
