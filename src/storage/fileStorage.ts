import * as fs from 'fs';
import * as path from 'path';
import { Bookmark } from '../models/bookmark.model';
import * as vscode from 'vscode';

const FILENAME = '.vscode/project-companion.json';

export interface DevData {
  bookmarks?: Bookmark[];
  // notes?: ...
  // tasks?: ...
}

export function getWorkspaceFilePath(): string | undefined {
  const ws = vscode.workspace.workspaceFolders?.[0];
  // if (!ws) { return undefined; }
  // return path.join(ws.uri.fsPath, FILENAME);
  if (!ws) {
    vscode.window.showErrorMessage("No workspace open to save bookmarks.");
    return undefined;
  }
  const fullPath = path.join(ws.uri.fsPath, FILENAME);

  // Ensure the .vscode directory exists (important!)
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return fullPath;
}

export function readData(): DevData {
  const fp = getWorkspaceFilePath();
  if (!fp) { return {}; }
  try {
    if (!fs.existsSync(fp)) { return {}; }
    const raw = fs.readFileSync(fp, 'utf-8');
    return JSON.parse(raw) as DevData;
  } catch (e) {
    console.error('Failed to read project-companion file', e);
    return {};
  }
}

export function writeData(data: DevData) {
  const fp = getWorkspaceFilePath();
  console.log('fp', fp);
  if (!fp) {
    vscode.window.showErrorMessage('No workspace open to save bookmarks.');
    return;
  }
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf-8');
}
