import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar"
import { MatChipsModule } from "@angular/material/chips"
import  { OutfitService } from "../../core/services/outfit.service"
import type { Outfit } from "../../core/models/outfit.model"

@Component({
  selector: "app-outfit",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  templateUrl: "./outfits.component.html",
  styleUrls: ["./outfits.component.css"],
})
export class OutfitsComponent implements OnInit {
  outfits: Outfit[] = []
  newOutfitDescription = ""
  loading = false
  generatingOutfit = false
  error: string | null = null

  // Propiedades del carrusel
  currentIndex = 0
  itemsPerView = 3
  maxIndex = 0

  Math = Math

  constructor(
    private outfitService: OutfitService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadOutfits()
    this.updateItemsPerView()
  }

  loadOutfits() {
    this.loading = true
    this.error = null

    this.outfitService.getOutfitsByUser().subscribe({
      next: (outfits) => {
        outfits = outfits.reverse()
        this.outfits = outfits
        this.updateMaxIndex()
        this.loading = false
      },
      error: (err) => {
        this.error = "Error al cargar los outfits"
        this.loading = false
        this.showSnackBar("Error al cargar los outfits", "error")
        console.error(err)
      },
    })
  }

  generateOutfit() {
    if (!this.newOutfitDescription.trim()) {
      this.showSnackBar("Por favor, ingresa una descripción", "warning")
      return
    }

    this.generatingOutfit = true
    this.error = null

    this.outfitService.generateOutfit(this.newOutfitDescription.trim()).subscribe({
      next: (newOutfit) => {
        this.outfits.unshift(newOutfit) // Agregar al inicio
        this.newOutfitDescription = ""
        this.updateMaxIndex()
        this.currentIndex = 0 // Mostrar el nuevo outfit
        this.generatingOutfit = false
        this.showSnackBar("¡Outfit generado exitosamente!", "success")
      },
      error: (err) => {
        this.error = "Error al generar el outfit"
        this.generatingOutfit = false
        this.showSnackBar("Error al generar el outfit", "error")
        console.error(err)
      },
    })
  }

  // Métodos del carrusel
  updateMaxIndex() {
    this.maxIndex = Math.max(0, this.outfits.length - this.itemsPerView)
  }

  updateItemsPerView() {
    const width = window.innerWidth
    if (width < 768) {
      this.itemsPerView = 1
    } else if (width < 1024) {
      this.itemsPerView = 2
    } else {
      this.itemsPerView = 3
    }
    this.updateMaxIndex()
  }

  onResize() {
    this.updateItemsPerView()
  }

  nextSlide() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--
    }
  }

  goToSlide(index: number) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex))
  }

  get canGoPrev() {
    return this.currentIndex > 0
  }

  get canGoNext() {
    return this.currentIndex < this.maxIndex
  }

  get totalSlides() {
    return Math.ceil(this.outfits.length / this.itemsPerView)
  }

  get currentSlide() {
    return Math.floor(this.currentIndex / this.itemsPerView) + 1
  }

  trackByOutfit(index: number, outfit: Outfit): string {
    return outfit.id
  }

  // Métodos de acciones
  onToggleFavorite(outfit: Outfit) {
    this.outfitService.changeFavoriteOutfit(outfit.id).subscribe({
      next: (updatedOutfit) => {
        const index = this.outfits.findIndex((o) => o.id === outfit.id)
        if (index !== -1) {
          this.outfits[index] = updatedOutfit
        }
        const message = updatedOutfit.favorite ? "Agregado a favoritos" : "Removido de favoritos"
        this.showSnackBar(message, "success")
      },
      error: (err) => {
        this.showSnackBar("Error al cambiar favorito", "error")
        console.error(err)
      },
    })
  }

  onEditOutfit(outfit: Outfit) {
    console.log("Editar outfit:", outfit)
    // Implementar lógica de edición
    this.showSnackBar("Función de edición en desarrollo", "info")
  }

  onDeleteOutfit(outfit: Outfit) {
    // Aquí podrías mostrar un dialog de confirmación
    const index = this.outfits.findIndex((o) => o.id === outfit.id)
    if (index !== -1) {
      this.outfits.splice(index, 1)
      this.updateMaxIndex()
      // Ajustar índice si es necesario
      if (this.currentIndex > this.maxIndex) {
        this.currentIndex = this.maxIndex
      }
      this.showSnackBar("Outfit eliminado", "success")
    }
    // Aquí llamarías a tu servicio para eliminar del backend
  }

  onViewOutfitDetails(outfit: Outfit) {
    console.log("Ver detalles del outfit:", outfit)
    // Implementar navegación a vista de detalles
    this.showSnackBar("Vista de detalles en desarrollo", "info")
  }

  private showSnackBar(message: string, type: "success" | "error" | "warning" | "info") {
    const config = {
      duration: 3000,
      panelClass: [`snackbar-${type}`],
    }
    this.snackBar.open(message, "Cerrar", config)
  }

  // Método para obtener tipos únicos de prendas en un outfit
  getOutfitTypes(outfit: Outfit): string[] {
    const types = outfit.outfit.map((prenda) => prenda.tipo)
    return [...new Set(types)].slice(0, 3) // Máximo 3 tipos únicos
  }

  // Método para obtener colores únicos de prendas en un outfit
  getOutfitColors(outfit: Outfit): string[] {
    const colors = outfit.outfit.map((prenda) => prenda.color)
    return [...new Set(colors)].slice(0, 3) // Máximo 3 colores únicos
  }

  // Método para manejar el evento de teclado
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && event.ctrlKey) {
      this.generateOutfit()
    }
  }

  // Método para enfocar el textarea
  focusTextarea() {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (textarea) {
      textarea.focus()
    }
  }
}
