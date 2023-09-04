import { $host } from "./index";

export const getUsersAbsenteeism = async (userId) => {
    const response = await $host.post('api/absenteeism/getOne', {userId})
    return response
}

export const delUsersAbsenteeism = async (userId) => {
    const response = await $host.post('api/absenteeism/delete', {userId})
    return response
}

export const createUsersAbsenteeism = async (number_of_absenteeism, userId) => {
    const response = await $host.post('api/absenteeism/create', {number_of_absenteeism, userId})
    return response
}