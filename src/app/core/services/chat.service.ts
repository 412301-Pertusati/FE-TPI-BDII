import { Injectable, signal } from "@angular/core"
import type { Conversacion, Mensaje } from "../models/mensaje.model"

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private conversacionesSignal = signal<Conversacion[]>([
    {
      id: "conv1",
      titulo: "Recomendaciones para cena",
      mensajes: [
        {
          id: "m1",
          role: "user",
          content: "¿Qué me recomiendas para una cena casual?",
          timestamp: "2025-05-20T18:30:00Z",
        },
        {
          id: "m2",
          role: "assistant",
          content:
            "Para una cena casual, te recomendaría combinar tus jeans azules con una blusa elegante y zapatos cómodos.",
          timestamp: "2025-05-20T18:30:30Z",
        },
      ],
      fechaCreacion: "2025-05-20T18:30:00Z",
      fechaActualizacion: "2025-05-20T18:31:30Z",
    },
  ])

  private conversacionActualSignal = signal<Conversacion | null>(null)

  get conversaciones() {
    return this.conversacionesSignal.asReadonly()
  }

  get conversacionActual() {
    return this.conversacionActualSignal.asReadonly()
  }

  constructor() {
    const conversaciones = this.conversacionesSignal()
    if (conversaciones.length > 0) {
      this.conversacionActualSignal.set(conversaciones[0])
    }
  }

  enviarMensaje(contenido: string): void {
    let conversacionActual = this.conversacionActualSignal()

    if (!conversacionActual) {
      this.iniciarNuevaConversacion()
      conversacionActual = this.conversacionActualSignal()!
    }

    const nuevoMensaje: Mensaje = {
      id: this.generateId(),
      role: "user",
      content: contenido,
      timestamp: new Date().toISOString(),
    }

    const conversacionActualizada = {
      ...conversacionActual,
      mensajes: [...conversacionActual.mensajes, nuevoMensaje],
      fechaActualizacion: new Date().toISOString(),
    }

    this.actualizarConversacion(conversacionActualizada)

    // Simular respuesta del asistente
    setTimeout(() => {
      const respuesta = this.generarRespuestaAsistente(contenido)
      const mensajeAsistente: Mensaje = {
        id: this.generateId(),
        role: "assistant",
        content: respuesta,
        timestamp: new Date().toISOString(),
      }

      const conversacionConRespuesta = {
        ...conversacionActualizada,
        mensajes: [...conversacionActualizada.mensajes, mensajeAsistente],
        fechaActualizacion: new Date().toISOString(),
      }

      this.actualizarConversacion(conversacionConRespuesta)
    }, 1000)
  }

  iniciarNuevaConversacion(): void {
    const nuevaConversacion: Conversacion = {
      id: this.generateId(),
      titulo: "Nueva conversación",
      mensajes: [],
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
    }

    this.conversacionesSignal.update((conversaciones) => [nuevaConversacion, ...conversaciones])
    this.conversacionActualSignal.set(nuevaConversacion)
  }

  private actualizarConversacion(conversacion: Conversacion): void {
    this.conversacionesSignal.update((conversaciones) =>
      conversaciones.map((c) => (c.id === conversacion.id ? conversacion : c)),
    )
    this.conversacionActualSignal.set(conversacion)
  }

  private generarRespuestaAsistente(mensaje: string): string {
    const mensajeLower = mensaje.toLowerCase()

    if (mensajeLower.includes("hola") || mensajeLower.includes("buenos días")) {
      return "¡Hola! Soy tu asistente de moda personal. ¿En qué puedo ayudarte hoy?"
    }

    if (mensajeLower.includes("outfit") || mensajeLower.includes("vestir")) {
      return "Te recomiendo combinar tu camisa blanca con los jeans azules para un look casual pero elegante."
    }

    return "Entiendo tu consulta. ¿Te gustaría que te sugiera algo específico para alguna ocasión?"
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9)
  }
}
