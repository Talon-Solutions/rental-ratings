'use client'

import { UserContext } from '@/context/user';
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react';
import './navbar.css'

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(false);
    const [hoverMenu, setHoverMenu] = useState(false);
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
                    <button onClick={() => router.push('/review-form?id=-1')}>Leave Review</button>
                    <div id="user-options">
                        <button onClick={() => setShowMenu(!showMenu)} onBlur={() => !hoverMenu && setShowMenu(false)}><img src="icon_user.png" width={20} /></button>
                        {showMenu && (
                            <ul onMouseOver={() => setHoverMenu(true)} onMouseLeave={() => setHoverMenu(false)}>
                                <li><button onClick={() => router.push(`/userReviews?user=${user}`)}>View my ratings</button></li>
                                <li><button onClick={() => handleLogout()}>Logout</button></li>
                            </ul>        
                        )}
                    </div>  
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
