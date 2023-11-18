let cardData = [{
    "id": 1,
    "title": `Image ${Math.floor(Math.random() * 100)}`,
    "views": `${(Math.random() * 10).toFixed(2)}K`,
    "Likes": `${(Math.random() * 10).toFixed(2)}K`,
    "verified": Math.random() >= 0.5
  },
];
  export default cardData;