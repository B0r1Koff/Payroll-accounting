import { $host } from "./index";

export const addWorker = async (type, date_of_end, userId) => {
    const response = await $host.post('api/missingWorkers/create', {type, date_of_end, userId})
    return response
}

export const getWorker = async (id) => {
    const response = await $host.post('api/missingWorkers/getOne', {id})
    return response
}

export const getAllWorkers = async () => {
    const response = await $host.post('api/missingWorkers/getAll')
    return response
}

export const delWorker = async (id) => {
    const response = await $host.post('api/missingWorkers/delWorker', {id})
    return response
}
