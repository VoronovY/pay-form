export const isValidPanFunc = (pan, setPanErr) => {
  const regExp = /\D/g;
  const isNotDig = regExp.test(pan);

  if (pan.length < 13 || pan.length > 19 || isNotDig) {
    setPanErr("Введите от 13 до 19 цифр");
    if (!pan) {
      setPanErr("Поле не может быть пустым");
    }
  } else {
    setPanErr("");
  }
};

export const isValidExpireFunc = (expire, setExpireErr) => {
  const regExp = /^(0[1-9]|1[0-2])\/2[2-6]/;
  const isValidExpire = regExp.test(expire);
  if (isValidExpire) {
    setExpireErr("");
  } else {
    setExpireErr("Неверные данные");
  }
};

export const isValidCardHolderFunc = (cardHolder, setCardHolderErr) => {
  const regExp = /^[A-ZА-Я]+\s[A-ZА-Я]+$/;
  const isSpaceInCardHolder = regExp.test(cardHolder);
  if (isSpaceInCardHolder) {
    setCardHolderErr("");
  } else {
    setCardHolderErr("Введите имя и фамилию");
  }
};

export const isValidCvcFunc = (cvc, setCvcErr) => {
  const regExp = /^\d\d\d$/;
  const isCvcValid = regExp.test(cvc);
  if (isCvcValid) {
    setCvcErr("");
  } else {
    setCvcErr("Не верный код");
  }
};
