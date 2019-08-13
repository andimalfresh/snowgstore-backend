'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Products', [
    {
      "id": 1,
      "name": "3 UP 3 DOWN",
      "description": "Stick tri color snapback ready for the field",
      "price": 1999,
      "img_Url": "https://assets.bigcartel.com/product_images/237681113/3C4E499E-F888-44C2-9809-C109B10F73ED.jpeg?auto=format&fit=max&w=1000",
      "category_id": 2,
   },
   {
    "id": 2,
    "name": "Alley Cat",
    "description": "Your go to black and leopard print snap back for when your on the prowl",
    "price": 1999,
    "img_Url": "https://assets.bigcartel.com/product_images/226775344/IMG_0582.jpg?auto=format&fit=max&w=1500",
    "category_id": 2,
   },
   {
    "id": 3,
    "name": "Leiutenant Dan",
    "description": "Snap back ready to wear in the streets or the bush",
    "price": 3499,
    "img_Url": "https://assets.bigcartel.com/product_images/226775995/IMG_0438.jpg?auto=format&fit=max&w=1500",
    "category_id": 2,
   },   {
    "id": 4,
    "name": "The Outdoorsman",
    "description": "2019 Spring Hoodie for those seeking new adventures off the beaten path",
    "price": 4000,
    "img_Url": "https://assets.bigcartel.com/product_images/229292195/8764C1E3-44F3-4D37-A6C0-AA6F32AE93D1.jpeg?auto=format&fit=max&w=1500",
    "category_id": 1,
    }],
   {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Products', null, {});
  }
};
