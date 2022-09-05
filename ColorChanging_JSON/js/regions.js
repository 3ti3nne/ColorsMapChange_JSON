window.onload = () => {
  let d = document;
  let selectRegion = d.querySelector("#regions");
  let selectDept = d.querySelector("#departements");

  //On met un listener sur changement et on variable sa valeur.

  selectRegion.addEventListener("change", () => {
    let theRegion = selectRegion.value;

    //On target les g et path du svg.

    d.querySelectorAll(`g, path`).forEach((e) => {
      //On fill tout en couleur d'origine au change pour effacer l'historique couleur.

      e.setAttribute("fill", "");
    });

    if (theRegion !== "0") {
      d.querySelector(`#${theRegion}`).setAttribute("fill", "red");

      //S'il y a selection différente que option de base alors..
      //On ajoute la deuxième liste

      selectDept.innerHTML = `<option value="0">Faites votre choix...</option>`;
      let regionSelected = new FormData();

      //On créer un formData et
      //on y ajoute la region pour pouvoir récupérer les dpts avec 'region'(.append).

      regionSelected.append("region", theRegion);
      fetch("data.php", {
        method: "POST",
        body: regionSelected,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //On récupère les datas sous forme de tableaux d'objets.

          for (let i = 0; i < data.length; i++) {
            //object.values ou .keys pour retrouver les valeurs ou clefs d'un object//
            //On les ajoute a la liste selectDpt.

            selectDept.innerHTML += `<option value="${Object.keys(
              data[i]
            )}">${Object.values(data[i])}</option>`;
          }
        });

      //On remove la class d-none de bootstrap pour afficher la list.

      d.querySelector("#dept_zone").classList.remove("d-none");
    } else {
      d.querySelector("#dept_zone").classList.add("d-none");
    }
    selectDept.addEventListener("change", () => {
      //On écoute le changement sur la list dependante.

      d.querySelectorAll(`path`).forEach((e) => {
        e.setAttribute("fill", "");
      });

      //On remplit en "vide" = noir, puis vert si selection.

      theDpt = selectDept.value;
      d.querySelector(`#dept-${theDpt}`).setAttribute("fill", "green");
    });
  });
};
