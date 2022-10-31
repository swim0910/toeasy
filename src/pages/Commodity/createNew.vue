<template>
  <page-layout title="订单新建" :showNewBtn="false" :showHomeBtn='showHome' :showBackBtn='!showHome'>
    <van-form @submit="saveEvt" >
  <van-field
    v-model="pageData.nextId"
    type="text"
    name="环节审批人ID"
    label="环节审批人ID"
    placeholder="请输入下一环节审批人ID"
    :rules="[{  message: '请填写下一环节审批人ID' }]"
  />
  <van-field
    v-model="pageData.createId"
    type="text"
    name="新建人编码"
    label="新建人编码"
    placeholder="请输入新建人编码"
    :rules="[{  required: false, message: '请填写新建人编码' }]"
  />
  <van-field
    v-model="pageData.createName"
    type="text"
    name="新建人姓名"
    label="新建人姓名"
    placeholder="请输入新建人姓名"
    :rules="[{ required: true,  }]"
  />
  <van-field
    v-model="pageData.createTime"
    type="date"
    name="新建时间"
    label="新建时间"
    placeholder="请输入新建时间"
    :rules="[{ required: true, }]"
  />
  <van-field
    v-model="pageData.projectId"
    type="text"
    name="项目编码"
    label="项目编码"
    placeholder="请输入项目编码"
    :rules="[{ required: false,  }]"
  />
  <van-field
    v-model="pageData.projectName"
    type="text"
    name="项目名称"
    label="项目名称"
    placeholder="请输入项目名称"
    :rules="[{ required: true, }]"
  />
  <van-field
    v-model="pageData.materialId"
    type="text"
    name="材料编码"
    label="材料编码"
    placeholder="请输入材料编码"
    :rules="[{ required: false,}]"
  />
  <van-field
    v-model="pageData.materialName"
    type="text"
    name="材料名称"
    label="材料名称"
    placeholder="请输入材料名称"
    :rules="[{ required: true, }]"
  />
  <van-field
    v-model="pageData.materialUnit"
    type="text"
    name="材料单位"
    label="材料单位"
    placeholder="请输入材料单位"
    :rules="[{ required: true, }]"
  />
  <van-field
    v-model="pageData.materialWeight"
    type="number"
    name="材料重量"
    label="材料重量"
    placeholder="请输入材料重量"
    :rules="[{ required: true,  }]"
  />
  <van-field
    v-model="pageData.price"
    type="number"
    name="单价(元)"
    label="单价(元)"
    placeholder="请输入单价"
    :rules="[{ required: true, }]"
  />
  <van-field
    v-model="pageData.supplierId"
    type="text"
    name="供应商ID"
    label="供应商ID"
    placeholder="请输入供应商ID"
    :rules="[{ required: false,}]"
  />
  <van-field
    v-model="pageData.supplierName"
    type="text"
    name="供应商名"
    label="供应商名"
    placeholder="请输入供应商名"
    :rules="[{ required: true,}]"
  />
  <van-field
    v-model="pageData.supplierContact"
    type="text"
    name="联系人"
    label="联系人"
    placeholder="请输入联系人"
    :rules="[{ required: true, }]"
  />
  <van-field
    v-model="pageData.supplierPhone"
    type="number"
    name="联系电话"
    label="联系电话"
    placeholder="请输入联系电话"
    :rules="[{ required: true, },
              { validator: validator,message:'请输入正确的电话号码'}]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" >提交</van-button>
  </div>
</van-form>
  </page-layout>
</template>

<script>

import {purchaseInfoApi, purchaseSaveApi,purchaseUpdateApi} from '../../apis/purchaseApi'

  export default {
      computed: {
          showHome() {
              return !this.$route.query.type
          },
          userInfo(){
            return this.$store.getters['common/userInfo']
        }
      },

      data() {
          return {
              pageData: {

                  nextId: '',	                          
                  createId: '',	                       
                  createName: '',	                        
                  createTime: '',	                        
                  projectId: '',	                        
                  projectName: '',	                    
                  materialId: '',	                       
                  materialName: '',	                  
                  materialUnit: '',	                    
                  materialWeight: '',	                    
                  price: '',	                           
                  supplierId: '',	                     
                  supplierName: '',	                  
                  supplierContact: '',	            
                  supplierPhone: '',	            
                  remark: ''	                           

              }
          }
      },

      
      async created() {
      
        this.pageData.createId =this.userInfo.id
        this.pageData.createName =this.userInfo.name
        if(this.$route.query.id){
          console.log(this.$route.query.id)
          console.log(typeof(this.$route.query.id))
          // l'et result = await purchaseInfoApi(this.$route.query.id) '
          let result = await purchaseInfoApi(this.$route.query.id)
          console.log(result.code)
        if(result.code === 200){
          this.$toast.success('成功进入修改')
          this.pageData={
            ...result.data,
            nextId: result.data.nextId[0],
            remark: ''
          }
         
        }
        
        } 
      },

      methods: {
        validator(val){
            return /^1[3-9]{1}[0-9]{9}$/.test(val)
          },
         async saveEvt() {
           if(this.pageData.id){
            console.log(typeof({...this.pageData,nextId:[this.pageData.nextId]}))
            let modify =await purchaseUpdateApi({...this.pageData,nextId:[this.pageData.nextId]})
           
            if(!!modify && modify.code ===200){
                this.$toast.success('修改成功')
                }
                else{
                this.$toast.fail('修改失败，原因：'+modify.message)
                console.log(modify.message)
                }
           }
           else{
            this.pageData.price=Number(this.pageData.price)
            this.pageData.supplierId=Number(this.pageData.supplierId)
            this.pageData.createTime=Date.parse(this.pageData.createTime)
            let result = await purchaseSaveApi({...this.pageData,nextId:[this.pageData.nextId]})
           
            if(!!result && result.code ===200){

              this.$toast.success('保存成功')
            }
            else{
              this.$toast.fail('保存失败，原因：'+result.message)
            }

           }
          },
      
      }
  }
</script>

<style lang="less" scoped>
  @import '../../style/common.less';
  form{
    height: calc(100% - 48px);
    overflow-x: hidden;
  }
  .van-cell{
  margin:5px auto;
  background-color:@c1;
    }
</style>
