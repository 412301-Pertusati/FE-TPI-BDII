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
import { PrendaService } from "../../core/services/prenda.service"
import { CATEGORIAS_DISPONIBLES } from "../../core/constants/app.constants"
import { PrendaCardComponent } from "../../shared/components/prenda-card/prenda-card.component"
import { PrendaDialogComponent } from "../../shared/dialogs/prenda-dialog/prenda-dialog.component"
import type { Prenda } from "../../core/models/prenda.model"

@Component({
  selector: "app-armario",
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
    PrendaCardComponent,
  ],
  templateUrl: "./armario.component.html",
  styleUrls: ["./armario.component.css"],
})
export class ArmarioComponent {
  private prendaService = inject(PrendaService)
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)

  prendas = this.prendaService.prendas
  searchControl = new FormControl("")
  categoriaControl = new FormControl("Todas")
  categorias = CATEGORIAS_DISPONIBLES

  prendasFiltradas = computed(() => {
    let filtradas = [...this.prendas()]

    const categoria = this.categoriaControl.value
    if (categoria && categoria !== "Todas") {
      filtradas = filtradas.filter((p) => p.categoria === categoria)
    }

    const busqueda = this.searchControl.value?.toLowerCase() || ""
    if (busqueda) {
      filtradas = filtradas.filter(
        (p) =>
          p.nombre.toLowerCase().includes(busqueda) ||
          p.categoria.toLowerCase().includes(busqueda) ||
          p.color.toLowerCase().includes(busqueda),
      )
    }

    return filtradas
  })

  abrirDialogoPrenda(prenda?: Prenda): void {
    const dialogRef = this.dialog.open(PrendaDialogComponent, {
      width: "600px",
      data: prenda ? { ...prenda } : null,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (prenda) {
          this.prendaService.actualizarPrenda(prenda.id, result)
          this.snackBar.open("Prenda actualizada", "Cerrar", { duration: 3000 })
        } else {
          this.prendaService.agregarPrenda(result)
          this.snackBar.open("Prenda añadida", "Cerrar", { duration: 3000 })
        }
      }
    })
  }

  eliminarPrenda(prenda: Prenda): void {
    this.prendaService.eliminarPrenda(prenda.id)
    this.snackBar.open("Prenda eliminada", "Cerrar", { duration: 3000 })
  }

  toggleFavorito(prenda: Prenda): void {
    this.prendaService.toggleFavorito(prenda.id)
  }
}
