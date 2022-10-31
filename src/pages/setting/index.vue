<template>
   <page-layout title="设置" :showHomeBtn="true">
        <div class="imgbox">
            <img :src="myImg" alt="" @click="changePhoto">
        </div>
        <ul>
            <li>用户姓名: {{userName}}<img src="../../images/setting/username.png" alt=""></li>
            <li>用户性别: {{userSex}}<img src="../../images/setting/sex.png" alt=""></li>
            <li>用户部门: {{userDept}}<img src="../../images/setting/dept.png" alt=""></li>
            <li @click="$toast({position:'bottom',message:'功能暂未开放，敬请期待！'})">版本信息<img src="../../images/setting/version-info.png" alt=""></li>
            <li @click="$toast({position:'bottom',message:'功能暂未开放，敬请期待！'})">操作指南<img src="../../images/setting/working-manual.png" alt=""></li>
            <li><van-cell title="分享我们" @click="showShare = true" /><img src="../../images/setting/share.png"></li>
            <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
            />
            <van-button @click="quit()" type="primary" block color="#003a8c" >退出登录</van-button>
        </ul>
   </page-layout>
   
</template>
<script>
import {photoUpdateApi, userUpdateApi,} from '@/apis/settingApi'


export default {
    data(){
        return{
            myImg:'',
            userName:this.$store.getters['common/userInfo'].name,
            userSex:this.$store.getters['common/userInfo'].sex,
            userDept:this.$store.getters['common/userInfo'].dept,
            showShare: false,
            options: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
            ],
                }
    },
    computed:{
        userInfo(){
            return this.$store.getters['common/userInfo']
        }
    },
     created(){
        this.myImg='/swimming'+this.userInfo.photo
        // console.log(this.myImg)
    },
    methods:{
        //上传头像
        changePhoto(){
            let _this=this
                let input=document.createElement('input')
                input.setAttribute('type','file')
                input.setAttribute('accept','img/*')
                input.onchange=function(){
                   /**
                    *  使用canvas实现图片缩放
                       1.转字节码
                       2.把字节码转图片
                       3.用canvas画出来
                    */
                    let file=this.files[0]
                    let fr=new FileReader()
                    fr.onload=function(){   
                        // console.log(this.result)
                        let img =new Image() 
                        img.onload=function(){
                            let canvas=document.createElement('canvas')
                            canvas.width=256
                            canvas.height=256
                            let ctx=canvas.getContext('2d')
                            ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height)
                            let result=canvas.toDataURL()
                            photoUpdateApi({
                                type:'photo',
                                data:result,
                                name:file.name
                            }).then(d=>{ 
                                console.log(d)
                                _this.myImg='/swimming'+d.data
                                userUpdateApi({
                                    id:_this.userInfo.id,
                                    photo:d.data
                                }).then(d=>{
                                   if(d.code===200){
                                    _this.$toast.success('头像上传成功')
                                   }else{
                                    _this.$toast.fill('头像上传失败')
                                   }
                                })
                            })
                        }
                        img.src=this.result
                    }
                    fr.readAsDataURL(file)
                }
                input.click()
        },
        //分享方法
        onSelect(option) {
        this.$toast(`分享${option.name}成功`);
        this.showShare = false;
        },
        //退出清空
        quit(){
            this.$dialog.confirm({
            message: '确定要退出登录？',
           }).then(data=>{
            //清空session,local
            sessionStorage.clear()
            localStorage.clear()
           this.$router.push('/login')
           this.$toast.success('退出成功')
           }).catch(data=>{
            return
           })
        }
    }
}
</script>
<style lang="less" scoped>
    @import '../../style/common.less';
    .imgbox{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        background: url(../../images/setting/bg01.png)center center no-repeat;
        img{
            width: 110px;
            height: 110px;
            display: block;
            border-radius: 50%;
            border: 1px solid #fff;
            overflow: hidden;
        }
    }
    ul{
        padding: 10px;
        li,.van-cell{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .8rem;
            border-bottom: 1px solid @g7;
            margin:20px 0;
            background: @c2;
            border-radius: 10px;
            height: 50px;
            padding: 0 5px;
            img{
                width: 26px;
                height: 26px;
            }
        }
    }
</style>