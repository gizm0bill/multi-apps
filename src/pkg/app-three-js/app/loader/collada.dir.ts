import { Directive, AfterViewInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import * as THREE from 'three';
import { AObject3D } from '../object-3d';
import { RendererCom } from '../renderer.com';
import '../enable-three';
import 'three/examples/js/loaders/ColladaLoader';

@Directive
({
  selector: 'three-collada-loader',
  providers: [{ provide: AObject3D, useExisting: forwardRef(() => ColladaLoaderDir) }]
})
export class ColladaLoaderDir extends AObject3D<THREE.Object3D> implements AfterViewInit
{
  private loader = new THREE.ColladaLoader;

  @Input() model: string;
  @Input() renderer: RendererCom;

  ngAfterViewInit(): void
  {
    this._object = new THREE.Object3D;
    this.loader.load(this.model, this.onModelLoadingCompleted.bind(this));
    super.ngAfterViewInit();
  }

  private onModelLoadingCompleted(collada: THREE.ColladaModel)
  {
    this.addChild(collada.scene);
    this.renderer.render();
  }

}
