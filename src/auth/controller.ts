import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { LoginDTO } from './dto/login.dto';
import { Public } from 'src/common/decorator/public';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  register(@Body(new ValidationPipe()) body: LoginDTO) {
    return this.authService.register(body).then((result) => {
      const responseDTO = new ResponseDTO();
      responseDTO.data = result;
      return responseDTO;
    });
  }

  @Public()
  @Post('/login')
  login(@Body(new ValidationPipe()) body: LoginDTO) {
    return this.authService.login(body).then((result) => {
      const responseDTO = new ResponseDTO();
      responseDTO.data = result;
      return responseDTO;
    });
  }
}
