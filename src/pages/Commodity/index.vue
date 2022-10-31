<template>
 
    <page-layout title="商品管理页面">
        <nav>
        <div class="top">
            <input type="text" placeholder="请输入项目名称" v-model="query.projectName" class="search_input">
            <i class="search" @click="searchEvt"></i>
       <button class="create" @click="createEvt"></button>
        </div>
    <div class="nav_details">
       <span><input class="selInput" type="radio" id="全部" value="" v-model="query.state" @click="stateEvt" placeholder="全部" >全部</span>
       <span><input class="selInput" type="radio" id="完成" value="完成" v-model="query.state" @click="stateEvt" placeholder="完成">完成</span>
       <span><input class="selInput" type="radio" id="新建" value="新建" v-model="query.state" @click="stateEvt" placeholder="新建">新建</span>
       <span><input class="selInput" type="radio" id="在途" value="在途" v-model="query.state" @click="stateEvt" placeholder="在途">在途</span>
       <span><input class="selInput" type="radio" id="作废" value="作废" v-model="query.state" @click="stateEvt" placeholder="作废">作废</span>
       <span><input class="selInput" type="radio" id="确认" value="确认" v-model="query.state" @click="stateEvt" placeholder="确认">确认</span>

    </div>
        </nav>
            <article @scroll="scrollEvt">
                <van-swipe-cell v-for='it in list' :key="it.id">
                 <template #left>
                 <van-button square @click='detailsEvt(it)' type="primary" text="详情" />
                 </template>
                 <div  class="project">
                    <span class="pro">项目名称:{{it.projectName}}</span>
                    <span class="pro">时间:{{it.createTime | dateFormat('MM-dd hh时')}}</span>
                    <span class="pro">负责人:{{it.supplierContact}}</span>
                    <span class="pro">状态:
                    <van-tag round type="primary" v-if="it.state === '完成'">{{it.state}}</van-tag>
                    <van-tag round type="success" v-if="it.state === '新建'">{{it.state}}</van-tag>
                    <van-tag round type="danger" v-if="it.state === '作废'">{{it.state}}</van-tag>
                    <van-tag round type="warning" v-if="it.state === '在途'">{{it.state}}</van-tag>
                    <van-tag round type="danger" v-if="it.state === '确认'" color="#7232dd">{{it.state}}</van-tag> 
                </span>   
                </div>
                   <template #right>
                     <van-button square @click='deleteEvt(it)' v-if="it.state === '新建'" type="danger" text="删除" />
                     <van-button square @click='deleteEvt(it)' v-if="it.state === '作废'" type="danger" text="删除" />
                     <van-button square v-model="pay" @click="payEvt(it)" v-if="it.state === '确认'" type="primary" text="支付" />
                     <van-button square v-if="it.state === '完成'" type="primary" text="确认" />
                     <van-button square @click='modifyEvt(it)'  v-if="it.state === '新建'" type="warning " text="修改" />
                 </template>
                </van-swipe-cell>  
               <div class="loading">{{loading ? '加载中...' : hasData ? '向上滑动加载更多数据' : '已加载全部数据'}}</div>
               <div class="zw"></div>
            </article>
            <van-popup v-model="show" position="bottom" :style="{ height: '45%'}" >
                <div class="showDetails" >
                    <p>项目名称：{{details.projectName}}</p>
                    <p>时间：{{details.createTime | dateFormat('MM-dd hh时')}}</p>
                    <p>负责人：{{details.supplierContact}}</p>
                    <p>状态：{{details.state}}</p>
                    <p>id： {{details.id}}</p>
                    <p>订单金额：{{details.price}}</p>
                    <p>供应商：{{details.supplierName}}</p>
                    <p>联系电话：{{details.supplierPhone}}</p>
                </div>
            </van-popup>

    </page-layout>
</template>

<script>

import {purchaseListApi,purchaseDeleteApi,purchasePayApi} from '../../apis/purchaseApi'
export default {
    data(){
        return {
            query: {
              projectName:'',
              state:'',
              page:1,
              size:10,

            },
            list:[],
            loading: true,
            hasData: true,
            show:false,
            value:888888,
            
            details:{
                projectName:'',
                createTime:'',
                supplierContact:'',
                state:'',
                id:'',
                price:'',
                supplierName:'',
                supplierPhone:''

            },
            pay:{
                id:'',
                amount:20,
                userId:'',
                userName:'',
                remark:''
            }
        }
    },

    computed:{
        userInfo(){
            return this.$store.getters['common/userInfo']
        }
    },

    mounted(){
        this.getList()
    },

    methods:{
        async getList(){       
            console.log()    
            let result =await purchaseListApi(this.query)
            if(!!result && result.code ===200){
                this.list = this.list.concat(result.data.rows)
                this.hasData = result.data.total>(this.query.page * this.query.size)
            }
            setTimeout(() => {
                this.loading = false
            })
        },

        async stateEvt(){
            this.loading=true
            this.query.page =1
            this.list=[]
            await this.getList()
            this.searchEvt()
        },

        createEvt(){ 
            this.$router.push('/createNew')
        },

        searchEvt(){
            this.loading=true
            this.query.page=1
            this.list=[]
            this.getList()
        },

        retEvt(){
            this.$router.push('/home')
        },

        scrollEvt(){
            let tar = window.event.target
            let isBottom = tar.scrollHeight - (tar.clientHeight + tar.scrollTop) < 50      
            if(isBottom && !this.loading && this.hasData){
                this.loading = true
                this.query.page +=1
                this.getList()
            } 
        },

        deleteEvt(row){
            this.$dialog.confirm({
            message: `确定删除${row.projectName}吗？`,
          }).then(async () => {
           let result = await purchaseDeleteApi(row.id)
            if(result.code === 200){
                this.$toast.success('删除成功')
                this.list.splice(this.list.findIndex(it =>it.id === row.id), 1)
                this.getList()
                }else{
                    this.$toast.fail('删除失败，原因：' + result.message)
                    console.log(result.message) 
                }
          })
        },

         async detailsEvt(row){   
            this.show=true
            this.details.projectName=row.projectName
            this.details.createTime=row.createTime
            this.details.supplierContact=row.supplierContact
            this.details.state=row.state
            this.details.id=row.id
            this.details.price=row.price
            this.details.supplierName=row.supplierName
            this.details.supplierPhone=row.supplierPhone
           
        },

        async payEvt(row){
            this.$dialog.confirm({
            title: '支付确认吗？',
            }).then( async () => {
                this.pay.id=row.id
                let result = await purchasePayApi(this.pay)        
                if(result.code === 200){
                    this.$toast.success('支付成功')   
                    row.state='完成'
                    
    
                }else{
                    this.$toast.fail('支付失败，原因：' + result.message)
                    console.log(result.message)
                    } 
            })
        },
        modifyEvt(row){
            this.$router.push('/createNew?id=' +row.id)
        }
    }
}


</script>


<style lang="less" scoped>

@import '../../style/common.less';

    html,body{height:100%}
    .showDetails{
        padding: 10px;
        p{
            border-bottom: 1px solid @g8;
            font-size: .8rem;
            line-height: 24px;
        }
    }
    .loading{
        display:block;
        position:relative;
        color:gray;
        font-size:14px;
        text-align:center;
    }
    .zw{
        position: relative;
        height: 70px;
    }

    nav{
        height:140px;
        border-bottom:solid 1px gray;
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        input {
            margin: 6px 2px 2px 10px;
            height: 30px;
            width: 60%;
            border: none;
            border: solid 2px #91d5ff;
        }
        .create{
            width: 50px;
            height: 50px;
            border: none;
            background: url(../../images/commodity/add.png) center center no-repeat;
        }
        .search{
            display: inline-block;
            width: 50px;
            height: 32px;
            border: none;
            background: url(../../images/commodity/search.png) center center no-repeat
        }
        .search_input{
            font-size: .7rem;
        }
        .nav_details {
            display: flex;
            flex-wrap: wrap;
            padding: 8px 8px;
            width: 100%;
            justify-content: space-between;
            span {
                display: block;
                width: 30%;
                height: 30px;
                background-color: @c3;
                color: aliceblue;
                margin-top: 8px;
                text-align: center;
                line-height: 30px;
                margin-bottom:4px;
            .selInput{
                float:left;
                margin:5px;
                height: 20px;
                width: 20px;
            }
            }
        }
    }
    article {
        height:calc(100% - 140px);
        margin-top:10px;
        overflow-x:hidden;
        .van-button {
            height:100%;
        }
        .project {
            margin: 8px 8px;
            height: 110px;
            background-color: @c1;
            .pro {
                display: block;
                font-size: 16px;
                line-height: 26px;
                color: gray;
            }
        }
    }
</style>