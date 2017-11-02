module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://resoltzAdmin@resoltzdbserver:admin@Resoltz@resoltzdbserver.postgres.database.azure.com:5432/postgres?ssl=true'
  },
  test: {
    client: 'pg',
    connection: {
       host : '127.0.0.1',
       user : 'postgres',
       password : '898268',
       database : 'postgres'
     }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL|| 'postgres://resoltzAdmin@resoltzdbserver:admin@Resoltz@resoltzdbserver.postgres.database.azure.com:5432/postgres?ssl=true'

  }
};
