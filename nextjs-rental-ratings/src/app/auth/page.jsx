'use client'

import { UserContext } from "@/context/user";
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useState } from "react";

var bcrypt = require('bcryptjs');

export default function Auth() {
    const [error, setError] = useState({ error: false, message: "" });
    const { user, setUser } = useContext(UserContext);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleAuth = (e) => {
        e.preventDefault();
        
        let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (!e.target.email.value.match(reg)) {
            setError({ error: true, message: "Must enter a valid email" })
        } else if (e.target.password.value !== e.target.confirmpassword?.value && searchParams.get('type') == 'register') {
            setError({ error: true, message: "Passwords must match" })
        } else {
            setError({ error: false, message: "" })
            const sendAuth = async () => {
                const hashedpw = await bcrypt.hash(e.target.password.value, 10);
                if (searchParams.get('type') === 'login') {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: e.target.email.value,
                        })
                    })

                    const resStr = await res.text();

                    if (resStr === "Cannot find user with this email") {
                        setError({ error: true, message: "Could not find user with this email" })
                    } else {
                        const pwMatch = await bcrypt.compare(e.target.password.value, resStr)
                        
                        if (pwMatch) {
                            setUser(e.target.email.value)
                            router.back()
                        } else {
                            setError({ error: true, message: "Credentials incorrect" })
                        }
                    }
                }
                if (searchParams.get('type') === 'register') {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/auth/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: e.target.email.value,
                            password: hashedpw
                        })
                    })

                    const resStr = await res.text();
                    
                    if (resStr === 'User already exists') {
                        setError({ error: true, message: "User already exists, try logging in instead" })
                    } else {
                        setUser(resStr)
                        router.back()
                    }
                }
                
            }

            sendAuth();
        }
    }

    return (
        <main>
            <section id='auth-form'>
                <div id="error">
                    {error.error && error.message}
                </div>
                <form onSubmit={(e) => handleAuth(e)}>
                    <label for="email">Email</label>
                    <input required="required" type="email" name="email" />

                    <label for="password">Password</label>
                    <input required="required" minLength="5" type="password" name="password" />

                    {searchParams.get('type') === 'register' && (
                        <div>
                            <label for="confirmpassword">Confirm Password</label>
                            <input name="confirmpassword" type="password" />
                        </div>
                    )}

                    <button type="submit">{searchParams.get('type') === 'login' ? 'Login' : 'Register'}</button>
                </form>
            </section>
        </main>
    )
}