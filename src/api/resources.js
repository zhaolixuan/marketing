import request from "./request";

export default {
  // 企业搜索-列表数据
  getEnterpriseList(params) {
    return request({
      url: "/companyQuery/search",
      method: "get",
      params
    });
  },
  // 企业搜索-查看详情-采购内容统计列表
  getProcurementList(params) {
    return request({
      url: "/purchaContent/search",
      method: "get",
      params,
    });
  },
  // 综合分析-公司主要贸易国交易统计
  getTransactionStatistics(params) {
    return request({
      url: "/comprehensiveTransactions/search",
      method: "get",
      params
    });
  },
  // 综合分析-主要贸易物品次数统计
  getFrequencyStatistics(params) {
    return request({
      url: "/comprehensiveNumber/listData",
      method: "get",
      params
    });
  },
  // 综合分析-公司主要贸易物品列表
  getItemList(params) {
    return request({
      url: "/comprehensiveHscode/search",
      method: "get",
      params
    });
  },
  // 企业联系方式
  getContact(params) {
    return request({
      url: "/companyContact/search",
      method: "get",
      params
    });
  },
  // 企业搜索-查看详情-供应周期分析列表
  getSupplyCycleList(params) {
    return request({
      url: "/purchaCycle/search",
      method: "get",
      params
    });
  },
  // 企业搜索-查看详情-采购周期分析图表
  getProcurementChartData(params) {
    return request({
      url: "/purchaCycleChart/listData",
      method: "get",
      params
    });
  },
  //  全球贸易态势分析-本国进口贸易统计列表
  getGlobalCountryAreaAnalysisSearch(params) {
    return request({
      url: "/globalCountryAreaAnalysis/search",
      method: "get",
      params
    })
  },
  //  全球贸易态势分析-交易次数
  getGlobalCountryAreaAnalysisDealNumberData(params) {
    return request({
      url: "/globalCountryAreaAnalysis/dealNumberData",
      method: "get",
      params
    });
  },
  //  全球贸易态势分析-交易数量
  getGlobalCountryAreaAnalysisDealCountData(params) {
    return request({
      url: "/globalCountryAreaAnalysis/dealCountData",
      method: "get",
      params
    });
  },
  //  全球贸易态势分析-进口贸易态势分析-列表
  getGlobalMarketTrendAnalysisSearch(params) {
    return request({
      url: "/globalMarketTrendAnalysis/search",
      method: "get",
      params
    });
  },
  //  全球贸易态势分析-进口贸易态势分析-柱状图
  getGlobalMarketTrendAnalysisTrendData(params) {
    return request({
      url: "/globalMarketTrendAnalysis/trendData",
      method: "get",
      params
    });
  },
  //  全球贸易态势分析-主要贸易伙伴-列表
  getGlobalTradingPartnersSearch(params) {
    return request({
      url: "/globalTradingPartners/search",
      method: "get",
      params
    });
  },
  //  关注企业
  getFocusEnterprises(params) {
    return request({
      url: "/meCompany/attention",
      method: "get",
      params
    });
  },
  // 取消关注
  getCancelAttention(params) {
    return request({
      url: "/meCompany/cancel",
      method: "get",
      params
    });
  },
  // 我的企业
  getMyBusiness(params) {
    return request({
      url: "/meCompany/search",
      method: "get",
      params
    });
  },
  // 是否关注
  getisConcerned(params) {
    return request({
      url: "/meCompany/exists",
      method: "get",
      params
    });
  }
  
};
