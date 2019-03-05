#!/usr/bin/env node
let shell = require("shelljs");
let colors = require("colors");
let fs = require("fs");
let templates = require("./templates/templates.js");

let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;


const run = async () => {
	let success = await createReactApp();
	if (!success) {
		console.log("Something went wrong while trying to create a new sidemenu app from react-ionic".red);
		return false;
	}
	console.log("...starting...".green);
	await cdIntoNewApp();
	await installPackages();
	await updateTemplates();
	console.log("\nAll done!".green);
	console.log("\ncd into './".green + appName + "' and run 'npm start' to begin!".green)
}

const createReactApp = () => {
	return new Promise(resolve => {
		if(appName) {
			shell.exec(`create-react-app ${appName} --typescript`, (code) => {
				console.log("Exited with code", code);
				console.log("Created react-ionic app!".green);
				resolve(true);
			});
		}
		else {
			console.log("\nNo app name was provided".red);
			console.log("\nProvide an appname in the following format: ");
			console.log("\ncreate-react-ionic-app", "app-name\n".cyan);
			resolve(false);
		}
	});
}

const cdIntoNewApp = () => {
	return new Promise(resolve => {
		shell.cd(appDirectory);
		resolve();
	});
}

const installPackages = () => {
	return new Promise(resolve => {
		console.log("\nInstalling react-router, react-router-dom, @ionic/react, @types/react-router, @types/react-router-dom\n".cyan);
		shell.exec(`npm install --save react-router react-router-dom @ionic/react @types/react-router @types/react-router-dom`, () => {
			console.log("\nFinished installing packages\n".green);
			resolve();
		});
	});
}

const updateTemplates = () => {
	console.log("Updating default templates to Ionic blank...".cyan);
	return new Promise(resolve => {
		let promises = [];
		fs.unlink(`${appDirectory}/src/logo.svg`, (err) => {
			console.log(err)
		});
		shell.exec(`mkdir ${appDirectory}/src/pages`, () => {
			console.log("\npages folder created".green);
			shell.exec(`mkdir ${appDirectory}/src/components`, () => {

				console.log("\ncomponents folder created".green);
				shell.exec(`mkdir ${appDirectory}/src/assets`, () => {

					console.log("\nassets folder created".green);
					
					Object.keys(templates).forEach((fileName, i) => {
						promises[i] = new Promise(res => {

							if (fileName.includes("Home")) {
								shell.exec(`mkdir ${appDirectory}/src/pages/Home`, () => {

									console.log("\nHome folder created".green);
									fs.writeFile(`${appDirectory}/src/pages/Home/${fileName}`, templates[fileName], (err) => {
										if (err) { return console.log(err) }
										res();
									});
								});
							}
							else if (fileName.includes("List")) {
								shell.exec(`mkdir ${appDirectory}/src/pages/List`, () => {

									console.log("\nList folder created".green);
									fs.writeFile(`${appDirectory}/src/pages/List/${fileName}`, templates[fileName], (err) => {
										if (err) { return console.log(err) }
										res();
									});
								});
							}
							else if (fileName.includes("Menu")) {
								shell.exec(`mkdir ${appDirectory}/src/components/Menu`, () => {

									console.log("\nMenu folder created".green);
									fs.writeFile(`${appDirectory}/src/components/Menu/${fileName}`, templates[fileName], (err) => {
										if (err) { return console.log(err) }
										res();
									});
								});
							}
							else if (fileName.includes("shapes")) {
								fs.writeFile(`${appDirectory}/src/assets/${fileName}`, templates[fileName], (err) => {
									if (err) { return console.log(err) }
									res();
								});
							}
							else {
								fs.writeFile(`${appDirectory}/src/${fileName}`, templates[fileName], (err) => {
									if (err) { return console.log(err) }
									res();				
								});
							}
						});
						
					});
					Promise.all(promises).then(() => { 
						console.log("templates finished!");
						resolve();
					});	
				});	
			});
		});
		
	});
}


run();
