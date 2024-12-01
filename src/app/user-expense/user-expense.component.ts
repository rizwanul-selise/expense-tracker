import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-expense',
  templateUrl: './user-expense.component.html',
  styleUrls: ['./user-expense.component.css']
})
export class UserExpenseComponent implements OnInit {
  val:boolean=false;
  expenses: any[] = [];
  totalExpense:number=0;
  showSummary:boolean = false;
  editingIndex: number | null = null;

  constructor() { }
  expense = {
    amount: null,
    date: '',
    category: ''
  };

  openModal(){
    this.val=true;
  }
  openSummary(){
    this.showSummary=true;
  }

  onSubmit(event:any){
    event.preventDefault();
    if (this.expense.amount && this.expense.date && this.expense.category) {
      this.expenses.push({ ...this.expense });

    // Save the updated list to localStorage
    localStorage.setItem('expenses', JSON.stringify(this.expenses));

    console.log('Form Submitted and Saved:', this.expense);
    this.calculateTotal();
    // Reset the form
    this.expense = {
      amount: null,
      date: '',
      category: ''
    }
    this.val=false;
  }
    else {
      console.log('Please fill all fields');
  }
}

toggleSummary(): void {
  this.showSummary = !this.showSummary; // Show or hide the summary box
}

  ngOnInit(): void {
    this.showSummary=true;
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.expenses = storedExpenses;
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.totalExpense = this.expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
  }
  editExpense(index: number): void {
    this.expense = { ...this.expenses[index] };
    this.editingIndex = index; // Remove it temporarily for editing
  }
  deleteExpense(index: number): void {
    this.expenses.splice(index, 1); // Remove the expense at the specified index
    localStorage.setItem('expenses', JSON.stringify(this.expenses)); // Update localStorage
    this.calculateTotal(); // Recalculate the total amount
  }

}
