import {Component, OnInit, ViewChild} from '@angular/core';
import {map, tap} from "rxjs/operators";
import {AngularEditorComponent} from "../../../../../kolkov/angular-editor/src/lib/angular-editor.component";
import {Category} from "../../../../../../src/app/models/category";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Order} from "../order";
import {OrdersService} from "../orders.service";

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {
  order: Order;

  id;

  categories: Category[];

  form: FormGroup;
  showForm = true;
  private formSubmitAttempt: boolean;

  body: string;

  pathInit;

  @ViewChild("angularEditor") editor: AngularEditorComponent;

  constructor(private fb: FormBuilder,
              private orderService: OrdersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    /*this.orderService.getCategories()
      .subscribe((x: Category[]) => this.categories = x );*/
    this.id = this.route.snapshot.params['id'];
    if (this.id !== 0) {
      this.orderService.getOne(this.id).pipe(
        map((o: Order) =>  {
          o.date = o.date.substr(0, 10);
          return o;
        }),
        tap((x: Order) => {
          this.order = x;
          this.form.patchValue(this.order);
          // this.pathInit = this.form.get("path").value;
        }),
      ).subscribe();
    }

    this.form = this.fb.group({
      id: 0,
      fio: ['', Validators.required],
      note: ['', Validators.required],
      itemsTotal: [0, Validators.required],
      grossTotal: [0, Validators.required],
      date: ['', Validators.required],
     /* metaDescription: ['', Validators.required],
      metaKeywords: ['', Validators.required],
      categoryId: 0*/
    });

  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    /*if (!this.editor.modeVisual) {
      this.editor.toggleEditorMode(this.editor.modeVisual);
    }*/
    if (this.pathInit !== this.form.get("path").value && this.pathInit !== '') {
      const result = confirm("Путь продукта изменился, продолжить?");
      if (!result) {
        return;
      }
    }
    if (this.form.valid) {
      this.showForm = false;
      this.orderService.save(this.form.value).subscribe(
        () => {
          this.showForm = false;
          alert("Завершено успешно");
        },
        () => {
          alert("Не успешно");
          this.showForm = true;
        },
        () => {
          this.router.navigate(["/cart"]);
          this.form.reset();
          this.showForm = true;
          this.formSubmitAttempt = false;
          return false;
        }
      );

    }
    this.formSubmitAttempt = true;
    return false;
  }

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
    return false;
  }

 /* updatePath() {
    const pathValue = this.form.get("path").value;
    if (pathValue === '') {
      const value = this.form.get("title").value;
      const translitValue = translit(value);
      this.form.patchValue({"path": translitValue});
    }
  }*/

}
