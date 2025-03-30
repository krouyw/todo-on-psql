import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('timeout')
  async timeout(@Res() res: Response) {
    res.setTimeout(5000, () => {
      res.status(504).send()
    })

    await new Promise((resolve) => setTimeout(resolve, 7000))
    return { message: 'Timeout is ended' }
  }
}
