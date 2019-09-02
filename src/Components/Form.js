import React, {Component} from 'react';
import './Form.css';

import FormRow from './FormRow';
import FormDate from './FormDate';

// import {validateNombre} from './validation';

import MaskedInput from 'react-text-mask';

class Form extends Component {

    constructor (props){
        super(props);

        this.state = {
            RFC:''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.methodOnChange = this.methodOnChange.bind(this);

    }

    onSubmit(e){
        e.preventDefault();
        let nombre = this.refs.nombre.getValue();
        let apePat = this.refs.apePat.getValue();
        let apeMat = this.refs.apeMat.getValue();

        //para componente de libreria MaskedInput --> cambiar el orden de anio y dia cuando se setea el rfc
        let anio = document.getElementById("fechaNac").value.substr(0,2);
        let mes = document.getElementById("fechaNac").value.substr(3,2);
        let dia = document.getElementById("fechaNac").value.substr(8);

        //para componente FormDate --> cambiar el orden de dia y anio cuando se setea el rfc
        // let anio = document.getElementById("fechaNac").value.substr(2,2);
        // let mes = document.getElementById("fechaNac").value.substr(5,2);
        // let dia = document.getElementById("fechaNac").value.substr(8);


        let rfc = ""

        //Filtra acentos
        let nombre_sa = this.RFCFiltraAcentos(nombre.toLowerCase());
        let apePat_sa = this.RFCFiltraAcentos(apePat.toLowerCase());
        let apeMat_sa = this.RFCFiltraAcentos(apeMat.toLowerCase());

                    //ELIMINA PALABRAS SOBRANTES DE LOS NOMBRES
        
        nombre_sa = this.RFCFiltraNombres(nombre_sa);
        apePat_sa = this.RFCFiltraNombres(apePat_sa);
        apeMat_sa = this.RFCFiltraNombres(apeMat_sa);

        apeMat_sa = this.RFCCambiaMaterno(apeMat_sa);

        if (apePat_sa.length > 0 && apeMat_sa.length > 0){
            if(apePat_sa.length < 3) {
            rfc = this.RFCApellidoCorto (apePat_sa, apeMat_sa, nombre_sa);
            } else {
            rfc = this.RFCArmalo (apePat_sa, apeMat_sa, nombre_sa);
            }
        }
        
        if(apePat_sa.length === 0 && apeMat_sa.length > 0 ) {
            rfc = this.RFCUnApellido(nombre_sa, apeMat_sa);
        } 

        if(apePat_sa.length > 0 && apeMat_sa.length === 0){
            rfc = this.RFCUnApellido(nombre_sa, apePat_sa);             
        }

        rfc = this.RFCQuitaProhibidas (rfc);
        


        this.setState ({ RFC: rfc.toUpperCase() + dia + mes + anio})
    }

    //validar nombre
    // validateNombre(nombre) {
    //     var nombreValidated = /^(\s*[a-zA-Z]\s*)*$/;
    //     return nombreValidated.test(nombre);
    // }

    //Filtrar nombres
    RFCFiltraNombres(strTexto) {
        var i = 0;
        var strArPalabras = [".", ",", "de ", "del ", "la ", "los ", "las ", "y ", "mc ", "mac ", "von ", "van "];
        for (i = 0; i <= strArPalabras.length; i++) {
            //alert(strArPalabras[i]);
            strTexto = strTexto.replace(strArPalabras[i], "");
        }
        strArPalabras = ["jose ", "maria ", "j ", "ma "];
        for (i = 0; i <= strArPalabras.length; i++) {
            //alert(strArPalabras[i]);
            strTexto = strTexto.replace(strArPalabras[i], "");
        }
        switch(strTexto.substr(0, 2)) {
            case 'ch':
                strTexto = strTexto.replace('ch', 'c')
                break;
            case 'll':
                strTexto = strTexto.replace('ll', 'l')
                break;
        }
        return strTexto
    }

    RFCQuitaProhibidas(rfc) {
        var res;
        rfc = rfc.toUpperCase();
        var strPalabras = "BUEI*BUEY*CACA*CACO*CAGA*CAGO*CAKA*CAKO*COGE*COJA*";
        strPalabras = strPalabras + "KOGE*KOJO*KAKA*KULO*MAME*MAMO*MEAR*";
        strPalabras = strPalabras + "MEAS*MEON*MION*COJE*COJI*COJO*CULO*";
        strPalabras = strPalabras + "FETO*GUEY*JOTO*KACA*KACO*KAGA*KAGO*";
        strPalabras = strPalabras + "MOCO*MULA*PEDA*PEDO*PENE*PUTA*PUTO*";
        strPalabras = strPalabras + "QULO*RATA*RUIN*";
        res = strPalabras.match(rfc);
        if (res != null) {
            rfc = rfc.substr(0, 3) + 'X';
            return rfc;
        } else {
            return rfc;
        }
    }

    RFCCambiaMaterno(a_materno){
        if (a_materno===''){
            a_materno = a_materno.replace('','X');
        }
        return a_materno;
    }

    RFCUnApellido(nombre, apellido) {
        var rfc = apellido.substr(0, 2) + nombre.substr(0, 2);
        return rfc
    }

    RFCArmalo(ap_paterno, ap_materno, nombre) {
        var strVocales = 'aeiou';
        var strPrimeraVocal = '';
        var i = 0;
        var x = 0;
        var y = 0;
        for (i = 1; i <= ap_paterno.length; i++) {
            //alert(ap_paterno.substr(i,1));
            if (y === 0) {
                for (x = 0; x <= strVocales.length; x++) {
                    //alert(strVocales.substr(x,1));
                    if (ap_paterno.substr(i, 1) === strVocales.substr(x, 1)) {
                        y = 1;
                        strPrimeraVocal = ap_paterno.substr(i, 1);
                    }
                }
            }
            //break;
        }
        var rfc = ap_paterno.substr(0, 1) + strPrimeraVocal + ap_materno.substr(0, 1) + nombre.substr(0, 1);
        return rfc;
    }

    RFCApellidoCorto(ap_paterno, ap_materno, nombre) {
        var rfc = ap_paterno.substr(0, 1) + ap_materno.substr(0, 1) + nombre.substr(0, 2);
        return rfc;
    }

    //método para filtrar acentos
    RFCFiltraAcentos(strTexto) {
        strTexto = strTexto.replace('á', 'a');
        strTexto = strTexto.replace('é', 'e');
        strTexto = strTexto.replace('í', 'i');
        strTexto = strTexto.replace('ó', 'o');
        strTexto = strTexto.replace('ú', 'u');
        return strTexto;
    }

    //sin este método no se puede modificar el input del resultado del RFC
    methodOnChange(e){
        this.setState({ RFC: e.target.value })
    }

    render(){

        return(
            <div className="Form">
                <form onSubmit={this.onSubmit} className="Form-form"> 
                    <h1 className="Form-title">Calcula RFC</h1>
                <FormRow inputType ="text" labelText = "Nombre" placeholderInput = "Juan" ref="nombre" isRequired="true" />
                <FormRow inputType ="text" labelText = "Apellido Paterno" placeholderInput = "Sanchez" ref="apePat" isRequired="true" />
                <FormRow inputType ="text" labelText = "Apellido Materno" placeholderInput = "Ruiz" ref="apeMat" />

                {/* descomentar cuando se utiliza el comoponente FormDate como fecha */}
                {/* <FormDate inputType ="date" labelText = "Fecha de nacimiento" placeholderInput = "dd-mm-aaaa" id="fechaNac" /> */}


                {/* comentar cuando se utiliza el comoponente FormDate como fecha de nacimiento */}
                <div className="FormRow">
                <label className="FormRow-label" > Fecha de nacimiento </label>
                <MaskedInput className="FormRow-input" mask={[/[0-3]/,/[0-9]/,'-',/[0-1]/,/[0-9]/,'-',/[1-2]/,/\d/,/\d/,/\d/]}  guide={false} keepCharPositions={true}  placeholder={'Fecha de nacimiento DD-MM-YYYY'}  id="fechaNac"/>
                </div>

                <button className="Form-button">Calcular</button>
                <br></br>

                <div className="FormRow">
                <label className="FormRow-label" > RFC </label>
                <input  className = "FormRow-input"  value={this.state.RFC} onChange={this.methodOnChange}/>   
                </div>     

                </form>
            </div>        
        )
    }
}



export default Form;
