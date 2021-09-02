import { useSelector } from "react-redux";

import checkImg from "../../assets/img/checked.png";
import crossImg from "../../assets/img/cross.png";

export default function ResultForm() {
  const isPayed = useSelector((state) => state.isPayed);
  return (
    <div className="pay-form checked">
      {isPayed === "ok" ? (
        <>
          <div className="pay-form__title">Оплата прошла успешно</div>
          <img src={checkImg} alt="Check succes" />{" "}
        </>
      ) : (
        <>
          <div className="pay-form__title">Произошла ошибка</div>
          <img src={crossImg} alt="Check fail" />
        </>
      )}
    </div>
  );
}
