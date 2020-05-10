module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: ['error', 'schema', 'query'],
  migrations: ['dist/migration/**/*{.ts,js}'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};
