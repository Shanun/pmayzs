<template>
  <div class="layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GearLayout',
    data(){
      return {
        layoutClass: {
          hasSider: false
        }
      }
    },
    mounted () {
      this.$children.forEach((vm) => {
        // 判断其中含有 Sider 组件，就添加 hasSider CSS属性
        if(vm.$options.name === 'GearSider') {
          this.layoutClass.hasSider = true
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    /*border: 1px solid red;*/
    overflow: hidden;
    &.hasSider{
      flex-direction: row;
    }
  }
</style>