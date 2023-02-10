<template>
  <div class="wrap_1">
      <span class="wrap-content">
          <!-- <span></span>
           <span></span>
            <span></span> -->
          <slot></slot>
          <!-- <span></span>
           <span></span>
            <span></span> -->
      </span>
  </div>
</template>

<script>
export default {
    name:'subClassTitle',
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
    .wrap_1{
        text-align: center;
        padding: 5px 0;
        .wrap-content{
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                display: inline-block;
                border-radius: 10px;
            }
            span:nth-child(1){
                 height: 8px;
                 margin-right: 10px;
                 border-left: 3px solid rgba(91,154,255,.5);
            }
            span:nth-child(2){
                 height: 12px;
                 margin-right: 10px;
                 border-left: 3px solid rgba(91,154,255,.7);
            }
            span:nth-child(3){
                 height: 15px;
                 margin-right: 10px;
                 border-left: 3px solid rgba(91,154,255,1);
            }
             span:nth-child(4){
                 height: 15px;
                 margin-left: 10px;
                 border-left: 3px solid rgba(91,154,255,1);
            }
            span:nth-child(5){
                 height: 12px;
                 margin-left: 10px;
                 border-left: 3px solid rgba(91,154,255,.7);
            }
            span:nth-child(6){
                 height: 8px;
                 margin-left: 10px;
                border-left: 3px solid rgba(91,154,255,.5);
            }
        }
        // &::after{
        //     content:'123';
        // }
        // &::before{
        //     content: '000';
        // }
    }
</style>