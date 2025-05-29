import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import {ConfiguracionUsuario} from '../../core/models/configuracion.model';
import {miEstilo} from '../../core/models/mi-estilo.model';
import {MiEstiloService} from '../../core/services/miEstilo.service';
import {ActivatedRoute} from '@angular/router';


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

  constructor(
    private miEstiloService: MiEstiloService
  ) { }

  datos?: miEstilo;

  ngOnInit(): void {
    this.getStats();
  }

  getStats(): void {
    const storedData = localStorage.getItem('miEstilo');

    if (storedData) {
      // Si hay datos en localStorage, los usamos directamente
      this.datos = JSON.parse(storedData);
    } else {
      // Si no hay datos, los obtenemos del servicio y los guardamos
      this.loadUserConfiguration();
    }
  }

  loadUserConfiguration(): void {
    this.miEstiloService.getStatsByToken().subscribe(data => {
      this.datos = data;
      localStorage.setItem('miEstilo', JSON.stringify(data)); // Guardamos en localStorage
    });
  }
}
