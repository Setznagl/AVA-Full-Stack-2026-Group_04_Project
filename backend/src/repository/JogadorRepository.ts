import meu_Prisma_Client_Configurado from "../database/PrismaClient.ts";
import {PrismaClient} from "@prisma/client/extension";
import type {jogador} from "../generated/prisma/client.ts";

export class JogadorRepository {
    /*
        Precisamos usar o nosso PrismaClient configurado com nosso Driver PostgreSQL e URL do nosso banco. O nosso
     Repository tem acesso ao nosso PrismaClient configurado através do import "meu_Prisma_Client_Configurado",
     e ele é quem vai realizar as operações de persistência no banco de dados, porém como esta camada diz respeito
     somente a como as operações que interagem com o banco funcionam (sem envolver validações e nem manejo das
     requisições HTTP) nós precisaremos passar essa configuração do PrismaClient configurado pras outras camadas.

     A forma mais fácil seria realizando o import de "meu_Prisma_Client_Configurado" nas camadas de Service e
     Controller, porém no que diz respeito a qualidade de código isso não é o ideal, pois o Repository é quem vai
     realizar as operações de CRUD, então só ele deve conter a lógica de como a conexão com o banco é feita.


     Podemos passar essa informação através da função constructora da classe. O construtor é uma função automática
     que roda sempre que criamos um novo indivíduo/instância a partir do molde/classe, por exemplo:

     class jogador {
        private nome: string,
        constructor
            (
              this.nome = nomeInicial
            )

      Também podemos atribuir diretamente um valor a um atributo, dispensando chamar a função construtora

      class jogador {
        private nome: string = "Fulano" //Atribuindo o valor diretamente
        constructor (){}
      }

        Ou seja, a classe tem o atributo nome, mas sempre que eu criar um indivíduo eu preciso passar o valor do nome.
      Podemos usar esse conceito para passar as informações de configurações do banco pra camada de Service
      (que é responsável por validar as regras de negócio antes de realizar operações no banco) sem importar
      o meu_Prisma_Client_Configurado diretamente. Vamos definir no construtor da classe Service que ela tem um
      jogadorRepository que é instância/individuo dessa classe que é o molde (JogadorRepository com J maiúsculo pra classe e
      com j minúsculo para os individuos, assim ajuda a não confundir) como dado obrigatório, ou seja
      da mesma forma que o jogador não pode ser criado com um nome vazio, o Service não pode ser criado sem um
      jogadorRepository, e o jogadorRepository não pode ser criado sem um individuo do tipo Prisma Client.
        Pra esse atributo com as configurações do nosso PrismaClient estamos dando o apelido de "prisma" e após
      fazer isso diremos que o valor inicial dessa propriedade/atributo vai ser
      igual ao valor nosso import "meu_Prisma_Client_Configurado" e como nosso Prisma Configurado nada mais é que um
      new PrismaClient() comum, mas editado. eles são compatívies para o tipo PrismaClient.

     }
     */
    private prisma: PrismaClient = meu_Prisma_Client_Configurado;
    constructor(){

    }

    async insertJogador(provided_nome: string, provided_email: string, provided_telefone: string, provided_senha: string)
        :Promise<jogador | Error> {

        try{
            return await this.prisma.jogador.create({
                data: {
                    nome: provided_nome,
                    email: provided_email,
                    telefone: provided_telefone,
                    senha: provided_senha
                }
            })

        }catch(error: any){
            console.log(error);
            return new Error(error);
        }

    }

    async findByEmail(provided_email: string):Promise<jogador | null | Error > {

        try{
            let data: jogador = await this.prisma.jogador.findUnique({
                where: {email: provided_email},
            })

            if(data !== null){
                return data;
            }
            else return null;

        }catch(error: any){
            throw new Error(error);
        }

    }

    async findByID(provided_id: string):Promise<jogador | null | Error > {

        try{
            let data: jogador = await this.prisma.jogador.findUnique({
                where: {id: provided_id},
            })

            if(data !== null){
                return data;
            }
            else return null;

        }catch(error: any){
            throw new Error(error);
        }

    }

    async findAll(): Promise<jogador[] | null | Error > {

        try{
            let data: jogador[] = await this.prisma.jogador.findMany()

            if(data !== null){
                return data;
            }
            else return null;

        }catch(error: any){
            throw new Error(error);
        }

    }


}

export const unicJogadorRepositoryInstance = new JogadorRepository();

/*
Podemos evitar instanciar multiplas vezes a classe JogadorRepository criando uma instância única dela
e exportando, assim todas as camadas que precisarem dela vão usar a mesma instância

Como: " private prisma: typeof PrismaClient = meu_Prisma_Client_Configurado "
atribui o valor exportado por PrismaClient.ts ao nosso atributo privado "prisma".
isso faz com que ele sempre seja instânciado com os valores já pré carregados.

Usando de exemplo a classe jogador:

class jogador{
    constructor(
        private nome: string; //o atributo tem o apelido "nome" e recebe como valor uma string
    ){}
}

Se atribuirmos um valor inicial ao atributo nome ele sempre inicializará com ele a menos que façamos uma reatribuição
posterior dentro do bloco {} do construtor.

class jogador{
    constructor(
        private nome: string = "Fulano"; //todos os jogadores passam a ter o nome inicial fulano
    ){}
}

Também podemos adicionar o valor inicial ou sobrescrever usando o bloco {}

class jogador{
    constructor(
        private nome: string = "Fulano"; //todos os jogadores passam a ter o nome inicial fulano
    ){
        this.nome = "Ciclano"; //sobrescrevendo o valor inicial do atributo nome
    }
}
*/