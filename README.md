# Keep Swimming Foundation

[Keep Swimming Foundation (KSF)](https://www.keepswimmingfoundation.org/) is a nonprofit organization that provides financial relief to families of critically ill patients who require extended inpatient medical care at an accredited USA hospital. Life can change in an instant. All too often families find themselves faced with unexpected medical bills after the diagnosis of a life-threatening or life-changing event. While health insurance provides support for medical costs, families faced with extended inpatient care typically shoulder the burden of the external costs associated with visiting and caring for their loved one. Because of this need, Keep Swimming Foundation was born. KSF uses a grant nomination process to determine who receives financial relief.

## Objective of the Project

Create a command center for receiving and managing the grant nomination process that will significantly reduce the manual effort required (35 hours/week down to 2 hours/week). Improve, automate, and centralize communication with the Healthcare Professionals and the Family Members to keep them informed of the process and cut down on one-off communications.

## What Technologies Are We Using?

The backend application is using the PERN Stack (Postgres, Express React, Node). The backend application is using [Express](https://expressjs.com/) Framework. The frontend application is using the [React](https://reactjs.org/) framework and several other third party libraries, bootstrapped via the [create-react-app](https://github.com/facebook/create-react-app) tool. [Postgres](https://www.postgresql.org/) is the database for the application.

## Getting Started With The App

- Install homebrew

        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

- Install Node & NPM

        brew install node@12

NOTE: use LTS, NOT current. If you already have a different version of node installed, you can use https://github.com/nvm-sh/nvm to switch back and forth. Do `nvm use` to switch.

- Install Lerna globally

        npm i -g lerna

- Clone and go into the application

        git clone https://github.com/the-difference-engine/ksf.git
        cd ksf

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
   postgres=# ALTER ROLE postgres WITH PASSWORD 'postgres';
   ```



You should now be in the root of the project. We will start the backend first. So lets head to the backend directory 

```
  cd packages
  cd api
  npm install
```


[Sequelize](https://sequelize.org/master/manual/migrations.html) is the ORM. This is the preferred way of communicating with the database, so the tools provided should be leveraged to help you build models and schema migrations. In particular, creation of new models should use the Sequelize CLI, which will create both a model file and a migration file. [Quick overview of commands](docs/sequelize-cli_shortcut.md)

The models and migrations folders will both need to be reviewed and updated to reflect the name sake standard of app. See [naming convention docs](docs/database_naming_convention.md)

Let's run the migration to set up our database.

To run migration you must be in the api folder, and execute the following command.

```
npx sequelize-cli db:migrate
```

If you check your postgres database you should see the tables intergrated!

Now we can go ahead and start he application with the following command:

```
  node index.js
```
You can also run nodemon, which is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. To do so run the command below instead of node index.js.

```
  npm run dev
```

We will now start the frontend. Open up a new tab in the terminal and execute the following commands.

```
  cd ..
  cd app
  npm install
  npm start
```

If you navigate to `http://localhost:3000/` you should see the home page!

### Set Up Environment Variables

- Set Up Environment Variables with DotENV Package [DotENV](https://www.npmjs.com/package/dotenv)

```
  cd packages
  cd api
  touch .ENV
```

- Add your OAuth tokens, SSH keys, API credentials, and other secrets here they will be ignored by git.

## Usage


### Continuous Integration (CI)

[Github Actions](https://docs.github.com/en/actions/building-and-testing-code-with-continuous-integration) is the CI provider. Node.js workflow configuration documentation found [here](https://docs.github.com/en/actions/language-and-framework-guides/using-nodejs-with-github-actions)
