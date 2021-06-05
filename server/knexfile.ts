import path from "path";

try {
    module.exports = {
        development: {
            client: "mysql2",
            connection: {
                database: "SBD_DB",
                host: "127.0.0.1",
                user: "root",
                password: "teste123",
            },
            migrations: {
                directory: path.resolve(__dirname, "src", "database", "migrations"),
            },
            useNullAsDefault: true,
        },
    };
} catch (err) {
    console.log(err);
}
