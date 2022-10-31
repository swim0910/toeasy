<template>
    <page-layout title="至简管理系统"  :showHomeBtn="false">
        <div class="home-box">
            <Analysis/>
            <Functional/>
        </div>
    </page-layout>
</template>

<script>
    import Analysis from './Analysis'
    import Functional from './Functional'

    export default {
        components: { Analysis, Functional }
    }
</script>

<style lang="less" scoped>
    @import '../../style/common.less';
    .home-box {
        display: block;
        position: relative;
        height:100vh;
        background-color: @c1;
        overflow-x: hidden;
    }
</style>