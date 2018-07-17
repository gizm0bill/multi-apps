import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { AObject3D } from '../object-3d';

@Directive
({
  selector: 'three-grid-helper',
  providers: [{ provide: AObject3D, useExisting: forwardRef(() => GridHelperDir) }]
})
export class GridHelperDir extends AObject3D<THREE.AxesHelper> implements AfterViewInit
{
  @Input() size: number;
  @Input() divisions: number;
  @Input() color: THREE.Color;

  ngAfterViewInit()
  {
    this._object = new THREE.GridHelper(this.size, this.divisions, undefined, this.color || new THREE.Color(0xeeeeee));
    super.ngAfterViewInit();
  }
}
