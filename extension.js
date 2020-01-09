// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { exec } = require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "esp32tools" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("extension.upload2Esp32", upload2Esp32);

  context.subscriptions.push(disposable);
}

function upload2Esp32() {
  // The code you place here will be executed every time your command is executed

  // Display a message box to the user
  const currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
//   const currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
  
  if(currentlyOpenTabfilePath) {
	exec(`ampy --port /dev/tty.SLAB_USBtoUART put ${currentlyOpenTabfilePath}`, function(err, stdout, stderr) {
		if(err) {
			vscode.window.showInformationMessage("Error " + err);

			console.log(err)
			return
		};
		vscode.window.showInformationMessage("uploadsuccess " +  vscode.window.activeTextEditor.document.fileName);
	});
  }
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
