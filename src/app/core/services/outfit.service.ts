import { Injectable } from "@angular/core"
import {  HttpClient, HttpParams } from "@angular/common/http"
import type { Observable } from "rxjs"
import type { Outfit } from "../models/outfit.model"

@Injectable({
  providedIn: "root",
})
export class OutfitService {
  private url = "http://localhost:8080"

  constructor(private http: HttpClient) {}

  /**
   * Creates a new outfit based on the provided description
   * @param description The description for the new outfit
   * @returns An Observable with the created outfit
   */
  generateOutfit(description: string): Observable<Outfit> {
    const token = localStorage.getItem("token")
    return this.http.post<Outfit>(`${this.url}/newOutfit`, description, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    })
  }

  /**
   * Changes the favorite status of an outfit
   * @param outfitId The ID of the outfit to change favorite status
   * @returns An Observable with the updated outfit
   */
  changeFavoriteOutfit(outfitId: string): Observable<Outfit> {
    const token = localStorage.getItem("token")
    const param = new HttpParams().set("id", outfitId)
    return this.http.post<Outfit>(`${this.url}/changeFavoriteOutfit?${param}`, undefined, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Gets all outfits for the current user
   * @returns An Observable with a list of outfits
   */
  getOutfitsByUser(): Observable<Outfit[]> {
    const token = localStorage.getItem("token")
    return this.http.get<Outfit[]>(`${this.url}/getOutfitByUser`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }
}
