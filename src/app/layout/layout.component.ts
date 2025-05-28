import { Component, inject } from "@angular/core"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatListModule } from "@angular/material/list"
import { MatIconModule } from "@angular/material/icon"
import {Router, RouterOutlet} from "@angular/router"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { map, shareReplay } from "rxjs/operators"
import { AsyncPipe } from "@angular/common"

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    SidebarComponent,
    AsyncPipe,
  ],
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver)

  constructor(private router: Router) {}

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  )

  ngOnInit() {
    this.router.navigateByUrl("/armario")
  }

}
