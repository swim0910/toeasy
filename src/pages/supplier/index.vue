<template>
    <page-layout title="供应商信息">
        <ul class="listView">
            <li v-for="item in list" :key="item.id">
            <p>地址:{{item.address}}</p>
            <p>供应商姓名:{{item.name}}</p>
            <p>联系方式:{{item.phone}}</p>
            <p>联系人:{{item.contact}}</p>
            </li>
        </ul>
    </page-layout>
</template>

<script>
import {supplierApi} from '@/apis/supplierApi'
export default {
  data() {
    return {
        query:{
            page:1,
            size:23
        },
        list:[]
    }
  },
  async created(){
    let res=await supplierApi(this.query)
    console.log(res)
    if(res.code==200){
        this.$toast.success({
            position:'bottom',
            message:'获取信息成功'
        })
        this.list=res.data.rows
    }else{
        this.$toast.fail('请求失败')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';
    .listView{
        padding: 10px;
        overflow-x: hidden;
        height: calc(100% - 48px);
        li{
            border-bottom: 1px solid @g8;
            font-size: .8rem;
            padding: 0 5px;
        }
    }
</style>
