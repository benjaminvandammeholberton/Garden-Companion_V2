import { SeedlingInterface } from "@/interfaces/interfaces";
import axiosInstance from "../axios";

export const getAllSeedlings = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/seedling/")
        return response.data
    } catch (error) {
        throw new Error("Can't fetch seedlings  from the server")
    }
}

export const createSeedling = async (data: Omit<SeedlingInterface, "seedling_id">) => {
    try {
        const response = await axiosInstance.post("/api/v1/seedling/create", data)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error ("An error occured when creating the seedling")
    }
}