<template>
  <div class="procurement-analysis">
    <procurementChart></procurementChart>
    <supplyTable></supplyTable>
  </div>
</template>
<script>
import procurementChart from './procurementChart'
import supplyTable from './supplyTable'
export default {
  name: 'procurementAnalysis',
  data () {
    return {
    }
  },
  components: {
    procurementChart,
    supplyTable
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.procurement-analysis {
  padding: 20px 40px;
  box-sizing: border-box;
  background: #fff;
}
</style>
