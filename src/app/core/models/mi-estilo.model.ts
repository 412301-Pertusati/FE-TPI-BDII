import {ropaFavoritaDTO} from './ropaFavoritaDto';

export interface miEstilo {
  prendasPorTipo: Record<string, number>;            // Map<string, number>
  coloresFrecuentes: string[];                       // List<String>
  estilosFrecuentes: string[];                       // List<String>
  patronesFrecuentes: string[];                      // List<String>
  prendasFavoritas: ropaFavoritaDTO;              // Otro DTO con estructura interna
  usoEnOutfits: Record<string, number>;              // Map<string, number>
  estacionPredominante: string;                      // String
}
