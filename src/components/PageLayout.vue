<template>
    <div class="page-layout-container">
        <header>
            <i class="icon home" v-if="showHomeBtn" @click="$router.push('/home')"></i>
            {{title}}
        </header>
            <slot/>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            showHomeBtn: {
                type: Boolean,
                default: true
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/common.less';

    .page-layout-container {
        .rel();
        height: 100vh;
        > header {
            .clear();
            height: 48px;
            padding: 0 6px;
            background-color: @c5;
            color: @g1;
            line-height: 48px;
            text-align: center;
            font-size: .9rem;
            > .icon {
                float: left;
                height: 48px;
                width: 36px;
                background-position: center;
                background-size: 32px;
                background-repeat: no-repeat;
                &.home {
                    background-image: url(../images/home.png);
                }
       
            }
        }
    }
</style>