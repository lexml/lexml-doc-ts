export type URN = string

export type URI = string

//

export type InlineElement = 
    SpanHref | Italic | Bold | HrefBase | Sup | Sub |
    Formula | NotaRef | string

export type Decorator<T extends string> = {
    type : T,
    block : Block
}    

export type SpanHref = Decorator<"SpanHref">  & { href : URI }

export type Italic = Decorator<"Italic">

export type Bold = Decorator<"Bold">

export type HrefBase = Decorator<"HrefBase"> & { hrefBase : URI }

export type Sup = Decorator<"Sup">

export type Sub = Decorator<"Sub">

export type NotaRef = { type: "NotaRef", notaId: string }

export type Formula = never /* {
    type : "Formula",
    formulaType : "tex" | "mathml" | "asciimath",
    formulaCode : string
} // Not supported yet */

export type Block = Div | Table | Image

export type Div = InlineElement[]

export type Table = never // Not supported yet

export type Image = never // Not supported yet

//

export type WithId = { id : string }

export type WithRotulo = { rotulo?: Block }

export type WithTitulo = { titulo?: Block }

export type WithNomeAgrupador = { nomeAgrupador?: Block }

export type WithBaseHref = { baseHref? : URI }

export type WithTexto = { texto?: Block[] }


export type EmAlteracao = Omissis

export type ForaAlteracao = never

export type WithSubElementos<T extends (EmAlteracao | ForaAlteracao),Q> =
    { subElementos?: (Q | T)[] }

export type TextoWithId<T> = WithId & WithTexto & { type : T }

//

export type Artigo<T extends (EmAlteracao | ForaAlteracao)> = 
    WithId & WithRotulo &
    WithTitulo &
    WithSubElementos<T, Caput<T> | Paragrafo<T> | T>
    & { 
        type : "Artigo",
        subElementos : (Caput<T> | Paragrafo<T> | Alteracao)[]
     }  

export type Caput<T extends (EmAlteracao | ForaAlteracao)> = 
    WithId & WithTexto & 
    WithSubElementos<T,
                (T extends ForaAlteracao ? Alteracao : never ) |
                T | Inciso<T> | Pena> &
    { type : "Caput" }

export type Paragrafo<T extends (EmAlteracao | ForaAlteracao)> = 
    WithId & WithTexto & WithRotulo &
    WithSubElementos<T,
                (T extends ForaAlteracao ? Alteracao : never ) |
                T | Inciso<T> | Pena> &
    { type : "Paragrafo" }

export type Inciso<T extends (EmAlteracao | ForaAlteracao)> =
    WithId & WithTexto & WithRotulo &
    WithSubElementos<T,
                (T extends ForaAlteracao ? Alteracao : never ) |
                T | Alinea<T> | Pena> &
    { type : "Inciso" }

export type Alinea<T extends (EmAlteracao | ForaAlteracao)> =
    WithId & WithTexto & WithRotulo &
    WithSubElementos<T,Item<T> | Pena> &
    { type : "Alinea" }

export type Item<T extends (EmAlteracao | ForaAlteracao)> =
    WithId & WithTexto & WithRotulo &
    WithSubElementos<T,Pena> &
    { type : "Item" }

export type Pena = WithId & WithTexto & { type : "Pena" }

//

export type Agrupador<Tipo,T extends (EmAlteracao | ForaAlteracao),E> = 
    WithNomeAgrupador & WithRotulo &
    WithSubElementos<T,E> &
    { type : Tipo }

export type Livro<T extends (EmAlteracao | ForaAlteracao)> =
     Agrupador<"Livro",T,Parte<T> | Capitulo<T> | Secao<T> | Artigo<T>>

export type Parte<T extends (EmAlteracao | ForaAlteracao)> =
     Agrupador<"Parte",T,Capitulo<T> | Secao<T> | Artigo<T>>
     
export type Capitulo<T extends (EmAlteracao | ForaAlteracao)> =
     Agrupador<"Capitulo",T,SubCapitulo<T> | Secao<T> | Artigo<T>>

export type SubCapitulo<T extends (EmAlteracao | ForaAlteracao)> =
     Agrupador<"SubCapitulo",T,Secao<T> | Artigo<T>>

export type Secao<T extends (EmAlteracao | ForaAlteracao)> =
     Agrupador<"Secao",T,SubSecao<T> | Artigo<T>>

export type SubSecao<T extends (EmAlteracao | ForaAlteracao)> =
     Agrupador<"SubSecao",T,Artigo<T>>

//

export type TopHierarchicalElement =
    Artigo<ForaAlteracao> | 
    Livro<ForaAlteracao> | Parte<ForaAlteracao> |
    Capitulo<ForaAlteracao> | 
    Secao<ForaAlteracao> 

export type Articulacao = TopHierarchicalElement[]

//

export type Epigrafe = TextoWithId<"Epigrafe">

export type Ementa = TextoWithId<"Ementa">

export type Preambulo = TextoWithId<"Preambulo">

export type PosAmbulo = TextoWithId<"PosAmbulo">

export type FormulaPromulgacao = TextoWithId<"FormulaPromulgacao">

export type ElementoInicial =
    Epigrafe | Ementa | Preambulo |
    PosAmbulo | FormulaPromulgacao


//

export type LocalDataFecho = TextoWithId<"LocalDataFecho">

export type Assinatura = TextoWithId<"Assinatura">

export type ElementoFinal = LocalDataFecho | Assinatura

//

export type Omissis = WithId & { type : "Omissis" }

export type Alteracao = 
    WithId & 
    WithBaseHref & 
    { type: "Alteracao",
      subElementos: TopAlteracao[] }

export type TextoLivre = TextoWithId<"Texto">

export type TopAlteracao = TopAlteracaoElement & AltData    

export type TopAlteracaoElement = 
    Artigo<EmAlteracao> | Caput<EmAlteracao> |
    Paragrafo<EmAlteracao> | Inciso<EmAlteracao> |
    Alinea<EmAlteracao> | Item<EmAlteracao> |
    Item<EmAlteracao> | Pena | TextoLivre | Omissis |
    Livro<EmAlteracao> | Parte<EmAlteracao> |
    Capitulo<EmAlteracao> | SubCapitulo<EmAlteracao> |
    Secao<EmAlteracao> | SubSecao<EmAlteracao> |
    ElementoInicial |
    ElementoFinal 

export type AltData = {
    abreAspas? : boolean,
    fechaAspas? : boolean,
    notaAlteracao? : string
}

//

export type HierarchicalStructure = {
    elementosIniciais : ElementoInicial[],
    articulacao : Articulacao,
    elementosFinais : ElementoFinal[]
}

//

export type Metadado = {
  identificacao : URN,
  notas? : Nota[]
}

export type Nota = TextoWithId<"Nota"> & 
    { autor?: string,
      data?: string }

//      

export type Justificacao = TextoWithId<"Justificacao">

export type Autor = string

//

export type DocumentContents = {
    norma : HierarchicalStructure,
    justificacao? : Justificacao,
    autorProjeto? : Autor[]
}

//

export type LexmlDoc = { 
    metadado : Metadado,
    contents : DocumentContents
}