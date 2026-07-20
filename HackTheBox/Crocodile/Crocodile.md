# 🧠 HackTheBox — Crocodile

<div align="center">

![HackTheBox](https://img.shields.io/badge/HackTheBox-Crocodile-green?style=for-the-badge&logo=hackthebox)
![Difficulty](https://img.shields.io/badge/Difficulty-Very%20Easy-brightgreen?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-Linux-blue?style=for-the-badge&logo=linux)
![Category](https://img.shields.io/badge/Category-Web%20%7C%20FTP-orange?style=for-the-badge)
![Rating](https://img.shields.io/badge/Rating-4.7%2F5-yellow?style=for-the-badge)

</div>

---

## 📋 Machine Info

| Field        | Details                        |
|--------------|-------------------------------|
| **Name**     | Crocodile                     |
| **OS**       | Linux                         |
| **Difficulty** | ⭐ Very Easy                 |
| **Rating**   | 4.7 / 5 (363 votes)           |
| **XP**       | 150 XP                        |
| **Category** | Web Application / FTP           |

---

## 📖 Summary

**Crocodile** est une machine HackTheBox de niveau Very Easy (Très Facile) axée sur l'énumération de services de base et la réutilisation d'identifiants.  
L'objectif est d'explorer un serveur FTP mal configuré pour récupérer des identifiants valides, puis de les utiliser pour s'authentifier sur un portail d'administration web caché et, enfin, récupérer le flag final de la machine.

> **Concepts clés :** Enumération, FTP Anonyme, Fuzzing Web avec Gobuster, Réutilisation de mots de passe

---

## 🛠️ Outils Utilisés

- `nmap` — Énumération des ports et des services
- `ftp` — Interaction avec le serveur FTP
- `gobuster` — Brute-force et énumération de répertoires web
- Navigateur web — Accès et interaction avec l'application web

---

## 🔍 Étape 1 — Scan Nmap

On commence par un scan de ports détaillé pour identifier les services exposés sur la cible. On utilise notamment l'option `-sC` pour exécuter les scripts par défaut de Nmap et l'option `-sV` pour détecter les versions des services.

```bash
nmap -sV -sC 10.129.x.x
```

**Résultats de Nmap :**

| Port | État  | Service | Version                   |
|------|-------|---------|---------------------------|
| 21   | open  | ftp     | vsftpd 3.0.3              |
| 80   | open  | http    | Apache httpd 2.4.41       |

![Scan Nmap](./screenshots/nmap_scan.png)

> 💡 **Analyse :** Le port **21 (FTP)** et le port **80 (HTTP)** sont ouverts. Point très important, Nmap nous indique que le login anonyme FTP est autorisé (renvoyant le code `230`).

---

## 📁 Étape 2 — Énumération FTP

Le serveur FTP autorisant les connexions anonymes, on s'y connecte pour inspecter son contenu sans avoir besoin d'identifiants valides au préalable.

```bash
ftp 10.129.x.x
# À l'invite Username, tapez : anonymous
# À l'invite Password, laissez vide et appuyez sur Entrée
```

![Login FTP](./screenshots/ftp_login.png)

Une fois connecté, on liste les fichiers disponibles et on télécharge ceux qui semblent intéressants avec la commande `get`.

![Commande get FTP](./screenshots/ftp_get.png)

En inspectant le contenu du fichier téléchargé (par exemple `allowed.userlist` et les éventuels fichiers de mots de passe associés), on découvre plusieurs noms d'utilisateurs potentiels, dont le compte privilégié : `admin`.

![Liste userlist](./screenshots/list_userlist.png)

---

## 🌐 Étape 3 — Énumération du Service Web

En parallèle de notre investigation FTP, on visite le service web hébergé sur le port 80 pour voir ce qui s'y trouve.

![Service Web](./screenshots/web_service.png)

Pour trouver des pages d'administration ou des fichiers cachés, on utilise **Gobuster** avec le paramètre `-x` pour rechercher spécifiquement des extensions de fichiers comme `.php` ou `.html`.

```bash
gobuster dir -u http://10.129.x.x/ -w /usr/share/wordlists/dirb/common.txt -x php,html
```

![Scan Gobuster](./screenshots/gobuster_scan.png)

Le fuzzing web nous révèle la présence d'une page très intéressante permettant potentiellement de s'authentifier : `login.php`.

![Page login.php](./screenshots/login_page.png)

---

## 🏁 Étape 4 — Exploitation et Flag

En nous rendant sur la page `login.php`, nous sommes face à un formulaire de connexion. Nous testons les identifiants que nous avons trouvés lors de notre énumération du serveur FTP. 

En utilisant le nom d'utilisateur `admin` et le mot de passe associé découvert dans les fichiers téléchargés via FTP, l'authentification réussit !

On accède alors au tableau de bord (Dashboard) de l'administrateur.

![Dashboard](./screenshots/dashboard.png)

Et c'est sur cette page que nous trouvons le flag final qui valide la compromission de la machine !

![Root Flag](./screenshots/flag.png)

```
HTB{************}
```

> 🎉 **Machine compromise avec succès !** Vous êtes le joueur **#205885** à avoir résolu **Crocodile**.

---

## 📚 Réponses aux Tasks

| Task | Question | Réponse |
|------|----------|---------|
| 1 | Quel switch de scan Nmap utilise les scripts par défaut ? | `-sC` |
| 2 | Quelle version de service est en cours d'exécution sur le port 21 ? | `vsftpd 3.0.3` |
| 3 | Quel code FTP est renvoyé pour indiquer "Anonymous FTP login allowed" ? | `230` |
| 4 | Quel nom d'utilisateur fournir pour se connecter anonymement au FTP ? | `anonymous` |
| 5 | Quelle commande utiliser pour télécharger des fichiers depuis le FTP ? | `get` |
| 6 | Quel nom d'utilisateur (avec hauts privilèges) trouve-t-on dans `allowed.userlist` ? | `admin` |
| 7 | Quelle version d'Apache HTTP Server tourne sur la cible ? | `Apache httpd 2.4.41` |
| 8 | Quel switch utiliser avec Gobuster pour spécifier des extensions de fichiers ? | `-x` |
| 9 | Quel fichier PHP (trouvé par brute force de dossiers) permet de s'authentifier ? | `login.php` |

---

## 🔐 Leçons Apprises

1. **Ne jamais laisser l'accès anonyme activé sur un serveur FTP** si celui-ci contient ou donne accès à des fichiers sensibles (identifiants, logs, configurations).
2. **Ne jamais stocker de mots de passe ou d'identifiants en clair** dans des fichiers accessibles publiquement.
3. **Le fuzzing web (avec Gobuster ou équivalent)** est une étape essentielle et primordiale pour découvrir les panneaux d'administration cachés.
4. **La réutilisation de mots de passe** est une faille critique ; un identifiant compromis sur un service mineur (comme un FTP mal configuré) peut mener à la compromission d'un service critique (comme le panneau d'administration web).

---

## 📎 Ressources

- [HackTheBox Crocodile](https://app.hackthebox.com/starting-point)
- [Nmap Documentation Officielle](https://nmap.org/docs.html)
- [Documentation Gobuster](https://github.com/OJ/gobuster)
- [Sécurité vsftpd](https://security.appspot.com/vsftpd.html)

---

<div align="center">

**Made with ❤️ by H4concef | HackTheBox Starting Point**

</div>
```
