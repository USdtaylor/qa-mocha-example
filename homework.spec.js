import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import env from './environment'

chai.use(chaiHttp)

// copied from http://guid.us/GUID/JavaScript
const newGuid = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)

const signInAsCheryl = async () =>
   chai.request(`https://${env.domain}`)
      .post('/api/testing/auth/signin')
      .send({
         Username: 'ccarey@sharpqa.onmicrosoft.com',
         Password: 'unsysT3@m4',
         Resource: '405b7115-ca0c-47ca-bef3-a5df119b05b8',
         ApplicationId: '6c40cd7d-48c6-4375-9f71-f15ac10f17b1'
      })

// this function doesn't work, not sure why
const createProvider = async (token, factoryName, displayName) =>
   chai.request(`https://${env.domain}`)
      .post('/api/organizationmgmt/organization/providers/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
         CommandId: newGuid(),
         Command: {
            ProviderIdentity: null,
            Provider: {
               FactoryName: factoryName,
               DisplayName: {
                  isSet: true,
                  value: displayName
               }
            }
         }
      })

describe('homework', () => {
   let token = ''

   before(async () => {
      // Authenticate User
      const signinResponse = await signInAsCheryl()
      token = signinResponse.body.Token
      console.log(token)

      // Create 10 Providers
      for (let i = 0; i < 10; i++) {
         await createProvider(token, `Provider - ${i}`, `Provider - ${i} - Display Name`)
      }
   })

   it('validate create org model', () => {

   })
})