import * as vscode from "vscode";
import { NotesStorage } from "../services/notes.storage";
import { NoteTreeItem } from "./note.treeItem";

export class NotesTreeProvider
  implements vscode.TreeDataProvider<NoteTreeItem> {

  private _onDidChangeTreeData =
    new vscode.EventEmitter<void>();

  readonly onDidChangeTreeData =
    this._onDidChangeTreeData.event;

  constructor(private storage: NotesStorage) { }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(item: NoteTreeItem): vscode.TreeItem {
    return item;
  }

  getChildren(): NoteTreeItem[] {
    return this.storage
      .getAll()
      .map(note => new NoteTreeItem(note));
  }
}
