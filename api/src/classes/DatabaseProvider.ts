import "reflect-metadata"
import Artist from "models/Artist"
import Genre from "models/Genre"
import News from "models/News"
import Playlist from "models/Playlist"
import Song from "models/Song"
import User from "models/User"
import { Connection, getConnectionManager, getConnectionOptions } from "typeorm"

export default class DatabaseProvider {
  private static async getOptions() {
    const connectionOptions = await getConnectionOptions()
    const options: any = {
      ...connectionOptions,
      entities: [User, Song, News, Playlist, Artist, Genre],
      migrations: [__dirname + "/migrations/*.ts"],
    }
    return options
  }
  private static entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
    if (prevEntities.length !== newEntities.length) return true

    for (let i = 0; i < prevEntities.length; i++) {
      if (prevEntities[i] !== newEntities[i]) return true
    }
    return false
  }

  private static async updateConnectionEntities(connection: Connection, entities: any[]) {
    if (!this.entitiesChanged(connection.options.entities, entities)) return

    // @ts-ignore
    connection.options.entities = entities

    // @ts-ignore
    connection.buildMetadatas()

    if (connection.options.synchronize) {
      await connection.synchronize()
    }
  }

  public static async ensureConnection(name: string = "default"): Promise<Connection> {
    const connectionManager = getConnectionManager()
    const options = await this.getOptions()

    if (connectionManager.has(name)) {
      const connection = connectionManager.get(name)

      if (!connection.isConnected) {
        await connection.connect()
      }

      if (process.env.NODE_ENV !== "production") {
        await this.updateConnectionEntities(connection, options.entities)
      }

      return connection
    }

    return connectionManager.create({ name, ...options }).connect()
  }

  public static async createConnection(): Promise<Connection> {
    return this.ensureConnection()
  }

  public static async perform(action: (connection: Connection) => Promise<any>) {
    const connection = await DatabaseProvider.createConnection()
    const result = await action(connection)
    await connection.close()
    return result
  }
}
