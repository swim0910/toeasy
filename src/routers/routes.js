import Home from '@/pages/home'
import Setting from '@/pages/setting'
// import Product from '@/pages/product'
import Supplier from '@/pages/supplier'
// import addSupplier from '@/pages/supplier/addSupplier'

import Commodity from '@/pages/Commodity/index'
import CommodityCreate from '@/pages/Commodity/createNew'

const routes = [
    {path:'/home',component: Home},
    {path:'/setting',component: Setting},
    // {path:'/product',component: Product},

    {path:'/supplier',component: Supplier},
    // {path:'/addSupplier',component: addSupplier},

    {path:'/Commodity',component: Commodity},
    {path:'/CreateNew',component: CommodityCreate}

]
    

export default routes