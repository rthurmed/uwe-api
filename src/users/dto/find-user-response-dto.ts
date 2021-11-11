export class FindUserResponseDTO {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;

  constructor({
    id,
    createdTimestamp,
    username,
    enabled,
    emailVerified,
    firstName,
    lastName,
    email,
  }) {
    this.id = id;
    this.createdTimestamp = createdTimestamp;
    this.username = username;
    this.enabled = enabled;
    this.emailVerified = emailVerified;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
