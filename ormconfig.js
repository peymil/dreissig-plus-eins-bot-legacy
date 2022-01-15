if (process.env.NODE_ENV === "production") {
  //production
  module.exports = {
    type: "sqlite",
    database: "data/database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["build/entity/**/*.js"],
    migrations: ["build/migration/**/*.js"],
    subscribers: ["build/subscriber/**/*.js"],
    cli: {
      entitiesDir: "build/entity",
      migrationsDir: "build/migration",
      subscribersDir: "build/subscriber",
    },
  };
} else {
  //development
  module.exports = {
    type: "sqlite",
    database: "data/database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  };
}
