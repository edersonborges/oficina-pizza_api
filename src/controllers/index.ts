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

// Controllers de subcategoria:
import { CriarSubCategoriaController } from './subcategoria/CriarSubCategoriaController';
import { DeletarSubCategoriaController } from './subcategoria/DeletarSubCategoriaController';
import { EditarSubCategoriaController } from './subcategoria/EditarSubCategoriaController';
import { ListarSubCategoriaController } from './subcategoria/ListarSubCategoriaController';

// Controllers de promoção:
import { CriarPromoController } from './promocao/CriarPromoController';
import { EditarPromoController } from './promocao/EditarPromoController';
import { DeletarPromoController } from './promocao/DeletarPromoController';
import { EditarPromoItensController } from './promocao/EditarPromoItensController';
import { ListarPromocaoController } from './promocao/ListarPromocaoController';

// Controllers de avaliações:
import { CriarAvaliacaoController } from './avaliacao/CriarAvaliacaoController';
import { EditarAvaliacaoController } from './avaliacao/EditarAvaliacaoController';
import { ListarAvaliacoesController } from './avaliacao/ListarAvaliacoesController';
import { DeletarAvaliacaoController } from './avaliacao/DeletarAvaliacaoController';

// Controllers de cupom_desconto:
import { CriarCupomController } from './cupom_desconto/CriarCupomController';
import { EditarCupomController } from './cupom_desconto/EditarCupomController';
import { DeletarCupomController } from './cupom_desconto/DeletarCupomController';
import { ListarCupomController } from './cupom_desconto/ListarCupomController';

// Controller de equipe:
import { ListarEquipeController } from './users/ListarEquipeController';

// Importações dos controllers de loja:
import { CriarLojaController } from './loja/CriarLojaController';
import { EditarLojaController } from './loja/EditarLojaController';
import { EditarHorariosController } from './loja/EditarHorariosController';

import { CriarPausaProgramadaController } from './loja/CriarPausaProgramadaController';
import { EditarPausaProgramadaController } from './loja/EditarPausaProgramadaController';
import { DeletarPausaProgramadaController } from './loja/DeletarPausaProgramadaController';


// Importações dos controllers de feriado:
import { CriarFeriadoController } from './loja/CriarFeriadoController';
import { EditarFeriadoController } from './loja/EditarFeriadoController';
import { DeletarFeriadoController } from './loja/DeletarFeriadoController';

// Importações dos controllers de entrega:
import { CriarEntregaController } from './loja/CriarEntregaController';
import { EditarEntregaController } from './loja/EditarEntregaController';
import { DeletarEntregaController } from './loja/DeletarEntregaController';
import { ListarEntregaController } from './loja/ListarEntregaController';

import { ListarPagamentosController } from './loja/ListarPagamentosController';

import { CreatePixPaymentController } from './pagamento/CreatePixPaymentController';
import { CriarPagamentoCartaoController } from './pagamento/CriarPagamentoCartaoController';
import { WebhookMpController } from './pagamento/WebhookMpController';

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

// Services de promoção:
import { CriarPromoService } from '../services/promocao/CriarPromoService';
import { EditarPromoService } from '../services/promocao/EditarPromoService';
import { DeletarPromoService } from '../services/promocao/DeletarPromoService';
import { EditarPromoItensService } from '../services/promocao/EditarPromoItensService';
import { ListarPromocaoService } from '../services/promocao/ListarPromocaoService';

// Services de avaliações:
import { CriarAvaliacaoService } from '../services/avaliacao/CriarAvaliacaoService';
import { EditarAvaliacaoService } from '../services/avaliacao/EditarAvaliacaoService';
import { ListarAvaliacoesService } from '../services/avaliacao/ListarAvaliacoesService';
import { DeletarAvaliacaoService } from '../services/avaliacao/DeletarAvaliacaoService';

// Services de equipe:
import { ListarEquipeService } from '../services/users/ListarEquipeService';

// Services de cupom_desconto:
import { CriarCupomService } from '../services/cupom_desconto/CriarCupomService';
import { EditarCupomService } from '../services/cupom_desconto/EditarCupomService';
import { DeletarCupomService } from '../services/cupom_desconto/DeletarCupomService';
import { ListarCupomService } from '../services/cupom_desconto/ListarCupomService';

// Importações dos serviços de loja:
import { CriarLojaService } from '../services/loja/CriarLojaService';
import { EditarLojaService } from '../services/loja/EditarLojaService';
import { EditarHorariosService } from '../services/loja/EditarHorariosService';

import { CriarPausaProgramadaService } from '../services/loja/CriarPausaProgramadaService';
import { EditarPausaProgramadaService } from '../services/loja/EditarPausaProgramadaService';
import { DeletarPausaProgramadaService } from '../services/loja/DeletarPausaProgramadaService';


// Importações dos serviços de feriado:
import { CriarFeriadoService } from '../services/loja/CriarFeriadoService';
import { EditarFeriadoService } from '../services/loja/EditarFeriadoService';
import { DeletarFeriadoService } from '../services/loja/DeletarFeriadoService';

// Importações dos serviços de entrega:
import { CriarEntregaService } from '../services/loja/CriarEntregaService';
import { EditarEntregaService } from '../services/loja/EditarEntregaService';
import { DeletarEntregaService } from '../services/loja/DeletarEntregaService';
import { ListarEntregaService } from '../services/loja/ListarEntregaService';

import { ListarPagamentosService } from '../services/loja/ListarPagamentosService';

import { CreatePixPaymentService } from '../services/pagamento/CreatePixPaymentService';
import { CriarPagamentoCartaoService } from '../services/pagamento/CriarPagamentoCartaoService';
import { WebhookMpService } from '../services/pagamento/WebhookMpService';

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

// Instâncias dos serviços de promoção:
const criarPromoService = new CriarPromoService();
const editarPromoService = new EditarPromoService();
const deletarPromoService = new DeletarPromoService();
const editarPromoItensService = new EditarPromoItensService();
const listarPromocaoService = new ListarPromocaoService();

// Instâncias dos serviços de avaliações:
const criarAvaliacaoService = new CriarAvaliacaoService();
const editarAvaliacaoService = new EditarAvaliacaoService();
const listarAvaliacoesService = new ListarAvaliacoesService();
const deletarAvaliacaoService = new DeletarAvaliacaoService();

// Instâncias dos serviços de equipe:
const listarEquipeService = new ListarEquipeService();

const criarCupomService = new CriarCupomService();
const editarCupomService = new EditarCupomService();
const deletarCupomService = new DeletarCupomService();
const listarCupomService = new ListarCupomService();

const criarLojaService = new CriarLojaService();
const editarLojaService = new EditarLojaService();
const editarHorariosService = new EditarHorariosService();

const criarPausaProgramadaService = new CriarPausaProgramadaService();
const editarPausaProgramadaService = new EditarPausaProgramadaService();
const deletarPausaProgramadaService = new DeletarPausaProgramadaService();

// Instâncias dos serviços de feriado:
const criarFeriadoService = new CriarFeriadoService();
const editarFeriadoService = new EditarFeriadoService();
const deletarFeriadoService = new DeletarFeriadoService();

// Instâncias dos serviços de entrega:
const criarEntregaService = new CriarEntregaService();
const editarEntregaService = new EditarEntregaService();
const deletarEntregaService = new DeletarEntregaService();
const listarEntregaService = new ListarEntregaService();

const listarPagamentosService = new ListarPagamentosService();

const createPixPaymentService = new CreatePixPaymentService();
const criarPagamentoCartaoService = new CriarPagamentoCartaoService();
const webhookMpService = new WebhookMpService();

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

// Exportações dos controllers de promoção:
export const criarPromoController = new CriarPromoController(criarPromoService);
export const editarPromoController = new EditarPromoController(editarPromoService);
export const deletarPromoController = new DeletarPromoController(deletarPromoService);
export const editarPromoItensController = new EditarPromoItensController(editarPromoItensService);
export const listarPromocaoController = new ListarPromocaoController(listarPromocaoService);

// Exportações dos controllers de avaliações:
export const criarAvaliacaoController = new CriarAvaliacaoController(criarAvaliacaoService);
export const editarAvaliacaoController = new EditarAvaliacaoController(editarAvaliacaoService);
export const listarAvaliacoesController = new ListarAvaliacoesController(listarAvaliacoesService);
export const deletarAvaliacaoController = new DeletarAvaliacaoController(deletarAvaliacaoService);

// Exportação do controller de equipe:
export const listarEquipeController = new ListarEquipeController(listarEquipeService);

export const criarCupomController = new CriarCupomController(criarCupomService);
export const editarCupomController = new EditarCupomController(editarCupomService);
export const deletarCupomController = new DeletarCupomController(deletarCupomService);
export const listarCupomController = new ListarCupomController(listarCupomService);

export const criarLojaController = new CriarLojaController(criarLojaService);
export const editarLojaController = new EditarLojaController(editarLojaService);
export const editarHorariosController = new EditarHorariosController(editarHorariosService);
export const criarPausaProgramadaController = new CriarPausaProgramadaController(criarPausaProgramadaService);
export const editarPausaProgramadaController = new EditarPausaProgramadaController(editarPausaProgramadaService);
export const deletarPausaProgramadaController = new DeletarPausaProgramadaController(deletarPausaProgramadaService);
export const criarFeriadoController = new CriarFeriadoController(criarFeriadoService);
export const editarFeriadoController = new EditarFeriadoController(editarFeriadoService);
export const deletarFeriadoController = new DeletarFeriadoController(deletarFeriadoService);
export const criarEntregaController = new CriarEntregaController(criarEntregaService);
export const editarEntregaController = new EditarEntregaController(editarEntregaService);
export const deletarEntregaController = new DeletarEntregaController(deletarEntregaService);
export const listarEntregaController = new ListarEntregaController(listarEntregaService);
export const listarPagamentosController = new ListarPagamentosController(listarPagamentosService);
export const createPixPaymentController = new CreatePixPaymentController(createPixPaymentService);
export const criarPagamentoCartaoController = new CriarPagamentoCartaoController(criarPagamentoCartaoService);
export const webhookMpController = new WebhookMpController(webhookMpService);