import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererCom } from './renderer.com';
import { SceneDir } from './scene.dir';
import { PerspectiveCameraDir } from './camera';
import { OrbitControlsDir } from './control';
import { PointLightDir } from './light';
import { ColladaLoaderDir, ObjectLoaderDir } from './loader';
import { AxesHelperDir, GridHelperDir } from './helper';
import { MeshDir, PlaneBufferGeometryDir } from './object';

@NgModule
({
  imports: [ CommonModule ],
  declarations:
  [
    RendererCom,
    SceneDir,
    PerspectiveCameraDir,
    OrbitControlsDir,
    PointLightDir,
    ColladaLoaderDir,
    ObjectLoaderDir,
    AxesHelperDir,
    GridHelperDir,

    MeshDir,
    PlaneBufferGeometryDir
  ],
  exports:
  [
    RendererCom,
    SceneDir,
    PerspectiveCameraDir,
    OrbitControlsDir,
    PointLightDir,
    ColladaLoaderDir,
    ObjectLoaderDir,
    AxesHelperDir,
    GridHelperDir,

    MeshDir,
    PlaneBufferGeometryDir
  ]
})
export class ThreeJsMod {}

export * from './object';
export * from './renderer.com';

