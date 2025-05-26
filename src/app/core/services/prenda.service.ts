import { Injectable, signal } from "@angular/core"
import type { Prenda } from "../models/prenda.model"

@Injectable({
  providedIn: "root",
})
export class PrendaService {
  private prendasSignal = signal<Prenda[]>([
    {
      id: "p1",
      nombre: "Camisa blanca",
      categoria: "Camisas",
      color: "Blanco",
      temporada: ["Primavera", "Verano", "Otoño"],
      ocasiones: ["Formal", "Trabajo", "Casual"],
      imagen: "/assets/images/white-shirt.png",
      fechaCompra: "2024-01-15",
      marca: "Zara",
      precio: 29.99,
      favorito: true,
      notas: "Camisa básica de algodón, corte slim fit",
    },
    {
      id: "p2",
      nombre: "Jeans azules",
      categoria: "Pantalones",
      color: "Azul",
      temporada: ["Primavera", "Otoño", "Invierno"],
      ocasiones: ["Casual", "Diario"],
      imagen: "/assets/images/classic-blue-jeans.png",
      fechaCompra: "2023-11-20",
      marca: "Levi's",
      precio: 59.99,
      favorito: true,
      notas: "Jeans clásicos, corte recto",
    },
  ])

  get prendas() {
    return this.prendasSignal.asReadonly()
  }

  agregarPrenda(prenda: Omit<Prenda, "id">): void {
    const nuevaPrenda: Prenda = {
      ...prenda,
      id: this.generateId(),
    }
    this.prendasSignal.update((prendas) => [...prendas, nuevaPrenda])
  }

  actualizarPrenda(id: string, prenda: Partial<Prenda>): void {
    this.prendasSignal.update((prendas) => prendas.map((p) => (p.id === id ? { ...p, ...prenda } : p)))
  }

  eliminarPrenda(id: string): void {
    this.prendasSignal.update((prendas) => prendas.filter((p) => p.id !== id))
  }

  toggleFavorito(id: string): void {
    this.prendasSignal.update((prendas) => prendas.map((p) => (p.id === id ? { ...p, favorito: !p.favorito } : p)))
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9)
  }
}
