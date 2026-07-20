/*==========================================================
    SISTEMA PROFESIONAL DE INFORMES PERICIALES
    script.js
    Versión 1.0
==========================================================*/

"use strict";

/*==========================================================
INICIO DEL SISTEMA
==========================================================*/

document.addEventListener("DOMContentLoaded", iniciarSistema);


/*==========================================================
FUNCIÓN PRINCIPAL
==========================================================*/

function iniciarSistema(){

    numerarPaginas();

    insertarPiePagina();

    insertarEncabezado();

    mostrarFechaActual();

    configurarImpresion();

}


/*==========================================================
NUMERACIÓN DE PÁGINAS
==========================================================*/

function numerarPaginas(){

    const paginas=document.querySelectorAll(".pagina");

    paginas.forEach((pagina,indice)=>{

        pagina.dataset.pagina=indice+1;

    });

}


/*==========================================================
PIE DE PÁGINA
==========================================================*/

function insertarPiePagina(){

    const paginas=document.querySelectorAll(".pagina");

    paginas.forEach((pagina,indice)=>{

        const pie=document.createElement("div");

        pie.className="pie";

        pie.innerHTML=`

            <span>

                Sistema Profesional de Informes Periciales

            </span>

            <span>

                Página ${indice+1}

            </span>

        `;

        pagina.appendChild(pie);

    });

}


/*==========================================================
ENCABEZADO
==========================================================*/

function insertarEncabezado(){

    const paginas=document.querySelectorAll(".pagina");

    paginas.forEach((pagina,indice)=>{

        if(indice===0){

            return;

        }

        const encabezado=document.createElement("div");

        encabezado.className="encabezado";

        encabezado.innerHTML=`

            <h2>

                INFORME PERICIAL CONTABLE

            </h2>

            <span>

                Exp. 00000-2026

            </span>

        `;

        pagina.insertBefore(encabezado,pagina.firstChild);

    });

}


/*==========================================================
FECHA ACTUAL
==========================================================*/

function mostrarFechaActual(){

    const fecha=new Date();

    console.log(

        "Fecha : ",

        fecha.toLocaleDateString("es-PE")

    );

}


/*==========================================================
IMPRESIÓN
==========================================================*/

function configurarImpresion(){

    window.addEventListener("beforeprint",()=>{

        console.log("Preparando impresión...");

    });

}


/*==========================================================
UTILIDADES
==========================================================*/

function imprimir(){

    window.print();

}


/*==========================================================
EXPORTACIONES FUTURAS
==========================================================*/

/*

Aquí irán posteriormente:

✔ Generar PDF

✔ Índice automático

✔ Numeración dinámica

✔ Firma digital

✔ Código QR

✔ Cargar expediente

✔ Guardar expediente

✔ Abrir expediente

✔ IA para redactar capítulos

✔ Editor de tablas

✔ Gestión de anexos

*/
