# 🦌 Fawn — HackTheBox Starting Point
![HTB Badge](https://img.shields.io/badge/HackTheBox-Starting%20Point-green?style=for-the-badge&logo=hackthebox)
![Difficulty](https://img.shields.io/badge/Difficulty-Very%20Easy-brightgreen?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-Linux-orange?style=for-the-badge&logo=linux)
---
## 📋 Informations sur la Machine
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
---
## 🎯 Objectif
Explorer et exploiter un service **FTP** mal configuré permettant une connexion **anonyme**, afin de récupérer le flag présent sur le serveur.
---
## 🔍 Reconnaissance & Enumeration
### Étape 1 — Test de connectivité
Vérifier la connexion à la cible avec une requête ICMP :
```bash
ping <TARGET_IP>
```
### Étape 2 — Scan Nmap
Lancer un scan pour identifier les services ouverts :
```bash
nmap -sV -sC <TARGET_IP>
```
**Résultats clés :**
- **Port 21** : FTP ouvert — `vsftpd 3.0.3`
- **OS détecté** : Unix
- **Connexion anonyme** : Autorisée ✅
> 📸 **Screenshot 1 — Résultat du scan Nmap**
>
> ![Nmap Scan](screenshots/01_nmap_scan.png)
---
## 🔐 Exploitation — Connexion FTP Anonyme
### Étape 3 — Connexion au serveur FTP
```bash
ftp <TARGET_IP>
```
- **Username** : `anonymous`
- **Password** : *(laisser vide ou appuyer sur Entrée)*
> **Code de réponse** : `230` — Login successful ✅
> 📸 **Screenshot 2 — Connexion FTP anonyme réussie**
>
> ![FTP Login](screenshots/02_ftp_login.png)
### Étape 4 — Lister les fichiers
```bash
ls
```
ou alternativement :
```bash
dir
```
> 📸 **Screenshot 3 — Liste des fichiers sur le serveur FTP**
>
> ![FTP Listing](screenshots/03_ftp_listing.png)
### Étape 5 — Télécharger le flag
```bash
get flag.txt
```
> 📸 **Screenshot 4 — Téléchargement du fichier flag.txt**
>
> ![FTP Get Flag](screenshots/04_ftp_get_flag.png)
### Étape 6 — Lire le flag
```bash
cat flag.txt
```
> 📸 **Screenshot 5 — Contenu du flag**
>
> ![Flag Content](screenshots/05_flag_content.png)
---
## ✅ Réponses aux Tasks
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
---
## 🏁 Flag
```
🚩 Root flag owned ✅
```
> 📸 **Screenshot 6 — Flag soumis et machine complétée**
>
> ![Machine Pwned](screenshots/06_machine_pwned.png)
---
## 📚 Concepts Appris
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
---
## 🛠️ Outils Utilisés
- `nmap` — Scanner de ports et de services
- `ftp` — Client FTP en ligne de commande
- `ping` — Test de connectivité ICMP
---
## 📂 Structure des Screenshots
```
screenshots/
├── 01_nmap_scan.png
├── 02_ftp_login.png
├── 03_ftp_listing.png
├── 04_ftp_get_flag.png
├── 05_flag_content.png
└── 06_machine_pwned.png
```
> ⚠️ **Note** : Ajoutez vos captures d'écran dans le dossier `screenshots/` pour qu'elles s'affichent correctement.
---
## 👤 Auteur
**H4concef** — Player #474144
---
> *Writeup réalisé dans le cadre du parcours Starting Point de HackTheBox.*
