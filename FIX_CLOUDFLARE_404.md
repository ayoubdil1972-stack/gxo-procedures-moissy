# 🔧 FIX ERREUR 404 SUR CLOUDFLARE PAGES

## 🚨 PROBLÈME

Le site https://gxo-procedures-moissy.pages.dev affiche une erreur 404.

**Cause :** Le fichier `_worker.js` n'est pas correctement reconnu par Cloudflare Pages.

---

## ✅ SOLUTION : Lier la base de données D1

Le worker nécessite la base de données D1 pour fonctionner.

### **Sur votre Mac (Terminal) :**

```bash
cd ~/Downloads
tar -xzf dist.tar.gz

# Créer wrangler.toml
cat > wrangler.toml << 'WRANGLER'
name = "gxo-procedures-moissy"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"

[[d1_databases]]
binding = "DB"
database_name = "gxo-chauffeurs-db"
database_id = "28637f66-9f3f-4c23-91f0-b67d66cb89b3"
WRANGLER

# Configurer token
export CLOUDFLARE_API_TOKEN=HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-

# Déployer avec wrangler.toml
wrangler pages deploy dist --project-name gxo-procedures-moissy
```

---

## 🌐 ALTERNATIVE : Configuration manuelle via Dashboard

1. Allez sur **https://dash.cloudflare.com/**
2. **Workers & Pages** → **gxo-procedures-moissy**
3. **Settings** → **Functions**
4. **D1 database bindings** → **Add binding**
   - Variable name: `DB`
   - D1 database: `gxo-chauffeurs-db`
5. **Save**
6. Redéployez le site

---

## 📱 APRÈS LA FIX

Testez :
```
https://gxo-procedures-moissy.pages.dev/
```

Et la vidéo :
```
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
```

---

**Suivez ces étapes et dites-moi quand c'est fait !**
