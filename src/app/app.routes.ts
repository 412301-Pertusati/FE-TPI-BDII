import type { Routes } from "@angular/router"
import { LayoutComponent } from "./layout/layout.component"

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () => import("./pages/chat/chat.component").then((m) => m.ChatComponent),
      },
      {
        path: "armario",
        loadComponent: () => import("./pages/armario/armario.component").then((m) => m.ArmarioComponent),
      },
      {
        path: "outfits",
        loadComponent: () => import("./pages/outfits/outfits.component").then((m) => m.OutfitsComponent),
      },
      {
        path: "favoritos",
        loadComponent: () => import("./pages/favorito/favorito.component").then((m) => m.FavoritoComponent),
      },
      {
        path: "estilo",
        loadComponent: () => import("./pages/estilo/estilo.component").then((m) => m.EstiloComponent),
      },
      {
        path: "configuracion",
        loadComponent: () =>
          import("./pages/configuracion/configuracion.component").then((m) => m.ConfiguracionComponent),
      },
    ],
  },
  { path: "**", redirectTo: "" },
]
