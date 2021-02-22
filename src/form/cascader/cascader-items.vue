<template>
  <div class="cascaderItems" :style="{ height: height }">
    <!--<div>selected: {{ selected && selected[level] && selected[level].name }}</div>-->
    <!--<div>level: {{ level }}</div>-->
    <div class="left">
      <div class="label" v-for="(item,index) in items" :key="index" @click="handleClickLabel(item)">
        <span class="name">
          {{item.name}}
        </span>
        <div class="icons">
          <template v-if="item.name === loadingItem.name">
            <gear-icon class="loading icon" name="loading"></gear-icon>
          </template>
          <template v-else>
            <gear-icon class="icon" v-if="rightArrowVisible(item)" name="right"></gear-icon>
          </template>
        </div>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <gear-cascader-items ref="right" :items="rightItems" :height="height"
                           :loading-item="loadingItem"
                           :level="level+1" :selected="selected" :loadData="loadData"
                           @update:selected="onUpdateSelected"
      ></gear-cascader-items>
    </div>
  </div>
</template>


<script>
  import Icon from '../../base/icon/icon'
  export default {
    name: 'GearCascaderItems',
    components: {
      'gear-icon': Icon
    },
    props: {
      items: {
        type: Array
      },
      height: {
        type: String
      },
      // 是否加载
      loadingItem: {
        type: Object,
        default: () => ({})
      },
      // 定义选中属性
      selected: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 定义层级属性
      level: {
        type: Number,
        default: 0
      },
      // 定义是否动态获取
      loadData: {
        type: Function
      }
    },
    data () {
      return {
        leftSelected: null
      }
    },
    updated () {
      console.log('cascader items updated')
    },
    computed: {
      rightItems () {
        if (this.selected && this.selected[this.level]) {
          let selected = this.items.filter( item => item.name === this.selected[this.level].name )
          if (selected && selected[0].children && selected[0].children.length > 0) {
            return selected[0].children
          }
        }
      },
    },
    methods: {
      // icon 箭头是否可见
      rightArrowVisible (item) {
        return this.loadData ? (!item.isLeaf): item.children
      },
      handleClickLabel (item) {
        if(item.isLeaf) {
          console.log('最后节点')
        }
        // this.selected[this.level] = item  Vue不允许在已经创建实例上动态添加新的根级响应式属性
        // 使用 $set 方法添加到嵌套对象上 Vue.set(object, key , value)
        // this.$set(this.selected, this.level , item)

        // 由于违背了单向数据流, 因此此处修改之前子组件会修改父组件值的方案
        let copy = JSON.parse(JSON.stringify(this.selected))
        copy[this.level] = item
        copy.splice(this.level + 1)  // 每次选中 Label 更新 right 节点
        this.$emit('update:selected', copy)
      },
      // 拿到递归子组件的新值 向父组件传递
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/var";
  .cascaderItems {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
    .left {
      height: 100%;
      /*padding: .3em 0;*/
      overflow: auto;
    }
    .right {
      margin-top: -1px;
      border-left: 1px solid $border-color-light;
    }
    .label {
      padding: .5em 1em;
      display: flex;
      align-items: center;
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        background: #eee;
      }
      > .name {
        margin-right: 1em;
        user-select: none;
      }
    }
    .icons {
      margin-left: auto;
      transform: scale(0.8);
      .loading {
        animation: spin 2s infinite linear;
      }
    }
  }


</style>