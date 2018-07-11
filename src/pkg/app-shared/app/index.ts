import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComFactoryOutletDir } from './com-factory-outlet.dir';

@NgModule
({
 imports:      [ CommonModule ],
 declarations: [ ComFactoryOutletDir ],
 exports:      [ CommonModule, FormsModule, ReactiveFormsModule, ComFactoryOutletDir ]
})
export class SharedMod { }
