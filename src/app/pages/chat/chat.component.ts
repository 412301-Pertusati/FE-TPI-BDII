import { Component, inject, signal, effect, ViewChild, type ElementRef, type AfterViewChecked } from "@angular/core"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { NgIf, NgFor } from "@angular/common"
import { ChatService } from "../../core/services/chat.service"
import { ChatBubbleComponent } from "../../shared/components/chat-bubble/chat-bubble.component"

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ChatBubbleComponent,
  ],
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild("messagesContainer") messagesContainer!: ElementRef

  private chatService = inject(ChatService)

  messageControl = new FormControl("")
  conversaciones = this.chatService.conversaciones
  conversacionActual = this.chatService.conversacionActual

  private shouldScrollToBottom = signal(false)

  constructor() {
    effect(() => {
      if (this.conversacionActual()) {
        this.shouldScrollToBottom.set(true)
      }
    })
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom()) {
      this.scrollToBottom()
      this.shouldScrollToBottom.set(false)
    }
  }

  enviarMensaje(): void {
    const mensaje = this.messageControl.value?.trim()
    if (mensaje) {
      this.chatService.enviarMensaje(mensaje)
      this.messageControl.setValue("")
      this.shouldScrollToBottom.set(true)
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      this.enviarMensaje()
    }
  }

  iniciarNuevaConversacion(): void {
    this.chatService.iniciarNuevaConversacion()
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
      }
    } catch (err) {
      console.error("Error scrolling to bottom:", err)
    }
  }
}
