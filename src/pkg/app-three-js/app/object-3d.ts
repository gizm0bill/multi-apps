import { AfterViewInit, Input, QueryList, ContentChildren } from '@angular/core';
import * as THREE from 'three';

export abstract class AObject3D<T extends THREE.Object3D> implements AfterViewInit
{
  @ContentChildren(AObject3D, { descendants: false }) childNodes: QueryList<AObject3D<any>>;

  @Input() rotateX: number;
  @Input() rotateY: number;
  @Input() rotateZ: number;

  @Input() translateX: number;
  @Input() translateY: number;
  @Input() translateZ: number;

  protected _object: T;
  get object(): T { return this._object; }

  ngAfterViewInit(): void
  {
    this.applyTranslation();
    this.applyRotation();

    if ( this.childNodes !== undefined && this.childNodes.length > 1 )
      this.childNodes.filter( i => i !== this && i.object !== undefined )
        .forEach( i =>  this.addChild(i.object) );
  }

  private applyRotation(): void
  {
    if (this.rotateX !== undefined) this._object.rotateX(this.rotateX);
    if (this.rotateY !== undefined) this._object.rotateY(this.rotateY);
    if (this.rotateZ !== undefined) this._object.rotateZ(this.rotateZ);
  }

  private applyTranslation(): void
  {
    if (this.translateX !== undefined) this._object.translateX(this.translateX);
    if (this.translateY !== undefined) this._object.translateY(this.translateY);
    if (this.translateZ !== undefined) this._object.translateZ(this.translateZ);
  }

  protected addChild(object: THREE.Object3D): any
  {
    return this._object.add(object);
  }
}
