import { Injectable, signal } from "@angular/core"
import type { Prenda } from "../models/prenda.model"
import {HttpClient, HttpParams} from '@angular/common/http';

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



}
