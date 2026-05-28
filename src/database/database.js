import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "appbooks.db";

let database = null;

export async function getDatabase() {
    if (!database) {
        database = await SQLite.openDatabaseAsync(DATABASE_NAME);
    }
    
    return database;
}

export async function initDatabase() {
    const db = await getDatabase();

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS books (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           titulo TEXT NOT NULL,
           autor TEXT NOT NULL,
           ano TEXT NOT NULL,
           capa TEXT,
           disponivel INTEGER NOT NULL DEFAULT 1 
        );
    `);

    return db;
}