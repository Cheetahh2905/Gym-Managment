import axios from "axios";
import { URL_Transactions } from "../const/URLS";

export async function getTransaction() {
    const response = await axios.get(URL_Transactions);
    return response.data;
}

export async function addTransaction(newTransaction) {
    const response = await axios.post(URL_Transactions, newTransaction);
    return response.data;
}

export async function deleteTransaction(id) {
    const response = await axios.delete(`${URL_Transactions}/${id}`);
    return response.data;
}

export async function updateTransaction(id, updatedTransaction) {
    const response = await axios.put(`${URL_Transactions}/${id}`, updatedTransaction);
    return response.data;
}
