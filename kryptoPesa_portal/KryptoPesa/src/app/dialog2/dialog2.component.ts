import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.css']
})
export class Dialog2Component implements OnInit {
  sendForm!: FormGroup

  constructor
    (
      private formbuilder: FormBuilder,
      private toast: NgToastService,
      @Inject(MAT_DIALOG_DATA) public editData: any,
      private api: ApiService,
      private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.sendForm = this.formbuilder.group({
      paybill: ['', Validators.required],
      accountno: ['', Validators.required],
      price: ['', Validators.required]
    })

  }
  payment() { }
}
