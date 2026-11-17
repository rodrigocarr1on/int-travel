import { describe, beforeEach, test, expect } from "vitest";
import City, { calculateDurationDays } from "../city.ts";
import Accommodation from "../accommodation.ts";


function createCity(): City {
  return new City(
    "TestCity",
    "TestCountry",
    new Date("2023-05-01"),
    new Date("2023-05-04"),
    "Notas",
    new Accommodation("NombreAccommodation", 200),
  );
}

describe("City name", () => {
  let city: City;
  beforeEach(() => {
    city = createCity();
  });

  test("should get the correct name", () => {
    expect(city.getName()).toBe("TestCity");
  });

  test("should throw error if city name is empty", () => {
    // TODO: Implementar validación de nombre vacío en la clase City
  });
});

describe("City country", () => {
  let city: City;
  beforeEach(() => {
    city = createCity();
  });

  test("should set country correctly", () => {
    // TODO: Implementar test para validar país
  });

  test("should throw error if country is not a string", () => {
    expect(() => city.setCountry(123)).toThrow("Country must be a string");
  });

  test("should throw error if country is null or undefined", () => {
    expect(() => city.setCountry(null)).toThrow("Country must be a string");
    expect(() => city.setCountry(undefined)).toThrow(
      "Country must be a string",
    );
  });
});

describe("City dates", () => {
  let city: City;
  beforeEach(() => {
    city = createCity();
  });

  test("should get correct dateFrom", () => {
    expect(city.getDateFrom()).toBe("2023-05-01");
  });

  test("should get correct dateTo", () => {
    expect(city.getDateTo()).toBe("2023-05-04");
  });

  test("should throw error if dateFrom is invalid", () => {
    expect(() => city.setDateFrom("")).toThrow("dateFrom is required");
    expect(() => city.setDateFrom(null)).toThrow("dateFrom is required");
    expect(() => city.setDateFrom(123)).toThrow("Date must be a Date object");
  });

  test("should throw error if dateTo is invalid", () => {
    expect(() => city.setDateTo("")).toThrow("dateTo is required");
    expect(() => city.setDateTo(null)).toThrow("dateTo is required");
    expect(() => city.setDateTo(123)).toThrow("Date must be a Date object");
  });

  test("should throw error if a date is missing", () => {
    expect(() => city.validateDatesOrder(null, new Date("2023-05-04")))
      .toThrow("Both dateFrom and dateTo are required");
  });

  test("should throw error if a date is invalid", () => {
    expect(() =>
      city.validateDatesOrder(new Date("invalid"), new Date("2023-05-04")),
    ).toThrow("Invalid date format");
  });

  test("should throw error if dateTo is earlier than dateFrom", () => {
    expect(() =>
      city.validateDatesOrder(new Date("2023-05-04"), new Date("2023-05-01")),
    ).toThrow("dateTo cannot be earlier than dateFrom");
  });

  test("should throw error if a date has an unsupported type", () => {
    expect(() =>
      city.validateDatesOrder({}, new Date("2023-05-04")),
    ).toThrow("Invalid date format");
  });
});

describe("City notes", () => {
  let city: City;
  beforeEach(() => {
    city = createCity();
  });

  test("should set notes correctly", () => {
    city.setNotes("Nuevas notas");
    expect(city.getNotes()).toBe("Nuevas notas");
  });

  test("should throw error if notes is not a string", () => {
    expect(() => city.setNotes(123)).toThrow();
  });

  test("should allow empty notes", () => {
    city.setNotes("");
    expect(city.getNotes()).toBe("");
  });

  test("should set empty string if notes is null or undefined", () => {
    city.setNotes(null);
    expect(city.getNotes()).toBe("");
    city.setNotes(undefined);
    expect(city.getNotes()).toBe("");
  });

  test("should get notes correctly", () => {
    expect(city.getNotes()).toBe("Notas");
  });
});

describe("Duration in days", () => {
  let city: City;
  beforeEach(() => {
    city = createCity();
  });

  test("should return 0 if a date is missing", () => {
    expect(calculateDurationDays()).toBe(0);
    expect(calculateDurationDays(new Date("2023-05-01"))).toBe(0);
  });

  test("should return 0 if a date is invalid", () => {
    expect(
      calculateDurationDays(new Date("invalid"), new Date("2023-05-04")),
    ).toBe(0);
    expect(
      calculateDurationDays(new Date("2023-05-01"), new Date("invalid")),
    ).toBe(0);
  });

  test("should calculate duration correctly", () => {
    expect(city.getDurationDays()).toBe(4);
  });

  test("should calculate duration as 1 day if dateFrom equals dateTo", () => {
    const singleDayCity = new City(
      "SingleDayCity",
      "TestCountry",
      new Date("2023-05-01"),
      new Date("2023-05-01"),
      "notas",
      new Accommodation("Prueba",200),
    );
    expect(singleDayCity.getDurationDays()).toBe(1);
  });

  test("should return 0 if dateTo is earlier than dateFrom", () => {
    city.setDateFrom(new Date("2023-05-04"));
    city.setDateTo(new Date("2023-05-01"));

    expect(city.getDurationDays()).toBe(0);
  });

});



describe("City accommodation", () => {
  let city: City;
  let accommodation: Accommodation;

  beforeEach(() => {
    city = createCity();
    accommodation = new Accommodation("Hotel", 200);
  });

  test("agregar accommodation correctamente", () => {
    const ciudad = new City(
      "TestCity",
      "TestCountry",
      new Date("2023-05-01"),
      new Date("2023-05-04"),
    );

    ciudad.addAccommodation(accommodation);

    expect(ciudad.getAccommodation()).toBe(accommodation);
  });


  test("no se debe suplantar una accommodation existente", () => {
    city.addAccommodation(accommodation);
    const acc = new Accommodation("suplanta",100);
    expect(()=>city.getAccommodation).not.toBe(acc);
  });
});
