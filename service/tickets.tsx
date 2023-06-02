import axios from "axios"

export const allTickets = async () => {
    const response = await axios.get("/api/tickets/getTickets")
    return response.data
}