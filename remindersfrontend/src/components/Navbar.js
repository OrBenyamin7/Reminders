import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogut'
import { useAuthContext } from '../hooks/useAuthContext'

import { Button } from 'react-bootstrap'
import { MdWbSunny, MdNightsStay } from 'react-icons/md'
import { useEffect, useState } from 'react'


const Navbar = () => {
    const {logout } = useLogout()
    const {user } = useAuthContext()

    const handleClick = () => {
        logout()

    }

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        
    };

    useEffect(() => {
        const body = document.body
        body.classList.remove('theme-light', 'theme-dark')
        body.classList.add(`theme-${theme}`)
    }, [theme])

    return (
        <header>
            <div className="container">
                <nav>
                    {user && (
                        <div>
                          <h1 className="headLineReminder">{user.userName}</h1>
                          
                          <span className="material-symbols-outlined" onClick={handleClick}>logout</span>
                          <Button variant="secondary" className="theme-toggle" onClick={toggleTheme}>
                            {theme === 'light' ? <MdNightsStay /> : <MdWbSunny />}
                          </Button>
                        </div>
                )}
                 {!user &&(
                    <div>
                        <h1 className="headLineReminder">Reminders</h1>
                        <Link to="login">
                            <span className="material-symbols-outlined">login</span>
                        </Link>
                        <Link to="signup">
                            <span className="material-symbols-outlined">app_registration</span>
                        </Link>

                        <Button variant="secondary" className="theme-toggle" onClick={toggleTheme}>
                            {theme === 'light' ? <MdNightsStay /> : <MdWbSunny />}
                        </Button>
                   </div>
                 )} 
                </nav>
            </div>
        </header>
    )
}

export default Navbar

