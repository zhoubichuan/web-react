import mockjs from 'mockjs'

export default {
  '/p/admin/index.php/home/SubPage/GetProviceCity': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
  }),
  '/p/admin/home/APIDepartment/list': mockjs.mock({
    'list|10': [
      {
        id: '@natural(2, 100)',
        title: '@cword(2, 5)',
        'children|0-10': [
          {
            id: '@natural(600, 10000)',
            title: '@cname',
            'children|0-10': [
              {
                id: '@natural(600, 10000)',
                title: '@cname',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }),
  '/hms/eInvitation/managerApi/theme/mv/list': mockjs.mock({
    hasNext: '@boolean',
    'list|10': [
      {
        themeId: '@natural(2, 100)',
        aeName: '@cword(2, 5)',
        description: '@cword(2, 5)',
        mvGif: '@image',
        price: '@integer(2, 5)',
        title: '@cword(2, 5)',
        releaseTime: '@date("yyyy-MM-dd")'
      }
    ],
    pageCount: '@natural(1, 10)',
    perPage: '@natural(1, 10)',
    totalCount: '@natural(1, 100)'
  }),
  '/hms/basicData/managerApi/cityAround/page': mockjs.mock({
    hasNext: '@boolean',
    'list|10': [
      {
        cid: '@natural(2, 100)',
        cityName: '@cword(2, 5)',
        'levelOneAroundCities|0-10': [
          {
            cityName: '@cname',
            levelOneAroundCities: []
          }
        ]
      }
    ],
    pageCount: '@natural(1, 10)',
    perPage: '@natural(1, 10)',
    totalCount: '@natural(1, 100)'
  })
}
