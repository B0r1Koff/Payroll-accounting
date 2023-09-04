import { $host } from "./index";

export const getAllTypesOfVacations = async () => {
    const response = await $host.post('api/typesOfVacations/getAllTypesOfVacations')
    return response
}