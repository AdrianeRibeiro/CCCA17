import pgp from "pg-promise"

export default interface DatabaseConnection {
  query(sql: string, params: any): Promise<any>
  close(): Promise<void>
}

export class PgPromiseAdapter implements DatabaseConnection {
  connection: any

  private URL_CONNECTION = "postgres://qqwztrsw:uzfxPCdWpb82K7J2O84VGVg5_lu12ibp@kesavan.db.elephantsql.com/qqwztrsw"

  constructor() {
    this.connection = pgp()(this.URL_CONNECTION)
  }

  query(sql: string, params: any) {
    return this.connection.query(sql, params)
  }

  close() {
    return this.connection.$pool.end()
  }
}