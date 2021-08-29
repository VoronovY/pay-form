import "./App.scss";

function App() {
  return (
    <div className="App">
      <form className="pay-form">
        <div className="pay-form__title">Оплата банковской картой </div>
        <div className="pay-form__main">
          <div className="pay-form__card-number">
            <label className="pay-form__label-text" htmlFor="card-number">
              Номер карты
            </label>
            <input
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
              className="pay-form__input pay-form__input--failed"
              type="text"
              id="card-holder"
              placeholder="IVAN IVANOV"
            />
          </div>
          <button className="pay-form__btn">Оплатить</button>
        </div>
      </form>
    </div>
  );
}

export default App;
/* Оплата банковской картой */
