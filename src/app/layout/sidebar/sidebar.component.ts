import { Component, inject } from "@angular/core"
import { Router, NavigationEnd } from "@angular/router"
import { MatListModule } from "@angular/material/list"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { RouterModule } from "@angular/router"
import { filter } from "rxjs/operators"
import { NgFor, NgClass } from "@angular/common"

interface MenuItem {
  title: string
  icon: string
  path: string
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, RouterModule, NgFor, NgClass],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  private router = inject(Router)
  currentPath = ""

  menuItems: MenuItem[] = [
    { title: "Armario", icon: "checkroom", path: "/armario" },
    { title: "Outfits", icon: "style", path: "/outfits" },
    { title: "Favoritos", icon: "favorite", path: "/favoritos" },
    { title: "Mi estilo", icon: "palette", path: "/estilo" },
    { title: "Configuración", icon: "settings", path: "/configuracion" },
  ]

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentPath = event.url
    })
  }

  isActive(path: string): boolean {
    return this.currentPath === path
  }

  logOut() {
    localStorage.removeItem("token")
    this.router.navigateByUrl("/login")
  }
}
