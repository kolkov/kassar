import {Component, OnInit, ViewChild} from '@angular/core';
import {DeliveryOption} from '../../models/dilivery-option';
import {Observable} from 'rxjs/internal/Observable';
import {DeliveryOptionsService} from '../../services/delivery-options.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {ICustomer} from '../../models/customer';
import {DaDataType} from "../../../../../projects/kolkov/ngx-dadata/src/lib/ngx-da-data.service";
import {DaDataConfig} from "../../../../../projects/kolkov/ngx-dadata/src/lib/da-data-config";
import {DaDataAddress} from "../../../../../projects/kolkov/ngx-dadata/src/lib/models/data";

declare var ymaps: any;

// import StreetViewPanorama = google.maps.../../../../local-types/yandex-mapsStreetViewPanorama;

@Component({
  selector: 'app-cart-delivery',
  templateUrl: './cart-delivery.component.html',
  styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  model: ICustomer;

  /*@ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;*/

  @ViewChild('ymap') ymapElement: any;
  map: ymaps.Map;
  placemark: any;

  // currentFio = '';
  configFio: DaDataConfig = {
    apiKey: '2e51c5fbc1a60bd48face95951108560bf03f7d9',
    type: DaDataType.fio,
  };

  // currentAddress = '';
  configAddress: DaDataConfig = {
    apiKey: '2e51c5fbc1a60bd48face95951108560bf03f7d9',
    type: DaDataType.address,
  };

  constructor(private shoppingCartService: ShoppingCartService,
              private deliveryOptionService: DeliveryOptionsService,
              private router: Router) {
  }

  ngOnInit() {
    ymaps.ready().then(() => {
      var ua = navigator.userAgent;

      this.map = new ymaps.Map('map', {
        center: [55.760346, 37.622449],
        //controls: ['smallMapDefaultSet'],
        zoom: 15
      });
      //const control = this.map.controls.get('fullscreenControl');
      //control.disable
      this.map.controls.remove("fullscreenControl");
      // this.map.controls.remove("zoomControl");
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
        this.map.behaviors.disable(['drag', 'scrollZoom']);
      }

      // ymaps.behavior.Drag.disable();
      const caption = 'Наша фирма';
      const placemark = new ymaps.Placemark(
        this.map.getCenter(), {
          iconCaption: caption,
          balloonContent: caption
        }, {
          preset: 'islands#redDotIconWithCaption'
        });
      this.map.geoObjects.add(placemark);
    });

    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get().pipe(
      tap(x => {
          this.model = x.customer;
        }
      ));
  }

  setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  confirmedCart() {
    this.shoppingCartService.setCustomerRequisites(this.model);
    this.router.navigate(['/order/payment'], {replaceUrl: false});
  }

  onFioSelected(e) {
    console.log('onFioSelected!!!');
    console.log(e);
  }

  onChange(e) {
    console.log('onChange!!!');
    console.log(e);
    this.geocode(e);
  }

  onAddressSelected(e: DaDataAddress) {
    console.log('onAddressSelected!!!');
    console.log(e);
    // this.geocode();
    if (e.geo_lat && e.geo_lon) {
      const lat = parseFloat(e.geo_lat);
      const lon = parseFloat(e.geo_lon);
      //this.displayPoint({lat, lon}, "test");
    }
  }


  geocode(request: string) {
    console.log(request);
    ymaps.geocode(request).then((res) => {
      const obj = res.geoObjects.get(0);
      let error, hint;

      if (obj) {
        // Об оценке точности ответа геокодера можно прочитать тут:
        // https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/

        const s = obj.properties.get('metaDataProperty.GeocoderMetaData.precision').toString();
        console.log(s);
        switch (s) {
          case 'exact':
          case 'number':
            break;

          case 'near':
          case 'range':
            error = 'Неточный адрес, требуется уточнение';
            hint = 'Уточните номер дома';
            break;
          case 'street':
            error = 'Неполный адрес, требуется уточнение';
            hint = 'Уточните номер дома';
            break;
          case 'other':
          default:
            error = 'Неточный адрес, требуется уточнение';
            hint = 'Уточните адрес';
        }
      } else {
        error = 'Адрес не найден';
        hint = 'Уточните адрес';
      }

      // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
      if (error) {
        console.info(error);
        // showError(error);
        // showMessage(hint);
      } else {

      }
      this.showResult(obj);
      console.log(obj);
    }, function (e) {
      console.log(e);
    });
  }

  showResult(obj) {
    let mapContainer = this.map;
    const bounds = obj.properties.get('boundedBy');
    // Рассчитываем видимую область для текущего положения пользователя.
    const mapState = ymaps.util.bounds.getCenterAndZoom(
      bounds,
      [this.ymapElement.nativeElement.offsetWidth, this.ymapElement.nativeElement.offsetHeight]
    );
    // Сохраняем полный адрес для сообщения под картой.
    const address = [obj.getCountry(), obj.getAddressLine()].join(', ');
    // Сохраняем укороченный адрес для подписи метки.
    const shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
    // Убираем контролы с карты.
   // debugger;
    // this.map.controls = [];
    // Создаём карту.
    this.displayPoint(mapState, shortAddress);
    // Выводим сообщение под картой.
    // showMessage(address);
  }

  displayPoint(state, caption) {
    // console.log("displayPoint");
    // const caption = 'Место доставки';
    if (!this.placemark) {
      this.placemark = new ymaps.Placemark(
        state.center, {
          iconCaption: caption,
          balloonContent: caption
        }, {
          preset: 'islands#redDotIconWithCaption'
        });
    } else {
      this.placemark.geometry.setCoordinates(state.center);
      this.placemark.properties.set('iconCaption', caption);
    }

    this.map.geoObjects.add(this.placemark);
    this.map.panTo(state.center, {
      // Задержка между перемещениями.
      delay: 1500
    }).then(x => {
      this.map.setZoom(state.zoom, {duration: 300});
    });
  }

}
