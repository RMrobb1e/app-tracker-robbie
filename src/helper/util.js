import { isoCountries } from './countryCode';

export const limitCountryTitle = (title, limit = 11) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

// eslint-disable-next-line consistent-return
export const getCode = countryName => {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in isoCountries) {
    // eslint-disable-next-line no-prototype-builtins
    if (isoCountries.hasOwnProperty(prop)) {
      if (isoCountries[prop].cname.indexOf(countryName) !== -1) {
        return isoCountries[prop].ccode;
        break;
      }
    }
  }
};
