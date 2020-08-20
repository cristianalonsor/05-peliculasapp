import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
  // es el nombre del pipe que usare para pasar la imagen a la aplicacion
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

// recibir la imagen y retornarla con el estilo dentro de la aplicacion
  transform(img: string, size: string = 'w500'): string {

    if ( !img ){
      console.log('../../assets/no-image-banner.jpg');
      return '../../assets/no-image-banner.jpg';

    } else {
      // se construye la url que debo mostrar para que aparezca la imagen
      const imgUrl = `${URL}/${size}${img}`;
      // console.log('URL', imgUrl);
      return imgUrl;
    }
  }

}
