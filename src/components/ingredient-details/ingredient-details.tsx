import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '@store';
import { useLocation, useParams } from 'react-router-dom';
import {
  fetchIngredientsThunk,
  hideDetails,
  viewDetails
} from '@slices/ingredients/Ingredients';

type TParams = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id: ingredientId } = useParams<TParams>();
  const ingredientData = useSelector(
    (state) => state.ingredients.moreDetailsIngredient
  );
  const ingredients = useSelector((state) => state.ingredients.data);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredientsThunk());
    }

    if (location.pathname.startsWith('/ingredients/')) {
      const ingredient = ingredients.find(
        (ingredient) => ingredient._id === ingredientId
      );

      if (ingredient) {
        dispatch(viewDetails(ingredient));
      }
    }
  }, [location.pathname, ingredientId, ingredients, dispatch]);

  useEffect(
    () => () => {
      dispatch(hideDetails());
    },
    [dispatch]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
