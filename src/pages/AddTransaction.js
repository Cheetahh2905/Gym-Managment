import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTransaction} from "../utils/Transaction";

import {Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    MenuItem,
} from "@mui/material";

export default function AddTransaction() {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [newTransaction, setNewTransaction] = useState({
        description: "",
        amount: "",
        type: "",
        date: "",
        userId: currentUser?.id || "",
    });

    const handleChange = (e) => {
        setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
    };

    const handleAddTransaction = (e) => {
        e.preventDefault();

        if (!newTransaction.description || !newTransaction.amount || !newTransaction.type || !newTransaction.date) {
            alert("Please fill in all required fields.");
            return;
        }

        addTransaction(newTransaction).then(() => {
            alert("Transaction added successfully!");
            navigate("/home/transactions");
        });
    };

    return (
        <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", mt: 4 }}>
            <Container maxWidth="sm">
                <Paper elevation={10} sx={{ p: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.95)" }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
                        Add New Transaction
                    </Typography>

                    <Stack spacing={3} component="form" onSubmit={handleAddTransaction}>
                        <TextField
                            label="Description"
                            name="description"
                            value={newTransaction.description}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Amount"
                            name="amount"
                            type="number"
                            value={newTransaction.amount}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            select
                            label="Type"
                            name="type"
                            value={newTransaction.type}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                        </TextField>

                        <TextField
                            label="Date"
                            name="date"
                            type="date"
                            value={newTransaction.date}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
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
                                Add
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
                                onClick={() => navigate("/home/transactions")}
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
