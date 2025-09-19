import { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Button, Stack, Avatar } from "@mui/material";
import { updateUser } from "../utils/User";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            navigate("/");
            return;
        }
        setUser(currentUser);
        setPreview(currentUser.avatar || "");
    }, [navigate]);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleAvatarChange(e) {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);

            // Nếu không có upload server, ta chỉ lưu base64 hoặc link tạm
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, avatar: reader.result }); // base64 lưu vào db.json
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const updated = await updateUser(user.id, user);
            localStorage.setItem("currentUser", JSON.stringify(updated));
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Error updating profile.");
        }
    }

    if (!user) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
                <Typography variant="h5" gutterBottom>
                    Profile
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} alignItems="center">
                        <Avatar
                            src={preview}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Button variant="outlined" component="label">
                            Upload Avatar
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </Button>

                        <TextField
                            label="Username"
                            name="username"
                            value={user.username || ""}
                            onChange={handleChange}
                            fullWidth
                            disabled
                        />
                        <TextField
                            label="Name"
                            name="name"
                            value={user.name || ""}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={user.password || ""}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Role"
                            name="role"
                            value={user.role || ""}
                            onChange={handleChange}
                            fullWidth
                            disabled
                        />

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="outlined" onClick={() => navigate("/home")}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
