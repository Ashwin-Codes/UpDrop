<div align="center">
  <p align="center">
    <img src="./EXAMPLES/updrop.png" alt="Updrop Header" width="750px" />
  </p>
</div>
<br />
<div>
  <p align="center">
    A private server which can be run locally, on cloud or on even a phone.
  </p>
</div>

## 💡 What is updrop?

Updrop is meant to be a private server, which users can run locally, on a home server, on a cloud platform or even on a phone.<br> Its a home for all types of files for easy and fast uploads, downloads.<br>

## ☕️ Features

-   Easiest private server to work with.
-   Folders for better data organization.
-   Small and lightweight.
-   Modern and responsive UI.
-   Simultaneous uploads multiple files.
-   Configurations (changing port, server shutdown) can be handled from UI itself.
-   Fast File search for easy file retrievals.

## 🎨 Examples

   <div align="center"><b>Adding Folders</b></div>
    <div align="center">
      <p align="center">
        <img src="./EXAMPLES/addingFolders.gif" alt="Adding Folder" width="750px" />
      </p>
    </div>

   <div align="center"><b>Adding Files</b></div>
    <div align="center">
      <p align="center">
        <img src="./EXAMPLES/addingFiles.gif" alt="Adding Files" width="750px" />
      </p>
    </div>

  <div align="center"><b>Searching Files</b></div>
    <div align="center">
      <p align="center">
        <img src="./EXAMPLES/searchingFiles.gif" alt="Searching Files" width="750px" />
      </p>
    </div>

  <div align="center"><b>Deleting Files</b></div>
    <div align="center">
      <p align="center">
        <img src="./EXAMPLES/deletingFiles.gif" alt="Searching Files" width="750px" />
      </p>
    </div>

## 🕺 Install and Run

> **_NOTE:_** Developed and tested on NODE v12.22.12.

<br>

clone updrop using `git`

```bash
$ git clone https://ashwin-codes/updrop.git
$ cd updrop
```

build and run using `npm`:

```bash
$ npm install
$ npm run build
$ npm start
```

> **_NOTE:_** Linux users can also run setup.sh to build and run.

```bash
$ chmod +x setup.sh
$ ./setup.sh
```

## 💻 Develop

<br>

start Backend `node` development server :

```bash
$ sudo npm install nodemon -g
$ cd server
$ nodemon server
```

start Frontend `react` development server:

```bash
$ cd client
$ nom server
```
