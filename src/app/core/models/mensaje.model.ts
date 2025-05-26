export interface Mensaje {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface Conversacion {
  id: string
  titulo: string
  mensajes: Mensaje[]
  fechaCreacion: string
  fechaActualizacion: string
}
