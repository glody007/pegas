import axios from "axios"

export const allCounters = async () => {
    const response = await axios.get("/api/counters/getCounters")
    return response.data
}