import { StorageKey } from './../storage-key.type';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  storage: Record<StorageKey, Storage> = {
    local: localStorage,
    session: sessionStorage,
  };
  public BASE_URL = 'https://vast-shore-74260.herokuapp.com/banks';

  constructor(private http: HttpClient) {}

  addToLocalStorage(storageType: StorageKey, key: string, value: any) {
    this.storage[storageType].setItem(key, JSON.stringify(value));
  }

  clearStorage(storageType: StorageKey): void {
    this.storage[storageType].clear();
  }

  deleteFromStorage(storageType: StorageKey, key: string): any {
    this.storage[storageType].removeItem(key);
  }

  getFromStorage(storageType: StorageKey, key: string): any {
    const item = this.storage[storageType].getItem(key);

    if (item == null) {
      return null;
    }

    return JSON.parse(item);
  }

  getBankList() {
    let params = new HttpParams();
    params = params.append('city', 'MUMBAI');
    const options = { params: params };
    return this.http.get(this.BASE_URL, options);
  }


}
