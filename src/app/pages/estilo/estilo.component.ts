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
  ) {
  }

  datos?: miEstilo;

  ngOnInit(): void {
    this.loadUserConfiguration();
  }


  loadUserConfiguration(): void {
    // Aquí cargarías la configuración desde tu servicio
    this.miEstiloService.getStatsByToken().subscribe(data => {
      this.datos = data;
    });
  }

}
