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
        "couponId": "string",
        "couponName": "string",
        "discount": 0,
        "exchangeTime": "2021-09-14T10:24:56.457Z",
        "expireTime": "2021-09-14T10:24:56.457Z",
        "packageId": "string",
        "paidAmount": 0,
        "status": "string",
        "usedTime": "2021-09-14T10:24:56.457Z",
        "userPhone": "string"
      }
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
          "action": "string",
          "actionType": "string",
          "amount": 0,
          "creditId": "string",
          "transDate": "2021-09-14T10:26:26.070Z"
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
          "bookTime": "string",
          "bookType": "string",
          "projectName": "string",
          "shopInfoVO": {
            "address": "string",
            "busiHours": "string",
            "desc": "string",
            "name": "string",
            "phoneNum": "string",
            "shopId": "string"
          },
          "shopName": "string",
          "status": "SUCCESS",
          "workerName": "string"
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
          "createTime": "2021-09-14T10:28:52.090Z",
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
          "updateTime": "2021-09-14T10:28:52.090Z"
        }
      ],
      "shopWorkers": [
        {
          "bookTime": "string",
          "createTime": "2021-09-14T10:28:52.090Z",
          "deleteFlag": 0,
          "desc": "string",
          "id": 0,
          "name": "string",
          "pic": "string",
          "projectId": "string",
          "shopId": "string",
          "status": 0,
          "updateTime": "2021-09-14T10:28:52.090Z",
          "workerId": "string"
        }
      ]
    },
    "message": "string",
    "status": 0,
    "success": true
  }
}