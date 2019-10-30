import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {Http,Headers,RequestOptions,RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
 


@Component({ 
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currency:any=1;
  default_currency:any;
  def_curr_value:any;
  selectedCodeValue:any;
  currency_array:any;

  constructor(public http: Http,private decimalPipe: DecimalPipe) {}

  ionViewWillEnter(){

    this.get_data().subscribe(
      data => {
        console.log(data);              
        this.currency_array=data.payload.rates;
        console.log(this.currency_array);
        this.default_currency=this.currency_array[0].frmccy;
       // this.selectedCodeValue=this.decimalPipe.transform(this.currency_array[0].rate, '1.2-2');
         this.selectedCodeValue=this.currency_array[24];
      },
      err => {
        console.log(err);             
       
       
      },
      () => console.log('Movie Search Complete')
      ); 
   
  }

get_data(){

  let headers = new Headers();
  //headers.append('Content-Type', 'application/json');  
  return this.http.get('https://lieservices.luluone.com:9443/liveccyrates?payload=%7B%22activityType%22:%22rates.get%22,%22aglcid%22:784278,%22instype%22:%22LR%22%7D').pipe(map(res => res.json()));

}

selectEmployee(event){

  console.log(this.selectedCodeValue);
  this.def_curr_value= this.decimalPipe.transform(this.currency*this.selectedCodeValue.rate, '1.2-2');
  

}

input_chane(event){

  this.def_curr_value= this.decimalPipe.transform(event.target.value*this.selectedCodeValue.rate, '1.2-2');

}

input_do(event){

  this.currency=this.decimalPipe.transform(event.target.value/this.selectedCodeValue.rate, '1.2-2');
  

}

}
