export default { routes: [
  {
    method: 'GET',
    path: '/events',
    handler: 'event.find',
  },
  {
    method: 'GET',
    path: '/events/:id',
    handler: 'event.findOne',
  },
]};
