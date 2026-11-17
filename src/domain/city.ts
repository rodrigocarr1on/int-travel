import Accommodation from "./accommodation";
class City {
  #cityName!: string;
  #country!: string;
  #dateFrom!: Date;
  #dateTo!: Date;
  #notes: string = "";
  #accommodation?: Accommodation; 

  constructor(
    cityName: unknown,
    country: unknown,
    dateFrom: unknown,
    dateTo: unknown,
    notes: unknown = "",
    accommodation?: Accommodation,
  ) {
    this.setName(cityName);
    this.setCountry(country);
    this.validateDatesOrder(dateFrom, dateTo);
    this.setDateFrom(dateFrom);
    this.setDateTo(dateTo);
    this.setNotes(notes);
    if(accommodation){
      this.addAccommodation(accommodation);
    }
  }

  getAccommodation(): Accommodation | undefined{
    return this.#accommodation;
  }

  addAccommodation(accommodation: Accommodation): void {
    if (!this.#accommodation) {
      this.#accommodation = accommodation;
    }
  }

  getCountry(): string {
    return this.#country;
  }

  setCountry(country: unknown): void {
    if (country === null || country === undefined) {
      throw new Error("Country must be a string");
    }
    if (typeof country !== "string") {
      throw new Error("Country must be a string");
    }
    this.#country = country.trim();
  }

  getName(): string {
    return this.#cityName;
  }

  getDateFrom(): string {
    return this.#dateFrom.toISOString().slice(0, 10);
  }

  setDateFrom(date: unknown): void {
    if (date === null || date === undefined || date === "") {
      throw new Error("dateFrom is required");
    }
    if (!(date instanceof Date)) {
      throw new Error("Date must be a Date object");
    }
    this.#dateFrom = new Date(date.toISOString().slice(0, 10));
    return;
  }

  getDateTo(): string {
    return this.#dateTo.toISOString().slice(0, 10);
  }

  setDateTo(date: unknown): void {
    if (date === null || date === undefined || date === "") {
      throw new Error("dateTo is required");
    }
    if (!(date instanceof Date)) {
      throw new Error("Date must be a Date object");
    }
    this.#dateTo = new Date(date.toISOString().slice(0, 10));
    return;
  }

  setName(cityName: unknown): void {
    if (typeof cityName !== "string" || cityName.trim() === "") {
      throw new Error("El nombre de la ciudad debe ser una cadena no vacía");
    }
    this.#cityName = cityName.trim();
  }

  getNotes(): string {
    return this.#notes;
  }

  setNotes(text: unknown): void {
    if (text === null || text === undefined) {
      this.#notes = "";
      return;
    }
    if (typeof text !== "string") {
      throw new Error("Notes must be a string");
    }
    this.#notes = text.trim();
  }

  getDurationDays(): number {
    return calculateDurationDays(this.#dateFrom, this.#dateTo);
  }

  validateDatesOrder(
    dateFrom: unknown = this.#dateFrom,
    dateTo: unknown = this.#dateTo,
  ): void {
    if (!dateFrom || !dateTo) {
      throw new Error("Both dateFrom and dateTo are required");
    }
    const dateFromParsed = this.parseDate(dateFrom);
    const dateToParsed = this.parseDate(dateTo);
    if (
      Number.isNaN(dateFromParsed.getTime()) ||
      Number.isNaN(dateToParsed.getTime())
    ) {
      throw new Error("Invalid date format");
    }
    if (dateToParsed < dateFromParsed)
      throw new Error("dateTo cannot be earlier than dateFrom");
  }

  private parseDate(value: unknown): Date {
    if (
      !(value instanceof Date) &&
      typeof value !== "string" &&
      typeof value !== "number"
    ) {
      return new Date(Number.NaN);
    }
    return new Date(value);
  }
}

export function calculateDurationDays(
  dateFrom?: Date,
  dateTo?: Date,
): number {
  if (!dateFrom || !dateTo) return 0;
  const a = new Date(dateFrom);
  const b = new Date(dateTo);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  const diff =
    Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
}

export default City;

