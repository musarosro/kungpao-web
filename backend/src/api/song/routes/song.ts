export default { routes: [
  {
    method: 'GET',
    path: '/songs',
    handler: 'song.find',
  },
  {
    method: 'GET',
    path: '/songs/:id',
    handler: 'song.findOne',
  },
]};
