import { Component, Input } from "@angular/core"
import { NgClass } from "@angular/common"
import {Mensaje} from '../../../core/models/mensaje.model';

@Component({
  selector: "app-chat-bubble",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./chat-bubble.component.html",
  styleUrls: ["./chat-bubble.component.css"],
})
export class ChatBubbleComponent {
  @Input() mensaje!: Mensaje

  formatTime(timestamp: string): string {
    return new Date(timestamp).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}
