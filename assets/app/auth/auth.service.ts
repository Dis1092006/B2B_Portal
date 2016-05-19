import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User} from "./user";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    constructor(private _http: Http) { }

    login(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        //return this._http.post('https://torg-b2b.ru/Portal_TEST/user/login', body, {headers: headers})
        return this._http.post('http://localhost:8000/user/login', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()))
    }

    logout() {
        localStorage.clear();
    }

	isLoggedIn() {
		return localStorage.getItem('token') !== null;
	}
}