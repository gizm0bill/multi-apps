import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComFactoryOutletDir } from './com-factory-outlet.dir';
import { PackagePresentationCom } from './package-presentation.com';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule
({
 imports:      [ CommonModule, MatCardModule, MatButtonModule ],
 declarations: [ ComFactoryOutletDir, PackagePresentationCom ],
 exports:      [ CommonModule, FormsModule, ReactiveFormsModule, ComFactoryOutletDir, PackagePresentationCom ]
})
export class SharedMod { }
