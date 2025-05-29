import type { Routes } from "@angular/router"
import { LayoutComponent } from "./layout/layout.component"
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    //canActivateChild: [AuthGuard],
    children: [
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
  //{ path: 'landing', loadComponent: () => import("./pages/landing/landing.component").then((m) => m.LandingComponent),},
  { path: "login", loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent), },
  { path: "register", loadComponent: () => import("./pages/register/register.component").then((m) => m.RegisterComponent),},
  { path: "**", redirectTo: "" },
]
