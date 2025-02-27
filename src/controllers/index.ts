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

// Controllers de itens/pizzas:
import { ListarItensController } from './cardapio/ListarItensController';
import { DeletarItensController } from './cardapio/DeletarItensController';
import { EditarItensController } from './cardapio/EditarItensController';
import { EditarSaborController } from './cardapio/EditarSaborController';
import { EditarMassaController } from './cardapio/EditarMassaController';
import { EditarAdicionalController } from './cardapio/EditarAdicionalController';
import { CriarAdicionalController } from './cardapio/CriarAdicionalController';
import { CriarMassaController } from './cardapio/CriarMassaController';
import { CriarSaborController } from './cardapio/CriarSaborController';
import { CadastrarPizzaController } from './cardapio/CadastrarPizzaController';
import { CadastrarItemController } from './cardapio/CadastrarItemController';
import { DuplicarSubcategoriaController } from './cardapio/DuplicarSubcategoriaController';

import { CriarSubCategoriaController } from './subcategoria/CriarSubCategoriaController';
import { DeletarSubCategoriaController } from './subcategoria/DeletarSubCategoriaController';
import { EditarSubCategoriaController } from './subcategoria/EditarSubCategoriaController';
import { ListarSubCategoriaController } from './subcategoria/ListarSubCategoriaController';

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

// Services de itens/pizzas:
import { ListarItensService } from '../services/cardapio/ListarItensService';
import { DeletarItensService } from '../services/cardapio/DeletarItensService';
import { EditarItensService } from '../services/cardapio/EditarItensService';
import { EditarSaborService } from '../services/cardapio/EditarSaborService';
import { EditarMassaService } from '../services/cardapio/EditarMassaService';
import { EditarAdicionalService } from '../services/cardapio/EditarAdicionalService';
import { CriarAdicionalService } from '../services/cardapio/CriarAdicionalService';
import { CriarMassaService } from '../services/cardapio/CriarMassaService';
import { CriarSaborService } from '../services/cardapio/CriarSaborService';
import { CadastrarPizzaService } from '../services/cardapio/CadastrarPizzaService';
import { CadastrarItemService } from '../services/cardapio/CadastrarItemService';
import { DuplicarSubcategoriaService } from '../services/cardapio/DuplicarSubcategoriaService';

import { CriarSubCategoriaService } from '../services/subcategoria/CriarSubCategoriaService';
import { DeletarSubCategoriaService } from '../services/subcategoria/DeletarSubCategoriaService';
import { EditarSubCategoriaService } from '../services/subcategoria/EditarSubCategoriaService';
import { ListarSubCategoriaService } from '../services/subcategoria/ListarSubCategoriaService';

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

// Instâncias dos serviços de itens/pizzas:
const listarItensService = new ListarItensService();
const deletarItensService = new DeletarItensService();
const editarItensService = new EditarItensService();
const editarSaborService = new EditarSaborService();
const editarMassaService = new EditarMassaService();
const editarAdicionalService = new EditarAdicionalService();
const criarAdicionalService = new CriarAdicionalService();
const criarMassaService = new CriarMassaService();
const criarSaborService = new CriarSaborService();
const cadastrarPizzaService = new CadastrarPizzaService();
const cadastrarItemService = new CadastrarItemService();
const duplicarSubcategoriaService = new DuplicarSubcategoriaService();

const criarSubCategoriaService = new CriarSubCategoriaService(); 
const deletarSubCategoriaService = new DeletarSubCategoriaService();
const editarSubCategoriaService = new EditarSubCategoriaService();
const listarSubCategoriaService = new ListarSubCategoriaService();

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

// Exportações dos controllers de itens/pizzas:
export const listarItensController = new ListarItensController(listarItensService);
export const deletarItensController = new DeletarItensController(deletarItensService);
export const editarItensController = new EditarItensController(editarItensService);
export const editarSaborController = new EditarSaborController(editarSaborService);
export const editarMassaController = new EditarMassaController(editarMassaService);
export const editarAdicionalController = new EditarAdicionalController(editarAdicionalService);
export const criarAdicionalController = new CriarAdicionalController(criarAdicionalService);
export const criarMassaController = new CriarMassaController(criarMassaService);
export const criarSaborController = new CriarSaborController(criarSaborService);
export const cadastrarPizzaController = new CadastrarPizzaController(cadastrarPizzaService);
export const cadastrarItemController = new CadastrarItemController(cadastrarItemService);
export const duplicarSubcategoriaController = new DuplicarSubcategoriaController(duplicarSubcategoriaService);
export const criarSubCategoriaController = new CriarSubCategoriaController(criarSubCategoriaService);
export const deletarSubcategoriaController = new DeletarSubCategoriaController(deletarSubCategoriaService);
export const editarSubCategoriaController = new EditarSubCategoriaController(editarSubCategoriaService);
export const listarSubCategoriaController = new ListarSubCategoriaController(listarSubCategoriaService);