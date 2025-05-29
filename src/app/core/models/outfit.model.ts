
import { Prenda } from './prenda.model';
interface ClothesResponseDTO extends Prenda {}

export interface Outfit {
  id: string
  outfit: ClothesResponseDTO[]
  favorite: boolean
}