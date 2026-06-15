import { IsString, IsNotEmpty, IsEmail, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

// Nota de defensa en profundidad: la UI admin renderiza estos mensajes con
// interpolación de Angular ({{ }}), por lo que el HTML se escapa en el cliente.
// Si en el futuro se renderizan como HTML o se envían por email, habría que
// sanear en ese punto de salida (output encoding), no mutar el texto aquí.
export class CreateContactMessageDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del remitente' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(120, { message: 'El nombre no puede exceder los 120 caracteres' })
  name!: string;

  @ApiProperty({ example: 'juan@ejemplo.com', description: 'Correo electrónico del remitente' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email!: string;

  @ApiPropertyOptional({ example: 'Empresa S.A.', description: 'Empresa del remitente' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  @MaxLength(160, { message: 'La empresa no puede exceder los 160 caracteres' })
  company?: string;

  @ApiPropertyOptional({ example: 'Consulta sobre servicios', description: 'Asunto del mensaje' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'El asunto no puede exceder los 200 caracteres' })
  subject?: string;

  @ApiProperty({ example: 'Me gustaría saber más sobre...', description: 'Contenido del mensaje' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  @MaxLength(2000, { message: 'El mensaje no puede exceder los 2000 caracteres' })
  message!: string;
}
