import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogut'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
    const {logout } = useLogout()
    const {user } = useAuthContext()

    

    const handleClick = () => {
        logout()

    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1 className="headLineReminder">Reminders</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                          <span>{user.email}</span>
                          <span className="material-symbols-outlined" onClick={handleClick}>logout</span>
                          
                        </div>
                )}
                 {!user &&(
                    <div>
                    <Link to="login">
                        <span className="material-symbols-outlined">login</span>
                    </Link>
                    <Link to="signup">
                        <span className="material-symbols-outlined">app_registration</span>
                    </Link>
                   </div>
                 )} 
                </nav>
            </div>
        </header>
    )
}

export default Navbar

