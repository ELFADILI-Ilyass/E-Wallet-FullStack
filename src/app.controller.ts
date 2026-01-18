import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';


@Controller('Ewallet')
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly userService: UserService
  ) {}

   @Post('signup')
  signUp(@Body() user: any) {
    return this.userService.signup(user);
  }

  // ✅ LOGIN ENDPOINT (NEW)
  @Post('login')
  login(@Body() user: any) {
    return this.userService.login(user.email, user.password);
  }


  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

}

  // @Post('login')
  // login(@Body() user:any){
  
  //   return this.appService.login(user);
    
  // }

  // @Post('signup')
  // signup(@Body() user:any){
  //   return this.appService.signup(user);
  // }


  

