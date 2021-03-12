import bcrypt from 'bcrypt'
var salt = bcrypt.genSaltSync(8);
const data = {
   users: [
      {
         name: 'Ramadhani',
         email: 'admin@example.com',
         password: bcrypt.hashSync('password', salt),
         isAdmin: true
      },
      {
         name: 'Joni',
         email: 'joni@example.com',
         password: bcrypt.hashSync('password', salt),
         isAdmin: false
      },
   ],
   products: [
      {
         name: 'Kaos Putih',
         category: 'Shirts',
         image: '/images/t1.jpg',
         price: 85000,
         brand: 'Nike',
         rating: 4,
         numReviews: 20,
         description: 'high quality product',
         countInStock: 10
      },
      {
         name: 'Kaos 3s Hitam Rabbit',
         category: 'Shirts',
         image: '/images/t2.jpg',
         price: 120000,
         brand: 'Nike',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality product',
         countInStock: 0
      },
      {
         name: 'Kaos 3s Hitam Concert',
         category: 'Shirts',
         image: '/images/t3.jpg',
         price: 100000,
         brand: 'Nike',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality product',
         countInStock: 5
      },
      {
         name: 'Chino Coklat',
         category: 'Pants',
         image: '/images/t4.jpg',
         price: 150000,
         brand: 'Nike',
         rating: 5,
         numReviews: 10,
         description: 'high quality product',
         countInStock: 3
      },
      {
         name: 'Chino Hitam',
         category: 'Pants',
         image: '/images/t5.jpg',
         price: 180000,
         brand: 'Nike',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality product',
         countInStock: 2
      },
   ]
}

export default data