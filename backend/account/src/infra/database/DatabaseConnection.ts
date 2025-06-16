import pgp from "pg-promise"

export default interface DatabaseConnection {
  query(sql: string, params: any): Promise<any>
  close(): Promise<void>
}

export class PgPromiseAdapter implements DatabaseConnection {
  connection: any

  private URL_CONNECTION = "postgres://postgres:123456@localhost:5432/app"

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