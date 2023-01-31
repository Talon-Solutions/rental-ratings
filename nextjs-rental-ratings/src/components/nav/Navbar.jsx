'use client'

import { useRouter } from 'next/navigation'
import './navbar.css'

export default function Navbar() {
    const router = useRouter();

    const handleAuth = (type) => {
        router.push(`/auth?type=${type}`);
    }

    return (
        <nav>
            <button id='login' onClick={() => handleAuth('login')}><strong>Login</strong></button>
            <button id='register' onClick={() => handleAuth('register')}><strong>Register</strong></button>
        </nav>
    )
}