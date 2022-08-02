import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { FileCategory } from 'App/Utils'
import Env from '@ioc:Adonis/Core/Env'

export default class File extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public ownerId: number

  @column({ serializeAs: null })
  public fileName: string

  @column({ serializeAs: null })
  public fileCategory: FileCategory

  @computed()
  public get url(): string {
    //Retorna a URL para exibição do arquivo no na
    return `${Env.get('APP_URL')}/uploads/${this.fileName}`
  }
}
