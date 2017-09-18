require('./setup')
const assert = require('assert')
const {PortalCreationError} = require('../lib/errors')
const RealTimeClient = require('../lib/real-time-client')

suite('RealTimeClient', () => {
  suite('createPortal', () => {
    test('failure response from rest gateway', async () => {
      const stubRestGateway = {
        post: (url, body) => {
          return Promise.resolve({ ok: false, body: {} })
        }
      }
      const client = new RealTimeClient({restGateway: stubRestGateway})

      let error
      try {
        await client.createPortal()
      } catch (e) {
        error = e
      }
      assert(error instanceof PortalCreationError)
    })
  })
})