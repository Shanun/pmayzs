import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import Springs from '../../src/action/springs/springs.vue'
chai.use(sinonChai)

describe('Springs', () => {
  it('存在.', () => {
    expect(Springs).to.exist
  })
})