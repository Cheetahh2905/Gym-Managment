import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllMembers, updateMember} from "../utils/Members";
import {
    TextField,
    Button,
    MenuItem,
    Box,
    Typography,
    Paper
} from "@mui/material";

export default function EditMembers() {
    const { id } = useParams();
    const [members, setMembers] = useState({
        name: '',
        gender: '',
        phone: '',
        email: '',
        membership: '',
        startDate: '',
        endDate: '',
        status: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        getAllMembers(id).then((data) => setMembers(data));
    }, [id]);

    function handleChange(e) {
        setMembers({...members, [e.target.name]: e.target.value});
    }

    function handleSave(e) {
        e.preventDefault();
        updateMember(id, members);
        navigate("/home");
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Paper
                sx={{
                    p: 4,
                    width: 450,
                    borderRadius: 3,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
                >
                    ✏️ Edit Member
                </Typography>

                {/* Name */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={members.name}
                    onChange={handleChange}
                />

                {/* Gender */}
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Gender"
                    name="gender"
                    value={members.gender}
                    onChange={handleChange}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>

                {/* Phone */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Phone"
                    name="phone"
                    value={members.phone}
                    onChange={handleChange}
                />

                {/* Email */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={members.email}
                    onChange={handleChange}
                />

                {/* Membership */}
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Membership"
                    name="membership"
                    value={members.membership}
                    onChange={handleChange}
                >
                    <MenuItem value="Monthly">Gói tháng</MenuItem>
                    <MenuItem value="Yearly">Gói năm</MenuItem>
                </TextField>

                {/* Start Date */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={members.startDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />

                {/* End Date */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={members.endDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />

                {/* Status */}
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Status"
                    name="status"
                    value={members.status}
                    onChange={handleChange}
                >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Expired">Expired</MenuItem>
                </TextField>

                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ px: 3 }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/home')}
                        sx={{ px: 3 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
