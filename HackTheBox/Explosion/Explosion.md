      /\_____/\
    (  ^   ^  )   ██╗  ██╗ █████╗  ██████╗██╗  ██╗████████╗██╗  ██╗███████╗██████╗  ██████╗ ██╗  ██╗
    ( (  ω  ) )   ██║  ██║██╔══██╗██╔════╝██║ ██╔╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔═══██╗╚██╗██╔╝
     \ ~~~~~ /    ███████║███████║██║     █████╔╝    ██║   ███████║█████╗  ██████╔╝██║   ██║ ╚███╔╝
      )     (     ██╔══██║██╔══██║██║     ██╔═██╗    ██║   ██╔══██║██╔══╝  ██╔══██╗██║   ██║ ██╔██╗
     (  ~~~  )    ██║  ██║██║  ██║╚██████╗██║  ██╗   ██║   ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
      `~~~~~´     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║ ███████╗██╗  ██╗██████╗ ██╗      ██████╗ ███████╗██╗ ██████╗ ██╗   ██╗   ║
║ ██╔════╝╚██╗██╔╝██╔══██╗██║     ██╔═══██╗██╔════╝██║██╔═══██╗████╗ ██║   ║
║ █████╗   ╚███╔╝ ██████╔╝██║     ██║   ██║███████╗██║██║   ██║██╔██╗██║   ║
║ ██╔══╝   ██╔██╗ ██╔═══╝ ██║     ██║   ██║╚════██║██║██║   ██║██║╚██╗██║  ║
║ ███████╗██╔╝ ██╗██║     ███████╗╚██████╔╝███████║██║╚██████╔╝██║ ╚████║  ║
║ ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝  ║
║                                                                        ║
║              [ HackTheBox — Starting Point ]                           ║
║                                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
🔑 Machine Info

text

┌──────────────────────────────────────────────────┐
│  Name       : Explosion                          │
│  OS         : Windows                            │
│  Difficulty : Very Easy                          │
│  Rating     : ⭐ 4.7/5 (133)                     │
│  XP Reward  : 150 XP                             │
│  Theme      : RDP / Misconfiguration             │
│  Player #   : 312646                             │
└──────────────────────────────────────────────────┘
🎯 Objective Le but de ce laboratoire est de démontrer l'impact critique d'une mauvaise configuration des services d'accès à distance. L'objectif consiste à énumérer l'hôte cible, identifier le service RDP exposé, et exploiter une session non sécurisée (compte Administrator dépourvu de mot de passe) afin d'obtenir un accès complet au système et de compromettre la machine.

📝 Tasks & Answers

text

┌────┬────────────────────────────────────────────────────────────────────────────────┬─────────────────────────┐
│ #  │ Question                                                                       │ Answer                  │
├────┼────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
│ 01 │ What does the 3-letter acronym RDP stand for?                                  │ Remote Desktop Protocol │
│ 02 │ 3-letter acronym referring to interaction with host via command line interface?│ CLI                     │
│ 03 │ What about graphical user interface interactions?                                │ GUI                     │
│ 04 │ Name of an old remote access tool (unencrypted, port 23)?                      │ Telnet                  │
│ 05 │ What is the name of the service running on port 3389 TCP?                      │ ms-wbt-server           │
│ 06 │ Switch used to specify target host's IP address when using xfreerdp?           │ /v:                     │
│ 07 │ Username that successfully returns a desktop projection with a blank password? │ Administrator           │
└────┴────────────────────────────────────────────────────────────────────────────────┴─────────────────────────┘
🔍 Walkthrough

Step 1 — Reconnaissance & Network Scanning
Dans un premier temps, nous validons la connectivité réseau avec la cible via une requête ICMP. Ensuite, un balayage réseau complet via nmap est effectué afin de cartographier les services exposés. Ce scan révèle l'ouverture du port TCP 3389, indiquant la présence du service de bureau à distance (ms-wbt-server / RDP).

bash

ping 10.129.32.115
nmap -p- -sV 10.129.32.115
Ping Output Nmap Scan Output

Step 2 — Exploitation via RDP (Blank Password)
Suite à l'identification du service RDP, nous établissons une connexion au bureau distant via l'utilitaire xfreerdp. Les systèmes mal configurés laissant parfois le compte Administrator actif sans mot de passe, nous forçons l'utilisation de cet utilisateur. Après avoir accepté le certificat SSL, la session est accordée en laissant les champs Domain et Password vides, nous octroyant ainsi un accès interactif à la cible.

bash

xfreerdp /v:10.129.32.115 /u:Administrator
xfreerdp Connection

Step 3 — Privilege Escalation & Flag Exfiltration 🚩
Une fois la session graphique établie avec les privilèges d'administrateur, nous naviguons sur le bureau. Le fichier flag est directement accessible, nous permettant l'exfiltration du Root Flag et validant ainsi la compromission totale de la machine.

Root Flag

🏁 Result

text

╔═══════════════════════════════════════════╗
║                                           ║
║   🚩  ROOT FLAG OWNED  🚩                 ║
║                                           ║
║   Congratulations H4concef!               ║
║   You are player #312646                  ║
║   to have solved Explosion.               ║
║                                           ║
╚═══════════════════════════════════════════╝
📚 Concepts Learned

text

┌─────────────────────────┬──────────────────────────────────────────────────────┐
│ Concept                 │ Description                                          │
├─────────────────────────┼──────────────────────────────────────────────────────┤
│ RDP                     │ Protocole Microsoft permettant d'accéder à un bureau │
│                         │ distant via une interface graphique (GUI).           │
│ xfreerdp                │ Client en ligne de commande (CLI) pour se connecter  │
│                         │ aux serveurs RDP sous Linux.                         │
│ Blank Passwords         │ Faille critique de configuration autorisant          │
│                         │ l'accès sans fournir de mot de passe.                │
│ Nmap & Ping             │ Outils pour vérifier l'état de l'hôte et énumérer    │
│                         │ les services réseau (port 3389 ouvert).              │
└─────────────────────────┴──────────────────────────────────────────────────────┘
🛠️ Tools Used

text

• ping       — Test de connectivité réseau (ICMP)
• nmap       — Scanner de ports et services
• xfreerdp   — Client Remote Desktop Protocol (RDP)
📂 Repository Structure

text

EXPLOSION/
├── README.md
└── IMG/
    ├── ping.png
    ├── nmap_scan.png
    ├── xfreerdp.png
    └── flag.png
👤 Author

text

   ╔═══════════════════════════════╗
   ║  H4concef — Player #312646    ║
   ║  HackTheBox Starting Point    ║
   ╚═══════════════════════════════╝
Writeup réalisé dans le cadre du parcours Starting Point de HackTheBox.
