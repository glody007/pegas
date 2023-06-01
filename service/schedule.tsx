import axios from "axios"

export const allSchedules = async () => {
    const response = await axios.get("/api/schedules/getSchedules")
    return response.data
}