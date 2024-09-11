import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

// JSON은 undefined를 인식하지 못하기 때문에 undefined가 포함될 경우 오류가 발생할 수 있음, 따라서 undefined이 있는 경우 null로 변환
@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Controller 실행 전
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data))); // Controller 실행 후
  }
}
