<template>
  <div class="login-box">
    <van-notice-bar
      left-icon="volume-o"
      scrollable
      color="#fff"
      text="请注意,本系统将于今日23:00维护！！！"
      background="#003a8c"
      speed="60"
    />
    <div class="welcome" v-if="isWelcome">
      <van-circle
        v-model="currentRate"
        :clockwise="false"
        :text="String(reduce)"
        :color="{ '0%': '#3fecff', '100%': '#6149f6' }"
        size="48px"
        @click.native="closeWelcome"
      />
      <header>至简后台管理系统</header>
      <span class="subTitle">{{ welText }}</span>
      
    </div>

    <div v-else class="login">
      <header>至简后台管理系统</header>
      <div class="ipt1">
        <input type="text" v-model="phone"/>
      </div>
      <div class="ipt2">
        <input type="password" v-model="vdtCode"/>
        <span @click="getCode">{{ codeTimer }}</span>
      </div>
      <van-checkbox v-model="remember" checked-color="#1989fa"
        >记住账号</van-checkbox
      >
      <van-checkbox v-model="auto" checked-color="#1989fa"
        >下次自动登录</van-checkbox
      >
      <van-button round type="info" block @click="loginEvt" color="#003a8c"
        >登录</van-button
      >
    </div>

        <div class="other" v-show="gg">
      ------------其他登录方式------------
        <ul>
        <li class="qq" @click="qqEvt"><img src="../../images/login/QQ.png" alt=""></li>
        <li class="wx" @click="qqEvt"><img src="../../images/login/wechat.png" alt=""></li>
        <li class="wb" @click="qqEvt"><img src="../../images/login/weibo.png" alt=""></li>
      </ul>
    </div>
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop = 'show = !show'>
          <div class="qqview">
              <img src="../../images/login/sorry.png" alt="">
              请使用手机扫描二维码
          </div>
        </div>
      </van-overlay>

      <footer>
      Copyright @ 2022-现在 接受用户协议 技术支持：黄奥、杨淼、游泳
      互联网后台管理系统 联系邮箱: 123456789@qq.com
    </footer>

  </div>
</template>

<script>

import {
  autoLoginApi,
  loginApi,
  rightsApi,
  userInfoApi,
  vdtCodeApi,
} from "@/apis/loginApi";
import { SYSTEM_TOKEN } from "@/config/common.config";
import { decodeApi, encodeApi } from "@/utils";

export default {
  data() {
    return {
      show:false,
      isWelcome: true,
      currentRate: 100,
      reduce:5+'',
      checked: false,
      gg:false,
      welText: [
        "在风吹下，荷花颤颤巍巍的摇动着身躯。",
        "小草从地里探出了头，想好好晒晒太阳。",
        "榆树常常把身子探出墙头，向我们招手。",
        "鲜花摇曳着身姿，绽放出了久违的笑容。",
        "在微风的抚摸下，小草快乐地跳起了舞。",
        "晚上九点左右，昙花悄悄地张开了笑脸。",
        "小溪一边哼着歌，一边欢快的奔向远方。",
        "浅浅的小草像顽皮的孩子从地里跑出来。",
        "朵朵梅花张开了笑脸，在向我们打招呼。",
        "雨滴嗒滴嗒地下着，绵绵地轻吻着万物。",
        "秋风吹来，她跳起舞蹈，真是婀多姿啊！",
        "月季花开了，绽开她那娇嫩粉红的笑脸。",
      ][new Date().getMonth()],
      timer: null,
      phone: "",
      codeTimer: "获取验证码",
      vdtCode: "",
      remember: false,
      auto: false,
      autoSuccess: "pending",
      timer1:null
    };
  },

  async created() {

    //页面加载时，读取是否有免登录
    let autoLoginEvt = localStorage.getItem("auto-login");
    if (!!autoLoginEvt) {
      let token = decodeApi(autoLoginEvt);
      this.$store.commit("common/setToken", token);
      let result = await autoLoginApi();
      if (result.code === 200) {
        sessionStorage.setItem(
          SYSTEM_TOKEN,
          encodeApi(`${token}&&& ${Date.now()}`)
        );
        this.$store.commit("common/setuserInfo", result.data);
        let rights = await rightsApi(result.data.role);
        this.$store.commit("common/setuserRights", rights.data || []);
        this.autoSuccess = "success";
      } else {
        this.autoSuccess = "fail";
      }
    } else {
      this.autoSuccess = "fail";
    }
    //读取是否记住手机号
    let myphone = localStorage.getItem("login-phone");
    if (myphone) {
      this.phone = decodeApi(myphone);
      this.remember = true;
    }
    //圆环减少
    this.timer = setInterval(() => {
      this.currentRate--;
      if (this.currentRate <= 0) {
        clearInterval(this.timer);
        if (this.autoSuccess === 'success') {
          this.$router.push("/home");
        } else {
          this.isWelcome = false;
          this.gg = true
        }
      }
    }, 50);
    //一秒减少一
    this.timer1=setInterval(() => {
      if (this.reduce <= 0) {
        clearInterval(this.timer1);
      }
      this.reduce--
    }, 1000);
  },
  methods: {
    //登录判断
    async loginEvt() {
      if (!/^1[3-9]{1}[0-9]{9}$/.test(this.phone)) {
        this.$toast("手机号输入有误！");
        return;
      }
      if (!/^[0-9]{4}$/.test(this.vdtCode)) {
        this.$toast("验证码输入有误！");
        return;
      }
      this.$toast.loading({
        message: "正在加载...",
        forbidClick: true,
      });
      let result = await loginApi({ phone: this.phone, vdtCode: this.vdtCode });
      if (result.code !== 200) {
        this.$toast.fail("登录失败！" + result.message);
        return;
      }
      // 获取token
      sessionStorage.setItem(
        SYSTEM_TOKEN,
        encodeApi(`${result.data.token}&&& ${Date.now()}`)
      );
      this.$store.commit("common/setToken", result.data.token);
      //调用方法，存入数据
      this.loginCommonApi(result.data.id);
    },
    //存入数据
    async loginCommonApi(id) {
      let result = await userInfoApi(id);
      this.$store.commit("common/setuserInfo", result.data);

      let rights = await rightsApi(result.data.role);
      this.$store.commit("common/setuserRights", rights.data || []);
      //记住账号
      if (this.remember) {
        localStorage.setItem("login-phone", encodeApi(this.phone));
      } else {
        localStorage.removeItem("login-phone");
      }
      //自动登录
      if (this.auto) {
        localStorage.setItem(
          "auto-login",
          encodeApi(this.$store.getters["common/token"])
        );
      } else {
        localStorage.removeItem("auto-login");
      }
      this.$router.push("/home");
    },
    //获取验证码
    async getCode() {
      if (this.codeTimer !== "获取验证码") return;
      if (!/^1[3-9]{1}[0-9]{9}$/.test(this.phone)) {
        this.$toast({
          message: "手机号码有误",
          position: "bottom",
        });
        return;
      }
      this.codeTimer = "正在获取...";
      let result = await vdtCodeApi(this.phone);
      if (result.code !== 200) {
        this.codeTimer = "获取验证码";
        this.$toast.fail("输入的验证码不正确：" + result.message);
        return;
      }
      this.$toast.success("您的验证码为：" + result.data.vdtCode);
      this.loopCodeTimer(Date.now());
    },
    //节流防抖
    loopCodeTimer(startTime) {
      setTimeout(() => {
        let passTime = 59 - Math.floor((Date.now() - startTime) / 1000);
        this.codeTimer = `重新获取(${passTime}s)`;
        if (passTime > 0) {
          this.loopCodeTimer(startTime);
        } else {
          this.codeTimer = "获取验证码";
        }
      }, 500);
    },
    qqEvt(){
       this.show= true
    },
    //欢迎页面
    closeWelcome() {
      if (this.autoSuccess === "pending") return;
      clearInterval(this.timer);
      clearInterval(this.timer1);
      if (this.autoSuccess === "success") {
        this.$router.push("/home");
      } else {
        this.isWelcome = false;
        this.gg = true
      }
    },
  },
    //监听手机号
  watch: {
    phone() {
      this.vdtCode = "";
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/common.less";

 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }

.login-box {
  .rel();
  height: 100%;
  > .login,
  > .welcome {
    background-image: url('../../images/login/bg02.gif');
    background-size: cover;
    background-position: center 250px;
    background-color: @c1;
    height: 100%;
    .rel();
    padding-top: 9vh;
    > header {
      &::before {
        content: "";
        display: block;
        width: 80px;
        height: 80px;
        margin: auto;
        background: url(../../images/login/toeasy.png) center center / 80px 80px
          no-repeat;
      }
      font-size: 1.1rem;
      text-align: center;
      color: @c8;
    }
  }
    .login{
      background: #f0ebe5;
    }
  > .login > header {
    &::before {
      display: inline-block;
      width: 40px;
      height: 44px;
      vertical-align: middle;
      background-size: 60px;
    }
    margin-bottom: 10px;
  }
  > .welcome {
    .rel();
    padding-top: 18vh;
    > .subTitle {
      display: block;
      text-align: center;
      font-size: 0.7rem;
      line-height: 40px;
      color: @c6;
    }
    .van-circle {
      display: block;
      position: absolute;
      top: 20px;
      right: 10px;
    }
  }
  > .login {
    padding-left: 15px;
    padding-right: 15px;
    > .ipt1 {
      display: flex;
      padding: 10px 0;
      margin-bottom: 5px;
      border-bottom: 1px solid @g6;
      &::before {
        content: "";
        flex: 0 0 36px;
        height: 32px;
        background-image: url(../../images/login/phone.png);
        background-size: 26px;
        background-position: center;
        background-repeat: no-repeat;
      }
      > input {
        flex: 1;
        // width: 0;
        background: transparent;
        border: none;
        outline: none;
      }
      > span {
        flex: 0 0 100px;
        border-left: solid 1px @g6;
        font-size: 0.5rem;
        text-align: center;
        line-height: 32px;
      }
    }
    > .ipt2 {
      display: flex;
      padding: 10px 0;
      margin-bottom: 5px;
      border-bottom: 1px solid @g6;
      &::before {
        content: "";
        flex: 0 0 36px;
        height: 32px;
        background-image: url(../../images/login/yanzheng.png);
        background-size: 36px;
        background-position: center;
        background-repeat: no-repeat;
      }
      > input {
        flex: 1;
        // width: 0;
        background: transparent;
        border: none;
        outline: none;
      }
      > span {
        flex: 0 0 100px;
        border-left: solid 1px @g6;
        font-size: 0.5rem;
        text-align: center;
        line-height: 32px;
        background:#ccc;
      }
    }
    .van-checkbox {
      margin: 30px 0;
    }
  }

  > .other{
    position: absolute;
    bottom: 300px;
    text-align: center;
    padding-top: 5px;
    height: 300px;
    left: 50%;
    width: 300px;
    top: 65%;
    transform: translate(-50%,0);
    font-size: .9rem;
    > ul{
      display: flex;
      justify-content: space-evenly;
      margin-top:30px;
      width: 80%;
      position: absolute;
      left: 50%;
      transform: translate(-50%,0);
      > li{
        width: 33%;
        > img{
          width: 30px;
        }
      }
    }
  }
  > .van-overlay{
    > .wrapper{
      width: 300px;
      height: 300px;
      position: relative;
      margin: 70% auto;
      text-align: center;
      color: white;
      > .qqview{
        > img{
          width: 100%;
          height:100%;
          padding-bottom: 30px;
        }
      }
    }
  }

  > footer {
    display: flex;
    padding: 0 20px;
    position: fixed;
    bottom: 30px;
    width: 100%;
    justify-content: center;
    font-size: 0.6rem;
    text-align: center;
    color: @g6;
  }
}
</style>

