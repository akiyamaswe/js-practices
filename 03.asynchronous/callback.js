#!/usr/bin/env node

import sqlite3 from "sqlite3";

console.log("データベース作成を開始します...");

const db = new sqlite3.Database(":memory:", () => {
  console.log("データベース接続が確立されました");

  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      console.log("\n=== 書籍管理テーブルの作成をします ===");

      db.run("INSERT INTO books (title) VALUES (?)", ["本A"], function () {
        db.get(
          "SELECT title FROM books WHERE id = ?",
          [this.lastID],
          (_err, book) => {
            console.log(
              `『${book.title}』を登録しました（ID: ${this.lastID}）`,
            );

            db.run(
              "INSERT INTO books (title) VALUES (?)",
              ["本B"],
              function () {
                db.get(
                  "SELECT title FROM books WHERE id = ?",
                  [this.lastID],
                  (_err, book) => {
                    console.log(
                      `『${book.title}』を登録しました（ID: ${this.lastID}）`,
                    );

                    db.run(
                      "INSERT INTO books (title) VALUES (?)",
                      ["本C"],
                      function () {
                        db.get(
                          "SELECT title FROM books WHERE id = ?",
                          [this.lastID],
                          (_err, book) => {
                            console.log(
                              `『${book.title}』を登録しました（ID: ${this.lastID}）`,
                            );

                            console.log("\n=== 登録された書籍一覧 ===");
                            db.all("SELECT * FROM books", (_, books) => {
                              for (const book of books) {
                                console.log(
                                  `ID: ${book.id.toString()} | タイトル:『${book.title}』`,
                                );
                              }

                              console.log("\n=== クリーンアップ ===");
                              console.log("テーブルを削除しています...");
                              db.run("DROP TABLE books", () => {
                                console.log("テーブルの削除が完了しました");
                                console.log(
                                  "データベース接続を閉じています...",
                                );
                                db.close(() => {
                                  console.log(
                                    "データベース接続が正常に終了しました",
                                  );
                                });
                              });
                            });
                          },
                        );
                      },
                    );
                  },
                );
              },
            );
          },
        );
      });
    },
  );
});
