export default { routes: [
  {
    method: 'GET',
    path: '/news-items',
    handler: 'news-item.find',
  },
  {
    method: 'GET',
    path: '/news-items/:id',
    handler: 'news-item.findOne',
  },
]};
