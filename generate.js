// grab template from ./template_day folder and copy to a new folder called ./day{day}

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const dayFolder = `./day-${new Date().getDate()}`;
const templateFolder = './template_day';

if(!fs.existsSync(dayFolder)) 
	fs.mkdirSync(dayFolder);

fs.readdirSync(templateFolder).forEach(file => {
	const filePath = path.join(templateFolder, file);
	const newFilePath = path.join(dayFolder, file);
	fs.copyFileSync(filePath, newFilePath);
});

exec(`code ${dayFolder}`, (err, stdout, stderr) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(stdout);
	console.log(stderr);
});

console.log(`./day-${new Date().getDate()} created`);