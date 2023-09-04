import {makeAutoObservable} from 'mobx'

export default class ContractStore{

    constructor(){

        this._contracts = [
            // {id: 1, date_of_start: '22.12.2022', date_of_end: '22.12.2024', salary: 5000, number_of_vacation_days: 24, userId: 1},
            // {id: 2, date_of_start: '11.11.2022', date_of_end: '11.11.2024', salary: 3000, number_of_vacation_days: 24, userId: 2}
        ]

        this._types_of_sick_leaves = [
            // {id: 1, type: 1},
            // {id: 2, type: 2},
            // {id: 3, type: 3},
            // {id: 4, type: 4},
            // {id: 5, type: 5}
        ]

        this._types_of_vacations = [
            // {id: 1, type: 1},
            // {id: 2, type: 2},
            // {id: 3, type: 3},
            // {id: 4, type: 4},
            // {id: 5, type: 5}
        ]

        this._sick_leave_requests = [
            // {id: 1, number_of_days: 8, message: 'sjvnsjknbskjnbn', userId: 1, typesOfSickLeaveId: 3},
            // {id: 2, number_of_days: 12, message: 'rwmlw,l,lsvlw', userId: 2, typesOfSickLeaveId: 2}
        ]

        this._vacation_requests = [
            // {id: 1, number_of_days: 8, message: 'sjvnsjknbskjnbn', date_of_start: '12.07.2023', userId: 1, typesOfVacationId: 4},
            // {id: 2, number_of_days: 13, message: 'alcalc,lvmsk', date_of_start: '13.06.2023', userId: 2, typesOfVacationId: 5},
        ]

        this._allowances = [
            // {id: 1, by_contract: 20, additional: 15, userId: 1},
            // {id: 2, by_contract: 20, additional: 10, userId: 2},
        ]

        this._missing_workers = [
            // {id: 1, type: 'болезнь', date_of_end: '23.05.2023', userId: 1},
            // {id: 2, type: 'отпуск', date_of_end: '13.07.2023', userId: 2},
        ]

        this._number_of_spent_days = [
            // {id: 1, number_of_spent_days: 23, userId: 1},
            // {id: 2, number_of_spent_days: 26, userId: 2}
        ]

        this._number_of_spent_days = [
            // {id: 1, number_of_spent_days: 23, userId: 1},
            // {id: 2, number_of_spent_days: 26, userId: 2}
        ]

        this._sick_leave_confirms = [
            // {id: 1, number_of_days: 7, userId: 1},
            // {id: 2, number_of_days: 10, userId: 2}
        ]

        this._worker_and_absenteeism_number = [
            // {id: 1, number_of_absenteeism: 13, userId: 1},
            // {id: 2, number_of_absenteeism: 4, userId: 2}
        ]

        this._three_month_data = [
            // {id: 1, month: 'апрель', salary: 4560.23, userId: 1},
            // {id: 2, month: 'март', salary: 4640.56, userId: 1},
            // {id: 3, month: 'февраль', salary: 4230.74, userId: 1},
            // {id: 4, month: 'апрель', salary: 4867.34, userId: 2},
            // {id: 5, month: 'март', salary: 4983.18, userId: 2},
            // {id: 6, month: 'февраль', salary: 4682.52, userId: 2},
        ]

        makeAutoObservable(this)
    }

    get contracts(){
        return this._contracts
    }

    get types_of_sick_leaves(){
        return this._types_of_sick_leaves
    }

    get types_of_vacations(){
        return this._types_of_vacations
    }

    get sick_leave_requests(){
        return this._sick_leave_requests
    }

    get vacation_requests(){
        return this._vacation_requests
    }

    get allowances(){
        return this._allowances
    }

    get missing_workers(){
        return this._missing_workers
    }

    get number_of_spent_days(){
        return this._number_of_spent_days
    }

    get sick_leave_confirms(){
        return this._sick_leave_confirms
    }

    get worker_and_absenteeism_number(){
        return this._worker_and_absenteeism_number
    }

    get three_month_data(){
        return this._three_month_data
    }

    setContracts(contracts){
        this.contracts = contracts
    }
}