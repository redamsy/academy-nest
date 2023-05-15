## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

# e2e tests
$ npm run test:e2e

```

#### Setup the .env file
Update the example file according to your DB settings
```shell script
 cp .env.example .env
```

### 1. Migrations
Used to make changes to the database schema
#### Create Migration and run
```first time```
```npx prisma migrate dev --name "init"```
```after first time use this```
```prisma migrate dev --name added_job_title```
```note without seeding, you can pass the --skip-seed flag ```


#### Run any migrations not run yet
```npm run migrate:latest```

### 2. Seeds
Add data into the database tables. Mainly used for initial data

### Create Seed File
Try to number imports in order they should be run
```touch prisma/seedfilename.ts```

### Run Seed file
```npx prisma db seed```

### 1. Open prisma studio
```npx prisma studio```

### 4. Improvements
```1)in the future we would improve this app by implementing passworless auth utilizing Sendgrid api, check this    article:```
```  https://www.prisma.io/blog/backend-prisma-typescript-orm-with-postgresql-auth-mngp1ps7kip4   ```

```2)the above could be used in combination of auth0 api,```
```  saving user profiles in a remote server like auth0, as well as in our local db, is a good idea```

```3)also i recommend implementing Cross-site request forgery (also known as CSRF or XSRF):```
```  https://docs.nestjs.com/security/csrf```

```4)for more diverse application, authorization based on Roles will be required:```
```  https://docs.nestjs.com/security/authorization```

### 5. API documentation
```the app has three sepereate controllers : appController, ToDoCntroller, UserController```

```steps:```
```1)userController.signup >>>> create user (signup)```
```2.1)appController.signin >>>get access_token (sigin)```
```2.2)appController.self >>> use access_token to get current user info/profile```
```2.3)use this format in header.Authorization: "Beare acess_token" to access protected paths that are using JwtAuthGuard```
```4)similarly using access_token you can access rest of the api ends point wich are now limited to ToDOController```
```toDoCOntroller contains CRUD APi ends points for toDo table```
### use swagger tool for furthor api documentation
```http://localhost:3000/api```
