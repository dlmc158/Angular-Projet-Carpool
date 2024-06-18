import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  authentification = inject(AuthentificationService);
  snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.authentification.connexion();
  }

  onDeconnexion() {
    this.authentification.deconnexion();
    this.snackBar.open("Vous êtes déconnecté", undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'valid',
    });
  }
}
