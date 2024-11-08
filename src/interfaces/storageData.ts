export interface IStorageData<T> {
  setStorageData(value: T[]): Promise<void>;
  getStorageData(): Promise<T[]>;
  updateStorageData(value: T): Promise<void>;
  removeStorageData(value: T): Promise<boolean>;
}
