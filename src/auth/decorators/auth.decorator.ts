import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';
import { UserRoles } from '../../users/enums';

//Verifica que el rol del usuario este entre los roles validos que le pasemos desde el controlador
  
// Ejemplo: @Auth() o @Auth( ValidRoles.admin ) 

export function Auth(...roles: UserRoles[]) {

  return applyDecorators(
    RoleProtected(...roles),
    UseGuards( AuthGuard('jwt'), UserRoleGuard ),
  );

}