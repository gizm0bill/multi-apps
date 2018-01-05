import { Directive, Input, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import * as THREE from 'three';
import { PerspectiveCameraDir } from '../camera';
import { RendererCom } from '../renderer.com';
import '../enable-three';
import 'three/examples/js/controls/OrbitControls';

@Directive
({
  selector: 'three-orbit-contols'
})
export class OrbitControlsDir implements AfterViewInit
{

  @ContentChildren(PerspectiveCameraDir, { descendants: true }) childCameras: QueryList<PerspectiveCameraDir>;
  @ContentChildren(RendererCom, { descendants: true }) childRenderers: QueryList<RendererCom>;

  @Input() rotateSpeed: number = 1.0;
  @Input() zoomSpeed: number = 1.2;

  private controls: THREE.OrbitControls;

  constructor() {
    console.log('OrbitControlsDir.constructor');
  }

  ngAfterViewInit(): void
  {
    console.log('OrbitControlsDir.ngAfterViewInit');
    if (this.childCameras === undefined || this.childCameras.first === undefined) {
      throw new Error('Camera is not found');
    }
    if (this.childRenderers === undefined || this.childRenderers.first === undefined) {
      throw new Error('Renderer is not found');
    }

    this.controls = new THREE.OrbitControls(this.childCameras.first.camera);
    this.controls.rotateSpeed = this.rotateSpeed;
    this.controls.zoomSpeed = this.zoomSpeed;
    this.controls.addEventListener('change', this.childRenderers.first.render);
    this.childRenderers.first.render();
  }

}
