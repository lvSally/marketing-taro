export default {
  '/mock/api/coupon/info/listConfigCoupon': { // 配置优惠卷列表
    "data": [
      {
        "amount": 0,
        "couponId": "string",
        "couponName": "string",
        "discount": 0,
        "exchangeTime": "2021-09-14T10:23:50.932Z",
        "expireTime": "2021-09-14T10:23:50.932Z",
        "packageId": "string",
        "paidAmount": 0,
        "status": "string",
        "usedTime": "2021-09-14T10:23:50.932Z",
        "userPhone": "string"
      }
    ],
    "message": "string",
    "status": 0,
    "success": true
  },
  '/mock/api/coupon/info/queryMyCoupon': { // 我的优惠卷
    "data": [
      {
        "amount": 0,
        "couponId": "202108241234",
        "couponName": "足浴优惠券",
        "discount": 7,
        "exchangeTime": 1631770062145,
        "expireTime": 1631770062145,
        "packageId": "string",
        "paidAmount": 0,
        "status": "USEABLE",
        "usedTime": 1631770062145,
        "userPhone": "string"
      },
      {
        "amount": 0,
        "couponId": "202108241235",
        "couponName": "xx优惠券",
        "discount": 7.5,
        "exchangeTime": 1631770062145,
        "expireTime": 1631770062145,
        "packageId": "string",
        "paidAmount": 0,
        "status": "EXPIRE",
        "usedTime": 1631770062145,
        "userPhone": "string"
      },
      {
        "amount": 0,
        "couponId": "202108241236",
        "couponName": "优惠券1",
        "discount": 7,
        "exchangeTime": 1631770062145,
        "expireTime": 1631770062145,
        "packageId": "string",
        "paidAmount": 0,
        "status": "USED",
        "usedTime": 1631770062145,
        "userPhone": "string"
      },
    ],
    "message": "string",
    "status": 0,
    "success": true
  },
  '/mock/api/user/miniLogin': { // 小程序login
    "data": {
      "authChannel": "string",
      "externalAuthId": "string",
      "nickName": "string",
      "phone": "string",
      "sessionKey": "string",
      "token": "mocktoken"
    },
    "message": "string",
    "status": 0,
    "success": true
  },
  '/mock/api/user/myInfo': { // 小程序我的主页
    "data": {
      "couponCount": 1,
      "credits": 10,
      "phone": "13675899999"
    },
    "message": "string",
    "status": 0,
    "success": true
  },
  '/mock/api/credits/queryCreditsTrans': { // 查询积分记录
    "data": {
      "asc": [
        "string"
      ],
      "condition": {},
      "current": 50,
      "desc": [
        "string"
      ],
      "limit": 0,
      "offset": 0,
      "openSort": true,
      "orderByField": "string",
      "pages": 0,
      "records": [
        {
          "action": "消费赠送",
          "actionType": "string",
          "amount": 50,
          "creditId": "01",
          "transDate": "1631673840007"
        },
        {
          "action": "xx消费",
          "actionType": "string",
          "amount": -100,
          "creditId": "01",
          "transDate": "1631673840007"
        }
      ],
      "searchCount": true,
      "size": 0,
      "total": 0
    },
    "message": "string",
    "status": 0,
    "success": true
  },
  '/mock/api/shop/book': { // 预约
    "data": {
      "address": "string",
      "busiHours": "string",
      "desc": "string",
      "name": "string",
      "phoneNum": "string",
      "pic": [
        {
          "order": 0,
          "url": "string"
        }
      ],
      "shopId": "string",
      "shopProjects": [
        {
          "createTime": "2021-09-14T10:26:57.527Z",
          "deleteFlag": 0,
          "desc": "string",
          "duration": 0,
          "id": 0,
          "name": "string",
          "pic": "string",
          "price": 0,
          "projectId": "string",
          "shopId": "string",
          "status": 0,
          "updateTime": "2021-09-14T10:26:57.527Z"
        }
      ],
      "shopWorkers": [
        {
          "bookTime": "string",
          "createTime": "2021-09-14T10:26:57.527Z",
          "deleteFlag": 0,
          "desc": "string",
          "id": 0,
          "name": "string",
          "pic": "string",
          "projectId": "string",
          "shopId": "string",
          "status": 0,
          "updateTime": "2021-09-14T10:26:57.527Z",
          "workerId": "string"
        }
      ]
    },
    "message": "string",
    "status": 0,
    "success": true
  },
  '/mock/api/shop/bookHistory': { // 预约记录
    "data": {
      "asc": [
        "string"
      ],
      "condition": {},
      "current": 0,
      "desc": [
        "string"
      ],
      "limit": 0,
      "offset": 0,
      "openSort": true,
      "orderByField": "string",
      "pages": 0,
      "records": [
        {
          "bookData": 1631770062145,
          "bookTime": "23:00-次日01:00",
          "bookType": "SPECIAL",
          "projectName": "项目名称",
          "shopInfoVO": {
            "address": "地址",
            "busiHours": "23:00-次日01:00",
            "desc": "string",
            "name": "店名",
            "phoneNum": "string",
            "shopId": "string"
          },
          "shopName": "店名",
          "status": "SUCCESS",
          "workerName": "店员",
          createTime: 1631770062145
        },
        {
          "entryDate": 1631770062145,
          "bookTime": 1631770062145,
          "bookType": "FAST",
          "projectName": "项目名称",
          "shopInfoVO": {
            "address": "地址",
            "busiHours": "23:00-次日01:00",
            "desc": "string",
            "name": "店名",
            "phoneNum": "string",
            "shopId": "string"
          },
          "shopName": "店名",
          "status": "CANCEL",
          "workerName": "店员",
          createTime: 1631770062145
        }
      ],
      "searchCount": true,
      "size": 0,
      "total": 0
    },
    "message": "string",
    "status": 0,
    "success": true
  },
  '/mock/api/shop/queryById': { // 查询门店通过门店ID
    status: 200,
    message: "操作成功!",
    success: true,
    data: {
      shopId: "887850325471100928",
      name: "来一桶",
      desc: "来一桶",
      busiHours: "00:00-21:00",
      address: "北纬路甲一号",
      phoneNum: "110",
      pic: [
      {
      url: "https://cdn.utoohappy.com/887085503469363200.jpg",
      order: 0
      }
      ],
      shopProjects: [
        {
          "projectId": "001",
          "shopId": "887850325471100928",
          "name": "项目1",
          "pic": "https://cdn.utoohappy.com/887085503469363200.jpg",
          "duration": 0,
          "price": 0,
          "desc": "ss",
          "status": 0,
          "createTime": 0,
          "updateTime": 0
        }
      ],
      shopWorkers: [
        {
          "workerId": "001",
          "shopId": "887850325471100928",
          "name": "编号001",
          "pic": "https://cdn.utoohappy.com/887085503469363200.jpg",
          "desc": "xx00",
          "status": 0,
          "workerSchedule": [
            {
              "bookDate": 1631808000000,
              "bookDateTime": [
                {
                  "bookTime": "08:30-23:00",
                  "isBooked": false
                },
                {
                  "bookTime": "08:30-23:00",
                  "isBooked": true
                },
                {
                  "bookTime": "11:30-23:00",
                  "isBooked": false
                }
              ]
            },
            {
              "bookDate": 1631894400000,
              "bookDateTime": [
                {
                  "bookTime": "08:30-23:00",
                  "isBooked": false
                }
              ]
            },
            
          ],        
          "createTime": 0,
          "updateTime": 0
        }    
      ]
    }
  },
  "/mock/admin/shop/list": {
    "data": {
      "asc": [
        "string"
      ],
      "condition": {},
      "current": 0,
      "desc": [
        "string"
      ],
      "limit": 0,
      "offset": 0,
      "openSort": true,
      "orderByField": "string",
      "pages": 0,
      "records": [
        {
          "address": "string",
          "busiHours": "string",
          "createTime": 0,
          "desc": "string",
          "name": "string",
          "phoneNum": "string",
          "pic": [
            {
              "order": 0,
              "url": "string"
            }
          ],
          "shopId": "string",
          "status": 0,
          "updateTime": 0
        }
      ],
      "searchCount": true,
      "size": 0,
      "total": 0
    },
    "message": "string",
    "status": 0,
    "success": true
  },
  '/mock/api/coupon/info/listConfigCoupon': {
    "data": [
      {
        "amount": 99,
        "couponId": "1",
        "couponName": "足浴优惠券1",
        "discount": 7.5,
        "exchangeTime": "1631720825230",
        "expireTime": "1631720825230",
        "packageId": "string",
        "paidAmount": 0,
        "status": "active",
        "usedTime": "1631720825230",
        "userPhone": "string"
      },
      {
        "amount": 9,
        "couponId": "2",
        "couponName": "足浴优惠券2",
        "discount": 7.5,
        "exchangeTime": "1631720825230",
        "expireTime": "1631720825230",
        "packageId": "string",
        "paidAmount": 0,
        "status": "have",
        "usedTime": "1631720825230",
        "userPhone": "string"
      },
      {
        "amount": 0,
        "couponId": "3",
        "couponName": "足浴优惠券3",
        "discount": 7.5,
        "exchangeTime": "1631720825230",
        "expireTime": "1631720825230",
        "packageId": "string",
        "paidAmount": 0,
        "status": "none",
        "usedTime": "1631720825230",
        "userPhone": "string"
      }
    ],
    "message": "string",
    "status": 0,
    "success": true
  }
}