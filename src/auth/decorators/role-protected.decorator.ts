import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../users/enums';

//Sirve para asignar metadata a un endpoint, es usado desde el decorador Auth para asignar los roles admitidos a usar el endpoint. Al final solo vamos a terminar usando el @Auth() y le pasamos los roles ya que a lo interno, este usa el decorador RoleProtected

export const META_ROLES = 'roles';


export const RoleProtected = (...args: UserRoles[] ) => {


    return SetMetadata( META_ROLES , args);
}
