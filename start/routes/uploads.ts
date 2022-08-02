import Route from '@ioc:Adonis/Core/Route'

Route.get('/uploads/:file', 'Uploads/Main.show')

// Route.resource('/auth', 'Auth/Main')
//   .only(['store', 'destroy'])
//   .middleware({
//     destroy: ['auth'],
//   })
