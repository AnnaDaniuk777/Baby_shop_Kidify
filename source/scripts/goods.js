const titles = ['TV', 'mobile', 'dress', 'shirt', 'fiction', 'drama', 'blanket', 'towel', 'ball', 'bycicle'];
const colors = ['yellow', 'orange', 'blue', 'green', 'red', 'black'];
const categories = ['electronics', 'clothing', 'books', 'home', 'sport'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const names = ['Василий', 'Иван', 'Дарья', 'Мария', 'Алексей', 'Сергей', 'Екатерина', 'Виктор', 'Серафим', 'Евгения', 'Юлия', 'Владимир'];
const comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];
const elementsQuantity = 20;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function generateRandomDate(daysAgo) {
  const now = new Date();
  const past = new Date(now);
  past.setDate(now.getDate() - getRandomInteger(0, daysAgo));
  return past.toISOString();
}

function getRandomArrayItem(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function getReview (number) {
  const reviews = [];

  for (let i = 0; i < number; i++) {
    const review = {
      user: getRandomArrayItem(names),
      comment: getRandomArrayItem(comments),
      rating: getRandomInteger(1, 5),
    };

    reviews.push(review);
  }

  return reviews;
}

function createProduct (elementsQuantity) {
  const goods = [];

  for (let i = 1; i <= elementsQuantity; i++) {
    const color = getRandomArrayItem(colors);
    const category = getRandomArrayItem(categories);
    const reviewQuantity = getRandomInteger(0, 5);

    const good = {
      id: i,
      title: getRandomArrayItem(titles),
      price: getRandomInteger(100, 5000),
      image: `https://placehold.co/200x200/${color}/white`,
      category: category,
      likes: getRandomInteger(0, 1000),
      color: color,
      size: category === 'clothing' ? getRandomArrayItem(sizes) : null,
      reviews: getReview(reviewQuantity),
      inStock: Math.random() < 0.5,
      discount: this.price > 3000 ? getRandomInteger(10, 50) : 0,
      createdAt: generateRandomDate(90),
    };

    goods.push(good);
  }

  return goods;
}

const products = createProduct(10);

//Сортируем товары по цене (по возрастанию)
const sortedProducts = [...products].sort((a, b) => a.price - b.price);

function getProducts (products) {
  const tBody = document.querySelector('#table tbody');
  tBody.innerHTML = '';

  products.forEach((product) => {
    const raw = document.createElement('tr');
    raw.innerHTML =
    `
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td><img src="${product.image}" alt="${product.title}"></td>
        <td>${product.category}</td>
        <td>${product.likes}</td>
        <td>${product.color}</td>
        <td>${product.size}</td>
        <td>${product.inStock}</td>
        <td>${product.discount}</td>
        <td>$${product.price}</td>
        <td>${product.createdAt}</td>
    `;

    tBody.append(raw);
  });
}

getProducts(sortedProducts);

