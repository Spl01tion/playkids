# PlayKids — Website

Website institucional da **PlayKids**, um espaço dedicado a crianças em Caldas da Rainha, Portugal. Desenvolvido em HTML/CSS/JS estático, servido localmente via XAMPP.

---

## Visão Geral

A PlayKids oferece um conjunto de serviços para crianças e famílias:

- **Festas de Aniversário** — Pacotes temáticos com lanche, animação e extras opcionais
- **Transporte Escolar** — Serviço de transporte seguro e pontual
- **Após Escola** — Apoio ao estudo, atividades criativas e lanche incluído (4–12 anos)
- **Tempo de Férias** — Programas temáticos semanais durante as férias escolares
- **Insufláveis & Trampolins** — Aluguer de equipamentos para festas e eventos

---

## Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| Bootstrap 5 | Layout, grid, componentes, navbar, accordion |
| Bootstrap Icons | Iconografia em todo o site |
| AOS (Animate On Scroll) | Animações de entrada nas secções |
| GLightbox | Galeria de imagens com lightbox |
| Swiper | Slider/carrossel (testemunhos) |
| Lordicon | Ícones SVG animados |
| Google Fonts | Fredoka (display) + Nunito (corpo) |

Sem frameworks JS (React, Vue, etc.). Sem backend. Sem base de dados.

---

## Estrutura de Ficheiros

```
playkids/
├── index.html                  # Página principal
├── festas.html                 # Festas de Aniversário
├── transporte.html             # Transporte Escolar
├── apos-escola.html            # Após Escola
├── ferias.html                 # Tempo de Férias
├── insuflaveis.html            # Insufláveis & Trampolins
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css           # Folha de estilos principal
│   ├── js/
│   │   └── main.js             # Scripts principais
│   ├── img/
│   │   ├── Logo_noslogan.png   # Logo horizontal (navbar)
│   │   ├── Logo_slogan.png     # Logo com slogan (footer)
│   │   ├── logo_vertical.png   # Logo vertical (secção "Nossa História")
│   │   ├── favi2.png           # Favicon
│   │   └── servicos/           # Imagens das páginas de serviço
│   └── vendor/
│       ├── bootstrap/          # Bootstrap CSS + JS
│       ├── bootstrap-icons/    # Bootstrap Icons
│       ├── aos/                # AOS library
│       ├── glightbox/          # GLightbox
│       └── swiper/             # Swiper
```

---

## Arquitetura CSS (`assets/css/style.css`)

### Paleta de Cores (Custom Properties)

```css
--green:  #119948;
--yellow: #FFC431;
--blue:   #6999FA;
--pink:   #FE3ABB;
```

### Animações

- **`btnColorCycle`** — Cicla o background dos botões pelas 4 cores da marca (green → yellow → blue → pink), aplicada a `.pk-btn-primary` e `.pk-scroll-top`
- **Navbar logo com scroll** — `.pk-navbar-logo` começa com `height: 95px` e reduz para `70px` quando a navbar tem a classe `.scrolled`

### Componentes Principais

| Classe | Descrição |
|---|---|
| `.pk-navbar` | Navbar glassmorphism, transparente → frosted glass ao scroll |
| `.pk-navbar-logo` | Logo com transição de tamanho ao scroll |
| `.pk-btn-primary` | Botão primário com animação de cor ciclica |
| `.pk-btn-whatsapp` | Botão verde WhatsApp |
| `.pk-btn-saibamais` | Botão "Saber Mais" com animação de borda colorida + seta |
| `.pk-section` | Secção com padding padrão |
| `.pk-section-title` | Título de secção |
| `.pk-section-tag` | Tag/label colorida acima do título |
| `.pk-page-hero` | Hero das subpáginas com gradiente |
| `.pk-page-hero--green/pink/blue/yellow` | Variantes de cor do hero |
| `.pk-space-card` | Cartão de conteúdo com sombra |
| `.pk-features-grid` | Grid de ícone + texto para features |
| `.pk-accordion` / `.pk-acc-item` | Accordion estilizado com variantes de cor |
| `.pk-footer` | Footer escuro |
| `.pk-scroll-top` | Botão "voltar ao topo" com animação de cor |

---

## Scripts (`assets/js/main.js`)

- **Navbar scroll** — Adiciona `.scrolled` à navbar quando `scrollY > 80`. Em subpáginas (sem `#inicio`), a classe é sempre aplicada para garantir legibilidade.
- **Scroll-to-top** — Mostra/oculta botão `#scrollTop` e faz scroll suave ao topo.
- **AOS** — Inicialização das animações de entrada.
- **Ano atual** — `document.getElementById('currentYear').textContent = new Date().getFullYear()`
- **Formulário de contacto** — Validação e feedback no formulário de contacto (index.html).

---

## Páginas de Serviço

Cada subpágina partilha a mesma estrutura:

1. **Navbar** (idêntica ao index)
2. **Hero** com breadcrumb, badge, título e CTA WhatsApp
3. **Secções de conteúdo** específicas do serviço
4. **FAQ** com accordion Bootstrap
5. **CTA final** com link WhatsApp
6. **Footer** (idêntico ao index)

### Festas de Aniversário (`festas.html`)

**Pacotes:**

| Pacote | Preço | Crianças | Duração |
|---|---|---|---|
| Kids | 175 € | até 10 | 2h |
| Friends | 255 € | até 15 | 2h30 |
| Adventure | 255 € | até 15 | 2h30 |
| Power | 335 € | até 20 | 3h |
| Premium | 750 € | até 20 | 3h30 |

*Aniversariante não paga. IVA 23% incluído.*

**Lanche base inclui:** Sumo de laranja, Ice tea manga, Água, Descartáveis / Croquetes, Pizza, Gelatina, Oreo, Batata frita, Pipoca (sal)

**Extras opcionais:** Decoração temática (120 €), Pintura facial (40 €), Saquinhos de guloseimas 16 un. (56 €), Bolo (consultar), Brigadeiros 50 un. (22 €), Adultos extra (61,50 €)

---

## Contacto

- **Telemóvel / WhatsApp:** 937 608 823
- **Email:** playkidsrainha@gmail.com
- **Morada:** Caldas da Rainha, Portugal
- **Horário:** Segunda a Sexta, 08h00 – 19h00

---

## Desenvolvimento Local

**Pré-requisito:** [XAMPP](https://www.apachefriends.org/) instalado.

1. Colocar a pasta `playkids/` em `C:\xampp\htdocs\`
2. Iniciar o Apache no painel XAMPP
3. Abrir `http://localhost/playkids/` no browser

Não são necessários npm, build tools ou qualquer instalação adicional — todos os vendors estão incluídos localmente em `assets/vendor/`.
