import { Directive, ViewContainerRef, Input, ComponentFactory, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({ selector: '[comFactoryOutlet]' })
export class ComFactoryOutletDir
{
  constructor( private _viewContainerRef: ViewContainerRef ) {}

  @Input() set comFactoryOutlet( o: { com: ComponentFactory<any>, inj?: Injector } )
  {
    this._viewContainerRef.clear();
    if ( !o ) return;
    this._viewContainerRef.createComponent( o.com, undefined, o.inj );
  }
}