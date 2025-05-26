export interface ConfiguracionUsuario {
  id: string
  nombre: string
  email: string
  preferenciasEstilo: string[]
  coloresFavoritos: string[]
  marcasFavoritas: string[]
  presupuesto: {
    minimo: number
    maximo: number
  }
  notificaciones: {
    recordatorios: boolean
    sugerencias: boolean
    ofertas: boolean
  }
  privacidad: {
    perfilPublico: boolean
    compartirOutfits: boolean
  }
}
