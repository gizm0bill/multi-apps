import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { AObject3D } from '../object-3d';

@Directive
({
  selector: 'three-axes-helper',
  providers: [{ provide: AObject3D, useExisting: forwardRef(() => AxesHelperDir) }]
})
export class AxesHelperDir extends AObject3D<THREE.AxisHelper> implements AfterViewInit
{
  @Input() size: number;

  ngAfterViewInit()
  {
    console.log('AxesHelperDirective.newObject3DInstance');
    this._object = new THREE.AxisHelper(this.size);
    super.ngAfterViewInit();
  }
}
