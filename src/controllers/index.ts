import { CreateUserController } from './users/CreateUserController';
import { AuthUserController } from './users/AuthUserController';
import { LogoutController } from './users/LogoutController';
import { DeleteUserController } from './users/DeleteUserController';
import { UpdateUserController } from './users/UpdateUserController';
import { ChangePswController } from './users/ChangePswController';
import { ListarUserDadosController } from './users/ListarUserDadosController';
import { UploadMediaController } from './media/UploadMediaController';
import { GerarCodPswController } from './users/GerarCodPswController';
import { VerificarCodigoController } from './users/VerificarCodigoController';
import { CreateConviteController } from './users/CreateConviteController';
import { ListUsersController } from './users/ListUsersController';
import { CreateCategoriaController } from './categoria/CreateCategoriaController';
import { ListarCategoriaController } from './categoria/ListarCategoriaController';
import { EditarCategoriaController } from './categoria/EditarCategoriaController';
import { DeletarCategoriaController } from './categoria/DeletarCategoriaController';


import { CreateUserService } from '../services/users/CreateUserService';
import { AuthUserService } from '../services/users/AuthUserService';
import { LogoutService } from '../services/users/LogoutService';
import { DeleteUserService } from '../services/users/DeleteUserService';
import { UpdateUserService } from '../services/users/UpdateUserService';
import { ChangePswService } from '../services/users/ChangePswService';
import { ListarUserDadosService } from '../services/users/ListarUserDadosService';
import { UploadMediaService } from '../services/media/UploadMediaService';
import { GerarCodPswService } from '../services/users/GerarCodPswService';
import { VerificarCodigoService } from '../services/users/VerificarCodigoService';
import { CreateConviteService } from '../services/users/CreateConviteService'; 
import { ListUsersService } from '../services/users/ListUsersService';
import { CreateCategoriaService } from '../services/categoria/CreateCategoriaService';
import { ListarCategoriaService } from '../services/categoria/ListarCategoriaService';
import { EditarCategoriaService } from '../services/categoria/EditarCategoriaService';
import { DeletarCategoriaService } from '../services/categoria/DeletarCategoriaService';


const createUserService = new CreateUserService();
const authUserService = new AuthUserService();
const logoutService = new LogoutService();
const deleteUserService = new DeleteUserService();
const updateUserService = new UpdateUserService();
const changePswService = new ChangePswService();
const listarUserDadosService = new ListarUserDadosService();
const uploadMediaService = new UploadMediaService();
const gerarCodPswService = new GerarCodPswService();
const verificarCodigoService = new VerificarCodigoService();
const createConviteService = new CreateConviteService();
const listUsersService = new ListUsersService();
const createCategoriaService = new CreateCategoriaService();
const listarCategoriaService = new ListarCategoriaService();
const editarCategoriaService = new EditarCategoriaService();
const deletarCategoriaService = new DeletarCategoriaService();




export const createUserController = new CreateUserController(createUserService);
export const authUserController = new AuthUserController(authUserService);
export const logoutController = new LogoutController(logoutService);
export const deleteUserController = new DeleteUserController(deleteUserService);
export const updateUserController = new UpdateUserController(updateUserService);
export const changePswController = new ChangePswController(changePswService);
export const listarUserDadosController = new ListarUserDadosController(listarUserDadosService);
export const uploadMediaController = new UploadMediaController(uploadMediaService);
export const gerarCodPswController = new GerarCodPswController(gerarCodPswService);
export const verificarCodigoController = new VerificarCodigoController(verificarCodigoService);
export const createConviteController = new CreateConviteController(createConviteService);
export const listUsersController = new ListUsersController(listUsersService);
export const createCategoriaController = new CreateCategoriaController(createCategoriaService);
export const listarCategoriaController = new ListarCategoriaController(listarCategoriaService);
export const editarCategoriaController = new EditarCategoriaController(editarCategoriaService);
export const deletarCategoriaController = new DeletarCategoriaController(deletarCategoriaService);