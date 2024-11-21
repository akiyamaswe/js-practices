#!/usr/bin/env node

import { createDatabase, run, all, close } from "./db_operations.js";

async function initializeDatabase() {
  console.log("データベース作成を開始します...");
  const db = await createDatabase();
  console.log("データベース接続が確立されました");

  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  return db;
}

async function insertBooks(db, titles) {
  console.log("\n=== 書籍管理テーブルの作成をします ===");
  for (const title of titles) {
    const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
      title,
    ]);
    console.log(`『${title}』を登録しました（ID: ${result.lastID}）`);
  }
}

async function displayBooks(db) {
  const books = await all(db, "SELECT * FROM books");
  console.log("\n=== 登録された書籍一覧 ===");
  books.forEach((book) => {
    console.log(`ID: ${book.id.toString()} | タイトル:『${book.title}』`);
  });
}

async function cleanup(db) {
  console.log("\n=== クリーンアップ ===");
  console.log("テーブルを削除しています...");
  await run(db, "DROP TABLE books");
  console.log("テーブルの削除が完了しました");

  console.log("データベース接続を閉じています...");
  await close(db);
  console.log("データベース接続が正常に終了しました");
}

async function main() {
  const db = await initializeDatabase();
  await insertBooks(db, ["本A", "本B", "本C"]);
  await displayBooks(db);
  await cleanup(db);
}

main();
