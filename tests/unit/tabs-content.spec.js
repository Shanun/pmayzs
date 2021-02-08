import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import TabsContent from '../../src/navigation/tabs/tabs-content.vue'
chai.use(sinonChai)

describe('TabsContent', () => {
  it('存在.', () => {
    expect(TabsContent).to.exist
  })
})