# Widget Météo

Ajoutez un Widget météo dans votre interface Avatar !

### Installation d'un autre design de Widget
La ville par défaut est Paris. Pour définir une autre ville, c'est très simple !
Vous pouvez même en profiter pour choisir votre propre interface météo.

1. Allez sur le site [widget-meteo](http://www.widget-meteo.com/) (http://www.widget-meteo.com/)
2. Choisissez un type de widget, votre ville, votre interface
3. Ajoutez dans "Votre site" une adresse neutre comme "http://monblogperso.free.fr"
4. Générez un nouveau code HTML avec cette nouvelle widget
5. Ouvrez le fichier html/meteoWidget.html et remplacez le code <div> par le nouveau
6. Copiez la largeur et la hauteur de la fenêtre (disponible juste en dessous de la visualisation de votre widget) et ajoutez ces valeurs dans le fichier de propriétés.
    - TRES IMPORTANT !!!
        - Gardez la propriété class="meteo" dans le champ <div> du fichier html dans la nouvelle <div> (Recopiez-la à l'identique) !
        - L'id provient du site et peut être remplacé

### Visibilité
Vous pouvez changer l'opacité du widget en changeant la valeur "opacity" dans le fichier de propriétés.
De 0 à 1, par exemple 0.8

<br><br><br>
