// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { appendFile } from 'fs';
import { toNamespacedPath } from 'path';
import * as vscode from 'vscode';


import axios from 'axios';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "python-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('python-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Python Helper!');
	});

	//show current time
	const command = 'python-helper.showTime';
	const commandTimer = () => {
		const now = new Date();
		const time = now.toLocaleTimeString();
		console.log(`current time: ${time} `);
	};
	context.subscriptions.push(vscode.commands.registerCommand(command, commandTimer));
	context.subscriptions.push(disposable);

	//1. get python file execution output content
	const commandGetTerminalInfo = 'python-helper.getTerminalInfo';
	const commandGetTerminalInfoFunc = () => {
		//get current active terminal
		const terminal = vscode.window.activeTerminal;
		//get current active text editor
		const editor = vscode.window.activeTextEditor;
		if (terminal && editor){
			//get current file
				const doc = editor.document;
				console.log(`current file name: ${doc.fileName}`);
				terminal.sendText(`python -u ${doc.fileName} > errInfo.txt 2>&1`);
		}else{
			console.log('terminal or editor is null');
		}
		//2.Calling the GPT interface to get the output content
		//Execute jspath file
		const chat = require('./chat.js');
		chat.chat();
	






		//3. get the output content
	};
	context.subscriptions.push(vscode.commands.registerCommand(commandGetTerminalInfo, commandGetTerminalInfoFunc));

}

// This method is called when your extension is deactivated
export function deactivate() {}
