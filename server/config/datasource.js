const sqliteConfig = {
    dialect: 'sqlite',
    storage: './onepage.db'
}

const mysqlConfig = {
    database:'onepage',
    username:'root',
    password:'123456',
    host: 'localhost',
    dialect: 'mysql'
}

export const dbConfig = mysqlConfig
