import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import Slides from '../../src/datashow/slides/slides.vue'
chai.use(sinonChai)

describe('Slides', () => {
  it('存在.', () => {
    expect(Slides).to.exist
  })
})