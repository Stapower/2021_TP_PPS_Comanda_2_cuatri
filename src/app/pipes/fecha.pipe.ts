import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha) {
    //cosasLindas
    //cosasFeas
    //nanoseconds: 949000000

    if(fecha == null || fecha == undefined)
      return;
      
    var nowDate = new Date();
    var nowSeconds = nowDate.getTime()/1000; 
    var timePassed = nowSeconds - fecha.seconds;
    var dateFromSecons = new Date(nowDate.getTime()-(timePassed*1000))
    return dateFromSecons.getHours() + ":" + dateFromSecons.getMinutes();
    //console.log(dateFromSecons.toLocaleDateString());

    //return dateFromSecons.toLocaleString();

  }


}
