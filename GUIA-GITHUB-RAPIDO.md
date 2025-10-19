# 🚀 GUIA RÁPIDO - SUBIR PROJETO NO GITHUB

## 📋 **PASSOS RÁPIDOS:**

### **1. 🔧 INSTALAR GIT (se não tiver)**
```bash
# Verificar se Git está instalado
git --version

# Se não estiver instalado, baixar de: https://git-scm.com/
```

### **2. 📁 NAVEGAR PARA O PROJETO**
```bash
# Já estamos no diretório correto:
cd C:\Users\rafap\event-management-system
```

### **3. 🔄 INICIALIZAR REPOSITÓRIO**
```bash
# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "🚀 Sistema de Gestão de Eventos - Versão Completa

✅ Módulos Implementados:
- Central de Confirmações (Inscrições, Vendas, Envios)
- Artes & Certificados (Instagram, Certificados, Placas Ouro)
- Administrativo (Listas, Observações, Cidades, Modalidades, Usuários)
- Financeiro (Receitas, Despesas, Resumos, Notas Fiscais)
- Portaria Mobile (Recepção, Conferência, Chamada)
- ERP Completo (Vendas, Estoque, CRM, Projetos)
- Trello Integrado

✅ Funcionalidades:
- Banco de dados isolado por evento
- Geração de PDFs com QR Code
- Upload de arquivos
- Sistema de autenticação
- Interface responsiva dark/gold
- APIs REST completas
- Testes manuais realizados

🎯 Sistema 100% funcional e pronto para produção!"
```

### **4. 🌐 CRIAR REPOSITÓRIO NO GITHUB**
1. Acesse: https://github.com/new
2. Nome: `event-management-system`
3. Descrição: `Sistema completo de gestão de eventos com ERP integrado`
4. Marque como **Público** ou **Privado**
5. **NÃO** marque "Add a README file"
6. Clique em **"Create repository"**

### **5. 🔗 CONECTAR COM GITHUB**
```bash
# Adicionar remote origin (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/event-management-system.git

# Renomear branch principal para main
git branch -M main

# Enviar para GitHub
git push -u origin main
```

## 🎯 **COMANDOS COMPLETOS (COPIE E COLE):**

```bash
# 1. Inicializar
git init
git add .
git commit -m "🚀 Sistema de Gestão de Eventos - Versão Completa

✅ Módulos Implementados:
- Central de Confirmações (Inscrições, Vendas, Envios)
- Artes & Certificados (Instagram, Certificados, Placas Ouro)
- Administrativo (Listas, Observações, Cidades, Modalidades, Usuários)
- Financeiro (Receitas, Despesas, Resumos, Notas Fiscais)
- Portaria Mobile (Recepção, Conferência, Chamada)
- ERP Completo (Vendas, Estoque, CRM, Projetos)
- Trello Integrado

✅ Funcionalidades:
- Banco de dados isolado por evento
- Geração de PDFs com QR Code
- Upload de arquivos
- Sistema de autenticação
- Interface responsiva dark/gold
- APIs REST completas
- Testes manuais realizados

🎯 Sistema 100% funcional e pronto para produção!"

# 2. Conectar com GitHub (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/event-management-system.git
git branch -M main
git push -u origin main
```

## 📁 **ARQUIVOS IMPORTANTES INCLUÍDOS:**

### **✅ Código Fonte:**
- Frontend (Vite + React)
- Backend (Next.js + APIs)
- Componentes React
- Banco de dados SQLite

### **✅ Configurações:**
- package.json
- vercel.json (para deploy)
- tailwind.config.js
- vite.config.js

### **✅ Documentação:**
- README.md
- GUIA-VERCEL.md
- Testes manuais

### **✅ Dados de Teste:**
- Bancos de dados com dados reais
- Eventos criados
- Inscrições funcionais

## 🚨 **IMPORTANTE:**

### **📋 ANTES DE SUBIR:**
1. **Criar conta no GitHub** (se não tiver)
2. **Substituir SEU_USUARIO** pelo seu username
3. **Verificar se não há arquivos sensíveis** (senhas, chaves)

### **🔒 ARQUIVOS QUE SERÃO IGNORADOS:**
- `node_modules/` (será ignorado automaticamente)
- `.env` (se houver)
- Arquivos temporários

## 🌐 **APÓS SUBIR:**

### **✅ Seu repositório estará em:**
`https://github.com/SEU_USUARIO/event-management-system`

### **✅ Próximos passos:**
1. **Deploy no Vercel** (conectar com GitHub)
2. **Compartilhar URL** com clientes
3. **Colaboração** com outros desenvolvedores

---

**🎯 TEMPO ESTIMADO: 5 minutos!**
