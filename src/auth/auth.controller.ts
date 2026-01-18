import { Body, Controller, Get, Post  } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('authentification')
export class AuthController {
    constructor(private readonly authService: AuthService){}


  @Post('login')
  login(@Body() user:any){
    return this.authService.login(user);
  }

  @Post('signup')
  signup(@Body() user:any){
    return this.authService.signup(user);
  }
}