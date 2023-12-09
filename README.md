# AUTHENTICATION AND USER SERVICE FOR URARA

This project is developed with typescript and then transpiled to javascript.    
The project needs some environment variables, look at the `.env.example` file.

## Prerequisites

1. Nodejs >= v16
2. MongoDB

## Run project

1. Install dependencies with 
```shell
$ npm install
```

2. Build the project

```shell
$ npm run build
```

or

```shell
$ npm run build:watch
```
to stay listening to changes.

3. Run

```shell
$ npm run dev
```
for development

or

```shell
$ npm run start
```
for production.

- Optionally
```shell
$ npm run start:build
```
to build and immediately run.

## Run project with Docker

1. Generate image
```shell
$ docker build -t name-iamge:tag .
```
Exposes port `3000` by default.

2. Run container
```shell
$ docker run -d -p 3000:3000 --name name-container --env-file .env name-image
```