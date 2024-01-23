import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganizationDTO {
  @ApiProperty({
    example: "Organization ABC",
    description: 'Name of the organization to create'
  })
  name: string;
}
