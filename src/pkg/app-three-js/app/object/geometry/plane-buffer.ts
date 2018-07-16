import { Directive, forwardRef, AfterViewInit, Input } from '@angular/core';
import { PlaneBufferGeometry } from 'three';
import { AGeometry } from './a';

@Directive
({
  selector: 'three-plane-buffer-geometry, [three-plane-buffer-geometry]',
  providers: [{ provide: AGeometry, useExisting: forwardRef( () => PlaneBufferGeometryDir ) }]
})
export class PlaneBufferGeometryDir extends AGeometry<PlaneBufferGeometry> implements AfterViewInit
{
  @Input() width: number = 128;
  @Input() height: number = 128;
  @Input() widthSegments: number = 1;
  @Input() heightSegments: number = 1;

  ngAfterViewInit()
  {
    this._object = new PlaneBufferGeometry( this.width, this.height, this.widthSegments, this.heightSegments );
    // TODO
    this._object.rotateX(Math.PI / 2);
  }
}
