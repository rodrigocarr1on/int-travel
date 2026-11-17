import { describe, beforeEach, test,expect } from "vitest";
import Accommodation from "../accommodation.ts";

describe("Accommodation", () => {
  let accommodation: Accommodation;

  beforeEach(() => {
    accommodation = new Accommodation("NombreAccommodation", 200);
  });


    describe("Accommodation name", () => {
  test("should set name correctly", () => {
    expect(accommodation.name).toBe("NombreAccommodation");
  });

  test("Quita los espacios", () => {
    accommodation.name = "  Hotel  ";
    expect(accommodation.name).toBe("Hotel");
  });

  test("No acepta nombre vacio", () => {
    expect(() => accommodation.name = "").toThrow();
  });

  test("Prueba con ingreso solo de espacios invalido", () => {
    expect(() => accommodation.name = "   ").toThrow();
  });
});

  test("costo no numerico",()=>{
    expect(()=>accommodation.cost=NaN).toThrow();
  });

  test("costo menor a cero",()=>{
    expect(()=>accommodation.cost=-1).toThrow();
  });

  test("costo no es un entero",()=>{
    expect(()=>accommodation.cost=100.5).toThrow();
  });

  test("Costo valido",()=>{
    accommodation.cost=800;
    expect(accommodation.cost).toBe(800);
  });
});



