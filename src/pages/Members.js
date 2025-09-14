import { useEffect, useState } from "react";
import { deleteMember, getMembers } from "../utils/Members";
import { Box, Typography, Card, CardContent, CardActions, Button, Grid } from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Members() {
    const [members, setMembers] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
    useEffect(() => {
        getMembers().then(setMembers);
    }, []);

    function handleDeleteMember(memberId) {
        deleteMember(memberId).then(() => {
            setMembers(members.filter((item) => item.id !== memberId));
        });
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
                Member List
            </Typography>

            <Grid container spacing={3}>
                {members.map((member) => (
                    <Grid key={member.id} sx={{ flex: "1 1 300px" }}>
                        <Card sx={{ backgroundColor: "#f9f9f9", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{member.name}</Typography>
                                <Typography>Gender: {member.gender}</Typography>
                                <Typography>Phone: {member.phone}</Typography>
                                <Typography>Email: {member.email}</Typography>
                                <Typography>Membership: {member.membership}</Typography>
                                <Typography>Start: {member.startDate} | End: {member.endDate}</Typography>
                                <Typography>Status: {member.status}</Typography>
                            </CardContent>
                            <CardActions>
                                {currentUser?.role === "admin" && (
                                    <>
                                        <Button size="small" color="error" variant="outlined" onClick={() => handleDeleteMember(member.id)}>
                                            Delete
                                        </Button>

                                        <Button
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => navigate(`/home/edit-member/${member.id}`)}
                                        >
                                            Edit
                                        </Button>
                                    </>
                                )}
                                {currentUser?.role === "user" && (
                                    <Button size="small" color="secondary" variant="contained">View</Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
