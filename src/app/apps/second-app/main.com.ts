import { Component } from '@angular/core';

@Component({
  selector: 'second-app-main',
  template: `
  <mat-chip-list>
    <mat-chip i18n>One fish</mat-chip>
    <mat-chip i18n>Two fish</mat-chip>
    <mat-chip color="primary" selected="true" i18n>Primary fish</mat-chip>
    <mat-chip color="accent" selected="true" i18n>Accent fish</mat-chip>
    <mat-chip color="warn" selected="true" routerLink="./sub" i18n>Warning fish</mat-chip>
  </mat-chip-list>
  `
})

export class MainCom {}
