import { models, model, Schema } from 'mongoose'

const freebieSchema = Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    fsubtopic: {
      type: String,
      required: true,
    },
    firstdescription: {
      type: String,
      required: true,
    },
    ssubtopic: {
      type: String,
    },
    seconddescription: {
      type: String,
    },
    tsubtopic: {
      type: String,
    },
    thirddescription: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Freebie = models.Freebie || model('Freebie', freebieSchema)
export default Freebie
