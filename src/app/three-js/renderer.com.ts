import
{
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  ContentChildren,
  QueryList
} from '@angular/core';
import { SceneDir } from './scene.dir';
import { PerspectiveCameraDir } from './camera';
import * as THREE from 'three';

@Component
({
  selector: 'three-renderer',
  template: '<canvas #canvas width="0" height="0"></canvas>',
  styles: [ 'canvas { width: 100%; height: 100%; }' ]
})
export class RendererCom implements AfterViewInit
{
  private renderer: THREE.WebGLRenderer;

  constructor() { this.render = this.render.bind(this); }

  @ViewChild('canvas') canvasRef: ElementRef;
  get canvas(): HTMLCanvasElement { return this.canvasRef.nativeElement; }

  @ContentChildren(SceneDir) sceneComponents: QueryList<SceneDir>;
  @ContentChildren(PerspectiveCameraDir) cameraComponents: QueryList<PerspectiveCameraDir>;

  ngAfterViewInit()
  {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: !!1, alpha: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth - 4, this.canvas.clientHeight - 4);
    // this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.autoClear = true;
    this.updateChildCamerasAspectRatio();
    this.render();
  }

  render()
  {
    const sceneComponent = this.sceneComponents.first;
    const cameraComponent = this.cameraComponents.first;
    this.renderer.render(sceneComponent.object, cameraComponent.camera);
  }

  private calculateAspectRatio(): number
  {
    const height = this.canvas.clientHeight - 4;
    if (height === 0) {
      return 0;
    }
    return (this.canvas.clientWidth - 4) / (this.canvas.clientHeight - 4);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event)
  {
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    // console.log('RendererComponent.onResize: ' + this.canvas.clientWidth + ', ' + this.canvas.clientHeight);

    this.updateChildCamerasAspectRatio();

    this.renderer.setSize(this.canvas.clientWidth - 4, this.canvas.clientHeight - 4);
    this.render();
  }

  updateChildCamerasAspectRatio()
  {
    const aspect = this.calculateAspectRatio();
    this.cameraComponents.forEach(camera => camera.updateAspectRatio(aspect));
  }
}
