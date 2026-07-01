# 🦌 Fawn — HackTheBox Starting Point
```
     /\_____/\
    (  ^   ^  )   ██╗  ██╗ █████╗  ██████╗██╗  ██╗████████╗██╗  ██╗███████╗██████╗  ██████╗ ██╗  ██╗
    ( (  ω  ) )   ██║  ██║██╔══██╗██╔════╝██║ ██╔╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔═══██╗╚██╗██╔╝
     \ ~~~~~ /    ███████║███████║██║     █████╔╝    ██║   ███████║█████╗  ██████╔╝██║   ██║ ╚███╔╝
      )     (     ██╔══██║██╔══██║██║     ██╔═██╗    ██║   ██╔══██║██╔══╝  ██╔══██╗██║   ██║ ██╔██╗
     (  ~~~  )    ██║  ██║██║  ██║╚██████╗██║  ██╗   ██║   ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
      `~~~~~´     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
```
![HTB Badge](https://img.shields.io/badge/HackTheBox-Starting%20Point-green?style=for-the-badge&logo=hackthebox)
![Difficulty](https://img.shields.io/badge/Difficulty-Very%20Easy-brightgreen?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-Linux-orange?style=for-the-badge&logo=linux)
```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║   ███████╗ █████╗ ██╗    ██╗███╗   ██╗                                 ║
║   ██╔════╝██╔══██╗██║    ██║████╗  ██║                                 ║
║   █████╗  ███████║██║ █╗ ██║██╔██╗ ██║                                 ║
║   ██╔══╝  ██╔══██║██║███╗██║██║╚██╗██║                                 ║
║   ██║     ██║  ██║╚███╔███╔╝██║ ╚████║                                 ║
║   ╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═══╝                               ║
║                                                                        ║
║              [ HackTheBox — Starting Point ]                           ║
║                                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
```
---
## 📋 Informations sur la Machine
## 🦌 Machine Info
|
 Propriété        
|
 Valeur            
|
|
------------------
|
-------------------
|
|
**
Nom
**
|
 Fawn              
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
Difficulté
**
|
 Very Easy         
|
|
**
Note
**
|
 ⭐ 4.7/5 (1200)  
|
|
**
XP Reward
**
|
 150 XP            
|
|
**
Thème
**
|
 FTP / Enumeration 
|
|
**
Joueur #
**
|
 474144            
|
```
┌──────────────────────────────────────────────────┐
│  Name       : Fawn                               │
│  OS         : Linux                              │
│  Difficulty : Very Easy                          │
│  Rating     : ⭐ 4.7/5 (1200)                   │
│  XP Reward  : 150 XP                             │
│  Theme      : FTP / Enumeration                  │
│  Player #   : 474144                             │
└──────────────────────────────────────────────────┘
```
---
## 🎯 Objectif
## 🎯 Objective
Explorer et exploiter un service **FTP** mal configuré permettant une connexion **anonyme**, afin de récupérer le flag présent sur le serveur.
> Exploiter un service **FTP** mal configuré permettant une connexion **anonyme** pour récupérer le flag.
---
## 🔍 Reconnaissance & Enumeration
## 📝 Tasks & Answers
### Étape 1 — Test de connectivité
```
┌────┬────────────────────────────────────────────────────────────────────────────────┬─────────────────────────┐
│ #  │ Question                                                                       │ Answer                  │
├────┼────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
│ 01 │ What does the 3-letter acronym FTP stand for?                                  │ File Transfer Protocol  │
│ 02 │ Which port does the FTP service listen on usually?                              │ 21                      │
│ 03 │ Acronym for secure FTP as an extension of SSH?                                  │ SFTP                    │
│ 04 │ Command to send an ICMP echo request?                                          │ ping                    │
│ 05 │ What version is FTP running on the target?                                     │ vsftpd 3.0.3            │
│ 06 │ What OS type is running on the target?                                         │ Unix                    │
│ 07 │ Command to display the 'ftp' client help menu?                                 │ ftp -?                  │
│ 08 │ Username used over FTP to log in without an account?                           │ anonymous               │
│ 09 │ Response code for 'Login successful'?                                          │ 230                     │
│ 10 │ Common Linux command to list files (besides dir)?                              │ ls                      │
│ 11 │ Command used to download the file from the FTP server?                         │ get                     │
└────┴────────────────────────────────────────────────────────────────────────────────┴─────────────────────────┘
```
Vérifier la connexion à la cible avec une requête ICMP :
---
```bash
ping <TARGET_IP>
```
## 🔍 Walkthrough
### Étape 2 — Scan Nmap
### Step 1 — Ping the Target
Lancer un scan pour identifier les services ouverts :
```bash
nmap -sV -sC <TARGET_IP>
ping <TARGET_IP>
```
**Résultats clés :**
- **Port 21** : FTP ouvert — `vsftpd 3.0.3`
- **OS détecté** : Unix
- **Connexion anonyme** : Autorisée ✅
> Test de connectivité ICMP pour vérifier que la machine cible est accessible.
---
📸 **Screenshot :**
### 📸 Screenshot 1 — Résultat du scan Nmap
![Ping](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/FAWN/IMG/ping.png)
<!-- ============================================ -->
<!-- CAPTURE 1 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![01 - Scan Nmap](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/FAWN/IMG/nmap%20version.png)
---
## 🔐 Exploitation — Connexion FTP Anonyme
### Step 2 — Nmap Scan (Version Detection)
### Étape 3 — Connexion au serveur FTP
```bash
ftp <TARGET_IP>
nmap -sV <TARGET_IP>
```
- **Username** : `anonymous`
- **Password** : *(laisser vide ou appuyer sur Entrée)*
> Scan des services pour identifier **vsftpd 3.0.3** sur le port **21**.
> **Code de réponse** : `230` — Login successful ✅
📸 **Screenshot :**
![Nmap Version](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/FAWN/IMG/OS%20detection.png)
---
### 📸 Screenshot 2 — Connexion FTP anonyme réussie
### Step 3 — Nmap Scan (OS Detection)
<!-- ============================================ -->
<!-- CAPTURE 2 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
```bash
nmap -O <TARGET_IP>
```
![02 - Connexion FTP]()
> Détection du système d'exploitation : **Unix / Linux**.
---
📸 **Screenshot :**
### Étape 4 — Lister les fichiers
![OS Detection]([IMG/OS%20detection.png](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/FAWN/IMG/OS%20detection.png))
```bash
ls
```
---
ou alternativement :
### Step 4 — FTP Help Menu
```bash
dir
ftp -?
```
---
> Affichage du menu d'aide du client FTP.
### 📸 Screenshot 3 — Liste des fichiers sur le serveur FTP
📸 **Screenshot :**
<!-- ============================================ -->
<!-- CAPTURE 3 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![FTP Menu](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/FAWN/IMG/ftp%20menu.png)
![03 - Listing FTP](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/FAWN/IMG/connection%20ftp%20.png)
---
### Étape 5 — Télécharger le flag
### Step 5 — FTP Anonymous Login
```bash
get flag.txt
ftp <TARGET_IP>
```
```
Name: anonymous
Password: (vide)
```
---
> Connexion réussie — Code **230** : Login successful ✅
### 📸 Screenshot 4 — Téléchargement du fichier flag.txt
📸 **Screenshot :**
<!-- ============================================ -->
<!-- CAPTURE 4 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![04 - Get Flag](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/FAWN/IMG/get%20flag.png)
---
### Étape 6 — Lire le flag
### Step 6 — Get the Flag 🚩
```bash
ls
get flag.txt
quit
cat flag.txt
```
---
> Téléchargement et lecture du flag.
### 📸 Screenshot 5 — Contenu du flag
📸 **Screenshot :**
<!-- ============================================ -->
<!-- CAPTURE 5 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![Get Flag](IMG/get%20flag.png)
![05 - Flag Content](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/FAWN/IMG/get%20flag.png)
---
## 🏁 Machine Complétée
## 🏁 Result
```
🚩 Root flag owned ✅
╔═══════════════════════════════════════════╗
║                                           ║
║   🚩  ROOT FLAG OWNED  🚩                ║
║                                           ║
║   Congratulations H4concef!               ║
║   You are player #474144                  ║
║   to have solved Fawn.                    ║
║                                           ║
╚═══════════════════════════════════════════╝
```
---
### 📸 Screenshot 6 — Flag soumis et machine complétée
## 📚 Concepts Learned
<!-- ============================================ -->
<!-- CAPTURE 6 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
```
┌─────────────────────────┬──────────────────────────────────────────────────────┐
│ Concept                 │ Description                                          │
├─────────────────────────┼──────────────────────────────────────────────────────┤
│ FTP                     │ File Transfer Protocol — port 21, no encryption      │
│ SFTP                    │ Secure FTP — extension of SSH                        │
│ Anonymous Login         │ FTP misconfiguration allowing access without creds   │
│ Nmap                    │ Network scanner for port & service enumeration       │
│ vsftpd                  │ Very Secure FTP Daemon — popular Linux FTP server    │
└─────────────────────────┴──────────────────────────────────────────────────────┘
```
![06 - Machine Pwned](screenshots/06_machine_pwned.png)
---
## ✅ Réponses aux Tasks
## 🛠️ Tools Used
|
#
|
 Question 
|
 Réponse 
|
|
----
|
----------
|
---------
|
|
 1  
|
 What does the 3-letter acronym FTP stand for? 
|
`File Transfer Protocol`
|
|
 2  
|
 Which port does the FTP service listen on usually? 
|
`21`
|
|
 3  
|
 What acronym is used for a later protocol designed to provide similar functionality to FTP but securely, as an extension of the SSH protocol? 
|
`SFTP`
|
|
 4  
|
 What is the command we can use to send an ICMP echo request to test our connection to the target? 
|
`ping`
|
|
 5  
|
 From your scans, what version is FTP running on the target? 
|
`vsftpd 3.0.3`
|
|
 6  
|
 From your scans, what OS type is running on the target? 
|
`Unix`
|
|
 7  
|
 What is the command we need to run in order to display the 'ftp' client help menu? 
|
`ftp -?`
|
|
 8  
|
 What is the username that is used over FTP when you want to log in without having an account? 
|
`anonymous`
|
|
 9  
|
 What is the response code we get for the FTP message 'Login successful'? 
|
`230`
|
|
 10 
|
 What is the other command (besides dir) that is a common way to list files on a Linux system? 
|
`ls`
|
|
 11 
|
 What is the command used to download the file we found on the FTP server? 
|
`get`
|
```
• nmap    — Port & service scanner
• ftp     — FTP command-line client
• ping    — ICMP connectivity test
```
---
## 📚 Concepts Appris
## 📂 Repository Structure
|
 Concept 
|
 Description 
|
|
---------
|
-------------
|
|
**
FTP (File Transfer Protocol)
**
|
 Protocole de transfert de fichiers sur le port 21, sans chiffrement 
|
|
**
SFTP
**
|
 Version sécurisée de FTP, basée sur SSH 
|
|
**
Connexion anonyme
**
|
 Accès FTP sans identifiants — vulnérabilité courante de misconfiguration 
|
|
**
Nmap
**
|
 Outil d'enumeration réseau pour découvrir les ports et services ouverts 
|
|
**
vsftpd
**
|
 Serveur FTP populaire sur Linux (Very Secure FTP Daemon) 
|
```
FAWN/
├── README.md
└── IMG/
    ├── ping.png
    ├── nmap version.png
    ├── OS detection.png
    ├── ftp menu.png
    ├── connection ftp .png
    └── get flag.png
```
---
## 🛠️ Outils Utilisés
## 👤 Author
- `nmap` — Scanner de ports et de services
- `ftp` — Client FTP en ligne de commande
- `ping` — Test de connectivité ICMP
---
## 📂 Structure des Screenshots
```
screenshots/
├── 01_nmap_scan.png       ← Capture 1
├── 02_ftp_login.png       ← Capture 2
├── 03_ftp_listing.png     ← Capture 3
├── 04_ftp_get_flag.png    ← Capture 4
├── 05_flag_content.png    ← Capture 5
└── 06_machine_pwned.png   ← Capture 6
   ╔═══════════════════════════════╗
   ║  H4concef — Player #474144   ║
   ║  HackTheBox Starting Point   ║
   ╚═══════════════════════════════╝
```
---
> *Writeup réalisé dans le cadre du parcours Starting Point de HackTheBox.*
## 👤 Auteur
**H4concef** — Player #474144
---
> *Writeup réalisé dans le cadre du parcours Starting Point de HackTheBox.*
