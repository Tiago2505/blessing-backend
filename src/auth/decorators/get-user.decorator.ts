import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

//obtiene el usuario. Podemos pedirle campos en especifico o el usuario completo en caso de que no pasemos ningun campo. Primero hay que mandar a llamar el decorador Auth para que podamos acceder al usuario

export const GetUser = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;
        if ( !user )
            throw new InternalServerErrorException('User not found (request)');
        
        return ( !data ) 
            ? user 
            : user[data];
        
    }
);