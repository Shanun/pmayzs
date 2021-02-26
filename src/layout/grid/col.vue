<template>
  <div class="col" :class="colClass" :style="colStyle">
    <!--<div style="border: 1px solid green; height: 100px; background: lightblue;">-->
      <slot></slot>
    <!--</div>-->
  </div>
</template>

<script>
  let validator = (value) => {
    let keys = Object.keys(value)
    let valid = true
    keys.forEach(key => {
      if(!['span', 'offset'].includes(key)){
        valid = false
      }
    })
    return valid
  }
  export default {
    name: 'GearCol',
    props: {
      span: { type: [Number, String] },
      offset: { type: [Number, String] },
      phone: { type: Object, validator, },
      pad: { type: Object, validator, },
      narrowPc: { type: Object, validator, },
      pc: { type: Object, validator, },
      widePc: { type: Object, validator, },
    },
    data() {
      return {
        // 接收从 row 传递过来的 gutter
        gutter: 0,
      }
    },
    computed: {
      colClass () {
        let { span, offset, phone, pad, narrowPc, pc, widePc } = this
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`,
          ... (phone ? [`col-phone-${phone.span}`]: []),
          ... (pad ? [`col-pad-${pad.span}`]: []),
          ... (narrowPc ? [`col-narrow-pc-${narrowPc.span}`]: []),
          ... (pc ? [`col-pc-${pc.span}`]: []),
          ... (widePc ? [`col-wide-pc-${widePc.span}`]: []),

          ... (phone ? [`offset-phone-${phone.offset}`]: []),
          ... (pad ? [`offset-pad-${pad.offset}`]: []),
          ... (narrowPc ? [`offset-narrow-pc-${narrowPc.offset}`]: []),
          ... (pc ? [`offset-pc-${pc.offset}`]: []),
          ... (widePc ? [`offset-wide-pc-${widePc.offset}`]: []),
        ]
      },
      colStyle () {
        return {
          paddingLeft: this.gutter / 2 + 'px',
          paddingRight: this.gutter / 2 + 'px',
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .col {
    /*height: 100px;*/
    /*background: lightblue;*/
    /*!*width: 50%;*!*/
    /*border: 1px solid grey;*/


    // 声明 class 前缀
    $class-prefix: col-;
    // 循环计算
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }

    // 响应式
    // Mobile First
    @media (min-width: 577px) {
      $class-prefix: col-pad-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }

      $class-prefix: offset-pad-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media (min-width: 769px) {
      $class-prefix: col-narrow-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }

      $class-prefix: offset-narrow-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media (min-width: 993px) {
      $class-prefix: col-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }

      $class-prefix: offset-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media (min-width: 1201px) {
      $class-prefix: col-wide-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }

      $class-prefix: offset-wide-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
  }
</style>