# Portfólio — Fernando Ludvig

Site de case studies. Next.js 16 (App Router) + Tailwind v4, tema escuro único,
sem CMS: o conteúdo é TypeScript tipado.

## Rodar

```bash
npm run dev
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Nome, pitch, elegibilidade, stack, links | `content/profile.ts` |
| Os case studies | `content/case-studies.ts` |
| Cores e tipografia | `app/globals.css` |
| Home | `app/page.tsx` |
| Página de case study | `app/work/[slug]/page.tsx` |

Na prática, 90% das atualizações são em `content/`. O layout não precisa ser tocado
para publicar um projeto novo.

## A regra do conteúdo

Um case study é **problema → restrições → decisões (com o porquê) → resultado medido**.
Essa ordem não é estética: uma decisão técnica só impressiona quem entende contra
qual restrição ela foi tomada, e um resultado sem número é uma opinião.

Duas regras que o código impõe:

- **Nada de número inventado.** Todo `metric` tem um campo `source` — de onde o
  número veio. Se você não sabe responder isso, não publique.
- **Case incompleto fica com `draft: true`.** Drafts aparecem em `npm run dev` e
  são **removidos do build de produção**, então nada meio-pronto vaza. Publicar é
  preencher e virar a flag.

## Publicar na Vercel

1. Criar um repositório no GitHub e dar push (este diretório já é um repo git).
2. Em [vercel.com/new](https://vercel.com/new), importar o repositório.
3. Não há variável de ambiente nem configuração — o preset Next.js resolve tudo.

Cada push na branch principal redeploya. Domínio próprio pode ser plugado depois em
Settings → Domains, sem refazer nada.

## Pendências

- Confirmar as URLs de GitHub e LinkedIn em `content/profile.ts` (estão marcadas
  com `TODO`).
- Completar o case study `darwin-crm-integrations` — hoje está `draft: true`, com
  os campos marcados. Checar antes o que pode ser divulgado publicamente sobre
  cliente e números.
