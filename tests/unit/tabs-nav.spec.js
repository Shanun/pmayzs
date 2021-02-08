import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import TabsNav from '../../src/navigation/tabs/tabs-nav.vue'
chai.use(sinonChai)

describe('TabsNav', () => {
  it('存在.', () => {
    expect(TabsNav).to.exist
  })
})