import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { AObject3D } from '../object-3d';

export abstract class ALight<T extends THREE.Light> extends AObject3D<T> implements AfterViewInit
{
  @Input() color: THREE.Color;
  @Input() intensity: number;

  ngAfterViewInit() { super.ngAfterViewInit(); }
}
