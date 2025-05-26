export interface Prenda {
  id: string
  nombre: string
  categoria: string
  color: string
  temporada: string[]
  ocasiones: string[]
  imagen: string
  fechaCompra?: string
  marca?: string
  precio?: number
  favorito: boolean
  notas?: string
}
