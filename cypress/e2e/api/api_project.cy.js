import {postRequestBody, putRequestBody} from '../../fixtures/testData.json'

describe('API Project - Cypress', function(){

  let userID

  before(function(){
    cy.visit('backend')
    cy.get('.common_undernav__spCsm > button').click()
  })

  beforeEach(function(){
    cy.visit('backend')
  })

  it('Post - Create a New User', function(){
    cy.request({
      method: 'POST',
      url: Cypress.env('baseUrl'),
      body: postRequestBody
    }).then((response) => {
      userID = response.body.id

      expect(response.status).to.equal(200)
      expect(response.duration).to.be.below(200)
      Object.entries(postRequestBody).forEach(([key, value]) => {
        expect(response.body[key]).to.equal(value)
      })
    })
  })

  it('Get - Get the New User', function(){
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/${userID}`
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.duration).to.be.below(200)
      Object.entries(postRequestBody).forEach(([key, value]) => {
        expect(response.body[key]).to.equal(value)
      })
    })
  })

  it('Put - Update the User', function(){
    cy.request({
      method: 'PUT',
      url: `${Cypress.env('baseUrl')}/${userID}`,
      body: putRequestBody
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.duration).to.be.below(200)
      Object.entries(putRequestBody).forEach(([key, value]) => {
        expect(response.body[key]).to.equal(value)
      })
    })
  })

  it('Get - Get the Updated User', function(){
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/${userID}`
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.duration).to.be.below(200)
      Object.entries(putRequestBody).forEach(([key, value]) => {
        expect(response.body[key]).to.equal(value)
      })
    })
  })
  it('Delete - Delete the User', function(){
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseUrl')}/${userID}`
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.duration).to.be.below(200)
      expect(response.body.id).to.equal(undefined)
    })
  })
})