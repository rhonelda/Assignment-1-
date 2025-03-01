export class Order {
  constructor(sFrom) {
      this.OrderState = {
          WELCOMING: () => {
              let aReturn = [];
              this.stateCur = this.OrderState.ORDERING;
              aReturn.push("Welcome to Dream Bites! Would you like to see our menu?");
              return aReturn;
          },
          ORDERING: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().includes("yes")) {
                  this.stateCur = this.OrderState.SELECTING;
                  aReturn.push("Menu:");
                  aReturn.push("- Pizza (Sizes: small, medium, large, Toppings: pepperoni, mushrooms, extra cheese)");
                  aReturn.push("- Burger (Sizes: single, double, Toppings: lettuce, tomato, bacon)");
                  aReturn.push("Upsell: Drinks available - soda, water, juice");
                  aReturn.push("What would you like to order?");
              } else {
                  this.stateCur = this.OrderState.DONE;
                  aReturn.push("Thanks for visiting Dream Bites! Maybe next time.");
              }
              return aReturn;
          },
          SELECTING: (sInput) => {
              let aReturn = [];
              let words = sInput.toLowerCase().split(" ");
              for (let item in this.menu) {
                  if (words.includes(item)) {
                      let size = this.menu[item].sizes.find(size => words.includes(size));
                      let topping = this.menu[item].toppings.find(topping => words.includes(topping)) || "no extra toppings";
                      if (size) {
                          this.order.push({ item, size, topping });
                          aReturn.push(`Added ${size} ${item} with ${topping} to your order.`);
                      }
                  }
              }
              aReturn.push("Would you like to add a drink? (soda, water, juice)");
              this.stateCur = this.OrderState.ADDING_DRINK;
              return aReturn;
          },
          ADDING_DRINK: (sInput) => {
              let aReturn = [];
              let drink = this.drinks.find(d => sInput.toLowerCase().includes(d));
              if (drink) {
                  this.order.push({ item: drink });
                  aReturn.push(`Added ${drink} to your order.`);
              }
              this.stateCur = this.OrderState.DONE;
              aReturn.push("Thank you for your order! Your food will be ready soon.");
              return aReturn;
          },
          DONE: () => {
              return ["Your order is complete. Have a great day!"];
          }
      };

      this.stateCur = this.OrderState.WELCOMING;
      this.isDone = false;
      this.sFrom = sFrom;
      this.order = [];
      this.menu = {
          "pizza": { sizes: ["small", "medium", "large"], toppings: ["pepperoni", "mushrooms", "extra cheese"] },
          "burger": { sizes: ["single", "double"], toppings: ["lettuce", "tomato", "bacon"] }
      };
      this.drinks = ["soda", "water", "juice"];
  }

  handleInput(sInput) {
      return this.stateCur(sInput);
  }

  isDone() {
      return this.stateCur === this.OrderState.DONE;
  }
}
