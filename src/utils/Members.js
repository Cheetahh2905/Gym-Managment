import axios from "axios";
import { URL_Members } from "../const/URLS";

// Lấy danh sách members
export async function getMembers() {
    try {
        const response = await axios.get(URL_Members);
        return response.data;
    } catch (error) {
        console.error("Error fetching members:", error);
        return [];
    }
}

// Xóa member theo ID
export async function deleteMember(memberId) {
    try {
        const response = await axios.delete(`${URL_Members}/${memberId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting member with id ${memberId}:`, error);
        throw error; // ném lỗi ra để component catch
    }
}

// Thêm member mới
export async function addMember(newMember) {
    try {
        // JSON Server auto-generate numeric ID nếu không có id
        const response = await axios.post(URL_Members, newMember);
        return response.data;
    } catch (error) {
        console.error("Error adding member:", error);
        throw error;
    }
}

// Cập nhật member
export async function updateMember(id,updatedMember) {
    try {
        const response = await axios.put(`${URL_Members}/${updatedMember.id}`, updatedMember);
        return response.data;
    } catch (error) {
        console.error(`Error updating member with id ${updatedMember.id}:`, error);
        throw error;
    }
}

export async function getAllMembers(id) {
    const response = await axios.get(`${URL_Members}/${id}`);
    return response.data;
}