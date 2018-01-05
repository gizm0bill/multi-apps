import { Directive, Input, forwardRef, HostListener, AfterViewInit } from '@angular/core';
import { AbstractCamera } from './abstract-camera';
import * as THREE from 'three';

@Directive
({
  selector: 'three-perspective-camera',
  // tslint:disable-next-line:no-forward-ref
  providers: [{ provide: AbstractCamera, useExisting: forwardRef(() => PerspectiveCameraDir) }]
})
export class PerspectiveCameraDir extends AbstractCamera<THREE.PerspectiveCamera>
{

  camera: THREE.PerspectiveCamera
  //@Input() cameraTarget: THREE.Object3D;

  @Input() fov: number;
  @Input() near: number;
  @Input() far: number;

  @Input() positionX: number;
  @Input() positionY: number;
  @Input() positionZ: number;


  protected afterInit(): void {
    console.log("PerspectiveCameraDirective.afterInit");
    //let aspectRatio = undefined; // Updated later
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      undefined,
      this.near,
      this.far
    );

    // Set position and look at
    this.camera.position.x = this.positionX;
    this.camera.position.y = this.positionY;
    this.camera.position.z = this.positionZ;
    this.camera.updateProjectionMatrix();
  }

  public updateAspectRatio(aspect: number) {
    console.log("PerspectiveCameraDirective.updateAspectRatio: " + aspect);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }


}
