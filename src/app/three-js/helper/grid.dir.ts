import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { AObject3D } from '../object-3d';

@Directive
({
  selector: 'three-grid-helper',
  providers: [{ provide: AObject3D, useExisting: forwardRef(() => GridHelperDir) }]
})
export class GridHelperDir extends AObject3D<THREE.AxisHelper> implements AfterViewInit
{
  @Input() size: number;
  @Input() divisions: number;

  ngAfterViewInit()
  {
    console.log('GridHelperDirective.newObject3DInstance');
    this._object = new THREE.GridHelper(this.size, this.divisions);
    super.ngAfterViewInit();
  }
}
