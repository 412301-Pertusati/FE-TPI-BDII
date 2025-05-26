import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import {ConfiguracionUsuario} from '../../core/models/configuracion.model';

interface EstadisticaPrenda {
  categoria: string;
  cantidad: number;
  porcentaje: number;
}

@Component({
  selector: 'app-estilo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  templateUrl: './estilo.component.html',
  styleUrls: ['./estilo.component.css']
})
export class EstiloComponent implements OnInit {
  configuracion: ConfiguracionUsuario = {
    id: '1',
    nombre: 'Usuario',
    email: 'usuario@email.com',
    preferenciasEstilo: ['Casual', 'Elegante', 'Minimalista'],
    coloresFavoritos: ['Beige', 'Blanco', 'Negro', 'Azul'],
    marcasFavoritas: ['Zara', 'H&M'],
    presupuesto: {
      minimo: 50,
      maximo: 200
    },
    notificaciones: {
      recordatorios: true,
      sugerencias: true,
      ofertas: false
    },
    privacidad: {
      perfilPublico: true,
      compartirOutfits: true
    }
  };

  estiloPersonal = 'Casual elegante con toques minimalistas';
  estampadosPreferidos = ['Liso', 'Rayas sutiles'];
  prendasFavoritas = ['Camisas', 'Jeans', 'Vestidos midi'];
  ocasionesFrecuentes = ['Trabajo', 'Casual', 'Cenas informales'];

  estadisticasPrendas: EstadisticaPrenda[] = [
    { categoria: 'Camisas', cantidad: 1, porcentaje: 12.5 },
    { categoria: 'Pantalones', cantidad: 1, porcentaje: 12.5 },
    { categoria: 'Suéteres', cantidad: 1, porcentaje: 12.5 },
    { categoria: 'Vestidos', cantidad: 1, porcentaje: 12.5 },
    { categoria: 'Chaquetas', cantidad: 1, porcentaje: 12.5 },
    { categoria: 'Faldas', cantidad: 1, porcentaje: 12.5 },
    { categoria: 'Blusas', cantidad: 1, porcentaje: 12.5 },
    { categoria: 'Calzado', cantidad: 1, porcentaje: 12.5 }
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUserConfiguration();
  }

  loadUserConfiguration(): void {
    // Aquí cargarías la configuración desde tu servicio
    console.log('Cargando configuración del usuario...');
  }

  onEditarPerfil(): void {
    console.log('Abrir modal de edición de perfil');
    // Aquí abrirías un modal o navegarías a la página de edición
    // this.dialog.open(EditarPerfilComponent, {
    //   data: this.configuracion,
    //   width: '600px'
    // });
  }

  getColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      'Beige': 'color-beige',
      'Blanco': 'color-blanco',
      'Negro': 'color-negro',
      'Azul': 'color-azul'
    };
    return colorMap[color] || 'color-default';
  }
}
