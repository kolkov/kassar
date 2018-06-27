import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularEditorModule} from "../../../../kolkov/angular-editor/src/lib/angular-editor.module";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
  declarations: []
})
export class SharedModule { }
