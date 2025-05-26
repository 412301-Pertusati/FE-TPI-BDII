import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import {ConfiguracionUsuario} from '../../core/models/configuracion.model';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  cuentaForm: FormGroup;
  configuracion: ConfiguracionUsuario = {
    id: '1',
    nombre: 'Ana García',
    email: 'ana.garcia@ejemplo.com',
    preferenciasEstilo: [],
    coloresFavoritos: [],
    marcasFavoritas: [],
    presupuesto: { minimo: 0, maximo: 0 },
    notificaciones: { recordatorios: false, sugerencias: false, ofertas: false },
    privacidad: { perfilPublico: false, compartirOutfits: false }
  };

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.cuentaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contrasenaActual: [''],
      nuevaContrasena: [''],
      confirmarContrasena: ['']
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    // Cargar datos del usuario desde el servicio
    this.cuentaForm.patchValue({
      nombre: this.configuracion.nombre,
      email: this.configuracion.email
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const nuevaContrasena = form.get('nuevaContrasena');
    const confirmarContrasena = form.get('confirmarContrasena');

    if (nuevaContrasena && confirmarContrasena) {
      if (nuevaContrasena.value !== confirmarContrasena.value) {
        confirmarContrasena.setErrors({ passwordMismatch: true });
      } else {
        confirmarContrasena.setErrors(null);
      }
    }
    return null;
  }

  onGuardar(): void {
    if (this.cuentaForm.valid) {
      const formData = this.cuentaForm.value;

      // Validar que si se quiere cambiar contraseña, se proporcione la actual
      if (formData.nuevaContrasena && !formData.contrasenaActual) {
        this.snackBar.open('Debes proporcionar tu contraseña actual para cambiarla', 'Cerrar', {
          duration: 3000
        });
        return;
      }

      // Actualizar configuración
      this.configuracion.nombre = formData.nombre;
      this.configuracion.email = formData.email;

      // Aquí llamarías a tu servicio para guardar los cambios
      console.log('Guardando configuración:', this.configuracion);

      this.snackBar.open('Configuración guardada exitosamente', 'Cerrar', {
        duration: 3000
      });

      // Limpiar campos de contraseña después de guardar
      this.cuentaForm.patchValue({
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmarContrasena: ''
      });
    } else {
      this.snackBar.open('Por favor, corrige los errores en el formulario', 'Cerrar', {
        duration: 3000
      });
    }
  }

  onCancelar(): void {
    // Restaurar valores originales
    this.loadUserData();
    this.cuentaForm.patchValue({
      contrasenaActual: '',
      nuevaContrasena: '',
      confirmarContrasena: ''
    });

    this.snackBar.open('Cambios cancelados', 'Cerrar', {
      duration: 2000
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.cuentaForm.get(fieldName);

    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (field?.hasError('email')) {
      return 'Ingresa un email válido';
    }

    if (field?.hasError('minlength')) {
      return 'El nombre debe tener al menos 2 caracteres';
    }

    if (field?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }
}
