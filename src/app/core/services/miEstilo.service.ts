import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {miEstilo} from '../models/mi-estilo.model';

@Injectable({
  providedIn: 'root'
})
export class MiEstiloService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }

  getStatsByToken() {
    const token = localStorage.getItem("token");
    //                           LE PUEDE FALTAR ALGO A LA URL
    return this.http.get<miEstilo>(`${this.url}/statsByToken`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }


}
