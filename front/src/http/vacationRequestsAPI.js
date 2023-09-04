import { $host } from "./index";

export const createVacationRequest = async (number_of_days, message, date_of_start, userId, typesOfVacationId) => {
    const response = await $host.post('api/vacationRequests/createVacationRequest', {number_of_days, message, date_of_start, userId, typesOfVacationId})
    return response
}

export const checkVacationRequest = async (userId) => {
    const response = await $host.post('api/vacationRequests/find', {userId})
    return response
}

export const getVacationRequest = async (id) => {
    const response = await $host.post('api/vacationRequests/getReq', {id})
    return response
}

export const delVacationRequest = async (id) => {
    const response = await $host.post('api/vacationRequests/delReq', {id})
    return response
}

export const getAllVacationRequest = async () => {
    const response = await $host.post('api/vacationRequests/getAllVacationRequests')
    return response
}