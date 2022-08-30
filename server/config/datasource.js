const sqliteConfig = {
    dialect: 'sqlite',
    storage: './onepage.db'
}

const mysqlConfig = {
    database: 'onepage',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_KEY || '123456',
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql'
}

export const dbConfig = process.env.ENABLE_MYSQL ? mysqlConfig : sqliteConfig
