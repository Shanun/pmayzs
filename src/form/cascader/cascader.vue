<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">
      {{ result || '&nbsp;' }}
      <gear-icon class="right-icon" :class="{ active: isActive }" name="right"></gear-icon>
    </div>
    <gear-springs class="popover-wrapper" :visible="popoverVisible">
      <gear-cascader-items :items="source" class="popover" :loadData="loadData"
                           :loading-item="loadingItem"
                           :height="popoverHeight" :selected="selected"
                           @update:selected="onUpdateSelected"
      ></gear-cascader-items>
    </gear-springs>
  </div>
</template>

<script>
  import Icon from '../../base/icon/icon'
  import CascaderItems from './cascader-items'
  import ClickOutside from '../../plugins/click-outside'
  import Springs from "../../action/springs/springs"

  export default {
    name: "GearCascader",
    components: {
      'gear-springs': Springs,
      'gear-icon': Icon,
      'gear-cascader-items': CascaderItems
    },
    directives: {
      ClickOutside
    },
    props: {
      source: {
        type: Array
      },
      popoverHeight: {
        type: String,
        default: '200px'
      },
      selected: {
        type: Array,
        default: () => {
          return []
        }
      },
      loadData: {
        type: Function
      }
    },
    data () {
      return {
        isActive: false,
        popoverVisible: false,
        loadingItem: {}
      }
    },
    methods: {
      open() {
        this.popoverVisible = true
        this.isActive = true
      },
      close() {
        console.log('close')
        this.popoverVisible = false
        this.isActive = false
      },
      toggle() {
        if(this.popoverVisible === true) {
          this.close()
        } else {
          this.open()
        }
      },
      // 拿到子组件的新值 再向外层父组件传递
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
        var lastItem = newSelected[newSelected.length - 1]
        let simplest = (children,id) => {
          return children.filter(item => item.id === id)[0]
        }
        let complex = (children, id) => {
          let noChildren = []
          let hasChildren = []
          children.forEach(item => {
            if (item.children) {
              hasChildren.push(item)
            } else {
              noChildren.push(item)
            }
          })
          let found = simplest(noChildren,id)
          if (found) {
            return found
          } else {
            found = simplest(hasChildren, id)
            if (found) {
              return found
            } else {
              for (let i = 0; i < hasChildren.length; i++) {
                found = complex(hasChildren[i].children, id)
                if (found) {
                  return found
                }
              }
              return undefined
            }
          }
        }
        let updateSource = (result) => {
          this.loadingItem = {}
          let copy = JSON.parse(JSON.stringify(this.source))
          let toUpdate = complex(copy, lastItem.id)
          toUpdate.children = result
          this.$emit('update:source', copy)
        }
        // 动态加载时 不是叶子节点才加载数据
        if (!lastItem.isLeaf && this.loadData) {
          this.loadData(lastItem, updateSource)
          this.loadingItem = lastItem
        } else if (lastItem.isLeaf && this.loadData) {
          // 并且在最后节点关闭 popover
          this.close()
        }

        // 静态加载时 在最后节点关闭 popover
        if (!lastItem.children && !this.loadData) {
          this.close()
        }
      },
    },
    // 计算属性添加选中结果
    computed: {
      result () {
        return this.selected.map((item) => item.name).join(' / ')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/var";
  .cascader {
    display: inline-block;
    font-size: $font-size;
    position: relative;
    .trigger {
      height: $input-height;
      display: inline-flex;
      align-items: center;
      padding: 0 1em;
      min-width: 10em;
      border: 1px solid $border-color;
      border-radius: $border-radius;

      .right-icon {
        position: absolute;
        right: 0.5em;
        transition: all .3s;
      }

      .active {
        transform: rotateZ(90deg);
      }
    }
    .popover-wrapper {
      position: absolute; top: 100%; left: 0; background: white; display: flex; z-index: 199;
      margin-top: 8px;
      @extend .box-shadow;
      .label {
        white-space: nowrap;
      }
    }

  }
</style>