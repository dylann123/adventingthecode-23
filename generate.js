// grab template from ./template_day folder and copy to a new folder called ./day{day}

const readline = require("readline")
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let dayFolder = `./day-${new Date().getDate()}`;
const templateFolder = './template_day';

( async ()=>{
	if (!fs.existsSync(dayFolder)) {
		fs.mkdirSync(dayFolder);
		folder()
	} else {
		const ans = await askQuestion("folder " + dayFolder + " already exists. Are you sure you want to reset its contents?")
		if(ans.includes("y"))
			folder()
		if(ans.includes("n")){
			dayFolder = `./day-${new Date().getDate()+1}`;
			fs.mkdirSync(dayFolder);
			folder()
		}
	}
})()

function folder() {
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

	console.log(`${dayFolder} created`);
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}