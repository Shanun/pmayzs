<template>
  <div>
    {{selected}}
    <gear-table :columns="columns" :data-source="dataSource" bordered :striped="true" :selected-items.sync="selected"
                :sort-rules.sync="sortRules"
                @update:sortRules="updateTable" :loading="loading" :height="400" expend-field="description">
      <template slot-scope="xxx">
        <button @click="edit(xxx.item)">编辑</button>
        <button @click="view(xxx.item)">查看</button>
      </template>
    </gear-table>

    <br>

    <gear-table :columns="columns" :data-source="dataSource2" bordered :striped="false" :compact="true" :selected-items.sync="selected2"
                :sort-rules.sync="sortRules"
                @update:sortRules="updateTable2" :loading="loading2" :height="400">
    </gear-table>
  </div>
</template>

<script>
  import Table from './datashow/table/table'
  export default {
    name: 'demo',
    components: {
      'gear-table': Table
    },
    data() {
      return {
        columns: [
          { text: '姓名', field: 'name', width: 300 },
          { text: '号码', field: 'score' },
        ],
        sortRules: {
          score: 'desc'
        },
        loading: false,
        loading2: false,
        dataSource: [
          { id: 1, name: '保罗·乔治', score: 13, description: 'xxx xxx' },
          { id: 2, name: '斯蒂文·亚当斯', score: 12, description: 'yyy yyy' },
          { id: 3, name: '德翁特·伯顿', score: 30 },
          { id: 4, name: '拉塞尔·威斯布鲁克', score: 0, description: 'zzz zzz' },
          { id: 5, name: '帕特里克·帕特森', score: 54 },
          { id: 6, name: '特伦斯·弗格森', score: 23 },
          { id: 7, name: '丹尼·斯罗德', score: 17 },
          { id: 8, name: '杰拉米·格兰特', score: 9 },
          { id: 9, name: '阿卜杜勒·纳德', score: 11 },
          { id: 10, name: '安德烈·罗伯森', score: 21 },
          { id: 11, name: '雷蒙德·菲尔顿', score: 2 },
          { id: 12, name: '诺伦斯·诺埃尔', score: 3 },
          { id: 13, name: '哈米杜·迪亚洛', score: 6 },
          { id: 14, name: '亚历克斯·阿布里内斯', score: 8 },
          { id: 15, name: '蒂莫特·鲁瓦乌·卡巴洛特', score: 7 },
        ],
        dataSource2: [
          { id: 1, name: '保罗·乔治', score: 13 },
          { id: 2, name: '斯蒂文·亚当斯', score: 12 },
          { id: 3, name: '德翁特·伯顿', score: 30 },
          { id: 4, name: '拉塞尔·威斯布鲁克', score: 0 },
          { id: 5, name: '帕特里克·帕特森', score: 54 },
          { id: 6, name: '特伦斯·弗格森', score: 23 },
          { id: 7, name: '丹尼·斯罗德', score: 17 },
          { id: 8, name: '杰拉米·格兰特', score: 9 },
          { id: 9, name: '阿卜杜勒·纳德', score: 11 },
          { id: 10, name: '安德烈·罗伯森', score: 21 },
          { id: 11, name: '雷蒙德·菲尔顿', score: 2 },
          { id: 12, name: '诺伦斯·诺埃尔', score: 3 },
          { id: 13, name: '哈米杜·迪亚洛', score: 6 },
          { id: 14, name: '亚历克斯·阿布里内斯', score: 8 },
          { id: 15, name: '蒂莫特·鲁瓦乌·卡巴洛特', score: 7 },
        ],
        selected: [],
        selected2: []
      }
    },
    methods: {
      // 编辑事件
      edit(item) {
        alert(`编辑${item.id}`)
      },
      // 查看事件
      view(item) {
        alert(`查看${item.id}`)
      },
      // 监听 sortRules 的 update 事件
      updateTable() {
        // loading
        this.loading = true
        setTimeout(() => {
          // 改方法可以为一个 ajax 请求，从后端拿取最新排序的数据 此处用 setTimeout 模拟 ajax 请求延时
          this.dataSource = this.dataSource.sort((a,b) => a.score - b.score)
          this.loading = false
        },1000)
      },
      updateTable2() {
        // loading
        this.loading2 = true
        setTimeout(() => {
          // 改方法可以为一个 ajax 请求，从后端拿取最新排序的数据 此处用 setTimeout 模拟 ajax 请求延时
          this.dataSource2 = this.dataSource2.sort((a,b) => a.score - b.score)
          this.loading2 = false
        },1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "style/var";
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
