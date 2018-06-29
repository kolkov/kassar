import {Component, OnInit, ViewChild} from '@angular/core';

import {AngularEditorConfig} from "../../../../../kolkov/angular-editor/src/lib/config";
import {ProductsService} from "../products.service";
import {tap} from "rxjs/operators";
import {AngularEditorComponent} from "../../../../../kolkov/angular-editor/src/lib/angular-editor.component";
import {Category} from "../../../../../../src/app/models/category";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../../../../src/app/cart/models/product";
import {translit} from "../../../../../kolkov/translit/src/lib/translit";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  product: Product;

  id;

  categories: Category[];

  form: FormGroup;
  showForm = true;
  private formSubmitAttempt: boolean;

  body: string;

  pathInit;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Введите текст статьи...',
    translate: 'no',
    defaultFontName: 'Comic Sans MS',
    uploadUrl: 'v1/images'
  };

  @ViewChild("angularEditor") editor: AngularEditorComponent;

  constructor(private fb: FormBuilder,
              private productService: ProductsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.productService.getCategories()
      .subscribe((x: Category[]) => this.categories = x );
    this.id = this.route.snapshot.params['id'];
    if (this.id !== 0) {
      this.productService.getOne(this.id).pipe(
        tap((x: Product) => {
          this.product = x;
          this.form.patchValue(this.product);
          this.pathInit = this.form.get("path").value;
        })
      ).subscribe();
    }

    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      /*body: ['', Validators.required],*/
      description: ['', Validators.required],
      price: [0, Validators.required],
      path: ['', Validators.required],
      metaDescription: ['', Validators.required],
      metaKeywords: ['', Validators.required],
      categoryId: 0
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
      this.productService.save(this.form.value).subscribe(
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

  updatePath() {
    const pathValue = this.form.get("path").value;
    if (pathValue === '') {
      const value = this.form.get("title").value;
      const translitValue = translit(value);
      this.form.patchValue({"path": translitValue});
    }
  }

}