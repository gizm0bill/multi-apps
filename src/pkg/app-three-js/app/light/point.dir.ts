import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { ALight } from './a';
import { AObject3D } from '../object-3d';

@Directive
({
  selector: 'three-point-light',
  providers: [{ provide: AObject3D, useExisting: forwardRef(() => PointLightDir) }]
})
export class PointLightDir extends ALight<THREE.PointLight> implements AfterViewInit
{
  @Input() color: THREE.Color;

  @Input() distance: number;

  ngAfterViewInit()
  {
    console.log( this.color );
    this._object = new THREE.PointLight(this.color, this.intensity, this.distance);
    super.ngAfterViewInit();
  }

}
