import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMembers } from "../utils/Members";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
} from "@mui/material";

export default function ViewMember() {
    const { id } = useParams(); // lấy id từ URL
    const [member, setMember] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getMembers().then((data) => {
            const found = data.find((m) => m.id.toString() === id.toString());
            setMember(found);
        });
    }, [id]);

    if (!member) {
        return (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
                Member not found
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            textAlign: "center",
                            color: "#1976d2",
                        }}
                    >
                        Membership Details
                    </Typography>

                    <Typography><strong>Name:</strong> {member.name}</Typography>
                    <Typography><strong>Gender:</strong> {member.gender}</Typography>
                    <Typography><strong>Phone:</strong> {member.phone}</Typography>
                    <Typography><strong>Email:</strong> {member.email}</Typography>
                    <Typography><strong>Membership:</strong> {member.membership}</Typography>
                    <Typography>
                        <strong>Duration:</strong> {member.startDate} → {member.endDate}
                    </Typography>
                    <Typography>
                        <strong>Status:</strong>{" "}
                        <Chip
                            label={member.status}
                            color={member.status.toLowerCase() === "active" ? "success" : "error"}
                            size="small"
                        />
                    </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
