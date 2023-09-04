import React, { useContext, useEffect, useRef, useState } from "react";
import "./Payslip.css"
import Context from "../../Context"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {getOne} from "../../http/contractAPI"
import {getData} from "../../http/threeMonthDataAPI"

export const Payslip = () => {

    const [month1, setMonth1] = useState('')
    const [month2, setMonth2] = useState('')
    const [month3, setMonth3] = useState('')
    const [month, setMonth] = useState('')
    const [monthSalary, setMonthSalary] = useState(0)

    const {loggedUser} = useContext(Context)
    const {contract, setContract} = useContext(Context)
    const {month1Salary, setMonth1Salary} = useContext(Context)
    const {month2Salary, setMonth2Salary} = useContext(Context)
    const {month3Salary, setMonth3Salary} = useContext(Context)

    useEffect(() => {
        setTimeout(() => {
            getOne(loggedUser.id).then(function(val){setContract(val.data)})
        }, 100)  
    }, [])

    let setRole = () => {
        if(loggedUser.role === 'USER'){return 'Сотрудник'}
        if(loggedUser.role === 'ACCOUNTANT'){return 'Бухгалтер'}
        if(loggedUser.role === 'HRD'){return 'Сотрудник отдела кадров'}
    }

    const monthes = [
        {num: 1, val: "Январь"},
        {num: 2, val: "Февраль"},
        {num: 3, val: "Март"},
        {num: 4, val: "Апрель"},
        {num: 5, val: "Май"},
        {num: 6, val: "Июнь"},
        {num: 7, val: "Июль"},
        {num: 8, val: "Август"},
        {num: 9, val: "Сентябрь"},
        {num: 10, val: "Октябрь"},
        {num: 11, val: "Ноябрь"},
        {num: 12, val: "Декабрь"},
]

    useEffect(() => {
        let date = new Date()
        let iter = 0
        let currentMonth = date.getMonth();
        monthes.map(i => {if(i.num === currentMonth){
            setMonth1(i.val)
            iter = i.num
        }})
        monthes.map(i => {
            if(i.num === iter-2){setMonth3(i.val)}
            if(i.num === iter-1){setMonth2(i.val)}
        })
    }, [])

    const generatePDF = () => {
        const input = document.getElementById('report');
        html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("Расчетный лист");
      });
    }

    useEffect(() => {
        setTimeout(() => {
            getData("Апрель", loggedUser.id).then(function(val){setMonth1Salary(val.data)})
        }, 200)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getData("Март", loggedUser.id).then(function(val){setMonth2Salary(val.data)})
        }, 200)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getData("Февраль", loggedUser.id).then(function(val){setMonth3Salary(val.data)})
        }, 200)  
    }, [])

    return(
        <div className="content111">
            <div className="month">
                <p className="c">Месяц:</p>
                <button id="b1" className="but" onClick={(e)=>{
                    if(month1Salary){
                        setMonth(month1)
                        setMonthSalary(month1Salary)
                        document.getElementById('b1').className = "abut"
                        document.getElementById('b2').className = "but"
                        document.getElementById('b3').className = "but"
                    }
                    }}>{month1}</button>
                <button id="b2" className="but" onClick={(e)=>{
                    if(month2Salary){
                        setMonth(month2)
                        setMonthSalary(month2Salary)
                        document.getElementById('b1').className = "but"
                        document.getElementById('b2').className = "abut"
                        document.getElementById('b3').className = "but"
                    }
                }}>{month2}</button>
                <button id="b3" className="but" onClick={(e)=>{
                    if(month3Salary){
                        setMonth(month3)
                        setMonthSalary(month3Salary)
                        document.getElementById('b1').className = "but"
                        document.getElementById('b2').className = "but"
                        document.getElementById('b3').className = "abut"
                    }
                    }}>{month3}</button>
            </div>

            <div className="payslip">
                    <div id="report">
                        <h1 className="d">Расчетный лист</h1>
                        <p>Организация: ОАО "Чпок и в гроб"</p>
                        <p>Подразделение: Отдел компании</p>
                        <p>ФИО работника: {loggedUser.fio}</p>
                        <p>Должность: {setRole()}</p>
                        <p>Должностной оклад: {contract.salary} бел. руб.</p>
                        <p>Выплата за месяц: {month}</p>
                        <p>Размер выплаты: {monthSalary.salary} бел. руб.</p>
                        <p>Размер удержаний: {monthSalary.salary*0.13/0.87} бел. руб.</p>
                    </div>
                    <button className="but" onClick={(e)=>{generatePDF()}}>Сохранить</button>
            </div>
        </div>
    )
}