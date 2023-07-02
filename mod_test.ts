import "https://deno.land/x/indexeddb@1.3.5/polyfill_memory.ts";
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import idbatch from "./mod.ts";
import * as idbx from "https://deno.land/x/idbx@v1.1.0/mod.ts"

Deno.test("batch(add,put,del)", async () => {
  const db = await idbx.openDB("test", {
    version: 1,
    upgrade(db) {
      db.createObjectStore("test", { keyPath: "id", autoIncrement: true });
    },
  });

  const batch = idbatch(db, [
    // create item
    { method: "add", storeName: "test", data: { name: "test" } },

    // update item
    { method: "put", storeName: "test", data: { id: 1, name: "test2" } },

    // delete item
    { method: "del", storeName: "test", key: 1 },
  ], "readwrite");

  const results = await batch.completed;
  assertEquals(results, [
    ["add", 1],
    ["put", 1],
    ["del", true],
  ]);

  db.close();
  indexedDB.deleteDatabase("test");
});

Deno.test("batch(get,getAll)", async () => {
  const db = await idbx.openDB("test", {
    version: 1,
    upgrade(db) {
      db.createObjectStore("test", { keyPath: "id", autoIncrement: true });
    },
  });

  const store = db.transaction("test", "readwrite").objectStore("test");
  await idbx.add(store, { name: "test" });

  const batch = idbatch(db, [
    // get item
    { method: "get", storeName: "test", query: 1 },

    // get all items
    { method: "getAll", storeName: "test" },
  ], "readonly");

  const results = await batch.completed;
  assertEquals(results, [
    ["get", { id: 1, name: "test" }],
    ["getAll", [{ id: 1, name: "test" }]],
  ]);
});
