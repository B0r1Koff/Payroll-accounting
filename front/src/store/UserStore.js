import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor(){
        this._check = 0
        this._contract = {}
        makeAutoObservable(this)
    }

    setContract(contract){
        this._contract = contract
    }

    setCheck(check){
        this._check = check
    }

    get contract(){
        return this._contract
    }

    get check(){
        return this._check
    }
}