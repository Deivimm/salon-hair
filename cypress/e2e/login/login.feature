#language: pt
Funcionalidade: Tela de Login
  Cenário: Login com usuário inválido
    Dado que eu estou na sessão de login
    Quando eu tento fazer login com credenciais inválidas
    Então o sistema deverá retornar uma mensagem de Usuário ou senha inválidos

  Cenário: Login com usuário válido
    Dado que eu estou na sessão de login
    Quando eu tento fazer login com credenciais válidas
    Então o sistema deverá ir para a página Home

  Cenário: Acessar tela de cadastro de usuário
    Dado que eu estou na sessão de login
    Quando eu clico no botão Cadastrar
    Então o sistema deverá abrir a tela de cadastro de usuário