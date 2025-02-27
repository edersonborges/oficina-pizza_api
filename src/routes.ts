import { Router } from 'express';
import { isAuthenticated } from './Middlewares/isAuthenticated';
import multer from 'multer';
import {
    createUserController,
    authUserController,
    logoutController,
    deleteUserController,
    updateUserController,
    changePswController,
    listarUserDadosController,
    uploadMediaController,
    gerarCodPswController,
    verificarCodigoController,
    createConviteController,
    listUsersController,
    createCategoriaController,
    listarItensController,
    deletarItensController,
    editarItensController,
    editarSaborController,
    editarMassaController,
    editarAdicionalController,
    criarAdicionalController,
    criarMassaController,
    criarSaborController,
    cadastrarPizzaController,
    cadastrarItemController,
    duplicarSubcategoriaController,
    criarSubCategoriaController,
    deletarSubcategoriaController,
    editarSubCategoriaController, 
    listarSubCategoriaController,
    criarPromoController,
    editarPromoController,
    deletarPromoController,
    editarPromoItensController,
    listarEquipeController,
    listarPromocaoController,
    criarAvaliacaoController,
    editarAvaliacaoController, 
    listarAvaliacoesController,
    deletarAvaliacaoController,
    criarCupomController,
    editarCupomController,
    deletarCupomController,
    listarCupomController,
    criarLojaController, 
    editarLojaController,
    editarHorariosController,
    criarPausaProgramadaController,
    editarPausaProgramadaController,
    deletarPausaProgramadaController,
    criarFeriadoController,
    editarFeriadoController, 
    deletarFeriadoController,
    criarEntregaController,
    editarEntregaController,
    deletarEntregaController,
    listarEntregaController,
    listarPagamentosController
} from './controllers';

const upload = multer();

const initializeRoutes = (): Router => {
    const router = Router();
    
    // Rotas de usuário
    router.post('/user/cadastrar', createUserController.handle.bind(createUserController));
    router.post('/login', authUserController.handle.bind(authUserController));
    router.delete('/user/delete', isAuthenticated, deleteUserController.handle.bind(deleteUserController));
    router.put('/user/update/:id', isAuthenticated, updateUserController.handle.bind(updateUserController));
    router.get('/logout', isAuthenticated, logoutController.handle.bind(logoutController));
    router.get('/user/dados', isAuthenticated, listarUserDadosController.handle.bind(listarUserDadosController));
    router.post('/upload-media', upload.single('media'), uploadMediaController.handle.bind(uploadMediaController));
    router.post('/password/codigo', gerarCodPswController.handle.bind(gerarCodPswController));
    router.post('/password/verificar/:userId', verificarCodigoController.handle.bind(verificarCodigoController));
    router.put('/password/change/:id', isAuthenticated, changePswController.handle.bind(changePswController));
    router.post('/convite/cadastrar', createConviteController.handle.bind(createConviteController));
    router.get('/user/list', isAuthenticated, listUsersController.handle.bind(listUsersController));
    router.post('/categoria/cadastrar', isAuthenticated, createCategoriaController.handle.bind(createCategoriaController));

    // Rotas de Itens e Pizza
    router.get('/itens', isAuthenticated, listarItensController.handle.bind(listarItensController));
    router.delete('/itens/:id', isAuthenticated, deletarItensController.handle.bind(deletarItensController));
    router.put('/itens/update/:id', isAuthenticated, editarItensController.handle.bind(editarItensController));
    router.put('/itens/sabor/:id', isAuthenticated, editarSaborController.handle.bind(editarSaborController));
    router.put('/itens/massa/:id', isAuthenticated, editarMassaController.handle.bind(editarMassaController));
    router.put('/itens/adicional/:id', isAuthenticated, editarAdicionalController.handle.bind(editarAdicionalController));
    router.post('/itens/adicional/cadastrar', isAuthenticated, criarAdicionalController.handle.bind(criarAdicionalController));
    router.post('/itens/massa/cadastrar', isAuthenticated, criarMassaController.handle.bind(criarMassaController));
    router.post('/itens/sabor/cadastrar', isAuthenticated, criarSaborController.handle.bind(criarSaborController));
    router.post('/pizza/cadastrar', isAuthenticated, cadastrarPizzaController.handle.bind(cadastrarPizzaController));
    router.post('/itens/cadastrar', isAuthenticated, cadastrarItemController.handle.bind(cadastrarItemController));
    router.post('/subcategoria/duplicar/:id', isAuthenticated, duplicarSubcategoriaController.handle.bind(duplicarSubcategoriaController));

    // Rotas de Subcategoria
    router.post('/subcategoria/cadastrar', isAuthenticated, criarSubCategoriaController.handle.bind(criarSubCategoriaController));
    router.put('/subcategoria/editar/:id', isAuthenticated, editarSubCategoriaController.handle.bind(editarSubCategoriaController));
    router.delete('/subcategoria/deletar/:id', isAuthenticated, deletarSubcategoriaController.handle.bind(deletarSubcategoriaController));
    router.get('/subcategoria/list', isAuthenticated, listarSubCategoriaController.handle.bind(listarSubCategoriaController));

    // Rotas de Promoção
    router.post('/promo/cadastrar', isAuthenticated, criarPromoController.handle.bind(criarPromoController));
    router.put('/promo/editar/:id', isAuthenticated, editarPromoController.handle.bind(editarPromoController));
    router.delete('/promo/deletar/:id', isAuthenticated, deletarPromoController.handle.bind(deletarPromoController));
    router.put('/promo/itens/editar/:id', isAuthenticated, editarPromoItensController.handle.bind(editarPromoItensController));
    router.get('/promo/list', isAuthenticated, listarPromocaoController.handle.bind(listarPromocaoController));
    
    // Rotas de Equipe
    router.get('/equipe/list', isAuthenticated, listarEquipeController.handle.bind(listarEquipeController));
    
    // Rotas de Avaliações
    router.post('/avaliacao/cadastrar', isAuthenticated, criarAvaliacaoController.handle.bind(criarAvaliacaoController));
    router.put('/avaliacao/editar/:id', isAuthenticated, editarAvaliacaoController.handle.bind(editarAvaliacaoController));
    router.delete('/avaliacao/deletar/:id', isAuthenticated, deletarAvaliacaoController.handle.bind(deletarAvaliacaoController));
    router.get('/avaliacao/list', isAuthenticated, listarAvaliacoesController.handle.bind(listarAvaliacoesController));
    
    // Rotas de Cupom
    router.post('/cupom/cadastrar', isAuthenticated, criarCupomController.handle.bind(criarCupomController));
    router.put('/cupom/editar/:id', isAuthenticated, editarCupomController.handle.bind(editarCupomController));
    router.delete('/cupom/deletar/:id', isAuthenticated, deletarCupomController.handle.bind(deletarCupomController));
    router.get('/cupom/list', isAuthenticated, listarCupomController.handle.bind(listarCupomController));
    
    // Rotas de Loja
    router.post('/loja/cadastrar', isAuthenticated, criarLojaController.handle.bind(criarLojaController));
    router.put('/loja/editar/:id', isAuthenticated, editarLojaController.handle.bind(editarLojaController));
    router.put('/loja/horarios/editar', isAuthenticated, editarHorariosController.handle.bind(editarHorariosController));

    // Rotas de Pausa Programada
    router.post('/pausa-programada/cadastrar', isAuthenticated, criarPausaProgramadaController.handle.bind(criarPausaProgramadaController));
    router.put('/pausa-programada/editar/:id', isAuthenticated, editarPausaProgramadaController.handle.bind(editarPausaProgramadaController));
    router.delete('/pausa-programada/deletar/:id', isAuthenticated, deletarPausaProgramadaController.handle.bind(deletarPausaProgramadaController));

    // Rotas de Feriado
    router.post('/feriado/cadastrar', isAuthenticated, criarFeriadoController.handle.bind(criarFeriadoController));
    router.put('/feriado/editar/:id', isAuthenticated, editarFeriadoController.handle.bind(editarFeriadoController));
    router.delete('/feriado/deletar/:id', isAuthenticated, deletarFeriadoController.handle.bind(deletarFeriadoController));

    // Rotas de Entrega
    router.post('/entrega/cadastrar', isAuthenticated, criarEntregaController.handle.bind(criarEntregaController));
    router.put('/entrega/editar/:id', isAuthenticated, editarEntregaController.handle.bind(editarEntregaController));
    router.delete('/entrega/deletar/:id', isAuthenticated, deletarEntregaController.handle.bind(deletarEntregaController));
    router.get('/entrega/list', isAuthenticated, listarEntregaController.handle.bind(listarEntregaController));

    router.get('/pagamentos/list', isAuthenticated, listarPagamentosController.handle.bind(listarPagamentosController));


    return router;
};

export const router = initializeRoutes();
