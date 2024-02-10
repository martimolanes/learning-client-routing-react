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
PORT=6969
DATABASE_URL=mongodb://root:example@localhost:27017
```

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
