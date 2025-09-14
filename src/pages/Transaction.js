import { useEffect, useState } from "react";
import { getTransaction, deleteTransaction } from "../utils/Transaction";
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
    Divider,
} from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";
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
                getTransaction(),
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

    // Tính toán dữ liệu cho biểu đồ và tổng hợp
    const income = transactions
        .filter((t) => t.type.toLowerCase() === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
        .filter((t) => t.type.toLowerCase() === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expense;

    const chartData = [
        { name: "Income", value: income },
        { name: "Expense", value: expense },
    ];

    const COLORS = ["#4caf50", "#f44336"];

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

            {/* Biểu đồ + Tổng hợp */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Summary
                        </Typography>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Totals
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body1" color="green">
                            Total Income: {income.toLocaleString()} đ
                        </Typography>
                        <Typography variant="body1" color="red">
                            Total Expense: {expense.toLocaleString()} đ
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", mt: 2 }}
                            color={balance >= 0 ? "green" : "red"}
                        >
                            Balance: {balance.toLocaleString()} đ
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Danh sách */}
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
                                    <TableCell>{t.type}</TableCell>
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
