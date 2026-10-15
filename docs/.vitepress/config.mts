import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/HQ-comp/',
  title: "慧泉软件组件库",
  description: "记录组件的用法，方便查询开发",
  lang: "zh-CN",
  lastUpdated: true,
  locales: {
    "/": {
      label: "简体中文",
      lang: "zh-CN",
    },
  },
  themeConfig: {
    lastUpdated: {
      text: '最后更新于'
    },
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/Mbear17/HQ-comp/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '资源',
        items: [
          { text: '图标集合', link: '/comp/icon' }
        ]
      },
      { text: '组件',
        items: [
          { text: '按功能查询', link: '/comp/expense_apply_travel' },
          { text: '积木组件', link: '/comp/block/ins-def-1001' },
          { text: '通用组件', link: '/comp/block/cpt-upload' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '如何运行项目？', link: '/guide/' }
          ]
        }
      ],
      '/comp/': [
        {
          text: '资源',
          items: [
            { text: '图标集合', link: '/comp/icon' }
          ]
        },
        {
          text: '按功能查询',
          // collapsed: true,
          items: [
            { text: '智能差旅', link: '/comp/expense_apply_travel' }
          ]
        },
        {
          text: '积木组件',
          // collapsed: true,
          items: [
            { text: 'ins-def-1001 票据信息', link: '/comp/block/ins-def-1001' },
            { text: 'ins-def-1012 多文件上传', link: '/comp/block/ins-def-1012' },
            { text: 'ins-def-2001 采购结算单', link: '/comp/block/ins-def-2001' },
            { text: 'ins-def-2002 选择资产明细', link: '/comp/block/ins-def-2002' },
            { text: 'ins-def-2101 选择合同', link: '/comp/block/ins-def-2101' },
            { text: 'ins-def-3001 出差人员列表', link: '/comp/block/ins-def-3001' },
            { text: 'ins-def-3002 城市间交通', link: '/comp/block/ins-def-3002' },
            { text: 'ins-def-3003 住宿及补助', link: '/comp/block/ins-def-3003' },
            { text: 'ins-def-3004 其他差旅杂费', link: '/comp/block/ins-def-3004' },
            { text: 'ins-def-3005 选择订单（携程）', link: '/comp/block/ins-def-3005' },
            { text: 'ins-def-3006 选择订单（高德）', link: '/comp/block/ins-def-3006' },
            { text: 'ins-def-3007 国际差旅报销', link: '/comp/block/ins-def-3007' },
            { text: 'ins-def-4001 选择到款信息', link: '/comp/block/ins-def-4001' },
            { text: 'ins-def-4002 合同与待核销发票', link: '/comp/block/ins-def-4002' },
            { text: 'ins-def-4003 城市间交通（预留）', link: '/comp/block/ins-def-4003' },
            { text: 'ins-def-4101 选择开票内容', link: '/comp/block/ins-def-4101' },
            { text: 'ins-def-4102 填写开票信息', link: '/comp/block/ins-def-4102' }
          ]
        },
        {
          text: '通用组件',
          // collapsed: true,
          items: [
            { text: 'expense-apply-fund 选经费卡', link: '/comp/block/expense-apply-fund' },
            { text: 'cpt-upload 附件上传', link: '/comp/block/cpt-upload' },
            { text: 'datacheck-alert 数据检测提示', link: '/comp/block/datacheck-alert' }
          ]
        }
      ]
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ],

    //头上角要主题切换的文字 Appearance
    darkModeSwitchLabel: "切换主题",
    // 文章翻页
    docFooter: {
      prev: "上一篇", //Next page
      next: "下一篇", //Previous page
    },
    //当前页面 On this page
    outlineTitle: "页面导航",
    outline: {
      level: [2, 3]
    },

    // 返回顶部 Return to top
    returnToTopLabel: "返回顶部",

    // 菜单  Menu
    sidebarMenuLabel: "菜单",

    search: {
      provider: 'local',
      options: {
        translations: {
          //外面的搜索按钮  Search
          button: { buttonText: "搜索内容" },
          //这里就是点击导航栏上面的搜索弹出来的弹框  可以直接跟着改
          modal: {
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    //404页面的配置
    notFound: {
      title: "页面未找到",
      quote: "哎呀，您好像迷失在网络的小胡同里啦，别着急，赶紧回头是岸！",
      linkText: "返回首页",
    },
  }
})
