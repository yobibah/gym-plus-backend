import { useState } from "react";
import { PaymentContext } from "./PaymentContext";

export function PaymentProvider({ children }) {
    const [forfait, setForfait] = useState(null);
    const [montant, setMontant] = useState(null);

    return (
        <PaymentContext.Provider
            value={{ forfait, montant, setForfait, setMontant }}
        >
            {children}
        </PaymentContext.Provider>
    );
}