'use strict'

const RegisteredContestant = use('App/Models/RegisteredContestant')
const EligibleContestant = use('App/Models/EligibleContestant')

class ContestantController {

  async index({view}) {
    const registeredContestant = await RegisteredContestant.all()
    const eligibleContestant = await EligibleContestant.all()

    return view.render('index', {
      registeredContestants: registeredContestant.toJSON(),
      eligibleContestants: eligibleContestant.toJSON()
    })
  }

  async registerContestant({request, response, session}) {
      const registeredContestant = new RegisteredContestant()

      const randomCode = Math.floor(Math.random() * 21) + 1
      const generatedUniqueCode = 'RP-C-' + randomCode.toString()
      // console.log('Generated UniqueCode: ' + generatedUniqueCode)

      const findRandomCode = await RegisteredContestant.findBy('uniqueCode', generatedUniqueCode)
      // console.log('Found Code: ' + findRandomCode)

      do {
          randomCode
          generatedUniqueCode
      }
      while (findRandomCode);

      registeredContestant.firstName = request.input('firstName')
      registeredContestant.lastName = request.input('lastName')
      registeredContestant.email = request.input('email')
      registeredContestant.phoneNo = request.input('phoneNo')
      registeredContestant.uniqueCode = generatedUniqueCode.toString()

      const inputEmail = (registeredContestant.email).toString()
      // console.log('Email: ' + inputEmail)

      const findEmail = await RegisteredContestant.findBy('email', inputEmail)
      // console.log('Found Email: ' + findEmail)

      if (!findEmail) {
          await registeredContestant.save()
          session.flash({ registerMessage: 'Contestant registered successfully' })
      } else {
          session.flash({ registerMessage: 'Email already exist!' })
      }

      return response.redirect('/')
  }

  async generateButton({response, session }){
      const eligibleContestant = new EligibleContestant

      const randomCode = Math.floor(Math.random() * 21) + 1

      const generatedUniqueCode = 'RP-C-' + randomCode
      const compareGenerated = await RegisteredContestant.findBy('uniqueCode', generatedUniqueCode.toString())

      if (compareGenerated) {
          eligibleContestant.firstName = compareGenerated.firstName
          eligibleContestant.lastName = compareGenerated.lastName
          eligibleContestant.email = compareGenerated.email
          eligibleContestant.phoneNo = compareGenerated.phoneNo
          eligibleContestant.uniqueCode = compareGenerated.uniqueCode

          await eligibleContestant.save()

          const deleteRegistered = await RegisteredContestant.findBy('uniqueCode',generatedUniqueCode.toString())
          await deleteRegistered.delete()

          session.flash({
              displayCode: compareGenerated.uniqueCode
          })

          return response.redirect('/')

      } else {
          session.flash({
              displayCode: generatedUniqueCode.toString(),
              displayMessage: 'doesn\'t exist, please regenerate'
          })
          return response.redirect('/')
      }
  }
}

module.exports = ContestantController
