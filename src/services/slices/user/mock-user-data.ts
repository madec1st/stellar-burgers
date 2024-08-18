import { userInitialState } from './User';

export const initialState = userInitialState;

export const loginDataMock = {
  email: 'moskvich@mail.ru',
  name: 'Сергей'
};

export const updateDataMock = {
  email: 'moskvich88@mail.ru',
  name: 'Серёга'
};

export const userOrdersMock = [
  {
    _id: 'rhg564red85h6t1cf',
    status: 'done',
    name: 'Марсианские луковые кольца с соусом',
    createdAt: '12.06.2024 11:32:30',
    updatedAt: '12.06.2024 11:36:27',
    number: 5221,
    ingredients: [
      {
        _id: '78gd4g85dr44',
        name: 'Луковые кольца с марсианскими специями',
        type: 'main',
        proteins: 38,
        fat: 30,
        carbohydrates: 42,
        calories: 36,
        price: 849,
        image: 'https://code.s3.yandex.net/react/code/onion-02.png',
        image_large:
          'https://code.s3.yandex.net/react/code/onion-02-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/onion-02-large.png'
      },
      {
        _id: '7gfeg4r7g74sesb',
        name: 'Лунный соус',
        type: 'sauce',
        proteins: 17,
        fat: 48,
        carbohydrates: 63,
        calories: 152,
        price: 355,
        image: 'https://code.s3.yandex.net/react/code/moon-sauce-01.png',
        image_large:
          'https://code.s3.yandex.net/react/code/moon-sauce-01-mobile.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/moon-sauce-01-large.png'
      }
    ]
  },
  {
    _id: 'ntyjf56tyhdthg551',
    status: 'done',
    name: 'Марсианские луковые кольца с соусом',
    createdAt: '13.07.2024 19:12:30',
    updatedAt: '13.07.2024 19:19:27',
    number: 6954,
    ingredients: [
      {
        _id: '78gd4g85dr44',
        name: 'Луковые кольца с марсианскими специями',
        type: 'main',
        proteins: 38,
        fat: 30,
        carbohydrates: 42,
        calories: 36,
        price: 849,
        image: 'https://code.s3.yandex.net/react/code/onion-02.png',
        image_large:
          'https://code.s3.yandex.net/react/code/onion-02-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/onion-02-large.png'
      },
      {
        _id: '7gfeg4r7g74sesb',
        name: 'Лунный соус',
        type: 'sauce',
        proteins: 17,
        fat: 48,
        carbohydrates: 63,
        calories: 152,
        price: 355,
        image: 'https://code.s3.yandex.net/react/code/moon-sauce-01.png',
        image_large:
          'https://code.s3.yandex.net/react/code/moon-sauce-01-mobile.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/moon-sauce-01-large.png'
      }
    ]
  }
];
