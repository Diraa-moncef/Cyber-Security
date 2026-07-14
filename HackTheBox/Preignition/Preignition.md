# 🔥 HackTheBox - Preignition

```text
      /\_____/\
    (  ^   ^  )   ██╗  ██╗ █████╗  ██████╗██╗  ██╗████████╗██╗  ██╗███████╗██████╗  ██████╗ ██╗  ██╗
    ( (  ω  ) )   ██║  ██║██╔══██╗██╔════╝██║ ██╔╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔═══██╗╚██╗██╔╝
     \ ~~~~~ /    ███████║███████║██║     █████╔╝    ██║   ███████║█████╗  ██████╔╝██║   ██║ ╚███╔╝
      )     (     ██╔══██║██╔══██║██║     ██╔═██╗    ██║   ██╔══██║██╔══╝  ██╔══██╗██║   ██║ ██╔██╗
     (  ~~~  )    ██║  ██║██║  ██║╚██████╗██║  ██╗   ██║   ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
      `~~~~~´     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
╔══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║ ██████╗ ██████╗ ███████╗██╗ ██████╗ ███╗   ██╗██╗████████╗██╗ ██████╗ ███╗  ██╗║
║ ██╔══██╗██╔══██╗██╔════╝██║██╔════╝ ████╗  ██║██║╚══██╔══╝██║██╔═══██╗████╗ ██║║
║ ██████╔╝██████╔╝█████╗  ██║██║  ███╗██╔██╗ ██║██║   ██║   ██║██║   ██║██╔██╗██║║
║ ██╔═══╝ ██╔══██╗██╔══╝  ██║██║   ██║██║╚██╗██║██║   ██║   ██║██║   ██║██║╚████║║
║ ██║     ██║  ██║███████╗██║╚██████╔╝██║ ╚████║██║   ██║   ██║╚██████╔╝██║ ╚███║║
║ ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚══╝║
║                                                                                ║
║                  [ HackTheBox — Starting Point ]                               ║
║                                                                                ║
╚══════════════════════════════════════════════════════════════════════════════════╝
```

🔑 Machine Info
```text
┌──────────────────────────────────────────────────┐
│  Name       : Preignition                        │
│  OS         : Linux                              │
│  Difficulty : Very Easy                          │
│  Rating     : ⭐ 4.7/5 (115)                     │
│  XP Reward  : 150 XP                             │
│  Theme      : Web / Directory Brute-Forcing      │
│  Player #   : 81927                              │
└──────────────────────────────────────────────────┘
```

🎯 Objective
Le but de ce laboratoire est de démontrer comment une page d'administration web non référencée et mal protégée peut être découverte via une technique de **Directory Brute-Forcing** (dir busting). L'objectif consiste à énumérer les répertoires et fichiers cachés du serveur web, identifier la page de connexion admin, et s'y authentifier afin de récupérer le flag.

📝 Tasks & Answers
```text
┌────┬────────────────────────────────────────────────────────────────────────────────────────┬──────────────────┐
│ #  │ Question                                                                               │ Answer           │
├────┼────────────────────────────────────────────────────────────────────────────────────────┼──────────────────┤
│ 01 │ Directory Brute-forcing is also known as?                                              │ dir busting      │
│ 02 │ What switch do we use for nmap's scan to specify version detection?                    │ -sV              │
│ 03 │ What does Nmap report is the service identified as running on port 80/tcp?             │ http             │
│ 04 │ What server name and version of service is running on port 80/tcp?                    │ nginx 1.14.2     │
│ 05 │ What switch do we use to specify to Gobuster we want to perform dir busting?           │ dir              │
│ 06 │ When using gobuster to dir bust, what switch do we add to find PHP pages?              │ -x php           │
│ 07 │ What page is found during our dir busting activities?                                  │ admin.php        │
│ 08 │ What is the HTTP status code reported by Gobuster for the discovered page?             │ 200              │
└────┴────────────────────────────────────────────────────────────────────────────────────────┴──────────────────┘
```

🔍 Walkthrough

### Step 1 — Reconnaissance & Connectivity Check
> Dans un premier temps, nous vérifions la connectivité réseau avec la cible via une requête ICMP afin de confirmer que l'hôte est actif et accessible sur le réseau.

```bash
ping 10.129.32.146
```

![Ping](https://raw.githubusercontent.com/Diraa-moncef/Cyber-Security/main/HackTheBox/Preignition/IMG/ping.png)

---

### Step 2 — Network Scanning & Service Enumeration
> Un balayage réseau complet via `nmap` est ensuite effectué avec détection de version (`-sV`) afin d'identifier les services exposés. Ce scan révèle l'ouverture du port TCP `80`, sur lequel tourne un serveur web **nginx 1.14.2**, indiquant la présence d'une application web accessible publiquement.

```bash
nmap -sV 10.129.32.146
```

![Nmap Scan](https://raw.githubusercontent.com/Diraa-moncef/Cyber-Security/main/HackTheBox/Preignition/IMG/nmap.png)

---

### Step 3 — Directory Brute-Forcing avec Gobuster
> Suite à la découverte du serveur web, nous appliquons la technique de **dir busting** à l'aide de l'outil `gobuster`. En ciblant spécifiquement les fichiers PHP (`-x php`) avec une wordlist commune, nous découvrons une page cachée : `admin.php` — retournant un code HTTP **200 OK**, confirmant son existence.

```bash
gobuster dir -u http://10.129.32.146 -w /usr/share/wordlists/dirb/common.txt -x php
```

![Gobuster](https://raw.githubusercontent.com/Diraa-moncef/Cyber-Security/main/HackTheBox/Preignition/IMG/gobuster.png)

---

### Step 4 — Accès à la Page d'Administration
> Après avoir découvert la page `admin.php`, nous y accédons via un navigateur web. Une interface de connexion est présente. En testant les identifiants par défaut (`admin:admin`), nous obtenons un accès complet au panneau d'administration.

```
URL : http://10.129.32.146/admin.php
Identifiants : admin / admin
```

![Login Page](https://raw.githubusercontent.com/Diraa-moncef/Cyber-Security/main/HackTheBox/Preignition/IMG/login.png)

---

### Step 5 — Flag Exfiltration 🚩
> Une fois authentifiés sur le panneau d'administration, le *Root Flag* est directement affiché sur la page, validant ainsi la compromission totale de la machine.

![Flag](https://raw.githubusercontent.com/Diraa-moncef/Cyber-Security/main/HackTheBox/Preignition/IMG/flag.png)

---

🏁 Result
```text
╔═══════════════════════════════════════════╗
║                                           ║
║   🚩  ROOT FLAG OWNED  🚩                 ║
║                                           ║
║   Congratulations H4concef!               ║
║   You are player #81927                   ║
║   to have solved Preignition.             ║
║                                           ║
╚═══════════════════════════════════════════╝
```

📚 Concepts Learned
```text
┌─────────────────────────┬──────────────────────────────────────────────────────┐
│ Concept                 │ Description                                          │
├─────────────────────────┼──────────────────────────────────────────────────────┤
│ Dir Busting             │ Technique d'énumération des chemins cachés sur un    │
│                         │ serveur web via une wordlist.                        │
│ Gobuster                │ Outil de brute-force de répertoires et fichiers web. │
│ nginx                   │ Serveur web HTTP open-source performant.             │
│ Default Credentials     │ Identifiants par défaut (admin/admin) laissés en    │
│                         │ production — faille critique de configuration.       │
│ HTTP Status 200         │ Indique que la page existe et est accessible.        │
│ Nmap -sV                │ Détection de version des services sur les ports.     │
└─────────────────────────┴──────────────────────────────────────────────────────┘
```

🛠️ Tools Used
```text
• ping       — Test de connectivité réseau (ICMP)
• nmap       — Scanner de ports et services (-sV)
• gobuster   — Outil de directory brute-forcing
• Browser    — Accès à la page admin.php découverte
```

📂 Repository Structure
```text
PREIGNITION/
├── README.md
└── IMG/
    ├── ping.png
    ├── nmap.png
    ├── gobuster.png
    ├── login.png
    └── flag.png
```

👤 Author
```text
   ╔═══════════════════════════════╗
   ║  H4concef — Player #81927     ║
   ║  HackTheBox Starting Point    ║
   ╚═══════════════════════════════╝
```
Writeup réalisé dans le cadre du parcours Starting Point de HackTheBox.
