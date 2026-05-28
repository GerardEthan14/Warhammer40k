# Dossier `regle/`

Dépose ici tes scans / PDF / images des règles du codex à intégrer dans le site.

## Formats acceptés
- **PDF** : un par sujet idéalement (ex: `mozrog.pdf`, `boyz.pdf`, `detachement_chasse_au_gros.pdf`)
- **Images** : PNG ou JPG, haute résolution, texte net et lisible
- **Texte brut** : `.md` ou `.txt` si tu transcris à la main

## Conseils de scan
- Pose le bouquin **à plat**, bonne lumière, smartphone bien parallèle
- Résolution max du téléphone
- Une page floue = risque d'erreur sur AP / portée / stats — prends une 2e photo si doute

## Comment Claude traite les fichiers
1. Lit chaque fichier
2. Extrait les stats / armes / aptitudes / stratagèmes
3. Traduit en FR si besoin
4. Met à jour les JSON dans `src/data/orks/`
5. Ajoute des `notes` visibles dans l'app uniquement si vraiment utile (combo non évidente)
