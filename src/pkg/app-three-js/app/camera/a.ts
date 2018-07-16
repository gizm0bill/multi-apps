import { AfterViewInit, Input, QueryList, ContentChildren } from '@angular/core';
import * as THREE from 'three';

export abstract class ACamera<T extends THREE.Camera>
{
  camera: T;
  abstract updateAspectRatio(aspect: number);

}
