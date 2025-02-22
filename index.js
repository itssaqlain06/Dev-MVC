#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const colors = {
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    reset: "\x1b[0m"
};

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
    console.log(`${colors.cyan}
     ======================================================
    |  Saqlain's MVC Generator                             |
    |  Streamlining backend setup                          |
    |  https://www.npmjs.com/package/dev-mvc               |
    |  GitHub: https://github.com/itssaqlain06             |
    |  LinkedIn: https://www.linkedin.com/in/itssaqlain06/ |
     ======================================================
${colors.reset}`);
}

function createBackendFoldersAndFiles() {
    const baseDir = process.cwd();

    Object.entries(folderStructure).forEach(([folder, files]) => {
        const dirPath = path.join(baseDir, folder);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const filesArray = Array.isArray(files) ? files : [files];
        filesArray.forEach(file => {
            const filePath = path.join(dirPath, file);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '');
            }
        });
    });

    const entryFile = path.join(baseDir, 'server.js');
    if (!fs.existsSync(entryFile)) {
        fs.writeFileSync(entryFile, '');
    }

    console.log(`${colors.green}Backend folder structure has been created successfully!${colors.reset}`);
}

function checkNodeModulesAndPrompt(callback) {
    const baseDir = process.cwd();
    const nodeModulesPath = path.join(baseDir, 'node_modules');

    if (!fs.existsSync(nodeModulesPath)) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`${colors.yellow}node_modules folder is missing. Do you want to create it by running "npm install"? (y/n): ${colors.reset}`, answer => {
            if (answer.toLowerCase() === 'y') {
                console.log(`${colors.blue}Installing node modules...${colors.reset}`);
                exec('npm install', (err, stdout, stderr) => {
                    if (err) {
                        console.error(`${colors.red}Error installing modules: ${err}${colors.reset}`);
                    } else {
                        console.log(stdout);
                        console.log(`${colors.green}node_modules installed.${colors.reset}`);
                    }
                    rl.close();
                    callback();
                });
            } else {
                console.log(`${colors.blue}Skipping node_modules installation.${colors.reset}`);
                rl.close();
                callback();
            }
        });
    } else {
        callback();
    }
}

if (require.main === module) {
    checkNodeModulesAndPrompt(() => {
        displayBranding();
        setTimeout(() => {
            createBackendFoldersAndFiles();
        }, 2000);
    });
}

module.exports = createBackendFoldersAndFiles;
