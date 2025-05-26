import { Injectable, signal } from "@angular/core"
import type { Outfit } from "../models/outfit.model"

@Injectable({
  providedIn: "root",
})
export class OutfitService {
  private outfitsSignal = signal<Outfit[]>([
    {
      id: "o1",
      nombre: "Casual de oficina",
      ocasion: "Trabajo",
      temporada: ["Primavera", "Otoño"],
      prendas: ["p1", "p2"],
      imagen: "/assets/images/business-casual-outfit.png",
      fechaCreacion: "2024-03-15",
      favorito: true,
      notas: "Perfecto para días de oficina",
    },
    {
      id: "o2",
      nombre: "Fin de semana",
      ocasion: "Casual",
      temporada: ["Primavera", "Verano"],
      prendas: ["p2"],
      imagen: "/assets/images/weekend-casual-outfit.png",
      fechaCreacion: "2024-03-20",
      favorito: false,
      notas: "Cómodo para paseos de fin de semana",
    },
  ])

  get outfits() {
    return this.outfitsSignal.asReadonly()
  }

  agregarOutfit(outfit: Omit<Outfit, "id" | "fechaCreacion">): void {
    const nuevoOutfit: Outfit = {
      ...outfit,
      id: this.generateId(),
      fechaCreacion: new Date().toISOString(),
    }
    this.outfitsSignal.update((outfits) => [...outfits, nuevoOutfit])
  }

  actualizarOutfit(id: string, outfit: Partial<Outfit>): void {
    this.outfitsSignal.update((outfits) => outfits.map((o) => (o.id === id ? { ...o, ...outfit } : o)))
  }

  eliminarOutfit(id: string): void {
    this.outfitsSignal.update((outfits) => outfits.filter((o) => o.id !== id))
  }

  toggleFavorito(id: string): void {
    this.outfitsSignal.update((outfits) => outfits.map((o) => (o.id === id ? { ...o, favorito: !o.favorito } : o)))
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9)
  }
}
