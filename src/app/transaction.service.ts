import { Injectable } from '@angular/core';
import { transactionListData } from './MockData'
import { BehaviorSubject, map } from 'rxjs';


export interface Transaction {
  id: any;
  date: string;
  action: string;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})


export class TransactionService {

  private transactions: Transaction[] = transactionListData 
  transactionIdSource = new BehaviorSubject<number | null>(1);  


  public getTransactionsList(): Transaction[] {
    return this.transactions;
  }

  updateTransaction(updatedTransaction: Partial<Transaction>): boolean {
 
    const index = this.transactions.findIndex(transaction => transaction.id === this.transactionIdSource.value);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...updatedTransaction };
      return true;
    }
    return false;
  }

}
