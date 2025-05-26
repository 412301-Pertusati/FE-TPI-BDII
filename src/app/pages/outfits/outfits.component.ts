import { Component, inject, computed } from "@angular/core"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import { NgIf, NgFor } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatDialog } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { OutfitService } from "../../core/services/outfit.service"
import { OCASIONES_DISPONIBLES } from "../../core/constants/app.constants"
import { OutfitCardComponent } from "../../shared/components/outfit-card/outfit-card.component"
import { OutfitDialogComponent } from "../../shared/dialogs/outfit-dialog/outfit-dialog.component"
import { ConfirmDialogComponent } from "../../shared/dialogs/confirm-dialog/confirm-dialog.component"
import type { Outfit } from "../../core/models/outfit.model"

@Component({
  selector: "app-outfits",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    OutfitCardComponent,
  ],
  templateUrl: "./outfits.component.html",
  styleUrls: ["./outfits.component.css"],
})
export class OutfitsComponent {
  private outfitService = inject(OutfitService)
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)

  outfits = this.outfitService.outfits
  searchControl = new FormControl("")
  ocasionControl = new FormControl("Todas")
  ocasiones = ["Todas", ...OCASIONES_DISPONIBLES]

  outfitsFiltrados = computed(() => {
    let filtrados = [...this.outfits()]

    const ocasion = this.ocasionControl.value
    if (ocasion && ocasion !== "Todas") {
      filtrados = filtrados.filter((o) => o.ocasion === ocasion)
    }

    const busqueda = this.searchControl.value?.toLowerCase() || ""
    if (busqueda) {
      filtrados = filtrados.filter(
        (o) => o.nombre.toLowerCase().includes(busqueda) || o.ocasion.toLowerCase().includes(busqueda),
      )
    }

    return filtrados
  })

  abrirDialogoOutfit(outfit?: Outfit): void {
    const dialogRef = this.dialog.open(OutfitDialogComponent, {
      width: "600px",
      data: outfit ? { ...outfit } : null,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (outfit) {
          this.outfitService.actualizarOutfit(outfit.id, result)
          this.snackBar.open("Outfit actualizado", "Cerrar", { duration: 3000 })
        } else {
          this.outfitService.agregarOutfit(result)
          this.snackBar.open("Outfit creado", "Cerrar", { duration: 3000 })
        }
      }
    })
  }

  eliminarOutfit(outfit: Outfit): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmar eliminación",
        message: `¿Estás seguro de que quieres eliminar el outfit "${outfit.nombre}"?`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
      },
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.outfitService.eliminarOutfit(outfit.id)
        this.snackBar.open("Outfit eliminado", "Cerrar", { duration: 3000 })
      }
    })
  }

  toggleFavorito(outfit: Outfit): void {
    this.outfitService.toggleFavorito(outfit.id)
  }
}
