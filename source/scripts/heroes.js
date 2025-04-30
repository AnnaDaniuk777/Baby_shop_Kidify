const names = ['Zarion', 'Avalon', 'Shifu', 'Goudji', 'Jinshi', 'Clorinda', 'Mavuika', 'Klee', 'Raiden', 'Gendalph'];
const races = ['human', 'elf', 'orc'];
const categories = ['mage', 'archer', 'warrior'];
const mages = ['fire', 'ice', 'wind'];
const archers = ['bow', 'crossbow'];
const warriors = ['swordsman', 'assassin', 'spearman'];
let sortedLevel = 1;
const sortedHealth = 1;
let sortParameter = '';

// Генерация случайного числа в заданном диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//Генерация случайного элемента в заданном диапазоне
function getRandomArrayItem(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

//Генерация категории героя
const getSubType = (category) => {
  switch (category) {
    case 'mage': return getRandomArrayItem(mages);
    case 'archer': return getRandomArrayItem(archers);
    case 'warrior': return getRandomArrayItem(warriors);
    default: return null;
  }
};

//Генерация здоровья героя в зависимости от категории героя
const getHealthByType = (category) => {
  switch (category) {
    case 'mage': return getRandomInteger(50, 100);
    case 'archer': return getRandomInteger(70, 120);
    case 'warrior': return (120, 200);
    default: return null;
  }
};

//Генерация силы героя в зависимости от категории героя
const getStrengthByType = (category) => {
  switch (category) {
    case 'mage': return getRandomInteger(10, 40);
    case 'archer': return getRandomInteger(20, 50);
    case 'warrior': return getRandomInteger(50, 100);
    default: return null;
  }
};

//Генерация выносливости в зависимости от категории героя
const getEnduranceByType = (category) => {
  switch (category) {
    case 'mage': return getRandomInteger(20, 60);
    case 'archer': return getRandomInteger(30, 70);
    case 'warrior': return getRandomInteger(60, 120);
    default: return null;
  }
};

//Генерация ловкости в зависимости от категории героя
const getAgilityByType = (category) => {
  switch (category) {
    case 'mage': return getRandomInteger(30, 80);
    case 'archer': return getRandomInteger(50, 100);
    case 'warrior': return getRandomInteger(20, 60);
    default: return null;
  }
};

//Генерация интеллекта в зависимости от категории героя
const getIntelligenceByType = (category) => {
  switch (category) {
    case 'mage': return getRandomInteger(60, 100);
    case 'archer': return getRandomInteger(20, 60);
    case 'warrior': return getRandomInteger(10, 40);
    default: return null;
  }
};

//Генерация маны в зависимости от категории героя
const getManaByType = (category) => {
  switch (category) {
    case 'mage': return getRandomInteger(100, 200);
    case 'archer': return getRandomInteger(0, 20);
    case 'warrior': return getRandomInteger(0, 10);
    default: return null;
  }
};

//Создание массива героев
function createHero (heroQuantity) {
  const heroes = [];

  for (let i = 1; i <= heroQuantity; i++) {
    const category = getRandomArrayItem(categories);

    const hero = {
      name: getRandomArrayItem(names),
      race: getRandomArrayItem(races),
      category: category,
      subType: getSubType(category),
      health: getHealthByType(category),
      strength: getStrengthByType(category),
      endurance: getEnduranceByType(category),
      agility: getAgilityByType(category),
      intelligence: getIntelligenceByType(category),
      mana: getManaByType(category),
      level: getRandomInteger(1, 50),
      luck: getRandomInteger(1, 100),
      fame: getRandomInteger(0, 500),
      alive: Math.random() < 0.8
    };

    heroes.push(hero);
  }

  return heroes;
}

// createHero(10);

//Генерируем боевой отряд
const generateBattleSquad = (heroesArray) => {
  const squadMage = heroesArray.filter((hero) => hero.category === 'mage');
  const squadArcher = heroesArray.filter((hero) => hero.category === 'archer');
  const squadWarrior = heroesArray.filter((hero) => hero.category === 'warrior');
  const number = getRandomInteger(3, heroesArray.length);

  if (squadMage.length === 0 ?? squadArcher.length === 0 ?? squadWarrior.length === 0) {
    alert('Отряд не может быть составлен');

    return null;
  }

  const newArray = [getRandomArrayItem(squadMage), getRandomArrayItem(squadArcher), getRandomArrayItem(squadWarrior)];

  while (newArray.length < number) {
    const lastHeroes = heroesArray.filter((hero) => !newArray.includes(hero));
    newArray.push(getRandomArrayItem(lastHeroes));
  }

  return newArray;
};

//Находим элементы из разметки
const battleSquad = generateBattleSquad(createHero(25));
const heroTableBody = document.getElementById('hero-table-body');
const categoryFilter = document.querySelector('.category__filter');

//Выводим список на страницу
const displayHeroes = (heroes) => {
  heroTableBody.innerHTML = '';

  // Сортируем сначала по категории, затем по уровню
  const sortedHeroes = [...heroes].sort((a, b) => {
    // Сначала сравниваем категории
    const categoryCompare = a.category.localeCompare(b.category);
    if (categoryCompare !== 0) {
      return categoryCompare;
    }

    if (sortParameter === 'level') {
      return (a.level - b.level) * sortedLevel;
    } else if (sortParameter === 'health') {
      return (a.health - b.health) * sortedHealth;
    }
  });

  let currentCategory = null;

  sortedHeroes.forEach((hero) => {
    // Добавляем заголовок категории, если она изменилась
    if (hero.category !== currentCategory) {
      currentCategory = hero.category;
      const categoryRow = document.createElement('tr');
      categoryRow.classList.add('category-header');
      categoryRow.style.backgroundColor = '#add8e6';
      categoryRow.innerHTML = `
        <td colspan="14">${getCategoryName(currentCategory).toUpperCase()}</td>
      `;
      heroTableBody.append(categoryRow);
    }

    const heroRow = document.createElement('tr');
    heroRow.classList.add('hero.category');
    heroRow.innerHTML = `
      <td>${hero.name}</td>
          <td>${hero.race}</td>
          <td>${hero.category}</td>
          <td>${hero.subType}</td>
          <td class="level-column">${hero.level}</td>
          <td class="hero-health">${hero.health}</td>
          <td>${hero.strength}</td>
          <td>${hero.endurance}</td>
          <td>${hero.agility}</td>
          <td>${hero.intelligence}</td>
          <td>${hero.mana}</td>
          <td>${hero.luck}</td>
          <td>${hero.fame}</td>
          <td>${hero.alive ? 'Да' : 'Нет'}</td>
        `;
    heroTableBody.append(heroRow);
  });
};

displayHeroes(battleSquad);

//Для читаемости категории в таблице
function getCategoryName(category) {
  switch (category) {
    case 'mage': return 'Маги';
    case 'archer': return 'Лучники';
    case 'warrior': return 'Воины';
    default: return category;
  }
}

//Фильтруем наш отряд по категории
const applyFilter = () => {
  const selectedCategory = categoryFilter.value;
  let filteredHeroes;

  if (selectedCategory) {
    filteredHeroes = battleSquad.filter((hero) => hero.category === selectedCategory);
  } else {
    filteredHeroes = [...battleSquad];
  }

  displayHeroes(filteredHeroes);
};

const sortByLevel = () => {
  sortParameter = 'level';
  sortedLevel *= -1;
  applyFilter();
};

const sortByHealth = () => {
  sortParameter = 'health';
  sortedLevel *= -1;
  applyFilter();
};

const levelHeader = document.querySelector('.hero-table th:nth-child(5)');
levelHeader.addEventListener('click', sortByLevel);
levelHeader.style.cursor = 'pointer';

const healthHeader = document.querySelector('.hero-table th:nth-child(6)');
healthHeader.addEventListener('click', sortByHealth);
healthHeader.style.cursor = 'pointer';

categoryFilter.addEventListener('change', applyFilter);


displayHeroes(battleSquad);
