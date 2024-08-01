import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { useLocation, useParams } from 'react-router-dom';
import { hideDetails, viewDetails } from '@slices/Ingredients';

type TParams = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { id: ingredientId } = useParams<TParams>();
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.moreDetailsIngredient
  );
  const ingredients = useSelector((state: RootState) => state.ingredients.data);

  useEffect(() => {
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
