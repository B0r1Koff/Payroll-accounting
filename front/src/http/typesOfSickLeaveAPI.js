import { $host } from "./index";

export const getAllTypesOfSickLeave = async () => {
    const response = await $host.post('api/typesOfSickLeave/getAllTypesOfSickLeave')
    return response
}