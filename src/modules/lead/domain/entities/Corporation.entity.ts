import { CompanySize, SizeCategory } from 'src/modules/_shared/types';

export class Corporation {
  private _name: string;
  private _domain?: string;
  private _CNPJ: string;
  private _location: string;
  private _field: string;
  private _size: CompanySize;

  public static sizes = SizeCategory;

  private constructor(
    name: string,
    domain: string,
    CNPJ: string,
    location: string,
    field: string,
    size: CompanySize,
  ) {
    this._name = name;
    this._domain = domain;
    this.setCNPJ(CNPJ);
    this._location = location;
    this._field = field;
    this._size = size;
  }

  public static create(
    name: string,
    domain: string,
    CNPJ: string,
    location: string,
    field: string,
    size: CompanySize,
  ): Corporation {
    return new Corporation(name, domain, CNPJ, location, field, size);
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get domain(): string | undefined {
    return this._domain;
  }

  set domain(domain: string) {
    this._domain = domain;
  }

  get CNPJ(): string {
    return this._CNPJ;
  }

  set CNPJ(CNPJ: string) {
    this.setCNPJ(CNPJ);
  }

  get location(): string {
    return this._location;
  }

  set location(location: string) {
    this._location = location;
  }

  get field(): string {
    return this._field;
  }

  set field(field: string) {
    this._field = field;
  }

  get size(): CompanySize {
    return this._size;
  }

  set size(size: CompanySize) {
    this._size = size;
  }

  private setCNPJ(CNPJ: string) {
    if (!Corporation.isValidCNPJ(CNPJ)) {
      throw new Error('CNPJ inválido.');
    }
    this._CNPJ = CNPJ;
  }
  private static isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

    const calcDV = (cnpj: string, pos: number): number => {
      let add = 0;
      let multiply = pos;
      for (let i = 0; i < pos - 1; i++) {
        add += parseInt(cnpj[i]) * multiply--;
        if (multiply < 2) multiply = 9;
      }
      const resto = add % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const dv1 = calcDV(cnpj, 13);
    const dv2 = calcDV(cnpj, 14);

    return dv1 === parseInt(cnpj[12]) && dv2 === parseInt(cnpj[13]);
  }
}
