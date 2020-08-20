import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/intefaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  slideOpts = {
    slidesPerView: 3.3,
    spaceBetween: -10,
    freeMode: false
  };

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cargarMasPeliculas(){
    this.cargarMas.emit();
  }
  async mostrarPelicula(id: string){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}