import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup


  constructor
    (
      private formbuilder: FormBuilder,
      private toast: NgToastService,
      @Inject(MAT_DIALOG_DATA) public editData: any,
      private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      contact: ['', Validators.required],
      price: ['', Validators.required]
    })

   
  }

  addProduct() {
  
  }
 
}
