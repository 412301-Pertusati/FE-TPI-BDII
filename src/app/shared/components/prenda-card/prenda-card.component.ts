import { Component, Input, Output, EventEmitter } from "@angular/core"
import { NgIf, NgFor } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import {Prenda} from '../../../core/models/prenda.model';

@Component({
  selector: "app-prenda-card",
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: "./prenda-card.component.html",
  styleUrls: ["./prenda-card.component.css"],
})
export class PrendaCardComponent {
  @Input() prenda!: Prenda

  @Output() editar = new EventEmitter<void>()
  @Output() eliminar = new EventEmitter<void>()
  @Output() toggleFavorito = new EventEmitter<void>()

  onEditar(): void {
    this.editar.emit()
  }

  onEliminar(): void {
    this.eliminar.emit()
  }

  onToggleFavorito(): void {
    this.toggleFavorito.emit()
  }
}
