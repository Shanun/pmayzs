import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import Col from '../../src/layout/grid/col.vue'
chai.use(sinonChai)

describe('Col', () => {
  it('存在.', () => {
    expect(Col).to.exist
  })
})