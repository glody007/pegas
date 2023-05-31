import axios from "axios"

export const allBuses = async () => {
    const response = await axios.get("/api/buses/getBuses")
    return response.data
}