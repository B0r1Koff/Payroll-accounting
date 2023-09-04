import { $host } from "./index";

export const createSickLeaveRequest = async (number_of_days, message, userId, typesOfSickLeaveId) => {
    const response = await $host.post('api/sickLeaveRequests/createSickLeaveRequest', {number_of_days, message, userId, typesOfSickLeaveId})
    return response
}

export const checkSickLeaveRequest = async (userId) => {
    const response = await $host.post('api/sickLeaveRequests/find', {userId})
    return response
}

export const getSickLeaveRequest = async (id) => {
    const response = await $host.post('api/sickLeaveRequests/getReq', {id})
    return response
}

export const getAllSickLeaveRequest = async () => {
    const response = await $host.post('api/sickLeaveRequests/getAllSickLeaveRequests')
    return response
}

export const delReq = async (id) => {
    const response = await $host.post('api/sickLeaveRequests/delReq', {id})
    return response
}