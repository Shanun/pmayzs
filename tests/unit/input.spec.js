import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import Input from '../../src/form/input/input.vue'
chai.use(sinonChai)

describe('Input', () => {
  it('存在.', () => {
    expect(Input).to.exist
  })
})