export default { routes: [
  {
    method: 'GET',
    path: '/band-members',
    handler: 'band-member.find',
  },
  {
    method: 'GET',
    path: '/band-members/:id',
    handler: 'band-member.findOne',
  },
]};
