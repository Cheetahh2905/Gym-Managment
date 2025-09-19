import { useEffect, useState } from "react";
import { getAllTransactions, deleteTransaction } from "../utils/Transaction";
import { getUsers } from "../utils/User";
import { getMembers } from "../utils/Members";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (!currentUser) return;

            const [txData, userData, memberData] = await Promise.all([
                getAllTransactions(),
                getUsers(),
                getMembers(),
            ]);

            setUsers(userData);
            setMembers(memberData);

            if (currentUser.role === "admin") {
                setTransactions(txData);
            } else {
                setTransactions(txData.filter((t) => t.userId === currentUser.id));
            }
            setLoading(false);
        }

        fetchData();
    }, [currentUser]);

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            await deleteTransaction(id);
            setTransactions(transactions.filter((t) => t.id !== id));
        }
    }

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    const income = transactions
        .filter((t) => t.type.toLowerCase() === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
        .filter((t) => t.type.toLowerCase() === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expense;

    function getMemberName(userId) {
        const user = users.find((u) => u.id === userId);
        if (!user) return "Unknown";
        const member = members.find((m) => m.id === user.id);
        return member ? member.name : user.username;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Transactions
            </Typography>

            {/* Summary */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: "#e8f5e9",
                                color: "#2e7d32",
                                fontWeight: "bold",
                            }}
                        >
                            Thu nhập: {income.toLocaleString()} đ
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: "#ffebee",
                                color: "#c62828",
                                fontWeight: "bold",
                            }}
                        >
                            Chi tiêu: {expense.toLocaleString()} đ
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: balance >= 0 ? "#e3f2fd" : "#fbe9e7",
                                color: balance >= 0 ? "#1565c0" : "#d84315",
                                fontWeight: "bold",
                            }}
                        >
                            Số dư: {balance.toLocaleString()} đ
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            {/* Transaction List */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Transaction List
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell>{t.date}</TableCell>
                                    <TableCell>{getMemberName(t.userId)}</TableCell>
                                    <TableCell
                                        sx={{
                                            color:
                                                t.type.toLowerCase() === "income"
                                                    ? "green"
                                                    : "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {t.type}
                                    </TableCell>
                                    <TableCell>{t.description}</TableCell>
                                    <TableCell align="right">
                                        {Number(t.amount).toLocaleString()} đ
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                navigate(`/home/edit-transaction/${t.id}`)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(t.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
