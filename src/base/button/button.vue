<template>
  <button class="gear-button" :class="{[`icon-${iconPosition}`]: true}"
    @click="$emit('click')">
    <gear-icon class="icon" v-if="icon && !loading" :name="icon"></gear-icon>
    <gear-icon class="loading icon" v-if="loading" name="loading"></gear-icon>
    <div class="gear-button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  import Icon from '../icon/icon'
  export default {
    name: 'GearButton',
    components: {
      'gear-icon': Icon
    },
    // props: ['icon', 'iconPosition']
    props: {
      icon: {},
      loading: {
        type: Boolean,
        default: false
      },
      iconPosition: {
        type: String,
        default: 'left',
        // 属性检测器 validator
        validator(value) {
          return value !== 'left' && value !== 'right' ? false : true;
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  $font-size: 14px;
  $button-height: 32px;
  $button-bg: white;
  $button-active-bg: #eee;
  $border-radius: 4px;
  $color: #333;
  $border-color: #999;
  $border-color-hover: #666;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .gear-button {
    display: inline-flex; justify-content: center; align-items: center;
    vertical-align: middle;

    font-size: $font-size;
    height: $button-height;
    padding: 0 1em;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background: $button-bg;

    &:hover { border-color: $border-color-hover; }
    &:active { background-color: $button-active-bg; }
    &:focus { outline: none; }
    > .icon { order: 1; margin-right: .2em; }
    > .gear-button-content { order: 2; }

    &.icon-right {
      > .icon { order: 2; margin-right: 0; margin-left: .2em; }
      > .gear-button-content { order: 1; }
    }

    .loading {
      animation: spin 2s infinite linear;
    }
  }
</style>