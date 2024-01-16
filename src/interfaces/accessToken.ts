import { UserDto } from "./user/userDto";


export interface AccessToken {
    token: string | null;
    expiration: string | null;
    user: UserDto | null;
}