#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
    displayBranding();

    const baseDir = path.join(process.cwd(), '..', '..');

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

    const entryFile = path.join(baseDir, 'server.js');
    if (!fs.existsSync(entryFile)) {
        fs.writeFileSync(entryFile, '');
        console.log('Created: server.js');
    } else {
        console.log('Entry file already exists: server.js'); 
    }
}

if (require.main === module) {
    createBackendFoldersAndFiles();
}

module.exports = createBackendFoldersAndFiles;
