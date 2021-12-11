# Keycloak

## Setup do Keycloak

Rodar o docker compose

```
docker-compose -f docker/keycloak.yml up -d
```

É necessário configurar o usuário administrador

```
docker exec local_keycloak \
    /opt/jboss/keycloak/bin/add-user-keycloak.sh \
    -u admin \
    -p admin \
&& docker restart local_keycloak
```

Para acessar o sistema: [http://localhost:28080/auth/](http://localhost:28080/auth/)

## Requests

Lista de exemplos de requests

### Pegar token do keycloak

```
curl \
-d "client_id=api" \
-d "client_secret=c898e91a-7779-4c8a-ab25-3c957de2d569" \
-d "username=rthurmed" \
-d "password=rthurmed" \
-d "grant_type=password" \
-d "scope=profile" \
http://localhost:28080/auth/realms/uwe/protocol/openid-connect/token
```

Pegar especificamente o token e colocar em uma variavel:

```
TOKEN=$(curl \
-d "client_id=api" \
-d "client_secret=c898e91a-7779-4c8a-ab25-3c957de2d569" \
-d "username=rthurmed" \
-d "password=rthurmed" \
-d "grant_type=password" \
-d "scope=profile" \
http://localhost:28080/auth/realms/uwe/protocol/openid-connect/token | jq -r .access_token)
```

### Executar uma request

```
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000
```

