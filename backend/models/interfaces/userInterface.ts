interface UserInterface {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string | undefined;
  passwordConfirm: string;
  image: string;
  description: string;
  token: string;

  compareCorrectPassword(
    candidatePassword: string,
    userPassword: string
  ): boolean;
}
