import React from "react"
import "./Accountant.css";
import { useState, useContext } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import {Prophile} from "../../assets/Prophile"
import {Payslip} from "../../assets/Payslip"
import {SickLeave} from "../../assets/SickLeave"
import {Vacation} from "../../assets/Vacation"
import { Requests } from "../../assets/Requests";
import { Missing } from "../../assets/Missing";
import Context from "../../Context";

export const Accountant = () => { 
  let [content, setContent] = useState(-1);
  const {loggedUser} = useContext(Context)

  return (
    <div className="Page">

      <nav className="Menu-List">
        
        <ul className="Menu">
          <li className="active-button" id="0" onClick={(e) => {setContent(0)
          document.getElementById(1).className = "button"
          document.getElementById(2).className = "button"
          document.getElementById(3).className = "button"
          document.getElementById(4).className = "button"
          document.getElementById(5).className = "button"
          document.getElementById(6).className = "button"
          document.getElementById(0).className = "active-button"
          }}>
            <p className="buttonText">Профиль</p>
          </li>
          <li className="button" id="1" onClick={(e)=>{setContent(1)
          document.getElementById(0).className = "button"
          document.getElementById(2).className = "button"
          document.getElementById(3).className = "button"
          document.getElementById(4).className = "button"
          document.getElementById(5).className = "button"
          document.getElementById(6).className = "button"
          document.getElementById(1).className = "active-button"
          }}>
            <p className="buttonText">Расчетный_лист</p>
          </li>
          <li className="button" id="2" onClick={(e)=>{setContent(2)
          document.getElementById(0).className = "button"
          document.getElementById(1).className = "button"
          document.getElementById(3).className = "button"
          document.getElementById(4).className = "button"
          document.getElementById(5).className = "button"
          document.getElementById(6).className = "button"
          document.getElementById(2).className = "active-button"
          }}>
            <p className="buttonText">Больничный</p>
          </li>
          <li className="button" id="3" onClick={(e)=>{setContent(3)
          document.getElementById(0).className = "button"
          document.getElementById(1).className = "button"
          document.getElementById(2).className = "button"
          document.getElementById(4).className = "button"
          document.getElementById(5).className = "button"
          document.getElementById(6).className = "button"
          document.getElementById(3).className = "active-button"
          }}>
            <p className="buttonText">Отпуск</p>
          </li>
          <li className="button" id="4" onClick={(e)=>{setContent(4)
          document.getElementById(0).className = "button"
          document.getElementById(1).className = "button"
          document.getElementById(2).className = "button"
          document.getElementById(3).className = "button"
          document.getElementById(5).className = "button"
          document.getElementById(6).className = "button"
          document.getElementById(4).className = "active-button"
          }}>
            <p className="buttonText">Запросы  </p>
          </li>
          <li className="button" id="5" onClick={(e)=>{setContent(5)
          document.getElementById(0).className = "button"
          document.getElementById(1).className = "button"
          document.getElementById(2).className = "button"
          document.getElementById(3).className = "button"
          document.getElementById(4).className = "button"
          document.getElementById(6).className = "button"
          document.getElementById(5).className = "active-button"
          }}>
            <p className="buttonText">Отсутствующие</p>
          </li>
          <li className="button" id="6">
            <Link to='*' className="buttonText">Выход </Link>
          </li>
        </ul>

      </nav>

      <div className="Content">
        {
            (content === 0) ? (
              <Prophile/>
            ) : (content === 1) ? (
              <Payslip/>
            ) : (content === 2) ? (
              <SickLeave/>
            ) : (content === 3) ? (
              <Vacation/>
            ) : (content === 4) ? (
              <Requests/>
            ) : (content === 5) ? (
              <Missing/>
              ) : (
                <div>
                <p>Добро пожаловать, {loggedUser.fio}!</p>
              </div>
              )
        }
      </div>
    </div>
  );
};