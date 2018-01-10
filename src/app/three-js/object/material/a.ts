import { Material } from 'three';

export abstract class AMaterial<T extends Material>
{
  protected _object: T;
  get object(): T { return this._object; }
}
