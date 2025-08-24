# Guide Commits Conventionnels - Version Concise

## Structure de base
```
<type>[étendue]: <description>

[corps optionnel]

[pied optionnel]
```

## Types principaux
- **`feat:`** - nouvelle fonctionnalité (MINOR)
- **`fix:`** - correction de bug (PATCH)
- **`BREAKING CHANGE:`** ou **`!`** - rupture de compatibilité (MAJOR)

## Types secondaires
- `docs:` - documentation
- `style:` - formatage, style
- `refactor:` - refactorisation
- `test:` - ajout/modification de tests
- `chore:` - tâches de maintenance
- `perf:` - amélioration de performance
- `ci:` - intégration continue
- `build:` - système de build

## Exemples rapides
```
feat: ajout système d'authentification
fix: correction bug de validation formulaire
feat!: modification API de connexion
docs: mise à jour README
style: formattage le code selon ESLint
refactor: réorganisation des composants
test: ajout de tests unitaires pour Contact
chore: mise à jour des dépendances
```

## Règles importantes
1. **Type obligatoire** en minuscules
2. **Description impérative** (add, correct, edit...)
3. **Messages en anglais**
4. **`!` après le type** pour breaking change
5. **Étendue optionnelle** : `feat(auth):`, `fix(ui):`

## Breaking Changes
```
feat!: modification de l'API des utilisateurs
# OU
feat: modification de l'API des utilisateurs

BREAKING CHANGE: les endpoints /users ont changé
```
