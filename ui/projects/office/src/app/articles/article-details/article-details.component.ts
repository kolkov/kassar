import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../articles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../../../../../src/app/blog/article";
import {tap} from "rxjs/operators";
import {Category} from "../../../../../../src/app/catalog/cart-home.service";
import {translit} from "../translit";

/*export interface Category {
  id: number;
  name: string;
}

export interface CategoryList {
  items: Category[]
}*/

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article;

  id;

  categories: Category[];// = [{id: 1, name: "Онлайн кассы"}, {id: 2, name: "Законы"}];

  form: FormGroup;
  showForm: boolean = true;
  private formSubmitAttempt: boolean;

  body: string;

  pathInit;

  editorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    //placeholder: 'Type something. Test the Editor... ヽ(^。^)丿',
    translate: 'no'
  };

  constructor(private fb: FormBuilder,
              private articleService: ArticlesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.articleService.getCategories()
      .subscribe((x: Category[]) => this.categories = x );
    this.id = this.route.snapshot.params['id'];
    if (this.id != 0) {
      this.articleService.getOne(this.id).pipe(
        tap((x: Article) => {
          this.article = x;
          this.form.patchValue(this.article);
        })
      ).subscribe();
    }

    this.form = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      body: ['', Validators.required],
      introduction: ['', Validators.required],
      path: ['', Validators.required],
      metaDescription: ['', Validators.required],
      metaKeywords: ['', Validators.required],
      categoryId: 0
    });
    this.pathInit = this.form.get("path").value;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.pathInit != this.form.get("path").value && this.pathInit != '') {
      const result = confirm("Путь статьи изменился, продолжить?");
      if (!result) return;
    }
    if (this.form.valid) {
      this.showForm = false;
      this.articleService.save(this.form.value).subscribe(
        () => {
          this.showForm = false;
          alert("Завершено успешно");
        },
        () => {
          alert("Не успешно");
          this.showForm = true;
        },
        () => {
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

  updatePath(){
    const pathValue = this.form.get("path").value;
    if (pathValue == ''){
      const value = this.form.get("title").value;
      const translitValue = translit(value);
      this.form.patchValue({"path": translitValue})
    }
  }
}
