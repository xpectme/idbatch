interface IDBXAddCommand<T> {
    storeName: string;
    method: "add";
    data: T | T[];
    key?: IDBValidKey;
}
interface IDBXPutCommand<T> {
    storeName: string;
    method: "put";
    data: T | T[];
    key?: IDBValidKey;
}
interface IDBXDeleteKeys {
    keys: IDBValidKey[];
}
interface IDBXDeleteKey {
    key: IDBValidKey | IDBKeyRange;
}
interface IDBXDeleteCommandBase {
    storeName: string;
    method: "del";
}
type IDBXDeleteCommand = IDBXDeleteCommandBase & (IDBXDeleteKeys | IDBXDeleteKey);
interface IDBXClearCommand {
    storeName: string;
    method: "clear";
}
interface IDBXGetCommand {
    storeName: string;
    method: "get";
    query: IDBValidKey;
}
interface IDBXGetAllCommand {
    storeName: string;
    method: "getAll";
    query?: IDBValidKey | IDBKeyRange;
    count?: number;
}
interface IDBXGetAllKeysCommand {
    storeName: string;
    method: "getAllKeys";
    query: IDBValidKey | IDBKeyRange;
    count?: number;
}
interface IDBXGetKeyCommand {
    storeName: string;
    method: "getKey";
    query: IDBValidKey;
}
interface IDBXCountCommand {
    storeName: string;
    method: "count";
    query: IDBValidKey | IDBKeyRange;
}
type IDBXCommand<T> = IDBXAddCommand<T> | IDBXPutCommand<T> | IDBXDeleteCommand | IDBXClearCommand | IDBXGetCommand | IDBXGetAllCommand | IDBXGetAllKeysCommand | IDBXGetKeyCommand | IDBXCountCommand;
interface IDBXBatchResult<T> {
    add: number;
    put: number;
    del: boolean;
    clear: boolean;
    get: T;
    getAll: T[];
    getAllKeys: IDBValidKey[];
    getKey: IDBValidKey;
    count: number;
}
type IDBXBatchResultItem<T = any, K extends keyof IDBXBatchResult<T> = keyof IDBXBatchResult<T>> = [
    K,
    IDBXBatchResult<T>[K]
];
export default function idbatch<T>(db: IDBDatabase, commands: IDBXCommand<T>[], mode: IDBTransactionMode): {
    abort: () => void;
    completed: Promise<IDBXBatchResultItem<T>[]>;
};
export {};
