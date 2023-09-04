import { $host } from "./index";

export const getNum = async (userId) => {
    const response = await $host.post('api/numberOfSpentDays/getOne', {userId})
    return response
}

export const delNum = async (userId) => {
    const response = await $host.post('api/numberOfSpentDays/delete', {userId})
    return response
}

export const createNum = async (number_of_spent_days, userId) => {
    const response = await $host.post('api/numberOfSpentDays/create', {number_of_spent_days, userId})
    return response
}