webpackJsonp([8],{"0xnE":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l={name:"profitList",data:function(){return{value3:"",currentPage:1,tableData:[{date:"2016-05-02",taskNum:"5",orderNum:"5",setPersonNum:"5",newPay:"5",newPayNum:"5.5",payNum:"5",PayMoney:"5",yu:5,xiaofei:5,profits:5},{date:"2016-05-02",taskNum:"5",orderNum:"5",setPersonNum:"5",newPay:"5",newPayNum:"5.5",payNum:"5",PayMoney:"5",yu:5,xiaofei:5,profits:5}]}},methods:{handleSizeChange:function(e){console.log("每页 "+e+" 条")},handleCurrentChange:function(e){console.log("当前页: "+e)}}},n={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"profitList"},[t("div",{staticClass:"wrap"},[t("h3",[e._v("利润报表")]),e._v(" "),t("span",[e._v("日期查询")]),e._v(" "),t("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",format:"yyyy-MM-dd"},model:{value:e.value3,callback:function(a){e.value3=a},expression:"value3"}}),e._v(" "),t("button",{staticClass:"BtnDisable"},[e._v("查询")]),e._v(" "),t("div",{staticClass:"table"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[t("el-table-column",{attrs:{prop:"date",label:"日期",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"taskNum",label:"任务数",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"orderNum",label:"订单数",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"setPersonNum",label:"下单任务数",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"newPay",label:"新用户充值数",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"newPayNum",label:"新用户充值金额",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"payNum",label:"充值笔数",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"PayMoney",label:"充值金额",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"yu",label:"用户账户余额",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"xiaofei",label:"用户消费余额",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"profits",label:"利润",align:"center"}})],1)],1),e._v(" "),t("div",{staticClass:"pager"},[t("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[100,200,300,400],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:400},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var r=t("VU/8")(l,n,!1,function(e){t("scmM")},"data-v-300b5848",null);a.default=r.exports},scmM:function(e,a){}});
//# sourceMappingURL=8.8a5ac2d6de12cb099632.js.map