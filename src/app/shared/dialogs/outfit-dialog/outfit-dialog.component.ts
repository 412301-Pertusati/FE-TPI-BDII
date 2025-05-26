import { Component, inject, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatButtonModule } from "@angular/material/button"
import { NgIf, NgFor } from "@angular/common"
import type { Outfit } from "../../../core/models/outfit.model"
import { TEMPORADAS_DISPONIBLES, OCASIONES_DISPONIBLES } from "../../../core/constants/app.constants"
import { PrendaService } from "../../../core/services/prenda.service"

@Component({
  selector: "app-outfit-dialog",
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
  templateUrl: "./outfit-dialog.component.html",
  styleUrls: ["./outfit-dialog.component.css"],
})
export class OutfitDialogComponent implements OnInit {
  private fb = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<OutfitDialogComponent>)
  private prendaService = inject(PrendaService)
  public data = inject<Outfit | null>(MAT_DIALOG_DATA)

  outfitForm: FormGroup
  isEditing: boolean

  temporadas = TEMPORADAS_DISPONIBLES
  ocasiones = OCASIONES_DISPONIBLES
  prendas = this.prendaService.prendas

  constructor() {
    this.isEditing = !!this.data
    this.outfitForm = this.createForm()
  }

  ngOnInit(): void {
    if (this.data) {
      this.outfitForm.patchValue(this.data)
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ["", [Validators.required]],
      ocasion: ["", [Validators.required]],
      temporada: [[], [Validators.required]],
      prendas: [[], [Validators.required]],
      notas: [""],
      favorito: [false],
      imagen: ["/assets/images/default-outfit.png"],
    })
  }

  onSubmit(): void {
    if (this.outfitForm.valid) {
      const formValue = this.outfitForm.value
      this.dialogRef.close(formValue)
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
