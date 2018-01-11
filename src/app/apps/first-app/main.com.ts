import { Component } from '@angular/core';
import { SomeSrv } from '../../core';
import { Element } from '../../core/some.srv'
import { MatTableDataSource } from '@angular/material';

@Component
({
  styles: ['.example { margin: 12px } '],
  selector: 'first-app-main',
  template: `
  <div class="example mat-elevation-z8">
    <mat-table #table [dataSource]="dataSource">

      <!-- Position Column -->
      <ng-container matColumnDef="position">
        <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.position}} </mat-cell>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.name}} </mat-cell>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="weight">
        <mat-header-cell *matHeaderCellDef> Weight </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.weight}} </mat-cell>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="symbol">
        <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.symbol}} </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>
  </div>`
})

export class MainCom
{
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Element>;
  constructor(private someSrv: SomeSrv)
  {
    this.someSrv.getSomeData().subscribe( elems => this.dataSource = new MatTableDataSource(elems) );
  }
}
