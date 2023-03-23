export default class Expense {
  constructor(expense, owner) {
    this.name = expense.name;
    this.description = expense.description;
    this.amount = expense.amount;
    this.id = expense.id;
    if (expense.date) {
      this.date = new Date(expense.date);
    }
    if (expense.type) this.type = expense.type;
    else if (expense.amount < 0) {
      this.type = 'income';
      this.amount *= -1;
    } else this.type = 'expense';
    this.owner = owner;
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  setId(id) {
    this.id = id;
  }
}
