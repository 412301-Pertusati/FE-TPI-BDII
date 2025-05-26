import { Component, Input, Output, EventEmitter } from "@angular/core"
import { NgIf, NgFor } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import {Outfit} from '../../../core/models/outfit.model';


@Component({
  selector: "app-outfit-card",
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: "./outfit-card.component.html",
  styleUrls: ["./outfit-card.component.css"],
})
export class OutfitCardComponent {
  @Input() outfit!: Outfit

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
