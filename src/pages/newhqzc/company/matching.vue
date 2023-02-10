<template>
  <div class="matchingB">
    <header>
      <div class="header content">
        <img src="../../../static/images/heder_img.png" alt="" @click="goHome" />
        <!-- <div class="logo">惠</div>
        <div class="title-wrap">
          <div class="title">惠企政策</div>
          <div class="subtitle">政策兑现综合服务平台</div>
        </div> -->
      </div>
    </header>
    <div class="matchingB_container">
      <h5 class="h5">政策匹配企业信息完善</h5><span class="span">*信息填写越详细，政策匹配越精准</span>
      <el-form :inline="true" ref="form" :model="form" label-width="150px">
          <!-- 投资信息 -->
            <div class="title">
              <span class="word">
                  投资信息
              </span>
            </div> 
          <el-form-item label="意向产业:" prop="intentionIndustry" label-width="100px" :rules="[{ required: true, message: '请输入活动名称', trigger: 'blur' }]">
              <el-select v-model="form.intentionIndustry" placeholder="请选择">
                <el-option 
                    v-for="(item,index) in selectArr1"
                    :key="index"
                    :label="item.title"
                    :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="投资金额(万元):" label-width="125px">
              <el-input v-model.trim="form.investSum" placeholder="单行输入" @input="handleInput('investSum', $event)"></el-input>
          </el-form-item>
            <el-form-item label="固定资产投资(万元):">
              <el-input v-model.trim="form.fixedInvestments" placeholder="单行输入" @input="handleInput('fixedInvestments', $event)"></el-input>
          </el-form-item>
          
            <!-- 基本信息 -->
            <div class="title">
              <span class="word">
                  基本信息
              </span>
            </div> 
          <el-form-item label="注册地:"  label-width="100px">
              <el-cascader
                  v-model="form.domicile"
                  :props="optionProps"
                  :options="provinceArr"
                  clearable>
              </el-cascader>
          </el-form-item>
          <el-form-item label="注册资金(万元):" label-width="125px">
              <el-input v-model.trim="form.registerSum" placeholder="单行输入" @input="handleInput('registerSum', $event)"></el-input>
          </el-form-item>
            <el-form-item label="实缴注册资金(万元):">
              <el-input v-model.trim="form.paidInRegisterSum" placeholder="单行输入" @input="handleInput('paidInRegisterSum', $event)"></el-input>
          </el-form-item>
          
            <!-- 规模信息 -->
            <div class="title">
              <span class="word">
                  规模信息
              </span>
            </div> 
          <el-form-item label="企业规模:" label-width="183px" style="display: block;" class="diff">
              <el-radio-group v-model="form.enterpriseScale">
                <el-radio 
                    v-for="(item,index) in selectArr2"
                    :key="index"
                    :label="item.value"
                    @click.native.prevent="cancelEnterpriseScale(item.value)"
                    >
                    {{item.title}}
                  </el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="研究人员占比:" label-width="183px" style="display: block;"  class="diff">
              <el-radio-group v-model="form.itHold">
                <el-radio 
                  v-for="(item,index) in selectArr3"
                  :key="index"
                  :label="item.value"
                    @click.native.prevent="cancelItHold(item.value)"
                  >
                  {{item.title}}
                </el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="本科及以上学历人员占比:" label-width="183px" style="display: block;" class="diff">
              <el-radio-group v-model="form.academicHold">
                <el-radio
                  v-for="(item,index) in selectArr4"
                  :key="index"
                  :label="item.value"
                  @click.native.prevent="cancelAcademicHold(item.value)"
                >
                  {{item.title}}
                </el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 财务信息 -->
            <div class="title">
              <span class="word">
                  财务信息
              </span>
            </div> 
          <el-form-item label="上年度营业收入:" label-width="183px" style="display: block;" class="diff">
              <el-radio-group v-model="form.previousYearIncome">
                <el-radio
                  v-for="(item,index) in selectArr5"
                  :key="index"
                  :label="item.value"
                  @click.native.prevent="cancelPreviousYearIncome(item.value)"
                  >
                  {{item.title}}
                </el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="上年度纳税总额:" label-width="183px" style="display: block;">
              <el-radio-group v-model="form.previousYearSum">
                <el-radio
                  v-for="(item,index) in selectArr6"
                  :key="index"
                  :label="item.value"
                    @click.native.prevent="cancelPreviousYearSum(item.value)"
                  >
                  {{item.title}}
                </el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="研发投入占销售占比:" label-width="183px" style="display: block;">
              <el-radio-group v-model="form.itMarketHold">
                <el-radio
                  v-for="(item,index) in selectArr7"
                  :key="index"
                  :label="item.value"
                  @click.native.prevent="cancelItMarketHold(item.value)"
                  >
                  {{item.title}}
                </el-radio>
              </el-radio-group>
          </el-form-item>
            <!-- 金融信息 -->
            <div class="title">
              <span class="word">
                  金融信息
              </span>
            </div> 
          <el-form-item label="是否有融资:" label-width="183px" style="display: block;">
              <el-radio-group v-model="form.isFinancing">
                <el-radio
                    v-for="(item,index) in selectArr8"
                  :key="index"
                  :label="item.value"
                    @click.native.prevent="cancelIsFinancing(item.value)"
                  >
                  {{item.title}}
                </el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上市:" label-width="183px" style="display: block;">
              <el-radio-group v-model="form.isAppear">
                <el-radio
                  v-for="(item,index) in selectArr9"
                  :key="index"
                  :label="item.value"
                    @click.native.prevent="cancelIsAppear(item.value)"
                  >
                    {{item.title}}
                </el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 人才信息 -->
            <div class="title">
              <span class="word">
                  人才信息
              </span>
            </div> 
          <el-form-item label="所拥有人才:" style="display: block;">
              <el-checkbox-group v-model="form.possessTalents">
                <el-checkbox 
                  name="possessTalents"
                  v-for="(item,index) in selectArr10"
                  :key="index"
                  :label="item.value"
                >
                  {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <!-- 资质信息 -->
            <div class="title">
              <span class="word">
                  资质信息
              </span>
            </div> 
          <el-form-item label="企业类型:" style="display: block;">
              <el-checkbox-group v-model="form.enterpriseType">
                <el-checkbox
                    name="enterpriseType"
                    v-for="(item,index) in selectArr11"
                    :key="index"
                    :label="item.value">
                  {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="研发机构认定:">
              <el-checkbox-group v-model="form.itInstitutionAffirm">
                <el-checkbox 
                  name="itInstitutionAffirm"
                  v-for="(item,index) in selectArr12"
                  :key="index"
                  :label="item.value">
                    {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="品牌认定:">
              <el-checkbox-group v-model="form.brandAffirm">
                <el-checkbox 
                    name="brandAffirm"
                    v-for="(item,index) in selectArr13"
                  :key="index"
                  :label="item.value">
                  {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="知识产权:">
              <el-checkbox-group v-model="form.intellectualProperty">
                <el-checkbox 
                    name="intellectualProperty"
                    v-for="(item,index) in selectArr14"
                    :key="index"
                    :label="item.value"
                    >
                  {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="科技奖励:">
              <el-checkbox-group v-model="form.scienceAward">
                <el-checkbox 
                  name="scienceAward"
                  v-for="(item,index) in selectArr15"
                  :key="index"
                  :label="item.value">
                    {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="称号认定:" class="titleRecognition" style="display: flex;">
              <el-checkbox-group v-model="form.claimsThat">
                <el-checkbox 
                    name="claimsThat"
                    v-for="(item,index) in selectArr16"
                    :key="index"
                    :label="item.value"
                  >
                  {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="企业排名:">
              <el-checkbox-group v-model="form.corporateRankings">
                <el-checkbox 
                  name="corporateRankings"
                  v-for="(item,index) in selectArr17"
                    :key="index"
                    :label="item.value"
                  >
                  {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <!-- 其他资质 -->
          <el-form-item label="其他资质:" class="other">
              <span class="add_btn" @click="addEvent"> + 添加资质 </span> <span class="limit">* 最多可录入10条</span>
          </el-form-item>
          <ul class="addList">
            <li v-for="(item, index) in addArr" :key="index" v-if="addArr.length > 0" class="list"> 
              <span class="name">资质名称:</span> 
              <el-input v-model.trim="item.value" placeholder="单行输入" class="diffInp"></el-input>
              <span class="new_name">有效时间:</span>
                <el-date-picker
                v-model="item.times"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <span class="icon" @click="deleteList(index)"><i class="el-icon-error"></i></span>
            </li>
          </ul>
          <el-form-item class="btns">
              <el-button type="primary" @click="onSubmit" class="saveBtn">进行匹配</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>
import { dictList,listTreeDatas,getCorporateInfo,getSupplierAuthInfo,getSave} from "@/api/hqzc.js";
export default {
  components: {},
  data() {
    return {
      isLogin:false,//登录状态
      isAuth:false,//认证状态
      selectArr1:'',//意向产业数组
      selectArr2:'',// 企业规模
      selectArr3:'',// 研究人员占比
      selectArr4:'',// 本科及以上学历人员占比
      selectArr5:'',//上年度营业收入
      selectArr6:'',//上年度纳税总额
      selectArr7:'',//研发投入占销售占比
      selectArr8:'',//是否有融资
      selectArr9:'',//是否上市
      selectArr10:'',//所拥有人才
      selectArr11:'',//企业类型
      selectArr12:'',//研发机构认定
      selectArr13:'',//品牌认定
      selectArr14:'',//知识产权
      selectArr15:'',//科技奖励
      selectArr16:'',//称号认定
      selectArr17:'',//企业排名
      provinceArr:[],// 注册地
      optionProps: {
          checkStrictly:true,
          value: "id",
          label: "text",
          children:'children'
      },
      form:{
          intentionIndustry:'',// 意向产业
          investSum:'',// 投资金额
          fixedInvestments:'',// 固定资产投资
          domicile:'',// 注册地
          registerSum:'',//注册资金
          paidInRegisterSum:'',//实缴注册资金
          enterpriseScale:'',//企业规模
          itHold:'',// 研究人员
          academicHold:'',// 本科及以上学历人员
          previousYearIncome:'',// 上年度营业收入
          previousYearSum:'',// 上年度纳税总额
          itMarketHold:'',//研发投入占销售占比
          isFinancing:'',// 是否有融资
          isAppear:'',//是否上市
          possessTalents:[],//所拥有人才
          enterpriseType:[],// 企业类型
          itInstitutionAffirm:[],// 研发机构
          brandAffirm:[],//品牌认定
          intellectualProperty:[],//知识产权
          scienceAward:[],//科技奖励
          claimsThat:[],//称号认定
          corporateRankings:[],//企业排名
          companyName:''// 公司名称
      },
      num:0,
      addArr:[],
      accurate:'',
      id:'',
      companyName1:'',
      newId:'',
      title:'',
      type:''
    };
  },
  mounted() {
    this.dictionary('apply_industry');
    this.dictionary('qiye_guimo');
    this.dictionary('yanfa_zhanbi');
    this.dictionary('benke_ys_renyuan');
    this.dictionary('shangniandu_yingye_shouru');
    this.dictionary('shangniandu_nashui_zonge');
    this.dictionary('yanfa_touru_xiaoshou');
    this.dictionary('is_rongzi');
    this.dictionary('is_shangshi');
    this.dictionary('yongyou_rencai');
    this.dictionary('qiye_type');
    this.dictionary('yanfa_jigou_rending');
    this.dictionary('pinpai_rending');
    this.dictionary('zhishii_chanquan');
    this.dictionary('keji_jiangli');
    this.dictionary('chenghao_rending');
    this.dictionary('qiye_paiming');
    this.getProvince();
    this.getCorporateInfo1();
    this.getSupplierAuthInfo();
  },
  watch:{
  	
	},
  methods: {
    goHome(){
      this.$router.push("/cydn/hqzc/home");
    },
    handleInput(modelValue, value){
      var flag = (/^(0|[1-9]+0*)$/).test(value);
      //  /^(([1-9][0-9]*(\.)?[0-9]*)|(0(\.)([0-9]*))|(0))$/
      this.form[modelValue] = flag ? value : '';
    },
    //字典
    dictionary(dictType) {
      var that = this;
      dictList({dictType:dictType}).then(res=>{
          if(dictType=='apply_industry'){// 意向产业
              that.selectArr1 = res.data;
          }else if(dictType=='qiye_guimo'){ // 企业规模
              this.selectArr2 = res.data;
          }else if(dictType=='yanfa_zhanbi'){ // 研究人员占比
              this.selectArr3 = res.data;
          }else if(dictType=='benke_ys_renyuan'){ // 本科及以上学历人员占比
              this.selectArr4 = res.data;
          }else if(dictType=='shangniandu_yingye_shouru'){ // 上年度营业收入
              this.selectArr5 = res.data;
          }else if(dictType=='shangniandu_nashui_zonge'){ // 上年度纳税总额
              this.selectArr6 = res.data;
          }else if(dictType=='yanfa_touru_xiaoshou'){ // 研发投入占销售占比
              this.selectArr7 = res.data;
          }else if(dictType=='is_rongzi'){ // 是否有融资
              this.selectArr8 = res.data;
          }else if(dictType=='is_shangshi'){ // 是否上市
              this.selectArr9 = res.data;
          }else if(dictType=='yongyou_rencai'){ // 所拥有人才
              this.selectArr10 = res.data;
          }else if(dictType=='qiye_type'){ // 企业类型
              this.selectArr11 = res.data;
          }else if(dictType=='yanfa_jigou_rending'){ // 研发机构认定
              this.selectArr12 = res.data;
          }else if(dictType=='pinpai_rending'){ // 品牌认定
              this.selectArr13 = res.data;
          }else if(dictType=='zhishii_chanquan'){ // 知识产权
              this.selectArr14 = res.data;
          }else if(dictType=='keji_jiangli'){ // 科技奖励
              this.selectArr15 = res.data;
          }else if(dictType=='chenghao_rending'){ // 称号认定
              this.selectArr16 = res.data;
          }else if(dictType=='qiye_paiming'){ // 企业排名
              this.selectArr17 = res.data;
          }
      })
    },
    //获取匹配信息
    getCorporateInfo1() {
      getCorporateInfo().then(res=>{
        if(res.data.retData){
          if(res.data.retData.id){
              this.id = res.data.retData.id;
          }
          this.form.intentionIndustry = res.data.retData.intentionIndustry;
          this.form.investSum = res.data.retData.investSum;
          this.form.fixedInvestments = res.data.retData.fixedInvestments;
          if(res.data.retData.domicile !== null){
              this.form.domicile = res.data.retData.domicile.split(",");
          }
          this.form.registerSum = res.data.retData.registerSum;
          this.form.paidInRegisterSum = res.data.retData.paidInRegisterSum;
          this.form.enterpriseScale = res.data.retData.enterpriseScale;
          this.form.itHold = res.data.retData.itHold;
          this.form.academicHold = res.data.retData.academicHold;
          this.form.previousYearIncome = res.data.retData.previousYearIncome;
          this.form.previousYearSum = res.data.retData.previousYearSum;
          this.form.itMarketHold = res.data.retData.itMarketHold;
          this.form.isFinancing = res.data.retData.isFinancing;
          this.form.isAppear = res.data.retData.isAppear;
          if(res.data.retData.possessTalents !== null){
              this.form.possessTalents = res.data.retData.possessTalents.split(",");
          }
          if(res.data.retData.enterpriseType !== null){
              this.form.enterpriseType = res.data.retData.enterpriseType.split(",");
          }
          if(res.data.retData.itInstitutionAffirm !== null){
              this.form.itInstitutionAffirm = res.data.retData.itInstitutionAffirm.split(",");
          }
          if(res.data.retData.brandAffirm !== null){
              this.form.brandAffirm = res.data.retData.brandAffirm.split(",");
          }
          if(res.data.retData.intellectualProperty !== null){
              this.form.intellectualProperty = res.data.retData.intellectualProperty.split(",");
          }
          if(res.data.retData.scienceAward !== null){
              this.form.scienceAward = res.data.retData.scienceAward.split(",");
          }
          if(res.data.retData.claimsThat !== null){
              this.form.claimsThat = res.data.retData.claimsThat.split(",");
          }
          if(res.data.retData.corporateRankings !== null){
              this.form.corporateRankings = res.data.retData.corporateRankings.split(",");
          }
          if(res.data.retData.restAptitude !== null){
              this.addArr = [];
              var arr = JSON.parse(res.data.retData.restAptitude);
              for(var i = 0; i < arr.length; i++){
                  var obj = {};
                  obj.value=arr[i].certificationName;
                  obj.times=[arr[i].startValidDate,arr[i].endValidDate]
                  this.addArr.push(obj);
              }
          }
          
        }
      })
    },
    //获取认证信息
    getSupplierAuthInfo() {
      getSupplierAuthInfo().then(res=>{
        this.companyName1 = res.data.retData.companyName;
      })
    },
    // 提交
    onSubmit() {
      var that = this;
      var newDomicile = '';
      var newPossessTalents = '';
      var newEnterpriseType = '';
      var newItInstitutionAffirm  = '';
      var newBrandAffirm = '';
      var newIntellectualProperty = '';
      var newScienceAward = '';
      var newClaimsThat = '';
      var newCorporateRankings = '';
      var newRestAptitude = '';
      if(this.addArr.length > 0){
          this.form.restAptitude = [];
          for(var i=0;i<this.addArr.length;i++){
              var obj = {};
              obj.certificationName = this.addArr[i].value;
              obj.startValidDate = this.addArr[i].times[0];
              obj.endValidDate = this.addArr[i].times[1];
              this.form.restAptitude.push(obj);
          }
          newRestAptitude = JSON.stringify(this.form.restAptitude);
      } else {
          newRestAptitude = '';
      }
      
      if(this.form.domicile.length > 0){
          newDomicile = that.form.domicile[that.form.domicile.length-1];//注册地
      }
      if(this.form.possessTalents.length > 0){
          newPossessTalents = that.form.possessTalents.join(',');//所拥有人才
      } 
      if(this.form.enterpriseType.length > 0){
          newEnterpriseType = that.form.enterpriseType.join(',');// 企业类型
      }
      if(this.form.itInstitutionAffirm.length > 0){
          newItInstitutionAffirm = that.form.itInstitutionAffirm.join(',');// 研发机构
      }
      if(this.form.brandAffirm.length > 0){
          newBrandAffirm = that.form.brandAffirm.join(',');// 品牌认定
      }
      if(this.form.intellectualProperty.length > 0){
          newIntellectualProperty = that.form.intellectualProperty.join(',');// 知识产权
      }
      if(this.form.scienceAward.length > 0){
          newScienceAward = that.form.scienceAward.join(',');// 科技奖励
      }
      if(this.form.claimsThat.length > 0){
          newClaimsThat = that.form.claimsThat.join(',');// 称号认定
      }
      if(this.form.corporateRankings.length > 0){
          newCorporateRankings = that.form.corporateRankings.join(',');// 企业排名
      }
      var obj = {
          intentionIndustry:this.form.intentionIndustry,// 意向产业
          investSum:this.form.investSum,// 投资金额
          fixedInvestments:this.form.fixedInvestments,// 固定资产投资
          domicile:newDomicile,// 注册地
          registerSum:this.form.registerSum,//注册资金
          paidInRegisterSum:this.form.paidInRegisterSum,//实缴注册资金
          enterpriseScale:this.form.enterpriseScale,//企业规模
          itHold:this.form.itHold,// 研究人员
          academicHold:this.form.academicHold,// 本科及以上学历人员
          previousYearIncome:this.form.previousYearIncome,// 上年度营业收入
          previousYearSum:this.form.previousYearSum,// 上年度纳税总额
          itMarketHold:this.form.itMarketHold,//研发投入占销售占比
          isFinancing:this.form.isFinancing,// 是否有融资
          isAppear:this.form.isAppear,//是否上市
          possessTalents: newPossessTalents,//所拥有人才
          enterpriseType:newEnterpriseType,// 企业类型
          itInstitutionAffirm:newItInstitutionAffirm,// 研发机构
          brandAffirm:newBrandAffirm,//品牌认定
          intellectualProperty:newIntellectualProperty,//知识产权
          scienceAward:newScienceAward,//科技奖励
          claimsThat:newClaimsThat,//称号认定
          corporateRankings:newCorporateRankings,//企业排名
          restAptitude:newRestAptitude,// 其他资质
          id:this.id,
          companyName:this.companyName1
          
      }
      that.getSave(obj);
    },
    getSave(obj){
      getSave(obj).then(res=>{
          if(res.data.success){
            if(this.$route.query.companyName){
              this.$router.push({
                path: "/cydn/companyInfo",
                query: {
                  companyName:this.companyName1
                },
              });
            }else{
              this.$router.back()
            }

          }
      })
    },
    // 取消企业规模
    cancelEnterpriseScale(e){
        e === (this.form.enterpriseScale) ? (this.form.enterpriseScale= '')  : (this.form.enterpriseScale = e);
    },
    // 取消研究人员占比
    cancelItHold(e){
        e === (this.form.itHold) ? (this.form.itHold= '')  : (this.form.itHold = e);
    },
    // 取消本科及以上学历人员
    cancelAcademicHold(e){
        e === (this.form.academicHold) ? (this.form.academicHold= '')  : (this.form.academicHold = e);
    },
    // 取消上年度营业收入
    cancelPreviousYearIncome(e){
          e === (this.form.previousYearIncome) ? (this.form.previousYearIncome= '')  : (this.form.previousYearIncome = e);
    },
    // 取消上年度纳税总额
    cancelPreviousYearSum(e){
          e === (this.form.previousYearSum) ? (this.form.previousYearSum= '')  : (this.form.previousYearSum = e);
    },
    // 取消研发投入占销售占比
    cancelItMarketHold(e){
          e === (this.form.itMarketHold) ? (this.form.itMarketHold= '')  : (this.form.itMarketHold = e);
    },
    // 取消是否有融资
    cancelIsFinancing(e){
          e === (this.form.isFinancing) ? (this.form.isFinancing= '')  : (this.form.isFinancing = e);
    },
    // 取消是否上市
    cancelIsAppear(e){
          e === (this.form.isAppear) ? (this.form.isAppear= '')  : (this.form.isAppear = e);
    },
    // 获取注册地
    getProvince(){
       listTreeDatas().then(res=>{
          this.provinceArr = res.data;
      })
    },
    addEvent() {
      if(this.addArr.length < 10){
        this.addArr.push({
            value: '',
            times: []
        });
      }
    },
    // 删除一项
    deleteList(index) {
      this.addArr.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.matchingB { 
  width:100%;
  background: #F2F7FB;
  //padding-top: 15px;
  box-sizing: border-box;
  
  .matchingB_container{
    width: 1200px;
    margin: 0 auto;
    background: #FFFFFF;
    padding: 25px 20px;
    box-sizing: border-box;
    margin-bottom: 60px;
  .h5{
      font-size: 18px;
      display: inline-block;
      font-weight: 600;
      margin-right: 14px;
      font-family: "Microsoft YaHei";
      color: #272940;
  }
  .span{
      font-size: 12px;
      font-family: "Microsoft YaHei";
      color: #FF2300;
  }
  .title{
      border-bottom: 1px solid #F2F2F2;
      margin: 30px 0;
  }
  .title .word{
      display: inline-block;
      font-size: 16px;
      font-weight: 600;
      padding: 10px 0;
      box-sizing: border-box;
      font-family: "Microsoft YaHei";
      color: #333333;
      border-bottom: 2px solid #0e67ff;
  }
  .el-radio{
      width:130px !important;
  } 
  .el-checkbox-group{ 
      width:935px !important;
  } 
  .el-form--inline .el-form-item__content .el-checkbox{
    width:185px !important; 
  }
 ::v-deep .el-cascader-node.in-active-path,::v-deep .el-cascader-node.is-active,::v-deep .el-cascader-node.is-selectable.in-checked-path{
      color:#0e67ff !important;
  }
  .el-form--inline .el-form-item .yixiang .el-form-item__label{
      width: 100px !important;
  }
  .el-form--inline .el-form-item{
      margin-right: 55px;
  }
  .el-form--inline .el-form-item__label{
      text-align: left;
  }
  ::v-deep .el-radio__input.is-checked+.el-radio__label{
      color:#0e67ff !important;
  }
  ::v-deep .el-checkbox__input.is-checked+.el-checkbox__label{
      color:#0e67ff !important;
  }
  ::v-deep .el-radio__input.is-checked .el-radio__inner{
      background-color: #0e67ff !important;
      border-color: #0e67ff !important;
  }
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: #0e67ff !important;
      border-color: #0e67ff !important;
  }
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  input[type='number'] {
    -moz-appearance: textfield !important;
  }
  
  .diff .el-form-item__content{
      margin-left: -22px !important;  
  }
  .diffPerson .el-form-item__label{
      width: 215px !important;
  }
  .titleRecognition .el-form-item__label{
      width: 188px !important;
  }
  .other{
      display: block;
  }
  .other .add_btn{
      display: inline-block;
      background: #EFF6FF;
      border-radius: 2px;
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: #71778F;
      margin-right: 10px;
      padding: 0px 15px;
      line-height: 40px;
      height: 40px;
      box-sizing: border-box;
      cursor: pointer;
  }
  .other .limit{
      font-size: 12px;
      font-family: "Microsoft YaHei";
      color: #E73632;
  }
  .addList{
      margin-left: 150px;
  }
  .addList .list{
      margin-top: 15px;
      background: #F7F9FF;
      border: 1px solid #E8E9ED;
      padding: 15px 14px;
      box-sizing: border-box;
  }
  .addList .list .diffInp{
      width: 30%;
  }
  .addList .list .name{
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: #71778F;
      margin-right: 10px;
  }
  .addList .list .new_name{
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: #71778F;
      margin: 0 10px 0 30px;
  }
  .addList .list .icon{
      display: inline-block;
      margin-left: 63px;
      cursor: pointer;
  }
  .btns{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
  }
  .btns .save{
      margin: 5px 73px 5px 5px;
      background: #0e67ff !important;
      border-color: #0e67ff !important;
  }
  .btns .saveBtn{
      background: #0e67ff !important;
      border-color: #0e67ff !important;
  }
    
  }
  header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 82px;
  background: rgba(255, 255, 255, 1);
  .header {
    display: flex;
    width: 1200px;
    img{
      width: 207px;
      height: 57px;
      cursor: pointer;
    }
  }
}
}
</style>
