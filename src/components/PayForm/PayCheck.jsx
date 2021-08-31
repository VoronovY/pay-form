import { useSelector } from "react-redux";
import PendingForm from "./PendingForm";
import ResultForm from "./ResultForm";

export default function PayCheck() {
  const isPayed = useSelector((state) => state.isPayed);

  return <>{isPayed !== null ? <ResultForm /> : <PendingForm />}</>;
}
