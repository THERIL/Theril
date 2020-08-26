class Item {
  constructor() {
    this.price = 1;
  }
}

class Food extends Item {
  constructor(price) {
    super(price);
    this.name = "Food";
  }
}

class Clothing extends Item {
  constructor(price) {
    super(price);
    this.name = "Clothing";
  }
}

class Jewelry extends Item {
  constructor(price) {
    super(price);
    this.name = "Jewelry";
  }
}

module.exports = { Food, Clothing, Jewelry };
