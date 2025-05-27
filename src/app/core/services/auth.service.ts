import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface LoginRequestDTO{
  mail: string;
  password: string;
}

interface LoginResponseDTO{
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private url: string = "http://localhost:3001";

  login(data: LoginRequestDTO) {
    const response = this.http.post<LoginResponseDTO>(`${this.url}/login`, data)
    return response;
  }









}
