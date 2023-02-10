export const situationPerception = [
  {
    name: "玉环阀门产业总值",
    value: 398,
    company: "亿元"
  },
  {
    name: "玉环阀门出口总值",
    value: 137,
    company: "亿元"
  },
  {
    name: "阀门产业链企业数",
    value: 32642,
    company: "家"
  },
  {
    name: "阀门合作企业",
    value: 332,
    company: "家"
  },
  {
    name: "累计交易额",
    value: 10.6,
    company: "亿元"
  },
  {
    name: "供应链金融交易",
    value: 1200,
    company: "万元"
  }
];

export const exponentialDimensionList = [{
  label: "原材料进出口指数",
  value: "原材料进出口指数"
},
{
  label: "钢材指数",
  value: "钢材指数"
},{
  label: "下游消费指数",
  value: "下游消费指数"
}];

export const exponentialDimensionData = {
  原材料进出口指数: {
    legend: ['进口增速（%）', '出口增速（%）'],
    xAxis: ['20/11', '20/12', '21/01', '21/03', '21/05', '21/07'],
    data: [[0, -5, -20, -13, 4, 2], [11, 15, 3, 5, 20, 8]]
  },
  钢材指数: {
    legend: ['产量环比（%）', '价格环比（%）'],
    xAxis: ['21/01', '21/03', '21/04', '21/06', '21/09', '21/10'],
    data: [[0, -5, 10, 5, 4, 2],[3, 5, -5, -3, 5, 8]]
  },
  下游消费指数: {
    legend: ['空调（%）', '冰箱（%）'],
    xAxis: ['20/11', '20/12', '21/01', '21/03', '21/05', '21/07'],
    data: [[0, -5, -20, -3, 4, 10], [0, 5, -11, 2, 5, 12]]
  }
};