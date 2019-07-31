# Stockage en base de donnee

index = date+time
payload = releves du CAN (precision 8 bits) + booleens (actif, ouvert ...)

index 8 + payload 8 = 16o per line (date+time a la seconde) + (7 parametres numerique et 8 booleens)

1 par seconde pendant 1 an + 1 par minute pour les plus anciens.
500 Mo l'année             + 8.3 Mo par an


# reste a faire pour l'element *chartLine*

- Verifier les coordonnees Y des axes et leur utilisation, on devrait pouvoir directement faire l'inversion par rapport au svg ici.
- tester si les coordonnees d'affichage des axes peuvent etre non entieres et ce que ca fait.
- axe en date ou heure, mettre les lignes de la grille sur des valeurs pertinantes
- afficher un grille secondaire sans mettre les valeur sur les axes
- affichage et sauvegarde des unites
- affichage de la valeur au survol
- zoom dynamique a la souris (nouveau decoupage des fonctions de rendu)
- redimentionement dynamique (nouveau decoupage des fonctions de rendu)


# page globale

Definir ce qu'on veut pouvoir y faire
Le coder ;)
