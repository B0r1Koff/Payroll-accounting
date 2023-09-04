import React from "react"
import "./Authorization.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Context from "../../Context";
import { useContext } from "react";
import {login} from "../../http/userAPI"

export const Authorization = () => {
   var [nav, setNav]= useState(''); 
   const navigate = useNavigate()

   const {setLoggedUser} = useContext(Context)

   return( 
    <div className="Authorization">
        <div className="Anketa">
            <p className="p">Логин:</p>
            <input type="text" name="" id="Login" />
            <p className="p">Пароль:</p> 
            <input type="password" name="" id="Password" />  
         
                <Link to={nav} className="Accept-button" onClick={async (e) => {
                    if(document.getElementById("Login").value === "" || document.getElementById("Password").value === ""){
                    alert("Заполните поля!")
                    e.preventDefault()
                    } else{  
                        try{
                            let data = await login(document.getElementById("Login").value, document.getElementById("Password").value)
                            if(data.data.role === 'USER'){
                            navigate('/user')}
                            if(data.data.role === 'ACCOUNTANT'){
                            navigate('/accountant')}
                            if(data.data.role === 'HRD'){
                            navigate('/hrd')}
                            setLoggedUser(data.data)
                        }
                        catch(e){
                            alert("Ошибка!")
                        }
                    } 
                }}>Подтвердить</Link>
            
        </div>
    </div>
   );
};