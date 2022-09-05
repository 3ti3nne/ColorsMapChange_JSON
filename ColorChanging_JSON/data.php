<?php

//On decode le json et on le renvoie

$departements = json_decode(file_get_contents(("./data/departements.json")));

if (isset($_POST["region"]) && !empty($_POST["region"])) {

    $region = $_POST["region"];

    $nosRegionsOntDuTalent = [];

    //Si le 'region' du post correspond au 'region' du json
    //On récupère les occurences qui correspondent avec 'region' et on les met dans un tableau.

    foreach ($departements as $key => $val) {
        if ($val->region == $region) {
            $nosRegionsOntDuTalent[] = [$key => $val->nom];
        }
    }

    //On encode le tableau en json et on le renvoie.

    echo json_encode($nosRegionsOntDuTalent);
};
