import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'
import Mail from '@ioc:Adonis/Addons/Mail'
import { User, UserKey } from 'App/Models'
import { faker } from '@faker-js/faker'

export default class ForgotPasswordsController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.findByOrFail('email', email)

    const key = faker.datatype.uuid() + user.id
    await user.related('keys').create({ key })

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
    await Mail.send((message) => {
      message.to(email)
      message.from('contato@mod64bits.io')
      message.subject('Recuperação de senha')
      message.htmlView('emails/forgot-password', { link })
    })
    return { message: 'Verifique sua caixa de email.' }
  }
  public async update({ request }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    await userKey.load('user')

    userKey.user.merge({ password })

    await userKey.user.save()

    await userKey.delete()

    return { message: 'Senha alterada com sucesso.' }
  }
}
