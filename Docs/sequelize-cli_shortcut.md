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
