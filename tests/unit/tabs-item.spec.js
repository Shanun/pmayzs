import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import TabsItem from '../../src/navigation/tabs/tabs-item.vue'
chai.use(sinonChai)

describe('TabsItem', () => {
  it('存在.', () => {
    expect(TabsItem).to.exist
  })
})