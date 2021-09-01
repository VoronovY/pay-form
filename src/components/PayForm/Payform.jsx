import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { changeFormData } from "../../redux/actions/form";
import { useDispatch, useSelector } from "react-redux";

import {
  isValidCardHolderFunc,
  isValidPanFunc,
  isValidExpireFunc,
  isValidCvcFunc,
} from "../../functions/validFunc";

import { maskForPan, maskForExpire } from "../../functions/maskFunc";

import "./PayForm.scss";

export default function PayForm() {
  const dispatch = useDispatch();
  const formDataInit = useSelector((state) => state.curFormData);
  const [formData, setFormData] = useState(formDataInit);
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
      isValidPanFunc(ValueWithoutSpace, setPanErr);

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
          break;
        }
        case "cvc": {
          isValidCvcFunc(valueVal, setCvcErr);
          break;
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
              <span className="failed-stars"> *1</span>
            ) : null}
          </label>

          <input
            name="pan"
            onBlur={blurHandler}
            onChange={onFormChange}
            value={maskForPan(formData.params.pan) || ""}
            className={`pay-form__input${
              panErr && panDirty ? " pay-form__input--failed" : ""
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
                <span className="failed-stars"> *2</span>
              ) : null}
            </label>
            <input
              name="expire"
              onBlur={blurHandler}
              onChange={onFormChange}
              value={maskForExpire(formData.params.expire) || ""}
              className={`pay-form__input${
                expireDirty && expireErr ? " pay-form__input--failed" : ""
              }`}
              type="text"
              id="month-year"
              placeholder="12/25"
            />
          </div>
          <div className="pay-form__code">
            <label className="pay-form__label-text" htmlFor="code">
              Код
              {cvcDirty && cvcErr ? (
                <span className="failed-stars"> *3</span>
              ) : null}
            </label>
            <input
              name="cvc"
              onBlur={blurHandler}
              onChange={onFormChange}
              value={formData.params.cvc}
              className={`pay-form__input${
                cvcDirty && cvcErr ? " pay-form__input--failed" : ""
              }`}
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
              <span className="failed-stars"> *4</span>
            ) : null}
          </label>
          <input
            name="cardholder"
            onBlur={blurHandler}
            onChange={onFormChange}
            value={formData.params.cardholder}
            className={`pay-form__input${
              cardHolderErr && cardHolderDirty ? " pay-form__input--failed" : ""
            }`}
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
        {panErr && panDirty ? <div className="failed">*1 {panErr}</div> : null}
        {expireDirty && expireErr ? (
          <span className="failed">*2 {expireErr}</span>
        ) : null}
        {cvcDirty && cvcErr ? (
          <span className="failed">*3 {cvcErr}</span>
        ) : null}
        {cardHolderErr && cardHolderDirty ? (
          <span className="failed">*4 {cardHolderErr}</span>
        ) : null}
      </div>
    </form>
  );
}
