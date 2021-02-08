import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import NavSub from '../../src/navigation/nav/nav-sub.vue'
import NavItem from '../../src/navigation/nav/nav-item.vue'
import Nav from '../../src/navigation/nav/nav.vue'
import Vue from 'vue'

chai.use(sinonChai)

describe('Nav', () => {
  it('存在.', () => {
    expect(Nav).to.exist
  })

  it('支持 selected 属性', (done) => {
    Vue.component('gear-nav-item', NavItem)
    Vue.component('gear-nav-sub', NavSub)
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      slots: {
        default: `
          <gear-nav-item name="home">首页</gear-nav-item>
          <gear-nav-sub name="about">
            <template slot="title">关于</template>
            <gear-nav-item name="team">团队</gear-nav-item>
            <gear-nav-item name="project">项目</gear-nav-item>
          </gear-nav-sub>
        `
      }
    })
    setTimeout(() => {
      expect(wrapper.find('[data-name="home"].selected').exists()).to.be.true
      done()
    })
  })

  it('会触发 update:selected 事件', (done) => {
    Vue.component('gear-nav-item', NavItem)
    Vue.component('gear-nav-sub', NavSub)
    const callback = sinon.fake()
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      slots: {
        default: `
          <gear-nav-item name="home">首页</gear-nav-item>
          <gear-nav-sub name="about">
            <template slot="title">关于</template>
            <gear-nav-item name="team">团队</gear-nav-item>
            <gear-nav-item name="project">项目</gear-nav-item>
          </gear-nav-sub>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })

    wrapper.find('[data-name="project"]').trigger('click')
    expect(callback).to.have.been.calledWith('project')
    done()
  })
})