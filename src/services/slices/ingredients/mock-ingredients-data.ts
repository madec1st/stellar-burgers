import { ingredientInitialState } from "./Ingredients";

export const initialState = ingredientInitialState;

export const payloadMock = [
  {
    _id: '643d69a5c3f7b9001cfa093c', 
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e', 
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    _id: '643vr5grd2g1frve', 
    name: 'Салат из марсианских водорослей',
    type: 'main',
    proteins: 30,
    fat: 6,
    carbohydrates: 15,
    calories: 78,
    price: 665,
    image: 'https://code.s3.yandex.net/react/code/salad-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-02-mobile.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-02-large.png'
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
    image_large: 'https://code.s3.yandex.net/react/code/moon-sauce-01-mobile.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/moon-sauce-01-large.png'
  }
]

export const fillingMock = {
  _id: '643d69a5c3f7b9001cfa093e', 
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  id: 'test_id_123'
}

export const bunMock = {
  _id: '643d69a5c3f7b9001cfa093c', 
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'test_id_234'
}

export const selectedFillingMock = {
  ...initialState,
  selected: {
    ...initialState.selected,
    filling: [
      {
        _id: '643d69a5c3f7b9001cfa093e', 
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: 'test_id_123'
      },
      {
        _id: '643vr5grd2g1frve', 
        name: 'Салат из марсианских водорослей',
        type: 'main',
        proteins: 30,
        fat: 6,
        carbohydrates: 15,
        calories: 78,
        price: 665,
        image: 'https://code.s3.yandex.net/react/code/salad-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-02-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-02-large.png',
        id: 'test_id_124'
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
        image_large: 'https://code.s3.yandex.net/react/code/moon-sauce-01-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/moon-sauce-01-large.png',
        id: 'test_id_125'
      }
    ]
  }
}

export const expectedFillingState = {
  ...initialState,
  selected: {
    ...initialState.selected,
    filling: [
      ...initialState.selected.filling,
      fillingMock
    ]
  }
}

export const expectedBunState = {
  ...initialState,
  selected: {
    ...initialState.selected,
    bun: bunMock
  }
}

export const expectedStateWithMovedUp = {
  ...initialState,
  selected: {
    ...initialState.selected,
    filling: [
      {
        _id: '643d69a5c3f7b9001cfa093e', 
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: 'test_id_123'
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
        image_large: 'https://code.s3.yandex.net/react/code/moon-sauce-01-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/moon-sauce-01-large.png',
        id: 'test_id_125'
      },
      {
        _id: '643vr5grd2g1frve', 
        name: 'Салат из марсианских водорослей',
        type: 'main',
        proteins: 30,
        fat: 6,
        carbohydrates: 15,
        calories: 78,
        price: 665,
        image: 'https://code.s3.yandex.net/react/code/salad-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-02-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-02-large.png',
        id: 'test_id_124'
      }
    ]
  }
}

export const expectedStateWithMovedDown = {
  ...initialState,
  selected: {
    ...initialState.selected,
    filling: [
      {
        _id: '643vr5grd2g1frve', 
        name: 'Салат из марсианских водорослей',
        type: 'main',
        proteins: 30,
        fat: 6,
        carbohydrates: 15,
        calories: 78,
        price: 665,
        image: 'https://code.s3.yandex.net/react/code/salad-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-02-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-02-large.png',
        id: 'test_id_124'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e', 
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: 'test_id_123'
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
        image_large: 'https://code.s3.yandex.net/react/code/moon-sauce-01-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/moon-sauce-01-large.png',
        id: 'test_id_125'
      }
    ]
  }
}

export const expectedStateWithRemovedIngredient = {
  ...initialState,
  selected: {
    ...initialState.selected,
    filling: [
      {
        _id: '643vr5grd2g1frve', 
        name: 'Салат из марсианских водорослей',
        type: 'main',
        proteins: 30,
        fat: 6,
        carbohydrates: 15,
        calories: 78,
        price: 665,
        image: 'https://code.s3.yandex.net/react/code/salad-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-02-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-02-large.png',
        id: 'test_id_124'
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
        image_large: 'https://code.s3.yandex.net/react/code/moon-sauce-01-mobile.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/moon-sauce-01-large.png',
        id: 'test_id_125'
      }
    ]
  }
}