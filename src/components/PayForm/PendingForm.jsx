import { useEffect } from "react";
import { isPayd } from "../../redux/actions/form";
import { useSelector, useDispatch } from "react-redux";

export default function PendingForm() {
  const pid = useSelector((state) => state.pid);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(pid);
    const pidInterval = setInterval(() => {
      dispatch(isPayd(pid));
    }, 1000);
    return () => {
      clearInterval(pidInterval);
    };
  }, [dispatch, pid]);
  return (
    <div className="pay-form check">
      <div className="pay-form__title">Оплата ... </div>
    </div>
  );
}
