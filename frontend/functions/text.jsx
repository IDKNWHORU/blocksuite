export const concatText = (textArray) => {
  let result = "";

  for (const { insert } of textArray) {
    result += insert;
  }

  return result;
};
