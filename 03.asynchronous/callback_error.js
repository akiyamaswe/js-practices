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

            db.run("INSERT INTO books (title) VALUES (?)", ["本A"], (err) => {
              if (
                err.code === "SQLITE_CONSTRAINT" &&
                err.message.includes("UNIQUE")
              ) {
                console.error("ユニーク制約エラー: タイトルが重複しています");
              }

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
                        [null],
                        (err) => {
                          if (
                            err.code === "SQLITE_CONSTRAINT" &&
                            err.message.includes("NOT NULL")
                          ) {
                            console.error(
                              "NOT NULL制約エラー: タイトルは必須です",
                            );
                          }

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
                                  db.all(
                                    "SELECT * FROM books",
                                    (_err, books) => {
                                      for (const book of books) {
                                        console.log(
                                          `ID: ${book.id.toString()} | タイトル:『${book.title}』`,
                                        );
                                      }

                                      db.all("SELECT * FROM mangas", (err) => {
                                        if (
                                          err.code === "SQLITE_ERROR" &&
                                          err.message.includes("no such table")
                                        ) {
                                          console.error(
                                            "テーブルが存在しません: 存在するテーブルの指定が必要です",
                                          );
                                        }

                                        console.log("\n=== クリーンアップ ===");
                                        console.log(
                                          "テーブルを削除しています...",
                                        );
                                        db.run("DROP TABLE books", () => {
                                          console.log(
                                            "テーブルの削除が完了しました",
                                          );

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
                },
              );
            });
          },
        );
      });
    },
  );
});
