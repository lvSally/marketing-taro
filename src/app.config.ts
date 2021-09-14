export default {
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/protocol/index',
  ],
  subPackages: [
    {
      "root": "pages/store/",
      "pages": [
        "index",
        "detail",
        "imageList"
      ]
    },
    {
      "root": "pages/discount/",
      "pages": [
        "index"
      ]
    },
    {
      "root": "pages/my/",
      "pages": [
        "index",
        "grade",
        "record",
        "discount",
      ]
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
