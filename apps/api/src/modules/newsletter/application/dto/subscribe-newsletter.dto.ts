import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeNewsletterDto {
  @ApiProperty({ example: 'usuario@ejemplo.com', description: 'Correo electrónico del suscriptor' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email!: string;
}
