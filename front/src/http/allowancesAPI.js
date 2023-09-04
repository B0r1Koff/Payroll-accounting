import { $host } from "./index";

export const getUserAllowances = async (userId) => {
    const response = await $host.post('api/allowances/getUserAllowances', {userId})
    return response
}

export const createAllowances = async (by_contract, additional, userId) => {
    const response = await $host.post('api/allowances/create', {by_contract, additional, userId})
    return response
}