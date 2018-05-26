import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "./articles.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private fb: FormBuilder,
              private articleService: ArticlesService) { }

  ngOnInit() {
    this.form = this.fb.group({
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
      this.articleService.save(this.form.value).subscribe();
    }
    this.formSubmitAttempt = true;
  }
}
