import { Component } from '@angular/core';

@Component({
  selector: 'thrid-app-main',
  styles: [`
    .example-header-image {
      background-image: url('http://fortbragglibrary.org/wp-content/uploads/2017/08/Pirate-Parrot.jpg');
      background-size: cover;
    }
  `],
  template: `
  <mat-card style="width:448px" class="example-card">
    <mat-card-header>
      <div mat-card-avatar class="example-header-image"></div>
      <mat-card-title>Shiver me timbers</mat-card-title>
      <mat-card-subtitle>Gangplank crack Jennys tea cup </mat-card-subtitle>
    </mat-card-header>
    <img mat-card-image
      src="https://i.pinimg.com/736x/a1/f0/ef/a1f0ef5bb7028d50c3d2f00d356ca752--ship-paintings-pirate-ships.jpg"
      alt="Photo of a Shiba Inu, right?">
    <mat-card-content>
      <p>
      Splice the main brace hearties brig list Admiral of the Black bilge water landlubber or just
      lubber ahoy main sheet rigging.
      Transom spike matey Barbary Coast wherry cog man-of-war reef sails take a caulk Yellow Jack.
      Admiral of the Black rope's end weigh anchor jib plunder maroon carouser squiffy knave heave down.
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>Arr!</button>
      <button mat-button>Fire!</button>
    </mat-card-actions>
  </mat-card>
  `
})

export class MainCom {}
