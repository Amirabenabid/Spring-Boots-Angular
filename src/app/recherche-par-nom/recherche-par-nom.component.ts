import { Component, OnInit } from '@angular/core';
import { musique } from '../model/musique.model';
import { musiqueService } from '../services/musique.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

nommusique!:string;
musiques!:musique[];
allmusiques!:musique[];
searchTerm!:string;
authService: any;
  constructor(private musiqueService: musiqueService) { }

  ngOnInit(): void {
    this.musiqueService.listemusique().subscribe(musiqs=>{
    console.log(musiqs);
    this.musiques=musiqs;
    });
  }
recherchermusiqs(){
this.musiqueService.rechercherParNom(this.nommusique).subscribe(musiqs =>{
  console.log(musiqs);
  this.musiques=musiqs});
}
onKeyUp(filterText : string){
  this.musiques = this.allmusiques.filter(item =>
    item.nommusique.toLowerCase().includes(filterText));
  }
  chargermusiques(){
    this.musiqueService.listemusique().subscribe(musiqs => {
      console.log(musiqs);
      this.musiques = musiqs;
      });
  }
    
  supprimermusique(p: musique)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.musiqueService.supprimermusique(p.idmusique).subscribe(() => {
        console.log("musique supprimé");
        this.chargermusiques();
  });
  }  
  
}
