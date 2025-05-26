import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

interface PrendaDTO {
  id: number;
  nombre: string;
  categoria: string;
  color: string;
  imagen: string;
  temporada: string[];
  notas?: string;
  favorito: boolean;
}

interface OutfitDTO {
  id: number;
  nombre: string;
  ocasion: string;
  imagen: string;
  temporada: string[];
  notas?: string;
  favorito: boolean;
}

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: "./favorito.component.html",
  styleUrls: ["./favorito.component.css"],
})
export class FavoritoComponent implements OnInit {
  prendasFavoritas: PrendaDTO[] = [];
  outfitsFavoritos: OutfitDTO[] = [];
  selectedTabIndex = 0;

  ngOnInit() {
    this.loadFavoritos();
  }

  loadFavoritos() {
    // Aquí cargarías los datos desde tu servicio
    // Por ahora, datos de ejemplo
    this.prendasFavoritas = [
      {
        id: 1,
        nombre: 'Camisa blanca',
        categoria: 'Camisas',
        color: 'Blanco',
        imagen: '/placeholder.svg?height=200&width=300',
        temporada: ['Primavera', 'Verano'],
        favorito: true
      },
      {
        id: 2,
        nombre: 'Jeans azules',
        categoria: 'Pantalones',
        color: 'Azul',
        imagen: '/placeholder.svg?height=200&width=300',
        temporada: ['Otoño', 'Invierno'],
        favorito: true
      },
      {
        id: 3,
        nombre: 'Vestido negro',
        categoria: 'Vestidos',
        color: 'Negro',
        imagen: '/placeholder.svg?height=200&width=300',
        temporada: ['Primavera', 'Otoño'],
        favorito: true
      }
    ];

    this.outfitsFavoritos = [
      {
        id: 1,
        nombre: 'Look casual',
        ocasion: 'Casual',
        imagen: '/placeholder.svg?height=200&width=300',
        temporada: ['Primavera'],
        favorito: true
      }
    ];
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
  }

  onToggleFavoritoPrenda(prenda: PrendaDTO) {
    prenda.favorito = !prenda.favorito;
    if (!prenda.favorito) {
      // Remover de favoritos
      this.prendasFavoritas = this.prendasFavoritas.filter(p => p.id !== prenda.id);
    }
    // Aquí llamarías a tu servicio para actualizar el estado
  }

  onToggleFavoritoOutfit(outfit: OutfitDTO) {
    outfit.favorito = !outfit.favorito;
    if (!outfit.favorito) {
      // Remover de favoritos
      this.outfitsFavoritos = this.outfitsFavoritos.filter(o => o.id !== outfit.id);
    }
    // Aquí llamarías a tu servicio para actualizar el estado
  }

  onEditarPrenda(prenda: PrendaDTO) {
    console.log('Editar prenda:', prenda);
    // Implementar lógica de edición
  }

  onEliminarPrenda(prenda: PrendaDTO) {
    console.log('Eliminar prenda:', prenda);
    this.prendasFavoritas = this.prendasFavoritas.filter(p => p.id !== prenda.id);
    // Aquí llamarías a tu servicio para eliminar
  }

  onEditarOutfit(outfit: OutfitDTO) {
    console.log('Editar outfit:', outfit);
    // Implementar lógica de edición
  }

  onEliminarOutfit(outfit: OutfitDTO) {
    console.log('Eliminar outfit:', outfit);
    this.outfitsFavoritos = this.outfitsFavoritos.filter(o => o.id !== outfit.id);
    // Aquí llamarías a tu servicio para eliminar
  }
}
