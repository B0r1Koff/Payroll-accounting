import "./NewContract.css"
import React, { useContext, useEffect, useState } from "react";
import Context from "../../Context"
import { createAllowances } from "../../http/allowancesAPI";
import { createContract} from "../../http/contractAPI";
import { isLoginUnique, getAllUsers, registration } from "../../http/userAPI";
import { createNum } from "../../http/numberOfSpentDaysAPI";
import { createUsersAbsenteeism } from "../../http/absenteeismAPI";

export const NewContract = () => {

    const [value, setValue] = useState('Сотрудник');
    const {allUsers, setAllUsers} = useContext(Context)

    useEffect(() => {
        setTimeout(() => {
           getAllUsers().then(function(val){setAllUsers(val.data)})
        }, 100)  
    }, [])

    const Role = [
        {id: 1, value: "Сотрудник"},
        {id: 2, value: "Бухгалтер"},
        {id: 3, value: "Сотрудник отдела кадров"},
    ]

    const options = Role.map(i => {
		return <option key={i.id}>{i.value}</option>;
	});

    let sendRequest = () => {
        let alrt = 0
        let log = isLoginUnique(document.getElementById("login").value)
        log.then(function(val){
            if(val.data){
                alert("Сотрудник с таким логином уже зарегистрирован!")
            } else{
                const startDate = new Date(document.getElementById("dateOfStart").value);
                const endDate = new Date(document.getElementById("dateOfEnd").value);
                let role = "USER"
                Role.map(i => {
                    if(i.value === value){
                        if(value === "Бухгалтер") {role = "ACCOUNTANT"}
                        if(value === "Сотрудник отдела кадров") {role = "HRD"}
                    }
                })
                let userId = 10
                allUsers.map(user => {
                    userId = user.id
                })
                userId = userId+1
                if(startDate >= endDate){
                    alert("Срок действия контракта указан неверно!")
                    alrt = 1
                }
                if(document.getElementById("contractAllowances").value < 10 || document.getElementById("contractAllowances").value > 30){
                    alert("Процент надбавок должен быть не ниже 10, и не выше 30!")
                    alrt = 1
                }
                if(document.getElementById("additionalAllowances").value < 10 || document.getElementById("additionalAllowances").value > 30){
                    alert("Процент премии должен быть не ниже 10, и не выше 30!")
                    alrt = 1
                }
                if(document.getElementById("salary").value < 554){
                    alert("Зарплата сотрудника не может быть меньше 554 бел. руб.!")
                    alrt = 1
                }
                if(alrt != 1){
                    registration(document.getElementById("login").value, document.getElementById("password").value, role, `${document.getElementById("surname").value} ${document.getElementById("name").value} ${document.getElementById("lastname").value}`)
                    setTimeout(() => {
                        createContract(startDate, endDate, document.getElementById("salary").value, 24, userId)
                    }, 100) 
                     setTimeout(() => {
                        createAllowances(document.getElementById("contractAllowances").value, document.getElementById("additionalAllowances").value, userId)
                    }, 100) 
                    setTimeout(() => {
                        createNum(22, userId)
                    }, 100) 
                    setTimeout(() => {
                        createUsersAbsenteeism(0, userId)
                    }, 100) 
                }
            }
        })
    }

    return(
        <div className="newContract-form">
            <p className="aa1">Форма создания нового контракта:</p>
            <div className="newContract">
                <div className="user-info">
                    <p className="prew">Данные о сотруднике:</p>
                    <p>Должность:</p>
                    <select className="selestTypeOfSickLeave" value={value} onChange = {(event) => setValue(event.target.value)}>
			            {options}
		            </select>
                    <p>Фамилия:</p>
                    <input type="text" id="surname"/>
                    <p>Имя:</p>
                    <input type="text" id="name"/>
                    <p>Отчество:</p>
                    <input type="text" id="lastname"/>
                    <p>Логин:</p>
                    <input type="text" id="login"/>
                    <p>Пароль:</p>
                    <input type="text" id="password"/>
                </div>

                <div className="contract-info">
                    <p className="prew">Данные о контракте:</p>
                    <p>Дата начала:</p>
                    <input type="date" id="dateOfStart"/>
                    <p>Дата завершения:</p>
                    <input type="date" id="dateOfEnd"/>
                    <p>Оклад:</p>
                    <input type="number" id="salary"/>
                    <p>Процент надбавок:</p>
                    <input type="number" id="contractAllowances"/>
                    <p>Максимальный размер премий (%) :</p>
                    <input type="number" id="additionalAllowances"/>
                </div>
            </div>
            <button onClick={(e) => {
                if(document.getElementById("name").value === "" || document.getElementById("surname").value === "" || document.getElementById("lastname").value === "" || document.getElementById("login").value === "" || document.getElementById("password").value === "" || document.getElementById("dateOfStart").value === "" || document.getElementById("dateOfEnd").value === "" || document.getElementById("salary").value === "" || document.getElementById("contractAllowances").value === "" || document.getElementById("additionalAllowances").value === ""){
                    alert("Не все поля заполнены!")
                } else{
                    sendRequest()
                }
            }}>Подтвердить</button>
        </div>
    )
}