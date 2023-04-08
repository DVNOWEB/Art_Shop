const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    secretKey,
    { expiresIn: '1d' }
  )
}

exports.verifyToken = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, secretKey)._id
    req.userId = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'You need to verify your token to access this route' })
  }
}

// admin route
const admins = ['64301e4b6be0aa76edc06830']

exports.isAdmin = (req, res, next) => {
  if(admins.includes(req.userId)){
    next()
  } else{
    return res.status(401).json({ message: 'You need to be an admin to access this route'})
  }
}





// // admin login
// exports.adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     // check if admin exists
//     const admin = admins.find((admin) => admin.email === email)
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' })
//     }
//     // check if password is correct
//     if (admin.password !== password) {
//       return res.status(401).json({ message: 'Password is incorrect' })
//     }
//     // generate token
//     const token = generateToken(admin)
//     res.status(200).json({ token })
//   } catch (err) {
//     res.status(500).json({ err: err.message })
//   }
// }

// // admin register
// exports.adminRegister = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     // check if admin exists
//     const admin = admins.find((admin) => admin.email === email)
//     if (admin) {
//       return res.status(400).json({ message: 'Admin already exists' })
//     }
//     // create new admin
//     const newAdmin = {
//       email,
//       password,
//     }
//     admins.push(newAdmin)
//     res.status(200).json({ message: 'Admin created' })
//   } catch (err) {
//     res.status(500).json({ err: err.message })
//   }
// }

// // check if is admin
// exports.isAdmin = async (req, res, next) => {
//   try {
//     const { email } = req.body
//     // check if admin exists
//     const admin = admins.find((admin) => admin.email === email || admin.password === password)
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' })
//     }
//     next()
//   } catch (err) {
//     res.status(500).json({ err: err.message })
//   }
// }

// // admin logout
// exports.adminLogout = async (req, res) => {
//   try {
//     res.status(200).json({ message: 'Admin logged out' })
//   } catch (err) {
//     res.status(500).json({ err: err.message })
//   }
// }

// // admin delete
// exports.adminDelete = async (req, res) => {
//   try {
//     const { email } = req.body
//     // check if admin exists
//     const admin = admins.find((admin) => admin.email === email)
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' })
//     }
//     // delete admin
//     admins.splice(admin, 1)
//     res.status(200).json({ message: 'Admin deleted' })
//   } catch (err) {
//     res.status(500).json({ err: err.message })
//   }
// }

// // admin update
// exports.adminUpdate = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     // check if admin exists
//     const admin = admins.find((admin) => admin.email === email)
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' })
//     }
//     // update admin
//     admin.password = password
//     res.status(200).json({ message: 'Admin updated' })
//   } catch (err) {
//     res.status(500).json({ err: err.message })
//   }
// }


