import {Component, OnInit, ViewChild} from '@angular/core';
import { } from "@types/yandex-maps";
// import { } from "@types/googlemaps";

// declare var ymaps: ymaps;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  /*@ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;*/

  @ViewChild('ymap') ymapElement: any;
  map: ymaps.Map;

  constructor() {
  }

  ngOnInit() {
    // const uluru: google.maps.LatLngLiteral = {lat: 55.760346, lng: 37.622449};
     /*const mapProp = {
       center: new google.maps.LatLng(55.760346, 37.622449),
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
     const marker = new google.maps.Marker({
       position: {lat: 55.760346, lng: 37.622449},
       map: this.map,
     });*/

    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: [55.760346, 37.622449],
        zoom: 15
      });
      const caption = 'Наша компания, самовывоз';
      const balloon = 'Театральный проезд, д.3, с.4';
      const placemark = new ymaps.Placemark(
        this.map.getCenter(), {
          iconCaption: caption,
          balloonContent: balloon
        }, {
          preset: 'islands#redDotIconWithCaption'
        });
      this.map.geoObjects.add(placemark);
    });
  }
}
