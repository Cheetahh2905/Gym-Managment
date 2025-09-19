import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTransaction, updateTransaction } from "../utils/Transaction";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    Stack,
} from "@mui/material";

export default function EditTransaction() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getTransaction(id);
                setTransaction(data);
            } catch (err) {
                console.error("Error fetching transaction:", err);
            }
        }
        fetchData();
    }, [id]);

    function handleChange(e) {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await updateTransaction(id, transaction);
        navigate("/home/transactions");
    }

    if (!transaction) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
                <Typography variant="h5" gutterBottom>
                    Edit Transaction
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Description"
                            name="description"
                            value={transaction.description || ""}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Amount"
                            name="amount"
                            type="number"
                            value={transaction.amount || ""}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            select
                            label="Type"
                            name="type"
                            value={transaction.type || ""}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                        </TextField>

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/home/transactions")}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit">
                                Update
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
