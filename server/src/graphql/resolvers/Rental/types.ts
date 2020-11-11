export interface CreateRentalInput {
  id: string;
  checkIn: string;
  checkOut: string;
}

export interface CreateRentalArgs {
  input: CreateRentalInput;
}
