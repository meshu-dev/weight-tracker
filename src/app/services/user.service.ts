import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  set(data) {
    let user = {
      userId: data.userId,
      unitId: data.unitId,
      unit: data.unitShortName
    };
    localStorage.setItem('user', JSON.stringify(user));
  }

  get() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
