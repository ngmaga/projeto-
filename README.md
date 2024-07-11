https://wise-habitual-concavenator.glitch.me

Projeto - POO.

Integrantes:
• Brenda Marcele Oliveira: (Função: Desenvolvedor, responsável pela criação de rotas e suas determinadas funcionalidades) 
• Nicoly Grazielle:  (Função: Testador, responsável por testar a aplicação e relatar problemas/bugs, bem como corrigi-los.) 
• Rayca Rafaelle: (Função: Design de Interface, responsável pela criação da interface HTML, se aplicável.) 
• Yngrid Samilly: (Função: Design de Interface, responsável pela estilização utilizando CSS)

Perguntas:
1. Faça um breve comentário sobre a utilização no projeto de Orientação Objetos e suas características:
- Encapsulamento: Os elementos HTML são encapsulados como propriedades da classe, como this.paymentMethod, this.cardFields, etc. Isso facilita o acesso e manipulação desses elementos dentro da classe, mantendo o código organizado e evitando poluição no escopo global.
- Métodos de Instância: Métodos como toggleCardFields e validateForm são métodos de instância, o que significa que podem acessar outras propriedades e métodos da instância da classe.
- Event Listeners: Os event listeners são associados aos métodos da classe (toggleCardFields e validateForm) utilizando bind(this), garantindo que o contexto da classe seja mantido ao lidar com eventos DOM.
- Herança e Polimorfismo: Embora não explicitamente demonstrado neste exemplo, POO em JavaScript permite a criação de subclasses e a sobrescrita de métodos, facilitando a extensão e especialização do comportamento.
- LoginForm: Encapsula o comportamento relacionado ao formulário de login, incluindo a manipulação de respostas de solicitações assíncronas (como com fetch) e redirecionamento de páginas baseado na resposta do servidor.
- MenuNavegacao: Gerencia a navegação do menu, demonstrando como POO pode ser usado para controlar interações de interface do usuário de maneira modular e reutilizável.
- RegisterForm: lida com o registro de usuários, demonstrando como encapsular a lógica de validação e envio de dados do formulário em uma classe separada.
2. Faça um breve comentário sobre como foi realizada a conexão com o banco de dados utilizando o pacote mysql, o padrão DAO  e orientação a objetos.
- Não possuímos a conexão com o banco de dados, o nosso projeto no dia da devida apresentação, só possuía apenas front-end, e o back-end (sem banco de dados).
3. Há algum problema/erro identificado?
- Não, todas as partes do código estão funcionando perfeitamente sem nenhum erro.
4. Descrição sua experiência em realizar o projeto e as dificuldades encontradas.
- Nossa experiência em geral foi bastante conturbada, pois tivemos algumas dificuldades na realização do projeto.

Referências: 
-> https://getbootstrap.com/
->  Site: MDN Web Docs (https://developer.mozilla.org) 
-> Materiais de Programação Orientada a Objetos.



