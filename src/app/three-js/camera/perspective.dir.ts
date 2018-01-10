import { Directive, Input, forwardRef, HostListener, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { ACamera } from './a';

@Directive
({
  selector: 'three-perspective-camera',
  providers: [{ provide: ACamera, useExisting: forwardRef(() => PerspectiveCameraDir) }]
})
export class PerspectiveCameraDir implements AfterViewInit
{
  camera: THREE.PerspectiveCamera;

  @Input() fov: number;
  @Input() near: number;
  @Input() far: number;

  @Input() positionX: number;
  @Input() positionY: number;
  @Input() positionZ: number;

  ngAfterViewInit(): void
  {
    this.camera = new THREE.PerspectiveCamera( this.fov, undefined, this.near, this.far );
    // Set position and look at
    this.camera.position.x = this.positionX;
    this.camera.position.y = this.positionY;
    this.camera.position.z = this.positionZ;
    this.camera.updateProjectionMatrix();

  }

  updateAspectRatio(aspect: number)
  {
    // console.log("PerspectiveCameraDirective.updateAspectRatio: " + aspect);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

}
