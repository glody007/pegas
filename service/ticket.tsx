import axios from "axios"

export const allTickets = async () => {
    const response = await axios.get("/api/tickets")
    return response.data
}