export const colorNodes = (nodes, progress) => {

    for (let index = 0; index < nodes.length; index++) {

        //Verifica si cumple con los requisitos
        var needs = nodes[index]['needs'];

        var verified = true;

        if (typeof needs !== 'undefined') {
            //Itera por la lista de dependencias
            for (let cont = 0; cont < needs.length; cont++) {
                //Selecciona el indice de la dependencia
                const need = needs[cont];
                //Verifica que el indice exista
                if (typeof progress[need] !== 'undefined') {
                    //Si existe, y no esta terminado, se coloca como falso
                    if (!progress[need]['completed']) {
                        verified = false;
                        break;
                    }
                }
                //Si no existe, se coloca como amarillo
            }

        } else {
            verified = false;
        }


        if (verified) {
            nodes[index]['_color'] = 'yellow';
            continue;
        }

        //Si existe el registro de ese nodo en los datos del usuario
        if (typeof progress[index] !== 'undefined') {

            //Verifica si está completado
            if (progress[index]['completed']) {

                nodes[index]['_color'] = 'green';
            } else if (progress[index]['inProgress']) {

                nodes[index]['_color'] = 'blue';

            } else {
                nodes[index]['_color'] = 'red';
            }
        } else {
            nodes[index]['_color'] = 'red';
        }
    }
    return nodes;
}