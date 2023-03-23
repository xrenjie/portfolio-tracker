export default class User {
  constructor(user) {
    this.firstname = user.given_name;
    this.lastname = user.family_name;
    this.email = user.email;
    this.id = user.sub;
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
