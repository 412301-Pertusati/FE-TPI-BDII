import { Component, inject, computed } from "@angular/core"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import {NgIf, NgFor, NgClass} from "@angular/common"
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
    NgClass,
  ],
  templateUrl: "./armario.component.html",
  styleUrls: ["./armario.component.css"],
})
export class ArmarioComponent {

  public clothes: Prenda[] = [];

  constructor(private prendaService: PrendaService) {}

  ngOnInit() {
    this.getClothesGeneral();
  }

  getClothesGeneral() {
    this.prendaService.getClothes().subscribe({
      next: data => {
        this.clothes = data
      },
      error: error => console.log(error),
    })
  }

  changeFavorite(id: string) {
    this.prendaService.changeFavorite(id).subscribe({
      next: data => {
        this.getClothesGeneral();
      },
      error: error => console.log(error),
    })
  }


}
