import {Component, OnInit, ViewChild} from '@angular/core';
import {DeliveryOption} from '../../models/dilivery-option';
import {Observable} from 'rxjs/internal/Observable';
import {DeliveryOptionsService} from '../../services/delivery-options.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {ICustomer, ICustomerAddress} from '../../models/customer';
import {DaDataType} from "../../../../../projects/kolkov/ngx-dadata/src/lib/ngx-da-data.service";
import {DaDataConfig} from "../../../../../projects/kolkov/ngx-dadata/src/lib/da-data-config";
import {DaDataAddress, DaDataFIO} from "../../../../../projects/kolkov/ngx-dadata/src/lib/models/data";
import {DaDataSuggestion} from "../../../../../projects/kolkov/ngx-dadata/src/lib/models/suggestion";

@Component({
  selector: 'app-cart-delivery',
  templateUrl: './cart-delivery.component.html',
  styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  model: ICustomer;

  @ViewChild('ymap') ymapElement: any;
  map: ymaps.Map;
  placemark: any;

  configFio: DaDataConfig = {
    apiKey: '2e51c5fbc1a60bd48face95951108560bf03f7d9',
    type: DaDataType.fio,
  };

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

      this.map.controls.remove("fullscreenControl");

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
        this.map.behaviors.disable(['drag', 'scrollZoom']);
      }

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

    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get().pipe(
      tap(x => {
          this.model = x.customer;
        }
      ));
  }

  setDeliveryOption(option: DeliveryOption): void {
    // ToDo Сделать возможность возврат карты в состояние Самовывоз при выборе опции.
    this.shoppingCartService.setDeliveryOption(option);
  }

  confirmedCart() {
    this.shoppingCartService.setCustomerRequisites(this.model);
    this.router.navigate(['/order/payment'], {replaceUrl: false});
  }

  onFioSelected(e: DaDataSuggestion) {
    const fio: DaDataFIO = <DaDataFIO>e.data;
    this.model.gender = fio.gender;
    this.model.firstName = fio.name;
    this.model.lastName = fio.surname;
    this.model.patronymic = fio.patronymic;
  }

  onSuggestionSelected(e: DaDataSuggestion) {
    const address = <DaDataAddress>e.data;
    console.log(address);
    this.model.address = <ICustomerAddress>{
      full: e.value,
      city: address.city_with_type,
      street: address.street_with_type,
      house: address.house,
      postalCode: address.postal_code,
      block: address.block,
      blockType: address.block_type,
    };
    if (address.flat) this.model.address.room = address.flat;
    this.geocode(e.value);
  }

  geocode(request: string) {
    ymaps.geocode(request).then((res) => {
      const obj = res.geoObjects.get(0);
      let error, hint;

      if (obj) {
        const s = obj.properties.get('metaDataProperty.GeocoderMetaData.precision').toString();
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
        console.log(hint);
      } else {

      }
      this.showResult(obj);
    }, function (e) {
      console.log(e);
    });
  }

  showResult(obj) {
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

    // Создаём карту.
    this.displayPoint(mapState, shortAddress);
    // Выводим сообщение под картой.
    // showMessage(address);
  }

  displayPoint(state, caption) {
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
      if (this.model.address.room) state.zoom = 17;
      this.map.setZoom(state.zoom, {duration: 300});
    });
  }

}

// ToDo Сделать валидацию формы
