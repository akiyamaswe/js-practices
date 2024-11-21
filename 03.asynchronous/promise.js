#!/usr/bin/env node

import { createDatabase, run, all, close } from "./db_operations.js";

console.log("データベース作成を開始します...");

createDatabase()
  .then((db) => {
    console.log("データベース接続が確立されました");
    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    ).then(() => db);
  })
  .then((db) => {
    console.log("\n=== 書籍管理テーブルの作成をします ===");
    const titles = ["本A", "本B", "本C"];
    let promise = Promise.resolve();
    titles.forEach((title) => {
      promise = promise.then(() =>
        run(db, "INSERT INTO books (title) VALUES (?)", [title]).then(
          (result) => {
            console.log(`『${title}』を登録しました（ID: ${result.lastID}）`);
          },
        ),
      );
    });

    return promise.then(() => db);
  })
  .then((db) => {
    return all(db, "SELECT * FROM books").then((books) => {
      console.log("\n=== 登録された書籍一覧 ===");
      books.forEach((book) => {
        console.log(`ID: ${book.id.toString()} | タイトル:『${book.title}』`);
      });
      return db;
    });
  })
  .then((db) => {
    console.log("\n=== クリーンアップ ===");
    console.log("テーブルを削除しています...");
    return run(db, "DROP TABLE books").then(() => {
      console.log("テーブルの削除が完了しました");
      console.log("データベース接続を閉じています...");
      return close(db);
    });
  })
  .then(() => {
    console.log("データベース接続が正常に終了しました");
  });
