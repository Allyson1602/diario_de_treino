export interface IStorageData<T> {
  setData(value: T[]): Promise<void>;
  getData(): Promise<T[]>;
  updateData(value: T): Promise<void>;
  removeData(value: T): Promise<boolean>;
}
