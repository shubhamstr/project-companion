// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BookmarkProvider } from './views/bookmarkProvider';
import { addBookmarkCommand } from './commands/addBookmark';
import { jumpToBookmarkCommand } from './commands/jumpToBookmark';
import { createDecorationType, applyDecorationsForEditor, refreshDecorationsForAllOpenEditors } from './utils/decorations';
import { NotesTreeProvider } from "./views/notes.tree";
import { NotesStorage } from "./services/notes.storage";
import { addNote } from './commands/addNote';
import { openNote } from "./commands/openNote";


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "project-companion" is now active!');
	// const disposable = vscode.commands.registerCommand('project-companion.helloWorld', () => {
	// 	vscode.window.showInformationMessage('Hello World from Project Companion!');
	// });
	// context.subscriptions.push(disposable);

	const provider = new BookmarkProvider();
	vscode.window.registerTreeDataProvider('project-companion.bookmarks', provider);

	// register refresh command to let other parts refresh the tree
	const refreshCmd = vscode.commands.registerCommand('project-companion.refreshBookmarks', () => provider.refresh());
	context.subscriptions.push(refreshCmd);

	// register addBookmark and jumpToBookmark
	context.subscriptions.push(vscode.commands.registerCommand('project-companion.addBookmark', addBookmarkCommand));
	context.subscriptions.push(vscode.commands.registerCommand('project-companion.jumpToBookmark', jumpToBookmarkCommand));

	// decoration setup
	createDecorationType(context);
	// command to refresh decorations (used after add/delete)
	context.subscriptions.push(vscode.commands.registerCommand('project-companion.refreshDecorations', () => refreshDecorationsForAllOpenEditors()));

	// apply decorations when editors change or doc open
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => applyDecorationsForEditor(editor)));
	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(() => refreshDecorationsForAllOpenEditors()));

	// apply at activation
	refreshDecorationsForAllOpenEditors();

	const notesStorage = new NotesStorage(context);

	const notesProvider = new NotesTreeProvider(notesStorage);

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
				await addNote(notesStorage);
				notesProvider.refresh(); // ✅ now works
			}
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"project-companion.notes.open",
			openNote
		)
	);



}

// This method is called when your extension is deactivated
export function deactivate() { }
