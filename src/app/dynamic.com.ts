import
{
  Component,
  ComponentFactoryResolver,
  Injector,
  ViewContainerRef,
  Compiler,
  Input,
  Inject,
  NgModuleFactory,
  NgModuleFactoryLoader
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Component({ selector: 'dynamic-lazy-load', template: '' })
export class DynamicCom
{
  constructor
  (
    private injector: Injector,
    private viewRef: ViewContainerRef,
    private compiler: Compiler,
    private loader: NgModuleFactoryLoader
  ) {}

  @Input() componentName: string;
  private _loadChildrenCallback: () => any;
  @Input() set loadChildrenCallback( cb ) { this._loadChildrenCallback = cb; this.loadLazyModule(); }

  private async loadLazyModule()
  {
    const lazyModule = await this._loadChildrenCallback();

    this.compiler.compileModuleAndAllComponentsAsync(lazyModule.default)
      .then( moduleFactory => console.log( this.viewRef.createComponent( moduleFactory.componentFactories[0] ) ) );
  }
}
