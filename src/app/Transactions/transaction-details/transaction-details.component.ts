import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { TransactionService } from '../../transaction.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [ ReactiveFormsModule, TransactionListComponent, CommonModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})

export class TransactionDetailsComponent {
  
  @ViewChild(TransactionListComponent, { static: false }) transactionListComponent!: TransactionListComponent;
  constructor(private router: Router, private transactionService: TransactionService) { }

  transactionForm!: FormGroup;
  ShowError: boolean = false;

  @Input() modalRef!: NgbModalRef;
  @Input() transaction: any;

  ngOnInit() {
    this.transactionForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      date: new FormControl({ value: '', disabled: true }),
      comments: new FormControl(['', Validators.required])
    });
  }

  updateTransaction() {
    const updatedComments = document.getElementById("Comments") as HTMLInputElement;
    
    if (this.transactionForm.valid && updatedComments.value.trim() !== '') {
      this.transactionService.updateTransaction({ comments: updatedComments.value });
      this.modalRef.close();
    } else {
      this.ShowError = true;
      return;
    }
   
  }

}
