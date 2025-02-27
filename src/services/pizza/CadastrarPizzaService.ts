import prismaClient from '../../prisma';

interface SaborDTO {
  nome: string;
  descricao: string;
  valor: number;
  img_key?: string;  // opcional, se vier cadastramos em arquivos
}

interface MassaDTO {
  nome: string;
  descricao: string;
  valor: number;
  img_key?: string;  // opcional, se vier cadastramos em arquivos
}

interface AdicionalDTO {
  nome: string;
  valor: number;
  qntd_min: number;
  qntd_max: number;
}

interface TamanhoDTO {
  nome: string;
  pedacos: number;
  sabores: number; // campo int
  valor: number;
  ativo?: boolean;
}

interface CadastrarPizzaDTO {
  sabores?: SaborDTO[];
  massas?: MassaDTO[];
  adicionais?: AdicionalDTO[];
  tamanhos?: TamanhoDTO[];
}

class CadastrarPizzaService {
  async execute({ 
    sabores = [], 
    massas = [], 
    adicionais = [], 
    tamanhos = [] 
  }: CadastrarPizzaDTO) {

    // Usamos uma única transação para criar tudo ou nada
    const result = await prismaClient.$transaction(async (prisma) => {

      // 1) Cadastrar Sabores
      for (const sabor of sabores) {
        let arquivoId: string | undefined;

        // Se tiver img_key, cria registro em arquivos
        if (sabor.img_key) {
          const arquivo = await prisma.arquivos.create({
            data: {
              img_key: sabor.img_key,
              tipo: 'sabor',
            },
          });
          arquivoId = arquivo.id;
        }

        await prisma.sabores.create({
          data: {
            nome: sabor.nome,
            descricao: sabor.descricao,
            valor: sabor.valor,
            imagemId: arquivoId ?? null,
            ativo: true, // Ajuste se quiser false
          },
        });
      }

      // 2) Cadastrar Massas
      for (const massa of massas) {
        let arquivoId: string | undefined;

        if (massa.img_key) {
          const arquivo = await prisma.arquivos.create({
            data: {
              img_key: massa.img_key,
              tipo: 'massa',
            },
          });
          arquivoId = arquivo.id;
        }

        await prisma.massas.create({
          data: {
            nome: massa.nome,
            descricao: massa.descricao,
            valor: massa.valor,
            imagemId: arquivoId ?? null,
            ativo: true,
          },
        });
      }

      // 3) Cadastrar Adicionais
      for (const adc of adicionais) {
        await prisma.adicionais.create({
          data: {
            nome: adc.nome,
            valor: adc.valor,
            qntd_min: adc.qntd_min,
            qntd_max: adc.qntd_max,
            ativo: true,
          },
        });
      }

      // 4) Cadastrar Tamanhos
      for (const t of tamanhos) {
        await prisma.tamanhos.create({
          data: {
            nome: t.nome,
            pedacos: t.pedacos,
            sabores: t.sabores, // esse é o campo int "sabores"
            valor: t.valor,
            ativo: t.ativo ?? true,
          },
        });
      }

      // Se tudo der certo, retornamos algo
      return {
        message: 'Cadastro realizado com sucesso!',
      };
    });

    return result;
  }
}

export { CadastrarPizzaService };
