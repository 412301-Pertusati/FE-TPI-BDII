import { Injectable, signal } from "@angular/core"
import type { ConfiguracionUsuario } from "../models/configuracion.model"

@Injectable({
  providedIn: "root",
})
export class ConfiguracionService {
  private configuracionSignal = signal<ConfiguracionUsuario>({
    id: "user1",
    nombre: "Ana García",
    email: "ana.garcia@ejemplo.com",
    preferenciasEstilo: ["Casual elegante", "Minimalista"],
    coloresFavoritos: ["Beige", "Blanco", "Negro", "Azul"],
    marcasFavoritas: ["Zara", "H&M", "Mango"],
    presupuesto: {
      minimo: 20,
      maximo: 100,
    },
    notificaciones: {
      recordatorios: true,
      sugerencias: true,
      ofertas: false,
    },
    privacidad: {
      perfilPublico: false,
      compartirOutfits: true,
    },
  })

  get configuracion() {
    return this.configuracionSignal.asReadonly()
  }

  actualizarConfiguracion(config: Partial<ConfiguracionUsuario>): void {
    this.configuracionSignal.update((current) => ({ ...current, ...config }))
  }
}
