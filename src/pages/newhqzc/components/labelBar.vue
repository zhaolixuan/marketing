<template>
  <div class="label-bar">
    <v-label
      v-for="(item, index) in labelData"
      :key="index"
      :name="item.name"
      :data="item.data"
      :active.sync="item.active"
      :bottomLine="item.bottomLine"
      @change="handleChange"
    ></v-label>
  </div>
</template>

<script>
import { dictList } from "@/api/hqzc";
import vLabel from "./label.vue";
export default {
  components: {
    vLabel,
  },
  data() {
    return {
      labelData: [
        {
          name: "政策分类：",
          active: "",
          data: [
            {
              title: "全部",
              value: "",
            },
          ],
        },
        {
          name: "政策级别：",
          active: "",
          data: [
            {
              title: "全部",
              value: "",
            },
          ],
        },
        {
          name: "政策类型：",
          active: "",
          data: [
            {
              title: "全部",
              value: "",
            },
          ],
        },
        {
          name: "政策主题：",
          active: "",
          data: [
            {
              title: "全部",
              value: "",
            },
          ],
          bottomLine: false,
        },
      ],
      labelTypes: [
        "policy_category",
        "policy_level",
        "policy_type",
        "policy_theme",
      ],
    };
  },
  created() {
    this.labelTypes.forEach((type, index) => this.getLabelData(type, index));
  },
  methods: {
    async getLabelData(dictType, index) {
      const res = await dictList({ dictType });
      this.labelData[index].data.push(...res.data);
    },
    getLabelValue(index){
      return this.labelData[index].active;
    },
    setLabelValue(index, value){
      this.labelData[index].active = value;
    },
    handleChange(){
      this.$emit("change");
    }
  },
};
</script>

<style lang="scss" scoped>
.label-bar {
  background-color: #fff;
}
</style>
