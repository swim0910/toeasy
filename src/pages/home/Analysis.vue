<template>
    <van-swipe :autoplay="5000" indicator-color="#006d75">
        <van-swipe-item>
            <div ref="main1" style="width: 100%;height:100%;"></div>
        </van-swipe-item>
        <van-swipe-item>
            <div ref="main" style="width: 100%;height:100%;"></div>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    import echarts from 'echarts'
    import { paymentApi } from '@/apis/homeApi'
    import { menuTwo } from './menuTwo'
    import { menuOne } from './menuOne'
    export default {
        data() {
            return {
                chartNode: null,
                list: [],
                lineNode: null,
                loopLineTimer: null,
            }
        },
        mounted(){
            // 基于准备好的dom，初始化echarts实例
            this.chartNode = echarts.init(this.$refs.main);
            menuTwo(this.chartNode)
            this.lineNode = echarts.init(this.$refs.main1);
            menuOne(this.lineNode)
        },
        methods: {
            async loopLine() {
                paymentApi().then(result => {
                    if (result && result.code === 200) {
                        let option = renderLine(result.data)
                        // 执行echarts渲染
                        this.lineNode.setOption(option)
                    }
                })
                let _this = this
                this.loopLineTimer = setTimeout(function() {
                    _this.loopLine()
                }, 3000)
            }
        },

        beforeDestroy() {
            clearTimeout(this.loopLineTimer)
        }
    }
</script>

<style lang="less" scoped>
    .van-swipe-item {
        height: 300px;
        background: #fff;
    }
    .chart-box {
        height: 100%;
    }
</style>