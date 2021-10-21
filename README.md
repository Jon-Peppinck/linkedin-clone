# LinkedIn Clone

## NestJS, Angular, Ionic, PostGres, TypeORM

[30+ hour YouTube tutorial](https://www.youtube.com/playlist?list=PL9_OU-1M9E_ut3NA04C4eHZuuAFQOUwT0)

Prerequisites: NestJS, Angular, and Ionic will need to be installed

> $ cd api

> $ npm install

Create a .env file and configure your PostGres environment variables

> POSTGRES_HOST=127.0.0.1
> POSTGRES_PORT=5432
> POSTGRES_USER=postgres
> POSTGRES_PASSWORD=password
> POSTGRES_DATABASE=linkedin
> JWT_SECRET=jwtsecret

Note: For development purposes the host is localhost, but this will need to be updated if you decide to deploy the application. By Default, PostGres gives the user 'postgres' with all privileges. You can change this to another user if desired. In this application we named our database 'linkedin', however, if you went with a different name this will need to be changed.

> $ npm run start:dev

> $ cd ../linkedin

> $ npm install

> $ ionic serve
