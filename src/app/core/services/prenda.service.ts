import { Injectable, signal } from "@angular/core"
import type { Prenda } from "../models/prenda.model"
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

interface ClothesResponseDTO extends Prenda {}
@Injectable({
  providedIn: "root",
})
export class PrendaService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  getClothes() {
    const token = localStorage.getItem("token");
    const response = this.http.get<ClothesResponseDTO[]>(`${this.url}/getAllByToken`, {headers:{authorization: `Bearer ${token}`}} )
    return response;
  }

  changeFavorite(clotheId: string) {
    const token = localStorage.getItem("token");
    const param = new HttpParams().set("id", clotheId);
    const response = this.http.post<ClothesResponseDTO>(`${this.url}/changeFavorite?${param}`, undefined, {headers:{authorization: `Bearer ${token}`}}   )
    return response;
  }

  deleteClothes(clotheId: string) {
    const token = localStorage.getItem("token");
    return this.http.delete<boolean>(`${this.url}/deleteClothesById`, {
      headers: {
        authorization: `Bearer ${token}`
      },
      params: new HttpParams().set("id", clotheId)
    });
  }

  newClothes(file: File) {
    const formData = new FormData();
    formData.append('imagen', file); // clave debe coincidir con el nombre del parámetro en el backend

    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.url}/newClothes`, formData, { headers });
  }
}
