'use strict'

const Schema = use('Schema')

class EligibleContestantsSchema extends Schema {
  up () {
    this.create('eligible_contestants', (table) => {
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
    this.drop('eligible_contestants')
  }
}

module.exports = EligibleContestantsSchema
