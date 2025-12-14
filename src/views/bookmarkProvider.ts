import * as vscode from "vscode";
import * as path from "path";
import { Bookmark } from "../models/bookmark.model";
import { BookmarkService } from "../services/bookmark.service";

export class BookmarkItem extends vscode.TreeItem {
  constructor(public readonly bookmark: Bookmark) {
    super(
      BookmarkItem.getLabel(bookmark),
      vscode.TreeItemCollapsibleState.None
    );

    this.tooltip = `${bookmark.file}:${bookmark.line + 1}\n${bookmark.label || ""}`;

    this.command = {
      command: "project-companion.jumpToBookmark",
      title: "Jump to Bookmark",
      arguments: [bookmark]
    };

    this.contextValue = "bookmarkItem";
    this.iconPath = new vscode.ThemeIcon("bookmark");
  }

  private static getLabel(bookmark: Bookmark): string {
    const file = path.basename(bookmark.file);
    const line = bookmark.line + 1;
    const label = bookmark.label
      ? ` (${BookmarkItem.limit(bookmark.label, 10)})`
      : "";
    return `${file}:${line}${label}`;
  }

  private static limit(text: string, max = 10): string {
    return text.length > max
      ? text.slice(0, max) + "…"
      : text;
  }
}

export class BookmarkProvider
  implements vscode.TreeDataProvider<BookmarkItem> {

  private _onDidChangeTreeData =
    new vscode.EventEmitter<void>();

  readonly onDidChangeTreeData =
    this._onDidChangeTreeData.event;

  constructor(private bookmarkService: BookmarkService) { }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: BookmarkItem): vscode.TreeItem {
    return element;
  }

  getChildren(): BookmarkItem[] {
    return this.bookmarkService
      .getAll()
      .map(b => new BookmarkItem(b));
  }
}
