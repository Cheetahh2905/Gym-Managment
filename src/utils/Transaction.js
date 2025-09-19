import axios from "axios";
import { URL_Transactions } from "../const/URLS";

// Lấy tất cả giao dịch
export async function getAllTransactions() {
    const response = await axios.get(URL_Transactions);
    return response.data;
}

// Lấy 1 giao dịch theo id
export async function getTransaction(id) {
    const response = await axios.get(`${URL_Transactions}/${id}`);
    return response.data;
}

// Thêm mới (JSON Server sẽ tự tạo id)
export async function addTransaction(newTransaction) {
    const response = await axios.post(URL_Transactions, newTransaction);
    return response.data;
}

// Xoá
export async function deleteTransaction(id) {
    const response = await axios.delete(`${URL_Transactions}/${id}`);
    return response.data;
}

// Cập nhật
export async function updateTransaction(id, updatedTransaction) {
    const response = await axios.put(`${URL_Transactions}/${id}`, updatedTransaction);
    return response.data;
}
