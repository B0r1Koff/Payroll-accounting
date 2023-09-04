import { $host } from "./index";

export const getData = async (month, userId) => {
    const response = await $host.post('api/threeMonthData/getOne', {month, userId})
    return response
}

export const createData = async (month, salary, userId) => {
    const response = await $host.post('api/threeMonthData/create', {month, salary, userId})
    return response
}

export const delData = async (month, userId) => {
    const response = await $host.post('api/threeMonthData/delData', {month, userId})
    return response
}

export const getAllData = async () => {
    const response = await $host.post('api/threeMonthData/getAll')
    return response
}