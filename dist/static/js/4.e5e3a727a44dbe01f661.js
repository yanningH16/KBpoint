webpackJsonp([4],{aEKa:function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var a={name:"rechargeList",data:function(){return{dialogVisible:!1,currentPage:1,pageSize:5,input:"",input1:"",input2:"",input3:"",value1:"",textarea:"",value3:"",options:[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}],value:"",payState:[{value4:"选项2",label:"双皮奶"},{value4:"选项3",label:"蚵仔煎"},{value4:"选项4",label:"龙须面"}],value4:"",orderState:[{value5:"选项3",label:"蚵仔煎"},{value5:"选项4",label:"龙须面"}],value5:"",deliveryState:[{value6:"选项3",label:"蚵仔煎"},{value6:"选项4",label:"龙须面"}],value6:"",tableData:[{name:"5454545454",date:"2017-02-01",company:"圆通",plant:"淘宝",taskNum:"545555"}]}},methods:{handleClick:function(){this.dialogVisible=!0},handleClickCecal:function(){var e=this;this.$confirm("你确认取消订单么? 请谨慎操作","取消订单",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$message({type:"success",message:"删除成功!"})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(e){console.log("每页 "+e+" 条")},handleCurrentChange:function(e){console.log("当前页: "+e)}}},n={render:function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("div",{staticClass:"rechargeList"},[t("div",{staticClass:"wrap"},[t("h3",[e._v("用户充值记录")]),e._v(" "),t("p",{staticClass:"right"},[e._v("请确认用户已经转账到您的支付宝账户，并且订单号和金额一致后再点击“款已到账,充值给用户”按钮")]),e._v(" "),t("ul",[t("li",[e._v("\n        物流平台:\n        "),t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value,callback:function(l){e.value=l},expression:"value"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("li",[e._v("\n        付款状态:\n        "),t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value4,callback:function(l){e.value4=l},expression:"value4"}},e._l(e.payState,function(e){return t("el-option",{key:e.value4,attrs:{label:e.label,value:e.value4}})}))],1),e._v(" "),t("li",[e._v("\n        订单状态:\n        "),t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value5,callback:function(l){e.value5=l},expression:"value5"}},e._l(e.orderState,function(e){return t("el-option",{key:e.value5,attrs:{label:e.label,value:e.value5}})}))],1)]),e._v(" "),t("ul",{staticStyle:{"margin-top":"20px"}},[t("li",[e._v("\n        快递状态:\n        "),t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value6,callback:function(l){e.value6=l},expression:"value6"}},e._l(e.deliveryState,function(e){return t("el-option",{key:e.value6,attrs:{label:e.label,value:e.value6}})}))],1),e._v(" "),t("li",[t("span",[e._v("收件手机:")]),e._v(" "),t("el-input",{attrs:{placeholder:"请输入编号"},model:{value:e.input,callback:function(l){e.input=l},expression:"input"}})],1),e._v(" "),t("li",[e._v("\n        快递单号:\n        "),t("el-input",{attrs:{placeholder:"请输入编号"},model:{value:e.input1,callback:function(l){e.input1=l},expression:"input1"}})],1)]),e._v(" "),t("ul",{staticClass:"ulTow"},[t("li",[t("span",[e._v("订单号:")]),e._v(" "),t("el-input",{attrs:{placeholder:"请输入编号"},model:{value:e.input2,callback:function(l){e.input2=l},expression:"input2"}})],1),e._v(" "),t("li",[e._v("\n        用户名:\n        "),t("el-input",{attrs:{placeholder:""},model:{value:e.input3,callback:function(l){e.input3=l},expression:"input3"}})],1),e._v(" "),t("li",[e._v("\n        提交日期:\n        "),t("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",format:"yyyy-MM-dd"},model:{value:e.value3,callback:function(l){e.value3=l},expression:"value3"}})],1),e._v(" "),e._m(0)]),e._v(" "),e._m(1),e._v(" "),t("div",{staticClass:"table"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[t("el-table-column",{attrs:{fixed:"",type:"selection",width:"55",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"name",label:"用户名",width:"120",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"date",label:"发布日期",width:"150",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"company",label:"快递公司",width:"120",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"plant",label:"平台",width:"120",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"sendInfo",label:"发货信息",width:"200"},scopedSlots:e._u([{key:"default",fn:function(l){return[t("p",[e._v("发货人姓名:黄军")]),e._v(" "),t("p",[e._v("发货人电话：15700177632")]),e._v(" "),t("p",[e._v("发货人手机：15700177632")]),e._v(" "),t("p",[e._v("物品质量：2.1kg")]),e._v(" "),t("p",[e._v("发货人地址：浙江省杭州市 点点滴滴点点滴滴")])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"getInfo",label:"收货信息",width:"200"},scopedSlots:e._u([{key:"default",fn:function(l){return[t("p",[e._v("收货人姓名:黄军")]),e._v(" "),t("p",[e._v("发货人电话：15700177632")]),e._v(" "),t("p",[e._v("发货人手机：15700177632")]),e._v(" "),t("p",[e._v("物品质量：2.1kg")]),e._v(" "),t("p",[e._v("发货人地址：浙江省杭州市 点点滴滴点点滴滴")])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"orderInfo",label:"订单信息",width:"200"},scopedSlots:e._u([{key:"default",fn:function(l){return[t("p",[e._v("平台订单号:4646546156156")]),e._v(" "),t("p",[e._v("快递单号:465465948546156")])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"state",label:"状态",width:"200"},scopedSlots:e._u([{key:"default",fn:function(l){return[t("p",[e._v("商家已付款")]),e._v(" "),t("p",[e._v("站点已付款")]),e._v(" "),t("p",[e._v("快递单号:已成功")])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"taskNum",label:"任务号",width:"120",align:"center"}})],1)],1),e._v(" "),t("div",{staticClass:"pager"},[t("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[100,200,300,400],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:400},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),e._v(" "),t("el-dialog",{attrs:{title:"用户充值确认",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(l){e.dialogVisible=l}}},[t("p",[t("span",[e._v("到账日期")]),e._v(" "),t("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.value1,callback:function(l){e.value1=l},expression:"value1"}})],1),e._v(" "),t("p",{staticClass:"markets"},[t("span",[e._v("备注")]),e._v(" "),t("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.textarea,callback:function(l){e.textarea=l},expression:"textarea"}})],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(l){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(l){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[function(){var e=this.$createElement,l=this._self._c||e;return l("li",[l("button",{staticClass:"BtnDisable"},[this._v("查询")])])},function(){var e=this.$createElement,l=this._self._c||e;return l("p",{staticStyle:{"margin-top":"2px","padding-bottom":"5px"}},[l("button",{staticClass:"centerBtn"},[this._v("重新获取单号")])])}]};var i=t("VU/8")(a,n,!1,function(e){t("uvVX")},"data-v-b727dcee",null);l.default=i.exports},uvVX:function(e,l){}});
//# sourceMappingURL=4.e5e3a727a44dbe01f661.js.map