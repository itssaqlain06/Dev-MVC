#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const folderStructure = {
    'controllers': 'user.controller.js',
    'models': 'user.model.js',
    'config': 'db.config.js',
    'routes': 'user.routes.js',
    'middleware': 'auth.middleware.js',
    'services': ['email.service.js', 'payment.service.js'],
    'utils': ['helper.util.js', 'validator.util.js']
};

function displayBranding() {
    console.log(`
     ======================================================
    |  Saqlain's MVC Generator                             |
    |  Streamlining backend setup                          |
    |  GitHub: https://github.com/itssaqlain06             |
    |  LinkedIn: https://www.linkedin.com/in/itssaqlain06/ |
     ======================================================
    `);
}

function createBackendFoldersAndFiles() {
    // Display branding at the beginning
    displayBranding();

    // Use the client's project root
    const baseDir = process.cwd();

    // Create backend folders and files based on the defined structure
    Object.entries(folderStructure).forEach(([folder, files]) => {
        const dirPath = path.join(baseDir, folder);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Created folder: ${dirPath}`);
        } else {
            console.log(`Folder already exists: ${dirPath}`);
        }

        const filesArray = Array.isArray(files) ? files : [files];
        filesArray.forEach(file => {
            const filePath = path.join(dirPath, file);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '');
                console.log(`Created file: ${filePath}`);
            } else {
                console.log(`File already exists: ${filePath}`);
            }
        });
    });

    // Check and create the entry file 'server.js'
    const entryFile = path.join(baseDir, 'server.js');
    if (!fs.existsSync(entryFile)) {
        fs.writeFileSync(entryFile, '');
        console.log('Created: server.js');
    } else {
        console.log('Entry file already exists: server.js');
    }
}

function checkNodeModulesAndPrompt(callback) {
    const baseDir = process.cwd();
    const nodeModulesPath = path.join(baseDir, 'node_modules');

    if (!fs.existsSync(nodeModulesPath)) {
        // Create a readline interface to prompt the user
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('node_modules folder is missing. Do you want to create it by running "npm install"? (y/n): ', answer => {
            if (answer.toLowerCase() === 'y') {
                console.log('Installing node modules...');
                // Run npm install in the current directory
                exec('npm install', (err, stdout, stderr) => {
                    if (err) {
                        console.error(`Error installing modules: ${err}`);
                    } else {
                        console.log(stdout);
                        console.log('node_modules installed.');
                    }
                    rl.close();
                    callback();
                });
            } else {
                console.log('Skipping node_modules installation.');
                rl.close();
                callback();
            }
        });
    } else {
        callback();
    }
}

// Run the prompt-check and then create the backend folders/files
if (require.main === module) {
    checkNodeModulesAndPrompt(() => {
        createBackendFoldersAndFiles();
    });
}

module.exports = createBackendFoldersAndFiles;
