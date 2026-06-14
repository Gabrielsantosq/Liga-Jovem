# shadcn/ui monorepo template

This is a React Router monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your monorepo:

```bash
bunx --bun shadcn@latest add button -c packages/ui
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```


## Estrutura do Projeto

```Area Do Aluno Fluxo Principal
  Home do aluno  => /aluno/home
  Entrar em turma  => /aluno/entrar-turma
  Turma => /aluno/turma/:id
  Atividade da Turma => /aluno/turma/:id/atividades
  Detalhes da Atividade =>  /aluno/turma/:id/atividades/:atividadesId
  
#########################
Rotas:
{

/aluno/home:

  Exibe as turmas do aluno;
  caso não tenha turma, mostra vazio;
  Botão para entrar na turma;
  
}
{
  /aluno/entrar-turma:
    Entrada via codigo da turma que seria algo gerado pelo professor;
    Redireciona para a turma;
}

{
  /aluno/turma/:id:
    visão geral da turma;
    Resumo das atividades;
  
}
{
  /aluno/turma/:id/atividades:
    Lista todas as atvidades da turmas;
    mostra o status e nota

    cada atividade contem {
    id: "string"
    titulo: string
    materia: string
    dataEntrega: string
    status: 
    nota: number
    }
  {
  /aluno/turma/:id/atividades/:atividadesId
    Mostra Detalhes da atividade
    descriçao 
    status
    Nota
    Dia / data Da entrega
  }
}

####################################
Area Do Professor Fluxo Principal
Turmas do professor => /professor/turmas
Detalhes da turma => /professor/turmas/:id
Atividades da turma => /professor/turmas/:id/atividades
Nova atividade => /professor/turmas/:id/atividades/nova
Detalhes da atividade => /professor/turmas/:id/atividades/:atividadeId
######################### 
Rotas: 
{ /professor/turmas: 
  Exibe todas as turmas do professor;
  Permite criar novas turmas; 
  Exibe quantidade de alunos; 
  Exibe código da turma; 
  Permite acessar uma turma específica; 
  cada turma contém 
    {
    id:string 
    ano: string 
    letra: string 
    codigo: string 
    alunos: [] 
    }


}
  { /professor/turmas/:id
    Visão geral da turma;
    Exibe informações da turma;
    Exibe lista de atividades da turma;
    Botão para criar novas atividades;
  } 

  { /professor/turmas/:id/atividades 
    Lista todas as atividades da turma;
    cada atividade contém 
    { id: string
    titulo: string
    descricao: string
    materia: string
    dataEntrega: string
    }
    
    } 
    { /professor/turmas/:id/atividades/nova
    Permite criar uma nova atividade;
    Campos: - Título - Descrição - Matéria - Data de entrega }
    
    { /professor/turmas/:id/atividades/:atividadeId 
    Mostra detalhes completos da atividade;
    Informações: - Título - Descrição - Matéria - Data de entrega 
    }



``
