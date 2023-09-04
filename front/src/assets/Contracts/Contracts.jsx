import React, { useContext, useEffect } from "react";
import "./Contracts.css"
import { getAllContracts } from "../../http/contractAPI";
import Context from "../../Context";
import { getAllUsers } from "../../http/userAPI";

export const Contracts = () => {

    const {allContracts, setAllContracts} = useContext(Context)
    const {allUsers, setAllUsers} = useContext(Context)

    useEffect(() => {
        setTimeout(() => {
           getAllContracts().then(function(val){setAllContracts(val.data)})
        }, 100)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
           getAllUsers().then(function(val){setAllUsers(val.data)})
        }, 100)  
    }, [])

    let getFIO = (id) => {
        let fio = ''
        allUsers.map(user => {
            if(user.id === id){
                fio = user.fio
            }
        })
        return fio
    }

    const contracts = allContracts.map(contract => {
		return(
        <div className="contract">
            <p className="contract-info">{getFIO(contract.userId)}</p>
            <p className="contract-info">{contract.salary}</p>
            <p className="contract-info">{contract.date_of_start}</p>
            <p className="contract-info">{contract.date_of_end}</p>
        </div>)
	});

    return(
        <div className="contracts-list">
            <div className="contract">
                <p className="contract-info">ФИО</p>
                <p className="contract-info">Оклад</p>
                <p className="contract-info">Дата начала</p>
                <p className="contract-info">Дата завершения</p>
            </div>
            {contracts}
        </div>
    )
}