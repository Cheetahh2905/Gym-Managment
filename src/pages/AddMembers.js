import { useState } from "react";
import { addMember } from "../utils/Members";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    MenuItem,
} from "@mui/material";

export default function AddMembers() {
    const navigate = useNavigate();
    const [newMember, setNewMember] = useState({
        name: "",
        gender: "",
        phone: "",
        email: "",
        membership: "",
        startDate: "",
        endDate: "",
        status: "",
    });

    const handleChange = (e) => {
        setNewMember({ ...newMember, [e.target.name]: e.target.value });
    };

    const handleAddMember = (e) => {
        e.preventDefault();

        if (!newMember.name || !newMember.gender || !newMember.phone || !newMember.email) {
            alert("Please fill in all required fields.");
            return;
        }

        addMember(newMember).then(() => {
            alert("Member added successfully!");
            navigate("/home");
        });
    };

    return (
        <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", mt: 4 }}>
            <Container maxWidth="sm">
                <Paper elevation={10} sx={{ p: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.95)" }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
                        Add New Member
                    </Typography>

                    <Stack spacing={3} component="form" onSubmit={handleAddMember}>
                        <TextField
                            label="Name"
                            name="name"
                            value={newMember.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            select
                            label="Gender"
                            name="gender"
                            value={newMember.gender}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="Nam">Nam</MenuItem>
                            <MenuItem value="Nữ">Nữ</MenuItem>
                            <MenuItem value="Khác">Khác</MenuItem>
                        </TextField>

                        <TextField
                            label="Phone"
                            name="phone"
                            value={newMember.phone}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Email"
                            name="email"
                            value={newMember.email}
                            onChange={handleChange}
                            type="email"
                            fullWidth
                            required
                        />

                        <TextField
                            label="Membership"
                            name="membership"
                            value={newMember.membership}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Gói tháng / Gói năm"
                        />

                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={newMember.startDate}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="End Date"
                                name="endDate"
                                type="date"
                                value={newMember.endDate}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Stack>

                        <TextField
                            label="Status"
                            name="status"
                            value={newMember.status}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Đang hoạt động / Ngưng hoạt động"
                        />

                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                                    px: 5,
                                    py: 1.5,
                                    fontWeight: "bold",
                                    "&:hover": { background: "linear-gradient(45deg, #556cd6, #6b3ba0)" },
                                }}
                            >
                                Add Member
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{
                                    px: 5,
                                    py: 1.5,
                                    fontWeight: "bold",
                                    borderColor: "#764ba2",
                                    color: "#764ba2",
                                    "&:hover": { backgroundColor: "#f3eaff", borderColor: "#5e3490" },
                                }}
                                onClick={() => navigate("/home")}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}
