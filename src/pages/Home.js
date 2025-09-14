import { Outlet, Link, useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, Typography, Stack, IconButton } from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Home() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("currentUser");
        navigate('/');
    }

    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            {/* Header */}
            <AppBar position="static" sx={{ background: "linear-gradient(90deg, #764ba2, #667eea)" }}>
                <Toolbar>
                    <FitnessCenterIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/home"
                        sx={{ flexGrow: 1, fontWeight: "bold", textDecoration: "none", color: "inherit", cursor: "pointer" }}
                    >
                        FitTrack
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/home"
                            startIcon={<GroupIcon />}
                            sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}
                        >
                            Members
                        </Button>

                        {currentUser?.role === 'admin' && (
                            <Button
                                color="inherit"
                                component={Link}
                                to="/home/add-member"
                                startIcon={<PersonAddIcon />}
                                sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}
                            >
                                Add Member
                            </Button>
                        )}

                        <Button
                            color="inherit"
                            component={Link}
                            to="/home/transactions"
                            startIcon={<MonetizationOnIcon />}
                            sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}
                        >
                            Transactions
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/home/add-transaction"
                            startIcon={<MonetizationOnIcon />}
                            sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}
                        >
                            + Add Transaction
                        </Button>



                        <Button
                            color="inherit"
                            component={Link}
                            to="/home/profile"
                            startIcon={<AccountCircleIcon />}
                            sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}
                        >
                            Profile
                        </Button>

                        <IconButton color="inherit" onClick={logout} sx={{ ml: 1 }}>
                            <LogoutIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Content */}
            <Box sx={{ p: 4 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
