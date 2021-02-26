<template>
  <gear-springs class="sider" :visible="visible" horizontal :duration="duration">
    <slot></slot>
    <button v-if="closeButton" @click="visible = false">close</button>
  </gear-springs>
</template>

<script>
  import Springs from '../../action/springs/springs'
  export default {
    name: 'GearSider',
    components: {
      'gear-springs': Springs
    },
    props: {
      closeButton: {
        type: Boolean,
        default: false
      },
      duration: {
        type: [Number, String],
        default: 300
      }
    },
    data () {
      return {
        visible: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sider {
    position: relative;
    > button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>