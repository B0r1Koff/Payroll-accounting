import React, { useState, useContext, useEffect} from "react";
import "./Requests.css"
import Context from "../../Context"
import {getAllTypesOfSickLeave} from "../../http/typesOfSickLeaveAPI"
import {getAllTypesOfVacations} from "../../http/typesOfVacationsAPI"
import { getAllUsers } from "../../http/userAPI";
import {getAllSickLeaveRequest, getSickLeaveRequest, delReq} from "../../http/sickLeaveRequestsAPI"
import {getAllVacationRequest} from "../../http/vacationRequestsAPI"
import {createVacationRequest, getVacationRequest, delVacationRequest} from "../../http/vacationRequestsAPI"
import { addWorker, getWorker, getAllWorkers, delWorker } from "../../http/missingWorkersAPI";
import { createNum, getNum, delNum } from "../../http/numberOfSpentDaysAPI";
import {getOne, delContract, createContract} from "../../http/contractAPI"
import { getUsersAbsenteeism, delUsersAbsenteeism, createUsersAbsenteeism } from "../../http/absenteeismAPI";

export const Requests = () => {

    let [content, setContent] = useState(1)

    const {typesOfSickLeave, setTypesOfSickLeave} = useContext(Context)
    const {sickLeaveRequests, setSickLeaveRequests} = useContext(Context)
    const {vacationRequests, setVacationRequests} = useContext(Context)
    const {loggedUser} = useContext(Context)
    const {typesOfVacations, setTypesOfVacations} = useContext(Context)
    const {allUsers, setAllUsers} = useContext(Context)
    const {contract, setContract} = useContext(Context)
    const {missingWorkers, setMissingWorkers} = useContext(Context)

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

    useEffect(() => {
        setTimeout(() => {
           getAllSickLeaveRequest().then(function(val){setSickLeaveRequests(val.data)})
        }, 100)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
           getAllVacationRequest().then(function(val){setVacationRequests(val.data)})
        }, 100)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
           getAllTypesOfSickLeave().then(function(val){setTypesOfSickLeave(val.data)})
        }, 100)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
           getAllTypesOfVacations().then(function(val){setTypesOfVacations(val.data)})
        }, 100)  
    }, [])

    const getNextWorkDay = (date) => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay;
      };
  
      const isWorkDay = (date) => {
        const dayOfWeek = date.getDay();
        return dayOfWeek >= 1 && dayOfWeek <= 5;
      };

    const handleDeleteSick = (index) => { 
        let req = getSickLeaveRequest(index)
        req.then(function(val){
            let reason = ''
            let daysNum = 0
            if(val.data.typesOfSickLeaveId === 1){reason = 'aaa'}
            if(val.data.typesOfSickLeaveId === 2){reason = 'bbb'}
            if(val.data.typesOfSickLeaveId === 3){reason = 'ccc'}
            let currentDate = new Date()
            let rezultDate = new Date(currentDate)
            rezultDate.setDate(rezultDate.getDate() + val.data.number_of_days)
            let days = val.data.number_of_days-1
            let num = getNum(val.data.userId)
            num.then(function(val) {
                daysNum = val.data.number_of_spent_days
                let currentDate = new Date();
                let currentMonth = currentDate.getMonth();
                let nextMonth = (currentMonth + 1) % 12;
                let nextMonthFirstDay = new Date(currentDate.getFullYear(), nextMonth, 1);
                let endOfMonth = new Date(nextMonthFirstDay - 1);
                let millisecondsPerDay = 24 * 60 * 60 * 1000;
                let timeRemaining = endOfMonth - currentDate;
                let daysRemaining = Math.ceil(timeRemaining / millisecondsPerDay);
                let count = 0
                let date = new Date()
                if(daysRemaining >= days){
                    while (days > 0) {
                        if (isWorkDay(date)) {
                          count++;
                          days--;
                        }
                        date = getNextWorkDay(date);
                      }
                }
                else{
                    while (daysRemaining > 0) {
                        if (isWorkDay(date)) {
                          count++;
                          daysRemaining--;
                        }
                        date = getNextWorkDay(date);
                      }
                }
                daysNum = daysNum - count
                
                setTimeout(() => {
                    delNum(val.data.userId)
                }, 100)
                setTimeout(() => {
                    createNum(daysNum, val.data.userId)
                }, 200)  
            })
            setTimeout(() => {
                addWorker(reason, rezultDate, val.data.userId)
            }, 300) 
             setTimeout(() => {
                delReq(index)
            }, 400) 
            setTimeout(() => {
                getAllSickLeaveRequest().then(function(val){setSickLeaveRequests(val.data)})
             }, 500)  
        })
    }

    let getFIO = (id) => {
        let fio = ''
        allUsers.map(user => {
            if(user.id === id){
                fio = user.fio
            }
        })
        return fio
    }

    let getTypeOfSickLeave = (id) => {
        let Type = ''
        typesOfSickLeave.map(type => {
            if(type.id === id){
                Type = type.type_of_sick_leave
            }
        })
        return Type
    }

    let getTypeOfVacation = (id) => {
        let Type = ''
        typesOfVacations.map(type => {
            if(type.id === id){
                Type = type.type_of_vacation
            }
        })
        return Type
    }

    let findDateDifference = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const difference = endDate - startDate;
        const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
        return daysDifference;
      }

    const handleDeleteVacation = (index) => {
        let req = getVacationRequest(index)
        req.then(function(val){
            let date1 = new Date()
            let date2 = new Date(val.data.date_of_start)
            let reason = ''
            let daysNum = 0
            if(val.data.typesOfVacationId === 1){reason = 'Трудовой отпуск'}
            if(val.data.typesOfVacationId === 2){reason = 'Соц отпуск'}
            if(val.data.typesOfVacationId === 3){reason = 'Соц отпуск (неопл)'}
            let currentDate = new Date()
            let rezultDate = new Date(currentDate)
            rezultDate.setDate(rezultDate.getDate() + val.data.number_of_days)
            if(date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()){
                let days = val.data.number_of_days
                let num = getNum(val.data.userId)
                num.then(function(val) {
                daysNum = val.data.number_of_spent_days
                let currentDate = new Date();
                let currentMonth = currentDate.getMonth();
                let nextMonth = (currentMonth + 1) % 12;
                let nextMonthFirstDay = new Date(currentDate.getFullYear(), nextMonth, 1);
                let endOfMonth = new Date(nextMonthFirstDay - 1);
                let millisecondsPerDay = 24 * 60 * 60 * 1000;
                let timeRemaining = endOfMonth - currentDate;
                let daysRemaining = Math.ceil(timeRemaining / millisecondsPerDay);
                let count = 0
                let date = new Date()
                if(daysRemaining >= days){
                    while (days > 0) {
                        if (isWorkDay(date)) {
                          count++;
                          days--;
                        }
                        date = getNextWorkDay(date);
                      }
                }
                else{
                    while (daysRemaining > 0) {
                        if (isWorkDay(date)) {
                          count++;
                          daysRemaining--;
                        }
                        date = getNextWorkDay(date);
                      }
                }
                daysNum = daysNum - count
                if(reason != "Соц отпуск"){
                    setTimeout(() => {
                        delNum(val.data.userId)
                    }, 100)
                    setTimeout(() => {
                        createNum(daysNum, val.data.userId)
                    }, 200) 
                }
                if(reason === "Трудовой отпуск"){
                    getOne(val.data.userId).then(function(val){setContract(val.data)})
                    let date_of_start = contract.date_of_start
                    let date_of_end = contract.date_of_end
                    let salary = contract.salary
                    let number_of_vacation_days = contract.number_of_vacation_days - count
                    setTimeout(() => {
                        delContract(val.data.userId)
                    }, 100)
                    setTimeout(() => {
                        createContract(date_of_start, date_of_end, salary, number_of_vacation_days, val.data.userId)
                    }, 200)
                }
            })
            setTimeout(() => {
                addWorker(reason, rezultDate, val.data.userId)
            }, 300) 
             setTimeout(() => {
                delVacationRequest(index)
            }, 400) 
            setTimeout(() => {
                getAllVacationRequest().then(function(val){setVacationRequests(val.data)})
            }, 500)
            }
            else{
                delVacationRequest(val.data.id)
                setTimeout(() => {
                    getAllVacationRequest().then(function(val){setVacationRequests(val.data)})
                }, 100)
            }
        })
    }

    const sickList = sickLeaveRequests.map(type => {
		return (      
            <div className="list" key={type.id}>
                <p className="req-info">{getFIO(type.userId)}</p>
                <p className="req-info">{getTypeOfSickLeave(type.typesOfSickLeaveId)}</p>
                <p className="req-info">{type.number_of_days}</p>
                <p className="req-info">{type.message}</p>
                <div className="req-info">
                    <button className="answer" onClick={(e) => handleDeleteSick(type.id)}>Подтвердить</button>
                    <button className="answer" onClick={(e) => {
                        delReq(type.id)
                        setTimeout(() => {
                            getAllSickLeaveRequest().then(function(val){setSickLeaveRequests(val.data)})
                         }, 100)
                    }}>Отклонить</button>
                </div>
                    
            </div>      
        ) 
	});

    const vacationList = vacationRequests.map(type => {
		return (      
            <div className="list" key={type.id}>
                <p className="req-info">{getFIO(type.userId)}</p>
                <p className="req-info">{getTypeOfVacation(type.typesOfVacationId)}</p>
                <p className="req-info">{type.number_of_days}</p>
                <p className="req-info">{type.date_of_start}</p>
                <p className="req-info">{type.message}</p>
                <div className="req-info">
                    <button className="answer" onClick={(e) => handleDeleteVacation(type.id)}>Подтвердить</button>
                    <button className="answer" onClick={(e) => {
                        delVacationRequest(type.id)
                        setTimeout(() => {
                            getAllVacationRequest().then(function(val){setVacationRequests(val.data)})
                        }, 100)
                    }}>Отклонить</button>
                </div>
            </div>      
        ) 
	});

    const systemList = missingWorkers.map(worker => {
        let date = new Date()
        let date1 = new Date(worker.date_of_end)
        if(date1.getDay() <= date.getDay() && date1.getMonth() <= date.getMonth() && date1.getFullYear() <= date.getFullYear()){
            let daysDifference = findDateDifference(worker.createdAt, date1)
            return(
                <div className="list" key={worker.id}>
                <p className="req-info">{getFIO(worker.userId)}</p>
                <p className="req-info">{worker.type}</p>
                <p className="req-info">{daysDifference}</p>
                <div className="req-info">
                    <button className="answer" onClick={(e) => {
                        delWorker(worker.id)        
                        setTimeout(() => {
                           getAllWorkers().then(function(val){setMissingWorkers(val.data)})
                        }, 100)  
                    }}>Подтвердить</button>
                    <button className="answer" onClick={(e) => {
                        let abs = getUsersAbsenteeism(worker.userId)
                        abs.then(function(val){
                            let num = val.data.number_of_absenteeism + daysDifference
                            delUsersAbsenteeism(val.data.userId)
                            setTimeout(() => {
                                createUsersAbsenteeism(num, val.data.userId)
                            }, 100) 
                            setTimeout(() => {
                                delWorker(worker.id) 
                            }, 200)        
                            setTimeout(() => {
                                getAllWorkers().then(function(val){setMissingWorkers(val.data)})
                            }, 300) 
                        })
                    }}>Отклонить</button>
                </div> 
            </div>    
            )
        }
    })

    return(
        <div className="req">
            <div className="typeButtons">
                <button className={`${(content === 1) ? 'atpbtn' : 'tpbtn'}`} onClick={(e)=>{setContent(1)}}>Больничный</button>
                <button className={`${(content === 2) ? 'atpbtn' : 'tpbtn'}`} onClick={(e)=>{setContent(2)}}>Отпуск</button>
                <button className={`${(content === 3) ? 'atpbtn' : 'tpbtn'}`} onClick={(e)=>{setContent(3)}}>Система</button>
            </div>

            <div className="reqList">
                {
                    (content === 1) ? (
                        <div className="qwer">
                            <div className="list">
                                <p className="req-info">ФИО</p>
                                <p className="req-info">Тип</p>
                                <p className="req-info">Число дней</p>
                                <p className="req-info">Сообщение</p>
                                <p className="req-info">Ответ</p>
                            </div>
                            {sickList}
                        </div>
                    ) : (content === 2) ? (
                        <div className="qwer">
                            <div className="list">
                                <p className="req-info">ФИО</p>
                                <p className="req-info">Тип</p>
                                <p className="req-info">Число дней</p>
                                <p className="req-info">Дата начала</p>
                                <p className="req-info">Сообщение</p>
                                <p className="req-info">Ответ</p>
                            </div>
                            {vacationList}
                        </div>
                    ) : (
                        <div className="qwer">
                            <div className="list">
                                <p className="req-info">ФИО</p>
                                <p className="req-info">Тип</p>
                                <p className="req-info">Число дней</p>
                                <p className="req-info">Ответ</p>
                            </div>
                            {systemList}
                        </div>
                    ) 
                }
            </div>
        </div>
    );
}