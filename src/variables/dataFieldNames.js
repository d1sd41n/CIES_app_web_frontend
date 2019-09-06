import React from "react";
var dataFieldNames = {
    "username": "Nombre de usuario",
    "first_name": "Nombre",
    "last_name": "Apellido",
    "email": "Correo electronico",
    "password": "Contraceña",
    "type": "Tipo de usuario",
    "dni": "Cedula"
    };


    export default function getErrorMessages(data){
        data = Object.entries(data);
        const errorMessage = (
            <div>
                <p style={{color:"red"}}><b>Atencion!, los siguientes campos son incorrectos:</b></p>
              {data.map((item, key) => {
                  const dataField= dataFieldNames[item[0]]+ ": ";
                  const text = item[1][0];
                  console.log(text);
                  return (
                    <p style={{color:"blue"}} key={key}> <b>{dataField}</b> {text}</p>
                  );
              })}
            </div>
          );
        return errorMessage;
    }