#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
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
    |  NPM: https://www.npmjs.com/package/dev-mvc          |
    |  GitHub: https://github.com/itssaqlain06             |
    |  LinkedIn: https://www.linkedin.com/in/itssaqlain06/ |
     ======================================================
${colors.reset}`);
}

function ensurePackageJson(callback) {
    const baseDir = process.cwd();
    const packageJsonPath = path.join(baseDir, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
        console.log(`${colors.blue}No package.json found. Creating one...${colors.reset}`);
        exec('npm init -y', (err) => {
            if (err) {
                console.error(`${colors.red}Error creating package.json: ${err}${colors.reset}`);
                return callback();
            }
            console.log(`${colors.green}package.json created successfully!${colors.reset}`);
            callback();
        });
    } else {
        callback();
    }
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

if (require.main === module) {
    displayBranding();
    ensurePackageJson(() => {
        setTimeout(() => {
            createBackendFoldersAndFiles();
        }, 2000);
    });
}

module.exports = createBackendFoldersAndFiles;
