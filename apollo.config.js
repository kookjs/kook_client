module.exports = {
  client: {
    includes: [__dirname+'/packages/**'],
    service: {
      name: "my_name",
      localSchemaFile: "./schema.json" // how to configure to multiple schemas?
    }
  }
}