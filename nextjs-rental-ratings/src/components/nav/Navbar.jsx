'use client'

import { UserContext } from '@/context/user';
import { useRouter } from 'next/navigation'
import { useContext } from 'react';
import './navbar.css'

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

    const handleAuth = (type) => {
        router.push(`/auth?type=${type}`);
    }

    const handleLogout = () => {
        localStorage.removeItem('userEmail')
        setUser(null)
    }

    return (
        <nav>
            {user ? (
                <div>
                    <button>Leave Review</button>
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>
            ) : (
                <>
                    <button id='login' onClick={() => handleAuth('login')}><strong>Login</strong></button>
                    <button id='register' onClick={() => handleAuth('register')}><strong>Register</strong></button>
                </>
            )}
            
        </nav>
    )
}