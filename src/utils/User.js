import axios from "axios";
import {URL_Users} from "../const/URLS";

export async function getUsers() {
    const response = await axios.get(URL_Users)
    return response.data;
}
export async function postUser(newUser) {
    const response = await axios.post(URL_Users, newUser);
    return response.data;
}