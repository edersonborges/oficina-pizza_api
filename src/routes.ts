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
    
    return router;
};

export const router = initializeRoutes();
