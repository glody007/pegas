import axios from "axios"

export const allRoutes = async () => {
    const response = await axios.get("/api/routes")
    return response.data
}