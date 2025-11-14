export default { routes: [
  {
    method: 'GET',
    path: '/gallery-items',
    handler: 'gallery-item.find',
  },
  {
    method: 'GET',
    path: '/gallery-items/:id',
    handler: 'gallery-item.findOne',
  },
]};
