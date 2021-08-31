import { useState } from "react";
import { Link } from "react-router-dom";
import { changeFormData } from "../../redux/actions/form";
import { useDispatch, useSelector } from "react-redux";
import "./PayForm.scss";

export default function PayForm() {
  const dispatch = useDispatch();
  const formDataInit = useSelector((state) => state.curFormData);
  const [formData, setFormData] = useState(formDataInit);

  function onFormChange(e) {
    const keyVal = e.target.name;
    const valueVal = e.target.value;
    if (keyVal === "cardholder") {
      const valueValUpperCase = valueVal.toUpperCase();
      setFormData((prev) => {
        return {
          ...prev,
          params: { ...prev.params, [keyVal]: valueValUpperCase },
        };
      });
    } else {
      setFormData((prev) => {
        return { ...prev, params: { ...prev.params, [keyVal]: valueVal } };
      });
    }
  }

  return (
    <form className="pay-form">
      <div className="pay-form__title">Оплата банковской картой </div>
      <div className="pay-form__main">
        <div className="pay-form__card-number">
          <label className="pay-form__label-text" htmlFor="card-number">
            Номер карты
          </label>
          <input
            name="pan"
            onChange={onFormChange}
            value={formData.params.pan}
            className="pay-form__input"
            type="text"
            id="card-number"
            placeholder="0000 0000 0000 0000"
          />
        </div>
        <div className="pay-form__date-code">
          <div className="pay-form__month-year">
            <label className="pay-form__label-text" htmlFor="month-year">
              Месяц/Год
            </label>
            <input
              name="expire"
              onChange={onFormChange}
              value={formData.params.expire}
              className="pay-form__input"
              type="text"
              id="month-year"
              placeholder="12/25"
            />
          </div>
          <div className="pay-form__code">
            <label className="pay-form__label-text" htmlFor="code">
              Код
            </label>
            <input
              name="cvc"
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
          </label>
          <input
            name="cardholder"
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
            onClick={(e) => {
              // e.preventDefault();
              dispatch(changeFormData(formData));
            }}
            disabled={false}
            className="pay-form__btn"
          >
            Оплатить
          </button>
        </Link>
      </div>
    </form>
  );
}
