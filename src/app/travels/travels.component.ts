import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Trajet } from '../models/Trajet.type';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent {
  http: HttpClient = inject(HttpClient);
  snackBar: MatSnackBar = inject(MatSnackBar);
  authentification: AuthentificationService = inject(AuthentificationService);

  listeTrajet: Trajet[] = [];

  ngOnInit() {
    this.refresh();

  }

  refresh() {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      this.http
        .get<Trajet[]>(
          'http://localhost/backend-angular-projet-carpool/list-travel.php',
          { headers: { Authorization: jwt } }
        )
        .subscribe((resultat) => (this.listeTrajet = resultat));
    }
  }

  onSuppressionTrajet(idTrajet: number) {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      this.http
        .delete(
          'http://localhost/backend-angular-projet-carpool/delete-travel.php?id=' +
            idTrajet,
          { headers: { Authorization: jwt } }
        )
        .subscribe({
          next: (resultat) => {
            this.refresh();
            this.snackBar.open("Le trajet a bien été supprimé", undefined, {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'valid',
            });
          },
          error: (resultat) =>
            this.snackBar.open(
              'Erreur inconnue, contactez votre administrateur',
              undefined,
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'error',
              }
            ),
        });
    }
  }
}
