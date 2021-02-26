<template>
  <div class="gear-content">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GearContent',
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  .gear-content {
    flex-grow: 1;
  }
</style>