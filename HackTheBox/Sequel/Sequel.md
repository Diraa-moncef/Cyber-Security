# 🧠 HackTheBox — Sequel

<div align="center">

![HackTheBox](https://img.shields.io/badge/HackTheBox-Sequel-green?style=for-the-badge&logo=hackthebox)
![Difficulty](https://img.shields.io/badge/Difficulty-Very%20Easy-brightgreen?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-Linux-blue?style=for-the-badge&logo=linux)
![Category](https://img.shields.io/badge/Category-Database-orange?style=for-the-badge)
![Rating](https://img.shields.io/badge/Rating-4.5%2F5-yellow?style=for-the-badge)

</div>

---

## 📋 Machine Info

| Field        | Details                        |
|--------------|-------------------------------|
| **Name**     | Sequel                        |
| **OS**       | Linux                         |
| **Difficulty** | ⭐ Very Easy                 |
| **Rating**   | 4.5 / 5 (386 votes)           |
| **XP**       | 150 XP                        |
| **Category** | Database / Misconfiguration   |

---

## 📖 Summary

**Sequel** est une machine HackTheBox de niveau Very Easy axée sur les bases des bases de données SQL.  
L'objectif est d'exploiter une mauvaise configuration d'un serveur **MariaDB** (accès `root` sans mot de passe) afin de récupérer le flag situé dans la base de données.

> **Concepts clés :** Enumération, MySQL/MariaDB, Mauvaise configuration, Requêtes SQL basiques

---

## 🛠️ Outils Utilisés

- `nmap` — Énumération des ports et services
- `mysql` — Client en ligne de commande pour interagir avec la base de données

---

## 🔍 Étape 1 — Scan Nmap

On commence par un scan de port pour identifier les services exposés sur la cible.

```bash
nmap -sV -sC -p- 10.129.x.x
```

**Résultats :**

Le scan révèle que le port 3306 est ouvert, hébergeant un service MySQL. Un scan de scripts Nmap plus poussé montre qu'il s'agit d'une instance **MariaDB**.

![Scan Nmap](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/Sequel/IMG/nmap.png)

![Script Info](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/Sequel/IMG/script_info.png)

> 💡 Seul le port **3306** (MySQL/MariaDB) est notre point d'entrée.

---

## 🌐 Étape 2 — Connexion à la base de données

Sachant qu'un service MariaDB est en cours d'exécution, on tente une connexion directe en utilisant l'utilisateur `root`. Une mauvaise configuration courante consiste à laisser cet utilisateur sans mot de passe.

```bash
mysql -h 10.129.x.x -u root
```

![Connexion MySQL](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/Sequel/IMG/mysql_connection.png)

> 🎯 Succès ! L'utilisateur `root` n'a pas de mot de passe, ce qui nous donne un accès total au système de base de données.

---

## 💉 Étape 3 — Énumération et Extraction

Une fois connecté, la première étape est de lister les bases de données existantes sur le serveur.

```sql
SHOW DATABASES;
```

![Show DBs](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/Sequel/IMG/show_dbs.png)

> ⚠️ On remarque une base de données inhabituelle nommée `htb` parmi les bases par défaut.

On sélectionne cette base de données et on liste ses tables :

```sql
USE htb;
SHOW TABLES;
```

![Show Tables](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/Sequel/IMG/show_tables.png)

On y trouve une table nommée `config`. On peut alors extraire tout son contenu pour voir ce qu'elle cache :

```sql
SELECT * FROM config;
```

---

## 🏁 Étape 4 — Récupération du Flag

La requête affiche le contenu de la table `config`, révélant le flag sous la colonne appropriée !

![Flag](https://github.com/Diraa-moncef/Cyber-Security/blob/main/HackTheBox/Sequel/IMG/flag.png)

```
HTB{************}
```

> 🎉 Machine compromise avec succès ! Vous êtes le joueur **#218314** à avoir résolu **Sequel**.

---

## 📚 Réponses aux Tasks

| Task | Question | Réponse |
|------|----------|---------|
| 1 | During our scan, which port do we find serving MySQL? | `3306` |
| 2 | What community-developed MySQL version is the target running? | `MariaDB` |
| 3 | When using the MySQL command line client, what switch do we need to use in order to specify a login username? | `-u` |
| 4 | Which username allows us to log into this MariaDB instance without providing a password? | `root` |
| 5 | In SQL, what symbol can we use to specify within the query that we want to display everything inside a table? | `*` |
| 6 | In SQL, what symbol do we need to end each query with? | `;` |
| 7 | There are three databases in this MySQL instance that are common across all MySQL instances. What is the name of the fourth that's unique to this host? | `htb` |
| 8 | What is the command in MySQL to select a database to interact with? | `use` |
| 9 | What is the command in MySQL to show the different columns for a given table? | `describe` |
| 10 | Which table has a column named "flag"? | `config` |

---

## 🔐 Leçons Apprises

1. **Toujours vérifier les configurations par défaut** : Un accès `root` sans mot de passe sur une base de données est une vulnérabilité critique souvent exploitée.
2. **Restreindre les accès réseaux** : Un service de base de données (port 3306) ne devrait idéalement pas être exposé publiquement sur internet, mais restreint au serveur web local ou à un réseau privé.
3. **Appliquer le principe du moindre privilège** : Les applications ne devraient jamais utiliser l'utilisateur `root` pour interagir avec la base de données.

---

## 📎 Ressources

- [HackTheBox Sequel](https://app.hackthebox.com/starting-point)
- [MariaDB Documentation](https://mariadb.com/kb/en/documentation/)
- [Nmap Documentation](https://nmap.org/docs.html)
- [MySQL Command Line Client](https://dev.mysql.com/doc/refman/8.0/en/mysql.html)

---

<div align="center">

**Made with ❤️ by H4concef | HackTheBox Starting Point**

</div>

