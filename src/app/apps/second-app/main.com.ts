import { Component } from '@angular/core';

@Component({
  selector: 'second-app-main',
  template: `
  <mat-chip-list>
    <mat-chip>One fish</mat-chip>
    <mat-chip>Two fish</mat-chip>
    <mat-chip color="primary" selected="true">Primary fish</mat-chip>
    <mat-chip color="accent" selected="true">Accent fish</mat-chip>
    <mat-chip color="warn" selected="true" routerLink="./sub">Warning fish</mat-chip>
  </mat-chip-list>
  `
})

export class MainCom {}
