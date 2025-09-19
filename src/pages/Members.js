import { useEffect, useState } from "react";
import { deleteMember, getMembers } from "../utils/Members";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export default function Members() {
    const [members, setMembers] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    useEffect(() => {
        getMembers().then((data) => {
            if (currentUser?.role === "admin") {
                setMembers(data); // admin xem tất cả
            } else {
                const userMember = data.filter((m) => m.userId === currentUser.id);
                setMembers(userMember); // user chỉ xem của mình
            }
        });
    }, [currentUser]);

    function handleDeleteMember(memberId) {
        deleteMember(memberId).then(() => {
            setMembers(members.filter((item) => item.id !== memberId));
        });
    }

    return (
        <Box>
            {/* Tiêu đề */}
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    mb: 3,
                    textAlign: "center",
                    background: "linear-gradient(90deg, #ff512f, #dd2476)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "4px solid #dd2476",
                    pb: 1,
                }}
            >
                {currentUser?.role === "admin" ? (
                    <>
                        <GroupIcon sx={{ mr: 1, fontSize: 40, color: "#dd2476" }} />
                        All Members
                    </>
                ) : (
                    <>
                        <FitnessCenterIcon sx={{ mr: 1, fontSize: 40, color: "#dd2476" }} />
                        My Membership
                    </>
                )}
            </Typography>

            {/* Bảng Members */}
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#1976d2" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Gender</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Membership</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Duration</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {members.map((member) => (
                            <TableRow
                                key={member.id}
                                sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                            >
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.gender}</TableCell>
                                <TableCell>{member.phone}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>{member.membership}</TableCell>
                                <TableCell>
                                    {member.startDate} → {member.endDate}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={member.status}
                                        color={
                                            member.status.toLowerCase() === "active"
                                                ? "success"
                                                : "error"
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    {currentUser?.role === "admin" ? (
                                        <>
                                            <Button
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                                sx={{ mr: 1 }}
                                                onClick={() =>
                                                    navigate(`/home/edit-member/${member.id}`)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                onClick={() => handleDeleteMember(member.id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            size="small"
                                            color="secondary"
                                            variant="contained"
                                            onClick={() => navigate(`/home/view-member/${member.id}`)}
                                        >
                                            View
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
