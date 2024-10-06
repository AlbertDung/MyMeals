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
    foodType: "Burgers, Wraps,Milkshakes...",
    productData: [
      { name: "Hand cut chips", price: 29.30, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate5.png" },
      { name: "Big Mac", price: 50.80, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate4.png" },
      { name: "Chicken Burger", price: 70, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate3.png" }
    ],
    id: 0
  },
  {
    restaurantName: "KFC",
    farAway: "12.7",
    businessAddress: "22 Bessie street, Cape Town",
    images: require('../../assets/images/restaurants/kfc.png'), // Sửa lại chỗ này
    averageReview: 4.3,
    numberOfReview: 306,
    coordinates: { lat: -26.1891648, lng: 28.2441808 },
    discount: 20,
    deliveryTime: 30,
    collectTime: 10,
    foodType: "Chicken,Chicken wings...",
    productData: [
      { name: "Hand cut chips", price: 29.30, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate5.png" },
      { name: "Big Mac", price: 50.80, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate4.png" },
      { name: "Chicken Burger", price: 70, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate3.png" }
    ],
    id: 1
  },
  {
    restaurantName: "Steers",
    farAway: "5",
    businessAddress: "17 Olivia Rd, Johannesburg",
    images: require('../../assets/images/restaurants/steers.png'), // Sửa lại chỗ này
    coordinates: { lat: -26.1886781, lng: 28.244879 },
    averageReview: 4.9,
    numberOfReview: 1272,
    discount: 12,
    deliveryTime: 25,
    collectTime: 15,
    foodType: "Flame grilled beef Burgers",
    productData: [
      { name: "Hand cut chips", price: 29.30, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate5.png" },
      { name: "Big Mac", price: 50.80, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate4.png" },
      { name: "Chicken Burger", price: 70, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate3.png" }
    ],
    id: 2
  },
  {
    restaurantName: "Roman Pizza",
    farAway: "7",
    businessAddress: "15 Atlas Rd, Kempton Park",
    images: require('../../assets/images/restaurants/pizzahut.png'), // Sửa lại chỗ này
    averageReview: 4.3,
    numberOfReview: 700,
    coordinates: { lat: -26.1845336, lng: 28.2481691 },
    discount: null,
    deliveryTime: 20,
    collectTime: 10,
    foodType: "Chicken pizza, Vegetarian pizza...",
    productData: [
      { name: "Hand cut chips", price: 29.30, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate5.png" },
      { name: "Big Mac", price: 50.80, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate4.png" },
      { name: "Chicken Burger", price: 70, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate3.png" }
    ],
    id: 3
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
      { name: "Cappuccino", price: 35.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/coffee1.png" },
      { name: "Cheese Croissant", price: 25.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/croissant.png" },
      { name: "Iced Latte", price: 40.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/icedlatte.png" }
    ],
    id: 4
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
      { name: "Pepperoni Pizza", price: 89.90, image: "https://bukasapics.s3.us-east-2.amazonaws.com/pizza.png" },
      { name: "Cheesy Garlic Bread", price: 45.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/garlicbread.png" },
      { name: "Coca Cola", price: 18.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/cocacola.png" }
    ],
    id: 5
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
      { name: "Chocolate Cake", price: 70.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/cake.png" },
      { name: "Vanilla Ice Cream", price: 40.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/icecream.png" },
      { name: "Strawberry Milkshake", price: 45.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/milkshake.png" }
    ],
    id: 6
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
      { name: "Peri-Peri Chicken", price: 120.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/chicken.png" },
      { name: "Spicy Rice", price: 30.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/rice.png" },
      { name: "Garlic Bread", price: 25.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/garlicbread.png" }
    ],
    id: 7
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
      { name: "Salmon Sushi", price: 90.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/sushi.png" },
      { name: "Prawn Tempura", price: 85.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/tempura.png" },
      { name: "Miso Soup", price: 35.00, image: "https://bukasapics.s3.us-east-2.amazonaws.com/misosoup.png" }
    ],
    id: 8
  }
];
