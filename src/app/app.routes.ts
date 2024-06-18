import { Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EditTravelComponent } from './edit-travel/edit-travel.component';
import { TravelsComponent } from './travels/travels.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-user', component: EditUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: 'add-travel', component: EditTravelComponent },
  { path: 'edit-travel/:id', component: EditTravelComponent },
  { path: 'travels', component: TravelsComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
