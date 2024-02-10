# SETUP THE ENVIRONMENT
```bash
# in the root directory
npm run install:all
```
```bash
# add .env file in the backend directory
vim backend/.env
```
You need to specify the following environment variables in the .env file:
```bash
# default port of the api is
PORT=6969
# default docker database url
DATABASE_URL=mongodb://root:example@localhost:27017
```
> If you want to use a different port, you need to change the frontend port also. `vim frontend/src/contacts.js`

## setup the database
```bash
# in the root directory
npm run db
```

# RUN THE APPLICATION
```bash
# in the root directory
npm run start
```
