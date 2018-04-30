import {Component, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  constructor() { }

  ngOnInit() {
    //const uluru: google.maps.LatLngLiteral = {lat: 55.760346, lng: 37.622449};
    let mapProp = {
      center: new google.maps.LatLng(55.760346, 37.622449),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    let marker = new google.maps.Marker({
      position: {lat: 55.760346, lng: 37.622449},
      map: this.map
    });
  }
}
