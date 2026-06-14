import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Admin Auth')
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Login admin' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perfil del admin autenticado' })
  getProfile(@Request() req: { user: { id: string } }) {
    return this.authService.getProfile(req.user.id);
  }

  @Post('register')
  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar nuevo admin (requiere autenticación)' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
