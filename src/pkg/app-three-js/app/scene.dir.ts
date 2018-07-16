import { Directive, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { AObject3D } from './object-3d';

@Directive
({
  selector: 'three-scene',
  providers: [{ provide: AObject3D, useExisting: forwardRef(() => SceneDir) }]
})
export class SceneDir extends AObject3D<THREE.Scene> implements AfterViewInit
{
  ngAfterViewInit()
  {
    this._object = new THREE.Scene();
    // window.scene = this._object;
    super.ngAfterViewInit();
  }
}
