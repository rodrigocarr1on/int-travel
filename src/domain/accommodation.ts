
class Accommodation {
  private _name:string="";
  private _cost: number=0;

  constructor(name:string,cost:number){
    this.name=name;
    this.cost=cost;
  }

  get name():string{
    return this._name;
  }

  set name(value: string){
    const nameTrimmeado = value.trim();

    if(!nameTrimmeado){
      throw new Error("El nombre del alojamiento no puede ser vacio");

    }

    this._name=nameTrimmeado;
  }

  get cost():number{
    return this._cost;
  }

  set cost(value: number){
    if(!Number.isInteger(value) || value<0){
      throw new Error("El costo debe ser entero mayos o igual a cero")
    }

    this._cost=value;
  }
}
export default Accommodation;
