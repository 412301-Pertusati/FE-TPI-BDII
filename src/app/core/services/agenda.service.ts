import { Injectable, signal } from "@angular/core"
import type { EventoAgenda } from "../models/evento-agenda.model"

@Injectable({
  providedIn: "root",
})
export class AgendaService {
  private eventosSignal = signal<EventoAgenda[]>([
    {
      id: "e1",
      titulo: "Reunión de trabajo",
      fecha: "2025-05-25",
      outfitId: "o1",
      notas: "Presentación importante",
      recordatorio: true,
    },
    {
      id: "e2",
      titulo: "Cena con amigos",
      fecha: "2025-05-27",
      notas: "Restaurante italiano",
      recordatorio: true,
    },
  ])

  get eventos() {
    return this.eventosSignal.asReadonly()
  }

  agregarEvento(evento: Omit<EventoAgenda, "id">): void {
    const nuevoEvento: EventoAgenda = {
      ...evento,
      id: this.generateId(),
    }
    this.eventosSignal.update((eventos) => [...eventos, nuevoEvento])
  }

  actualizarEvento(id: string, evento: Partial<EventoAgenda>): void {
    this.eventosSignal.update((eventos) => eventos.map((e) => (e.id === id ? { ...e, ...evento } : e)))
  }

  eliminarEvento(id: string): void {
    this.eventosSignal.update((eventos) => eventos.filter((e) => e.id !== id))
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9)
  }
}
