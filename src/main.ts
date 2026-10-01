import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produits',
  standalone: true,
  template: `
    <div class="container mt-4">
      <h2>Liste des Produits</h2>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr><th>#</th><th>Nom</th><th>Prix</th></tr>
        </thead>
        <tbody>
          @for (p of produits; track p.id) {
            <tr><td>{{ p.id }}</td><td>{{ p.nom }}</td><td>{{ p.prix }} DT</td></tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ProduitsComponent {
  produits = [
    { id: 1, nom: 'Ordinateur', prix: 1500 },
    { id: 2, nom: 'Téléphone', prix: 800 },
    { id: 3, nom: 'Clavier', prix: 50 },
  ];
}

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Ajouter un Produit</h2>
      <div class="mb-3">
        <label class="form-label">Nom :</label>
        <input class="form-control" [(ngModel)]="nom" />
      </div>
      <div class="mb-3">
        <label class="form-label">Prix :</label>
        <input class="form-control" type="number" [(ngModel)]="prix" />
      </div>
      <button class="btn btn-primary" (click)="ajouter()">Ajouter</button>
      @if (message) {
        <div class="alert alert-success mt-3">{{ message }}</div>
      }
    </div>
  `,
})
export class AddProduitComponent {
  nom = '';
  prix = 0;
  message = '';
  ajouter() {
    if (this.nom && this.prix > 0) {
      this.message = `Produit ajouté : ${this.nom} - ${this.prix} DT`;
      this.nom = '';
      this.prix = 0;
    } else {
      this.message = 'Veuillez remplir tous les champs.';
    }
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProduitsComponent, AddProduitComponent],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Atelier 01 Angular</a>
        <div class="navbar-nav">
          <a class="nav-link" href="#" (click)="$event.preventDefault(); page='produits'">Produits</a>
          <a class="nav-link" href="#" (click)="$event.preventDefault(); page='add'">Ajouter Produit</a>
        </div>
      </div>
    </nav>
    @if (page === 'produits') { <app-produits></app-produits> }
    @if (page === 'add') { <app-add-produit></app-add-produit> }
  `,
})
export class App {
  page: string = 'produits';
}

bootstrapApplication(App);
