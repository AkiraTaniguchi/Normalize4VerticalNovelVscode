// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// 縦書き用小説のための正規化ツール
	console.log('Congratulations, your extension "normalize4verticalnovel" is now active!');

	// 0時0分を00:00表記に
	let disposable = vscode.commands.registerCommand('extension.toTimeEnZeroPad', () => {

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
		 * H時m分をHH:mm表記に変換します。
		 * 10の位の0は追加します。
		 * 00分の場合は:00を追加します。
		 **/
		// 日のあとにつづき、空白があるなら除去
		text = text.replace(/([0-9]日)[ 　]([0-9]+時)/mg, "$1$2");
		// 0分ならH時0分表記に変換
		text = text.replace(/(^|[^0-9])([0-9]+)時((?![0-9]分)[^0-9]|$)/mg, "$1$2時0分$3");
		// 10の位の0を追加
		text = text.replace(/(^|[^0-9])([0-9]時)/mg, "$10$2");
		text = text.replace(/(時)([0-9])(分)/mg, "$10$2$3");
		// HH時mm分表記に変換
		text = text.replace(/(^|[^0-9])([0-9]{1,2})時([0-9]{1,2})分([^0-9]|$)/mg, "$1$2:$3$4");

		//エディタ選択範囲にテキストを反映
		editor.edit(edit => {
			edit.replace(cur_selection, text);
		});

	});

	context.subscriptions.push(disposable);

	// 00:00を0時0分表記に
	disposable = vscode.commands.registerCommand('extension.toTimeJaZeroSup', () => {

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
		 * HH:mmをH時m分表記に変換します。
		 * 10の位の0は除去します。
		 * 00分の場合は00分を除去します。
		 **/
		// 10の位の0を除去
		text = text.replace(/(^|[^0-9])0([0-9])(:[0-9]{1,2})([^0-9]|$)/mg, "$1$2$3$4");
		text = text.replace(/(^|[^0-9])([0-9]{1,2}:)0([0-9])([^0-9]|$)/mg, "$1$2$3$4");
		// H時m分表記に変換
		text = text.replace(/(^|[^0-9])([0-9]+):([0-9]+)([^0-9]|$)/mg, "$1$2時$3分$4");
		// 0分ならH時表記に変換
		text = text.replace(/(^|[^0-9])([0-9]+時)0分([^0-9]|$)/mg, "$1$2$3");
		// 日のあとにつづき、空白があるなら除去
		text = text.replace(/([0-9]日)[ 　]([0-9]+時)/mg, "$1$2");


		//エディタ選択範囲にテキストを反映
		editor.edit(edit => {
			edit.replace(cur_selection, text);
		});

	});

	context.subscriptions.push(disposable);

	// 英数字を漢数字に
	disposable = vscode.commands.registerCommand('extension.toChnum', () => {

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
		 **/
		text = text.replace(/1/mg, '一');
		text = text.replace(/2/mg, '二');
		text = text.replace(/3/mg, '三');
		text = text.replace(/4/mg, '四');
		text = text.replace(/5/mg, '五');
		text = text.replace(/6/mg, '六');
		text = text.replace(/7/mg, '七');
		text = text.replace(/8/mg, '八');
		text = text.replace(/9/mg, '九');
		text = text.replace(/0/mg, '〇');
		text = text.replace(/\./mg, '．');
		text = text.replace(/(^|[^〇一二三四五六七八九])([一二三四五六七八九])〇([^〇一二三四五六七八九]|$)/mg, '$1$2十$3');
		text = text.replace(/(^|[^〇一二三四五六七八九])一([一二三四五六七八九])([^〇一二三四五六七八九]|$)/mg, '$1十$2$3');
		text = text.replace(/(^|[^〇一二三四五六七八九])一[十〇]([^〇一二三四五六七八九]|$)/mg, '$1十$2');
		text = text.replace(/(^|[^〇一二三四五六七八九])([一二三四五六七八九])([一二三四五六七八九])([^〇一二三四五六七八九]|$)/mg, '$1$2十$3$4');
		text = text.replace(/([〇一二三四五六七八九十百])(ml|cc)/mg, '$1ミリリットル');
		text = text.replace(/([〇一二三四五六七八九十百])cm/mg, '$1センチメートル');
		text = text.replace(/([〇一二三四五六七八九十百])℃/mg, '$1度C');
		text = text.replace(/([〇一二三四五六七八九十百])(%|％)/mg, '$1パーセント');

		//エディタ選択範囲にテキストを反映
		editor.edit(edit => {
			edit.replace(cur_selection, text);
		});

	});

	context.subscriptions.push(disposable);

	// 漢数字を英数字に
	disposable = vscode.commands.registerCommand('extension.toAlnum', () => {

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
		 **/
		text = text.replace(/(^|[^〇一二三四五六七八九十百])百/mg, '$1一百');
		text = text.replace(/(^|[^〇一二三四五六七八九十百])十/mg, '$1一十');
		text = text.replace(/一/mg, '1');
		text = text.replace(/二/mg, '2');
		text = text.replace(/三/mg, '3');
		text = text.replace(/四/mg, '4');
		text = text.replace(/五/mg, '5');
		text = text.replace(/六/mg, '6');
		text = text.replace(/七/mg, '7');
		text = text.replace(/八/mg, '8');
		text = text.replace(/九/mg, '9');
		text = text.replace(/〇/mg, '0');
		text = text.replace(/．/mg, '.');
		text = text.replace(/([0-9])十([0-9])/mg, '$1$2');
		text = text.replace(/([0-9])十([^0-9])/mg, '$10$2');
		// text = text.replace(/(^|[^〇一二三四五六七八九])([一二三四五六七八九])〇([^〇一二三四五六七八九]|$)/mg, '$1$2十$3');
		// text = text.replace(/(^|[^〇一二三四五六七八九])一([一二三四五六七八九])([^〇一二三四五六七八九]|$)/mg, '$1十$2$3');
		// text = text.replace(/(^|[^〇一二三四五六七八九])一[十〇]([^〇一二三四五六七八九]|$)/mg, '$1十$2');
		// text = text.replace(/(^|[^〇一二三四五六七八九])([一二三四五六七八九])([一二三四五六七八九])([^〇一二三四五六七八九]|$)/mg, '$1$2十$3$4');
		text = text.replace(/([0-9])ミリリットル/mg, '$1ml');
		text = text.replace(/([0-9])センチメートル/mg, '$1cm');
		text = text.replace(/([0-9])パーセント/mg, '$1%');
		text = text.replace(/([0-9])度C/mg, '$1℃');
		// text = text.replace(/〇〇分/g, '');
		text = text.replace(/1(緒|大事|家|旦|見|発|眼|丸|応|通り|面|気|区切|切|式|方|昨日)/mg, '一$1');
		text = text.replace(/(随|随)1/mg, '$1一');

		//エディタ選択範囲にテキストを反映
		editor.edit(edit => {
			edit.replace(cur_selection, text);
		});

	});

	context.subscriptions.push(disposable);
	
	// 句点の正規化
	disposable = vscode.commands.registerCommand('extension.normalizePunctuation', () => {

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
		 * 閉じカッコの前の句点を除去します。
		 **/
		text = text.replace(/[\n　 ]*[。]+([」』）】])/mg, '$1');
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
		text = text.replace(/\!/mg, '！');
		text = text.replace(/\?/mg, '？');
		text = text.replace(/(^|[^？！])([？！]+)([^？！）」\n])/mg, '$1$2　$3');
		text = text.replace(/　+/mg, '　');
		text = text.replace(/　([）」])/mg, '$1');
		//エディタ選択範囲にテキストを反映
		editor.edit(edit => {
			edit.replace(cur_selection, text);
		});

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
