<template>
  <div class="themeSelect">
    <!--<el-select v-model="theme" placeholder="请选择" @change="themeSelect">
    <el-option v-for="item in themeArry" :key="item.label" :label="item.label" :value="item.value"></el-option>
  </el-select>-->
    <el-dropdown trigger="click"
                 @command="themeSelect"
                 placement="bottom">
      <div class="checkedTheme">
        <i class="el-icon-arrow-down el-icon--right color"></i>
      </div>
      <el-dropdown-menu slot="dropdown"
                        class="ThemeOpection">
        <el-dropdown-item v-for="(item, index) in themeArry"
                          :command="item.value"
                          :key="index"
                          :disabled="item.value == theme">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      theme: ''
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isVisible: {
      type: Boolean
    },
    isVisible2: {
      type: Boolean
    }
  },
  mounted () {
    this.getTheme()
  },
  methods: {
    getTheme () {
      let theme = localStorage.getItem('theme')
      this.theme = theme
      window.document.documentElement.setAttribute('data-theme', theme)
    },
    themeSelect (value) {
      console.log('value=', value)
      this.theme = value
      window.document.documentElement.setAttribute('data-theme', value)
      localStorage.setItem('theme', value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/common";
.themeSelect {
  height: 60px;
  line-height: 60px;
  margin-left: 25px;
}
.checkedTheme {
  .color {
    height: 23px;
    width: 23px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    background: $primary-color;
    border-radius: 3px;
  }
}
html[data-theme="greenTheme"] {
  .checkedTheme {
    .color {
      background: $success-color;
    }
  }
}
.ThemeOpection {
}
</style>
<style lang="scss">
.ThemeOpection {
  margin-top: 0 !important;
  padding: 2px 0;
}
</style>
