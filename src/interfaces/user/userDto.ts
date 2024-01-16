import { UserSettingDto } from "./userSettingDto";

export interface UserDto {
    id: string;
    firstName: string | null;
    lastName: string | null;
    userName: string | null;
    email: string | null;
    gender: boolean;
    age: number;
    roleName: string;
    isApproved: boolean;
    createdDate: string;
    updatedDate: string;
    isActive: boolean;
    userSetting: UserSettingDto;
    imageSrc: string | null;
    imageName: string | null;
}


