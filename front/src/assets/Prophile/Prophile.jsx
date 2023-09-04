import React, { useContext, useEffect } from "react";
import "./Prophile.css"
import Context from "../../Context"
import {getOne} from "../../http/contractAPI"
import {getUserAllowances} from "../../http/allowancesAPI"
import {getUsersAbsenteeism} from "../../http/absenteeismAPI"

export const Prophile = () => {
    const {loggedUser} = useContext(Context)
    const {contract, setContract} = useContext(Context)
    const {allowances, setAllowances} = useContext(Context)
    const {absenteeism, setAbsenteeism} = useContext(Context)

    let setRole = () => {
        if(loggedUser.role === 'USER'){return 'Сотрудник'}
        if(loggedUser.role === 'ACCOUNTANT'){return 'Бухгалтер'}
        if(loggedUser.role === 'HRD'){return 'Сотрудник отдела кадров'}
    }

    useEffect(() => {
        setTimeout(() => {
            getOne(loggedUser.id).then(function(val){setContract(val.data)})
        }, 100)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getUserAllowances(loggedUser.id).then(function(val){setAllowances(val.data)})
        }, 100)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getUsersAbsenteeism(loggedUser.id).then(function(val){setAbsenteeism(val.data)})
        }, 100)  
    }, [])

    // let returnData = (data) => {
    //     const str = ''
    //     for(let i = 0; i < 10; i++){
    //         str[i] = data[i]
    //     }
    //     return str
    // }

    return(
        <div className="prophile">
                <div className="pr0">
                  <div className="pr1">
                    <p className="a">ФИО:</p>
                    <p className="a">Должность:</p>
                    <p className="a">Дата начала контракта:</p>
                    <p className="a">Дата завершения контракта:</p>
                    <p className="a">Доступное число дней отпуска:</p>
                    <p className="a">Число прогулов:</p>
                    <p className="a">Процент надбавок:</p>
                  </div>
                  <div className="pr2">
                    <p className="b">{loggedUser.fio}</p>
                    <p className="b">{setRole()}</p>
                    <p className="b">{contract.date_of_start}</p>
                    <p className="b">{contract.date_of_end}</p>
                    <p className="b">{contract.number_of_vacation_days}</p>
                    <p className="b">{absenteeism.number_of_absenteeism}</p>
                    <p className="b">{allowances.additional + allowances.by_contract}</p>
                  </div>
                </div>
                {/* <div className="pr3">
                  <p>Редактировать</p>
                </div>             */}
        </div>
    )
}