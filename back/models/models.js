const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    fio: {type: DataTypes.STRING}, 
})

const Contract = sequelize.define('contract', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date_of_start: {type: DataTypes.DATE},
    date_of_end: {type: DataTypes.DATE},
    salary: {type: DataTypes.DOUBLE},
    number_of_vacation_days: {type: DataTypes.STRING}, 
})

const Allowances = sequelize.define('allowances', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    by_contract: {type: DataTypes.DOUBLE},
    additional: {type: DataTypes.DOUBLE},
})

const Number_of_spent_days = sequelize.define('number_of_spent_days', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_of_spent_days: {type: DataTypes.INTEGER},
})

const Types_of_vacation = sequelize.define('types_of_vacation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type_of_vacation: {type: DataTypes.STRING},
})

const Types_of_sick_leave = sequelize.define('types_of_sick_leave', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type_of_sick_leave: {type: DataTypes.STRING},
})

const Sick_leave_requests = sequelize.define('sick_leave_requests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_of_days: {type: DataTypes.INTEGER},
    message: {type: DataTypes.STRING},
})

const Vacation_requests = sequelize.define('vacation_requests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_of_days: {type: DataTypes.INTEGER},
    message: {type: DataTypes.STRING},
    date_of_start: {type: DataTypes.DATE},
})

const Missing_workers = sequelize.define('missing_workers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING},
    date_of_end: {type: DataTypes.DATE},
})

const Three_month_data = sequelize.define('three_month_data', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    month: {type: DataTypes.STRING},
    salary: {type: DataTypes.DOUBLE},
})

const Worker_and_absenteeism_number = sequelize.define('worker_and_absenteeism_number', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_of_absenteeism: {type: DataTypes.INTEGER},
})

const Sick_leave_confirm = sequelize.define('sick_leave_confirm', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_of_days: {type: DataTypes.INTEGER},
})

User.hasOne(Contract)
Contract.belongsTo(User)

User.hasOne(Allowances)
Allowances.belongsTo(User)

User.hasOne(Number_of_spent_days)
Number_of_spent_days.belongsTo(User)

User.hasOne(Sick_leave_requests)
Types_of_sick_leave.hasMany(Sick_leave_requests)
Sick_leave_requests.belongsTo(User)
Sick_leave_requests.belongsTo(Types_of_sick_leave)

User.hasOne(Vacation_requests)
Types_of_vacation.hasMany(Vacation_requests)
Vacation_requests.belongsTo(User)
Vacation_requests.belongsTo(Types_of_vacation)

User.hasOne(Missing_workers)
Missing_workers.belongsTo(User)

User.hasMany(Three_month_data)
Three_month_data.belongsTo(User)

User.hasOne(Worker_and_absenteeism_number)
Worker_and_absenteeism_number.belongsTo(User)

User.hasOne(Sick_leave_confirm)
Sick_leave_confirm.belongsTo(User)

module.exports = {
    User,
    Contract,
    Allowances,
    Number_of_spent_days,
    Types_of_vacation,
    Types_of_sick_leave,
    Sick_leave_requests,
    Vacation_requests, 
    Missing_workers,
    Three_month_data,
    Worker_and_absenteeism_number,
    Sick_leave_confirm
}