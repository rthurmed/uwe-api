import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { FindUserResponseDTO } from './dto/find-user-response-dto';
import { toFormData } from '../utils/request';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  private token = '';
  private endpointAuth = `${process.env.KEYCLOAK_HOST}/realms/master/protocol/openid-connect/token`;
  private endpointUsers = `${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALM}/users`;

  private async authenticate(): Promise<void> {
    const response: AxiosResponse = await lastValueFrom(
      this.httpService.post(
        this.endpointAuth,
        toFormData({
          client_id: process.env.KEYCLOAK_ADMIN_CLIENT_ID,
          username: process.env.KEYCLOAK_ADMIN_USER,
          password: process.env.KEYCLOAK_ADMIN_PASS,
          grant_type: 'password',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );
    this.token = response.data['access_token'];
  }

  async find(userId: string): Promise<FindUserResponseDTO> {
    await this.authenticate();
    const response: AxiosResponse = await lastValueFrom(
      await this.httpService.get(`${this.endpointUsers}/${userId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }),
    );
    return new FindUserResponseDTO(response.data);
  }

  async findByEmail(email: string): Promise<FindUserResponseDTO> {
    await this.authenticate();
    const response: AxiosResponse = await lastValueFrom(
      await this.httpService.get(`${this.endpointUsers}/?email=${email}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }),
    );
    if (response.data.length < 1) {
      return null;
    }
    return new FindUserResponseDTO(response.data[0]);
  }
}
