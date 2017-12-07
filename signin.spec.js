import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import env from './environment'

chai.use(chaiHttp)

const signInAsCheryl = async () =>
   chai.request(`https://${env.domain}`)
      .post('/api/testing/auth/signin')
      .send({
         Username: 'ccarey@sharpqa.onmicrosoft.com',
         Password: 'unsysT3@m4',
         Resource: '405b7115-ca0c-47ca-bef3-a5df119b05b8',
         ApplicationId: '6c40cd7d-48c6-4375-9f71-f15ac10f17b1'
      })

const signInAsInvalidUser = async () =>
      chai.request(`https://${env.domain}`)
         .post('/api/testing/auth/signin')
         .send({
            Username: 'ccarey@sharpqa.onmicrosoft.com',
            Password: 'this is not my password',
            Resource: '405b7115-ca0c-47ca-bef3-a5df119b05b8',
            ApplicationId: '6c40cd7d-48c6-4375-9f71-f15ac10f17b1'
         })

describe('validate signin response', () => {
   it('valid auth should send back token', async () => {
      const response = await signInAsCheryl()
      expect(response).to.have.status(200)
      expect(response).to.be.json

      const body = response.body
      expect(body.Token).to.be.a('string')
      expect(body.Token.length).to.be.at.least(1)
   })

   it('invalid auth should send 401 status with no token', async () => {
      const response = await signInAsInvalidUser()
      expect(response).to.have.status(401)
      expect(response.body.Token).to.be(undefined)
   })
})