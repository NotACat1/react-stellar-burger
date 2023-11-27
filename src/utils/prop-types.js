import PropTypes from 'prop-types';

const imageUrlRegex = /^(https?:\/\/)(.+)\/(.*[a-z0-9].(jpeg|jpg|gif|png))$/;
const validateImageProp = (props, propName, componentName) => {
  const value = props[propName];
  if (!imageUrlRegex.test(value)) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. It should be a valid image URL starting with "http" or "https" and ending with a valid image format (jpeg, jpg, gif, or png).`,
    );
  }
};

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: validateImageProp,
  image_mobile: validateImageProp,
  image_large: validateImageProp,
  __v: PropTypes.number.isRequired,
});
