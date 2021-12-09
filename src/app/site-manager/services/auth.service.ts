import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserProfile} from "../users.module/types";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(credentials: { host: string, username: string, password: string }) {
    return this.http.post<{ accessToken: string, user: UserProfile }>(`http://${credentials.host}/auth/login`, {
      username: credentials.username,
      password: credentials.password
    })

  }

}
