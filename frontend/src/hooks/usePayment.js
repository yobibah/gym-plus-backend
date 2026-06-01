
import { useContext } from "react";
import { PaymentContext } from "../contexts/PaymentContext";

export function usePayment() {
    return useContext(PaymentContext);
}