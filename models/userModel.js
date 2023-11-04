import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, 'Please provide us with your phone number'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Your password must be longer than six characters'],
      select: false,
    },
    password_reset_token: {
      required: false,
      type: String,
      trim: true,
    },

    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    title: {
      type: String,
      default: 'title',
    },
    description: {
      type: String,
      default: 'description',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  console.log(
    'Saving reset password',
    this.isModified('password'),
    this.password
  )
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})
const User = models.User || model('User', userSchema)
export default User
