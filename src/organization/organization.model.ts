import { ApiProperty } from "@nestjs/swagger";

export default class Organization {

  @ApiProperty({
    example: "d2f9d636-dc14-4389-a494-93ad462cf44e",
    description: 'Id of the organization (uuid)'
  })
  id: string
  @ApiProperty({
    example: "Organization ABC",
    description: 'Name of the organization'
  })
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
