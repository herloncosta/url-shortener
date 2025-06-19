import { Sequelize, DataTypes } from 'sequelize'
import { Url } from './models/url'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './urls.sqlite',
  logging: false,
})

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    longUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Url',
    timestamps: true,
  }
)

export const setupDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    Url.sync({ alter: true })
    console.log('Url table sycned successfully.')
  } catch (e) {
    console.error('Unable to connect to the database:', e)
  }
}
