/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
})
export class FileComponent implements OnInit {
  @Input() field:any = {};

  @Input() form:FormGroup;

  FileImage: any;

  Size: any;

  filename: any;

  base64File: any;

  get isValid() { return this.form.controls[this.field.name].valid; }

  get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChange() {
    this.form.controls[this.field.name].value.filename = '';
    // this.field.value.
  }

  docClick() {
    document.getElementById(this.field.name).click();
  }

  selectFile(event: any) {
    try {
      this.FileImage = event.target.files[0];

      this.Size = this.FileImage.size;

      const fReader = new FileReader();
      let fileObj = {};

      fReader.readAsDataURL(this.FileImage);

      fReader.onloadend = (event) => {
        setTimeout(() => {
          document.getElementById('fileupload')?.focus();
        }, 100);

        fileObj = {
          filename: this.FileImage.name,
          filesize: this.FileImage.size,
          filetype: this.FileImage.size,
          filebase64: event.target.result,
        };

        this.base64File = event.target.result;
        this.form.controls[this.field.name].setValue(fileObj);
      };
    } catch (error) {
      // this.form.controls[this.field.name].setValue(null;

      this.form.controls[this.field.name].setValue('Select a file to upload');
    }

    if (event.target.value === '') {
      this.form.controls[this.field.name].setValue('Select a file to upload');
    } else {
      this.form.controls[this.field.name].setValue('');
    }
  }
}
