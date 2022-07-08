import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
    //@Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //console.log(this.data.alter_ego);
    //console.log(this.data.otraVariable);
  }

  ngOnInit(): void {
  }

  public borrar(): void{
    this.dialogRef.close(true);
  }

  public cerrar(): void{
    this.dialogRef.close();
  }

}
