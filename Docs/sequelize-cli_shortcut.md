- Generate Model and Migration

        npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

- Running Migration

        npx sequelize-cli db:migrate

- Create Seed

        npx sequelize-cli seed:generate --name demo-user

- Run Seed

        npx sequelize-cli db:seed:all

- Revert back to initial state by undoing all migrations

        npx sequelize-cli db:migrate:undo:all

- Append table with migration [see also doc](https://sequelize.readthedocs.io/en/latest/docs/migrations/)

          sequelize migration:create --name name_of_your_migration
