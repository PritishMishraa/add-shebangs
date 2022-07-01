#!/usr/bin/env node

import fs from 'fs';
import inquirer from 'inquirer';

async function getLang() {
	const answer = await inquirer
		.prompt([
			{
				type: 'list',
				name: 'lang',
				message: 'What is your scripting language?',
				choices: [
					'node.js',
					'python v2',
					'python v3',
					'ruby'
				],
			},
		]);

	switch (answer.lang) {
		case 'node.js':
			await FileName('node', 0);
			break;
		case 'python v2':
			await FileName('python', 2);
			break;
		case 'python v3':
			await FileName('python', 3);
			break;
		case 'ruby':
			await FileName('ruby', 0);
			break;
	}

	console.log('All done! 🎉');
	process.exit(0);
}

async function FileName(lang, version) {
	const answer = await inquirer
		.prompt([
			{
				type: 'input',
				name: 'fileName',
				message: 'Which file do you want to add the Shebang Syntax to?',
			}
		]);

	if (version == 0) {
		var shebangSyntax = `#!/usr/bin/env ${lang}\n\n`;
	} else {
		var shebangSyntax = `#!/usr/bin/env ${lang}${version}\n\n`;
	}

	let fileName = answer.fileName;

	addShebang(shebangSyntax, fileName);
}

function addShebang(shebangSyntax, fileName) {
	if (fs.existsSync(fileName)) {
		let fileContent = fs.readFileSync(fileName, 'utf8');

		if (fileContent.slice(0, 2) != "#!") {
			fileContent = shebangSyntax + fileContent;

			fs.writeFileSync(fileName, fileContent);
		}
	} else {
		console.log('No such file exists 💣');
	}
}

getLang();