import axios from "axios"

export const allUsers = async () => {
    const response = await axios.get("/api/users/getUsers")
    return response.data
}