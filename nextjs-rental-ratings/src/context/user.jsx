'use client'
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export default function ContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            if (localStorage.getItem('userEmail')) {
                setUser(localStorage.getItem('userEmail'))
            }
        } else {
            localStorage.setItem('userEmail', user)
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}