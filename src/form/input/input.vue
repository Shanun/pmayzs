<template>
  <div class="wrapper" :class="{ 'error': error }">
    <input :value="value" :disabled="disabled" :readonly="readonly" :type="type" :placeholder="placeholder"
     @change="$emit('change', $event.target.value)"
     @input="$emit('input', $event.target.value)"
     @focus="$emit('focus', $event.target.value)"
     @blur="$emit('blur', $event.target.value)"
    >
    <template v-if="error">
      <icon name="error" class="icon-error"></icon>
      <span class="errorMessage">{{error}}</span>
    </template>
  </div>
</template>

<script>
  import Icon from '../../base/icon/icon'
  export default {
    components: { Icon },
    name: 'GearInput',
    props: {
      value: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      error: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      type: {
        type: String,
      }
    },
  }
</script>

<style lang="scss" scoped>
  $height: 32px;
  $border-color: #999;
  $border-color-hover: #666;
  $font-size: 12px;
  $box-shadow-color: rgba(0,0,0,0.5);
  $error-color: #F1453D;
  .wrapper {
    font-size: $font-size; display: inline-flex; align-items: center;
    > :not(:last-child) { margin-right: .5em; }
    > input { height: $height; border: 1px solid $border-color; border-radius: 4px; padding: 0 8px;
      &:hover { border-color: $border-color-hover; }
      &:focus { box-shadow: inset 0 1px 1px $border-color-hover; outline: none; }
      &[disabled], &[readonly] { border-color: #aaa; color: #aaa; cursor: not-allowed; }
    }
    &.error {
      > input { border-color: $error-color; }
    }
    .icon-error { fill: $error-color; }
    .errorMessage { color: $error-color; }
  }
</style>