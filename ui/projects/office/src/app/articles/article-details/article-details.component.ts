import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../articles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../../../../../src/app/blog/article";
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article;

  id;

  form: FormGroup;
  showForm: boolean = true;
  private formSubmitAttempt: boolean;

  body: string;

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
    this.id = this.route.snapshot.params['id'];
    this.articleService.getOne(this.id).pipe(
      tap((x: Article) => {
        this.article = x;
        this.form.patchValue(this.article);
      })
    ).subscribe();


    this.form = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      body: ['', Validators.required],
      introduction: ['', Validators.required],
      path: ['', Validators.required],
      metaDescription: ['', Validators.required],
      metaKeywords: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.showForm = false;
      this.articleService.save(this.form.value).subscribe(
        () => {
          this.showForm = false;
          alert("Успешно добавлено");
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
}
