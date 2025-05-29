// import { Component, type OnInit } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { MatTabsModule } from "@angular/material/tabs"
// import { MatCardModule } from "@angular/material/card"
// import { MatIconModule } from "@angular/material/icon"
// import { MatButtonModule } from "@angular/material/button"
// import { MatChipsModule } from "@angular/material/chips"
// import  { PrendaService } from "../../core/services/prenda.service"
// import  { OutfitService } from "../../core/services/outfit.service"
// import type { Prenda } from "../../core/models/prenda.model"
// import type { Outfit } from "../../core/models/outfit.model"
//
// @Component({
//   selector: "app-favoritos",
//   standalone: true,
//   imports: [CommonModule, MatTabsModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
//   templateUrl: "./favorito.component.html",
//   styleUrls: ["./favorito.component.css"],
// })
// export class FavoritoComponent implements OnInit {
//   prendasFavoritas: Prenda[] = []
//   outfitsFavoritos: Outfit[] = []
//   selectedTabIndex = 0
//
//   // Propiedades del carrusel para prendas
//   currentIndexPrendas = 0
//   itemsPerViewPrendas = 3
//   maxIndexPrendas = 0
//
//   // Propiedades del carrusel para outfits
//   currentIndexOutfits = 0
//   itemsPerViewOutfits = 3
//   maxIndexOutfits = 0
//
//   Math = Math
//
//   constructor(
//     private prendaService: PrendaService,
//     private outfitService: OutfitService,
//   ) {}
//
//   ngOnInit() {
//     this.getClothesFavorites()
//     this.getOutfitFavorites()
//     this.updateItemsPerView()
//   }
//
//   getClothesFavorites() {
//     this.prendaService.getClothes().subscribe({
//       next: (data) => {
//         this.prendasFavoritas = data.filter((prenda) => prenda.favorite)
//         this.updateMaxIndexPrendas()
//       },
//       error: (error) => console.log(error),
//     })
//   }
//
//   getOutfitFavorites() {
//     this.outfitService.getOutfitsByUser().subscribe({
//       next: (data) => {
//         this.outfitsFavoritos = data.filter((outfit) => outfit.favorite)
//         this.updateMaxIndexOutfits()
//       },
//       error: (error) => console.log(error),
//     })
//   }
//
//   // Métodos del carrusel para prendas
//   updateMaxIndexPrendas() {
//     this.maxIndexPrendas = Math.max(0, this.prendasFavoritas.length - this.itemsPerViewPrendas)
//   }
//
//   nextSlidePrendas() {
//     if (this.currentIndexPrendas < this.maxIndexPrendas) {
//       this.currentIndexPrendas++
//     }
//   }
//
//   prevSlidePrendas() {
//     if (this.currentIndexPrendas > 0) {
//       this.currentIndexPrendas--
//     }
//   }
//
//   goToSlidePrendas(index: number) {
//     this.currentIndexPrendas = Math.max(0, Math.min(index, this.maxIndexPrendas))
//   }
//
//   get canGoPrevPrendas() {
//     return this.currentIndexPrendas > 0
//   }
//
//   get canGoNextPrendas() {
//     return this.currentIndexPrendas < this.maxIndexPrendas
//   }
//
//   get totalSlidesPrendas() {
//     return Math.ceil(this.prendasFavoritas.length / this.itemsPerViewPrendas)
//   }
//
//   get currentSlidePrendas() {
//     return Math.floor(this.currentIndexPrendas / this.itemsPerViewPrendas) + 1
//   }
//
//   // Métodos del carrusel para outfits
//   updateMaxIndexOutfits() {
//     this.maxIndexOutfits = Math.max(0, this.outfitsFavoritos.length - this.itemsPerViewOutfits)
//   }
//
//   nextSlideOutfits() {
//     if (this.currentIndexOutfits < this.maxIndexOutfits) {
//       this.currentIndexOutfits++
//     }
//   }
//
//   prevSlideOutfits() {
//     if (this.currentIndexOutfits > 0) {
//       this.currentIndexOutfits--
//     }
//   }
//
//   goToSlideOutfits(index: number) {
//     this.currentIndexOutfits = Math.max(0, Math.min(index, this.maxIndexOutfits))
//   }
//
//   get canGoPrevOutfits() {
//     return this.currentIndexOutfits > 0
//   }
//
//   get canGoNextOutfits() {
//     return this.currentIndexOutfits < this.maxIndexOutfits
//   }
//
//   get totalSlidesOutfits() {
//     return Math.ceil(this.outfitsFavoritos.length / this.itemsPerViewOutfits)
//   }
//
//   get currentSlideOutfits() {
//     return Math.floor(this.currentIndexOutfits / this.itemsPerViewOutfits) + 1
//   }
//
//   // Método responsive compartido
//   updateItemsPerView() {
//     const width = window.innerWidth
//     if (width < 768) {
//       this.itemsPerViewPrendas = 1
//       this.itemsPerViewOutfits = 1
//     } else if (width < 1024) {
//       this.itemsPerViewPrendas = 2
//       this.itemsPerViewOutfits = 2
//     } else {
//       this.itemsPerViewPrendas = 3
//       this.itemsPerViewOutfits = 3
//     }
//     this.updateMaxIndexPrendas()
//     this.updateMaxIndexOutfits()
//   }
//
//   onResize() {
//     this.updateItemsPerView()
//   }
//
//   trackByPrenda(index: number, prenda: Prenda): string {
//     return prenda.id
//   }
//
//   trackByOutfit(index: number, outfit: Outfit): string {
//     return outfit.id
//   }
//
//   // Tus métodos originales
//   onTabChange(event: any) {
//     this.selectedTabIndex = event.index
//     // Resetear índices del carrusel al cambiar de tab
//     this.currentIndexPrendas = 0
//     this.currentIndexOutfits = 0
//   }
//
//   onToggleFavoritoPrenda(prenda: Prenda) {
//     this.prendaService.changeFavorite(prenda.id).subscribe({
//       next: (updatedPrenda) => {
//         // Actualizar la prenda en el array
//         const index = this.prendasFavoritas.findIndex((p) => p.id === prenda.id)
//         if (index !== -1) {
//           if (updatedPrenda.favorite) {
//             this.prendasFavoritas[index] = updatedPrenda
//           } else {
//             // Remover de favoritos
//             this.prendasFavoritas.splice(index, 1)
//             this.updateMaxIndexPrendas()
//             // Ajustar índice si es necesario
//             if (this.currentIndexPrendas > this.maxIndexPrendas) {
//               this.currentIndexPrendas = this.maxIndexPrendas
//             }
//           }
//         }
//       },
//       error: (error) => console.log("Error al cambiar favorito:", error),
//     })
//   }
//
//   onToggleFavoritoOutfit(outfit: Outfit) {
//     this.outfitService.changeFavoriteOutfit(outfit.id).subscribe({
//       next: (updatedOutfit) => {
//         const index = this.outfitsFavoritos.findIndex((o) => o.id === outfit.id)
//         if (index !== -1) {
//           if (updatedOutfit.favorite) {
//             this.outfitsFavoritos[index] = updatedOutfit
//           } else {
//             // Remover de favoritos
//             this.outfitsFavoritos.splice(index, 1)
//             this.updateMaxIndexOutfits()
//             // Ajustar índice si es necesario
//             if (this.currentIndexOutfits > this.maxIndexOutfits) {
//               this.currentIndexOutfits = this.maxIndexOutfits
//             }
//           }
//         }
//       },
//       error: (error) => console.log("Error al cambiar favorito:", error),
//     })
//   }
//
//   onEditarPrenda(prenda: Prenda) {
//     console.log("Editar prenda:", prenda)
//     // Implementar lógica de edición
//   }
//
//   onEliminarPrenda(prenda: Prenda) {
//     console.log("Eliminar prenda:", prenda)
//     const index = this.prendasFavoritas.findIndex((p) => p.id === prenda.id)
//     if (index !== -1) {
//       this.prendasFavoritas.splice(index, 1)
//       this.updateMaxIndexPrendas()
//       // Ajustar índice si es necesario
//       if (this.currentIndexPrendas > this.maxIndexPrendas) {
//         this.currentIndexPrendas = this.maxIndexPrendas
//       }
//     }
//     // Aquí llamarías a tu servicio para eliminar
//   }
//
//   onEditarOutfit(outfit: Outfit) {
//     console.log("Editar outfit:", outfit)
//     // Implementar lógica de edición
//   }
//
//   onEliminarOutfit(outfit: Outfit) {
//     console.log("Eliminar outfit:", outfit)
//     const index = this.outfitsFavoritos.findIndex((o) => o.id === outfit.id)
//     if (index !== -1) {
//       this.outfitsFavoritos.splice(index, 1)
//       this.updateMaxIndexOutfits()
//       // Ajustar índice si es necesario
//       if (this.currentIndexOutfits > this.maxIndexOutfits) {
//         this.currentIndexOutfits = this.maxIndexOutfits
//       }
//     }
//     // Aquí llamarías a tu servicio para eliminar
//   }
// }


import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatTabsModule } from "@angular/material/tabs"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatChipsModule } from "@angular/material/chips"
import { PrendaService } from "../../core/services/prenda.service"
import { OutfitService } from "../../core/services/outfit.service"
import type { Prenda } from "../../core/models/prenda.model"
import type { Outfit } from "../../core/models/outfit.model"

@Component({
  selector: "app-favoritos",
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: "./favorito.component.html",
  styleUrls: ["./favorito.component.css"],
})
export class FavoritoComponent implements OnInit {
  prendasFavoritas: Prenda[] = []
  outfitsFavoritos: Outfit[] = []
  selectedTabIndex = 0

  // Propiedades del carrusel para prendas
  currentIndexPrendas = 0
  itemsPerViewPrendas = 3
  maxIndexPrendas = 0

  // Propiedades del carrusel para outfits
  currentIndexOutfits = 0
  itemsPerViewOutfits = 3
  maxIndexOutfits = 0

  // NUEVO: Array para manejar los slides de cada outfit individual
  outfitSlides: number[] = []

  Math = Math

  constructor(
    private prendaService: PrendaService,
    private outfitService: OutfitService,
  ) {}

  ngOnInit() {
    this.getClothesFavorites()
    this.getOutfitFavorites()
    this.updateItemsPerView()
  }

  getClothesFavorites() {
    this.prendaService.getClothes().subscribe({
      next: (data) => {
        this.prendasFavoritas = data.filter((prenda) => prenda.favorite)
        this.updateMaxIndexPrendas()
      },
      error: (error) => console.log(error),
    })
  }

  getOutfitFavorites() {
    this.outfitService.getOutfitsByUser().subscribe({
      next: (data) => {
        this.outfitsFavoritos = data.filter((outfit) => outfit.favorite)
        this.updateMaxIndexOutfits()
        // NUEVO: Inicializar slides de outfits
        this.initializeOutfitSlides()
      },
      error: (error) => console.log(error),
    })
  }

  // NUEVO: Inicializar los slides de cada outfit
  initializeOutfitSlides(): void {
    this.outfitSlides = new Array(this.outfitsFavoritos.length).fill(0)
  }

  // NUEVO: Obtener el slide actual para un outfit específico
  getCurrentSlide(outfitIndex: number): number {
    return this.outfitSlides[outfitIndex] || 0
  }

  // NUEVO: Ir al slide anterior de un outfit específico
  prevSlideOutfit(outfitIndex: number): void {
    const outfit = this.outfitsFavoritos[outfitIndex]
    if (!outfit || !outfit.outfit || outfit.outfit.length <= 1) return

    const currentSlide = this.getCurrentSlide(outfitIndex)
    this.outfitSlides[outfitIndex] = currentSlide > 0 ? currentSlide - 1 : outfit.outfit.length - 1
  }

  // NUEVO: Ir al siguiente slide de un outfit específico
  nextSlideOutfit(outfitIndex: number): void {
    const outfit = this.outfitsFavoritos[outfitIndex]
    if (!outfit || !outfit.outfit || outfit.outfit.length <= 1) return

    const currentSlide = this.getCurrentSlide(outfitIndex)
    this.outfitSlides[outfitIndex] = currentSlide < outfit.outfit.length - 1 ? currentSlide + 1 : 0
  }

  // NUEVO: Ir a un slide específico de un outfit
  goToSlideOutfit(outfitIndex: number, slideIndex: number): void {
    const outfit = this.outfitsFavoritos[outfitIndex]
    if (!outfit || !outfit.outfit) return

    if (slideIndex >= 0 && slideIndex < outfit.outfit.length) {
      this.outfitSlides[outfitIndex] = slideIndex
    }
  }

  // Métodos del carrusel para prendas (sin cambios)
  updateMaxIndexPrendas() {
    this.maxIndexPrendas = Math.max(0, this.prendasFavoritas.length - this.itemsPerViewPrendas)
  }

  nextSlidePrendas() {
    if (this.currentIndexPrendas < this.maxIndexPrendas) {
      this.currentIndexPrendas++
    }
  }

  prevSlidePrendas() {
    if (this.currentIndexPrendas > 0) {
      this.currentIndexPrendas--
    }
  }

  goToSlidePrendas(index: number) {
    this.currentIndexPrendas = Math.max(0, Math.min(index, this.maxIndexPrendas))
  }

  get canGoPrevPrendas() {
    return this.currentIndexPrendas > 0
  }

  get canGoNextPrendas() {
    return this.currentIndexPrendas < this.maxIndexPrendas
  }

  get totalSlidesPrendas() {
    return Math.ceil(this.prendasFavoritas.length / this.itemsPerViewPrendas)
  }

  get currentSlidePrendas() {
    return Math.floor(this.currentIndexPrendas / this.itemsPerViewPrendas) + 1
  }

  // Métodos del carrusel para outfits (sin cambios)
  updateMaxIndexOutfits() {
    this.maxIndexOutfits = Math.max(0, this.outfitsFavoritos.length - this.itemsPerViewOutfits)
  }

  nextSlideOutfits() {
    if (this.currentIndexOutfits < this.maxIndexOutfits) {
      this.currentIndexOutfits++
    }
  }

  prevSlideOutfits() {
    if (this.currentIndexOutfits > 0) {
      this.currentIndexOutfits--
    }
  }

  goToSlideOutfits(index: number) {
    this.currentIndexOutfits = Math.max(0, Math.min(index, this.maxIndexOutfits))
  }

  get canGoPrevOutfits() {
    return this.currentIndexOutfits > 0
  }

  get canGoNextOutfits() {
    return this.currentIndexOutfits < this.maxIndexOutfits
  }

  get totalSlidesOutfits() {
    return Math.ceil(this.outfitsFavoritos.length / this.itemsPerViewOutfits)
  }

  get currentSlideOutfits() {
    return Math.floor(this.currentIndexOutfits / this.itemsPerViewOutfits) + 1
  }

  // Método responsive compartido
  updateItemsPerView() {
    const width = window.innerWidth
    if (width < 768) {
      this.itemsPerViewPrendas = 1
      this.itemsPerViewOutfits = 1
    } else if (width < 1024) {
      this.itemsPerViewPrendas = 2
      this.itemsPerViewOutfits = 2
    } else {
      this.itemsPerViewPrendas = 3
      this.itemsPerViewOutfits = 3
    }
    this.updateMaxIndexPrendas()
    this.updateMaxIndexOutfits()
  }

  onResize() {
    this.updateItemsPerView()
  }

  trackByPrenda(index: number, prenda: Prenda): string {
    return prenda.id
  }

  trackByOutfit(index: number, outfit: Outfit): string {
    return outfit.id
  }

  // Tus métodos originales
  onTabChange(event: any) {
    this.selectedTabIndex = event.index
    // Resetear índices del carrusel al cambiar de tab
    this.currentIndexPrendas = 0
    this.currentIndexOutfits = 0
  }

  onToggleFavoritoPrenda(prenda: Prenda) {
    this.prendaService.changeFavorite(prenda.id).subscribe({
      next: (updatedPrenda) => {
        // Actualizar la prenda en el array
        const index = this.prendasFavoritas.findIndex((p) => p.id === prenda.id)
        if (index !== -1) {
          if (updatedPrenda.favorite) {
            this.prendasFavoritas[index] = updatedPrenda
          } else {
            // Remover de favoritos
            this.prendasFavoritas.splice(index, 1)
            this.updateMaxIndexPrendas()
            // Ajustar índice si es necesario
            if (this.currentIndexPrendas > this.maxIndexPrendas) {
              this.currentIndexPrendas = this.maxIndexPrendas
            }
          }
        }
      },
      error: (error) => console.log("Error al cambiar favorito:", error),
    })
  }

  onToggleFavoritoOutfit(outfit: Outfit) {
    this.outfitService.changeFavoriteOutfit(outfit.id).subscribe({
      next: (updatedOutfit) => {
        const index = this.outfitsFavoritos.findIndex((o) => o.id === outfit.id)
        if (index !== -1) {
          if (updatedOutfit.favorite) {
            this.outfitsFavoritos[index] = updatedOutfit
          } else {
            // Remover de favoritos
            this.outfitsFavoritos.splice(index, 1)
            this.updateMaxIndexOutfits()
            // NUEVO: Actualizar slides cuando se elimina un outfit
            this.initializeOutfitSlides()
            // Ajustar índice si es necesario
            if (this.currentIndexOutfits > this.maxIndexOutfits) {
              this.currentIndexOutfits = this.maxIndexOutfits
            }
          }
        }
      },
      error: (error) => console.log("Error al cambiar favorito:", error),
    })
  }

  onEditarPrenda(prenda: Prenda) {
    console.log("Editar prenda:", prenda)
    // Implementar lógica de edición
  }

  delete(id: string) {
    this.prendaService.deleteClothes(id).subscribe({
      next: data => {
        if (data) {
          this.getClothesFavorites()
        }
      },
      error: error => console.log(error),
    })
  }

  onEditarOutfit(outfit: Outfit) {
    console.log("Editar outfit:", outfit)
    // Implementar lógica de edición
  }

  onEliminarOutfit(outfit: Outfit) {
    console.log("Eliminar outfit:", outfit)
    const index = this.outfitsFavoritos.findIndex((o) => o.id === outfit.id)
    if (index !== -1) {
      this.outfitsFavoritos.splice(index, 1)
      this.updateMaxIndexOutfits()
      // NUEVO: Actualizar slides cuando se elimina un outfit
      this.initializeOutfitSlides()
      // Ajustar índice si es necesario
      if (this.currentIndexOutfits > this.maxIndexOutfits) {
        this.currentIndexOutfits = this.maxIndexOutfits
      }
    }
    // Aquí llamarías a tu servicio para eliminar
  }
}
