<h1 align="center">
  <br>
  <img src="https://i.imgur.com/CAnaXFq.png" height="125" width="125">
  <br>
  <b>GraphQLClient</b>
  <br>
</h1>

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#license">License</a>
</p>

## :camera: Images

<p align='center'>
  <img src="https://i.imgur.com/j17iyDx.png">
</p>

<p align='center'>
  <img src="https://i.imgur.com/XYGhzm4.png">
</p>

<p align='center'>
  <img src="https://i.imgur.com/iDKhKNG.png">
</p>

<div id='how-to-use'>
  <h2>:zap: How to use</h2>
</div>

## Pre-requisites

-   _Node:_ `^9.0.0` or higher.
-   _Npm:_ `^6.0.0` or higher.
-   _Yarn:_ `^1.7.0` or higher.
-   _MySQL:_ `14.14 Distrib 5.7.21` or higher.

## Getting started

Clone the project from Github :

```sh
git clone git@github.com:brunogusta/GraphQLClient.git
cd GraphQLClient
```
Install dependencies in server:

```sh
$ cd server
$ yarn or npm install
```

Create a **.env** file in _server_ folder and copy the content of **env_example**

```bash
# Your MySQL database url.
APP_DB_HOST=

# Your MySQL connection port.
APP_DB_PORT=

#The name of your database created in MySQL.
APP_DB_NAME=

# The name of user to connect in your MySQL database.
APP_DB_USER=root

# The password of user to connect in your MySQL database.
APP_DB_PASSWORD=

# Your AuthSecret for Tokens.
APP_AUTH_SECRET=
```
Start the server with **yarn start** or **npm start**.

If everything is ok, you will be able to open GraphCool at:

```bash
http://localhost:4000/playground
```

Install dependencies in web:

```sh
$ cd web
$ yarn or npm install
```
Start the React with **yarn start** or **npm start**.

Obs: The most of actions in to the site is just provided for admin users for you test that you need to change the perfil of user in your database:

First you need to create an account through the site.

After that the **users_perfils** table in the database must be changed.

In the **perfil_id** column change it to 2.

After that your user is admin.

The syntax for doing this through the terminal is:

```bash
UPDATE `your_databese_name`.`users_perfils` SET `perfil_id` = '2' WHERE (`user_id` = 'your_user_id') and (`perfil_id` = '1');
```
<div id='tech-stack'>
  <h2>:bulb: Tech Stack</h2>
</div>

<h1 align='center'>
  <img src="https://i.imgur.com/aFsRHSI.png" alt="stack" height="" width="">
</h1>

- [React](https://github.com/facebook/react) _(100% [Hooks](https://reactjs.org/docs/hooks-intro.html), zero classes)_
- [Styled Components](https://www.styled-components.com/)
- [Eslint](https://eslint.org/)
- [Reactotron](https://infinite.red/reactotron)
- [GraphQL](https://graphql.org/)
- [Apollo](https://apollographql.com)
- [Redux](https://github.com/reduxjs/react-redux)
- [MySql](https://www.mysql.com/)

<div id='license'>
  <h2>:page_facing_up: License</h2>
</div>

MIT

---

> LinkedIn [Bruno Gustavo](https://www.linkedin.com/in/bruno-gustavo-90502a13a/)

<p align='center'>
  Made with :hearts: by Bruno Gustavo.
</p>
