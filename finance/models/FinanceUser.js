export default class User {
  constructor(user, userId) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.id = userId;
    this.netWorth = user.netWorth;
  }

  setFirstname(firstname) {
    this.firstname = firstname;
  }

  setLastname(lastname) {
    this.lastname = lastname;
  }

  setEmail(email) {
    this.email = email;
  }

  setID(id) {
    this.id = id;
  }

  setNetWorth(netWorth) {
    this.netWorth = netWorth;
  }
}
