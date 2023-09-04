import "./Vacation.css"
import React, { useContext, useEffect, useState } from "react";
import Context from "../../Context"
import {getAllTypesOfVacations} from "../../http/typesOfVacationsAPI"
import {createVacationRequest, checkVacationRequest} from "../../http/vacationRequestsAPI"
import {getOne} from "../../http/contractAPI"

export const Vacation = () => {
    const [value, setValue] = useState('');

    const {typesOfVacations, setTypesOfVacations} = useContext(Context)
    const {loggedUser} = useContext(Context)
    const {contract, setContract} = useContext(Context)

    useEffect(() => {
        setTimeout(() => {
           getAllTypesOfVacations().then(function(val){setTypesOfVacations(val.data)})
        }, 100)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getOne(loggedUser.id).then(function(val){setContract(val.data)})
        }, 100)  
    }, [])

    const options = typesOfVacations.map(type => {
		return <option key={type.id}>{type.type_of_vacation}</option>;
	});

    const isDateCorrect = () => {
        const startDate = new Date(document.getElementById("1234").value);
        const endDate = new Date(document.getElementById("12345").value);
        const differenceInMs = Math.abs(startDate - endDate);
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
        let typeId = 0
        typesOfVacations.map(type => {
            if(type.type_of_vacation === value){
                typeId = type.id 
            }
        })
        if(typeId === 0){typeId = 1}
        if(differenceInDays > contract.number_of_vacation_days && typeId === 1){
            alert("Запрошено слишком большое число дней!")
        }
        else{
            createVacationRequest(differenceInDays, document.getElementById("sickMessage").value, startDate, loggedUser.id, typeId)
            document.getElementById("1234").value = ''
            document.getElementById("12345").value = ''
            document.getElementById("sickMessage").value = ''
            setValue('')
        }
    }

    return(
        <div className="sickLeave">

            <p className="ff">Форма запроса отпуска:</p>

            <div className="sickForm">
                <div className="typeAndNumberOfDays">
                    <p className="fff">Тип: </p>
                    <select className="selestTypeOfSickLeave" value={value} onChange = {(event) => setValue(event.target.value)}>
			            {options}
		            </select>

                    <p className="fff">Дата начала: </p>
                    <input type="date" id="1234" className="selestTypeOfSickLeave"/>

                    <p className="fff">Дата завершения: </p>
                    <input type="date" id="12345" className="selestTypeOfSickLeave"/>
                </div>
                <div className="message">
                    <p className="fff">Сообщение:</p>
                    <textarea id="sickMessage" cols="30" rows="10"></textarea>
                    <button className="sendSickLeaveRequest" onClick={(e)=>{
                        let date1 = new Date(document.getElementById("1234").value)
                        let date2 = new Date(document.getElementById("12345").value)
                        let date = new Date()
                        if(document.getElementById("1234").value === '' || document.getElementById("12345").value === '' || (date1.getMonth() === date2.getMonth() && date1.getDate() >= date2.getDate()) || date1 < date || date2 < date){alert("Данные введены неверно!")}
                        else{
                            let request = checkVacationRequest(loggedUser.id)
                            request.then(function(val){
                                if(val.data){
                                    alert("Вы уже отправляли запрос! Пожалуйста, дождитесь ответа!")
                                }
                                else{
                                    isDateCorrect()
                                }
                            })
                        }
                    }}>Отправить</button>
                </div>
            </div>

        </div>
    )
}