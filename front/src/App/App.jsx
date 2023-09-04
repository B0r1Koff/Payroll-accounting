import "./App.css";
import {Routes, Route} from "react-router-dom"
import { Authorization } from "../components/Authorization";
import { User } from "../components/User";
import { Accountant } from "../components/Accountant";
import { HRD } from "../components/HRD";
import { useContext, useEffect, useState } from "react";
import Context from "../Context"
import React from "react";
import {getData, delData, createData} from "../../src/http/threeMonthDataAPI"
import { addWorker, getWorker, getAllWorkers, delWorker } from "../../src/http/missingWorkersAPI";
import { createNum, getNum, delNum } from "../../src/http/numberOfSpentDaysAPI";
import {getAllContracts} from "../../src/http/contractAPI"
import { getUsersAbsenteeism, delUsersAbsenteeism, createUsersAbsenteeism } from "../../src/http/absenteeismAPI";
import {getUserAllowances} from "../../src/http/allowancesAPI"

export const App = () => {

  const [loggedUser, setLoggedUser] = useState({})
  const [contract, setContract] = useState({})
  const [allowances, setAllowances] = useState({})
  const [absenteeism, setAbsenteeism] = useState({})
  const [month1Salary, setMonth1Salary] = useState({})
  const [month2Salary, setMonth2Salary] = useState({})
  const [month3Salary, setMonth3Salary] = useState({})
  const [typesOfSickLeave, setTypesOfSickLeave] = useState([])
  const [typesOfVacations, setTypesOfVacations] = useState([])
  const [allContracts, setAllContracts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [sickLeaveRequests, setSickLeaveRequests] = useState([])
  const [vacationRequests, setVacationRequests] = useState([])
  const [missingWorkers, setMissingWorkers] = useState([])

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

  let [abs, setAbs] = useState(0)

  useEffect(() => {
    const raw = localStorage.getItem('loggedUser') || false
    setLoggedUser(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
  }, [loggedUser])

  useEffect(() => {
    let contracts = getAllContracts()
    if(contracts){
      contracts.then(function(val) {
        let date = new Date()
        let month = ''
        let lastMonth = ''
        let monthNum = 0
        monthes.map(m => {
          if(m.num === date.getMonth()){
            month = m.val
            monthNum = m.num
            let i = m.num - 3
            monthes.map(m => {
              if(m.num === i){
                lastMonth = m.val
              }
            })
          }
        })
        val.data.map(contract => {
          let salary = contract.salary
          let ID = contract.userId
          let date_of_start = new Date(contract.date_of_start)
          let absenteeism = getUsersAbsenteeism(contract.userId)
          absenteeism.then(function(val){
            let abse = val.data.number_of_absenteeism
            let allowances = getUserAllowances(val.data.userId)
            allowances.then(function(val) {
              let by_contract = val.data.by_contract
              let additional = val.data.additional
              let numberOfSpentDays = getNum(val.data.userId)
              numberOfSpentDays.then(function(val) {
                let number_of_spent_days = val.data.number_of_spent_days
                let monthData = getData(month, val.data.userId)
                monthData.then(function(val) {
                  if(!val.data){
                    if(date_of_start.getMonth()+1 <= monthNum){
                    let usersAllowances = 0
                    if(abse < 5){
                      usersAllowances = by_contract + (number_of_spent_days/22)*additional
                    }
                    let usersSalary = (salary + salary * usersAllowances / 100)*0.87
                    createData(month, usersSalary, ID)
                    let lastMonthData = getData(lastMonth, ID)
                    if(lastMonthData){
                      lastMonthData.then(function(val){
                        delData(lastMonth, ID)
                      })
                    }
                    delNum(ID)
                    createNum(22, ID)
                    delUsersAbsenteeism(ID)
                    createUsersAbsenteeism(0, ID)
                  }
                }
                  })
              })
            })
          })
        })
      })
    }
  }, [])

  return (
    <Context.Provider value={{
      loggedUser, 
      setLoggedUser,
      contract,
      setContract,
      allowances,
      setAllowances,
      absenteeism,
      setAbsenteeism,
      month1Salary,
      setMonth1Salary,
      month2Salary,
      setMonth2Salary,
      month3Salary,
      setMonth3Salary,
      typesOfSickLeave,
      setTypesOfSickLeave,
      typesOfVacations,
      setTypesOfVacations,
      allContracts,
      setAllContracts,
      allUsers,
      setAllUsers,
      sickLeaveRequests,
      setSickLeaveRequests,
      vacationRequests,
      setVacationRequests,
      missingWorkers,
      setMissingWorkers,
  }}>

    <div className="App">

     {loggedUser === false &&
        <Routes>
          <Route path="*" element={<Authorization />}></Route>
        </Routes>
      }

      {loggedUser != false &&
        <Routes>
          <Route path="*" element={<Authorization />}></Route>
          <Route path="/user" element={<User/>}></Route>
          <Route path="/accountant" element={<Accountant />}></Route>
          <Route path="/hrd" element={<HRD />}></Route>
        </Routes>
      }
      
      {/* {loggedUser === false &&
        <Routes>
          <Route path="*" element={<Authorization />}></Route>
        </Routes>
      }

      {loggedUser.role === "USER" &&
        <Routes>
          <Route path="*" element={<Authorization />}></Route>
          <Route path="/user" element={<User/>}></Route>
        </Routes>
      }
      
      {loggedUser.role === "ACCOUNTANT" &&
        <Routes>
          <Route path="*" element={<Authorization />}></Route>
          <Route path="/accountant" element={<Accountant />}></Route>
        </Routes>
      }

      {loggedUser.role === "HRD" &&
        <Routes>
          <Route path="*" element={<Authorization />}></Route>
          <Route path="/hrd" element={<HRD />}></Route>
        </Routes>
      } */}

      {/* {loggedUser.role != false &&
        <Routes>
          <Route path="*" element={<Authorization />}></Route>
          <Route path="/user" element={<User/>}></Route>
          <Route path="/accountant" element={<Accountant />}></Route>
          <Route path="/hrd" element={<HRD />}></Route>
        </Routes>
      } */}
      
    </div>
    </Context.Provider>
  );
};
