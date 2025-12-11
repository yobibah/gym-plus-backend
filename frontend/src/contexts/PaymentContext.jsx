import React, {useState, useContext, createContext} from "react";

const paymentContext = createContext()

export function PaymentProvider({children}){
    
    const [forfait, setForfait] = useState(null)
    const [montant, setMontant] = useState(null)

    return(
        <paymentContext.Provider value={{forfait, montant, setForfait, setMontant}}>
            {children}
        </paymentContext.Provider >
    )
}


export function usePayment(){
    return useContext(paymentContext)
}