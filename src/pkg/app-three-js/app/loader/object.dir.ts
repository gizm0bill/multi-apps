import { Directive, AfterViewInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import * as THREE from 'three';
import { AObject3D } from '../object-3d';
import { RendererCom } from '../renderer.com';
import { Object3D } from 'three';

@Directive
({
  selector: 'three-object-loader',
})
export class ObjectLoaderDir extends AObject3D<THREE.Object3D>
{

  @Input() model: string;
  @Input() renderer: RendererCom;

  constructor()
  {
    super();
    console.log('ObjectLoaderDirective.constructor');
  }

  protected afterInit(): void {
    console.log('ObjectLoaderDirective.afterInit');
    this._object = new THREE.Object3D();
    const loader = new THREE.ObjectLoader();
    loader.load(this.model, this.onObjectLoaded.bind(this));

  }

  private onObjectLoaded(object: THREE.Object3D)
  {
    console.log('ObjectLoaderDirective.onObjectLoaded', arguments)
    this.addChild(object);
    this.renderer.render();
  }
}
