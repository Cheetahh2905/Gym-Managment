import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Members from "./pages/Members";
import AddMembers from "./pages/AddMembers";
import Transaction from "./pages/Transaction";
import EditMembers from "./pages/EditMembers";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import Profile from "./pages/Profile";
import ViewMember from "./pages/ViewMember";


function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Members />} />
                <Route path="add-member" element={<AddMembers />} />
                <Route path="edit-member/:id" element={<EditMembers />} />
                <Route path="transactions" element={<Transaction />} />
                <Route path="add-transaction" element={<AddTransaction />} />
                <Route path="edit-transaction/:id" element={<EditTransaction />} />
                <Route path="profile" element={<Profile />} />
                <Route path="view-member/:id" element={<ViewMember />} />

            </Route>
        </Routes>
    );
}

export default App;
