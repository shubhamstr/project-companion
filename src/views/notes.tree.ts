import * as vscode from "vscode";
import { NoteTreeItem } from "./note.treeItem";
import { NoteService } from "../services/note.service";

export class NotesTreeProvider
  implements vscode.TreeDataProvider<NoteTreeItem> {

  private _onDidChangeTreeData =
    new vscode.EventEmitter<void>();

  readonly onDidChangeTreeData =
    this._onDidChangeTreeData.event;

  constructor(private noteService: NoteService) { }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(item: NoteTreeItem): vscode.TreeItem {
    return item;
  }

  getChildren(): NoteTreeItem[] {
    return this.noteService
      .getAll()
      .map(note => new NoteTreeItem(note));
  }
}
