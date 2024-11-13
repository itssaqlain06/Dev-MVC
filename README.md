# dev-mvc

This MVC Generator — A streamlined tool to set up a standardized MVC folder structure for backend applications in Node.js.

## Overview

`dev-mvc` is a command-line tool that automatically generates an organized MVC (Model-View-Controller) folder structure for backend projects. This helps you jump-start your project by creating essential directories and files commonly used in Node.js backend applications, all in a single command.

## Features

- **Automatic Folder Structure**: Quickly sets up `controllers`, `models`, `routes`, `config`, `middleware`, `services`, and `utils` directories.
- **File Generation**: Creates placeholder files within each folder to kickstart your backend development.
- **Streamlined Workflow**: Saves time by providing a standardized structure, enabling you to focus on coding rather than setup.

## Folder Structure Created

Running the generator will create the following structure in your current working directory:

```
project-root/
├── controllers/
│   └── user.controller.js
├── models/
│   └── user.model.js
├── config/
│   └── db.config.js
├── routes/
│   └── user.routes.js
├── middleware/
│   └── auth.middleware.js
├── services/
│   ├── email.service.js
│   └── payment.service.js
├── utils/
│   ├── helper.util.js
│   └── validator.util.js
└── server.js
```

## Installation

To install `dev-mvc` globally so you can use it from anywhere:

```bash
npm install -g dev-mvc
```

## Usage

After installation, navigate to the root of your new backend project, then run:

```bash
dev-mvc
```

This command will execute the `createBackendFoldersAndFiles()` function, creating the entire MVC folder structure in your current directory.

### Notes

- Ensure that you’re in the directory where you want the structure to be created before running the command.
- If a folder or file already exists, it won’t be overwritten; instead, a message will inform you that it already exists.

## Updating the Package

If you wish to update `dev-mvc` to the latest version, simply run:

```bash
npm update -g dev-mvc
```

## Contributing

Feel free to contribute by submitting issues or pull requests to the [GitHub repository](https://github.com/itssaqlain06/dev-mvc). 

## Author

**Saqlain**  
- GitHub: [itssaqlain06](https://github.com/itssaqlain06)
- LinkedIn: [Saqlain's LinkedIn](https://www.linkedin.com/in/itssaqlain06/)

## License

This project is licensed under the MIT License.