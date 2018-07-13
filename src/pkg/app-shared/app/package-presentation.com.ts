import { Component } from '@angular/core';

@Component
({
  selector: 'package-presentation',
  template: `
  <mat-card>
    <mat-card-header>
      <div mat-card-avatar></div>
      <mat-card-title>…</mat-card-title>
      <mat-card-subtitle>…</mat-card-subtitle>
    </mat-card-header>
    <img mat-card-image />
    <mat-card-content>
      <ng-content select="description"></ng-content>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class PackagePresentationCom {}
