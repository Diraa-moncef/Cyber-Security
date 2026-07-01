# 🦌 Fawn — HackTheBox Starting Point
![HTB Badge](https://img.shields.io/badge/HackTheBox-Starting%20Point-green?style=for-the-badge&logo=hackthebox)
- **OS détecté** : Unix
- **Connexion anonyme** : Autorisée ✅
> 📸 **Screenshot 1 — Résultat du scan Nmap**
>
> ![Nmap Scan](screenshots/01_nmap_scan.png)
---
### 📸 Screenshot 1 — Résultat du scan Nmap
<!-- ============================================ -->
<!-- CAPTURE 1 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![01 - Scan Nmap](screenshots/01_nmap_scan.png)
---
## 🔐 Exploitation — Connexion FTP Anonyme
> **Code de réponse** : `230` — Login successful ✅
> 📸 **Screenshot 2 — Connexion FTP anonyme réussie**
>
> ![FTP Login](screenshots/02_ftp_login.png)
---
### 📸 Screenshot 2 — Connexion FTP anonyme réussie
<!-- ============================================ -->
<!-- CAPTURE 2 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![02 - Connexion FTP](screenshots/02_ftp_login.png)
---
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
---
### 📸 Screenshot 3 — Liste des fichiers sur le serveur FTP
<!-- ============================================ -->
<!-- CAPTURE 3 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![03 - Listing FTP](screenshots/03_ftp_listing.png)
---
### Étape 5 — Télécharger le flag
```bash
get flag.txt
```
> 📸 **Screenshot 4 — Téléchargement du fichier flag.txt**
>
> ![FTP Get Flag](screenshots/04_ftp_get_flag.png)
---
### 📸 Screenshot 4 — Téléchargement du fichier flag.txt
<!-- ============================================ -->
<!-- CAPTURE 4 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![04 - Get Flag](screenshots/04_ftp_get_flag.png)
---
### Étape 6 — Lire le flag
```bash
cat flag.txt
```
> 📸 **Screenshot 5 — Contenu du flag**
>
> ![Flag Content](screenshots/05_flag_content.png)
---
### 📸 Screenshot 5 — Contenu du flag
<!-- ============================================ -->
<!-- CAPTURE 5 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![05 - Flag Content](screenshots/05_flag_content.png)
---
## 🏁 Machine Complétée
```
🚩 Root flag owned ✅
```
---
### 📸 Screenshot 6 — Flag soumis et machine complétée
<!-- ============================================ -->
<!-- CAPTURE 6 : Placez votre screenshot ici      -->
<!-- Remplacez le chemin par votre image           -->
<!-- ============================================ -->
![06 - Machine Pwned](screenshots/06_machine_pwned.png)
---
## ✅ Réponses aux Tasks
|
#
|
 Question 
|
 Réponse 
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
```
screenshots/
├── 01_nmap_scan.png
├── 02_ftp_login.png
├── 03_ftp_listing.png
├── 04_ftp_get_flag.png
├── 05_flag_content.png
└── 06_machine_pwned.png
├── 01_nmap_scan.png       ← Capture 1
├── 02_ftp_login.png       ← Capture 2
├── 03_ftp_listing.png     ← Capture 3
├── 04_ftp_get_flag.png    ← Capture 4
├── 05_flag_content.png    ← Capture 5
└── 06_machine_pwned.png   ← Capture 6
```
> ⚠️ **Note** : Ajoutez vos captures d'écran dans le dossier `screenshots/` pour qu'elles s'affichent correctement.
---
## 👤 Auteur
**H4concef** — Player #474144
---
> *Writeup réalisé dans le cadre du parcours Starting Point de HackTheBox.*
