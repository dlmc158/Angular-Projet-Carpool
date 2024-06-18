import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Trajet } from '../models/Trajet.type';

@Component({
  selector: 'app-edit-travel',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
  ],
  templateUrl: './edit-travel.component.html',
  styleUrl: './edit-travel.component.scss',
})
export class EditTravelComponent {
  listeSeats: number[] = [1, 2, 3, 4];

  formBuilder: FormBuilder = inject(FormBuilder);

  formulaire: FormGroup = this.formBuilder.group({
    destination: ['', [Validators.required]],
    seats: [1, [Validators.required]],
  });

  http: HttpClient = inject(HttpClient);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  idTrajet?: number;

  ngOnInit() {
    this.route.params.subscribe((parametresUrl) => {
      //si il y a bien un parametre dans l'url et que c'est un nombre
      if (parametresUrl['id'] && !isNaN(parametresUrl['id'])) {
        //on crée un nouveau FormGroup
        this.formulaire = this.formBuilder.group({
          destination: ['', [Validators.required]],
          seats: [1, [Validators.required]],
        });

        const jwt = localStorage.getItem('jwt');

        if (jwt != null) {
          this.http
            .get<Trajet>(
              'http://localhost/backend-angular-projet-carpool/get-travel.php?id=' +
                parametresUrl['id'],
              { headers: { Authorization: jwt } }
            )
            .subscribe({
              next: (travel: Trajet) => {
                this.formulaire.patchValue(travel);
                this.idTrajet = travel.id;
              },
              error: () =>
                alert('Erreur inconnue contactez votre administrateur'),
            });
        }
      } else {
        this.formulaire = this.formBuilder.group({
          destination: ['', [Validators.required]],
          seats: [1, [Validators.required]],
        });
      }
    });
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const url: string =
        this.idTrajet == null
          ? 'http://localhost/backend-angular-projet-carpool/add-travel.php'
          : 'http://localhost/backend-angular-projet-carpool/edit-travel.php?id=' +
            this.idTrajet;

      const jwt = localStorage.getItem('jwt');

      if (jwt != null) {
        this.http
          .post(url, this.formulaire.value, { headers: { Authorization: jwt } })
          .subscribe({
            next: (resultat) => {
              this.snackBar.open("Le trajet a bien été ajouté", undefined, {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'valid',
              });

              this.router.navigateByUrl('/travels');
            },
            error: (resultat) =>
              alert('Erreur inconnue contactez votre administrateur'),
          });
      }
    }
  }
}
