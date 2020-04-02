// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// 縦書き用小説のための正規化ツール
	console.log('Congratulations, your extension "normalize4verticalnovel" is now active!');

	// 英数字を漢数字に
	let disposable = vscode.commands.registerCommand('extension.almum2chnum', () => {

		let editor = vscode.window.activeTextEditor; // エディタ取得
		let doc = editor.document;            // ドキュメント取得
		let cur_selection = editor.selection; // 選択範囲取得
		if (editor.selection.isEmpty) {
			// 選択範囲が空であれば全てを選択範囲にする
			let startPos = new vscode.Position(0, 0);
			let endPos = new vscode.Position(doc.lineCount - 1, 10000);
			cur_selection = new vscode.Selection(startPos, endPos);
		}

		let text = doc.getText(cur_selection); //取得されたテキスト

		/**
		 * 半角数字を漢数字に変換します。
		 * 時刻は時分表記にします。
		 **/
		text = text.replace(/([^0-9])([0-9]+):([0-9]+)([^0-9])/g, "$1$2時$3分$4");
		text = text.replace(/1/g, '一');
		text = text.replace(/2/g, '二');
		text = text.replace(/3/g, '三');
		text = text.replace(/4/g, '四');
		text = text.replace(/5/g, '五');
		text = text.replace(/6/g, '六');
		text = text.replace(/7/g, '七');
		text = text.replace(/8/g, '八');
		text = text.replace(/9/g, '九');
		text = text.replace(/0/g, '〇');
		text = text.replace(/(^|[^〇一二三四五六七八九])([一二三四五六七八九])〇([^〇一二三四五六七八九]|$)/g, '$1$2十$3');
		text = text.replace(/(^|[^〇一二三四五六七八九])一([一二三四五六七八九])([^〇一二三四五六七八九]|$)/g, '$1十$2$3');
		text = text.replace(/(^|[^〇一二三四五六七八九])一[十〇]([^〇一二三四五六七八九]|$)/g, '$1十$2');
		text = text.replace(/(^|[^〇一二三四五六七八九])([一二三四五六七八九])([一二三四五六七八九])([^〇一二三四五六七八九]|$)/g, '$1$2十$3$4');
		text = text.replace(/([〇一二三四五六七八九十])cm/g, '$1センチメートル');
		text = text.replace(/([〇一二三四五六七八九十])℃/g, '$1度C');
		text = text.replace(/〇〇分/g, '');

		//エディタ選択範囲にテキストを反映
		editor.edit(edit => {
			edit.replace(cur_selection, text);
		});

	});

	context.subscriptions.push(disposable);

	// 漢数字を英数字に
	disposable = vscode.commands.registerCommand('extension.chmum2alnum', () => {

		let editor = vscode.window.activeTextEditor; // エディタ取得
		let doc = editor.document;            // ドキュメント取得
		let cur_selection = editor.selection; // 選択範囲取得
		if (editor.selection.isEmpty) {
			// 選択範囲が空であれば全てを選択範囲にする
			let startPos = new vscode.Position(0, 0);
			let endPos = new vscode.Position(doc.lineCount - 1, 10000);
			cur_selection = new vscode.Selection(startPos, endPos);
		}

		let text = doc.getText(cur_selection); //取得されたテキスト

		/**
		 * 漢数字を半角数字に変換します。
		 * 時刻はhh:mm表記にします。
		 **/
		text = text.replace(/(^|[^〇一二三四五六七八九十百])百/g, '$1一百');
		text = text.replace(/(^|[^〇一二三四五六七八九十百])十/g, '$1一十');
		// text = text.replace(/([^0-9])([0-9]+):([0-9]+)([^0-9])/g, "$1$2時$3分$4");
		text = text.replace(/一/g, '1');
		text = text.replace(/二/g, '2');
		text = text.replace(/三/g, '3');
		text = text.replace(/四/g, '4');
		text = text.replace(/五/g, '5');
		text = text.replace(/六/g, '6');
		text = text.replace(/七/g, '7');
		text = text.replace(/八/g, '8');
		text = text.replace(/九/g, '9');
		text = text.replace(/〇/g, '0');
		text = text.replace(/([0-9])十([0-9])/g, '$1$2');
		text = text.replace(/([0-9])十([^0-9])/g, '$10$2');
		// text = text.replace(/(^|[^〇一二三四五六七八九])([一二三四五六七八九])〇([^〇一二三四五六七八九]|$)/g, '$1$2十$3');
		// text = text.replace(/(^|[^〇一二三四五六七八九])一([一二三四五六七八九])([^〇一二三四五六七八九]|$)/g, '$1十$2$3');
		// text = text.replace(/(^|[^〇一二三四五六七八九])一[十〇]([^〇一二三四五六七八九]|$)/g, '$1十$2');
		// text = text.replace(/(^|[^〇一二三四五六七八九])([一二三四五六七八九])([一二三四五六七八九])([^〇一二三四五六七八九]|$)/g, '$1$2十$3$4');
		text = text.replace(/([0-9])ミリリットル/g, '$1ml');
		text = text.replace(/([0-9])センチメートル/g, '$1cm');
		text = text.replace(/([0-9])度C/g, '$1℃');
		// text = text.replace(/〇〇分/g, '');
		text = text.replace(/1(緒|大事|家|旦|発|眼|丸|応|通り)/g, '一$1');

		//エディタ選択範囲にテキストを反映
		editor.edit(edit => {
			edit.replace(cur_selection, text);
		});

	});

	context.subscriptions.push(disposable);

	// 感嘆符、疑問符の正規化
	disposable = vscode.commands.registerCommand('extension.normalizequestionexclamation', () => {

		let editor = vscode.window.activeTextEditor; // エディタ取得
		let doc = editor.document;            // ドキュメント取得
		let cur_selection = editor.selection; // 選択範囲取得
		if (editor.selection.isEmpty) {
			// 選択範囲が空であれば全てを選択範囲にする
			let startPos = new vscode.Position(0, 0);
			let endPos = new vscode.Position(doc.lineCount - 1, 10000);
			cur_selection = new vscode.Selection(startPos, endPos);
		}

		let text = doc.getText(cur_selection); //取得されたテキスト

		/**
		 * 半角感嘆符、半角疑問符を全角にします。
		 * 感嘆符、疑問符の後ろには全角空白を入れます。
		 **/
		text = text.replace(/\!/g, '！');
		text = text.replace(/\?/g, '？');
		text = text.replace(/(^|[^？！])([？！]+)([^？！）」\n])/g, '$1$2　$3');
		text = text.replace(/　+/g, '　');
		text = text.replace(/　([）」])/g, '$1');
		//エディタ選択範囲にテキストを反映
		editor.edit(edit => {
			edit.replace(cur_selection, text);
		});

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
