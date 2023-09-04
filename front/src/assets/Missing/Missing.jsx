import React, { useContext, useEffect } from "react";
import "./Missing.css"
import { getAllWorkers } from "../../http/missingWorkersAPI";
import Context from "../../Context";
import { getAllUsers } from "../../http/userAPI";

export const Missing = () => {

    const {missingWorkers, setMissingWorkers} = useContext(Context)
    const {allUsers, setAllUsers} = useContext(Context)

    useEffect(() => {
        setTimeout(() => {
           getAllWorkers().then(function(val){setMissingWorkers(val.data)})
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

    const workers = missingWorkers.map(worker => {
		return(
        <div className="contract">
            <p className="contract-info">{getFIO(worker.userId)}</p>
            <p className="contract-info">{worker.type}</p>
            <p className="contract-info">{worker.date_of_end}</p>
        </div>)
	});

    return(
        <div className="contracts-list">
            <div className="contract">
                <p className="contract-info">ФИО</p>
                <p className="contract-info">Тип</p>
                <p className="contract-info">Дата завершения</p>
            </div>
            {workers}
        </div>
    )
}