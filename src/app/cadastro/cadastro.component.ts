import { ConsultaCepService } from "./../service/consulta-cep.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SucessoCadastroComponent } from "../sucesso-cadastro/sucesso-cadastro.component";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(
    private router: Router,
    private consultacepService: ConsultaCepService
  ) {}

  ngOnInit(): void {}

  consultaCEP(ev: any, formularioReference: NgForm) {
    const cep = ev.target.value;
    if (cep !== "") {
      this.consultacepService.getConsultaCep(cep).subscribe((resultado) => 
      {
        console.log(resultado);
        this.populandoEndereco(resultado, formularioReference)
      });
    }
  }

  populandoEndereco(dados: any, formularioReference: NgForm){
    formularioReference.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    }) 
  }

  

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["./sucesso"]);
    } else {
      alert("Formulário inválido!");
    }
  }
}
