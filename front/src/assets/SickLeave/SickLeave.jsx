import React, { useContext, useEffect, useState } from "react";
import "./SickLeave.css"
import Context from "../../Context"
import {getAllTypesOfSickLeave} from "../../http/typesOfSickLeaveAPI"
import {createSickLeaveRequest, checkSickLeaveRequest} from "../../http/sickLeaveRequestsAPI"

export const SickLeave = () => {
    const [value, setValue] = useState('');

    const {typesOfSickLeave, setTypesOfSickLeave} = useContext(Context)
    const {loggedUser} = useContext(Context)

    useEffect(() => {
        setTimeout(() => {
           getAllTypesOfSickLeave().then(function(val){setTypesOfSickLeave(val.data)})
        }, 100)  
    }, [])

    const options = typesOfSickLeave.map(type => {
		return <option key={type.id}>{type.type_of_sick_leave}</option>;
	});

    return(
        <div className="sickLeave">

            <p className="ff">Форма запроса больничного:</p>

            <div className="sickForm">
                <div className="typeAndNumberOfDays">
                    <p className="fff">Тип: </p>
                    <select className="selestTypeOfSickLeave" value={value} onChange = {(event) => setValue(event.target.value)}>
			            {options}
		            </select>

                    <p className="fff">Число дней: </p>
                    <input type="number" id="1234" className="selestTypeOfSickLeave"/>
                </div>
                <div className="message">
                    <p className="fff">Сообщение:</p>
                    <textarea id="sickMessage" cols="30" rows="10"></textarea>
                    <button className="sendSickLeaveRequest" onClick={(e)=>{
                        if(document.getElementById("1234").value === ''){alert("fuck you")}
                        else{
                            let request = checkSickLeaveRequest(loggedUser.id)
                            request.then(function(val){
                                if(val.data){
                                    alert("Вы уже отправляли запрос! Пожалуйста, дождитесь ответа!")
                                }
                                else{
                                    typesOfSickLeave.map(type => {
                                        if(type.type_of_sick_leave === value){
                                            createSickLeaveRequest(document.getElementById("1234").value, document.getElementById("sickMessage").value, loggedUser.id, type.id)
                                        }
                                    })
                                    document.getElementById("1234").value = ''
                                    document.getElementById("sickMessage").value = ''
                                    setValue('')
                                }
                            })
                        }
                    }}>Отправить</button>
                </div>
            </div>

        </div>
    )
}