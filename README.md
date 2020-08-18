# Keep Swimming Foundation

[Keep Swimming Foundation (KSF)](https://www.keepswimmingfoundation.org/) is a nonprofit organization that provides financial relief to families of critically ill patients who require extended inpatient medical care at an accredited USA hospital. Life can change in an instant. All too often families find themselves faced with unexpected medical bills after the diagnosis of a life-threatening or life-changing event. While health insurance provides support for medical costs, families faced with extended inpatient care typically shoulder the burden of the external costs associated with visiting and caring for their loved one. Because of this need, Keep Swimming Foundation was born. KSF uses a grant nomination process to determine who receives financial relief.

## Objective of the Project

Create a command center for receiving and managing the grant nomination process that will significantly reduce the manual effort required (35 hours/week down to 2 hours/week). Improve, automate, and centralize communication with the Healthcare Professionals and the Family Members to keep them informed of the process and cut down on one-off communications.

## What Technologies Are We Using?

The backend application is using the PERN Stack (Postgres, Express React, Node). The backend application is using [Express](https://expressjs.com/) Framework. The frontend application is using the [React](https://reactjs.org/) framework and several other third party libraries, bootstrapped via the [create-react-app](https://github.com/facebook/create-react-app) tool. [Postgres](https://www.postgresql.org/) is the database for the application. [Sequelize](https://sequelize.org/master/manual/migrations.html) is the ORM.

- Generate Model and Migration

        npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

- Running Migration

        npx sequelize-cli db:migrate

- Create Seed

        npx sequelize-cli seed:generate --name demo-user

- Run Seed

        npx sequelize-cli db:seed:all

## Getting Started With The App

- Install homebrew

        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

- Install Node & NPM

        brew install node@12

NOTE: use LTS, NOT current.  If you already have a different version of node installed, you can use https://github.com/nvm-sh/nvm to switch back and forth.  Do `nvm use` to switch.

- Clone and go into the application

        git clone https://github.com/the-difference-engine/ksf.git
        cd ksf

You should now be in the root of the project. We will start the backend first.

```
  cd packages
  cd api
  npm install
  node index.js
```

If you navigate to `http://localhost:8080/greeting` you should see "Hello World!".

We will now start the frontend. Open up a new tab in the terminal and execute the following commands.

```
  cd ..
  cd app
  npm install
  npm start
```

If you navigate to `http://localhost:3000/` you should see the home page!

### Postgres

Postgres is our database. You will need to have Postgres installed on your computer to persist data and run the application.

If you do not have Postgres installed, you can install it via brew

1. In your command-line run the command: `brew install postgresql`
2. Run the command: `ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents`
3. Create two new aliases to start and stop your postgres server. They could look something like this:

   ```
   alias pg_start="launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
   alias pg_stop="launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
   ```

4. Run the alias you just created: `pg_start`. Use this comment to start your database service.
   - alternatively, `pg_stop` stops your database service.
5. Run the command: `createdb postgres`
6. `createuser -s postgres` - fixes `role "postgres" does not exist`
7. Connect to your postgres with the command: `psql`
8. Test with `psql` command (and some additional commands if issues)

   ```
   $ psql
   psql (10.0)
   Type "help" for help.

   postgres=# ALTER ROLE postgres WITH SUPERUSER;
   postgres=# ALTER ROLE postgres WITH LOGIN;
   ``

### Set Up Enviroment Files

- Set Up Enviroment with DotENV Package [DotENV](https://www.npmjs.com/package/dotenv)

```
  cd packages
  cd api
  touch .ENV
```
- Add you secrets here, they will be ignored by git.

