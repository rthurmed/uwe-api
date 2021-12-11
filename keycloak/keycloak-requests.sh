# 1. Get users using admin account

# Get token
TOKEN=$(curl \
-d "client_id=admin-cli" \
-d "username=admin" \
-d "password=admin" \
-d "grant_type=password" \
http://localhost:28080/auth/realms/master/protocol/openid-connect/token | jq -r .access_token)

# Fetch all users
curl -H "Authorization: Bearer $TOKEN"  http://localhost:28080/auth/admin/realms/uwe/users | jq

# Fetch a user with ID
curl -H "Authorization: Bearer $TOKEN"  http://localhost:28080/auth/admin/realms/uwe/users/1c6a2a7f-1e65-4de6-b8e1-88d5670f1b4e | jq

