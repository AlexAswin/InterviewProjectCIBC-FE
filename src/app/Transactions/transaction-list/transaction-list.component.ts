import { Component, TemplateRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { TransactionService } from '../../transaction.service';
import { NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [TransactionDetailsComponent,NgForOf, RouterModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {

  @ViewChild('childRef') transactionDetailsComponent!: TransactionDetailsComponent;

  ShowTransactionDetails: boolean = false;
  transactionList: any = []
  transactionDetails: any
  

  public modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { centered: true, fullscreen: true });
  }

  constructor(private transactionservice: TransactionService) { }


  ngOnInit() {
    this.transactionList = this.transactionservice.getTransactionsList();
  }

  OnViewDetails(transaction: any) {
    this.transactionDetails = transaction;
    this.transactionservice.transactionIdSource.next(transaction.id);
  }

}


