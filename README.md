<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



# Project Support
### Introduction
Project Support is an open source platform that enable users share causes they're passionate about and actively involved with with the hopes of connecting with other users equally interested in working with them on the given cause.

### Project Support Features
* Users can signup and login to their accounts
* Users can update user data
* Authenticated users (SUPERADMIN/ADMIN) can access all user data already register
* Users can forget password
* Users can change password
## ENV

<table>
<thead>
  <tr>
    <th>No</th>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1</td>
    <td>DATABASE_URL</td>
    <td>"mysql://root:@localhost:3306/belajar"</td>
    <td>How to create database url: database://username:password@host:port/db_name</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PORT</td>
    <td>8000</td>
    <td>Module run in port.If use docker match env port with port expose in docker </td>
  </tr>
  <tr>
    <td>3</td>
    <td>BASE_URL</td>
    <td>http://localhsot:8000</td>
    <td>Url module, this is for url will send to email</td>
  </tr>
  <tr>
    <td>4</td>
    <td>SECRET_JWT</td>
    <td>this is secret</td>
    <td>Secret for encrypt and decrypt jsonwebtoken</td>
  </tr>
  <tr>
    <td>5</td>
    <td>EXPIRED_IN</td>
    <td>15m</td>
    <td>Expired time for jsonwebtoken, example (10s is 10 second, 15m is 15 minutes)</td>
  </tr>
  <tr>
    <td>6</td>
    <td>SMTP_HOST</td>
    <td>smtp.gmail.com</td>
    <td>smtp I use is from gmail</td>
  </tr>
  <tr>
    <td>7</td>
    <td>SMTP_USER</td>
    <td>email@gmail.com</td>
    <td>use your email or create new email for sender</td>
  </tr>
  <tr>
    <td>8</td>
    <td>SMTP_PASSWORD</td>
    <td>12345678</td>
    <td>for get smtp password please watch this video from 0:00 - 1:31 <a href="https://youtu.be/cqdAS49RthQ?si=6LEsHmn4yeGLwosP">Youtube</a> </td>
  </tr>
</tbody>
</table>

### Installation Guide
* Clone this repository [here](https://github.com/hansyahridho07/nest-js-register-login-user.git).
* Run `npm install` to install all dependencies
* You can use your locally database installed MySQL. Do configure to your choice in the application entry file.
* Create an .env file in your project root folder and add your variables. See .env.sample for assistance.
### Usage
* Run `npm run migrate` for migration table to database
* Run `npm run seed` for seeding data superadmin first. email is `admin@gmail.com` and password is `password`
* Run `npm run start:dev` to start the application.
* Run `npm run build` build to production, after than `npm run start` for run application after build.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /v1/api/user/register | To sign up a new user account |
| POST | /v1/api/user/login | To login an existing user account |
| GET | /v1/api/user/email-confirmation/:token | Url for email confirmation was send to email |
| GET | /v1/api/user?phone_number&email&name&page=0&size | To see all user already register |
| PUT | /v1/api/user | Update data user like email, name, etc |
| PATCH | /v1/api/user/change-password | To change password user |
| PATCH | /v1/api/user/forget-password/:token | To user who forget password |
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [NestJS](https://nestjs.com/) This is a NodeJS web application framework.
* [MySQL](https://www.mysql.com/) This is a free open source SQL document database.
* [Prisma](https://www.prisma.io/) This makes it easy to write MySQL query with ORM Prisma and create schema with migration file.
<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://nestjs.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg" alt="nestjs" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

### Authors
* [Muhammad Ridho Hansyah](https://github.com/hansyahridho07)
### License
This project is available for use under the MIT License.