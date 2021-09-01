import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { changeFormData } from "../../redux/actions/form";
import { useDispatch, useSelector } from "react-redux";
import "./PayForm.scss";

const isValidPanFunc = (pan, setIsValidPanFn, setPanErr) => {
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

const isValidExpireFunc = (expire, setExpireErr) => {
  const regExp = /^(0[1-9]|1[0-2])\/2[2-6]/;
  const isValidExpire = regExp.test(expire);
  if (isValidExpire) {
    setExpireErr("");
  } else {
    setExpireErr("Неверные данные");
  }
};

const isValidCardHolderFunc = (cardHolder, setCardHolderErr) => {
  const regExp = /^[A-ZА-Я]+\s[A-ZА-Я]+$/;
  const isSpaceInCardHolder = regExp.test(cardHolder);
  if (isSpaceInCardHolder) {
    setCardHolderErr("");
  } else {
    setCardHolderErr("Введите имя и фамилию");
  }
};

const isValidCvcFunc = (cvc, setCvcErr) => {
  const regExp = /^\d\d\d$/;
  const isCvcValid = regExp.test(cvc);
  if (isCvcValid) {
    setCvcErr("");
  } else {
    setCvcErr("Не верный код");
  }
};

export default function PayForm() {
  const dispatch = useDispatch();
  const formDataInit = useSelector((state) => state.curFormData);
  const [formData, setFormData] = useState(formDataInit);
  const [isValidPan, setIsValidPan] = useState(false);
  const [panDirty, setPanDirty] = useState(false);
  const [expireDirty, setExpireDirty] = useState(false);
  const [cardHolderDirty, setCardHolderDirty] = useState(false);
  const [cvcDirty, setCvcDirty] = useState(false);

  const [panErr, setPanErr] = useState("Поле не может быть пустым");
  const [expireErr, setExpireErr] = useState("Поле не может быть пустым");
  const [cardHolderErr, setCardHolderErr] = useState(
    "Поле не может быть пустым"
  );
  const [cvcErr, setCvcErr] = useState("Поле не может быть пустым");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (panErr || expireErr || cardHolderErr || cvcErr) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [panErr, expireErr, cardHolderErr, cvcErr]);

  function maskForPan(pan) {
    if (pan.length > 0) {
      const res = pan
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        .join(" ");
      return res;
    }
  }

  function maskForExpire(expire) {
    if (expire.length > 0) {
      const res = expire
        .replace(/[/]/g, "")
        .match(/.{1,2}/g)
        .join("/")
        .slice(0, 5);
      return res;
    }
  }

  function onFormChange(e) {
    const keyVal = e.target.name;
    const valueVal = e.target.value;

    if (keyVal === "cardholder") {
      const valueValUpperCase = valueVal.toUpperCase();
      isValidCardHolderFunc(valueValUpperCase, setCardHolderErr);
      setFormData((prev) => {
        return {
          ...prev,
          params: { ...prev.params, [keyVal]: valueValUpperCase },
        };
      });
    } else if (keyVal === "pan") {
      const ValueWithoutSpace = valueVal.replace(/\s/g, "");
      isValidPanFunc(ValueWithoutSpace, setIsValidPan, setPanErr);

      setFormData((prev) => {
        return {
          ...prev,
          params: { ...prev.params, [keyVal]: ValueWithoutSpace },
        };
      });
    } else {
      switch (keyVal) {
        case "expire": {
          isValidExpireFunc(valueVal, setExpireErr);
        }
        case "cvc": {
          isValidCvcFunc(valueVal, setCvcErr);
        }
        default: {
          break;
        }
      }
      setFormData((prev) => {
        return {
          ...prev,
          params: { ...prev.params, [keyVal]: valueVal },
        };
      });
    }
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case "pan": {
        setPanDirty(true);
        break;
      }
      case "cardholder": {
        setCardHolderDirty(true);
        break;
      }
      case "expire": {
        setExpireDirty(true);
        break;
      }
      case "cvc": {
        setCvcDirty(true);
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <form className="pay-form">
      <div className="pay-form__title">Оплата банковской картой </div>
      <div className="pay-form__main">
        <div className="pay-form__card-number">
          <label className="pay-form__label-text" htmlFor="card-number">
            Номер карты
            {panErr && panDirty ? (
              <span className="failed">{panErr}</span>
            ) : null}
          </label>
          <input
            name="pan"
            onBlur={blurHandler}
            onChange={onFormChange}
            value={maskForPan(formData.params.pan) || ""}
            className={`pay-form__input ${
              isValidPan ? "" : "pay-form__input--failed"
            }`}
            type="text"
            id="card-number"
            placeholder="0000 0000 0000 0000"
          />
        </div>
        <div className="pay-form__date-code">
          <div className="pay-form__month-year">
            <label className="pay-form__label-text" htmlFor="month-year">
              Месяц/Год
              {expireDirty && expireErr ? (
                <span className="failed">{expireErr}</span>
              ) : null}
            </label>
            <input
              name="expire"
              onBlur={blurHandler}
              onChange={onFormChange}
              value={maskForExpire(formData.params.expire) || ""}
              className="pay-form__input"
              type="text"
              id="month-year"
              placeholder="12/25"
            />
          </div>
          <div className="pay-form__code">
            <label className="pay-form__label-text" htmlFor="code">
              Код
              {cvcDirty && cvcErr ? (
                <span className="failed">{cvcErr}</span>
              ) : null}
            </label>
            <input
              name="cvc"
              onBlur={blurHandler}
              onChange={onFormChange}
              value={formData.params.cvc}
              className="pay-form__input code"
              type="password"
              id="code"
              placeholder="***"
            />
          </div>
        </div>
        <div className="pay-form__card-holder">
          <label className="pay-form__label-text" htmlFor="card-holder">
            Владелец карты
            {cardHolderErr && cardHolderDirty ? (
              <span className="failed">{cardHolderErr}</span>
            ) : null}
          </label>
          <input
            name="cardholder"
            onBlur={blurHandler}
            onChange={onFormChange}
            value={formData.params.cardholder}
            className="pay-form__input pay-form__input--failed"
            type="text"
            id="card-holder"
            placeholder="IVAN IVANOV"
          />
        </div>
        <Link to="/pay/check">
          <button
            onClick={() => {
              dispatch(changeFormData(formData));
            }}
            disabled={!isFormValid}
            className="pay-form__btn"
          >
            Оплатить
          </button>
        </Link>
      </div>
    </form>
  );
}
