## Carbon certificates REST API

#### Build the API in docker:
```
npm i
docker-compose up
```
#### Database seed
```
npm run seeds:run
```
#### Run the tests
```
npm run test:cov
```

#### Local Swagger docs
```
http://localhost:8080/api/v1/api-docs
```

#### Tech/libraries used:
- #### [NestJS](https://docs.nestjs.com)
- #### [PostgreSQL](https://www.postgresql.org)
- #### [TypeORM](https://typeorm.io)
- #### [NestJS Commander](https://www.npmjs.com/package/nest-commander)
- #### [Jest](https://jestjs.io)
- #### [Swagger](https://swagger.io)
- #### [class-validator](https://github.com/typestack/class-validator)

---

![Agreena](https://agreena.com/wp-content/uploads/2021/06/agreena-logo.svg)

# NodeJS recruitment test task

### Carbon Certificates application API
Create the API containing endpoints:
1. Login
2. List of available Carbon certificates (*no owner*)
3. List of owned Carbon certificates (*owned by current user*)
4. Transfer my own Carbon certificate to the another existing user (*based on the User ID parameter*)

##### Data informations
**Carbon certificate** should contain the following data:
- Unique ID
- Country
- Status:
  - `available` (*no owner*)
  - `owned` (*owner is present and certificate hasn't been transferred*)
  - `transferred` (*owner is present and certificate has been transferred from one owner to another*)
- Owner (*relation to existing user, can be empty*)

##### Requirements
- Application should be written with strong typing (*TypeScript*)
- Framework is free of choice (NestJS, or others)
- ORM is free of choice (TypeORM, or others)
- Authentication should be implemented (*type/package if free of choice*)
- Seeds should be included (*100 random certificates, 5 random users with certificates and 5 without them*)
- Tests have to be included (Jest is preferred)

### Good luck!
