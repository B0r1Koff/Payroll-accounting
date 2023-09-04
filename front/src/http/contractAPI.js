import { $host } from "./index";

export const getOne = async (userId) => {
    const response = await $host.post('api/contract/getOne', {userId})
    return response
}

export const getAllContracts = async () => {
    const response = await $host.post('api/contract/getAll')
    return response
}

export const createContract = async (date_of_start, date_of_end, salary, number_of_vacation_days, userId) => {
    const response = await $host.post('api/contract/create', {date_of_start, date_of_end, salary, number_of_vacation_days, userId})
    return response
}

export const delContract = async (userId) => {
    const response = await $host.post('api/contract/delContract', {userId})
    return response
}