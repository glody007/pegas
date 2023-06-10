import axios from "axios"

export const allBuses = async () => {
    const response = await axios.get("/api/buses")
    return response.data
}