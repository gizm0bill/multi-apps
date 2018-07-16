import { Component, Input, OnChanges, DoCheck } from '@angular/core';

@Component
({
  selector: '.package-presentation',
  template: `
    <mat-card>
      <img mat-card-image *ngIf="image" [src]="image" />
      <mat-card-header>
        <mat-card-title *ngIf="title">{{title}}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">{{subtitle}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ng-content select="description"></ng-content>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button [routerLink]="link">VISIT</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class PackagePresentationCom
{
  @Input() image: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() link: string;
}
