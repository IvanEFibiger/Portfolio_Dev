import { IsString, IsNotEmpty, IsEmail, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContactMessageDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del remitente' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name!: string;

  @ApiProperty({ example: 'juan@ejemplo.com', description: 'Correo electrónico del remitente' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email!: string;

  @ApiPropertyOptional({ example: 'Empresa S.A.', description: 'Empresa del remitente' })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({ example: 'Consulta sobre servicios', description: 'Asunto del mensaje' })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ example: 'Me gustaría saber más sobre...', description: 'Contenido del mensaje' })
  @IsString()
  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  @MaxLength(2000, { message: 'El mensaje no puede exceder los 2000 caracteres' })
  message!: string;
}
