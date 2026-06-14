import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactStatusDto {
  @ApiProperty({
    enum: ['read', 'answered', 'discarded'],
    description: 'Nuevo estado del mensaje de contacto',
    example: 'read',
  })
  @IsString()
  @IsIn(['read', 'answered', 'discarded'], {
    message: 'El estado debe ser: read, answered o discarded',
  })
  status!: 'read' | 'answered' | 'discarded';
}
