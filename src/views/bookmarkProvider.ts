import * as vscode from 'vscode';
import { Bookmark } from '../models/bookmark';
import { readData } from '../storage/fileStorage';
import * as path from 'path';

export class BookmarkItem extends vscode.TreeItem {
  constructor(
    public readonly bookmark: Bookmark
  ) {
    super(path.basename(bookmark.file) + `:${bookmark.line + 1} (${BookmarkItem.limit(bookmark.label || '', 10) || ''})`, vscode.TreeItemCollapsibleState.None);
    this.tooltip = `${bookmark.file}:${bookmark.line + 1}\n${bookmark.label || ''}`;
    this.command = {
      command: 'project-companion.jumpToBookmark',
      title: 'Jump to Bookmark',
      arguments: [bookmark]
    };
    this.contextValue = 'bookmarkItem';
  }
  static limit(text: string, max = 10): string {
    return text.length > max ? text.slice(0, max) + "…" : text;
  }
}

export class BookmarkProvider implements vscode.TreeDataProvider<BookmarkItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<BookmarkItem | undefined | void> = new vscode.EventEmitter<BookmarkItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<BookmarkItem | undefined | void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: BookmarkItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<BookmarkItem[]> {
    const data = readData();
    const bookmarks = data.bookmarks || [];
    const items = bookmarks.map(b => new BookmarkItem(b));
    return Promise.resolve(items);
  }
}
