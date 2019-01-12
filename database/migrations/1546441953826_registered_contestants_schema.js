'use strict'

const Schema = use('Schema')

class RegisteredContestantsSchema extends Schema {
  up () {
    this.create('registered_contestants', (table) => {
      table.increments()
      table.string('firstName')
      table.string('lastName')
      table.string('email')
      table.string('phoneNo')
      table.string('uniqueCode')
      table.timestamps()
    })
  }

  down () {
    this.drop('registered_contestants')
  }
}

module.exports = RegisteredContestantsSchema
