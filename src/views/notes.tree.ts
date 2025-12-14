import * as vscode from "vscode";
import { ProjectNote } from "../types/notes.types";

export class NotesTreeProvider
  implements vscode.TreeDataProvider<ProjectNote> {

  private _onDidChangeTreeData =
    new vscode.EventEmitter<ProjectNote | undefined>();

  readonly onDidChangeTreeData =
    this._onDidChangeTreeData.event;

  constructor(private getNotes: () => ProjectNote[]) { }

  refresh() {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(note: ProjectNote): vscode.TreeItem {
    const item = new vscode.TreeItem(
      note.title,
      vscode.TreeItemCollapsibleState.None
    );

    item.tooltip = note.content;
    item.contextValue = "projectNote";

    item.command = {
      command: "project-companion.notes.open",
      title: "Open Note",
      arguments: [note]
    };

    return item;
  }

  getChildren(): ProjectNote[] {
    return this.getNotes();
  }
}
