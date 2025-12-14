import * as vscode from "vscode";

// storage
import { ProjectCompanionStorage } from "./storage/project-companion.storage";

// services
import { BookmarkService } from "./services/bookmark.service";
import { NoteService } from "./services/note.service";

// views
import { BookmarkProvider } from "./views/bookmarkProvider";
import { NotesTreeProvider } from "./views/notes.tree";

// commands
import { addBookmarkCommand } from "./commands/addBookmark";
import { jumpToBookmarkCommand } from "./commands/jumpToBookmark";
import { addNote } from "./commands/addNote";
import { openNote } from "./commands/openNote";

// decorations
import {
	createDecorationType,
	applyDecorationsForEditor,
	refreshDecorationsForAllOpenEditors
} from "./utils/decorations";

export function activate(context: vscode.ExtensionContext) {
	console.log('Project Companion activated');

	// ─────────────────────────────────────────────
	// Shared storage (single source of truth)
	// ─────────────────────────────────────────────
	const storage = new ProjectCompanionStorage();

	// ─────────────────────────────────────────────
	// Services
	// ─────────────────────────────────────────────
	const bookmarkService = new BookmarkService(storage);
	const noteService = new NoteService(storage);

	// ─────────────────────────────────────────────
	// Bookmark Tree
	// ─────────────────────────────────────────────
	const bookmarkProvider = new BookmarkProvider(bookmarkService);

	context.subscriptions.push(
		vscode.window.registerTreeDataProvider(
			"project-companion.bookmarks",
			bookmarkProvider
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"project-companion.refreshBookmarks",
			() => bookmarkProvider.refresh()
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"project-companion.addBookmark",
			() => addBookmarkCommand(bookmarkService)
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"project-companion.jumpToBookmark",
			jumpToBookmarkCommand
		)
	);

	// ─────────────────────────────────────────────
	// Notes Tree
	// ─────────────────────────────────────────────
	const notesProvider = new NotesTreeProvider(noteService);

	context.subscriptions.push(
		vscode.window.registerTreeDataProvider(
			"project-companion.notes",
			notesProvider
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"project-companion.notes.add",
			async () => {
				await addNote(noteService);
				notesProvider.refresh();
			}
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"projectCompanion.notes.open",
			openNote
		)
	);

	// ─────────────────────────────────────────────
	// Decorations
	// ─────────────────────────────────────────────
	createDecorationType(context);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"project-companion.refreshDecorations",
			() => refreshDecorationsForAllOpenEditors(bookmarkService)
		)
	);

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor =>
			applyDecorationsForEditor(editor, bookmarkService)
		)
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(() =>
			refreshDecorationsForAllOpenEditors(bookmarkService)
		)
	);

	// apply once on activation
	refreshDecorationsForAllOpenEditors(bookmarkService);
}

export function deactivate() { }
