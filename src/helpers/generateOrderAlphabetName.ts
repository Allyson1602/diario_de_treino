const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));

export const generateOrderAlphabetName = (name: string) => {
  const nameSplit = name.split(" ");
  const lastNameItemIndex = nameSplit.length - 1;
  const lastLetterName = nameSplit[lastNameItemIndex][nameSplit[lastNameItemIndex].length - 1];

  // caso já exista um identificador alfabético
  if (alphabet.includes(lastLetterName)) {
    const letterAlphabet = alphabet.indexOf(lastLetterName);

    const nextLetter = alphabet[letterAlphabet + 1];

    // se estiver na última letra do alfabeto, retorna para o 'A' e adicionar mais um 'A'. Ex.: Z => AA => AB ... AZ => AAA
    if (name.endsWith(alphabet[alphabet.length - 1])) {
      return name.slice(0, name.length - 1) + alphabet[0] + alphabet[0];
    }

    // substitui a última letra pela letra seguinte do alfabeto
    return name.slice(0, name.length - 1) + nextLetter;
  } else {
    // caso ainda não exista um identificador alfabético
    return name + " " + alphabet[0];
  }
};
