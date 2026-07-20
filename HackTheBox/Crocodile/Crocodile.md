# Writeup Hack The Box - Crocodile
# 🧠 HackTheBox — Crocodile
**Niveau de difficulté :** Very Easy
**Système d'exploitation :** Linux
<div align="center">
![HackTheBox](https://img.shields.io/badge/HackTheBox-Crocodile-green?style=for-the-badge&logo=hackthebox)
![Difficulty](https://img.shields.io/badge/Difficulty-Very%20Easy-brightgreen?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-Linux-blue?style=for-the-badge&logo=linux)
![Category](https://img.shields.io/badge/Category-Web%20%7C%20FTP-orange?style=for-the-badge)
![Rating](https://img.shields.io/badge/Rating-4.7%2F5-yellow?style=for-the-badge)
</div>
---
## 1. Énumération (Scan Nmap)
## 📋 Machine Info
Nous commençons par scanner la machine cible pour identifier les ports ouverts et les services en cours d'exécution. Nous utilisons notamment l'option `-sC` pour exécuter les scripts Nmap par défaut.
|
 Field        
|
 Details                        
|
|
--------------
|
-------------------------------
|
|
**
Name
**
|
 Crocodile                     
|
|
**
OS
**
|
 Linux                         
|
|
**
Difficulty
**
|
 ⭐ Very Easy                 
|
|
**
Rating
**
|
 4.7 / 5 (363 votes)           
|
|
**
XP
**
|
 150 XP                        
|
|
**
Category
**
|
 Web Application / FTP           
|
> **Capture d'écran 1 : Scan Nmap**
> ![Scan Nmap](screenshots/01_nmap_scan.png)
---
## 📖 Summary
**Crocodile** est une machine HackTheBox de niveau Very Easy axée sur l'énumération de services de base et la réutilisation d'identifiants.  
L'objectif est d'explorer un serveur FTP mal configuré pour récupérer des identifiants valides, puis de les utiliser pour s'authentifier sur un portail d'administration web caché et récupérer le flag.
> **Concepts clés :** Enumération, FTP Anonyme, Fuzzing Web, Réutilisation de mots de passe
---
## 2. Énumération FTP
## 🛠️ Outils Utilisés
Le scan révèle que le service **vsftpd 3.0.3** tourne sur le port 21. Le serveur renvoie le code `230`, indiquant que la connexion FTP anonyme est autorisée. 
- `nmap` — Énumération des ports et services
- `ftp` — Interaction avec le serveur FTP
- `gobuster` — Brute-force de répertoires web
- Navigateur web — Accès à l'application web
Nous nous connectons au serveur FTP en utilisant le nom d'utilisateur `anonymous`.
---
> **Capture d'écran 2 : Login FTP**
> ![Login FTP](screenshots/02_login_ftp.png)
## 🔍 Étape 1 — Scan Nmap
Une fois connectés, nous trouvons des fichiers intéressants et nous utilisons la commande `get` pour les télécharger sur notre machine locale.
On commence par un scan de ports pour identifier les services exposés sur la cible, en utilisant notamment `-sC` pour exécuter les scripts par défaut.
> **Capture d'écran 3 : Commande get (FTP)**
> ![Commande get FTP](screenshots/03_get_ftp.png)
```bash
nmap -sV -sC 10.129.x.x
```
Parmi les fichiers téléchargés, on trouve le fichier `allowed.userlist`. En listant son contenu, nous découvrons des noms d'utilisateurs potentiels, y compris `admin`.
**Résultats partiels :**
> **Capture d'écran 4 : Liste des utilisateurs (userlist)**
> ![Liste userlist](screenshots/04_lister_userlist.png)
|
 Port 
|
 État  
|
 Service 
|
 Version                   
|
|
------
|
-------
|
---------
|
---------------------------
|
|
 21   
|
 open  
|
 ftp     
|
 vsftpd 3.0.3              
|
|
 80   
|
 open  
|
 http    
|
 Apache httpd 2.4.41       
|
![Scan Nmap](./screenshots/nmap_scan.png)
> 💡 Le port **21 (FTP)** et le port **80 (HTTP)** sont ouverts. Nmap nous indique également que le login anonyme FTP est autorisé (code 230).
---
## 3. Énumération Web
## 📁 Étape 2 — Énumération FTP
Le serveur HTTP **Apache httpd 2.4.41** est également en cours d'exécution sur la cible.
Le serveur FTP autorisant les connexions anonymes, on s'y connecte pour inspecter son contenu.
> **Capture d'écran 5 : Service Web (Page d'accueil)**
> ![Service Web](screenshots/05_service_web.png)
```bash
ftp 10.129.x.x
# Username: anonymous
# Password: (vide)
```
Pour approfondir, nous utilisons **Gobuster** afin de trouver des répertoires cachés ou des fichiers spécifiques. L'option `-x` est utilisée pour spécifier les extensions de fichiers (comme `.php`, `.html`, etc.).
![Login FTP](./screenshots/ftp_login.png)
> **Capture d'écran 6 : Scan Gobuster**
> ![Scan Gobuster](screenshots/06_gobuster.png)
Une fois connecté, on liste les fichiers et on télécharge ceux qui sont intéressants (comme `allowed.userlist`) avec la commande `get`.
Grâce à Gobuster, nous découvrons une page de connexion : `login.php`.
![Commande get FTP](./screenshots/ftp_get.png)
> **Capture d'écran 7 : Page de login**
> ![Page login.php](screenshots/07_login_page.png)
En inspectant le contenu de `allowed.userlist`, on découvre plusieurs noms d'utilisateurs potentiels, dont un compte privilégié : `admin`.
![Liste userlist](./screenshots/list_userlist.png)
---
## 4. Exploitation et Récupération du Flag
## 🌐 Étape 3 — Énumération du Service Web
En utilisant les informations d'identification récupérées lors de l'énumération du serveur FTP, nous pouvons nous authentifier avec succès sur la page `login.php`.
En parallèle, on visite le service web hébergé sur le port 80.
*(Capture d'écran optionnelle : Dashboard après connexion)*
> **Capture d'écran 8 : Dashboard (Connecté)**
> ![Dashboard](screenshots/08_dashboard.png)
![Service Web](./screenshots/web_service.png)
Une fois connectés à l'interface d'administration, nous trouvons le flag final de la machine !
Pour trouver des pages cachées, on utilise `gobuster` avec le switch `-x` pour rechercher des extensions de fichiers spécifiques (comme `.php`, `.html`).
> **Capture d'écran 9 : Root Flag**
> ![Root Flag](screenshots/09_flag.png)
```bash
gobuster dir -u http://10.129.x.x/ -w /usr/share/wordlists/dirb/common.txt -x php,html
```
![Scan Gobuster](./screenshots/gobuster_scan.png)
Le fuzzing web nous révèle une page intéressante pour l'authentification : `login.php`.
![Page login.php](./screenshots/login_page.png)
---
**Machine Owned !** 🎉
## 🏁 Étape 4 — Exploitation et Flag
Sur la page `login.php`, on teste les identifiants trouvés lors de l'énumération du serveur FTP. 
En utilisant l'utilisateur `admin` et le mot de passe associé trouvé dans les fichiers FTP, l'authentification réussit !
On accède alors au tableau de bord (Dashboard).
![Dashboard](./screenshots/dashboard.png)
Et nous y trouvons le flag final !
![Root Flag](./screenshots/flag.png)
```
HTB{************}
```
> 🎉 Machine compromise avec succès ! Vous êtes le joueur **#205885** à avoir résolu **Crocodile**.
---
## 📚 Réponses aux Tasks
|
 Task 
|
 Question 
|
 Réponse 
|
|
------
|
----------
|
---------
|
|
 1 
|
 Switch Nmap pour les scripts par défaut 
|
`-sC`
|
|
 2 
|
 Version du service sur le port 21 
|
`vsftpd 3.0.3`
|
|
 3 
|
 Code FTP pour login anonyme autorisé 
|
`230`
|
|
 4 
|
 Nom d'utilisateur pour accès anonyme 
|
`anonymous`
|
|
 5 
|
 Commande pour télécharger des fichiers FTP 
|
`get`
|
|
 6 
|
 Username avec hauts privilèges dans la liste 
|
`admin`
|
|
 7 
|
 Version d'Apache HTTP Server 
|
`Apache httpd 2.4.41`
|
|
 8 
|
 Switch Gobuster pour cibler des extensions 
|
`-x`
|
|
 9 
|
 Fichier PHP permettant l'authentification 
|
`login.php`
|
---
## 🔐 Leçons Apprises
1. **Ne jamais laisser l'accès anonyme ouvert sur un serveur FTP** s'il contient des fichiers sensibles.
2. **Ne pas stocker de mots de passe ou d'identifiants en clair** dans des fichiers accessibles publiquement.
3. **Le fuzzing web (Gobuster)** est essentiel pour découvrir les panneaux d'administration cachés.
4. **La réutilisation de mots de passe** est une faille critique ; un identifiant compromis sur un service peut mener à la compromission de toute l'application.
---
## 📎 Ressources
- [HackTheBox Crocodile](https://app.hackthebox.com/starting-point)
- [Nmap Documentation](https://nmap.org/docs.html)
- [Gobuster](https://github.com/OJ/gobuster)
- [vsftpd Security](https://security.appspot.com/vsftpd.html)
---
<div align="center">
**Made with ❤️ by H4concef | HackTheBox Starting Point**
</div>

