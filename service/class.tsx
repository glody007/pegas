import axios from "axios"

export const allClasses = async () => {
    const response = await axios.get("/api/classes")
    return response.data
}