import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { Bookmark } from "../models/bookmark.model";
import { Note } from "../models/notes.model";

const FILE_NAME = "project-companion.json";

export interface ProjectCompanionData {
  version: 1
  bookmarks?: Bookmark[]
  notes?: Note[]
}

const DEFAULT_DATA: ProjectCompanionData = {
  version: 1,
  bookmarks: [],
  notes: []
};

export class ProjectCompanionStorage {
  private filePath: string;

  constructor() {
    const ws = vscode.workspace.workspaceFolders?.[0];
    if (!ws) {
      throw new Error("Project Companion: No workspace open");
    }

    const vscodeDir = path.join(ws.uri.fsPath, ".vscode");
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
    }

    this.filePath = path.join(vscodeDir, FILE_NAME);
  }

  read(): ProjectCompanionData {
    if (!fs.existsSync(this.filePath)) {
      return DEFAULT_DATA;
    }

    try {
      return JSON.parse(
        fs.readFileSync(this.filePath, "utf-8")
      );
    } catch {
      vscode.window.showWarningMessage(
        "project-companion.json is corrupted. Resetting."
      );
      return DEFAULT_DATA;
    }
  }

  write(data: ProjectCompanionData) {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  }
}
