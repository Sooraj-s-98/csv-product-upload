import { useState, useEffect } from 'react';
import { userService } from '../services';
const Nav=()=> {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

 
    if (!user) return null; 
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <a href="/" exact className="nav-item nav-link">Home</a>
                <a href="/upload" exact className="nav-item nav-link">Upload</a>
                <a onClick={logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}
export default Nav;