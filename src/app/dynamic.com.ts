import
{
  Component,
  ComponentFactoryResolver,
  Injector,
  ViewContainerRef,
  Compiler,
  Input,
  Inject,
  NgModuleFactory
} from '@angular/core';

@Component({ selector: 'dynamic-lazy-load', template: '' })
export class DynamicCom
{
  constructor
  (
    private injector: Injector,
    private viewRef: ViewContainerRef,
    private compiler: Compiler,
  ) {}

  @Input() componentName: string;
  private _loadChildrenCallback: () => any;
  @Input() set loadChildrenCallback( cb ) { this._loadChildrenCallback = cb; this.loadLazyModule(); }

  private async loadLazyModule()
  {
    const lazyModule = await this._loadChildrenCallback();
    if ( lazyModule instanceof NgModuleFactory )
      this.createAndInsertComponent(lazyModule);
    else
    {
      const compiledModule = await this.compiler.compileModuleAsync(lazyModule.default);
      this.createAndInsertComponent(compiledModule);
    }
  }

  createAndInsertComponent(moduleFactory: NgModuleFactory<any>) {
    const moduleRef = moduleFactory.create(this.injector);
    if (!moduleRef.instance.dynamicLazyLoadComponents) {
        console.log('No Lazy Load Components Found...');
        return;
    }

    const componentType = moduleRef.instance.dynamicLazyLoadComponents[this.componentName];
    const componentFactoryResolver: ComponentFactoryResolver = moduleRef.componentFactoryResolver;
    const compFactory = componentFactoryResolver.resolveComponentFactory(componentType);
    this.viewRef.createComponent(compFactory);
  }
}
