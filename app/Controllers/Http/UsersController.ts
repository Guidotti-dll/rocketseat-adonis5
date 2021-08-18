import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()
    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.only(['name', 'username'])
    const user = await User.create(data)

    return user
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findByOrFail('id', params.id)
    return user
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findByOrFail('id', params.id)
    const data = await request.only(['name', 'username'])

    user.merge(data)
    await user.save()
    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findByOrFail('id', params.id)
    await user.delete()
  }
}
