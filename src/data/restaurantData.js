export const restaurantsData = [
  {
    restaurantName: "Mc Donalds",
    farAway: "21.2",
    businessAddress: "22 Bessie street, Cape Town",
    images: require('../../assets/images/restaurants/mac.png'),
    averageReview: 4.9,
    numberOfReview: 272,
    coordinates: { lat: -26.1888612, lng: 28.246325 },
    discount: 10,
    deliveryTime: 15,
    collectTime: 5,
    foodType: "Burgers, Wraps, Milkshakes...",
    productData: [
      { id: 1, name: "Hand cut chips", price: 29.30, image: require('../../assets/images/product/handcutchip.png') },
      { id: 2, name: "Big Mac", price: 50.80, image: require('../../assets/images/product/chickenbuger.png') },
      { id: 3, name: "Chicken Burger", price: 70, image: require('../../assets/images/product/bicmac.png') }
    ],
    id: 1
  },
  {
    restaurantName: "KFC",
    farAway: "12.7",
    businessAddress: "22 Bessie street, Cape Town",
    images: require('../../assets/images/restaurants/kfc.png'),
    averageReview: 4.3,
    numberOfReview: 306,
    coordinates: { lat: -26.1891648, lng: 28.2441808 },
    discount: 20,
    deliveryTime: 30,
    collectTime: 10,
    foodType: "Chicken, Chicken wings...",
    productData: [
      { id: 4, name: "Original Recipe Chicken", price: 29.30, image: require('../../assets/images/product/chick.png') },
      { id: 5, name: "Extra Crispy Chicken", price: 50.80, image: require('../../assets/images/product/spicychick.png') },
      { id: 6, name: "Spicy Chicken Sandwich", price: 70, image: require('../../assets/images/product/spicychicksand.png') }
    ],
    id: 2
  },
  {
    restaurantName: "Steers",
    farAway: "5",
    businessAddress: "17 Olivia Rd, Johannesburg",
    images: require('../../assets/images/restaurants/steers.png'),
    coordinates: { lat: -26.1886781, lng: 28.244879 },
    averageReview: 4.9,
    numberOfReview: 1272,
    discount: 12,
    deliveryTime: 25,
    collectTime: 15,
    foodType: "Flame grilled beef Burgers",
    productData: [
      { id: 7, name: "Hawaiian Classic Cheese", price: 29.30, image: require('../../assets/images/product/hawail.png') },
      { id: 8, name: "Chilli Cheese", price: 50.80, image: require('../../assets/images/product/chillichease.png') },
      { id: 9, name: "Steers®", price: 70, image: require('../../assets/images/product/steers.png') }
    ],
    id: 3
  },
  {
    restaurantName: "Roman Pizza",
    farAway: "7",
    businessAddress: "15 Atlas Rd, Kempton Park",
    images: require('../../assets/images/restaurants/pizzahut.png'),
    averageReview: 4.3,
    numberOfReview: 700,
    coordinates: { lat: -26.1845336, lng: 28.2481691 },
    discount: null,
    deliveryTime: 20,
    collectTime: 10,
    foodType: "Chicken pizza, Vegetarian pizza...",
    productData: [
      { id: 10, name: "Mushroom Margherita (SAVA FLAVA)", price: 29.30, image: require('../../assets/images/product/mushroom.png') },
      { id: 11, name: "MARGHERITA", price: 50.80, image: require('../../assets/images/product/MARGHERITA.png') },
      { id: 12, name: "GREEK", price: 70, image: require('../../assets/images/product/greek.png') }
    ],
    id: 4
  },
  {
    restaurantName: "Starbucks",
    farAway: "8.2",
    businessAddress: "18 Green Ave, Cape Town",
    images: require('../../assets/images/restaurants/starbuck.png'),
    averageReview: 4.7,
    numberOfReview: 980,
    coordinates: { lat: -26.193611, lng: 28.233332 },
    discount: 15,
    deliveryTime: 10,
    collectTime: 5,
    foodType: "Coffee, Pastries, Sandwiches",
    productData: [
      { id: 13, name: "Cappuccino", price: 35.00, image: require('../../assets/images/product/capuchino.png') },
      { id: 14, name: "Cheese Croissant", price: 25.00, image: require('../../assets/images/product/chease.png') },
      { id: 15, name: "Iced Latte", price: 40.00, image: require('../../assets/images/product/icedlate.png') }
    ],
    id: 5
  },
  {
    restaurantName: "Domino's Pizza",
    farAway: "14.5",
    businessAddress: "33 High St, Johannesburg",
    images: require('../../assets/images/restaurants/domino.png'),
    averageReview: 4.6,
    numberOfReview: 560,
    coordinates: { lat: -26.2108612, lng: 28.266325 },
    discount: 20,
    deliveryTime: 25,
    collectTime: 10,
    foodType: "Pizza, Pasta, Beverages",
    productData: [
      { id: 16, name: "Pepperoni Pizza", price: 89.90, image: require('../../assets/images/product/pizza.png') },
      { id: 17, name: "Cheesy Garlic Bread", price: 45.00, image: require('../../assets/images/product/garlicbread.png') },
      { id: 18, name: "Coca Cola", price: 18.00, image: require('../../assets/images/product/cocacola.png') }
    ],
    id: 6
  },
  {
    restaurantName: "The Dessert Palace",
    farAway: "5.6",
    businessAddress: "20 Palm St, Durban",
    images: require('../../assets/images/restaurants/dessert.png'),
    averageReview: 4.8,
    numberOfReview: 350,
    coordinates: { lat: -29.8579, lng: 31.0292 },
    discount: null,
    deliveryTime: 15,
    collectTime: 10,
    foodType: "Cakes, Ice Cream, Milkshakes",
    productData: [
      { id: 19, name: "Chocolate Cake", price: 70.00, image: require('../../assets/images/product/cake.png') },
      { id: 20, name: "Vanilla Ice Cream", price: 40.00, image: require('../../assets/images/product/vanila.png') },
      { id: 21, name: "Strawberry Milkshake", price: 45.00, image: require('../../assets/images/product/milk.png') }
    ],
    id: 7
  },
  {
    restaurantName: "Nando's",
    farAway: "9.1",
    businessAddress: "17 Flame St, Pretoria",
    images: require('../../assets/images/restaurants/nandos.png'),
    averageReview: 4.5,
    numberOfReview: 800,
    coordinates: { lat: -25.7461, lng: 28.1881 },
    discount: 10,
    deliveryTime: 20,
    collectTime: 10,
    foodType: "Grilled Chicken, Peri-Peri Sauce",
    productData: [
      { id: 22, name: "Peri-Peri Chicken", price: 120.00, image: require('../../assets/images/product/chicken.png') },
      { id: 23, name: "Spicy Rice", price: 30.00, image: require('../../assets/images/product/rice.png') },
      { id: 24, name: "Garlic Bread", price: 25.00, image: require('../../assets/images/product/garlicbread.png') }
    ],
    id: 8
  },
  {
    restaurantName: "Sushi World",
    farAway: "3.9",
    businessAddress: "45 Sashimi Rd, Cape Town",
    images: require('../../assets/images/restaurants/sushi.png'),
    averageReview: 4.9,
    numberOfReview: 540,
    coordinates: { lat: -26.1891648, lng: 28.2471808 },
    discount: 15,
    deliveryTime: 15,
    collectTime: 5,
    foodType: "Sushi, Sashimi, Tempura",
    productData: [
      { id: 25, name: "Salmon Sushi", price: 80.00, image: require('../../assets/images/product/sushi.png') },
      { id: 26, name: "Prawn Tempura", price: 100.00, image: require('../../assets/images/product/pawn.png') },
      { id: 27, name: "Miso Soup", price: 60.00, image: require('../../assets/images/product/suop.png') }
    ],
    id: 9
  }
];
