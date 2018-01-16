import { Component, OnDestroy, AfterViewInit, NgZone, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { RendererCom } from '../../three-js/renderer.com';
import { PerspectiveCameraDir } from '../../three-js/camera';

@Component
({
  selector: 'second-app-main',
  templateUrl: './main.com.pug',
  styleUrls: ['./main.com.scss']
})
export class MainCom implements OnDestroy, AfterViewInit
{
  @ViewChild(RendererCom) childRenderer: RendererCom;

  audio: THREE.Audio;
  audioLoaded: boolean = false;
  audioLoadedPercent: number = 0;
  analyser: THREE.AudioAnalyser;

  private refreshInterval;
  constructor(private zone: NgZone)
  {
    const listner = new THREE.AudioListener;
    this.audio = new THREE.Audio( listner );

    this.zone.runOutsideAngular( () =>
    {
      const loader = new THREE.AudioLoader;
      loader.load('assets/audio/bunker.mp3',
        buffer => this.zone.run( () =>
        {
          this.audioLoaded = true;
          this.audio.setBuffer( buffer );
        }),
        ( evt: ProgressEvent ) => this.zone.run( () =>
          this.audioLoadedPercent = Math.ceil( evt.loaded * 100 / evt.total ) ),
        (...args: any[]) => console.log(args));
    });

    this.analyser = new THREE.AudioAnalyser( this.audio, 2048 );
  }

  ngOnDestroy()
  {
    clearInterval(this.refreshInterval);
    if ( this.audio && this.audio.isPlaying ) this.audio.stop();
  }

  ngAfterViewInit()
  {
    const renderer = this.childRenderer;
    setTimeout( renderer.onResize.bind(renderer), 500 ); // TODO: animation end from unloaded component
    this.zone.runOutsideAngular( () =>
      this.refreshInterval = setInterval( () =>
      {
        this.analyser.getFrequencyData();
        renderer.render();
      }, 29) );
  }

}
