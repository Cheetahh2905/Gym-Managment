import { useEffect, useState } from "react";
import { getUsers } from "../utils/User";
import { useNavigate } from "react-router-dom";
import { Container, Paper, TextField, Button, Typography, Stack, Box } from "@mui/material";

export default function Login() {
    const [user, setUser] = useState({ username: "", password: "" });
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then(setUserList);
    }, []);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleLogin() {
        const userCheck = userList.find(
            (item) => item.username === user.username && item.password === user.password
        );
        if (userCheck) {
            localStorage.setItem("currentUser", JSON.stringify(userCheck));
            alert("Login successful");
            navigate("/home");
        } else {
            alert("Login failed");
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={10}
                    sx={{
                        p: 5,
                        borderRadius: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                        FitTrack
                    </Typography>

                    <Typography variant="body1" align="center" gutterBottom sx={{ color: "#555", mb: 3 }}>
                        Sign in to your account
                    </Typography>

                    <Stack spacing={3}>
                        <TextField
                            label="Username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: "bold",
                                    "&:hover": { background: "linear-gradient(45deg, #556cd6, #6b3ba0)" },
                                }}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: "bold",
                                    borderColor: "#764ba2",
                                    color: "#764ba2",
                                    "&:hover": { backgroundColor: "#f3eaff", borderColor: "#5e3490" },
                                }}
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}
