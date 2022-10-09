<div align="center">
  <p align="center">
    <img src="./EXAMPLES/updrop.png" alt="Updrop Header" width="750px" />
  </p>
</div>
<br />
<div>
  <p align="center">
    A private server which can run locally, on cloud or on even a phone.
  </p>
</div>

# 💡 What is updrop?

Updrop is meant to be a private server, which users can run locally, on a home server, on a cloud platform or even on a phone.<br> It is a home for all types of files for easy and fast uploads and downloads.<br>

# 💻 Updrop Live Demonstration

<b>Live at: </b> https://updrop.ashwincodes.com

# ☕️ Features

-   Folders for better data organization.
-   Simultaneous uploads for multiple files.
-   Configurations (changing port, server shutdown) can be handled from UI itself.
-   File search for easy file retrievals.
-   Multiple UI themes.
-   Modern and responsive UI.
-   Small and lightweight.
-   Easiest private server to work with.

# 🕺 Install and Run

## 🤖 Automatic Install

Install updrop in current directory.

```bash
$ npx updrop
```

cd into updrop and run server

```bash
$ cd updrop
$ npm start
```

## 🤓 Manual Install

<br>

Clone updrop using `git`

```bash
$ git clone https://github.com/ashwin-codes/updrop
$ cd updrop
```

Build and run using `npm`:

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

> **_NOTE:_** Preferred node version >= v12.22.12

# 💻 Develop

<br>

Start Backend `node` development server :

```bash
$ cd server
$ node server
```

> **_NOTE:_** For Development its recommended to use NODEMON instead.

Start Frontend `react` development server:

```bash
$ cd client
$ npm start
```
