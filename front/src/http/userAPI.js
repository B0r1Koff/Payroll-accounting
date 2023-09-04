import { $host } from "./index";

export const registration = async (login, password, role, fio) => {
    const response = await $host.post('api/user/registration', {login, password, role, fio})
    return response
}

export const login = async (login, password) => {
    const response = await $host.post('api/user/login', {login, password})
    return response
}

export const getAllUsers = async () => {
    const response = await $host.post('api/user/getAll')
    return response
}

export const isLoginUnique = async (login) => {
    const response = await $host.post('api/user/uniqueLogin', {login})
    return response
}
// export const isLoginUnique = async (login) => {
//     const response = await $host.get('api/user/uniqueLogin', {login})
//     return response
// }

// export const isPasswordCorrect = async (login, password) => {
//     const response = await $host.get('api/user/correctPassword', {login, password})
//     return response
// }

// export const isThereAnyUser = async (login) => {
//     const response = await $host.get('api/user/isThereAnyUser', {login})
//     return response
// }