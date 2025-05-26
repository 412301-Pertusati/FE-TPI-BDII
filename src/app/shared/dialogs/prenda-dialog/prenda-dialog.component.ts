import { Component, inject, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatButtonModule } from "@angular/material/button"
import { NgIf, NgFor } from "@angular/common"
import type { Prenda } from "../../../core/models/prenda.model"
import {
  CATEGORIAS_DISPONIBLES,
  COLORES_DISPONIBLES,
  TEMPORADAS_DISPONIBLES,
  OCASIONES_DISPONIBLES,
} from "../../../core/constants/app.constants"

@Component({
  selector: "app-prenda-dialog",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: "./prenda-dialog.component.html",
  styleUrls: ["./prenda-dialog.component.css"],
})
export class PrendaDialogComponent implements OnInit {
  private fb = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<PrendaDialogComponent>)
  public data = inject<Prenda | null>(MAT_DIALOG_DATA)

  prendaForm: FormGroup
  isEditing: boolean

  categorias = CATEGORIAS_DISPONIBLES.filter((c) => c !== "Todas")
  colores = COLORES_DISPONIBLES
  temporadas = TEMPORADAS_DISPONIBLES
  ocasiones = OCASIONES_DISPONIBLES

  constructor() {
    this.isEditing = !!this.data
    this.prendaForm = this.createForm()
  }

  ngOnInit(): void {
    if (this.data) {
      this.prendaForm.patchValue(this.data)
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      color: ["", [Validators.required]],
      temporada: [[], [Validators.required]],
      ocasiones: [[], [Validators.required]],
      marca: [""],
      precio: [""],
      fechaCompra: [""],
      notas: [""],
      favorito: [false],
      imagen: ["/assets/images/default-clothing.png"],
    })
  }

  onSubmit(): void {
    if (this.prendaForm.valid) {
      const formValue = this.prendaForm.value
      this.dialogRef.close(formValue)
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
