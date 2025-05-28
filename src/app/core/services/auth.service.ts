import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface LoginRequestDTO{
  username: string;
  password: string;
}

interface LoginResponseDTO{
  token: string;
}

interface RegisterResponseDTO {}

interface RegisterRequestDTO extends LoginRequestDTO{
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private url: string = "http://localhost:8080";

  login(data: LoginRequestDTO) {
    const response = this.http.post<LoginResponseDTO>(`${this.url}/auth/login`, data)
    return response;
  }

  register(data: RegisterRequestDTO) {
    const response = this.http.post<RegisterResponseDTO>(`${this.url}/auth/register`, data)
    return response;
  }









}
