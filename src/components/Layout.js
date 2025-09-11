import {Link, Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <header style={{background:'#ddd', padding:'10px'}}>
                <nav>
                    <Link to='/'>Dashboard</Link>
                    <Link to='/transactions'>Transactions</Link>
                    <Link to='/members'>Members</Link>
                    <Link to='/profile'>Profile</Link>
                </nav>
            </header>

            <main style={{padding:'20px'}}>
                <Outlet/>
            </main>
        </div>
    )
}