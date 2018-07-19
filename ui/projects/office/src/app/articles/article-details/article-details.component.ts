import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../articles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../../../../../src/app/blog/article";
import {tap} from "rxjs/operators";
import {translit} from "../../../../../kolkov/translit/src/lib/translit";
import {AngularEditorComponent} from "../../../../../kolkov/angular-editor/src/lib/angular-editor.component";
import {AngularEditorConfig} from "../../../../../kolkov/angular-editor/src/lib/config";
import {Category} from "../../../../../../src/app/models/category";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article;

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
    uploadUrl: 'v1/images',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  @ViewChild("angularEditor") editor: AngularEditorComponent;

  constructor(private fb: FormBuilder,
              private articleService: ArticlesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.articleService.getCategories()
      .subscribe((x: Category[]) => this.categories = x );
    this.id = this.route.snapshot.params['id'];
    if (this.id !== 0) {
      this.articleService.getOne(this.id).pipe(
        tap((x: Article) => {
          this.article = x;
          this.form.patchValue(this.article);
          this.pathInit = this.form.get("path").value;
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

  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (!this.editor.modeVisual) {
      this.editor.toggleEditorMode(this.editor.modeVisual);
    }
    if (this.pathInit !== this.form.get("path").value && this.pathInit !== '') {
      const result = confirm("Путь статьи изменился, продолжить?");
      if (!result) {
        return;
      }
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
          this.router.navigate(["/articles"]);
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

  onChange(e: Event) {
    console.log(e);
  }
}
