<template>
    <div class="functional-box">
      <ul class="total">
        <li>
            <span>今日营业额(元)</span>
            <p>2610</p>
            <span>订单数:126笔</span>
        </li>
        <li>
            <span>微信支付(元)</span>
            <p>1620</p>
            <span>订单数:80笔</span>
        </li>
        <li>
            <span>货到付款(元)</span>
            <p>590</p>
            <span>订单数:46笔</span>
        </li>
      </ul>
      <div class="item" v-for='it in list' :key="it.name " @click=toPage(it)>
        <i :class="['icon', it.icon]"></i>
        <p>{{it.name}}</p>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            list: [
                    {id: 'PROJECT-01-01', icon: 'addgoods', name: '新增列表', path: '/CreateNew', right: ''},
                    {id: 'PROJECT-01-01',icon: 'goods', name: '商品管理', path: '/Commodity', right: ''},
                    {id: 'PURCHASE-01-01',icon: 'stock', name: '供应商信息', path: '/supplier', right: ''},
                    {id: 'PROJECT-01-02',icon: 'supplier', name: '库存管理', path: '/creatNew', right: 'RAD'},
                    {id: 'PURCHASE-01-01',icon: 'stock', name: '进货管理', path: '/', right: ''},
                    {id: 'PURCHASE-01-02',icon: 'query', name: '查询销售', path: '', right: 'CD'},
                    {id: 'PROJECT-01-01',icon: 'promotion', name: '新增供应商', path: '', right: 'C'},
                    {id: 'RECEIVING-01-02"',icon: 'client', name: '客户管理', path: '', right: 'C'},
                    {id: 'SYSTEM-01-01',icon: 'analyse', name: '智能分析', path: '', right: ''},
                    {id: 'SYSTEM-01-02',icon: 'expenditure', name: '支出管理', path: '', right: 'R'},
                    {id: 'SYSTEM-01-04',icon: 'supplier', name: '供应商管理', path: '', right: 'R'},
                    {id: 'admin999',icon: 'setting', name: '设置', path: '/setting', right: ''},
                 ]
         }
    }, 
     computed: {
            userRights() {
                return this.$store.getters['common/userRights']
            }
        },
    methods:{
            toPage(menu) {
                if(menu.name=='智能分析'||menu.name=='供应商管理'||menu.name=='进货管理'||menu.name=='新增供应商'){
                    this.$toast({
                        position:'bottom',
                        message:'功能暂未开放，敬请期待!'
                    })
                    return
                }
            // 如果跳转的页面不需要权限，那么直接跳转
            if (!menu.right) {
                this.$router.push(menu.path)
            } else {
                // 实现页面按钮权限拦截
                let item = this.userRights.find(it => it.id === menu.id)
                if (!item) {
                    this.$toast.fail({
                        position:'bottom',
                        message:'权限不够，请联系：1008611'
                    })
                } else {
                    if (item.role.includes(menu.right)) {
                        this.$router.push(menu.path)
                    } else { 
                        this.$toast.fail({
                        position:'bottom',
                        message:'权限不够，请联系：1008611'
                        })
                    }
                 }
                }
            }
    }
}
</script>

<style lang="less" scoped>
   @import '../../style/common.less';
    .functional-box{
        .clear();
        .rel();
        padding: 6px 16px 0;
        .total{
            padding: 0 10px;
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .6rem;
            margin-bottom: 20px;
            li{
                float: left;
                height: 100px;
                p{
                    text-align: center;
                    font-weight: 800;
                    font-size: .8rem;
                }
            }
        }
        .item{
            margin: 5px;
            width: 22%;
            float: left;
            background: #fff;
            border: 1px solid @g5;
            p{
                font-size: .7rem;
                text-align: center;
            }
        }
    }
    @list:expenditure analyse addgoods goods supplier stock query promotion client setting; 
    .loop(@index) when(@index <= length(@list)) {
        @name: extract(@list, @index);
        // less中如果是样式名或则是字符串那么必须使用@{}模板
        &.@{name} {
            background-image: url("../../images/home/@{name}.png");
        }
        // 递归调用
        .loop(@index + 1);
    }
    .icon {
            .rel();
            width: 48px;
            height: 42px;
            background-position: center;
            background-size: 36px;
            background-repeat: no-repeat;
            margin: auto;
            .loop(1);
        }
</style>