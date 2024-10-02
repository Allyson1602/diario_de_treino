import { StorageKeys } from "../storage/_storageKeys";

export interface IStorageData<T> {
  setData(value: T): Promise<void>;
  getData(): Promise<T | null>;
  updateData(value: T): Promise<void>;
}
