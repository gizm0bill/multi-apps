import { Directive, AfterViewInit, OnDestroy, Input, NgZone, forwardRef } from '@angular/core';
import { AMaterial } from '../../three-js/object';
import { ShaderMaterial, DataTexture, LuminanceFormat, DoubleSide } from 'three';

@Directive
({
  selector: 'custom-shader-material',
  providers: [{ provide: AMaterial, useExisting: forwardRef( () => CustomShaderMaterialDir ) }]
})
export class CustomShaderMaterialDir extends AMaterial<ShaderMaterial> implements AfterViewInit, OnDestroy
{
  constructor( private zone: NgZone ) { super(); }
  @Input() shaderData: Uint8Array;
  private uniforms: any;
  private refreshInterval;
  ngAfterViewInit()
  {
    this.uniforms = { tData: { value: new DataTexture( this.shaderData, 32, 32, LuminanceFormat ) } };
    this._object = new ShaderMaterial
    ({
      wireframe: true,
      side: DoubleSide,
      flatShading: true,
      uniforms: this.uniforms,
      vertexShader: `
        uniform sampler2D tData;
        void main()
        {
          vec3 newPosition = position;
          newPosition.y = position.y + texture2D( tData, vec2( uv.x, uv.y ) ).r * 32.0;
          gl_PointSize = 1.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        }
      `,
      fragmentShader: `
        void main()
        {
          gl_FragColor = vec4( 0.5, 0.5, 0.5, 1.0 );
        }
      `
    });
    this.zone.runOutsideAngular( () =>
      this.refreshInterval = setInterval( () =>
      {
        this.uniforms.tData.value.needsUpdate = true;
      }, 29 ) );
  }
  ngOnDestroy()
  {
    clearInterval( this.refreshInterval );
  }
}
